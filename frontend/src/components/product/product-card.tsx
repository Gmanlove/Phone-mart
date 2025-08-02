"use client"

import { useState } from "react"
import { Star, Heart, ShoppingCart, Eye, Zap, Shield, Truck } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import { CldImage } from "next-cloudinary"
import { extractCloudinaryPublicId } from "@/lib/utils"

// Product interface - Updated to include images array
export interface Product {
  specs: any
  _id: string
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  image: string // Primary image for display
  images?: string[] // Full array of product images
  rating: number
  reviews: number
  features: string[]
  inStock: boolean
  isNew?: boolean
  isFeatured?: boolean
  fastDelivery?: boolean
  warranty?: string
}

interface ProductCardProps {
  product: Product
  layout?: 'grid' | 'list'
}

// Sample product data for demonstration
const sampleProduct: Product = {
  specs: {},
  _id: "1",
  id: "1",
  name: "iPhone 15 Pro Max 256GB Natural Titanium",
  brand: "Apple",
  price: 899999,
  originalPrice: 1099999,
  image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
  images: ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop"],
  rating: 4.8,
  reviews: 1247,
  features: ["A17 Pro Chip", "256GB Storage", "Pro Camera System", "Action Button"],
  inStock: true,
  isNew: true,
  isFeatured: true,
  fastDelivery: true,
  warranty: "1 Year"
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(price)
}

export default function ProductCard({ product = sampleProduct, layout = 'grid' }: ProductCardProps) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!product.inStock) return

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`,
    })
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Implement quick view modal
    toast({
      title: "Quick view",
      description: "Quick view feature coming soon!",
    })
  }

  // Helper function to determine if image is valid
  const isValidImageUrl = (url: string): boolean => {
    return url && (url.startsWith("http") || url.startsWith("https"))
  }

  // Use product image if valid, otherwise fall back to placeholder
  const displayImage = isValidImageUrl(product.image) ? product.image : null

  if (layout === 'list') {
    return (
      <Card className="group hover:shadow-xl transition-all duration-300 hover:border-blue-200 overflow-hidden bg-white">
        <Link href={`/products/${product.id}`}>
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row">
              {/* Product Image */}
              <div className="relative w-full sm:w-48 md:w-56 lg:w-64 flex-shrink-0">
                <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 aspect-square sm:aspect-auto sm:h-full">
                  {displayImage ? (
                    isValidImageUrl(displayImage) && displayImage.includes("cloudinary") ? (
                      <CldImage
                        width={300}
                        height={300}
                        src={extractCloudinaryPublicId(displayImage) || "sample"}
                        alt={product.name}
                        className={`w-full h-full object-contain p-4 transition-all duration-500 group-hover:scale-110 ${
                          imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={() => setImageLoaded(true)}
                      />
                    ) : (
                      <img
                        src={displayImage}
                        alt={product.name}
                        className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                          imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={() => setImageLoaded(true)}
                      />
                    )
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <div className="text-center p-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-gray-400 text-xs">No Image</span>
                        </div>
                        <p className="text-gray-400 text-sm">Image not available</p>
                      </div>
                    </div>
                  )}
                  
                  {!imageLoaded && displayImage && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.isNew && (
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 text-xs px-2 py-1">
                        New
                      </Badge>
                    )}
                    {product.isFeatured && (
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0 text-xs px-2 py-1">
                        Featured
                      </Badge>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`absolute top-3 right-3 h-8 w-8 rounded-full transition-all duration-200 ${
                      isWishlisted 
                        ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                        : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
                    }`}
                    onClick={handleWishlist}
                  >
                    <Heart className={`h-4 w-4 transition-all ${isWishlisted ? 'fill-current' : ''}`} />
                  </Button>

                  {/* Stock Status Overlay */}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-gray-900/75 flex items-center justify-center">
                      <Badge variant="secondary" className="bg-white text-gray-900 text-sm px-4 py-2">
                        Out of Stock
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 p-4 sm:p-6 flex flex-col">
                <div className="flex-1">
                  {/* Brand and Title */}
                  <div className="mb-3">
                    <p className="text-sm font-medium text-blue-600 mb-1">{product.brand}</p>
                    <h3 className="text-lg lg:text-xl font-semibold text-gray-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="mb-4">
                    <ul className="space-y-1">
                      {product.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Trust Badges */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    {product.fastDelivery && (
                      <div className="flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        <Truck className="w-3 h-3 mr-1" />
                        Fast Delivery
                      </div>
                    )}
                    {product.warranty && (
                      <div className="flex items-center text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                        <Shield className="w-3 h-3 mr-1" />
                        {product.warranty}
                      </div>
                    )}
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <div className="flex flex-col">
                        <span className="text-lg text-gray-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                        <span className="text-xs text-green-600 font-semibold">
                          Save {formatPrice(product.originalPrice - product.price)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleQuickView}
                      className="hover:bg-blue-50 hover:border-blue-300"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      onClick={handleAddToCart} 
                      disabled={!product.inStock}
                      className="px-6 py-2 min-w-[140px]"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Link>
      </Card>
    )
  }

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 relative overflow-hidden">
      <Link href={`/products/${product.id}`}>
        <CardContent className="p-0">
          {/* Product Image */}
          <div className="relative overflow-hidden bg-gray-50">
            {displayImage ? (
              isValidImageUrl(displayImage) && displayImage.includes("cloudinary") ? (
                <CldImage
                  width={300}
                  height={300}
                  src={extractCloudinaryPublicId(displayImage) || "sample"}
                  alt={product.name}
                  className="w-full h-56 object-contain p-4"
                />
              ) : (
                <img
                  src={displayImage}
                  alt={product.name}
                  className="w-full h-56 object-contain p-4"
                />
              )
            ) : (
              <div className="w-full h-56 flex items-center justify-center bg-gray-100">
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-gray-400 text-xs">No Image</span>
                  </div>
                  <p className="text-gray-400 text-sm">Image not available</p>
                </div>
              </div>
            )}

            {/* Quick actions overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
              <Button 
                variant="outline" 
                className="bg-white/95 backdrop-blur-sm border-0 hover:bg-white text-gray-900 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                onClick={handleQuickView}
              >
                <Eye className="h-4 w-4 mr-2" />
                Quick View
              </Button>
            </div>

            {/* Stock Status Overlay */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-gray-900/75 flex items-center justify-center">
                <Badge variant="secondary" className="bg-white text-gray-900 text-sm px-4 py-2">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4 sm:p-5">
            {/* Brand and Title */}
            <div className="mb-3">
              <p className="text-sm font-medium text-blue-600 mb-1">{product.brand}</p>
              <h3 className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews})
              </span>
            </div>

            {/* Features */}
            <div className="mb-4">
              <ul className="space-y-1">
                {product.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                    <span className="text-sm text-gray-600 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.fastDelivery && (
                <div className="flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <Truck className="w-3 h-3 mr-1" />
                  Fast Delivery
                </div>
              )}
              {product.warranty && (
                <div className="flex items-center text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  <Shield className="w-3 h-3 mr-1" />
                  Warranty
                </div>
              )}
            </div>

            {/* Price */}
            <div className="flex items-end justify-between mb-4">
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full">
                      Save {formatPrice(product.originalPrice - product.price)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button 
              className="w-full font-semibold" 
              onClick={handleAddToCart} 
              disabled={!product.inStock}
              size="lg"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}