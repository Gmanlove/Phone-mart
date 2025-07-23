"use client"

import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShoppingBag, Tag } from "lucide-react"
import Link from "next/link"

export default function CartSummary() {
  const { items, total } = useCart()

  const subtotal = total
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = subtotal * 0.08 // 8% tax
  const finalTotal = subtotal + shipping + tax

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Promo Code */}
        <div className="space-y-2">
          <Label htmlFor="promo">Promo Code</Label>
          <div className="flex space-x-2">
            <Input id="promo" placeholder="Enter code" />
            <Button variant="outline" size="icon">
              <Tag className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Separator />

        {/* Order Details */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal ({itemCount} items)</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">
              {shipping === 0 ? <span className="text-green-600">Free</span> : `$${shipping.toFixed(2)}`}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>

          {shipping === 0 && (
            <div className="text-sm text-green-600 bg-green-50 p-2 rounded">🎉 You qualify for free shipping!</div>
          )}
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>

        <Button asChild className="w-full" size="lg">
          <Link href="/checkout">Proceed to Checkout</Link>
        </Button>

        <Button asChild variant="outline" className="w-full bg-transparent">
          <Link href="/products">Continue Shopping</Link>
        </Button>

        {/* Security badges */}
        <div className="text-center pt-4">
          <p className="text-xs text-gray-500 mb-2">Secure checkout powered by</p>
          <div className="flex justify-center space-x-2 text-xs text-gray-400">
            <span>🔒 SSL</span>
            <span>💳 Paystack</span>
            <span>🛡️ Verified</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
