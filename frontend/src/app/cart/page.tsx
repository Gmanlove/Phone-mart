"use client"

import { ShoppingBag, ArrowLeft, Minus, Plus, X, Shield, Lock, LogIn } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import CartItem from "@/components/cart/cart-item"
import { Button } from "@/components/ui/button"

// Quick Checkout Component
function QuickCheckout() {
  const { isAuthenticated } = useAuth()

  const handleCheckout = () => {
    if (isAuthenticated) {
      window.location.href = '/checkout'
    } else {
      window.location.href = '/login?returnTo=/checkout'
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 sticky top-4">
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3 text-sm text-green-700">
          <Shield className="w-4 h-4 flex-shrink-0" />
          <span>30-day return guarantee</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-green-700">
          <Lock className="w-4 h-4 flex-shrink-0" />
          <span>Secure checkout</span>
        </div>
      </div>

      <button
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mb-3 flex items-center justify-center gap-2"
        onClick={handleCheckout}
      >
        {!isAuthenticated && <LogIn className="h-4 w-4" />}
        {isAuthenticated ? 'Proceed to Checkout' : 'Sign In to Checkout'}
      </button>
      
      <button className="w-full border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-xl transition-all duration-200 hover:bg-gray-50">
        Continue Shopping
      </button>

      {!isAuthenticated && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700 text-center">
            <Link href="/register" className="font-medium underline hover:no-underline">
              Create an account
            </Link> to enjoy faster checkout
          </p>
        </div>
      )}
    </div>
  )
}

export default function CartPage() {
  const { items, clearCart } = useCart()
  const { isAuthenticated } = useAuth()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:py-16">
        <div className="container mx-auto max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-12 text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-12 w-12 text-gray-400" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Your cart is empty
              </h1>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Looks like you haven't added any items to your cart yet. Discover our amazing collection of phones and accessories!
              </p>
            </div>
            
            <div className="space-y-4">
              <Link href="/products">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Start Shopping
                </Button>
              </Link>
              
              <div className="flex items-center gap-2 my-4">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-sm text-gray-500 px-3">or</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>
              
              {!isAuthenticated && (
                <div className="space-y-3">
                  <Link href="/login">
                    <Button variant="outline" className="w-full border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-xl transition-all duration-200 hover:bg-gray-50">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="outline" className="w-full border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-xl transition-all duration-200 hover:bg-gray-50">
                      Create Account
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4 sm:py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Shopping Cart
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Review your items and proceed to checkout when you're ready
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                <ArrowLeft className="w-4 h-4" />
                <span className="font-medium">Continue Shopping</span>
              </button>
            </div>
          </div>
          
          {/* Progress Indicator */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">1</div>
              <span className="font-medium text-blue-600">Cart</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-300 text-white text-xs font-bold rounded-full flex items-center justify-center">2</div>
              <span>Checkout</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-300 text-white text-xs font-bold rounded-full flex items-center justify-center">3</div>
              <span>Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4 sm:space-y-6">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            
            {/* Additional Actions */}
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={clearCart}
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                  >
                    Clear Cart
                  </button>
                  <div className="w-px h-4 bg-gray-300"></div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                    Save Cart
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  Items in your cart are reserved for 60 minutes
                </div>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <QuickCheckout />
          </div>
        </div>
      </div>
    </div>
  )
}