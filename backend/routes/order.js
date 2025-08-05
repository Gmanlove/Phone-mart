const express = require('express')
const router = express.Router()
const Order = require('../models/orderModel')

// Create new order
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, address, items, total } = req.body
    if (!name || !email || !phone || !address || !items || !total) {
      return res.status(400).json({ error: 'Missing required fields' })
    }
    const order = new Order({ name, email, phone, address, items, total })
    await order.save()
    res.status(201).json({ message: 'Order created', order })
  } catch (err) {
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
    const order = await Order.findByIdAndDelete(req.params.id)
    if (!order) return res.status(404).json({ error: 'Order not found' })
    res.json({ message: 'Order deleted successfully' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = router
