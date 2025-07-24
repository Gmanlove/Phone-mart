const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

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
  const { email, phone, password } = req.body;
  console.log('Signup request body:', req.body); // Debug log
  if (!email || !phone || !password) {
    return res.status(400).json({ error: 'All fields are required: email, phone, password.' });
  }
  try {
    const user = new User({ email, phone, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
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
    res.json({ message: 'Signin successful', isAdmin: user.isAdmin });
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

module.exports = router;
