const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Mã kho là bắt buộc'],
    unique: true,
    uppercase: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Tên kho là bắt buộc'],
    trim: true
  },
  address: {
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

warehouseSchema.virtual('zones', {
  ref: 'Zone',
  localField: '_id',
  foreignField: 'warehouseId'
});

module.exports = mongoose.model('Warehouse', warehouseSchema);
