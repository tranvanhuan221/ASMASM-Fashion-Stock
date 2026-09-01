const { ExportReceipt, StockItem, Product, Customer } = require('../models');

const exportController = {
  // === WEB CONTROLLERS ===
  
  index: async (req, res) => {
    try {
      const receipts = await ExportReceipt.find()
        .populate('customer', 'name phone')
        .populate('user', 'fullName')
        .sort({ exportDate: -1 })
        .lean();
        
      res.render('export/index', { 
        title: 'Lịch sử xuất kho',
        receipts
      });
    } catch (error) {
      console.error(error);
      req.flash('error_msg', 'Lỗi tải lịch sử xuất kho');
      res.redirect('/dashboard');
    }
  },
  
  create: async (req, res) => {
    try {
      // Get products that are actually in stock
      const stockItems = await StockItem.find({ quantity: { $gt: 0 } })
        .populate('product', 'name sku price')
        .populate({
          path: 'shelf',
          select: 'code',
          populate: {
            path: 'lot',
            select: 'code',
            populate: { path: 'zone', select: 'code' }
          }
        })
        .lean();
        
      const customers = await Customer.find().select('name phone').sort({ name: 1 }).lean();
      
      res.render('export/create', { 
        title: 'Xuất kho',
        stockItems,
        customers,
        receiptCode: `EXP${Date.now()}`
      });
    } catch (error) {
      console.error(error);
      req.flash('error_msg', 'Lỗi tải trang xuất kho');
      res.redirect('/export');
    }
  },
  
  view: async (req, res) => {
    try {
      const receipt = await ExportReceipt.findById(req.params.id)
        .populate('customer')
        .populate('user')
        .populate({
          path: 'items.product',
          select: 'name sku image'
        })
        .populate({
          path: 'items.shelf',
          select: 'code',
          populate: {
            path: 'lot',
            select: 'code',
            populate: { path: 'zone', select: 'code' }
          }
        })
        .lean();
        
      if (!receipt) {
        req.flash('error_msg', 'Không tìm thấy phiếu xuất');
        return res.redirect('/export');
      }
      
      res.render('export/view', { 
        title: `Chi tiết phiếu xuất: ${receipt.receiptCode}`,
        receipt
      });
    } catch (error) {
      console.error(error);
      req.flash('error_msg', 'Lỗi tải chi tiết phiếu xuất');
      res.redirect('/export');
    }
  },

  // === API CONTROLLERS ===
  
  createReceipt: async (req, res) => {
    try {
      const { receiptCode, customerId, exportDate, reason, note, items } = req.body;
      
      if (!items || items.length === 0) {
        return res.status(400).json({ success: false, message: 'Vui lòng thêm ít nhất 1 sản phẩm' });
      }
      
      // Start processing - since Mongoose transaction setup requires replica set, we will do it sequentially with manual rollback if needed.
      // In a real prod with replica sets, use mongoose.startSession()
      
      const receipt = new ExportReceipt({
        receiptCode: receiptCode || `EXP${Date.now()}`,
        customer: customerId,
        user: req.user._id,
        exportDate: exportDate || new Date(),
        reason: reason || 'sell',
        note,
        items: []
      });
      
      let totalAmount = 0;
      let totalCost = 0;
      
      for (const item of items) {
        const { stockItemId, quantity, exportPrice } = item;
        const qty = parseInt(quantity);
        const price = parseFloat(exportPrice);
        
        const stockItem = await StockItem.findById(stockItemId);
        if (!stockItem) {
          throw new Error(`Không tìm thấy tồn kho cho ID: ${stockItemId}`);
        }
        
        if (stockItem.totalQuantity < qty) {
          throw new Error(`Sản phẩm không đủ số lượng trong kho. Yêu cầu: ${qty}, Hiện có: ${stockItem.totalQuantity}`);
        }
        
        // Deduct using FIFO method on StockItem
        const batchDeductions = stockItem.deductFIFO(qty, reason);
        await stockItem.save();
        
        // Calculate costs from deductions
        const itemCost = batchDeductions.reduce((sum, d) => sum + (d.quantity * d.importPrice), 0);
        const subTotal = qty * price;
        const itemProfit = subTotal - itemCost;
        
        totalAmount += subTotal;
        totalCost += itemCost;
        
        receipt.items.push({
          product: stockItem.product,
          shelf: stockItem.shelf,
          quantity: qty,
          exportPrice: price,
          subTotal,
          profit: itemProfit,
          batchDeductions
        });
      }
      
      receipt.totalAmount = totalAmount;
      receipt.totalProfit = totalAmount - totalCost;
      
      await receipt.save();
      
      res.status(201).json({ 
        success: true, 
        message: 'Tạo phiếu xuất và tính toán lợi nhuận thành công',
        data: receipt 
      });
      
    } catch (error) {
      console.error('Export Error:', error);
      res.status(400).json({ success: false, message: error.message });
    }
  }
};

module.exports = exportController;
