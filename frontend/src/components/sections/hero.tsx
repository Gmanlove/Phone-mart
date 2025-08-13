"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Star, Shield, Truck, Zap, Award, Clock, Heart, ShoppingCart, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { fetchProducts } from "@/lib/api"

// StarRating component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-3 w-3 ${
            star <= rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-gray-200 text-gray-200 dark:fill-gray-600 dark:text-gray-600'
          }`}
        />
      ))}
    </div>
  )
}

// Product interface based on backend model
interface Product {
  _id: string
  name: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  brand: string
  stock: number
  description: string
  specifications: {
    display?: string
    processor?: string
    ram?: string
    storage?: string
    camera?: string
    battery?: string
    os?: string
  }
  warranty: string
  colors: string[]
  rating?: number
  reviews?: number
  reviewCount?: number // Add this for the review count display
  hotDealDiscount?: number // Add this for hot deal discounts
  isHotDeal?: boolean // Add this for hot deal flag
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

function HeroBanner() {
  return (
    <div className="relative rounded-3xl overflow-hidden mb-12 min-h-[500px] md:min-h-[600px]" style={{ background: `var(--color-blue-700)` }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-20 h-20 bg-white/10 rounded-full animate-float animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-white/10 rounded-full animate-float animation-delay-4000"></div>
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 lg:p-16 min-h-[500px] md:min-h-[600px]">
        {/* Left content */}
        <div className="text-white space-y-8 z-10">
          <div className="space-y-4">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
              <Star className="w-4 h-4 mr-2" />
              Nigeria&apos;s #1 Phone Store
            </div>
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              SMART PHONES.<br />
              <span className="text-yellow-300 animate-pulse-soft">SMART DEALS.</span>
            </h1>
            <p className="text-2xl text-blue-100 font-medium">UP to 80% OFF</p>
            <p className="text-lg text-blue-100 max-w-lg">
              Discover the latest smartphones with unbeatable prices, authentic products, 
              and professional service you can trust.
            </p>
          </div>

          {/* Carousel dots */}
          <div className="flex items-center space-x-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`h-3 w-3 rounded-full transition-all duration-500 ${i === 0 ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'}`}></div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Link href="/products">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Shop Now
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 text-lg backdrop-blur-sm transition-all duration-300">
              <Link href="/deals">
                <Zap className="w-5 h-5 mr-2" />
                View Deals
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-sm text-blue-100">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm text-blue-100">Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm text-blue-100">Support</div>
            </div>
          </div>
        </div>

        {/* Right content - Hero image */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <Image
              src="/img1.jpeg"
              alt="Featured Smartphone"
              width={400}
              height={500}
              className="relative rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 hover:scale-105"
            />
            
            {/* Price badge */}
            <div className="absolute -top-6 -right-6 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-2xl text-lg font-bold animate-bounce-gentle shadow-lg">
              50% OFF
            </div>
            <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg">
              ✓ Genuine Products
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation arrows */}
      <button className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300 hover:scale-110">
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300 hover:scale-110">
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  
  const discount = product.originalPrice 
    ? calculateDiscount(product.price, product.originalPrice)
    : product.hotDealDiscount || 0

  const productImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : '/img1.jpeg'

  return (
    <Card className="group relative overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 h-full">
      <CardContent className="p-3 md:p-4">
        {/* Badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {product.isHotDeal && (
            <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold">
              Hot Deal
            </Badge>
          )}
          {discount > 0 && (
            <Badge className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold">
              {discount}% OFF
            </Badge>
          )}
          {product.stock < 5 && product.stock > 0 && (
            <Badge className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold">
              Low Stock
            </Badge>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-colors"
        >
          <Heart className={`h-3 w-3 md:h-4 md:w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'}`} />
        </button>

        {/* Product image */}
        <div className="relative aspect-square mb-2 md:mb-3 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
          <Image
            src={productImage.startsWith('http') ? productImage : `/uploads/${productImage}`}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = '/img1.jpeg'
            }}
          />
          
          {/* Stock status overlay */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="space-y-1 md:space-y-2">
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <span>{product.brand}</span>
            <span>•</span>
            <span>{product.category}</span>
          </div>
          
          <h3 className="font-semibold text-xs md:text-sm text-gray-900 dark:text-white line-clamp-2 leading-tight">
            {product.name}
          </h3>

          {/* Price */}
          <div className="space-y-1">
            <div className="flex items-center gap-1 md:gap-2">
              <span className="font-bold text-gray-900 dark:text-white text-sm md:text-base">
                {formatPrice(product.price)}
              </span>
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="flex flex-col md:flex-row md:items-center gap-1">
                <span className="text-xs text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                  Save {formatPrice(product.originalPrice - product.price)}
                </span>
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex">
              {/* Use nullish coalescing to provide default rating of 0 */}
              <StarRating rating={product.rating ?? 0} />
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              ({product.reviewCount ?? 0})
            </span>
          </div>

          {/* Stock indicator */}
          <div className="text-xs">
            {product.stock > 0 ? (
              <span className="text-green-600 dark:text-green-400">
                In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-red-600 dark:text-red-400">
                Out of Stock
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ProductSection({ 
  title, 
  products, 
  viewAllHref, 
  isLoading 
}: { 
  title: string
  products: Product[]
  viewAllHref: string
  isLoading: boolean
}) {
  if (isLoading) {
    return (
      <div className="mb-8 md:mb-12">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        
        {/* Loading skeleton */}
        <div className="grid grid-cols-2 md:hidden gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 animate-pulse"></div>
          ))}
        </div>
        
        <div className="hidden md:flex gap-4 overflow-x-auto pb-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="min-w-[250px] bg-gray-200 dark:bg-gray-700 rounded-lg h-80 animate-pulse flex-shrink-0"></div>
          ))}
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="mb-8 md:mb-12">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
        </div>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No products available in this category
        </div>
      </div>
    )
  }

  return (
    <div className="mb-8 md:mb-12">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {title}
          </h2>
        </div>
        <Link 
          href={viewAllHref} 
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium flex items-center gap-1 text-sm md:text-base"
        >
          View All <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
        </Link>
      </div>

      {/* Mobile: 2x2 grid, Desktop: horizontal scroll */}
      <div className="grid grid-cols-2 md:hidden gap-3">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Desktop: horizontal scroll */}
      <div className="hidden md:flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {products.map((product) => (
          <div key={product._id} className="min-w-[250px] flex-shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true)
        const products = await fetchProducts()
        setAllProducts(products || [])
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Failed to load products')
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Categorize products
  const smartphoneProducts = allProducts.filter(product => 
    ['iPhone', 'Samsung', 'Android/Pixel'].includes(product.category)
  ).slice(0, 8)

  const accessoryProducts = allProducts.filter(product => 
    product.category === 'Accessories'
  ).slice(0, 8)

  const hotDeals = allProducts.filter(product => 
    product.isHotDeal || product.category === 'Hot Deals'
  ).slice(0, 8)

  const laptopProducts = allProducts.filter(product => 
    product.category === 'Laptops'
  ).slice(0, 8)

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Banner */}
        <HeroBanner />

        {/* Error handling */}
        {error && (
          <div className="mb-8 p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-center">
            {error}
          </div>
        )}

        {/* Products Sections */}
        <ProductSection 
          title="Grab the best deal on Smartphones"
          products={smartphoneProducts}
          viewAllHref="/products?category=smartphones"
          isLoading={isLoading}
        />

        <ProductSection 
          title="Hot Deals & Special Offers"
          products={hotDeals}
          viewAllHref="/deals"
          isLoading={isLoading}
        />

        <ProductSection 
          title="Phone Accessories & More"
          products={accessoryProducts}
          viewAllHref="/accessories"
          isLoading={isLoading}
        />

        <ProductSection 
          title="Laptops & Computing"
          products={laptopProducts}
          viewAllHref="/products?category=laptops"
          isLoading={isLoading}
        />

        {/* Trust indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 border border-gray-200 dark:border-gray-700">
          {[
            { icon: Shield, text: "100% Authentic Products", subtext: "Guaranteed genuine items" },
            { icon: Truck, text: "Fast & Free Delivery", subtext: "Same day delivery available" },
            { icon: Star, text: "5-Star Customer Service", subtext: "24/7 support available" },
            { icon: Award, text: "Best Price Guarantee", subtext: "Lowest prices guaranteed" }
          ].map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg flex-shrink-0">
                <item.icon className="h-5 w-5 md:h-6 md:w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {item.text}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {item.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}