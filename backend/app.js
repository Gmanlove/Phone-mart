require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin')
const orderRoutes = require('./routes/order')

const app = express()
app.use(cors())
app.use(bodyParser.json())

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err))

// Serve uploaded images statically from the /uploads directory.
app.use('/uploads', express.static(require('path').join(__dirname, 'uploads')))

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Phone Mart API is running' })
})

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find()
    console.log('Products found:', products.length)
    products.forEach(product => {
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

// Debug route to list all product IDs
app.get('/api/debug/products', async (req, res) => {
  try {
    const products = await Product.find({}, '_id name')
    res.json({
      count: products.length,
      products: products.map(p => ({
        id: p._id.toString(),
        name: p.name
      }))
    })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

// Authentication routes
app.use('/api/auth', authRoutes)

// Admin routes
app.use('/api/admin', adminRoutes)

// Order routes
app.use('/api/orders', orderRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})