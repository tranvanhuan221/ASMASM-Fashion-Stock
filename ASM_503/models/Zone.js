const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Mã khu là bắt buộc'],
    unique: true,
    uppercase: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Tên khu là bắt buộc'],
    trim: true
  },
  warehouseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Warehouse',
    required: [true, 'Kho tổng là bắt buộc']
  },
  description: {
    type: String,
    trim: true
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

// Virtual: get all aisles in this zone
zoneSchema.virtual('aisles', {
  ref: 'Aisle',
  localField: '_id',
  foreignField: 'zoneId'
});

// Index
zoneSchema.index({ warehouseId: 1 });

module.exports = mongoose.model('Zone', zoneSchema);
