const productService = require('../../services/productService');

class ShopProductController {
  async getAll(req, res) {
    try {
      const products = await productService.getAllProducts();
      res.json(products);
    } catch (err) {
      console.error('GET /products error:', err.message);
      res.status(500).json({ message: 'Lỗi server khi lấy danh sách sản phẩm' });
    }
  }

  async getById(req, res) {
    try {
      const product = await productService.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      }
      res.json(product);
    } catch (err) {
      console.error('GET /products/:id error:', err.message);
      res.status(500).json({ message: 'Lỗi server khi lấy chi tiết sản phẩm' });
    }
  }

  async create(req, res) {
    try {
      const product = await productService.createProduct(req.body);
      res.status(201).json(product);
    } catch (err) {
      console.error('POST /products error:', err.message);
      if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({ message: messages.join(', ') });
      }
      res.status(500).json({ message: 'Lỗi server khi tạo sản phẩm' });
    }
  }

  async update(req, res) {
    try {
      const product = await productService.updateProduct(req.params.id, req.body);
      if (!product) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      }
      res.json(product);
    } catch (err) {
      console.error('PUT /products/:id error:', err.message);
      res.status(500).json({ message: 'Lỗi server khi cập nhật sản phẩm' });
    }
  }

  async delete(req, res) {
    try {
      const product = await productService.deleteProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      }
      res.json({ message: 'Xóa sản phẩm thành công' });
    } catch (err) {
      console.error('DELETE /products/:id error:', err.message);
      res.status(500).json({ message: 'Lỗi server khi xóa sản phẩm' });
    }
  }
}

module.exports = new ShopProductController();
