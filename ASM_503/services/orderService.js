const ShopOrder = require('../models/ShopOrder');

class OrderService {
  async getAllOrders() {
    return await ShopOrder.find({}).sort({ createdAt: -1 });
  }

  async getOrdersByUser(userId) {
    return await ShopOrder.find({ userId }).sort({ createdAt: -1 });
  }

  async getOrderById(id) {
    return await ShopOrder.findById(id);
  }

  async createOrder(data) {
    return await ShopOrder.create({
      userId: data.userId,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      customerAddress: data.customerAddress,
      items: data.items,
      total: data.total,
      status: data.status || 'pending',
      paymentMethod: data.paymentMethod || 'cod',
      shipping: data.shipping || 0
    });
  }

  async updateOrder(id, data) {
    return await ShopOrder.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );
  }

  async deleteOrder(id) {
    return await ShopOrder.findByIdAndDelete(id);
  }
}

module.exports = new OrderService();
