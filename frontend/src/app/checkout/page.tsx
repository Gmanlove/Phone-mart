"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import { useOrders } from "@/contexts/order-context"
import { useAuth } from "@/contexts/auth-context"
import { MapPin, CreditCard, Package, Shield, CheckCircle, User, Lock, LogIn, AlertTriangle } from "lucide-react"
import Link from "next/link"

// Replace with your actual Paystack public key
const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_KEY || "pk_test_your_actual_paystack_public_key_here"

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: Record<string, unknown>) => { openIframe: () => void };
    };
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
  const { isAuthenticated, isLoading, user } = useAuth()
  
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
    state: "Akwa Ibom",
    zipCode: "",
    deliveryNote: ""
  })

  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("paystack")
  const [paymentError, setPaymentError] = useState("")

  // Update email when user is available
  useEffect(() => {
    if (user?.email && billingInfo.email !== user.email) {
      setBillingInfo(prev => ({ ...prev, email: user.email }))
    }
  }, [user?.email, billingInfo.email])

  // Load Paystack script
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.PaystackPop) {
      const script = document.createElement('script')
      script.src = 'https://js.paystack.co/v1/inline.js'
      script.async = true
      script.onload = () => {
        console.log('Paystack script loaded successfully')
      }
      script.onerror = () => {
        console.error('Failed to load Paystack script')
        setPaymentError('Failed to load payment system. Please refresh and try again.')
      }
      document.body.appendChild(script)
    }
  }, [])

  // Helper function to prepare customer info
  const prepareCustomerInfo = () => {
    const fullAddress = [
      deliveryInfo.address,
      deliveryInfo.city,
      deliveryInfo.state,
      deliveryInfo.zipCode
    ].filter(Boolean).join(', ')

    return {
      name: `${billingInfo.firstName} ${billingInfo.lastName}`.trim() || 'Guest Customer',
      email: billingInfo.email || 'guest@example.com',
      phone: billingInfo.phone || 'N/A',
      address: fullAddress || 'N/A',
      notes: deliveryInfo.deliveryNote || ''
    }
  }

  // Redirect if not authenticated
  if (!isLoading && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-8 px-4">
        <div className="max-w-md w-full">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <LogIn className="h-10 w-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Login Required</h2>
              <p className="text-gray-600 mb-8">
                Please log in to your account to proceed with checkout.
              </p>
              <div className="space-y-4">
                <Link href="/login">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    Go to Login
                  </Button>
                </Link>
                <Link href="/">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-8 px-4">
        <div className="max-w-md w-full">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="h-10 w-10 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
              <p className="text-gray-600 mb-8">
                Add some products to your cart before proceeding to checkout.
              </p>
              <Link href="/products">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value })
  }

  const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setDeliveryInfo({ ...deliveryInfo, [e.target.name]: e.target.value })
  }

  const handlePaystackPayment = () => {
    if (!window.PaystackPop) {
      setPaymentError("Payment system is not loaded. Please refresh the page and try again.")
      return
    }

    if (PAYSTACK_PUBLIC_KEY.includes("your_actual_paystack_public_key_here")) {
      setPaymentError("Payment system is not configured properly. Please contact support.")
      return
    }

    setIsProcessing(true)
    setPaymentError("")

    try {
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: billingInfo.email,
        amount: total * 100, // Paystack expects amount in kobo
        currency: 'NGN',
        ref: `ORDER_${Date.now()}`,
        metadata: {
          customer_name: `${billingInfo.firstName} ${billingInfo.lastName}`,
          phone: billingInfo.phone,
        },
        callback: function(response: { reference: string; status: string; [key: string]: unknown }) {
          console.log("Payment successful:", response)
          
          // Handle successful payment - use regular function, not async
          const customerInfo = prepareCustomerInfo()
          
          console.log('Placing order after payment with customer info:', customerInfo)
          
          // Place order in backend
          placeOrder(items, total, customerInfo)
            .then(() => {
              clearCart()
              setCurrentStep(4)
              setIsProcessing(false)
            })
            .catch((error) => {
              console.error('Error processing order after payment:', error)
              setPaymentError("Payment successful but failed to save order. Please contact support.")
              setIsProcessing(false)
            })
        },
        onClose: function() {
          setIsProcessing(false)
          setPaymentError("Payment was cancelled. Please try again.")
        },
      })

      handler.openIframe()
    } catch (error) {
      console.error("Paystack error:", error)
      setIsProcessing(false)
      setPaymentError("Payment system error. Please try again or contact support.")
    }
  }

  const handlePayment = () => {
    handlePaystackPayment()
  }

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return billingInfo.firstName && billingInfo.lastName && billingInfo.email && billingInfo.phone
      case 2:
        return deliveryInfo.address && deliveryInfo.city && deliveryInfo.state
      case 3:
        return paymentMethod
      default:
        return false
    }
  }

  const nextStep = () => {
    if (currentStep < 4 && validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
      setPaymentError("") // Clear any previous payment errors
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setPaymentError("") // Clear any previous payment errors
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:py-16">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Complete Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Order</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Just a few more steps to get your products delivered to your doorstep
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 sm:p-8">
                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-8">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                        currentStep >= step 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {currentStep > step ? <CheckCircle className="h-5 w-5" /> : step}
                      </div>
                      {step < 4 && (
                        <div className={`w-12 sm:w-20 h-1 ml-2 ${
                          currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Step 1: Billing Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <User className="h-6 w-6 text-blue-600" />
                      <h2 className="text-2xl font-bold text-gray-900">Billing Information</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={billingInfo.firstName}
                          onChange={handleBillingChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          required
                        />
                      </div>
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Delivery Information */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <MapPin className="h-6 w-6 text-blue-600" />
                      <h2 className="text-2xl font-bold text-gray-900">Delivery Information</h2>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={deliveryInfo.address}
                        onChange={handleDeliveryChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={deliveryInfo.city}
                          onChange={handleDeliveryChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          required
                        >
                          <option value="Akwa Ibom">Akwa Ibom</option>
                          <option value="Abuja">Abuja</option>
                          <option value="Kano">Kano</option>
                          <option value="Ibadan">Ibadan</option>
                          <option value="Port Harcourt">Port Harcourt</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={deliveryInfo.zipCode}
                        onChange={handleDeliveryChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Delivery Notes (Optional)
                      </label>
                      <textarea
                        name="deliveryNote"
                        value={deliveryInfo.deliveryNote}
                        onChange={handleDeliveryChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Any special instructions for delivery..."
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Payment Method */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <CreditCard className="h-6 w-6 text-blue-600" />
                      <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
                    </div>
                    
                    {/* Payment Error Display */}
                    {paymentError && (
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                        <div className="flex items-center gap-2 text-yellow-800">
                          <AlertTriangle className="h-5 w-5" />
                          <span className="font-medium">Payment Notice</span>
                        </div>
                        <p className="text-yellow-700 text-sm mt-1">{paymentError}</p>
                      </div>
                    )}
                    
                    <div className="space-y-4">
                      {/* Only Paystack Payment Option */}
                      <div 
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 border-blue-500 bg-blue-50`}
                        onClick={() => setPaymentMethod('paystack')}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <CreditCard className="h-6 w-6 text-blue-600" />
                            <div>
                              <h3 className="font-semibold text-gray-900">PAY WITH PAYSTACK</h3>
                              <p className="text-sm text-gray-600">Secure payment with Paystack</p>
                            </div>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 border-blue-500 bg-blue-500`}>
                            <div className="w-full h-full bg-white rounded-full scale-50"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Order Complete */}
                {currentStep === 4 && (
                  <div className="text-center space-y-6">
                    <div className="flex items-center justify-center mb-6">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-12 w-12 text-green-600" />
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h2>
                      <p className="text-lg text-gray-600 mb-8">
                        Thank you for your purchase. Your order has been confirmed and will be processed shortly.
                      </p>
                      
                      <div className="bg-gray-50 rounded-xl p-6 mb-8">
                        <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
                        <ul className="text-sm text-gray-600 space-y-2">
                          <li>• You&apos;ll receive an order confirmation email shortly</li>
                          <li>• We&apos;ll process and pack your order within 1-2 business days</li>
                          <li>• You&apos;ll get a tracking number once your order ships</li>
                          <li>• Delivery typically takes 3-7 business days</li>
                        </ul>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/orders">
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                            View My Orders
                          </Button>
                        </Link>
                        <Link href="/products">
                          <Button variant="outline" className="px-8 py-3">
                            Continue Shopping
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                {currentStep < 4 && (
                  <div className="flex justify-between pt-8 border-t border-gray-200 mt-8">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="px-8 py-3"
                    >
                      Previous
                    </Button>
                    
                    {currentStep === 3 ? (
                      <Button
                        onClick={handlePayment}
                        disabled={!validateStep(currentStep) || isProcessing}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                      >
                        {isProcessing ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <Lock className="h-4 w-4 mr-2" />
                            Pay ₦{total.toLocaleString()}
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button
                        onClick={nextStep}
                        disabled={!validateStep(currentStep)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                      >
                        Next Step
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm sticky top-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        <p className="text-sm font-semibold text-gray-900">₦{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 pt-6 border-t border-gray-200">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>₦{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Delivery</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>₦{total.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-center gap-2 text-sm text-blue-700">
                    <Shield className="h-4 w-4" />
                    <span className="font-medium">Secure SSL Encrypted Payment</span>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">
                    Your payment information is protected
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
