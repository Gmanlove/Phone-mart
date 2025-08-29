"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { fetchProducts } from "@/lib/api"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import { getDefaultRating, getRandomReviewCount } from "@/lib/utils"
import { Star, Heart, ShoppingCart, Eye, ArrowRight, Zap, TrendingUp } from "lucide-react"

interface Product {
    _id: string
    name: string
    brand: string
    price: number
    originalPrice?: number
    description: string
    category: string
    subcategory?: string
    images: string[]
    stock: number
    rating: number
    isHotDeal?: boolean
    hotDealDiscount?: number
    tags: string[]
}

const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`w-4 h-4 ${
                        star <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-300 text-gray-300"
                    }`}
                />
            ))}
        </div>
    )
}

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleAddToCart = () => {
    if (product.stock <= 0) {
      toast({
        title: "Out of Stock",
        description: "This product is currently out of stock.",
      })
      return
    }

    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: getImageUrl(product),
    })

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const getImageUrl = (product: Product) => {
    if (!product.images || product.images.length === 0) {
      return "/img1.jpeg"
    }
    
    const firstImage = product.images[0]
    
    if (firstImage.startsWith("http")) {
      return firstImage
    }
    
    if (!firstImage.includes("phone-mart-products/") && !firstImage.startsWith("http")) {
      return `https://res.cloudinary.com/dn7zah8um/image/upload/phone-mart-products/${firstImage}.png`
    }
    
    return firstImage
  }

  const discount = product.originalPrice ? 
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0

  return (
    <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <CardContent className="p-0">
        {/* Badge overlay */}
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
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-white'}`} />
        </button>

        {/* Product image */}
        <div className="relative aspect-square overflow-hidden">
          {getImageUrl(product) && (
            <Image
              src={getImageUrl(product)}
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
            <Button onClick={handleAddToCart} className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 h-8 text-sm">
              <ShoppingCart className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </div>

        {/* Product details */}
        <div className="p-4 bg-white">
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
            <span>{product.brand}</span>
            <span>•</span>
            <span>{product.category}</span>
          </div>
          
          <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          <div className="mt-2 space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900 text-lg">
                ₦{product.price.toLocaleString()}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-gray-400 line-through">
                  ₦{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
                            <StarRating rating={product.rating ?? 4.0} />
              <span className="text-xs text-gray-400">({getRandomReviewCount()})</span>
            </div>
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
        fetchProducts({ sort: 'newest' })
            .then((data: Product[]) => {
                console.log("Fetched products for featured section:", data)
                // Show newest products first
                setProducts(data.slice(0, 8)) // Show top 8 newest products
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
                        <div className="inline-flex items-center bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            Featured Products
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Trending <span className="text-gradient">Smartphones</span>
                        </h2>
                    </div>
                    
                    {/* Loading skeletons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-96 animate-pulse"></div>
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
                        <h2 className="text-2xl font-bold text-white mb-2">
                            Something went wrong
                        </h2>
                        <p className="text-slate-300 mb-4">{error}</p>
                        <Button 
                            onClick={() => window.location.reload()}
                            className="btn-primary"
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
