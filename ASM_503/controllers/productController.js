const { Product, Category, StockItem } = require('../models');

const productController = {
  // === WEB CONTROLLERS ===
  
  index: async (req, res) => {
    try {
      const categories = await Category.find().sort({ name: 1 });
      
      // Get all products with their categories
      const products = await Product.find()
        .populate('category', 'name')
        .sort({ createdAt: -1 })
        .lean();
        
      // For each product, calculate total stock quantity from StockItem
      // This is a naive approach; for production with many products, an aggregation pipeline is better
      const productIds = products.map(p => p._id);
      
      const stockAgg = await StockItem.aggregate([
        { $match: { product: { $in: productIds } } },
        { $group: { _id: "$product", totalQuantity: { $sum: "$totalQuantity" } } }
      ]);
      
      const stockMap = {};
      stockAgg.forEach(item => {
        stockMap[item._id.toString()] = item.totalQuantity;
      });
      
      products.forEach(p => {
        p.quantity = stockMap[p._id.toString()] || 0;
      });

      res.render('products/index', { 
        title: 'Quản lý sản phẩm',
        products,
        categories: categories.map(c => c.toObject())
      });
    } catch (error) {
      console.error(error);
      req.flash('error_msg', 'Lỗi tải danh sách sản phẩm');
      res.redirect('/dashboard');
    }
  },

  // === API CONTROLLERS ===
  
  getAll: async (req, res) => {
    try {
      const products = await Product.find()
        .populate('category', 'name')
        .sort({ name: 1 })
        .lean();
        
      res.json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id).populate('category', 'name').lean();
      
      if (!product) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
      }
      
      res.json({ success: true, data: product });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  
  create: async (req, res) => {
    try {
      const product = new Product(req.body);
      await product.save();
      
      await product.populate('category', 'name');
      
      res.status(201).json({ success: true, data: product, message: 'Thêm sản phẩm thành công' });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ success: false, message: 'Mã SKU đã tồn tại' });
      }
      res.status(400).json({ success: false, message: error.message });
    }
  },
  
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndUpdate(
        id, 
        req.body, 
        { new: true, runValidators: true }
      ).populate('category', 'name');
      
      if (!product) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
      }
      
      res.json({ success: true, data: product, message: 'Cập nhật sản phẩm thành công' });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ success: false, message: 'Mã SKU đã tồn tại' });
      }
      res.status(400).json({ success: false, message: error.message });
    }
  },
  
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Check if product is in stock
      const stockCount = await StockItem.countDocuments({ product: id });
      if (stockCount > 0) {
        return res.status(400).json({ 
          success: false, 
          message: 'Không thể xóa sản phẩm đang có trong kho' 
        });
      }
      
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
      }
      
      res.json({ success: true, message: 'Xóa sản phẩm thành công' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

module.exports = productController;
