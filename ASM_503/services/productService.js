const Product = require('../models/Product');

class ProductService {
  async getAllProducts() {
    return await Product.find({}).sort({ createdAt: -1 });
  }

  async getProductById(id) {
    return await Product.findById(id);
  }

  async createProduct(data) {
    return await Product.create(data);
  }

  async updateProduct(id, data) {
    return await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }
}

module.exports = new ProductService();
