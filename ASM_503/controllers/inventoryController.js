const { ImportReceipt, StockItem, Product, Supplier, Shelf, Zone } = require('../models');

const inventoryController = {
  // === WEB CONTROLLERS ===
  
  // List import receipts
  index: async (req, res) => {
    try {
      const receipts = await ImportReceipt.find()
        .populate('supplier', 'name')
        .populate('user', 'fullName')
        .sort({ importDate: -1 })
        .lean();
        
      res.render('inventory/index', { 
        title: 'Lịch sử nhập kho',
        receipts
      });
    } catch (error) {
      console.error(error);
      req.flash('error_msg', 'Lỗi tải lịch sử nhập kho');
      res.redirect('/dashboard');
    }
  },
  
  // Show create form
  create: async (req, res) => {
    try {
      const products = await Product.find({ isActive: true }).select('name sku').sort({ name: 1 }).lean();
      const suppliers = await Supplier.find().select('name').sort({ name: 1 }).lean();
      
      // Get all zones to build the location selector hierarchy
      const zones = await Zone.find().sort({ code: 1 }).lean();
      
      res.render('inventory/create', { 
        title: 'Nhập kho',
        products,
        suppliers,
        zones,
        receiptCode: `IMP${Date.now()}` // Default generated code
      });
    } catch (error) {
      console.error(error);
      req.flash('error_msg', 'Lỗi tải trang nhập kho');
      res.redirect('/inventory');
    }
  },

  // View receipt details
  view: async (req, res) => {
    try {
      const receipt = await ImportReceipt.findById(req.params.id)
        .populate('supplier')
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
        req.flash('error_msg', 'Không tìm thấy phiếu nhập');
        return res.redirect('/inventory');
      }
      
      res.render('inventory/view', { 
        title: `Chi tiết phiếu nhập: ${receipt.receiptCode}`,
        receipt
      });
    } catch (error) {
      console.error(error);
      req.flash('error_msg', 'Lỗi tải chi tiết phiếu nhập');
      res.redirect('/inventory');
    }
  },

  // === API CONTROLLERS ===
  
  // Create import receipt (API)
  createReceipt: async (req, res) => {
    try {
      const { receiptCode, supplierId, importDate, note, type, items } = req.body;
      
      if (!items || items.length === 0) {
        return res.status(400).json({ success: false, message: 'Vui lòng thêm ít nhất 1 sản phẩm' });
      }
      
      // Create new receipt
      const receipt = new ImportReceipt({
        receiptCode: receiptCode || `IMP${Date.now()}`,
        type: type || 'individual',
        supplier: supplierId,
        user: req.user._id,
        importDate: importDate || new Date(),
        note,
        items: []
      });
      
      let totalAmount = 0;
      
      // Process each item
      for (const item of items) {
        const { productId, shelfId, quantity, importPrice } = item;
        const qty = parseInt(quantity);
        const price = parseFloat(importPrice);
        
        const subTotal = qty * price;
        totalAmount += subTotal;
        
        // Add to receipt
        receipt.items.push({
          product: productId,
          shelf: shelfId,
          quantity: qty,
          importPrice: price,
          subTotal
        });
        
        // Update or create StockItem
        let stockItem = await StockItem.findOne({ 
          product: productId, 
          shelf: shelfId 
        });
        
        if (!stockItem) {
          stockItem = new StockItem({
            product: productId,
            shelf: shelfId,
            totalQuantity: 0,
            batchEntries: []
          });
        }
        
        // Add new batch entry
        stockItem.totalQuantity += qty;
        stockItem.batchEntries.push({
          batchCode: receipt.receiptCode + '-' + Math.floor(Math.random() * 10000),
          importReceipt: receipt._id,
          supplier: supplierId,
          originalQuantity: qty,
          remainingQuantity: qty,
          importPrice: price
        });
        
        await stockItem.save();
      }
      
      receipt.totalAmount = totalAmount;
      await receipt.save();
      
      res.status(201).json({ 
        success: true, 
        message: 'Tạo phiếu nhập và cập nhật tồn kho thành công',
        data: receipt 
      });
      
    } catch (error) {
      console.error('Import Error:', error);
      if (error.code === 11000) {
        return res.status(400).json({ success: false, message: 'Mã phiếu nhập đã tồn tại' });
      }
      res.status(500).json({ success: false, message: error.message });
    }
  },
  
  // Get stock items
  getStock: async (req, res) => {
    try {
      const stock = await StockItem.find()
        .populate('product', 'name sku price')
        .populate({
          path: 'shelf',
          select: 'code name',
          populate: {
            path: 'lot',
            select: 'code name',
            populate: { path: 'zone', select: 'code name' }
          }
        });
        
      res.json({ success: true, data: stock });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

module.exports = inventoryController;
