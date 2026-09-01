const categoryService = require('../../services/categoryService');

class ShopCategoryController {
  async getAll(req, res) {
    try {
      const categories = await categoryService.getAllCategories();
      res.json(categories);
    } catch (err) {
      console.error('GET /categories error:', err.message);
      res.status(500).json({ message: 'Lỗi server khi lấy danh sách danh mục' });
    }
  }

  async getById(req, res) {
    try {
      const category = await categoryService.getCategoryById(req.params.id);
      if (!category) {
        return res.status(404).json({ message: 'Không tìm thấy danh mục' });
      }
      res.json(category);
    } catch (err) {
      console.error('GET /categories/:id error:', err.message);
      res.status(500).json({ message: 'Lỗi server khi lấy chi tiết danh mục' });
    }
  }

  async create(req, res) {
    try {
      const category = await categoryService.createCategory(req.body);
      res.status(201).json(category);
    } catch (err) {
      console.error('POST /categories error:', err.message);
      if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({ message: messages.join(', ') });
      }
      res.status(500).json({ message: 'Lỗi server khi tạo danh mục' });
    }
  }

  async update(req, res) {
    try {
      const category = await categoryService.updateCategory(req.params.id, req.body);
      if (!category) {
        return res.status(404).json({ message: 'Không tìm thấy danh mục' });
      }
      res.json(category);
    } catch (err) {
      console.error('PUT /categories/:id error:', err.message);
      res.status(500).json({ message: 'Lỗi server khi cập nhật danh mục' });
    }
  }

  async delete(req, res) {
    try {
      const category = await categoryService.deleteCategory(req.params.id);
      if (!category) {
        return res.status(404).json({ message: 'Không tìm thấy danh mục' });
      }
      res.json({ message: 'Xóa danh mục thành công' });
    } catch (err) {
      console.error('DELETE /categories/:id error:', err.message);
      res.status(500).json({ message: 'Lỗi server khi xóa danh mục' });
    }
  }
}

module.exports = new ShopCategoryController();
