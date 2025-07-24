"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Star, Heart, ShoppingCart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

interface Product {
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
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { toast } = useToast()

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

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.isNew && <Badge className="bg-green-500 hover:bg-green-600">New</Badge>}
        {discountPercentage > 0 && <Badge className="bg-red-500 hover:bg-red-600">-{discountPercentage}%</Badge>}
        {!product.inStock && <Badge variant="secondary">Out of Stock</Badge>}
      </div>

      {/* Wishlist button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          toast({
            title: "Added to wishlist",
            description: `${product.name} has been added to your wishlist.`,
          })
        }}
      >
        <Heart className="h-4 w-4" />
      </Button>

      <Link href={`/products/${product.id}`}>
        <CardContent className="p-0">
          {/* Product Image */}
          <div className="relative overflow-hidden bg-gray-50">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Quick actions overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button size="default" variant="outline" className="bg-white">
                <Eye className="h-4 w-4 mr-1" />
                Quick View
              </Button>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <div className="mb-2">
              <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
              <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
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
              <ul className="text-xs text-gray-600 space-y-1">
                {product.features.slice(0, 2).map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                )}
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button className="w-full" onClick={handleAddToCart} disabled={!product.inStock}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
