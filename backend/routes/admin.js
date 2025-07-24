const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const User = require('../models/userModel');
const multer = require('multer');
const path = require('path');

// Multer config for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Middleware to check admin
const isAdmin = async (req, res, next) => {
  // For demo: expects ?adminEmail=... in query, in real app use JWT/session
  const { adminEmail } = req.query;
  if (!adminEmail) return res.status(401).json({ error: 'Admin email required' });
  const user = await User.findOne({ email: adminEmail });
  if (!user || !user.isAdmin) return res.status(403).json({ error: 'Not authorized' });
  next();
};

// Product upload (admin only)
router.post('/product', isAdmin, async (req, res) => {
  try {
    const { name, brand, price, description, category, specs, images } = req.body;
    const product = new Product({ name, brand, price, description, category, specs, images });
    await product.save();
    res.status(201).json({ message: 'Product uploaded', product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Image upload route (admin only)
router.post('/upload-image', isAdmin, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const url = `/uploads/${req.file.filename}`;
  res.json({ url });
});

module.exports = router;
