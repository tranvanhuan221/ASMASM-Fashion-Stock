const Review = require('../models/Review');
const ShopOrder = require('../models/ShopOrder');

class ReviewService {
  async getReviewsByProduct(productId) {
    return await Review.find({ productId }).sort({ createdAt: -1 });
  }

  async createReview(data) {
    const { userId, userName, productId, orderId, rating, comment } = data;
    
    // Check order
    const order = await ShopOrder.findOne({ _id: orderId, userId });
    if (!order) throw new Error('Không tìm thấy đơn hàng');
    if (order.status !== 'completed') throw new Error('Đơn hàng chưa hoàn thành');
    
    // Check if product is in order
    const itemExists = order.items.some(item => String(item.productId) === String(productId));
    if (!itemExists) throw new Error('Sản phẩm không thuộc đơn hàng này');

    // Check if already reviewed
    const existingReview = await Review.findOne({ orderId, productId, userId });
    if (existingReview) throw new Error('Bạn đã đánh giá sản phẩm này rồi');

    return await Review.create({
      userId,
      userName,
      productId,
      orderId,
      rating,
      comment
    });
  }

  async getReviewsByOrderUser(orderId, userId) {
    return await Review.find({ orderId, userId });
  }

  async getReviewsByUser(userId) {
    return await Review.find({ userId });
  }
}

module.exports = new ReviewService();
