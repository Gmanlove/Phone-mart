const express = require('express')
const router = express.Router()
const Order = require('../models/orderModel')
const Product = require('../models/productModel')

// Create new order
router.post('/', async (req, res) => {
  try {
    console.log('Order creation request received:', req.body)
    
    const { name, email, phone, address, items, total } = req.body
    
    // Log each required field
    console.log('Order validation:', {
      name: name || 'MISSING',
      email: email || 'MISSING',
      phone: phone || 'MISSING',
      address: address || 'MISSING',
      items: items ? `${items.length} items` : 'MISSING',
      total: total || 'MISSING'
    })
    
    if (!name || !email || !phone || !address || !items || !total) {
      console.log('Missing required fields detected')
      return res.status(400).json({ 
        error: 'Missing required fields',
        received: { name: !!name, email: !!email, phone: !!phone, address: !!address, items: !!items, total: !!total }
      })
    }

    // Check stock availability and update stock
    for (const item of items) {
      const product = await Product.findById(item.id)
      if (!product) {
        return res.status(400).json({ error: `Product ${item.name} not found` })
      }
      
      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          error: `Insufficient stock for ${item.name}. Available: ${product.stock}, Requested: ${item.quantity}` 
        })
      }
      
      // Update product stock
      product.stock -= item.quantity
      await product.save()
      console.log(`Updated stock for ${product.name}: ${product.stock + item.quantity} -> ${product.stock}`)
    }
    
    const order = new Order({ name, email, phone, address, items, total })
    console.log('Creating order:', order)
    
    await order.save()
    console.log('Order saved successfully:', order._id)
    
    res.status(201).json({ message: 'Order created', order })
  } catch (err) {
    console.error('Order creation error:', err)
    
    // If order creation fails, we should restore the stock
    // This is a simple implementation - in production, you'd want to use transactions
    try {
      const { items } = req.body
      if (items) {
        for (const item of items) {
          await Product.findByIdAndUpdate(item.id, { $inc: { stock: item.quantity } })
        }
      }
    } catch (restoreError) {
      console.error('Failed to restore stock:', restoreError)
    }
    
    res.status(400).json({ error: err.message })
  }
})

// Get all orders (admin)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query
    
    let query = {}
    if (status && status !== 'all') query.status = status
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ]
    }
    
    const orders = await Order.find(query)
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
    
    const total = await Order.countDocuments(query)
    
    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' })
  }
})

// Get orders by user email (for customer order history)
router.get('/user/:email', async (req, res) => {
  try {
    const { email } = req.params
    const { page = 1, limit = 20, status } = req.query
    
    let query = { email }
    if (status && status !== 'all') query.status = status
    
    const orders = await Order.find(query)
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
    
    const total = await Order.countDocuments(query)
    
    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user orders' })
  }
})

// Get single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ error: 'Order not found' })
    res.json(order)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order' })
  }
})

// Update order status
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
    if (!order) return res.status(404).json({ error: 'Order not found' })
    res.json({ message: 'Order updated successfully', order })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Delete order (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ error: 'Order not found' })
    
    // Restore stock when deleting an order
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.id, { $inc: { stock: item.quantity } })
    }
    
    await Order.findByIdAndDelete(req.params.id)
    res.json({ message: 'Order deleted successfully' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = router
