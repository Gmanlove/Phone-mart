"use client"
import Link from "next/link"
import Image from "next/image"
// ...existing code imports...
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Star, Shield, Truck, Award, Heart, ShoppingCart as ShoppingCartIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { useCart } from "@/contexts/cart-context"
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

// HeroBanner removed per request - hero banner is no longer rendered

function ProductCard({ product }: { product: Product }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  // Call hook at top-level of component (rules-of-hooks)
  const { addItem } = useCart()
  
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
          onClick={(e) => { e.stopPropagation(); setIsWishlisted(!isWishlisted) }}
          className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle wishlist"
        >
          <Heart className={`h-3 w-3 md:h-4 md:w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'}`} />
        </button>

        {/* Add to cart button */}
        {product.stock > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              const img = productImage.startsWith('http') ? productImage : `/uploads/${productImage}`
              addItem({ id: product._id, name: product.name, price: product.price, image: img })
              setJustAdded(true)
              setTimeout(() => setJustAdded(false), 1200)
            }}
            className="absolute top-12 right-2 z-10 p-2 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-all duration-200 flex items-center justify-center"
            aria-label="Add to cart"
          >
            <ShoppingCartIcon className={`h-4 w-4 ${justAdded ? 'animate-bounce' : ''}`} />
          </button>
        )}

        {/* Product image */}
        <Link href={`/products/${product._id}`} className="relative block">
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
        </Link>

        {/* Product info */}
        <div className="space-y-1 md:space-y-2">
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <span>{product.brand}</span>
            <span>•</span>
            <span>{product.category}</span>
          </div>
          
          <h3 className="font-semibold text-xs md:text-sm text-gray-900 dark:text-white line-clamp-2 leading-tight">
            <Link href={`/products/${product._id}`} className="hover:underline block">
              {product.name}
            </Link>
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
  // (smartphoneProducts intentionally omitted to reduce unused variable warnings)

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
  {/* Hero Banner removed per request */}

        {/* Error handling */}
        {error && (
          <div className="mb-8 p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-center">
            {error}
          </div>
        )}

        {/* Products Sections */}
        {/* <ProductSection 
          title="Grab the best deal on Smartphones"
          products={smartphoneProducts}
          viewAllHref="/products?category=smartphones"
          isLoading={isLoading}
        /> */}

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