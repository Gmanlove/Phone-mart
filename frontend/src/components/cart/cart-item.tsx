"use client"

import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import { useState } from "react"

interface CartItemProps {
  item: {
    id: string
    name: string
    price: number
    image: string
    quantity: number
    originalPrice?: number
    category?: string
    brand?: string
    inStock?: boolean
  }
}

// Helper function to check if URL is valid
const isValidImageUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Base64 placeholder image (1x1 gray pixel)
const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzlmYTZiNyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=="

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()
  const [isRemoving, setIsRemoving] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity <= 0) {
      setIsRemoving(true)
      // Add small delay for animation
      setTimeout(() => {
        removeItem(item.id)
      }, 200)
    } else {
      setIsUpdating(true)
      updateQuantity(item.id, newQuantity)
      setTimeout(() => setIsUpdating(false), 300)
    }
  }

  const handleRemove = () => {
    setIsRemoving(true)
    setTimeout(() => {
      removeItem(item.id)
    }, 200)
  }

  const discount = item.originalPrice ? ((item.originalPrice - item.price) / item.originalPrice * 100) : 0
  const totalPrice = item.price * item.quantity
  const savings = item.originalPrice ? (item.originalPrice - item.price) * item.quantity : 0

  // Use placeholder image if the item image is not valid or there's an error
  const displayImage = (!isValidImageUrl(item.image) || imageError) ? placeholderImage : item.image

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <Card className={`group transition-all duration-300 hover:shadow-lg border-0 shadow-sm bg-white ${
      isRemoving ? 'opacity-50 scale-95 translate-x-4' : 'opacity-100 scale-100 translate-x-0'
    }`}>
      <CardContent className="p-0 overflow-hidden">
        <div className="relative">
          {/* Mobile Layout */}
          <div className="flex flex-col sm:hidden">
            {/* Top section with image and basic info */}
            <div className="flex items-start gap-4 p-4 pb-3">
              <div className="relative flex-shrink-0">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 ring-1 ring-gray-200/50">
                  <Image
                    src={displayImage}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="80px"
                    onError={handleImageError}
                  />
                  {item.inStock === false && (
                    <div className="absolute inset-0 bg-gray-900/70 flex items-center justify-center">
                      <span className="text-white text-xs font-medium">Out of Stock</span>
                    </div>
                  )}
                </div>
                {discount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                    -{discount.toFixed(0)}%
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                {item.category && (
                  <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wide">
                    {item.category}
                  </p>
                )}
                <h3 className="text-sm font-semibold text-gray-900 leading-tight mb-1 line-clamp-2">
                  {item.name}
                </h3>
                {item.brand && (
                  <p className="text-xs text-gray-600 mb-2">by {item.brand}</p>
                )}
                
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">
                      {formatCurrency(item.price)}
                    </span>
                  {item.originalPrice && item.originalPrice > item.price && (
                    <span className="text-sm text-gray-500 line-through">
                        {item.originalPrice ? formatCurrency(item.originalPrice) : ''}
                    </span>
                  )}
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors rounded-full flex-shrink-0"
                onClick={handleRemove}
                disabled={isRemoving}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Bottom section with quantity and total */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50/50 border-t border-gray-100">
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-3">Qty:</span>
                <div className="flex items-center bg-white border border-gray-200 rounded-xl shadow-sm">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-gray-100 rounded-l-xl"
                    onClick={() => handleQuantityChange(item.quantity - 1)}
                    disabled={isUpdating || item.quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <div className="px-3 py-1 min-w-[2.5rem] text-center">
                    <span className={`text-sm font-semibold transition-all duration-200 ${
                      isUpdating ? 'scale-110 text-blue-600' : 'scale-100 text-gray-900'
                    }`}>
                      {item.quantity}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-gray-100 rounded-r-xl"
                    onClick={() => handleQuantityChange(item.quantity + 1)}
                    disabled={isUpdating || item.inStock === false}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">
                    {formatCurrency(totalPrice)}
                  </div>
                {savings > 0 && (
                  <div className="text-xs text-green-600 font-medium">
                      Save {formatCurrency(savings)}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex items-center gap-6 p-6">
            {/* Product Image */}
            <div className="relative flex-shrink-0">
              <div className="relative w-24 h-24 lg:w-28 lg:h-28 rounded-2xl overflow-hidden bg-gray-100 ring-1 ring-gray-200/50 shadow-sm">
                <Image
                  src={displayImage}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 1024px) 96px, 112px"
                  onError={handleImageError}
                />
                {item.inStock === false && (
                  <div className="absolute inset-0 bg-gray-900/70 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">Out of Stock</span>
                  </div>
                )}
              </div>
              {discount > 0 && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg animate-pulse">
                  -{discount.toFixed(0)}%
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0 space-y-2">
              {item.category && (
                <div className="inline-block">
                  <span className="text-xs text-gray-500 font-medium px-2 py-1 bg-gray-100 rounded-full uppercase tracking-wide">
                    {item.category}
                  </span>
                </div>
              )}
              <div>
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 leading-tight mb-1 group-hover:text-blue-600 transition-colors">
                  {item.name}
                </h3>
                {item.brand && (
                  <p className="text-sm text-gray-600">by {item.brand}</p>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-xl lg:text-2xl font-bold text-gray-900">
                  ${item.price.toFixed(2)}
                </span>
                {item.originalPrice && item.originalPrice > item.price && (
                  <span className="text-lg text-gray-500 line-through">
                    ${item.originalPrice.toFixed(2)}
                  </span>
                )}
                {item.inStock !== false && (
                  <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
                    In Stock
                  </span>
                )}
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex flex-col items-center gap-3">
              <span className="text-sm text-gray-600 font-medium">Quantity</span>
              <div className="flex items-center bg-white border-2 border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 hover:bg-gray-100 rounded-l-2xl transition-colors"
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  disabled={isUpdating || item.quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="px-4 py-2 min-w-[3rem] text-center border-x border-gray-200">
                  <span className={`text-lg font-bold transition-all duration-200 ${
                    isUpdating ? 'scale-110 text-blue-600' : 'scale-100 text-gray-900'
                  }`}>
                    {item.quantity}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 hover:bg-gray-100 rounded-r-2xl transition-colors"
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  disabled={isUpdating || item.inStock === false}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 rounded-full hover:scale-110"
                onClick={handleRemove}
                disabled={isRemoving}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Item Total */}
            <div className="text-right space-y-1 min-w-[120px]">
              <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(totalPrice)}
              </div>
              {savings > 0 && (
                <div className="text-sm text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full">
                    Save {formatCurrency(savings)}
                </div>
              )}
              <div className="text-xs text-gray-500">
                  {formatCurrency(item.price)} each
              </div>
            </div>
          </div>

          {/* Loading overlay */}
          {isUpdating && (
            <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-2xl">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm font-medium text-gray-700">Updating...</span>
              </div>
            </div>
          )}

          {/* Stock warning */}
          {item.inStock === false && (
            <div className="absolute top-2 left-2 right-2 bg-yellow-50 border border-yellow-200 rounded-lg p-2 sm:p-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-medium text-yellow-800">
                  This item is currently out of stock
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}