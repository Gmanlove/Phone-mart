require('dotenv').config()
const mongoose = require('mongoose')
const Product = require('./models/productModel')

// Enhanced product images with real URLs
const productImages = {
  iphones: [
    'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500',
    'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=500',
    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
    'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500'
  ],
  samsung: [
    'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500',
    'https://images.unsplash.com/photo-1520923642038-b4259acecbd7?w=500',
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500',
    'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=500'
  ],
  android: [
    'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500',
    'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500',
    'https://images.unsplash.com/photo-1607296849332-62ba61c42d1e?w=500',
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500',
    'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500'
  ],
  laptops: [
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
    'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500',
    'https://images.unsplash.com/photo-1504707748692-419802cf939d?w=500',
    'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=500'
  ],
  accessories: [
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500',
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500'
  ]
}

const comprehensiveProducts = [
  // =====================
  // IPHONE CATEGORY (20 products)
  // =====================
  // ...existing iPhone products from your code...

  // Continue with the complete Lenovo IdeaPad 5 Pro product:
  {
    name: 'Lenovo IdeaPad 5 Pro',
    brand: 'Lenovo',
    price: 799,
  price: 799000,
  originalPrice: 999000,
    description: 'Mid-range laptop with 2.5K display and AMD performance.',
    category: 'Laptops',
    subcategory: 'Mid-range',
    specs: {
      processor: 'AMD Ryzen 7 6800H',
      display: '16-inch 2.5K IPS',
      memory: '16GB DDR5',
      storage: '512GB SSD',
      battery: 'Up to 12 hours',
      weight: '4.4 pounds'
    },
    images: [productImages.laptops[3]],
    stock: 20,
    isHotDeal: true,
    hotDealDiscount: 20,
    tags: ['lenovo', 'amd', 'mid-range', '2.5k'],
    rating: 4.2,
    reviewCount: 145
  },
  {
    name: 'Framework Laptop 13',
    brand: 'Framework',
  price: 1049000,
  originalPrice: 1199000,
    description: 'Modular laptop with upgradeable components and sustainable design.',
    category: 'Laptops',
    subcategory: 'Innovative',
    specs: {
      processor: 'Intel Core i5-1240P',
      display: '13.5-inch 3:2 IPS',
      memory: '16GB DDR4',
      storage: '512GB SSD',
      battery: 'Up to 12 hours',
      weight: '2.87 pounds'
    },
    images: [productImages.laptops[4]],
    stock: 10,
    tags: ['framework', 'modular', 'sustainable', 'upgradeable'],
    rating: 4.6,
    reviewCount: 87
  },

  // =====================
  // ACCESSORIES CATEGORY (20 products)
  // =====================
  {
    name: 'AirPods Pro (2nd generation)',
    brand: 'Apple',
  price: 249000,
  originalPrice: 279000,
    description: 'Premium wireless earbuds with Active Noise Cancellation and spatial audio.',
    category: 'Accessories',
    subcategory: 'Audio',
    specs: {
      driver: 'Custom high-excursion driver',
      battery: 'Up to 6 hours listening time',
      features: 'Active Noise Cancellation, Transparency mode',
      connectivity: 'Bluetooth 5.3',
      charging: 'MagSafe charging case'
    },
    images: [productImages.accessories[0]],
    stock: 45,
    isHotDeal: true,
    hotDealDiscount: 11,
    tags: ['airpods', 'anc', 'spatial-audio', 'premium'],
    rating: 4.7,
    reviewCount: 567
  },
  {
    name: 'AirPods (3rd generation)',
    brand: 'Apple',
  price: 179000,
  originalPrice: 199000,
    description: 'Wireless earbuds with spatial audio and sweat resistance.',
    category: 'Accessories',
    subcategory: 'Audio',
    specs: {
      driver: 'Custom high-excursion driver',
      battery: 'Up to 6 hours listening time',
      features: 'Spatial audio, Adaptive EQ',
      connectivity: 'Bluetooth 5.0',
      charging: 'Lightning charging case'
    },
    images: [productImages.accessories[1]],
    stock: 60,
    tags: ['airpods', 'spatial-audio', 'sweat-resistant'],
    rating: 4.5,
    reviewCount: 423
  },
  {
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
  price: 349000,
  originalPrice: 399000,
    description: 'Industry-leading noise canceling over-ear headphones with exceptional sound quality.',
    category: 'Accessories',
    subcategory: 'Audio',
    specs: {
      driver: '30mm drivers',
      battery: 'Up to 30 hours with ANC',
      features: 'Industry-leading ANC, LDAC codec',
      connectivity: 'Bluetooth 5.2, wired',
      charging: 'USB-C quick charge'
    },
    images: [productImages.accessories[2]],
    stock: 25,
    isHotDeal: true,
    hotDealDiscount: 13,
    tags: ['sony', 'anc', 'over-ear', 'premium'],
    rating: 4.8,
    reviewCount: 234
  },
  {
    name: 'Samsung Galaxy Buds2 Pro',
    brand: 'Samsung',
  price: 179000,
  originalPrice: 229000,
    description: 'Premium wireless earbuds with ANC and 360 Audio support.',
    category: 'Accessories',
    subcategory: 'Audio',
    specs: {
      driver: 'Two-way speakers',
      battery: 'Up to 8 hours with ANC off',
      features: 'ANC, 360 Audio, IPX7 rating',
      connectivity: 'Bluetooth 5.3',
      charging: 'Wireless charging case'
    },
    images: [productImages.accessories[3]],
    stock: 35,
    isHotDeal: true,
    hotDealDiscount: 22,
    tags: ['galaxy-buds', 'anc', '360-audio', 'ipx7'],
    rating: 4.4,
    reviewCount: 189
  },
  {
    name: 'Anker PowerCore 20000 PD',
    brand: 'Anker',
  price: 49000,
  originalPrice: 69000,
    description: 'High-capacity power bank with USB-C Power Delivery and multiple ports.',
    category: 'Accessories',
    subcategory: 'Charging',
    specs: {
      capacity: '20000mAh',
      output: '18W USB-C PD',
      ports: '1x USB-C, 2x USB-A',
      weight: '360g',
      features: 'PowerIQ 3.0, trickle-charging mode'
    },
    images: [productImages.accessories[4]],
    stock: 50,
    tags: ['power-bank', 'pd', 'anker', 'high-capacity'],
    rating: 4.6,
    reviewCount: 345
  },
  {
    name: 'Belkin MagSafe 3-in-1 Wireless Charger',
    brand: 'Belkin',
  price: 149000,
  originalPrice: 179000,
    description: 'Premium wireless charging station for iPhone, AirPods, and Apple Watch.',
    category: 'Accessories',
    subcategory: 'Charging',
    specs: {
      compatibility: 'iPhone 12+ with MagSafe',
      features: 'MagSafe, Apple Watch charging, AirPods charging',
      output: '15W wireless charging',
      design: 'Premium materials, tilt adjustment',
      certification: 'Apple MFi certified'
    },
    images: [productImages.accessories[0]],
    stock: 20,
    tags: ['magsafe', 'wireless-charger', '3-in-1', 'apple'],
    rating: 4.5,
    reviewCount: 167
  },
  {
    name: 'Logitech MX Master 3S',
    brand: 'Logitech',
  price: 99000,
  originalPrice: 129000,
    description: 'Advanced wireless mouse with ultra-precise tracking and customizable buttons.',
    category: 'Accessories',
    subcategory: 'Peripherals',
    specs: {
      sensor: 'Darkfield high precision',
      dpi: 'Up to 8000 DPI',
      battery: 'Up to 70 days',
      connectivity: 'Bluetooth, USB receiver',
      features: 'Flow cross-computer control, quiet clicks'
    },
    images: [productImages.accessories[1]],
    stock: 30,
    tags: ['mouse', 'wireless', 'productivity', 'precision'],
    rating: 4.7,
    reviewCount: 289
  },
  {
    name: 'Apple Magic Keyboard',
    brand: 'Apple',
  price: 179000,
  originalPrice: 199000,
    description: 'Wireless keyboard with scissor mechanism and numeric keypad.',
    category: 'Accessories',
    subcategory: 'Peripherals',
    specs: {
      layout: 'Full-size with numeric keypad',
      connectivity: 'Bluetooth',
      battery: 'Built-in rechargeable battery',
      compatibility: 'Mac, iPad',
      features: 'Scissor mechanism, Touch ID (select models)'
    },
    images: [productImages.accessories[2]],
    stock: 25,
    tags: ['keyboard', 'wireless', 'apple', 'magic'],
    rating: 4.4,
    reviewCount: 178
  },
  {
    name: 'SteelSeries Arctis 7P',
    brand: 'SteelSeries',
  price: 149000,
  originalPrice: 179000,
    description: 'Premium wireless gaming headset with lossless 2.4GHz connection.',
    category: 'Accessories',
    subcategory: 'Audio',
    specs: {
      driver: '40mm neodymium drivers',
      battery: '24+ hour battery life',
      features: 'DTS Headphone:X 2.0, ClearCast microphone',
      connectivity: '2.4GHz wireless, 3.5mm',
      compatibility: 'PC, PlayStation, Nintendo Switch'
    },
    images: [productImages.accessories[3]],
    stock: 15,
    tags: ['gaming', 'wireless', 'headset', 'steelseries'],
    rating: 4.6,
    reviewCount: 234
  },
  {
    name: 'Razer DeathAdder V3 Pro',
    brand: 'Razer',
  price: 149000,
  originalPrice: 169000,
    description: 'Professional esports gaming mouse with Focus Pro sensor.',
    category: 'Accessories',
    subcategory: 'Peripherals',
    specs: {
      sensor: 'Focus Pro 30K sensor',
      dpi: 'Up to 30000 DPI',
      battery: 'Up to 90 hours',
      connectivity: 'HyperSpeed wireless, USB-C',
      features: 'Optical switches, ergonomic design'
    },
    images: [productImages.accessories[4]],
    stock: 20,
    tags: ['gaming', 'mouse', 'esports', 'wireless'],
    rating: 4.7,
    reviewCount: 156
  },
  {
    name: 'Apple Watch Series 9 GPS',
    brand: 'Apple',
  price: 399000,
  originalPrice: 429000,
    description: 'Advanced smartwatch with S9 chip and double tap gesture.',
    category: 'Accessories',
    subcategory: 'Wearables',
    specs: {
      display: 'Always-On Retina LTPO OLED',
      chip: 'S9 SiP',
      features: 'Double Tap, Siri on device',
      battery: 'Up to 18 hours',
      health: 'ECG, Blood Oxygen, Temperature'
    },
    images: [productImages.accessories[0]],
    stock: 30,
    isHotDeal: true,
    hotDealDiscount: 7,
    tags: ['apple-watch', 'smartwatch', 'health', 'fitness'],
    rating: 4.8,
    reviewCount: 445
  },
  {
    name: 'Samsung Galaxy Watch6',
    brand: 'Samsung',
  price: 329000,
  originalPrice: 379000,
    description: 'Advanced smartwatch with body composition analysis and sleep coaching.',
    category: 'Accessories',
    subcategory: 'Wearables',
    specs: {
      display: '1.5-inch Super AMOLED',
      processor: 'Exynos W930',
      features: 'Body composition, sleep coaching',
      battery: 'Up to 40 hours',
      health: 'BioActive sensor, ECG, blood pressure'
    },
    images: [productImages.accessories[1]],
    stock: 25,
    tags: ['galaxy-watch', 'smartwatch', 'health', 'samsung'],
    rating: 4.5,
    reviewCount: 234
  },
  {
    name: 'Peak Design Everyday Backpack',
    brand: 'Peak Design',
  price: 279000,
  originalPrice: 329000,
    description: 'Premium camera and tech backpack with modular organization.',
    category: 'Accessories',
    subcategory: 'Bags',
    specs: {
      capacity: '30L',
      material: 'Weather-resistant 400D nylon',
      features: 'Modular dividers, side access',
      laptop: 'Fits up to 16-inch laptop',
      warranty: 'Lifetime warranty'
    },
    images: [productImages.accessories[2]],
    stock: 15,
    tags: ['backpack', 'camera', 'tech', 'premium'],
    rating: 4.9,
    reviewCount: 178
  },
  {
    name: 'Moft Laptop Stand',
    brand: 'Moft',
  price: 49000,
  originalPrice: 59000,
    description: 'Ultra-thin invisible laptop stand with adjustable angles.',
    category: 'Accessories',
    subcategory: 'Stands',
    specs: {
      material: 'Premium fiberglass and PU',
      weight: '89g',
      compatibility: 'Laptops 11.6-15.6 inches',
      angles: '15° and 25° elevation',
      features: 'Removable, reusable adhesive'
    },
    images: [productImages.accessories[3]],
    stock: 40,
    tags: ['laptop-stand', 'portable', 'ergonomic', 'thin'],
    rating: 4.4,
    reviewCount: 267
  },
  {
    name: 'CalDigit TS3 Plus Thunderbolt 3 Dock',
    brand: 'CalDigit',
  price: 349000,
  originalPrice: 399000,
    description: 'Professional Thunderbolt 3 dock with 15 ports and 85W charging.',
    category: 'Accessories',
    subcategory: 'Docks',
    specs: {
      ports: '15 ports total',
      charging: '85W laptop charging',
      display: 'Supports 5K or dual 4K displays',
      connectivity: 'Thunderbolt 3, USB-A, USB-C',
      ethernet: 'Gigabit Ethernet'
    },
    images: [productImages.accessories[4]],
    stock: 12,
    tags: ['thunderbolt', 'dock', 'professional', 'charging'],
    rating: 4.6,
    reviewCount: 123
  },
  {
    name: 'Elgato Stream Deck',
    brand: 'Elgato',
  price: 149000,
  originalPrice: 179000,
    description: 'Customizable control surface with 15 LCD keys for content creation.',
    category: 'Accessories',
    subcategory: 'Creator Tools',
    specs: {
      keys: '15 customizable LCD keys',
      resolution: '72x72 pixels per key',
      software: 'Stream Deck software',
      compatibility: 'Windows, macOS',
      connectivity: 'USB-C'
    },
    images: [productImages.accessories[0]],
    stock: 18,
    tags: ['stream-deck', 'content-creation', 'streaming', 'customizable'],
    rating: 4.7,
    reviewCount: 189
  },
  {
    name: 'Blue Yeti USB Microphone',
    brand: 'Blue',
  price: 99000,
  originalPrice: 129000,
    description: 'Professional USB microphone with multiple pickup patterns.',
    category: 'Accessories',
    subcategory: 'Audio',
    specs: {
      patterns: '4 pickup patterns',
      frequency: '20Hz-20kHz',
      bitrate: '16-bit/48kHz',
      features: 'Zero-latency headphone monitoring',
      connectivity: 'USB'
    },
    images: [productImages.accessories[1]],
    stock: 22,
    isHotDeal: true,
    hotDealDiscount: 23,
    tags: ['microphone', 'usb', 'professional', 'streaming'],
    rating: 4.5,
    reviewCount: 345
  },
  {
    name: 'Anker Wireless Charging Stand',
    brand: 'Anker',
  price: 39000,
  originalPrice: 49000,
    description: 'Fast wireless charging stand with adjustable viewing angle.',
    category: 'Accessories',
    subcategory: 'Charging',
    specs: {
      output: '10W max wireless charging',
      compatibility: 'Qi-enabled devices',
      features: 'LED indicator, case-friendly',
      angle: 'Adjustable viewing angle',
      safety: 'Temperature control, foreign object detection'
    },
    images: [productImages.accessories[2]],
    stock: 45,
    tags: ['wireless-charger', 'stand', 'fast-charging', 'adjustable'],
    rating: 4.3,
    reviewCount: 289
  },
  {
    name: 'Nomad Base Station Pro',
    brand: 'Nomad',
  price: 229000,
  originalPrice: 279000,
    description: 'Premium wireless charging pad with FreePower technology.',
    category: 'Accessories',
    subcategory: 'Charging',
    specs: {
      zones: 'Up to 3 devices simultaneously',
      output: '15W per device',
      material: 'Genuine leather and aluminum',
      features: 'FreePower technology, foreign object detection',
      dimensions: '7.9 x 6.1 x 0.8 inches'
    },
    images: [productImages.accessories[3]],
    stock: 10,
    isHotDeal: true,
    hotDealDiscount: 18,
    tags: ['wireless-charger', 'premium', 'multi-device', 'leather'],
    rating: 4.6,
    reviewCount: 89
  },
  {
    name: 'Twelve South BookBook for MacBook',
    brand: 'Twelve South',
  price: 79000,
  originalPrice: 99000,
    description: 'Vintage leather case that makes your MacBook look like an old book.',
    category: 'Accessories',
    subcategory: 'Cases',
    specs: {
      material: 'Genuine vintage leather',
      compatibility: 'MacBook Air/Pro 13-16 inch',
      features: 'Zippered closure, interior pocket',
      protection: 'Full device protection',
      design: 'Vintage book appearance'
    },
    images: [productImages.accessories[4]],
    stock: 20,
    tags: ['case', 'leather', 'macbook', 'vintage'],
    rating: 4.4,
    reviewCount: 156
  }
]

// Seeding function
async function seedComprehensiveProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('🔌 Connected to MongoDB')

    // Clear existing products (optional - comment out if you want to keep existing products)
    await Product.deleteMany({})
    console.log('🗑️  Cleared existing products')

    // Insert comprehensive products
    const createdProducts = await Product.insertMany(comprehensiveProducts)
    console.log(`✅ Successfully created ${createdProducts.length} products`)
    
    // Group products by category for summary
    const categories = {}
    createdProducts.forEach(product => {
      if (!categories[product.category]) {
        categories[product.category] = []
      }
      categories[product.category].push(product.name)
    })

    // Display detailed summary
    console.log('\n📊 COMPREHENSIVE PRODUCT SEEDING SUMMARY')
    console.log('=' .repeat(50))
    
    Object.keys(categories).forEach(category => {
      console.log(`\n📱 ${category.toUpperCase()} (${categories[category].length} products):`)
      categories[category].forEach((name, index) => {
        console.log(`   ${(index + 1).toString().padStart(2, '0')}. ${name}`)
      })
    })

    // Display statistics
    const totalProducts = createdProducts.length
    const hotDeals = createdProducts.filter(p => p.isHotDeal).length
    const totalValue = createdProducts.reduce((sum, p) => sum + p.price, 0)
    const avgPrice = (totalValue / totalProducts).toFixed(2)

    console.log('\n📈 STATISTICS')
    console.log('=' .repeat(50))
    console.log(`📦 Total products: ${totalProducts}`)
    console.log(`🔥 Hot deals: ${hotDeals}`)
    console.log(`💰 Total inventory value: $${totalValue.toLocaleString()}`)
    console.log(`📊 Average price: $${avgPrice}`)
    
    console.log('\n🎉 Comprehensive product seeding completed successfully!')
    console.log('🚀 Your Phone Mart database is now fully stocked!')
    
  } catch (error) {
    console.error('❌ Error seeding comprehensive products:', error)
    console.error('Stack trace:', error.stack)
  } finally {
    // Close connection
    await mongoose.connection.close()
    console.log('🔌 Disconnected from MongoDB')
  }
}

// Run the seeding function
if (require.main === module) {
  seedComprehensiveProducts()
}

module.exports = seedComprehensiveProducts