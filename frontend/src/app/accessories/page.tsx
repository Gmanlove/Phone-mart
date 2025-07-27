import { Card } from "@/components/ui/card"
import { Star, ShoppingCart, Heart, Eye } from "lucide-react"
import { CldImage } from "next-cloudinary";
import { extractCloudinaryPublicId } from "@/lib/utils";

export default function AccessoriesPage() {
  const accessories = [
    {
      id: 1,
      name: "Premium Wireless Charger",
      category: "Charging",
      price: 89990,
      originalPrice: 129990,
      rating: 4.8,
      reviews: 324,
      image: "bg-gradient-to-br from-slate-100 to-slate-200",
      badge: "Best Seller",
      description: "Fast wireless charging with premium materials and sleek design."
    },
    {
      id: 2,
      name: "Professional Phone Case",
      category: "Protection",
      price: 49990,
      originalPrice: null,
      rating: 4.9,
      reviews: 156,
      image: "bg-gradient-to-br from-blue-50 to-blue-100",
      badge: "New",
      description: "Military-grade protection with sophisticated styling."
    },
    {
      id: 3,
      name: "Bluetooth Earbuds Pro",
      category: "Audio",
      price: 159990,
      originalPrice: 199990,
      rating: 4.7,
      reviews: 892,
      image: "bg-gradient-to-br from-purple-50 to-purple-100",
      badge: "Featured",
      description: "Studio-quality sound with active noise cancellation."
    },
    {
      id: 4,
      name: "Magnetic Car Mount",
      category: "Automotive",
      price: 34990,
      originalPrice: null,
      rating: 4.6,
      reviews: 243,
      image: "bg-gradient-to-br from-emerald-50 to-emerald-100",
      badge: null,
      description: "Secure magnetic mounting system for hands-free driving."
    },
    {
      id: 5,
      name: "Power Bank Ultra",
      category: "Charging",
      price: 79990,
      originalPrice: 99990,
      rating: 4.8,
      reviews: 567,
      image: "bg-gradient-to-br from-orange-50 to-orange-100",
      badge: "Popular",
      description: "High-capacity portable charging with fast charging technology."
    },
    {
      id: 6,
      name: "Camera Lens Kit",
      category: "Photography",
      price: 124990,
      originalPrice: null,
      rating: 4.9,
      reviews: 78,
      image: "bg-gradient-to-br from-rose-50 to-rose-100",
      badge: "Premium",
      description: "Professional-grade lens attachments for mobile photography."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Premium <span className="text-blue-400">Accessories</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Enhance your devices with our carefully curated collection of premium accessories. 
              Each product is selected for quality, design, and performance.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>4.8+ Average Rating</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <ShoppingCart className="w-4 h-4 text-green-400" />
                <span>Free Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <span className="text-sm font-medium text-gray-700">Filter by:</span>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Categories</option>
                <option>Charging</option>
                <option>Protection</option>
                <option>Audio</option>
                <option>Automotive</option>
                <option>Photography</option>
              </select>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
                <option>Newest</option>
              </select>
            </div>
            <div className="text-sm text-gray-600">
              Showing {accessories.length} products
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {accessories.map((product) => (
            <Card key={product.id} className="group bg-white shadow-sm hover:shadow-xl transition-all duration-300 border-0 rounded-2xl overflow-hidden w-full">
              {/* Product Image */}
              <div className="relative">
                <div className={`h-48 sm:h-56 lg:h-64 w-full ${product.image} flex items-center justify-center relative overflow-hidden`}>
                  <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30"></div>
                  
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                      <span className="bg-blue-600 text-white text-xs font-semibold px-2 sm:px-3 py-1 rounded-full">
                        {product.badge}
                      </span>
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-8 sm:w-10 h-8 sm:h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors">
                      <Heart className="w-3 sm:w-4 h-3 sm:h-4 text-gray-600" />
                    </button>
                    <button className="w-8 sm:w-10 h-8 sm:h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors">
                      <Eye className="w-3 sm:w-4 h-3 sm:h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 sm:p-5 lg:p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 sm:w-4 h-3 sm:h-4 text-yellow-400 fill-current" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700">{product.rating}</span>
                    <span className="text-xs sm:text-sm text-gray-500">({product.reviews})</span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                  {product.description}
                </p>

                {/* Price and Action */}
                <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl font-bold text-gray-900">
                      ₦{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ₦{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  
                  <button className="bg-slate-900 hover:bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 group/btn text-sm sm:text-base w-full xs:w-auto">
                    <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform flex-shrink-0" />
                    <span className="hidden sm:inline">Add to Cart</span>
                    <span className="sm:hidden">Add</span>
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-16">
          <button className="bg-white border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-8 py-4 rounded-xl font-medium transition-all duration-300">
            Load More Products
          </button>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-slate-900 text-white">
        <div className="container mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help Choosing?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Our experts are here to help you find the perfect accessories for your needs.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium transition-colors">
            Contact Our Experts
          </button>
        </div>
      </div>
    </div>
  )
}