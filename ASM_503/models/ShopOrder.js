const mongoose = require('mongoose');

// Schema item trong đơn hàng
const orderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  size: { type: String, default: '' },
  color: { type: String, default: '' },
  price: { type: Number, required: true },
  img: { type: String, default: '' }
}, { _id: false });

// Schema đơn hàng từ FE Shop (tách biệt với Order Sequelize của Warehouse)
const shopOrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'userId là bắt buộc'],
    index: true
  },
  customerName: {
    type: String,
    required: [true, 'Tên khách hàng là bắt buộc'],
    trim: true
  },
  customerEmail: {
    type: String,
    required: [true, 'Email là bắt buộc'],
    trim: true,
    lowercase: true
  },
  customerPhone: {
    type: String,
    required: [true, 'Số điện thoại là bắt buộc'],
    trim: true
  },
  customerAddress: {
    type: String,
    required: [true, 'Địa chỉ là bắt buộc'],
    trim: true
  },
  items: {
    type: [orderItemSchema],
    required: true,
    validate: {
      validator: function(v) { return v && v.length > 0; },
      message: 'Đơn hàng phải có ít nhất 1 sản phẩm'
    }
  },
  total: {
    type: Number,
    required: [true, 'Tổng tiền là bắt buộc'],
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipping', 'delivered', 'completed', 'returned', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cod', 'bank', 'momo', 'vnpay'],
    default: 'cod'
  },
  shipping: {
    type: Number,
    default: 0
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid', 'refund_requested', 'refunded'],
    default: 'unpaid'
  },
  receivedAt: {
    type: Date,
    default: null
  },
  returnRequested: {
    type: Boolean,
    default: false
  },
  returnReason: {
    type: String,
    default: ''
  },
  returnStatus: {
    type: String,
    enum: ['none', 'pending', 'approved', 'rejected'],
    default: 'none'
  },
  cancelRequested: {
    type: Boolean,
    default: false
  },
  cancelReason: {
    type: String,
    default: ''
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('ShopOrder', shopOrderSchema);
