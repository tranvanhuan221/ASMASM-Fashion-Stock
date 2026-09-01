const mongoose = require('mongoose');

const shelfSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Mã kệ là bắt buộc'],
    unique: true,
    uppercase: true,
    trim: true
  },
  aisleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Aisle',
    required: [true, 'Lô/Dãy là bắt buộc']
  },
  name: {
    type: String,
    required: [true, 'Tên kệ là bắt buộc'],
    trim: true
  },
  capacity: {
    type: Number,
    default: 100
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

// Virtual: get all tiers on this shelf
shelfSchema.virtual('tiers', {
  ref: 'Tier',
  localField: '_id',
  foreignField: 'shelfId'
});

// Index
shelfSchema.index({ aisleId: 1 });

module.exports = mongoose.model('Shelf', shelfSchema);
