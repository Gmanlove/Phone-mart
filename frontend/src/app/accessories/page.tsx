"use client"

import { useState, useEffect } from "react"
import { fetchProducts } from "@/lib/api"
import { Star, ShoppingCart, Heart, Eye, Smartphone, Headphones, Battery, Shield } from "lucide-react"
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

export default function AccessoriesPage() {
  const [accessories, setAccessories] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        setLoading(true)
        const products: Product[] = await fetchProducts()
        
        // Filter products by category "Accessories" or similar
        const accessoryProducts = products.filter(product => 
          product.category.toLowerCase().includes('accessories') || 
          product.category.toLowerCase().includes('accessory') ||
          product.name.toLowerCase().includes('case') ||
          product.name.toLowerCase().includes('charger') ||
          product.name.toLowerCase().includes('earphone') ||
          product.name.toLowerCase().includes('headphone')
        )
        
        setAccessories(accessoryProducts)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching accessories:", err)
        setError("Failed to load accessories")
        setLoading(false)
      }
    }

    fetchAccessories()
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

  // Get category icon
  const getCategoryIcon = (category: string) => {
    const cat = category.toLowerCase()
    if (cat.includes('audio') || cat.includes('headphone') || cat.includes('earphone')) {
      return <Headphones className="h-5 w-5" />
    }
    if (cat.includes('charging') || cat.includes('charger') || cat.includes('battery')) {
      return <Battery className="h-5 w-5" />
    }
    if (cat.includes('protection') || cat.includes('case') || cat.includes('cover')) {
      return <Shield className="h-5 w-5" />
    }
    return <Smartphone className="h-5 w-5" />
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading accessories...</p>
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
                    <Headphones className="h-8 w-8 lg:h-12 lg:w-12 mr-3 text-blue-300" />
                    Mobile Accessories
                  </h1>
                  <p className="text-blue-200 text-sm lg:text-base mt-1">
                    Premium Mobile Enhancement Solutions
                  </p>
                </div>
              </div>

              <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 mb-6 sm:mb-8 leading-relaxed max-w-3xl">
                Complete your mobile experience with our curated selection of premium accessories. From protection to performance enhancement.
              </p>

              {/* Category Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12">
                <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">{accessories.length}+</div>
                  <div className="text-sm sm:text-base text-blue-200 mt-1">Accessories</div>
                </div>
                <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">5+</div>
                  <div className="text-sm sm:text-base text-blue-200 mt-1">Categories</div>
                </div>
                <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">100%</div>
                  <div className="text-sm sm:text-base text-blue-200 mt-1">Authentic</div>
                </div>
                <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">★ 4.8</div>
                  <div className="text-sm sm:text-base text-blue-200 mt-1">Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          
          {/* Accessories Grid */}
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 flex items-center">
                  <Smartphone className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
                  Premium Accessories
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Enhance your mobile experience with quality accessories
                </p>
              </div>
            </div>

            {accessories.length === 0 ? (
              <div className="text-center py-12">
                <Headphones className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No Accessories Available
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  We&apos;re working on adding more accessories to our collection.
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Browse All Products
                </Link>
              </div>
            ) : (
              <>
                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {accessories.map((accessory) => (
                    <div key={accessory._id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden group">
                      {/* Product Image */}
                      <div className="relative">
                        <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-t-xl overflow-hidden">
                          <img
                            src={getValidImageUrl(accessory.images)}
                            alt={accessory.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                              e.currentTarget.src = "/api/placeholder/300/300"
                            }}
                          />
                        </div>
                        
                        {/* Category Badge */}
                        <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                          {getCategoryIcon(accessory.category)}
                          <span className="ml-1">{accessory.category}</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-colors">
                            <Heart className="h-4 w-4" />
                          </button>
                          <Link
                            href={`/products/${accessory._id}`}
                            className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4 space-y-3">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{accessory.brand}</p>
                          <h3 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-2">
                            {accessory.name}
                          </h3>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                          {accessory.description}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">(4.8)</span>
                        </div>

                        {/* Pricing */}
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            ₦{accessory.price.toLocaleString()}
                          </span>
                        </div>

                        {/* CTA Button */}
                        <Link
                          href={`/products/${accessory._id}`}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center group"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* View More */}
                <div className="text-center mt-12">
                  <Link
                    href="/products"
                    className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105"
                  >
                    View All Products
                    <Smartphone className="h-5 w-5 ml-2" />
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Professional CTA Section */}
        <div className="mt-16 mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-2xl p-8 sm:p-12 text-center text-white border border-blue-500 dark:border-blue-600">
            <div className="flex items-center justify-center mb-4">
              <Image
                src="/smart.png"
                alt="Smart Communications"
                width={48}
                height={48}
                className="w-10 h-10 mr-3 object-contain"
              />
              <h3 className="text-2xl sm:text-3xl font-bold">
                Need Help Choosing?
              </h3>
            </div>
            <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
              Our mobile experts can help you find the perfect accessories to complement your device and enhance your mobile experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors duration-200 border-2 border-white">
                Contact Expert
              </button>
              <button className="border-2 border-white text-white font-semibold px-8 py-3 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-200">
                Browse Catalog
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}