const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const User = require('../models/userModel');
const Order = require('../models/orderModel');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const path = require('path');

// Multer config for image upload (local disk, not used for Cloudinary)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dn7zah8um",
  api_key: process.env.CLOUDINARY_API_KEY || '626199732678851',
  api_secret: process.env.CLOUDINARY_API_SECRET || "R-YWdGVQlebAhRHmXtUaw5E5U_o",
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
  const { adminEmail } = req.query;
  if (!adminEmail) return res.status(401).json({ error: 'Admin email required' });
  const user = await User.findOne({ email: adminEmail });
  if (!user || !user.isAdmin) return res.status(403).json({ error: 'Not authorized' });
  next();
};

// Product CRUD Operations

// Create product (enhanced)
router.post('/product', isAdmin, async (req, res) => {
  try {
    const { 
      name, brand, price, originalPrice, description, category, subcategory,
      specs, images, stock, isHotDeal, hotDealDiscount, tags 
    } = req.body;
    
    let parsedSpecs = {};
    if (typeof specs === 'string') {
      try { parsedSpecs = JSON.parse(specs); } catch { parsedSpecs = {}; }
    } else if (typeof specs === 'object') {
      parsedSpecs = specs;
    }
    
    let imageArr = [];
    if (Array.isArray(images)) imageArr = images;
    else if (typeof images === 'string') imageArr = [images];
    if (!imageArr.length || !imageArr[0]) return res.status(400).json({ error: 'Image is required.' });
    
    const product = new Product({ 
      name, brand, price, originalPrice, description, category, subcategory,
      specs: parsedSpecs, images: imageArr, stock: stock || 1,
      isHotDeal: isHotDeal || false, hotDealDiscount: hotDealDiscount || 0,
      tags: tags || []
    });
    
    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all products (admin)
router.get('/products', isAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, category, search, sort = '-createdAt' } = req.query;
    
    let query = {};
    if (category && category !== 'all') query.category = category;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const products = await Product.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Product.countDocuments(query);
    
    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Update product
router.put('/product/:id', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    if (updateData.specs && typeof updateData.specs === 'string') {
      try { updateData.specs = JSON.parse(updateData.specs); } catch { updateData.specs = {}; }
    }
    
    const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    
    res.json({ message: 'Product updated successfully', product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete product
router.delete('/product/:id', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get single product
router.get('/product/:id', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Orders Management

// Get all orders
router.get('/orders', isAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, status, search, sort = '-date' } = req.query;
    
    let query = {};
    if (status && status !== 'all') query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }
    
    const orders = await Order.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Order.countDocuments(query);
    
    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Update order status
router.put('/order/:id', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    
    res.json({ message: 'Order updated successfully', order });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Analytics & Dashboard

// Get dashboard stats
router.get('/dashboard-stats', isAdmin, async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments({ isActive: true });
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    
    const totalEarnings = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    
    const recentOrders = await Order.find()
      .sort({ date: -1 })
      .limit(5)
      .select('name total status date');
    
    const topProducts = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.name',
          totalSold: { $sum: '$items.quantity' },
          totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 }
    ]);
    
    const monthlyEarnings = await Order.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' }
          },
          total: { $sum: '$total' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 }
    ]);
    
    res.json({
      totalProducts,
      totalOrders,
      totalUsers,
      totalEarnings: totalEarnings[0]?.total || 0,
      recentOrders,
      topProducts,
      monthlyEarnings
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// Get earnings by date range
router.get('/earnings', isAdmin, async (req, res) => {
  try {
    const { startDate, endDate, groupBy = 'day' } = req.query;
    
    let matchQuery = {};
    if (startDate && endDate) {
      matchQuery.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    
    let groupByQuery;
    switch (groupBy) {
      case 'month':
        groupByQuery = {
          year: { $year: '$date' },
          month: { $month: '$date' }
        };
        break;
      case 'week':
        groupByQuery = {
          year: { $year: '$date' },
          week: { $week: '$date' }
        };
        break;
      default:
        groupByQuery = {
          year: { $year: '$date' },
          month: { $month: '$date' },
          day: { $dayOfMonth: '$date' }
        };
    }
    
    const earnings = await Order.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: groupByQuery,
          total: { $sum: '$total' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ]);
    
    res.json(earnings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch earnings data' });
  }
});

// Image upload route (admin only) - Cloudinary
router.post('/upload-image', isAdmin, uploadCloud.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ url: req.file.path });
});

// Multiple images upload
router.post('/upload-images', isAdmin, uploadCloud.array('images', 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }
  
  const urls = req.files.map(file => file.path);
  res.json({ urls });
});

module.exports = router;
