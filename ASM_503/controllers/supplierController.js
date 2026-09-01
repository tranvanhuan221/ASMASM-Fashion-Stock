const { Supplier } = require('../models');

const supplierController = {
  // === WEB CONTROLLERS ===
  
  index: async (req, res) => {
    try {
      const suppliers = await Supplier.find().sort({ createdAt: -1 });
      res.render('suppliers/index', { 
        title: 'Quản lý nhà cung cấp',
        suppliers: suppliers.map(s => s.toObject())
      });
    } catch (error) {
      console.error(error);
      req.flash('error_msg', 'Lỗi tải danh sách nhà cung cấp');
      res.redirect('/dashboard');
    }
  },

  // === API CONTROLLERS ===
  
  getAll: async (req, res) => {
    try {
      const suppliers = await Supplier.find().sort({ name: 1 });
      res.json({ success: true, data: suppliers });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  
  create: async (req, res) => {
    try {
      const supplier = new Supplier(req.body);
      await supplier.save();
      res.status(201).json({ success: true, data: supplier, message: 'Thêm nhà cung cấp thành công' });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ success: false, message: 'Email hoặc Số điện thoại đã tồn tại' });
      }
      res.status(400).json({ success: false, message: error.message });
    }
  },
  
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const supplier = await Supplier.findByIdAndUpdate(
        id, 
        req.body, 
        { new: true, runValidators: true }
      );
      
      if (!supplier) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy nhà cung cấp' });
      }
      
      res.json({ success: true, data: supplier, message: 'Cập nhật nhà cung cấp thành công' });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ success: false, message: 'Email hoặc Số điện thoại đã tồn tại' });
      }
      res.status(400).json({ success: false, message: error.message });
    }
  },
  
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const supplier = await Supplier.findByIdAndDelete(id);
      
      if (!supplier) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy nhà cung cấp' });
      }
      
      res.json({ success: true, message: 'Xóa nhà cung cấp thành công' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

module.exports = supplierController;
