const mongoose = require('mongoose');

const tierSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Mã tầng là bắt buộc'],
    unique: true,
    uppercase: true,
    trim: true
  },
  shelfId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shelf',
    required: [true, 'Kệ hàng là bắt buộc']
  },
  name: {
    type: String,
    required: [true, 'Tên/Số thứ tự tầng là bắt buộc'],
    trim: true
  },
  capacity: {
    type: Number,
    default: 10,
    description: 'Sức chứa (số lượng Pallet)'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

tierSchema.virtual('pallets', {
  ref: 'Pallet',
  localField: '_id',
  foreignField: 'tierId'
});

tierSchema.index({ shelfId: 1 });

module.exports = mongoose.model('Tier', tierSchema);
