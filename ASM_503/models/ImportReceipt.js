const mongoose = require('mongoose');

const importItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  shelf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shelf',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  importPrice: {
    type: Number,
    required: true,
    min: 0
  },
  subtotal: {
    type: Number,
    default: 0
  }
}, { _id: true });

const importReceiptSchema = new mongoose.Schema({
  receiptCode: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: [true, 'Nhà cung cấp là bắt buộc']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['batch', 'individual'],
    default: 'batch'
  },
  batchCode: {
    type: String,
    trim: true
  },
  items: [importItemSchema],
  totalAmount: {
    type: Number,
    default: 0
  },
  note: {
    type: String,
    trim: true
  },
  importDate: {
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
importReceiptSchema.pre('validate', async function(next) {
  if (!this.receiptCode) {
    const date = new Date();
    const dateStr = date.getFullYear().toString() +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      date.getDate().toString().padStart(2, '0');
    const count = await mongoose.model('ImportReceipt').countDocuments({
      receiptCode: new RegExp(`^NK-${dateStr}`)
    });
    this.receiptCode = `NK-${dateStr}-${(count + 1).toString().padStart(3, '0')}`;
  }
  next();
});

// Calculate totalAmount before save
importReceiptSchema.pre('save', function(next) {
  this.items.forEach(item => {
    item.subtotal = item.quantity * item.importPrice;
  });
  this.totalAmount = this.items.reduce((sum, item) => sum + item.subtotal, 0);
  next();
});

// Indexes
importReceiptSchema.index({ supplier: 1, importDate: -1 });
importReceiptSchema.index({ importDate: -1 });
importReceiptSchema.index({ status: 1 });

module.exports = mongoose.model('ImportReceipt', importReceiptSchema);
