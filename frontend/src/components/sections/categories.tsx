"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { ArrowRight, Smartphone, Headphones, Zap, Shield } from "lucide-react"

type Category = {
  id: string
  name: string
  href: string
  image?: string
  count?: number
  description?: string
  isPopular?: boolean
  discount?: string
  icon?: React.ReactNode
}

// Mock data - In a real app, this would come from your API
const mockCategories: Category[] = [
  {
    id: "1",
    name: "iPhone",
    href: "/products?brand=apple",
    image: "/placeholder.svg?height=200&width=200",
    count: 45,
    description: "Latest iOS devices",
    isPopular: true,
    discount: "Up to 25% OFF",
    icon: <Smartphone className="h-6 w-6" />
  },
  {
    id: "2",
    name: "Samsung Galaxy",
    href: "/products?brand=samsung",
    image: "/placeholder.svg?height=200&width=200",
    count: 38,
    description: "Android powerhouses",
    isPopular: true,
    discount: "Up to 30% OFF",
    icon: <Smartphone className="h-6 w-6" />
  },
  {
    id: "3",
    name: "Google Pixel",
    href: "/products?brand=google",
    image: "/placeholder.svg?height=200&width=200",
    count: 22,
    description: "Pure Android experience",
    discount: "Up to 20% OFF",
    icon: <Smartphone className="h-6 w-6" />
  },
  {
    id: "4",
    name: "OnePlus",
    href: "/products?brand=oneplus",
    image: "/placeholder.svg?height=200&width=200",
    count: 18,
    description: "Never Settle phones",
    icon: <Zap className="h-6 w-6" />
  },
  {
    id: "5",
    name: "Accessories",
    href: "/accessories",
    image: "/placeholder.svg?height=200&width=200",
    count: 150,
    description: "Cases, chargers & more",
    discount: "Up to 40% OFF",
    icon: <Headphones className="h-6 w-6" />
  },
  {
    id: "6",
    name: "Refurbished",
    href: "/products?condition=refurbished",
    image: "/placeholder.svg?height=200&width=200",
    count: 35,
    description: "Quality pre-owned devices",
    discount: "Up to 50% OFF",
    icon: <Shield className="h-6 w-6" />
  }
]

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    // Simulate API call
    const fetchCategories = async () => {
      try {
        setLoading(true)
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        setCategories(mockCategories)
        setLoading(false)
      } catch (err) {
        setError("Failed to load categories")
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="w-64 h-8 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse"></div>
            <div className="w-96 h-6 bg-gray-200 rounded-lg mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-full h-32 bg-gray-200 rounded-xl mb-4 animate-pulse"></div>
                <div className="w-3/4 h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="w-1/2 h-3 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Smartphone className="h-4 w-4 mr-2" />
            Shop by Category
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Find Your Perfect 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Device</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our curated collection of premium smartphones and accessories 
            from the world's most trusted brands
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-12">
          {categories.map((category, index) => (
            <Link key={category.id} href={category.href}>
              <Card className="group h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 overflow-hidden">
                <CardContent className="p-0 relative">
                  {/* Category image */}
                  <div className="relative overflow-hidden">
                    <div className="aspect-square relative">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-110"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Popular badge */}
                    {category.isPopular && (
                      <Badge className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-3 py-1 text-xs border-0 shadow-lg">
                        🔥 Popular
                      </Badge>
                    )}

                    {/* Discount badge */}
                    {category.discount && (
                      <Badge className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold px-3 py-1 text-xs border-0 shadow-lg">
                        {category.discount}
                      </Badge>
                    )}

                    {/* Hover overlay with icon */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <div className="text-white">
                          {category.icon}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Category info */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors duration-300">
                        {category.name}
                      </h3>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                    
                    <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 font-medium">
                        {category.count} products
                      </span>
                      <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </div>
                  </div>

                  {/* Animated border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/30 rounded-2xl transition-all duration-300"></div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <Link href="/products">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2">
                <Smartphone className="h-5 w-5" />
                <span>Explore All Products</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
            
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>1000+ Products</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Authentic Guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Phone Brands", value: "15+", icon: "📱" },
            { label: "Happy Customers", value: "50K+", icon: "😊" },
            { label: "Products Sold", value: "100K+", icon: "📦" },
            { label: "Expert Reviews", value: "4.9/5", icon: "⭐" }
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/20">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom animation styles */}
      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  )
}