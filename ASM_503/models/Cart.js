const mongoose = require('mongoose');

// Schema giỏ hàng - lưu trữ giỏ hàng cho từng user
const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'userId là bắt buộc'],
    unique: true,
    index: true
  },
  items: {
    type: [mongoose.Schema.Types.Mixed],
    default: []
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('Cart', cartSchema);
