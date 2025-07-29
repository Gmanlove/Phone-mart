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
    const orders = await Order.find().sort({ date: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' })
  }
})

module.exports = router
