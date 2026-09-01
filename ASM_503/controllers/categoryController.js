const { Category, Product } = require('../models');

const categoryController = {
  // === WEB CONTROLLERS ===
  
  // List categories
  index: async (req, res) => {
    try {
      const { search, parentId } = req.query;
      const filter = {};
      
      if (search) {
        filter.name = { $regex: search, $options: 'i' };
      }
      
      if (parentId) {
        if (parentId === 'none') {
          filter.parentId = null;
        } else {
          filter.parentId = parentId;
        }
      }

      const categories = await Category.find(filter)
        .populate('parentId', 'name')
        .sort({ createdAt: -1 });
        
      // Fetch parent categories for the filter dropdown
      const parentCategories = await Category.find({ parentId: null }).sort({ name: 1 });

      res.render('categories/index', { 
        title: 'Quản lý danh mục',
        categories: categories.map(c => c.toObject()),
        parentCategories: parentCategories.map(c => c.toObject()),
        search,
        parentId
      });
    } catch (error) {
      console.error(error);
      req.flash('error_msg', 'Lỗi tải danh sách danh mục');
      res.redirect('/dashboard');
    }
  },

  // === API CONTROLLERS ===
  
  // Get all categories
  getAll: async (req, res) => {
    try {
      const categories = await Category.find()
        .populate('parentId', 'name')
        .sort({ name: 1 });
      res.json({ success: true, data: categories });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findById(id).populate('parentId', 'name').lean();
      
      if (!category) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy danh mục' });
      }
      
      res.json({ success: true, data: category });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  
  create: async (req, res) => {
    try {
      const { name, description, parentId } = req.body;
      const category = new Category({ 
        name, 
        description, 
        parentId: parentId || null 
      });
      await category.save();
      res.status(201).json({ success: true, data: category, message: 'Thêm danh mục thành công' });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ success: false, message: 'Tên danh mục đã tồn tại' });
      }
      res.status(400).json({ success: false, message: error.message });
    }
  },
  
  // Update category
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, parentId } = req.body;
      
      // Prevent setting parentId to itself
      if (parentId && String(parentId) === String(id)) {
        return res.status(400).json({ success: false, message: 'Danh mục cha không hợp lệ' });
      }

      const category = await Category.findByIdAndUpdate(
        id, 
        { name, description, parentId: parentId || null }, 
        { new: true, runValidators: true }
      );
      
      if (!category) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy danh mục' });
      }
      
      res.json({ success: true, data: category, message: 'Cập nhật danh mục thành công' });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ success: false, message: 'Tên danh mục đã tồn tại' });
      }
      res.status(400).json({ success: false, message: error.message });
    }
  },
  
  // Delete category
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Check if category has products
      const productCount = await Product.countDocuments({ category: id });
      if (productCount > 0) {
        return res.status(400).json({ 
          success: false, 
          message: `Không thể xóa danh mục đang có ${productCount} sản phẩm` 
        });
      }
      
      // Check if category has child categories
      const childCount = await Category.countDocuments({ parentId: id });
      if (childCount > 0) {
        return res.status(400).json({ 
          success: false, 
          message: `Không thể xóa danh mục đang chứa ${childCount} danh mục con` 
        });
      }

      const category = await Category.findByIdAndDelete(id);
      if (!category) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy danh mục' });
      }
      
      res.json({ success: true, message: 'Xóa danh mục thành công' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

module.exports = categoryController;
