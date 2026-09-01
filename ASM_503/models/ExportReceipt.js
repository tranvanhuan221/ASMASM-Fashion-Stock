const mongoose = require('mongoose');

const exportItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  palletDeductions: [{
    palletId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pallet' },
    palletCode: String,
    quantity: Number
  }]
}, { _id: true });

const exportReceiptSchema = new mongoose.Schema({
  receiptCode: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  reason: {
    type: String,
    default: 'Xuất bán'
  },
  items: [exportItemSchema],
  exportDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'completed'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Auto-generate receipt code
exportReceiptSchema.pre('validate', async function(next) {
  if (!this.receiptCode) {
    const date = new Date();
    const dateStr = date.getFullYear().toString() +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      date.getDate().toString().padStart(2, '0');
    const count = await mongoose.model('ExportReceipt').countDocuments({
      receiptCode: new RegExp(`^XK-${dateStr}`)
    });
    this.receiptCode = `XK-${dateStr}-${(count + 1).toString().padStart(3, '0')}`;
  }
  next();
});

exportReceiptSchema.index({ exportDate: -1 });

module.exports = mongoose.model('ExportReceipt', exportReceiptSchema);
