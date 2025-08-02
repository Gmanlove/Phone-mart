"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import { useOrders } from "@/contexts/order-context"
import { MapPin, CreditCard, Package, Shield, CheckCircle, User, Phone, Mail, Home, Truck } from "lucide-react"

// Paystack public key - Replace with your actual key
const PAYSTACK_PUBLIC_KEY = "pk_test_your_actual_paystack_public_key_here"

declare global {
  interface Window {
    PaystackPop?: any;
  }
}

interface BillingInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
}

interface DeliveryInfo {
  address: string
  city: string
  state: string
  zipCode: string
  deliveryNote: string
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const { placeOrder } = useOrders()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [billingInfo, setBillingInfo] = useState<BillingInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  })
  
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    address: "",
    city: "",
    state: "Lagos",
    zipCode: "",
    deliveryNote: ""
  })
  
  const [paying, setPaying] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 100000 ? 0 : 5000 // Free shipping over ₦100,000
  const tax = subtotal * 0.075 // 7.5% VAT
  const finalTotal = subtotal + shipping + tax

  const nigerianStates = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", 
    "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", 
    "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", 
    "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
  ]

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && !success) {
      window.location.href = '/cart'
    }
  }, [items.length, success])

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value })
  }

  const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setDeliveryInfo({ ...deliveryInfo, [e.target.name]: e.target.value })
  }

  const validateBillingInfo = () => {
    return billingInfo.firstName && billingInfo.lastName && billingInfo.email && billingInfo.phone
  }

  const validateDeliveryInfo = () => {
    return deliveryInfo.address && deliveryInfo.city && deliveryInfo.state
  }

  const nextStep = () => {
    if (currentStep === 1 && validateBillingInfo()) {
      setCurrentStep(2)
    } else if (currentStep === 2 && validateDeliveryInfo()) {
      setCurrentStep(3)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Paystack payment handler
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()
    setPaying(true)
    setError("")
    
    // Final validation
    if (!validateBillingInfo() || !validateDeliveryInfo()) {
      setError("Please complete all required fields")
      setPaying(false)
      return
    }

    // Check if Paystack is already loaded
    if (window.PaystackPop) {
      payWithPaystack()
      return
    }

    // Dynamically load Paystack script
    const script = document.createElement("script")
    script.src = "https://js.paystack.co/v1/inline.js"
    script.async = true
    
    script.onload = () => {
      if (window.PaystackPop) {
        payWithPaystack()
      } else {
        setError("Failed to load payment processor. Please try again.")
        setPaying(false)
      }
    }
    
    script.onerror = () => {
      setError("Failed to load payment processor. Please check your connection.")
      setPaying(false)
    }
    
    document.body.appendChild(script)
  }

  // Paystack payment logic
  const payWithPaystack = () => {
    if (!window.PaystackPop) {
      setError("Paystack library not loaded.")
      setPaying(false)
      return
    }

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: billingInfo.email,
      amount: Math.round(finalTotal * 100), // Paystack expects amount in kobo
      currency: "NGN",
      ref: "PHMART-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9),
      metadata: {
        custom_fields: [
          {
            display_name: "Customer Name",
            variable_name: "customer_name",
            value: `${billingInfo.firstName} ${billingInfo.lastName}`
          },
          {
            display_name: "Phone Number",
            variable_name: "phone_number",
            value: billingInfo.phone
          },
          {
            display_name: "Delivery Address",
            variable_name: "delivery_address",
            value: `${deliveryInfo.address}, ${deliveryInfo.city}, ${deliveryInfo.state}`
          }
        ]
      },
      callback: function(response: any) {
        // Payment successful
        const orderData = {
          ...response,
          billingInfo,
          deliveryInfo,
          items,
          subtotal,
          shipping,
          tax,
          total: finalTotal
        }
        
        placeOrder(items, finalTotal)
        clearCart()
        setSuccess(true)
        setPaying(false)
        
        // You can send order data to your backend here
        console.log("Order completed:", orderData)
      },
      onClose: function() {
        setPaying(false)
      }
    })
    
    handler.openIframe()
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-2xl border-0">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
              <p className="text-gray-600 mb-6">
                Thank you for your order. We'll send you a confirmation email shortly.
              </p>
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-600">Order Total: <span className="font-bold text-gray-900">₦{finalTotal.toLocaleString()}</span></p>
              </div>
              <Button 
                onClick={() => window.location.href = '/orders'}
                className="bg-blue-600 hover:bg-blue-700"
              >
                View My Orders
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4 sm:py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your order in just a few steps</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep >= step 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-12 h-1 mx-2 ${
                    currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0">
              <CardContent className="p-6 sm:p-8">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-700 text-sm font-medium">{error}</p>
                  </div>
                )}

                {/* Step 1: Billing Information */}
                {currentStep === 1 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <User className="h-6 w-6 text-blue-600" />
                      <h2 className="text-2xl font-bold text-gray-900">Billing Information</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={billingInfo.firstName}
                          onChange={handleBillingChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Enter your first name"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={billingInfo.lastName}
                          onChange={handleBillingChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Enter your last name"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={billingInfo.email}
                          onChange={handleBillingChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={billingInfo.phone}
                          onChange={handleBillingChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="+234 800 000 0000"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-8">
                      <Button
                        onClick={nextStep}
                        disabled={!validateBillingInfo()}
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700"
                      >
                        Continue to Delivery
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Delivery Information */}
                {currentStep === 2 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <MapPin className="h-6 w-6 text-blue-600" />
                      <h2 className="text-2xl font-bold text-gray-900">Delivery Information</h2>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Street Address *
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={deliveryInfo.address}
                          onChange={handleDeliveryChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Enter your full address"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            City *
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={deliveryInfo.city}
                            onChange={handleDeliveryChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="City"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            State *
                          </label>
                          <select
                            name="state"
                            value={deliveryInfo.state}
                            onChange={handleDeliveryChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                          >
                            {nigerianStates.map(state => (
                              <option key={state} value={state}>{state}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            ZIP Code
                          </label>
                          <input
                            type="text"
                            name="zipCode"
                            value={deliveryInfo.zipCode}
                            onChange={handleDeliveryChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="ZIP"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Delivery Note (Optional)
                        </label>
                        <textarea
                          name="deliveryNote"
                          value={deliveryInfo.deliveryNote}
                          onChange={handleDeliveryChange}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                          placeholder="Special delivery instructions..."
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-8">
                      <Button
                        onClick={prevStep}
                        variant="outline"
                        className="px-8 py-3"
                      >
                        Back to Billing
                      </Button>
                      <Button
                        onClick={nextStep}
                        disabled={!validateDeliveryInfo()}
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700"
                      >
                        Review Order
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Review & Payment */}
                {currentStep === 3 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <CreditCard className="h-6 w-6 text-blue-600" />
                      <h2 className="text-2xl font-bold text-gray-900">Review & Payment</h2>
                    </div>
                    
                    {/* Review Information */}
                    <div className="space-y-6 mb-8">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">Billing Information</h3>
                        <p className="text-sm text-gray-600">
                          {billingInfo.firstName} {billingInfo.lastName}<br/>
                          {billingInfo.email}<br/>
                          {billingInfo.phone}
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">Delivery Address</h3>
                        <p className="text-sm text-gray-600">
                          {deliveryInfo.address}<br/>
                          {deliveryInfo.city}, {deliveryInfo.state} {deliveryInfo.zipCode}
                          {deliveryInfo.deliveryNote && (
                            <>
                              <br/>
                              <span className="italic">Note: {deliveryInfo.deliveryNote}</span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button
                        onClick={prevStep}
                        variant="outline"
                        className="px-8 py-3"
                      >
                        Back to Delivery
                      </Button>
                      <Button
                        onClick={handlePayment}
                        disabled={paying}
                        className="px-8 py-3 bg-green-600 hover:bg-green-700"
                      >
                        {paying ? "Processing..." : `Pay ₦${finalTotal.toLocaleString()}`}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 sticky top-6">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Package className="h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">Order Summary</h3>
                </div>
                
                {/* Items */}
                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                          {item.quantity}x
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          ₦{item.price.toLocaleString()} each
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
                
                {/* Totals */}
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">
                      {shipping === 0 ? 'Free' : `₦${shipping.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">VAT (7.5%)</span>
                    <span className="text-gray-900">₦{tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">₦{finalTotal.toLocaleString()}</span>
                  </div>
                </div>
                
                {/* Security Info */}
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-green-700">
                    <Shield className="h-4 w-4" />
                    <span className="font-medium">Secure Payment</span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">
                    Your payment information is encrypted and secure
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
