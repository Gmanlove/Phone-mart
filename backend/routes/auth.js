const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// Ensure admin user exists (run once at server start)
const ensureAdminUser = async () => {
  const adminEmail = "admin@phonehub.com";
  const adminPassword = "Admin@1234";
  let admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    admin = new User({ email: adminEmail, phone: "0000000000", password: adminPassword, isAdmin: true });
    await admin.save();
    console.log("Admin user created:", adminEmail);
  } else if (!admin.isAdmin) {
    admin.isAdmin = true;
    await admin.save();
    console.log("Admin user updated to isAdmin:", adminEmail);
  }
};
ensureAdminUser();

// Signup
router.post('/signup', async (req, res) => {
  const { name, email, phone, password } = req.body;
  console.log('Signup request body:', req.body); // Debug log
  if (!email || !phone || !password) {
    return res.status(400).json({ error: 'All fields are required: email, phone, password.' });
  }
  try {
    const user = new User({ name, email, phone, password });
    await user.save();
    // Issue token
    const secret = process.env.JWT_SECRET || 'dev_secret'
    const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: '7d' })
    res.status(201).json({ message: 'User created successfully', token, user: { email: user.email, name: user.name, isAdmin: user.isAdmin } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Signin (return isAdmin flag)
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    const secret = process.env.JWT_SECRET || 'dev_secret'
    const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: '7d' })
    res.json({ message: 'Signin successful', token, user: { email: user.email, name: user.name, isAdmin: user.isAdmin } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin custom login
router.post('/admin-login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.isAdmin) return res.status(403).json({ error: 'Not authorized as admin' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    res.json({ message: 'Admin login successful', isAdmin: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get billing information for a user by email
router.get('/billing', auth, async (req, res) => {
  try {
    const email = req.user.email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json({ billing: user.billing || {} });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Update billing information for a user
router.put('/billing', auth, async (req, res) => {
  const { billing } = req.body;
  try {
    const email = req.user.email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.billing = billing || {};
    await user.save();
    return res.json({ message: 'Billing updated', billing: user.billing });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Get public profile information for a user
router.get('/profile', auth, async (req, res) => {
  try {
    const email = req.user.email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Compute totalSpent from orders
    const Order = require('../models/orderModel')
    const agg = await Order.aggregate([
      { $match: { email: user.email } },
      { $group: { _id: null, totalSpent: { $sum: "$total" } } }
    ])
    const totalSpent = agg && agg[0] ? agg[0].totalSpent : 0

    return res.json({
      email: user.email,
      name: user.name,
      phone: user.phone,
      createdAt: user.createdAt,
      isAdmin: user.isAdmin,
      billing: user.billing || {},
      totalSpent
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;

