const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

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

module.exports = router;
