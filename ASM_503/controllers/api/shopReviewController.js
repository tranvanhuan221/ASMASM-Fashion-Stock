const reviewService = require('../../services/reviewService');

class ShopReviewController {
  async getByProduct(req, res) {
    try {
      const reviews = await reviewService.getReviewsByProduct(req.params.id);
      res.json(reviews);
    } catch (err) {
      console.error('GET /products/:id/reviews error:', err.message);
      res.status(500).json({ message: 'Lỗi server khi lấy đánh giá' });
    }
  }

  async create(req, res) {
    try {
      const review = await reviewService.createReview(req.body);
      res.status(201).json(review);
    } catch (err) {
      console.error('POST /reviews error:', err.message);
      // Maps to previous custom error messages
      if (['Không tìm thấy đơn hàng', 'Đơn hàng chưa hoàn thành', 'Sản phẩm không thuộc đơn hàng này', 'Bạn đã đánh giá sản phẩm này rồi'].includes(err.message)) {
        return res.status(400).json({ message: err.message });
      }
      res.status(500).json({ message: 'Lỗi server khi tạo đánh giá' });
    }
  }

  async getByOrder(req, res) {
    try {
      const { userId } = req.query;
      if (!userId) return res.status(400).json({ message: 'Thiếu userId' });
      const reviews = await reviewService.getReviewsByOrderUser(req.params.id, userId);
      res.json(reviews);
    } catch (err) {
      console.error('GET /orders/:id/reviews error:', err.message);
      res.status(500).json({ message: 'Lỗi server khi lấy đánh giá' });
    }
  }

  async getByUser(req, res) {
    try {
      const reviews = await reviewService.getReviewsByUser(req.params.id);
      res.json(reviews);
    } catch (err) {
      console.error('GET /users/:id/reviews error:', err.message);
      res.status(500).json({ message: 'Lỗi server khi lấy đánh giá user' });
    }
  }
}

module.exports = new ShopReviewController();
