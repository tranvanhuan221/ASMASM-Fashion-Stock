const mongoose = require('mongoose');

const palletSchema = new mongoose.Schema({
  palletCode: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  importBatchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ImportBatch',
    required: true
  },
  tierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tier'
  },
  status: {
    type: String,
    enum: ['InTransit', 'Stored', 'Empty'],
    default: 'InTransit'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

palletSchema.virtual('stockItems', {
  ref: 'StockItem',
  localField: '_id',
  foreignField: 'palletId'
});

palletSchema.index({ tierId: 1 });
palletSchema.index({ importBatchId: 1 });

module.exports = mongoose.model('Pallet', palletSchema);
