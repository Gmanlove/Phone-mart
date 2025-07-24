const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const authRoutes = require('./routes/auth')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(bodyParser.json())

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err))

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Phone Mart API is running' })
})

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

// Authentication routes
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})