"use client"

import { useState, useEffect } from "react"
import { fetchProducts } from "@/lib/api"
import { Flame, Clock, ArrowRight, Zap, Gift, Timer } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Product {
  _id: string
  name: string
  brand: string
  price: number
  description: string
  category: string
  images: string[]
  createdAt?: string
  updatedAt?: string
}

interface Deal extends Product {
  originalPrice: number
  discount: number
  timeLeft: string
  badge: string
}

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true)
        const products: Product[] = await fetchProducts()
        
        // Transform products into deals with mock discounts
        const dealsData: Deal[] = products.map((product, index) => {
          const discountPercent = [15, 20, 25, 30, 35][index % 5]
          const originalPrice = Math.round(product.price / (1 - discountPercent / 100))
          
          return {
            ...product,
            originalPrice,
            discount: discountPercent,
            timeLeft: ["2h 45m", "1d 12h", "3h 20m", "5h 30m", "45m"][index % 5],
            badge: ["Flash Sale", "Limited Deal", "Best Seller", "Hot Deal", "Special Offer"][index % 5]
          }
        }).slice(0, 12) // Show first 12 products as deals
        
        setDeals(dealsData)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching deals:", err)
        setError("Failed to load deals")
        setLoading(false)
      }
    }

    fetchDeals()
  }, [])

  // Helper function to construct proper image URL
  const getValidImageUrl = (images: string[] | undefined): string => {
    if (!images || images.length === 0) {
      return "/api/placeholder/300/300"
    }
    
    const firstImage = images[0]
    
    if (firstImage.startsWith("http")) {
      return firstImage
    }
    
    if (firstImage.includes("phone-mart-products/")) {
      return `https://res.cloudinary.com/dn7zah8um/image/upload/${firstImage}.png`
    }
    
    if (!firstImage.includes("phone-mart-products/") && !firstImage.startsWith("http")) {
      return `https://res.cloudinary.com/dn7zah8um/image/upload/phone-mart-products/${firstImage}.png`
    }
    
    return firstImage
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading amazing deals...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400 text-lg">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-blue-800 dark:via-blue-900 dark:to-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12 sm:py-16 lg:py-20">
            <div className="max-w-4xl">
              {/* Logo and Brand */}
              <div className="flex items-center mb-6">
                <Image
                  src="/smart.png"
                  alt="Smart Communications"
                  width={48}
                  height={48}
                  className="w-10 h-10 lg:w-12 lg:h-12 mr-4 object-contain"
                />
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight flex items-center">
                    <Flame className="h-8 w-8 lg:h-12 lg:w-12 mr-3 text-orange-400" />
                    Hot Deals
                  </h1>
                  <p className="text-blue-200 text-sm lg:text-base mt-1">
                    Exclusive Smart Communications Offers
                  </p>
                </div>
              </div>

              <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 mb-6 sm:mb-8 leading-relaxed max-w-3xl">
                Discover incredible savings on premium smartphones and accessories. Limited time offers on authentic products.
              </p>

              {/* Deal Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12">
                <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Up to 35%</div>
                  <div className="text-sm sm:text-base text-blue-200 mt-1">Savings</div>
                </div>
                <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">{deals.length}+</div>
                  <div className="text-sm sm:text-base text-blue-200 mt-1">Products</div>
                </div>
                <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">24h</div>
                  <div className="text-sm sm:text-base text-blue-200 mt-1">Limited Time</div>
                </div>
                <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">★ 4.9</div>
                  <div className="text-sm sm:text-base text-blue-200 mt-1">Customer Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          
          {/* Deals Grid */}
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 flex items-center">
                  <Gift className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
                  Exclusive Deals
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Limited time offers on premium devices
                </p>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Timer className="h-4 w-4 text-orange-500" />
                <span>Deals refresh daily</span>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {deals.map((deal) => (
                <div key={deal._id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
                  {/* Deal Badge */}
                  <div className="relative">
                    <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-t-xl overflow-hidden">
                      <Image
                        src={getValidImageUrl(deal.images)}
                        alt={deal.name}
                        width={400}
                        height={192}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/api/placeholder/300/300"
                        }}
                      />
                    </div>
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      -{deal.discount}%
                    </div>
                    <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                      {deal.badge}
                    </div>
                    <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {deal.timeLeft}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 space-y-3">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{deal.brand}</p>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-2">
                        {deal.name}
                      </h3>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                      {deal.description}
                    </p>

                    {/* Pricing */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          ₦{deal.price.toLocaleString()}
                        </span>
                        <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                          ₦{deal.originalPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                        Save ₦{(deal.originalPrice - deal.price).toLocaleString()}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link
                      href={`/products/${deal._id}`}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center group"
                    >
                      Grab Deal
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* View More Deals */}
            <div className="text-center mt-12">
              <Link
                href="/products"
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105"
              >
                View All Products
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-2xl p-8 sm:p-12 text-center text-white border border-blue-500 dark:border-blue-600">
            <div className="flex items-center justify-center mb-4">
              <Zap className="h-10 w-10 mr-3 text-yellow-400" />
              <h3 className="text-2xl sm:text-3xl font-bold">
                Never Miss a Deal!
              </h3>
            </div>
            <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
              Get notified about flash sales, exclusive offers, and new arrivals before anyone else.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors duration-200 whitespace-nowrap">
                Get Deals
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}