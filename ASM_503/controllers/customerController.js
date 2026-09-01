const { Customer } = require('../models');

const customerController = {
  // === WEB CONTROLLERS ===
  
  index: async (req, res) => {
    try {
      const customers = await Customer.find().sort({ createdAt: -1 });
      res.render('customers/index', { 
        title: 'Quản lý khách hàng',
        customers: customers.map(c => c.toObject())
      });
    } catch (error) {
      console.error(error);
      req.flash('error_msg', 'Lỗi tải danh sách khách hàng');
      res.redirect('/dashboard');
    }
  },

  // === API CONTROLLERS ===
  
  getAll: async (req, res) => {
    try {
      const customers = await Customer.find().sort({ name: 1 });
      res.json({ success: true, data: customers });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  
  create: async (req, res) => {
    try {
      const customer = new Customer(req.body);
      await customer.save();
      res.status(201).json({ success: true, data: customer, message: 'Thêm khách hàng thành công' });
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
      const customer = await Customer.findByIdAndUpdate(
        id, 
        req.body, 
        { new: true, runValidators: true }
      );
      
      if (!customer) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy khách hàng' });
      }
      
      res.json({ success: true, data: customer, message: 'Cập nhật khách hàng thành công' });
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
      const customer = await Customer.findByIdAndDelete(id);
      
      if (!customer) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy khách hàng' });
      }
      
      res.json({ success: true, message: 'Xóa khách hàng thành công' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

module.exports = customerController;
