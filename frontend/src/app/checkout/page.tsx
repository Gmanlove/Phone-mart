"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import { useOrders } from "@/contexts/order-context"
import { useAuth } from "@/contexts/auth-context"
import { MapPin, CreditCard, Package, Shield, CheckCircle, User, Phone, Mail, Home, Truck, Lock, LogIn, AlertTriangle } from "lucide-react"
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
    state: "Lagos",
    zipCode: "",
    deliveryNote: ""
  })

  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
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
      email: billingInfo.email || '',
      phone: billingInfo.phone || '',
      address: fullAddress || 'No address provided'
    }
  }

  // Now handle conditional rendering after all hooks are called
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:py-16">
        <div className="container mx-auto max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-12 text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="h-12 w-12 text-red-500" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Sign In Required
              </h1>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                You need to be signed in to access the checkout. Please sign in to your account or create a new one to continue.
              </p>
            </div>
            
            <div className="space-y-4">
              <Link href="/login">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              </Link>
              
              <div className="flex items-center gap-2 my-4">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-sm text-gray-500 px-3">or</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>
              
              <Link href="/register">
                <Button variant="outline" className="w-full border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-xl transition-all duration-200 hover:bg-gray-50">
                  Create Account
                </Button>
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Your data is secure and encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:py-16">
        <div className="container mx-auto max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-12 text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="h-12 w-12 text-gray-400" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Your cart is empty
              </h1>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Add some items to your cart before proceeding to checkout.
              </p>
            </div>
            
            <div className="space-y-4">
              <Link href="/products">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
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

  const handleMockPayment = async () => {
    setIsProcessing(true)
    setPaymentError("")
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Prepare customer info with all required fields
      const customerInfo = prepareCustomerInfo()
      
      console.log('Placing order with customer info:', customerInfo)
      console.log('Order items:', items)
      console.log('Order total:', total)
      
      // Place order in backend
      await placeOrder(items, total, customerInfo)
      clearCart()
      setCurrentStep(4)
    } catch (error) {
      console.error('Error processing order:', error)
      setPaymentError("Failed to process order. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handlePaystackPayment = () => {
    if (!window.PaystackPop) {
      setPaymentError("Payment system is not loaded. Please refresh the page and try again.")
      return
    }

    if (PAYSTACK_PUBLIC_KEY.includes("your_actual_paystack_public_key_here")) {
      setPaymentError("Payment system is not configured. Using mock payment instead.")
      handleMockPayment()
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
      setPaymentError("Payment system error. Using mock payment instead.")
      handleMockPayment()
    }
  }

  const handlePayment = () => {
    if (paymentMethod === "mock" || PAYSTACK_PUBLIC_KEY.includes("your_actual_paystack_public_key_here")) {
      handleMockPayment()
    } else {
      handlePaystackPayment()
    }
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
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-2xl shadow-lg">
              <Shield className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600 text-lg">Complete your order securely</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 lg:mb-12">
          <div className="flex items-center justify-center space-x-4 sm:space-x-8">
            {[
              { step: 1, icon: User, label: "Billing" },
              { step: 2, icon: MapPin, label: "Delivery" },
              { step: 3, icon: CreditCard, label: "Payment" },
              { step: 4, icon: CheckCircle, label: "Complete" }
            ].map(({ step, icon: Icon, label }) => (
              <div key={step} className="flex flex-col items-center">
                <div className={`
                  rounded-full p-3 sm:p-4 border-2 transition-all duration-200
                  ${currentStep >= step 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-400'
                  }
                `}>
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <span className={`
                  mt-2 text-xs sm:text-sm font-medium
                  ${currentStep >= step ? 'text-blue-600' : 'text-gray-400'}
                `}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 rounded-2xl overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                
                {/* Step 1: Billing Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter your last name"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={billingInfo.email}
                          onChange={handleBillingChange}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter your email address"
                          required
                        />
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          value={billingInfo.phone}
                          onChange={handleBillingChange}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter your phone number"
                          required
                        />
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
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
                        Address *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="address"
                          value={deliveryInfo.address}
                          onChange={handleDeliveryChange}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter your full address"
                          required
                        />
                        <Home className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          placeholder="Enter your city"
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
                          <option value="Lagos">Lagos</option>
                          <option value="Abuja">Abuja</option>
                          <option value="Kano">Kano</option>
                          <option value="Ibadan">Ibadan</option>
                          <option value="Port Harcourt">Port Harcourt</option>
                          <option value="Akwa Ibom">Akwa Ibom</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter ZIP code (optional)"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Delivery Note
                      </label>
                      <textarea
                        name="deliveryNote"
                        value={deliveryInfo.deliveryNote}
                        onChange={handleDeliveryChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                        placeholder="Special delivery instructions (optional)"
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
                      {/* Mock Payment Option (for development) */}
                      <div 
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                          paymentMethod === 'mock' 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onClick={() => setPaymentMethod('mock')}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <CreditCard className="h-6 w-6 text-green-600" />
                            <div>
                              <h3 className="font-semibold text-gray-900">Demo Payment</h3>
                              <p className="text-sm text-gray-600">For testing purposes (Development)</p>
                            </div>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 ${
                            paymentMethod === 'mock' 
                              ? 'border-green-500 bg-green-500' 
                              : 'border-gray-300'
                          }`}>
                            {paymentMethod === 'mock' && (
                              <div className="w-full h-full bg-white rounded-full scale-50"></div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div 
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                          paymentMethod === 'card' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onClick={() => setPaymentMethod('card')}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <CreditCard className="h-6 w-6 text-blue-600" />
                            <div>
                              <h3 className="font-semibold text-gray-900">Credit/Debit Card</h3>
                              <p className="text-sm text-gray-600">Pay securely with Paystack</p>
                            </div>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 ${
                            paymentMethod === 'card' 
                              ? 'border-blue-500 bg-blue-500' 
                              : 'border-gray-300'
                          }`}>
                            {paymentMethod === 'card' && (
                              <div className="w-full h-full bg-white rounded-full scale-50"></div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div 
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                          paymentMethod === 'transfer' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onClick={() => setPaymentMethod('transfer')}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <CreditCard className="h-6 w-6 text-green-600" />
                            <div>
                              <h3 className="font-semibold text-gray-900">Bank Transfer</h3>
                              <p className="text-sm text-gray-600">Direct bank transfer</p>
                            </div>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 ${
                            paymentMethod === 'transfer' 
                              ? 'border-blue-500 bg-blue-500' 
                              : 'border-gray-300'
                          }`}>
                            {paymentMethod === 'transfer' && (
                              <div className="w-full h-full bg-white rounded-full scale-50"></div>
                            )}
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
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Complete!</h2>
                      <p className="text-lg text-gray-600 mb-6">
                        Thank you for your purchase. Your order has been successfully placed.
                      </p>
                      
                      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                        <p className="text-green-800 font-medium">
                          Order confirmation has been sent to {billingInfo.email}
                        </p>
                        <p className="text-green-600 text-sm mt-1">
                          You&apos;ll receive tracking information once your order ships.
                        </p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/orders">
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                            View Orders
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
                            Complete Order
                            <Shield className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button
                        onClick={nextStep}
                        disabled={!validateStep(currentStep)}
                        className="px-8 py-3"
                      >
                        Next
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-xl border-0 rounded-2xl overflow-hidden sticky top-4">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Package className="h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">Order Summary</h3>
                </div>
                
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0">
                        {item.image && (
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity} × ₦{item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-4 space-y-2">
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
