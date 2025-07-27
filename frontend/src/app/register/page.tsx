"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Phone, Mail, Check, Shield, Star, Users, Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({ email: "", phone: "", password: "", confirmPassword: "" })
  const [message, setMessage] = useState("")
  const [passwordStrength, setPasswordStrength] = useState(0)
  const { toast } = useToast()

  // Password strength checker
  const checkPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")
    
    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match")
      setIsLoading(false)
      return
    }
    
    if (passwordStrength < 3) {
      setMessage("Please create a stronger password")
      setIsLoading(false)
      return
    }
    
    const payload = {
      email: form.email,
      phone: form.phone,
      password: form.password,
    }
    
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      
      setIsLoading(false)
      
      if (res.ok) {
        setMessage("Signup successful!")
        toast({
          title: "Account created successfully!",
          description: "Welcome to PhoneHub. You can now start shopping.",
        })
        localStorage.setItem("isLoggedIn", "true")
        window.location.href = "/products"
      } else {
        setMessage(data.error || "Signup failed")
        toast({
          title: "Signup failed",
          description: data.error || "Signup failed",
        })
      }
    } catch (error) {
      setIsLoading(false)
      setMessage("Network error. Please try again.")
    }
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500"
    if (passwordStrength <= 3) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return "Weak"
    if (passwordStrength <= 3) return "Medium"
    return "Strong"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-xl shadow-lg">
                <Phone className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                PhoneHub
              </span>
            </Link>
            <Link 
              href="/login" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              Already have an account?
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
          
          {/* Left Side - Benefits and Social Proof */}
          <div className="order-2 lg:order-1 space-y-6 lg:space-y-8">
            {/* Hero Section */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Join the Future of
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Phone Shopping</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 leading-relaxed">
                Create your account and discover premium smartphones with exclusive member benefits.
              </p>
            </div>

            {/* Social Proof */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20 shadow-xl">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">50K+</div>
                  <div className="text-sm sm:text-base text-gray-600">Happy Customers</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">4.9★</div>
                  <div className="text-sm sm:text-base text-gray-600">Customer Rating</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">99.9%</div>
                  <div className="text-sm sm:text-base text-gray-600">Uptime</div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Star className="h-6 w-6 text-yellow-500" />
                Premium Member Benefits
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Shield, title: "Exclusive Discounts", desc: "Up to 25% off on premium phones" },
                  { icon: Zap, title: "Early Access", desc: "First to know about new releases" },
                  { icon: Users, title: "Priority Support", desc: "24/7 dedicated customer service" },
                  { icon: Check, title: "Free Shipping", desc: "Complimentary delivery on all orders" }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-xl hover:bg-white/40 transition-colors duration-200">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{benefit.title}</h4>
                      <p className="text-sm text-gray-600">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-lg mb-4 italic">
                    "PhoneHub has completely transformed my phone shopping experience. The quality and service are unmatched!"
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/30 rounded-full"></div>
                    <div>
                      <div className="font-semibold">Sarah Johnson</div>
                      <div className="text-sm text-blue-100">Verified Customer</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="order-1 lg:order-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20">
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                  <p className="text-gray-600">Join thousands of satisfied customers</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                      Email Address
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="john@example.com"
                        className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                        value={form.email}
                        onChange={handleChange}
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div>
                    <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                      Phone Number
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        required
                        placeholder="07043163283"
                        className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                        value={form.phone}
                        onChange={handleChange}
                      />
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                      Password
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        placeholder="Create a strong password"
                        className="pl-10 pr-12 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                        value={form.password}
                        onChange={handleChange}
                      />
                      <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-gray-100"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                    {/* Password Strength Indicator */}
                    {form.password && (
                      <div className="mt-2">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                              style={{ width: `${(passwordStrength / 5) * 100}%` }}
                            />
                          </div>
                          <span className={`text-xs font-medium ${
                            passwordStrength <= 2 ? 'text-red-600' : 
                            passwordStrength <= 3 ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            {getPasswordStrengthText()}
                          </span>
                        </div>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li className={`flex items-center gap-1 ${form.password.length >= 8 ? 'text-green-600' : ''}`}>
                            <Check className={`h-3 w-3 ${form.password.length >= 8 ? 'text-green-600' : 'text-gray-400'}`} />
                            At least 8 characters
                          </li>
                          <li className={`flex items-center gap-1 ${/[A-Z]/.test(form.password) && /[a-z]/.test(form.password) ? 'text-green-600' : ''}`}>
                            <Check className={`h-3 w-3 ${/[A-Z]/.test(form.password) && /[a-z]/.test(form.password) ? 'text-green-600' : 'text-gray-400'}`} />
                            Upper & lowercase letters
                          </li>
                          <li className={`flex items-center gap-1 ${/[0-9]/.test(form.password) ? 'text-green-600' : ''}`}>
                            <Check className={`h-3 w-3 ${/[0-9]/.test(form.password) ? 'text-green-600' : 'text-gray-400'}`} />
                            At least one number
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div>
                    <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
                      Confirm Password
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        placeholder="Confirm your password"
                        className="pl-10 pr-12 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                        value={form.confirmPassword}
                        onChange={handleChange}
                      />
                      <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-gray-100"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                    {form.confirmPassword && form.password !== form.confirmPassword && (
                      <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Passwords do not match
                      </p>
                    )}
                  </div>

                  {/* Terms Checkbox */}
                  <div className="flex items-start space-x-3">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                    />
                    <Label htmlFor="terms" className="text-sm text-gray-700 leading-5">
                      I agree to the{" "}
                      <Link href="/terms" className="text-blue-600 hover:text-blue-500 font-medium underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-blue-600 hover:text-blue-500 font-medium underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating account...
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>

                {message && (
                  <p className={`mt-4 text-center text-sm font-medium ${
                    message.includes('successful') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {message}
                  </p>
                )}

                {/* Social Login */}
                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-12 bg-white hover:bg-gray-50 border-gray-300 rounded-xl">
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Google
                    </Button>

                    <Button variant="outline" className="h-12 bg-white hover:bg-gray-50 border-gray-300 rounded-xl">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                      Apple
                    </Button>
                  </div>
                </div>

                {/* Sign In Link */}
                <p className="mt-8 text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-600 hover:text-blue-500 font-semibold underline">
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}