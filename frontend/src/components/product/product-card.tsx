"use client"

import { useState } from "react"
import { Star, Heart, ShoppingCart, Eye, Zap, Shield, Truck, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import { CldImage } from "next-cloudinary"
import { extractCloudinaryPublicId } from "@/lib/utils"

export interface Product {
  specs?: Record<string, unknown>
  _id: string
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  rating: number
  reviews: number | any[] // Accept both number and array
  reviewCount?: number // Add this for review count
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

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(price)
}

export default function ProductCard({ product, layout = 'grid' }: ProductCardProps) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

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
      title: "✅ Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
    toast({
      title: isWishlisted ? "💔 Removed from wishlist" : "❤️ Added to wishlist",
      description: `${product.name} has been ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`,
    })
  }

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  if (layout === 'list') {
    return (
      <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white border-0 shadow-soft overflow-hidden">
        <Link href={`/products/${product.id}`}>
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="relative md:w-1/3 h-64 md:h-auto overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse"></div>
              {product.image && product.image !== "" ? (
                product.image.startsWith('http') ? (
                  // Regular image for external URLs
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/img1.jpeg';
                    }}
                  />
                ) : (
                  // Cloudinary image for public IDs
                  <CldImage
                    src={extractCloudinaryPublicId(product.image) || "img1"}
                    alt={product.name}
                    fill
                    className={`object-cover transition-all duration-500 group-hover:scale-110 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )
              ) : (
                // Fallback image
                <img
                  src="/img1.jpeg"
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  onLoad={() => setImageLoaded(true)}
                />
              )}
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 animate-pulse-soft">
                    ✨ New
                  </Badge>
                )}
                {discountPercentage > 0 && (
                  <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">
                    -{discountPercentage}%
                  </Badge>
                )}
                {product.fastDelivery && (
                  <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
                    <Truck className="w-3 h-3 mr-1" />
                    Fast
                  </Badge>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={handleWishlist}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart 
                  className={`w-5 h-5 transition-colors duration-200 ${
                    isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'
                  }`} 
                />
              </button>
            </div>

            {/* Content Section */}
            <CardContent className="md:w-2/3 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs text-gray-600 bg-gray-50">
                    {product.brand}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>
                </div>

                <h3 className="font-semibold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                  {product.name}
                </h3>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.features.slice(0, 3).map((feature, index) => (
                    <span 
                      key={index}
                      className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-blue-500"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
                <Button
                  variant="outline"
                  className="px-4 border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 rounded-xl transition-all duration-300"
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </div>
        </Link>
      </Card>
    )
  }

  return (
    <Card 
      className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 bg-white border-0 shadow-soft overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`} className="block">
        {/* Image Section */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          {!imageLoaded && (
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
          )}
          
          {product.image && product.image !== "" ? (
            product.image.startsWith('http') ? (
              // Regular image for external URLs
              <img
                src={product.image}
                alt={product.name}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/img1.jpeg';
                }}
              />
            ) : (
              // Cloudinary image for public IDs
              <CldImage
                src={extractCloudinaryPublicId(product.image) || "img1"}
                alt={product.name}
                fill
                className={`object-cover transition-all duration-700 group-hover:scale-110 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            )
          ) : (
            // Fallback image
            <img
              src="/img1.jpeg"
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
              onLoad={() => setImageLoaded(true)}
            />
          )}

          {/* Overlay with Quick Actions */}
          <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`flex gap-3 transform transition-all duration-300 ${
                isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}>
                <Button
                  onClick={handleAddToCart}
                  size="default"
                  className="bg-white/90 hover:bg-white text-gray-900 border-0 rounded-xl backdrop-blur-sm shadow-lg transform hover:scale-110 transition-all duration-200"
                >
                  <ShoppingCart className="w-4 h-4" />
                </Button>
                <Button
                  onClick={handleWishlist}
                  size="default"
                  variant="outline"
                  className="bg-white/90 hover:bg-white border-0 rounded-xl backdrop-blur-sm shadow-lg transform hover:scale-110 transition-all duration-200"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'text-red-500 fill-current' : ''}`} />
                </Button>
                <Button
                  size="default"
                  variant="outline"
                  className="bg-white/90 hover:bg-white border-0 rounded-xl backdrop-blur-sm shadow-lg transform hover:scale-110 transition-all duration-200"
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 animate-pulse-soft shadow-lg">
                ✨ New
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-lg font-bold">
                -{discountPercentage}%
              </Badge>
            )}
            {product.fastDelivery && (
              <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 shadow-lg">
                <Truck className="w-3 h-3 mr-1" />
                Fast
              </Badge>
            )}
          </div>

          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <Badge variant="secondary" className="text-lg px-4 py-2 shadow-lg">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>

        {/* Content Section */}
        <CardContent className="p-6">
          {/* Brand and Rating */}
          <div className="flex items-center justify-between mb-3">
            <Badge variant="secondary" className="text-xs text-gray-600 bg-gray-50 border-gray-200">
              {product.brand}
            </Badge>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-700">{product.rating}</span>
              <span className="text-sm text-gray-500">({product.reviews})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-lg text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-300">
            {product.name}
          </h3>

          {/* Features */}
          <div className="flex flex-wrap gap-1 mb-4">
            {product.features.slice(0, 2).map((feature, index) => (
              <span 
                key={index}
                className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-xl font-semibold py-3 transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-blue-500 group"
          >
            <ShoppingCart className="w-4 h-4 mr-2 group-hover:animate-bounce" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" />
          </Button>

          {/* Additional Info */}
          {product.warranty && (
            <div className="flex items-center justify-center mt-3 text-xs text-gray-600">
              <Shield className="w-3 h-3 mr-1" />
              {product.warranty} Warranty
            </div>
          )}
        </CardContent>
      </Link>
    </Card>
  )
}