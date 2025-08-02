"use client"

import { useState } from "react"
import { ShoppingCart, Heart, Share2, Minus, Plus } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

interface ProductActionsProps {
  product: {
    _id: string
    id?: string
    name: string
    price: number
    image?: string
    images?: string[]
  }
}

export default function ProductActionsSimple({ product }: ProductActionsProps) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    const primaryImage = product.images && product.images.length > 0 
      ? product.images[0] 
      : product.image || ""

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product._id || product.id || "",
        name: product.name,
        price: product.price,
        image: primaryImage
      })
    }

    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} added to your cart.`,
    })
  }

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700">Quantity:</span>
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            className="h-10 w-10 hover:bg-gray-100 flex items-center justify-center"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="px-4 py-2 min-w-[3rem] text-center font-medium">
            {quantity}
          </span>
          <button
            className="h-10 w-10 hover:bg-gray-100 flex items-center justify-center"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button 
        onClick={handleAddToCart}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <ShoppingCart className="h-5 w-5" />
        Add to Cart
      </button>
    </div>
  )
}