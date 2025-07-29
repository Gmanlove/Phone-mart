"use client"

import { useState } from "react"
import { Star, Heart, ShoppingCart, Eye, Zap, Shield, Truck } from "lucide-react"

// Mock components for demonstration
const Button = ({ variant = "default", size = "default", className = "", children, disabled = false, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500 hover:shadow-lg",
    ghost: "hover:bg-gray-100 hover:text-gray-900",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200"
  }
  const sizes = {
    default: "h-10 px-4 py-2 text-sm rounded-lg",
    sm: "h-8 px-3 text-xs rounded-md",
    lg: "h-12 px-8 text-base rounded-lg",
    icon: "h-9 w-9 rounded-lg"
  }
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'cursor-not-allowed' : ''} ${className}`} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

const Badge = ({ variant = "default", className = "", children, ...props }) => {
  const variants = {
    default: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    destructive: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800"
  }
  
  return (
    <span 
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </span>
  )
}

const Card = ({ className = "", children, ...props }) => (
  <div className={`rounded-xl border border-gray-200 bg-white shadow-sm ${className}`} {...props}>
    {children}
  </div>
)

const CardContent = ({ className = "", children, ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
)

// Mock Link component
const Link = ({ href, className = "", children, ...props }) => (
  <a href={href} className={`block ${className}`} {...props}>
    {children}
  </a>
)

// Mock hooks
const useCart = () => ({
  addItem: (item) => console.log('Added to cart:', item)
})

const useToast = () => ({
  toast: ({ title, description }) => console.log(`Toast: ${title} - ${description}`)
})

// Product interface
export interface Product {
  specs: any
  _id: string
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  image: string
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
  rating: 4.8,
  reviews: 1247,
  features: ["6.7-inch Super Retina XDR display", "A17 Pro chip with 6-core GPU", "Pro camera system", "Up to 29 hours video playback"],
  inStock: true,
  isNew: true,
  isFeatured: true,
  fastDelivery: true,
  warranty: "1 Year Apple Warranty"
}

export default function ProductCard({ product = sampleProduct, layout = 'grid' }: ProductCardProps) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleAddToCart = (e) => {
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

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`,
    })
  }

  const handleQuickView = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toast({
      title: "Quick View",
      description: "Opening product details...",
    })
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => {
      const filled = i < Math.floor(rating)
      const half = !filled && i < rating
      
      return (
        <Star
          key={i}
          className={`h-3.5 w-3.5 sm:h-4 sm:w-4 transition-colors ${
            filled 
              ? "text-yellow-400 fill-yellow-400" 
              : half 
              ? "text-yellow-400 fill-yellow-400/50"
              : "text-gray-300"
          }`}
        />
      )
    })
  }

  if (layout === 'list') {
    return (
      <Card className="group hover:shadow-2xl transition-all duration-300 hover:border-blue-200 overflow-hidden">
        <Link href={`/products/${product.id}`}>
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row">
              {/* Image Section */}
              <div className="relative w-full sm:w-48 md:w-56 lg:w-64 flex-shrink-0">
                <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 aspect-square sm:aspect-auto sm:h-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                  />
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.isNew && (
                      <Badge className="bg-green-500 text-white shadow-lg">
                        <Zap className="w-3 h-3 mr-1" />
                        New
                      </Badge>
                    )}
                    {discountPercentage > 0 && (
                      <Badge className="bg-red-500 text-white shadow-lg font-bold">
                        -{discountPercentage}%
                      </Badge>
                    )}
                    {product.isFeatured && (
                      <Badge className="bg-purple-500 text-white shadow-lg">
                        Featured
                      </Badge>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`absolute top-3 right-3 bg-white/90 backdrop-blur-sm border border-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 ${
                      isWishlisted ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
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
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                      {product.name}
                    </h3>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-600 font-medium">
                      {product.rating} ({product.reviews.toLocaleString()} reviews)
                    </span>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <ul className="text-sm text-gray-600 space-y-2">
                      {product.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-start">
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
          <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 aspect-square">
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.isNew && (
                <Badge className="bg-green-500 text-white shadow-lg">
                  <Zap className="w-3 h-3 mr-1" />
                  New
                </Badge>
              )}
              {discountPercentage > 0 && (
                <Badge className="bg-red-500 text-white shadow-lg font-bold">
                  -{discountPercentage}%
                </Badge>
              )}
              {product.isFeatured && (
                <Badge className="bg-purple-500 text-white shadow-lg">
                  Featured
                </Badge>
              )}
            </div>

            {/* Wishlist Button */}
            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-3 right-3 bg-white/90 backdrop-blur-sm border border-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 ${
                isWishlisted ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
              }`}
              onClick={handleWishlist}
            >
              <Heart className={`h-4 w-4 transition-all ${isWishlisted ? 'fill-current' : ''}`} />
            </Button>

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
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                {product.name}
              </h3>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-gray-600 font-medium">
                {product.rating} ({product.reviews})
              </span>
            </div>

            {/* Features */}
            <div className="mb-4">
              <ul className="text-xs sm:text-sm text-gray-600 space-y-1.5">
                {product.features.slice(0, 2).map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                    <span className="leading-relaxed">{feature}</span>
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