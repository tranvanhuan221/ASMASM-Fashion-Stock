const orderService = require('../../services/orderService');

class ShopOrderController {
  async getAll(req, res) {
    try {
      const orders = await orderService.getAllOrders();
      res.json(orders);
    } catch (err) {
      console.error('GET /orders error:', err.message);
      res.status(500).json({ message: 'Lỗi server khi lấy danh sách đơn hàng' });
    }
  }

  async getByUser(req, res) {
    try {
      const orders = await orderService.getOrdersByUser(req.params.userId);
      res.json(orders);
    } catch (err) {
      console.error('GET /orders/user/:userId error:', err.message);
      res.status(500).json({ message: 'Lỗi server khi lấy đơn hàng' });
    }
  }

  async getById(req, res) {
    try {
      const order = await orderService.getOrderById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
      }
      res.json(order);
    } catch (err) {
      console.error('GET /orders/:id error:', err.message);
      res.status(500).json({ message: 'Lỗi server khi lấy đơn hàng' });
    }
  }

  async create(req, res) {
    try {
      const order = await orderService.createOrder(req.body);
      res.status(201).json(order);
    } catch (err) {
      console.error('POST /orders error:', err.message);
      if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({ message: messages.join(', ') });
      }
      res.status(500).json({ message: 'Lỗi server khi tạo đơn hàng' });
    }
  }

  async update(req, res) {
    try {
      const order = await orderService.updateOrder(req.params.id, req.body);
      if (!order) {
        return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
      }
      res.json(order);
    } catch (err) {
      console.error('PUT /orders/:id error:', err.message);
      res.status(500).json({ message: 'Lỗi server khi cập nhật đơn hàng' });
    }
  }

  async delete(req, res) {
    try {
      const order = await orderService.deleteOrder(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
      }
      res.json({ message: 'Xóa đơn hàng thành công' });
    } catch (err) {
      console.error('DELETE /orders/:id error:', err.message);
      res.status(500).json({ message: 'Lỗi server khi xóa đơn hàng' });
    }
  }
}

module.exports = new ShopOrderController();
