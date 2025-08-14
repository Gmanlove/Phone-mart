require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5000

// Import models
const Product = require('./models/productModel')
const User = require('./models/userModel')
const Order = require('./models/orderModel')

// Import routes
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin')
const orderRoutes = require('./routes/order')

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://smartcoms.onrender.com', 'https://phone-mart-frontend.vercel.app'],
  credentials: true
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/orders', orderRoutes)

// Get all products with search functionality
app.get('/api/products', async (req, res) => {
  try {
    const { search, category, brand, minPrice, maxPrice, sort = 'name' } = req.query
    
    // Build search query
    let query = {}
    
    // Text search across name, brand, description, and tags
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'tags': { $regex: search, $options: 'i' } }
      ]
    }
    
    // Category filter
    if (category && category !== 'all') {
      query.category = category
    }
    
    // Brand filter
    if (brand) {
      query.brand = { $regex: brand, $options: 'i' }
    }
    
    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = parseFloat(minPrice)
      if (maxPrice) query.price.$lte = parseFloat(maxPrice)
    }
    
    // Sort options
    let sortOption = {}
    switch (sort) {
      case 'price-low':
        sortOption = { price: 1 }
        break
      case 'price-high':
        sortOption = { price: -1 }
        break
      case 'rating':
        sortOption = { rating: -1 }
        break
      case 'newest':
        sortOption = { createdAt: -1 }
        break
      case 'name':
      default:
        sortOption = { name: 1 }
        break
    }
    
    const products = await Product.find(query).sort(sortOption)
    
    console.log(`Found ${products.length} products for query:`, req.query)
    
    // Log each product for debugging
    products.forEach((product) => {
      console.log(`Product ID: ${product._id}, Name: ${product.name}`)
    })
    
    res.json(products)
  } catch (err) {
    console.error('Error fetching products:', err)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

// Get single product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params
    console.log(`Attempting to fetch product with ID: ${id}`)
    
    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log(`Invalid ObjectId format: ${id}`)
      return res.status(400).json({ error: 'Invalid product ID format' })
    }
    
    const product = await Product.findById(id)
    console.log(`Product found:`, product ? `${product.name}` : 'null')
    
    if (!product) {
      console.log(`Product with ID ${id} not found in database`)
      return res.status(404).json({ error: 'Product not found' })
    }
    
    res.json(product)
  } catch (err) {
    console.error('Error fetching product:', err)
    res.status(500).json({ error: 'Failed to fetch product' })
  }
})

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/phonemart')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app