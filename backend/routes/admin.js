const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const User = require('../models/userModel');
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

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

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'phone-mart-products',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const uploadCloud = multer({ storage: cloudinaryStorage });

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
    // Accept description as plain text, specs as plain text or object
    let parsedSpecs = {};
    if (typeof specs === 'string') {
      try { parsedSpecs = JSON.parse(specs); } catch { parsedSpecs = {}; }
    } else if (typeof specs === 'object') {
      parsedSpecs = specs;
    }
    // Accept images as array or single string
    let imageArr = [];
    if (Array.isArray(images)) imageArr = images;
    else if (typeof images === 'string') imageArr = [images];
    if (!imageArr.length || !imageArr[0]) return res.status(400).json({ error: 'Image is required.' });
    const product = new Product({ name, brand, price, description, category, specs: parsedSpecs, images: imageArr });
    await product.save();
    res.status(201).json({ message: 'Product uploaded', product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Image upload route (admin only) - Cloudinary
router.post('/upload-image', isAdmin, uploadCloud.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ url: req.file.path }); // Cloudinary URL
});

module.exports = router;
