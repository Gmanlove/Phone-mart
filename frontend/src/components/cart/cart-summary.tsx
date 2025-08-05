"use client"

import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShoppingBag, Tag, Lock, Shield, CreditCard, Truck, Gift, Percent, CheckCircle2, AlertCircle, Sparkles } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function CartSummary() {
  const { items, total } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)
  const [promoError, setPromoError] = useState<string | null>(null)
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)
  const [showSavings, setShowSavings] = useState(false)

  const subtotal = total
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  
  // Shipping calculation
  const freeShippingThreshold = 100
  const shippingCost = 9.99
  const shipping = subtotal >= freeShippingThreshold ? 0 : shippingCost
  const shippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100)
  const remainingForFreeShipping = Math.max(freeShippingThreshold - subtotal, 0)
  
  // Promo discount
  const promoDiscount = appliedPromo === "SAVE10" ? subtotal * 0.1 : 0
  
  // Tax calculation
  const taxRate = 0.08
  const taxableAmount = subtotal - promoDiscount
  const tax = taxableAmount * taxRate
  
  // Final total
  const finalTotal = subtotal + shipping + tax - promoDiscount
  const totalSavings = promoDiscount + (subtotal >= freeShippingThreshold ? shippingCost : 0)

  useEffect(() => {
    if (totalSavings > 0) {
      setShowSavings(true)
    }
  }, [totalSavings])

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return
    
    setIsApplyingPromo(true)
    setPromoError(null)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (promoCode.toUpperCase() === "SAVE10") {
      setAppliedPromo("SAVE10")
      setPromoError(null)
    } else {
      setPromoError("Invalid promo code. Try 'SAVE10' for 10% off!")
    }
    
    setIsApplyingPromo(false)
  }

  const removePromo = () => {
    setAppliedPromo(null)
    setPromoCode("")
    setPromoError(null)
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Mobile: Order Summary Card */}
      <Card className="lg:sticky lg:top-6 shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/50 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-bl-full"></div>
        
        <CardHeader className="relative pb-4 lg:pb-6">
          <CardTitle className="flex items-center justify-between text-lg lg:text-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Order Summary
              </span>
            </div>
            <div className="text-sm lg:text-base font-normal text-gray-500">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 relative">
          {/* Free Shipping Progress */}
          {subtotal < freeShippingThreshold && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 rounded-2xl p-4 lg:p-6">
              <div className="flex items-center gap-2 mb-3">
                <Truck className="h-4 w-4 lg:h-5 lg:w-5 text-green-600" />
                <span className="text-sm lg:text-base font-semibold text-green-800">
                  ${remainingForFreeShipping.toFixed(2)} away from FREE shipping!
                </span>
              </div>
              <div className="w-full bg-green-100 rounded-full h-2 lg:h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden"
                  style={{ width: `${shippingProgress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>
              </div>
              <p className="text-xs lg:text-sm text-green-700 mt-2">
                Add ${remainingForFreeShipping.toFixed(2)} more to qualify for free shipping
              </p>
            </div>
          )}

          {/* Promo Code Section */}
          <div className="space-y-3">
            <Label htmlFor="promo" className="text-sm lg:text-base font-semibold text-gray-700 flex items-center gap-2">
              <Gift className="h-4 w-4" />
              Have a promo code?
            </Label>
            
            {!appliedPromo ? (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Input
                      id="promo"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promo code"
                      className="h-11 lg:h-12 pr-10 border-2 focus:border-blue-500 transition-colors"
                      disabled={isApplyingPromo}
                    />
                    <Tag className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  <Button 
                    onClick={handleApplyPromo}
                    disabled={!promoCode.trim() || isApplyingPromo}
                    className="h-11 lg:h-12 px-4 lg:px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isApplyingPromo ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "Apply"
                    )}
                  </Button>
                </div>
                
                {promoError && (
                  <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{promoError}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-1 bg-green-100 rounded-full">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-800">Code Applied: {appliedPromo}</p>
                    <p className="text-sm text-green-600">Save ${promoDiscount.toFixed(2)}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removePromo}
                  className="text-green-600 hover:text-green-700 hover:bg-green-100"
                >
                  Remove
                </Button>
              </div>
            )}
          </div>

          <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          {/* Order Details */}
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 text-sm lg:text-base">Subtotal</span>
              <span className="font-semibold text-base lg:text-lg">${subtotal.toFixed(2)}</span>
            </div>

            {appliedPromo && (
              <div className="flex justify-between items-center py-2 text-green-600">
                <span className="text-sm lg:text-base flex items-center gap-2">
                  <Percent className="h-4 w-4" />
                  Discount ({appliedPromo})
                </span>
                <span className="font-semibold text-base lg:text-lg">-${promoDiscount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 text-sm lg:text-base flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Shipping
              </span>
              <span className="font-semibold text-base lg:text-lg">
                {shipping === 0 ? (
                  <span className="text-green-600 flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    FREE
                  </span>
                ) : (
                  `$${shipping.toFixed(2)}`
                )}
              </span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 text-sm lg:text-base">Tax (8%)</span>
              <span className="font-semibold text-base lg:text-lg">${tax.toFixed(2)}</span>
            </div>
          </div>

          {/* Total Savings */}
          {totalSavings > 0 && showSavings && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 animate-fade-in">
              <div className="flex items-center gap-2 text-yellow-800">
                <Sparkles className="h-5 w-5" />
                <span className="font-semibold">You&apos;re saving ${totalSavings.toFixed(2)}!</span>
              </div>
            </div>
          )}

          <Separator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent h-px" />

          {/* Final Total */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 lg:p-6 border border-blue-200/50">
            <div className="flex justify-between items-center">
              <span className="text-lg lg:text-xl font-bold text-gray-900">Total</span>
              <div className="text-right">
                <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ${finalTotal.toFixed(2)}
                </div>
                {totalSavings > 0 && (
                  <div className="text-sm text-green-600 font-medium">
                    Total savings: ${totalSavings.toFixed(2)}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <Button 
              asChild 
              className="w-full h-12 lg:h-14 text-base lg:text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              <Link href="/checkout" className="flex items-center justify-center gap-2">
                <Lock className="h-5 w-5" />
                Secure Checkout
              </Link>
            </Button>

            <Button 
              asChild 
              variant="outline" 
              className="w-full h-11 lg:h-12 text-base border-2 hover:bg-gray-50 transition-colors"
            >
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>

          {/* Security Badges */}
          <div className="text-center pt-6 border-t border-gray-100">
            <p className="text-xs lg:text-sm text-gray-500 mb-4 font-medium">
              🔒 Your information is protected with 256-bit SSL encryption
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Shield, label: "SSL Secured", color: "text-green-600" },
                { icon: CreditCard, label: "Paystack", color: "text-blue-600" },
                { icon: CheckCircle2, label: "Verified", color: "text-purple-600" }
              ].map((badge, index) => (
                <div key={index} className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                  <badge.icon className={`h-5 w-5 lg:h-6 lg:w-6 ${badge.color}`} />
                  <span className="text-xs font-medium text-gray-600">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}