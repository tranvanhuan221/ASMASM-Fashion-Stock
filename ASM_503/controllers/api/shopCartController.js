const cartService = require('../../services/cartService');

class ShopCartController {
  async getByUserId(req, res) {
    try {
      const cart = await cartService.getCart(req.params.userId);
      res.json(cart);
    } catch (err) {
      console.error('GET /cart/:userId error:', err.message);
      res.status(500).json({ message: 'Lỗi server khi lấy giỏ hàng' });
    }
  }

  async update(req, res) {
    try {
      const { items } = req.body;
      const cart = await cartService.updateCart(req.params.userId, items);
      res.json(cart);
    } catch (err) {
      console.error('PUT /cart/:userId error:', err.message);
      res.status(500).json({ message: 'Lỗi server khi cập nhật giỏ hàng' });
    }
  }

  async clear(req, res) {
    try {
      const cart = await cartService.clearCart(req.params.userId);
      res.json(cart);
    } catch (err) {
      console.error('DELETE /cart/:userId error:', err.message);
      res.status(500).json({ message: 'Lỗi server khi xóa giỏ hàng' });
    }
  }

  async merge(req, res) {
    try {
      const { userId, localItems } = req.body;
      const cart = await cartService.mergeCart(userId, localItems);
      res.json(cart);
    } catch (err) {
      console.error('POST /cart/merge error:', err.message);
      res.status(500).json({ message: 'Lỗi server khi gộp giỏ hàng' });
    }
  }
}

module.exports = new ShopCartController();
