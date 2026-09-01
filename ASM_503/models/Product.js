const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: [true, 'Mã SKU là bắt buộc'],
    unique: true,
    uppercase: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Tên sản phẩm là bắt buộc'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  brand: {
    type: String,
    trim: true
  },
  images: {
    type: [String],
    default: []
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  salePrice: {
    type: Number
  },
  material: {
    type: String,
    trim: true
  },
  instruction: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    default: 0
  },
  attributes: {
    type: [mongoose.Schema.Types.Mixed],
    default: []
  },
  // Keep original fields for backward compatibility with Warehouse BE if needed
  size: { type: String, trim: true },
  color: { type: String, trim: true },
  
  // New Array fields for FE React App
  sizes: { type: [String], default: [] },
  colors: { type: [mongoose.Schema.Types.Mixed], default: [] },
  stock: { type: Number, default: 10 },
  
  weight: { type: Number, default: 0 }, // Khối lượng (gram)
  style: { type: String, trim: true },
  exportPrice: { type: Number, default: 0 },
  minQuantity: { type: Number, default: 10 },
  image: { type: String },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Text index for search
productSchema.index({ name: 'text', sku: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
