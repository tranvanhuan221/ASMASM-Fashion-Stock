const mongoose = require('mongoose');

const aisleSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Mã dãy là bắt buộc'],
    unique: true,
    uppercase: true,
    trim: true
  },
  zoneId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Zone',
    required: [true, 'Khu vực là bắt buộc']
  },
  name: {
    type: String,
    required: [true, 'Tên dãy là bắt buộc'],
    trim: true
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

// Virtual: get all shelves in this aisle
aisleSchema.virtual('shelves', {
  ref: 'Shelf',
  localField: '_id',
  foreignField: 'aisleId'
});

aisleSchema.index({ zoneId: 1 });

module.exports = mongoose.model('Aisle', aisleSchema);
