"use client"
import { useState } from "react"
import { Flame, Clock, Star, Heart, ArrowRight, Filter, Grid3X3, List, Zap, Gift, Percent, Timer } from "lucide-react"
import { CldImage } from "next-cloudinary";
import { extractCloudinaryPublicId } from "@/lib/utils";

const deals = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    originalPrice: 2100000,
    salePrice: 1750000,
    discount: 17,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
    badge: "Flash Sale",
    timeLeft: "2h 45m",
    rating: 4.9,
    reviews: 1205,
    specs: "256GB, Deep Purple",
    category: "iPhone"
  },
  {
    id: 2,
    name: "Galaxy S24 Ultra",
    brand: "Samsung",
    originalPrice: 2200000,
    salePrice: 1850000,
    discount: 16,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
    badge: "Limited Deal",
    timeLeft: "1d 12h",
    rating: 4.8,
    reviews: 892,
    specs: "512GB, Titanium Black",
    category: "Samsung"
  },
  {
    id: 3,
    name: "AirPods Pro (2nd Gen)",
    brand: "Apple",
    originalPrice: 450000,
    salePrice: 350000,
    discount: 22,
    image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400&h=400&fit=crop",
    badge: "Best Seller",
    timeLeft: "3h 20m",
    rating: 4.7,
    reviews: 2340,
    specs: "Wireless, Noise Cancelling",
    category: "Accessories"
  },
  {
    id: 4,
    name: "Pixel 8 Pro",
    brand: "Google",
    originalPrice: 1800000,
    salePrice: 1500000,
    discount: 17,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    badge: "Hot Deal",
    timeLeft: "5h 15m",
    rating: 4.6,
    reviews: 567,
    specs: "128GB, Obsidian",
    category: "Android/Pixel"
  },
  {
    id: 5,
    name: "iPhone 14 Plus",
    brand: "Apple",
    originalPrice: 1650000,
    salePrice: 1350000,
    discount: 18,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
    badge: "Weekend Deal",
    timeLeft: "1d 8h",
    rating: 4.5,
    reviews: 1890,
    specs: "128GB, Midnight",
    category: "iPhone"
  },
  {
    id: 6,
    name: "Samsung Buds2 Pro",
    brand: "Samsung",
    originalPrice: 280000,
    salePrice: 200000,
    discount: 29,
    image: "https://images.unsplash.com/photo-1590658165737-15a047b7de72?w=400&h=400&fit=crop",
    badge: "Mega Save",
    timeLeft: "6h 30m",
    rating: 4.4,
    reviews: 743,
    specs: "Wireless, ANC",
    category: "Accessories"
  }
]

const DealCard = ({ deal, viewMode }: { deal: any, viewMode: string }) => {
  const [isFavorited, setIsFavorited] = useState(false)
  const savings = deal.originalPrice - deal.salePrice

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 group">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div className="relative flex-shrink-0 w-full sm:w-32 md:w-40">
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
              <CldImage width={200} height={200} src={extractCloudinaryPublicId(deal.image) || "sample"} alt={deal.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="absolute top-2 left-2">
              <span className={`px-2 py-1 text-xs font-bold rounded-full text-white ${
                deal.badge === 'Flash Sale' ? 'bg-red-500' :
                deal.badge === 'Limited Deal' ? 'bg-orange-500' :
                deal.badge === 'Best Seller' ? 'bg-green-500' :
                deal.badge === 'Hot Deal' ? 'bg-purple-500' :
                deal.badge === 'Weekend Deal' ? 'bg-blue-500' : 'bg-pink-500'
              }`}>
                {deal.badge}
              </span>
            </div>
            <button 
              onClick={() => setIsFavorited(!isFavorited)}
              className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all duration-200"
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </button>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-gray-500">{deal.brand}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">{deal.rating}</span>
                    <span className="text-xs text-gray-500">({deal.reviews.toLocaleString()})</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                  {deal.name}
                </h3>
                
                <p className="text-sm text-gray-600 mb-3">{deal.specs}</p>
                
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-medium text-red-600">Ends in {deal.timeLeft}</span>
                </div>
              </div>

              <div className="text-right">
                <div className="mb-3">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    ₦{deal.salePrice.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500 line-through">
                    ₦{deal.originalPrice.toLocaleString()}
                  </div>
                  <div className="text-sm font-semibold text-green-600">
                    Save ₦{savings.toLocaleString()}
                  </div>
                </div>
                
                <button className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                  Shop Deal
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="relative">
        <div className="aspect-square bg-gray-100 overflow-hidden">
          <CldImage 
            width={200} 
            height={200} 
            src={extractCloudinaryPublicId(deal.image) || "sample"} 
            alt={deal.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 text-xs font-bold rounded-full text-white ${
            deal.badge === 'Flash Sale' ? 'bg-red-500' :
            deal.badge === 'Limited Deal' ? 'bg-orange-500' :
            deal.badge === 'Best Seller' ? 'bg-green-500' :
            deal.badge === 'Hot Deal' ? 'bg-purple-500' :
            deal.badge === 'Weekend Deal' ? 'bg-blue-500' : 'bg-pink-500'
          }`}>
            {deal.badge}
          </span>
        </div>
        
        <div className="absolute top-3 right-3">
          <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            -{deal.discount}%
          </div>
        </div>
        
        <button 
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute bottom-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all duration-200"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>
      </div>
      
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500">{deal.brand}</span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">{deal.rating}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
          {deal.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3">{deal.specs}</p>
        
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-red-500" />
          <span className="text-sm font-medium text-red-600">Ends in {deal.timeLeft}</span>
        </div>
        
        <div className="mb-4">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-bold text-gray-900">
              ₦{deal.salePrice.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500 line-through">
              ₦{deal.originalPrice.toLocaleString()}
            </span>
          </div>
          <div className="text-sm font-semibold text-green-600">
            Save ₦{savings.toLocaleString()}
          </div>
        </div>
        
        <button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
          Shop Deal
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default function DealsPage() {
  const [viewMode, setViewMode] = useState('grid')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('discount')

  const categories = ['All', 'iPhone', 'Samsung', 'Android/Pixel', 'Accessories']

  const filteredDeals = deals.filter(deal => 
    selectedCategory === 'All' || deal.category === selectedCategory
  ).sort((a, b) => {
    if (sortBy === 'discount') return b.discount - a.discount
    if (sortBy === 'price-low') return a.salePrice - b.salePrice
    if (sortBy === 'price-high') return b.salePrice - a.salePrice
    if (sortBy === 'rating') return b.rating - a.rating
    return 0
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-4 sm:py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-full">
              <Flame className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4">
            🔥 Hot Deals & Flash Sales
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-6">
            Grab the best deals on top phones and accessories! Limited time offers with massive savings.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20">
              <div className="text-xl sm:text-2xl font-bold text-red-600 mb-1">50+</div>
              <div className="text-xs sm:text-sm text-gray-600">Active Deals</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20">
              <div className="text-xl sm:text-2xl font-bold text-orange-600 mb-1">Up to 30%</div>
              <div className="text-xs sm:text-sm text-gray-600">Max Discount</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20">
              <div className="text-xl sm:text-2xl font-bold text-green-600 mb-1">24/7</div>
              <div className="text-xs sm:text-sm text-gray-600">Deal Updates</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20">
              <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-1">Free</div>
              <div className="text-xs sm:text-sm text-gray-600">Shipping</div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
              >
                <option value="discount">Best Discount</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              <div className="flex items-center bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid' ? 'bg-white shadow-sm text-red-600' : 'text-gray-600'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'list' ? 'bg-white shadow-sm text-red-600' : 'text-gray-600'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Deals Grid/List */}
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'
            : 'space-y-4 sm:space-y-6'
        }`}>
          {filteredDeals.map((deal) => (
            <DealCard key={deal.id} deal={deal} viewMode={viewMode} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-6 sm:p-8 text-white">
            <Timer className="w-12 h-12 mx-auto mb-4 animate-pulse" />
            <h3 className="text-xl sm:text-2xl font-bold mb-2">Don't Miss Out!</h3>
            <p className="text-red-100 mb-6 max-w-md mx-auto">
              These deals won't last forever. Sign up for notifications and never miss a flash sale again.
            </p>
            <button className="bg-white text-red-600 font-semibold py-3 px-8 rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg">
              Get Deal Alerts
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}