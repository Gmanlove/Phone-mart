"use client"

import { useState } from "react"
import { ShoppingCart, Heart, Share2, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
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

export default function ProductActions({ product }: ProductActionsProps) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

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

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`,
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} on PhoneMart`,
          url: window.location.href,
        })
      } catch (error) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href)
        toast({
          title: "Link copied",
          description: "Product link copied to clipboard!",
        })
      }
    } else {
      // Fallback for browsers that don't support native sharing
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied",
        description: "Product link copied to clipboard!",
      })
    }
  }

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700">Quantity:</span>
        <div className="flex items-center border border-gray-300 rounded-lg">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 hover:bg-gray-100"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="px-4 py-2 min-w-[3rem] text-center font-medium">
            {quantity}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 hover:bg-gray-100"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <Button size="lg" className="w-full text-lg py-4" onClick={handleAddToCart}>
        <ShoppingCart className="h-5 w-5 mr-2" />
        Add to Cart
      </Button>
      
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          size="lg" 
          className="flex-1"
          onClick={handleWishlist}
        >
          <Heart className={`h-4 w-4 mr-2 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
          {isWishlisted ? 'Wishlisted' : 'Wishlist'}
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="flex-1"
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  )
}