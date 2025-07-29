"use client"

import { useState } from "react"
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus, Heart, ShoppingCart, Lock, Truck, Shield } from "lucide-react"
import { CldImage } from "next-cloudinary"

// Mock cart context and components for demonstration
const useCart = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      brand: "Apple",
      price: 1950000,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
      specs: "256GB, Deep Purple"
    },
    {
      id: 2,
      name: "Galaxy S24 Ultra",
      brand: "Samsung",
      price: 2100000,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=300&fit=crop",
      specs: "512GB, Titanium Black"
    }
  ])

  const updateQuantity = (id: number, quantity: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
    ).filter(item => item.quantity > 0))
  }

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  return { items, updateQuantity, removeItem }
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: any) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-all duration-200">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        {/* Product Image */}
        <div className="flex-shrink-0 w-full sm:w-24 md:w-32">
          <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
            <CldImage
              width={96}
              height={96}
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            {/* Product Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg leading-tight">{item.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{item.brand}</p>
                  <p className="text-gray-500 text-sm mt-1">{item.specs}</p>
                </div>
                <button 
                  onClick={() => onRemove(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 ml-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Price */}
              <div className="sm:hidden mb-4">
                <p className="text-2xl font-bold text-gray-900">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  ₦{item.price.toLocaleString()} each
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-gray-100 rounded-l-xl transition-colors duration-200"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="px-4 py-2 font-medium text-gray-900 min-w-[3rem] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-gray-100 rounded-r-xl transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors duration-200">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm font-medium hidden sm:inline">Save for later</span>
                </button>
              </div>
            </div>

            {/* Desktop Price */}
            <div className="hidden sm:block text-right">
              <p className="text-2xl font-bold text-gray-900 mb-1">
                ₦{(item.price * item.quantity).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                ₦{item.price.toLocaleString()} each
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const CartSummary = ({ items }: any) => {
  const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 150000 ? 0 : 15000
  const tax = subtotal * 0.075
  const total = subtotal + shipping + tax

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <ShoppingCart className="w-5 h-5" />
        Order Summary
      </h3>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({items.reduce((sum: number, item: any) => sum + item.quantity, 0)} items)</span>
          <span>₦{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : `₦${shipping.toLocaleString()}`}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>VAT (7.5%)</span>
          <span>₦{tax.toLocaleString()}</span>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>Total</span>
            <span>₦{total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="space-y-3 mb-6 p-4 bg-green-50 rounded-xl border border-green-100">
        <div className="flex items-center gap-3 text-sm text-green-700">
          <Truck className="w-4 h-4 flex-shrink-0" />
          <span>Free shipping on orders over $100</span>
        </div>
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
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mb-3"
        onClick={() => window.location.href = '/checkout'}
      >
        Proceed to Checkout
      </button>
      
      <button className="w-full border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-xl transition-all duration-200 hover:bg-gray-50">
        Continue Shopping
      </button>
    </div>
  )
}

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCart()

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
              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Start Shopping
              </button>
              
              <div className="flex items-center gap-2 my-4">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span>or</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>
              
              <button className="w-full border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-xl transition-all duration-200 hover:bg-gray-50">
                View Deals & Offers
              </button>
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
                <CartItem 
                  key={item.id} 
                  item={item} 
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>
            
            {/* Additional Actions */}
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
                <div className="flex items-center gap-4">
                  <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
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
            <CartSummary items={items} />
          </div>
        </div>
      </div>
    </div>
  )
}