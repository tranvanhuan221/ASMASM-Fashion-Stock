const mongoose = require('mongoose');

const importBatchSchema = new mongoose.Schema({
  batchCode: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  importDate: {
    type: Date,
    default: Date.now
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier'
  },
  totalValue: {
    type: Number,
    default: 0
  },
  note: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Cancelled'],
    default: 'Pending'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

importBatchSchema.virtual('pallets', {
  ref: 'Pallet',
  localField: '_id',
  foreignField: 'importBatchId'
});

module.exports = mongoose.model('ImportBatch', importBatchSchema);
