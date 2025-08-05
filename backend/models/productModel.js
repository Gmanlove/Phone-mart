const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number,
    default: null
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['iPhone', 'Samsung', 'Android/Pixel', 'Accessories', 'Laptops', 'Hot Deals', 'Other'],
    required: true
  },
  subcategory: {
    type: String,
    default: ''
  },
  specs: {
    type: Object,
    default: {}
  },
  images: [{
    type: String,
    required: true
  }],
  stock: {
    type: Number,
    default: 1
  },
  isHotDeal: {
    type: Boolean,
    default: false
  },
  hotDealDiscount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  tags: [{
    type: String
  }],
  rating: {
    type: Number,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

// Add indexes for better performance
productSchema.index({ category: 1 })
productSchema.index({ isHotDeal: 1 })
productSchema.index({ isActive: 1 })
productSchema.index({ price: 1 })
productSchema.index({ name: 'text', brand: 'text', description: 'text' })

module.exports = mongoose.model('Product', productSchema)