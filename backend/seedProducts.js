require('dotenv').config()
const mongoose = require('mongoose')
const Product = require('./models/productModel')

// Sample product images (you can replace these with actual product images)
const sampleImages = [
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
  'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
  'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500',
  'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500',
  'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=500'
]

const products = [
  // iPhone Category (5 products)
  {
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    price: 1199,
    originalPrice: 1299,
    description: 'The most advanced iPhone yet with titanium design, A17 Pro chip, and Pro camera system.',
    category: 'iPhone',
    subcategory: 'Pro Max',
    specs: {
      display: '6.7-inch Super Retina XDR',
      chip: 'A17 Pro',
      camera: '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
      storage: '256GB',
      battery: 'Up to 29 hours video playback',
      os: 'iOS 17'
    },
    images: [sampleImages[0]],
    stock: 15,
    isHotDeal: true,
    hotDealDiscount: 8,
    tags: ['flagship', 'premium', 'titanium', 'pro']
  },
  {
    name: 'iPhone 14',
    brand: 'Apple',
    price: 699,
    originalPrice: 799,
    description: 'iPhone 14 features the A15 Bionic chip with 5-core GPU, advanced camera system, and all-day battery.',
    category: 'iPhone',
    specs: {
      display: '6.1-inch Super Retina XDR',
      chip: 'A15 Bionic',
      camera: '12MP Main + 12MP Ultra Wide',
      storage: '128GB',
      battery: 'Up to 20 hours video playback',
      os: 'iOS 17'
    },
    images: [sampleImages[1]],
    stock: 20,
    tags: ['popular', 'mainstream']
  },
  {
    name: 'iPhone 13 Mini',
    brand: 'Apple',
    price: 529,
    originalPrice: 629,
    description: 'Compact iPhone 13 Mini with A15 Bionic chip in a perfectly sized design.',
    category: 'iPhone',
    subcategory: 'Mini',
    specs: {
      display: '5.4-inch Super Retina XDR',
      chip: 'A15 Bionic',
      camera: '12MP Main + 12MP Ultra Wide',
      storage: '128GB',
      battery: 'Up to 17 hours video playback',
      os: 'iOS 17'
    },
    images: [sampleImages[2]],
    stock: 12,
    isHotDeal: true,
    hotDealDiscount: 15,
    tags: ['compact', 'mini', 'affordable']
  },
  {
    name: 'iPhone 12 Pro',
    brand: 'Apple',
    price: 799,
    originalPrice: 999,
    description: 'iPhone 12 Pro with A14 Bionic, Pro camera system, and LiDAR Scanner.',
    category: 'iPhone',
    subcategory: 'Pro',
    specs: {
      display: '6.1-inch Super Retina XDR',
      chip: 'A14 Bionic',
      camera: '12MP Pro camera system',
      storage: '128GB',
      battery: 'Up to 17 hours video playback',
      os: 'iOS 17'
    },
    images: [sampleImages[3]],
    stock: 8,
    tags: ['pro', 'lidar', 'premium']
  },
  {
    name: 'iPhone SE (3rd generation)',
    brand: 'Apple',
    price: 429,
    description: 'iPhone SE with A15 Bionic chip and Touch ID in a classic design.',
    category: 'iPhone',
    subcategory: 'SE',
    specs: {
      display: '4.7-inch Retina HD',
      chip: 'A15 Bionic',
      camera: '12MP Main',
      storage: '64GB',
      battery: 'Up to 15 hours video playback',
      os: 'iOS 17'
    },
    images: [sampleImages[4]],
    stock: 25,
    tags: ['affordable', 'classic', 'touch-id']
  },

  // Samsung Category (5 products)
  {
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    price: 1299,
    originalPrice: 1399,
    description: 'Ultimate Galaxy experience with S Pen, 200MP camera, and Galaxy AI features.',
    category: 'Samsung',
    subcategory: 'Galaxy S',
    specs: {
      display: '6.8-inch Dynamic AMOLED 2X',
      processor: 'Snapdragon 8 Gen 3',
      camera: '200MP Main + 50MP Periscope + 12MP Ultra Wide + 10MP Telephoto',
      storage: '256GB',
      battery: '5000mAh',
      os: 'Android 14 with One UI 6.1'
    },
    images: [sampleImages[0]],
    stock: 10,
    isHotDeal: true,
    hotDealDiscount: 7,
    tags: ['flagship', 's-pen', 'ultra', 'ai']
  },
  {
    name: 'Samsung Galaxy S23',
    brand: 'Samsung',
    price: 799,
    originalPrice: 899,
    description: 'Galaxy S23 with enhanced camera capabilities and flagship performance.',
    category: 'Samsung',
    subcategory: 'Galaxy S',
    specs: {
      display: '6.1-inch Dynamic AMOLED 2X',
      processor: 'Snapdragon 8 Gen 2',
      camera: '50MP Main + 12MP Ultra Wide + 10MP Telephoto',
      storage: '128GB',
      battery: '3900mAh',
      os: 'Android 14 with One UI 6'
    },
    images: [sampleImages[1]],
    stock: 18,
    tags: ['flagship', 'camera', 'performance']
  },
  {
    name: 'Samsung Galaxy A54 5G',
    brand: 'Samsung',
    price: 449,
    description: 'Mid-range Galaxy with premium features, great camera, and 5G connectivity.',
    category: 'Samsung',
    subcategory: 'Galaxy A',
    specs: {
      display: '6.4-inch Super AMOLED',
      processor: 'Exynos 1380',
      camera: '50MP Main + 12MP Ultra Wide + 5MP Macro',
      storage: '128GB',
      battery: '5000mAh',
      os: 'Android 13 with One UI 5.1'
    },
    images: [sampleImages[2]],
    stock: 30,
    isHotDeal: true,
    hotDealDiscount: 10,
    tags: ['mid-range', '5g', 'value']
  },
  {
    name: 'Samsung Galaxy Z Flip5',
    brand: 'Samsung',
    price: 999,
    originalPrice: 1099,
    description: 'Innovative foldable phone with larger cover screen and improved hinge.',
    category: 'Samsung',
    subcategory: 'Galaxy Z',
    specs: {
      display: '6.7-inch Foldable Dynamic AMOLED 2X',
      processor: 'Snapdragon 8 Gen 2',
      camera: '12MP Main + 12MP Ultra Wide',
      storage: '256GB',
      battery: '3700mAh',
      os: 'Android 13 with One UI 5.1.1'
    },
    images: [sampleImages[3]],
    stock: 7,
    tags: ['foldable', 'innovative', 'compact']
  },
  {
    name: 'Samsung Galaxy Note 20',
    brand: 'Samsung',
    price: 699,
    originalPrice: 999,
    description: 'Powerful Note series with S Pen and productivity features.',
    category: 'Samsung',
    subcategory: 'Galaxy Note',
    specs: {
      display: '6.7-inch Super AMOLED Plus',
      processor: 'Exynos 990',
      camera: '64MP Main + 12MP Ultra Wide + 12MP Telephoto',
      storage: '256GB',
      battery: '4300mAh',
      os: 'Android 13 with One UI 5'
    },
    images: [sampleImages[4]],
    stock: 15,
    tags: ['note', 's-pen', 'productivity']
  },

  // Android/Pixel Category (4 products)
  {
    name: 'Google Pixel 8 Pro',
    brand: 'Google',
    price: 999,
    originalPrice: 1099,
    description: 'Most advanced Pixel with Magic Eraser, Best Take, and pure Android experience.',
    category: 'Android/Pixel',
    specs: {
      display: '6.7-inch LTPO OLED',
      processor: 'Google Tensor G3',
      camera: '50MP Main + 48MP Ultra Wide + 48MP Telephoto',
      storage: '128GB',
      battery: '5050mAh',
      os: 'Android 14'
    },
    images: [sampleImages[0]],
    stock: 12,
    isHotDeal: true,
    hotDealDiscount: 9,
    tags: ['pixel', 'pure-android', 'ai-camera']
  },
  {
    name: 'Google Pixel 7a',
    brand: 'Google',
    price: 499,
    originalPrice: 599,
    description: 'Affordable Pixel with flagship camera features and clean Android.',
    category: 'Android/Pixel',
    specs: {
      display: '6.1-inch OLED',
      processor: 'Google Tensor G2',
      camera: '64MP Main + 13MP Ultra Wide',
      storage: '128GB',
      battery: '4385mAh',
      os: 'Android 14'
    },
    images: [sampleImages[1]],
    stock: 22,
    tags: ['affordable', 'pixel', 'camera']
  },
  {
    name: 'OnePlus 11',
    brand: 'OnePlus',
    price: 699,
    originalPrice: 799,
    description: 'Flagship killer with Snapdragon 8 Gen 2 and fast charging.',
    category: 'Android/Pixel',
    specs: {
      display: '6.7-inch Fluid AMOLED',
      processor: 'Snapdragon 8 Gen 2',
      camera: '50MP Main + 48MP Ultra Wide + 32MP Telephoto',
      storage: '128GB',
      battery: '5000mAh',
      os: 'Android 13 with OxygenOS 13'
    },
    images: [sampleImages[2]],
    stock: 16,
    tags: ['oneplus', 'flagship-killer', 'fast-charging']
  },
  {
    name: 'Xiaomi 13 Pro',
    brand: 'Xiaomi',
    price: 899,
    originalPrice: 999,
    description: 'Premium flagship with Leica cameras and powerful performance.',
    category: 'Android/Pixel',
    specs: {
      display: '6.73-inch AMOLED',
      processor: 'Snapdragon 8 Gen 2',
      camera: '50MP Main + 50MP Ultra Wide + 50MP Telephoto',
      storage: '256GB',
      battery: '4820mAh',
      os: 'Android 13 with MIUI 14'
    },
    images: [sampleImages[3]],
    stock: 14,
    tags: ['xiaomi', 'leica', 'premium']
  },

  // Accessories Category (3 products)
  {
    name: 'AirPods Pro (2nd generation)',
    brand: 'Apple',
    price: 249,
    originalPrice: 279,
    description: 'Premium wireless earbuds with Active Noise Cancellation and Spatial Audio.',
    category: 'Accessories',
    subcategory: 'Audio',
    specs: {
      driver: 'Custom high-excursion Apple driver',
      chip: 'Apple H2 chip',
      battery: 'Up to 6 hours listening time',
      features: 'Active Noise Cancellation, Transparency mode',
      connectivity: 'Bluetooth 5.3',
      charging: 'MagSafe and Lightning'
    },
    images: [sampleImages[4]],
    stock: 35,
    isHotDeal: true,
    hotDealDiscount: 11,
    tags: ['airpods', 'wireless', 'anc', 'premium']
  },
  {
    name: 'Samsung Galaxy Buds2 Pro',
    brand: 'Samsung',
    price: 199,
    originalPrice: 229,
    description: 'Premium earbuds with Intelligent ANC and 360 Audio.',
    category: 'Accessories',
    subcategory: 'Audio',
    specs: {
      driver: '10mm woofer + 5.3mm tweeter',
      battery: 'Up to 8 hours listening time',
      features: 'Intelligent ANC, 360 Audio',
      connectivity: 'Bluetooth 5.3',
      charging: 'Wireless charging case'
    },
    images: [sampleImages[0]],
    stock: 28,
    tags: ['galaxy-buds', 'anc', 'samsung']
  },
  {
    name: 'Anker PowerCore 10000',
    brand: 'Anker',
    price: 29,
    originalPrice: 39,
    description: 'Compact 10000mAh portable charger with PowerIQ technology.',
    category: 'Accessories',
    subcategory: 'Charging',
    specs: {
      capacity: '10000mAh',
      output: '12W max',
      ports: '1x USB-A',
      weight: '180g',
      features: 'PowerIQ, MultiProtect safety system'
    },
    images: [sampleImages[1]],
    stock: 50,
    tags: ['power-bank', 'portable', 'anker', 'fast-charging']
  },

  // Laptops Category (2 products)
  {
    name: 'MacBook Air M2',
    brand: 'Apple',
    price: 1199,
    originalPrice: 1299,
    description: 'Incredibly thin and light laptop powered by Apple M2 chip.',
    category: 'Laptops',
    specs: {
      processor: 'Apple M2 chip',
      display: '13.6-inch Liquid Retina',
      memory: '8GB unified memory',
      storage: '256GB SSD',
      battery: 'Up to 18 hours',
      weight: '2.7 pounds'
    },
    images: [sampleImages[2]],
    stock: 8,
    isHotDeal: true,
    hotDealDiscount: 8,
    tags: ['macbook', 'laptop', 'm2', 'ultrabook']
  },
  {
    name: 'Dell XPS 13',
    brand: 'Dell',
    price: 999,
    originalPrice: 1199,
    description: 'Premium ultrabook with InfinityEdge display and powerful performance.',
    category: 'Laptops',
    specs: {
      processor: 'Intel Core i7-1250U',
      display: '13.4-inch FHD+',
      memory: '16GB LPDDR5',
      storage: '512GB SSD',
      battery: 'Up to 12 hours',
      weight: '2.64 pounds'
    },
    images: [sampleImages[3]],
    stock: 6,
    tags: ['dell', 'xps', 'ultrabook', 'premium']
  },

  // Hot Deals Category (1 additional product)
  {
    name: 'Refurbished iPhone 11',
    brand: 'Apple',
    price: 399,
    originalPrice: 599,
    description: 'Certified refurbished iPhone 11 with dual camera system and A13 Bionic chip.',
    category: 'Hot Deals',
    specs: {
      display: '6.1-inch Liquid Retina HD',
      chip: 'A13 Bionic',
      camera: '12MP Main + 12MP Ultra Wide',
      storage: '64GB',
      battery: 'Up to 17 hours video playback',
      os: 'iOS 17'
    },
    images: [sampleImages[4]],
    stock: 20,
    isHotDeal: true,
    hotDealDiscount: 33,
    tags: ['refurbished', 'deal', 'affordable', 'certified']
  }
]

async function seedProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    // Clear existing products (optional - comment out if you want to keep existing products)
    await Product.deleteMany({})
    console.log('Cleared existing products')

    // Insert new products
    const createdProducts = await Product.insertMany(products)
    console.log(`Successfully created ${createdProducts.length} products:`)
    
    // Group products by category for summary
    const categories = {}
    createdProducts.forEach(product => {
      if (!categories[product.category]) {
        categories[product.category] = []
      }
      categories[product.category].push(product.name)
    })

    // Display summary
    Object.keys(categories).forEach(category => {
      console.log(`\n${category} (${categories[category].length} products):`)
      categories[category].forEach(name => console.log(`  - ${name}`))
    })

    console.log('\n✅ Product seeding completed successfully!')
    
  } catch (error) {
    console.error('❌ Error seeding products:', error)
  } finally {
    // Close connection
    await mongoose.connection.close()
    console.log('Disconnected from MongoDB')
  }
}

// Run the seed function
seedProducts()
