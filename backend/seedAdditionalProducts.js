require('dotenv').config()
const mongoose = require('mongoose')
const Product = require('./models/productModel')

// Additional sample product images
const additionalImages = [
  'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500',
  'https://images.unsplash.com/photo-1520923642038-b4259acecbd7?w=500',
  'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500',
  'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=500'
]

const additionalProducts = [
  // More iPhone Products
  {
    name: 'iPhone 15',
    brand: 'Apple',
    price: 899,
    originalPrice: 999,
    description: 'iPhone 15 with USB-C, Dynamic Island, and advanced camera system.',
    category: 'iPhone',
    specs: {
      display: '6.1-inch Super Retina XDR',
      chip: 'A16 Bionic',
      camera: '48MP Main + 12MP Ultra Wide',
      storage: '128GB',
      battery: 'Up to 20 hours video playback',
      os: 'iOS 17'
    },
    images: [additionalImages[0]],
    stock: 18,
    isHotDeal: true,
    hotDealDiscount: 10,
    tags: ['new', 'usb-c', 'dynamic-island']
  },
  {
    name: 'iPhone 13 Pro Max',
    brand: 'Apple',
    price: 899,
    originalPrice: 1099,
    description: 'Large-screen iPhone 13 Pro Max with ProMotion display and cinematic mode.',
    category: 'iPhone',
    subcategory: 'Pro Max',
    specs: {
      display: '6.7-inch Super Retina XDR ProMotion',
      chip: 'A15 Bionic',
      camera: '12MP Pro camera system with macro',
      storage: '128GB',
      battery: 'Up to 28 hours video playback',
      os: 'iOS 17'
    },
    images: [additionalImages[1]],
    stock: 10,
    tags: ['pro-max', 'promotion', 'cinematic']
  },

  // More Samsung Products
  {
    name: 'Samsung Galaxy S22',
    brand: 'Samsung',
    price: 599,
    originalPrice: 799,
    description: 'Compact Galaxy S22 with powerful camera and smooth performance.',
    category: 'Samsung',
    subcategory: 'Galaxy S',
    specs: {
      display: '6.1-inch Dynamic AMOLED 2X',
      processor: 'Snapdragon 8 Gen 1',
      camera: '50MP Main + 12MP Ultra Wide + 10MP Telephoto',
      storage: '128GB',
      battery: '3700mAh',
      os: 'Android 14 with One UI 6'
    },
    images: [additionalImages[2]],
    stock: 25,
    isHotDeal: true,
    hotDealDiscount: 25,
    tags: ['compact', 'value', 'camera']
  },
  {
    name: 'Samsung Galaxy Z Fold5',
    brand: 'Samsung',
    price: 1599,
    originalPrice: 1799,
    description: 'Ultimate productivity device with large foldable display and S Pen support.',
    category: 'Samsung',
    subcategory: 'Galaxy Z',
    specs: {
      display: '7.6-inch Foldable Dynamic AMOLED 2X',
      processor: 'Snapdragon 8 Gen 2',
      camera: '50MP Main + 12MP Ultra Wide + 10MP Telephoto',
      storage: '256GB',
      battery: '4400mAh',
      os: 'Android 13 with One UI 5.1.1'
    },
    images: [additionalImages[3]],
    stock: 5,
    tags: ['foldable', 'productivity', 'premium', 's-pen']
  },
  {
    name: 'Samsung Galaxy A34 5G',
    brand: 'Samsung',
    price: 349,
    originalPrice: 399,
    description: 'Affordable 5G smartphone with great camera and long battery life.',
    category: 'Samsung',
    subcategory: 'Galaxy A',
    specs: {
      display: '6.6-inch Super AMOLED',
      processor: 'MediaTek Dimensity 1080',
      camera: '48MP Main + 8MP Ultra Wide + 5MP Macro',
      storage: '128GB',
      battery: '5000mAh',
      os: 'Android 13 with One UI 5.1'
    },
    images: [additionalImages[4]],
    stock: 40,
    isHotDeal: true,
    hotDealDiscount: 13,
    tags: ['affordable', '5g', 'battery-life']
  },

  // More Android/Pixel Products
  {
    name: 'Google Pixel 6a',
    brand: 'Google',
    price: 299,
    originalPrice: 449,
    description: 'Budget-friendly Pixel with Google Tensor chip and excellent camera.',
    category: 'Android/Pixel',
    specs: {
      display: '6.1-inch OLED',
      processor: 'Google Tensor',
      camera: '12MP Main + 12MP Ultra Wide',
      storage: '128GB',
      battery: '4410mAh',
      os: 'Android 14'
    },
    images: [additionalImages[0]],
    stock: 30,
    isHotDeal: true,
    hotDealDiscount: 33,
    tags: ['budget', 'pixel', 'tensor', 'camera']
  },
  {
    name: 'OnePlus Nord CE 3',
    brand: 'OnePlus',
    price: 399,
    originalPrice: 449,
    description: 'Mid-range OnePlus with 120Hz display and fast charging.',
    category: 'Android/Pixel',
    specs: {
      display: '6.7-inch Fluid AMOLED 120Hz',
      processor: 'Snapdragon 782G',
      camera: '50MP Main + 8MP Ultra Wide + 2MP Macro',
      storage: '128GB',
      battery: '5000mAh',
      os: 'Android 13 with OxygenOS 13'
    },
    images: [additionalImages[1]],
    stock: 20,
    tags: ['oneplus', 'mid-range', 'fast-charging', '120hz']
  },
  {
    name: 'Nothing Phone (2)',
    brand: 'Nothing',
    price: 699,
    originalPrice: 799,
    description: 'Unique transparent design with Glyph interface and flagship performance.',
    category: 'Android/Pixel',
    specs: {
      display: '6.7-inch LTPO OLED 120Hz',
      processor: 'Snapdragon 8+ Gen 1',
      camera: '50MP Main + 50MP Ultra Wide',
      storage: '256GB',
      battery: '4700mAh',
      os: 'Android 13 with Nothing OS 2.0'
    },
    images: [additionalImages[2]],
    stock: 15,
    tags: ['nothing', 'transparent', 'glyph', 'unique']
  },

  // More Accessories
  {
    name: 'Beats Studio Buds+',
    brand: 'Beats',
    price: 169,
    originalPrice: 199,
    description: 'Premium wireless earbuds with Active Noise Cancelling and spatial audio.',
    category: 'Accessories',
    subcategory: 'Audio',
    specs: {
      driver: 'Custom acoustic platform',
      battery: 'Up to 8 hours listening time',
      features: 'Active Noise Cancelling, Transparency mode',
      connectivity: 'Bluetooth 5.3',
      charging: 'USB-C charging case'
    },
    images: [additionalImages[3]],
    stock: 32,
    tags: ['beats', 'anc', 'spatial-audio', 'premium']
  },
  {
    name: 'UGREEN 20000mAh Power Bank',
    brand: 'UGREEN',
    price: 49,
    originalPrice: 69,
    description: 'High-capacity power bank with 22.5W fast charging and multiple ports.',
    category: 'Accessories',
    subcategory: 'Charging',
    specs: {
      capacity: '20000mAh',
      output: '22.5W max',
      ports: '2x USB-A, 1x USB-C',
      weight: '430g',
      features: 'Digital display, fast charging'
    },
    images: [additionalImages[4]],
    stock: 45,
    isHotDeal: true,
    hotDealDiscount: 29,
    tags: ['power-bank', 'fast-charging', 'high-capacity']
  },
  {
    name: 'Spigen Tough Armor Case',
    brand: 'Spigen',
    price: 25,
    originalPrice: 35,
    description: 'Heavy-duty phone case with dual-layer protection and kickstand.',
    category: 'Accessories',
    subcategory: 'Cases',
    specs: {
      compatibility: 'iPhone 15 series',
      material: 'TPU + PC',
      features: 'Drop protection, kickstand',
      certification: 'Military-grade'
    },
    images: [additionalImages[0]],
    stock: 60,
    tags: ['case', 'protection', 'kickstand', 'military-grade']
  },
  {
    name: 'Belkin 3-in-1 Wireless Charger',
    brand: 'Belkin',
    price: 129,
    originalPrice: 149,
    description: 'Charge iPhone, AirPods, and Apple Watch simultaneously with MagSafe.',
    category: 'Accessories',
    subcategory: 'Charging',
    specs: {
      compatibility: 'iPhone 12+ with MagSafe',
      output: '15W wireless charging',
      features: 'MagSafe compatible, Apple Watch charger',
      certification: 'Qi certified'
    },
    images: [additionalImages[1]],
    stock: 25,
    tags: ['wireless-charger', 'magsafe', '3-in-1', 'apple']
  },

  // More Laptops
  {
    name: 'MacBook Pro 14-inch M3',
    brand: 'Apple',
    price: 1999,
    originalPrice: 2199,
    description: 'Professional laptop with M3 Pro chip and Liquid Retina XDR display.',
    category: 'Laptops',
    specs: {
      processor: 'Apple M3 Pro chip',
      display: '14.2-inch Liquid Retina XDR',
      memory: '18GB unified memory',
      storage: '512GB SSD',
      battery: 'Up to 18 hours',
      weight: '3.5 pounds'
    },
    images: [additionalImages[2]],
    stock: 4,
    tags: ['macbook-pro', 'm3', 'professional', 'xdr']
  },
  {
    name: 'ASUS ZenBook 14',
    brand: 'ASUS',
    price: 899,
    originalPrice: 1099,
    description: 'Lightweight ultrabook with OLED display and long battery life.',
    category: 'Laptops',
    specs: {
      processor: 'Intel Core i7-1260P',
      display: '14-inch OLED 2.8K',
      memory: '16GB LPDDR5',
      storage: '512GB SSD',
      battery: 'Up to 15 hours',
      weight: '3.2 pounds'
    },
    images: [additionalImages[3]],
    stock: 8,
    isHotDeal: true,
    hotDealDiscount: 18,
    tags: ['asus', 'zenbook', 'oled', 'ultrabook']
  },
  {
    name: 'HP Pavilion 15',
    brand: 'HP',
    price: 649,
    originalPrice: 799,
    description: 'Versatile laptop for everyday computing with reliable performance.',
    category: 'Laptops',
    specs: {
      processor: 'AMD Ryzen 5 7535HS',
      display: '15.6-inch FHD IPS',
      memory: '8GB DDR4',
      storage: '256GB SSD',
      battery: 'Up to 8 hours',
      weight: '4.2 pounds'
    },
    images: [additionalImages[4]],
    stock: 12,
    tags: ['hp', 'pavilion', 'everyday', 'amd']
  }
]

async function seedAdditionalProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    // Insert additional products (without clearing existing ones)
    const createdProducts = await Product.insertMany(additionalProducts)
    console.log(`Successfully added ${createdProducts.length} additional products:`)
    
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
      console.log(`\n${category} (${categories[category].length} additional products):`)
      categories[category].forEach(name => console.log(`  - ${name}`))
    })

    // Get total count of all products
    const totalCount = await Product.countDocuments()
    console.log(`\n📊 Total products in database: ${totalCount}`)

    console.log('\n✅ Additional product seeding completed successfully!')
    
  } catch (error) {
    console.error('❌ Error seeding additional products:', error)
  } finally {
    // Close connection
    await mongoose.connection.close()
    console.log('Disconnected from MongoDB')
  }
}

// Run the seed function
seedAdditionalProducts()
