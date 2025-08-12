"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { fetchProducts } from "@/lib/api"
import { Star, Heart, ShoppingCart, Eye, ArrowRight, Zap, TrendingUp } from "lucide-react"

interface Product {
    _id: string
    name: string
    brand: string
    price: number
    originalPrice?: number
    description: string
    category: string
    subcategory: string
    specs: Record<string, string | number | boolean>
    images: string[]
    stock: number
    isHotDeal: boolean
    hotDealDiscount: number
    isActive: boolean
    tags: string[]
    rating: number
    reviewCount: number
    createdAt: string
    updatedAt: string
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0
  }).format(price)
}

const calculateDiscount = (price: number, originalPrice?: number) => {
  if (!originalPrice || originalPrice <= price) return 0
  return Math.round(((originalPrice - price) / originalPrice) * 100)
}

function ProductCard({ product }: { product: Product }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  
  const discount = product.originalPrice 
    ? calculateDiscount(product.price, product.originalPrice)
    : product.hotDealDiscount || 0

  // Safe image handling with fallback
  const productImage = product.images && product.images.length > 0 && product.images[0]
    ? product.images[0] 
    : '/img1.jpeg'

  // Determine final image source
  const imageSrc = productImage.startsWith('http') ? productImage : `/uploads/${productImage}`

  return (
    <Card className="group relative overflow-hidden bg-slate-800/60 backdrop-blur-sm border-slate-700 hover:border-blue-500/50 hover:shadow-xl transition-all duration-300 h-full">
      <CardContent className="p-4">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
          {product.isHotDeal && (
            <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold border-0">
              <Zap className="w-3 h-3 mr-1" />
              Hot Deal
            </Badge>
          )}
          {discount > 0 && (
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold border-0">
              {discount}% OFF
            </Badge>
          )}
          {product.stock < 5 && product.stock > 0 && (
            <Badge className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-bold border-0">
              Low Stock
            </Badge>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-slate-700/80 backdrop-blur-sm hover:bg-slate-600 transition-colors"
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
        </button>

        {/* Product image */}
        <div className="relative aspect-square mb-4 overflow-hidden rounded-xl bg-slate-700">
          {imageSrc.startsWith('http') ? (
            <img
              src={imageSrc}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = '/img1.jpeg'
              }}
            />
          ) : (
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = '/img1.jpeg'
              }}
            />
          )}
          
          {/* Stock status overlay */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}

          {/* Quick actions overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 h-8 text-sm">
              <Eye className="w-4 h-4 mr-1" />
              View
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 h-8 text-sm">
              <ShoppingCart className="w-4 h-4 mr-1" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Product info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>{product.brand}</span>
            <span>•</span>
            <span>{product.category}</span>
          </div>
          
          <h3 className="font-semibold text-white line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors">
            {product.name}
          </h3>

          {/* Price */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-lg">
                {formatPrice(product.price)}
              </span>
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-sm text-green-400 font-medium">
                  Save {formatPrice(product.originalPrice - product.price)}
                </span>
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-slate-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-slate-400">
              ({product.reviewCount || 0})
            </span>
          </div>

          {/* Stock indicator */}
          <div className="text-xs">
            {product.stock > 0 ? (
              <span className="text-green-400">
                In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-red-400">
                Out of Stock
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function FeaturedProducts() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    // Fetch products from API
    useEffect(() => {
        setLoading(true)
        fetchProducts()
            .then((data: Product[]) => {
                console.log("Fetched products for featured section:", data)
                // Show featured/hot deal products first, then others
                const sortedProducts = data.sort((a, b) => {
                  if (a.isHotDeal && !b.isHotDeal) return -1
                  if (!a.isHotDeal && b.isHotDeal) return 1
                  return b.rating - a.rating
                })
                setProducts(sortedProducts.slice(0, 8)) // Show top 8 products
                setLoading(false)
            })
            .catch((err) => {
                console.error("Error fetching products:", err)
                setError("Failed to load products")
                setLoading(false)
            })
    }, [])

    if (loading) {
        return (
            <section className="py-20 bg-slate-800/30">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="w-64 h-8 bg-slate-700 rounded-lg mx-auto mb-4 animate-pulse"></div>
                        <div className="w-96 h-6 bg-slate-700 rounded-lg mx-auto animate-pulse"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-slate-800 rounded-xl p-4">
                                <div className="aspect-square bg-slate-700 rounded-lg mb-4 animate-pulse"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-slate-700 rounded animate-pulse"></div>
                                    <div className="h-4 bg-slate-700 rounded w-3/4 animate-pulse"></div>
                                    <div className="h-6 bg-slate-700 rounded w-1/2 animate-pulse"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    if (error) {
        return (
            <section className="py-20 bg-slate-800/30">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="text-6xl mb-4">😕</div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                            Oops! Something went wrong
                        </h2>
                        <p className="text-slate-400 mb-6">{error}</p>
                        <Button 
                            onClick={() => window.location.reload()}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            Try Again
                        </Button>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="py-20 bg-slate-800/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 animate-fade-in-up">
                    <div className="inline-flex items-center bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Featured Products
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Trending <span className="text-gradient">Smartphones</span>
                    </h2>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        Discover the latest and most popular smartphones, handpicked for their innovation, 
                        performance, and value for money.
                    </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {products.map((product, index) => (
                        <div 
                            key={product._id} 
                            className="animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center animate-fade-in-up" style={{ animationDelay: '800ms' }}>
                    <Link href="/products">
                        <Button className="btn-primary px-8 py-4 text-lg">
                            View All Products
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
