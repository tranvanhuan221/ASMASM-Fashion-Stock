const mongoose = require('mongoose');

const stockItemSchema = new mongoose.Schema({
  palletId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pallet',
    required: [true, 'Pallet là bắt buộc']
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Sản phẩm là bắt buộc']
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  importPrice: {
    type: Number,
    required: [true, 'Giá nhập là bắt buộc'],
    min: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

stockItemSchema.index({ palletId: 1, product: 1 }, { unique: true });

module.exports = mongoose.model('StockItem', stockItemSchema);
