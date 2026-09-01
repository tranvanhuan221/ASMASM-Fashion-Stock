const Category = require('../models/Category');

class CategoryService {
  async getAllCategories() {
    return await Category.find({}).sort({ createdAt: -1 });
  }

  async getCategoryById(id) {
    return await Category.findById(id);
  }

  async createCategory(data) {
    return await Category.create(data);
  }

  async updateCategory(id, data) {
    return await Category.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async deleteCategory(id) {
    return await Category.findByIdAndDelete(id);
  }
}

module.exports = new CategoryService();
