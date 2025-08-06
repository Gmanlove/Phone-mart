"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Phone, Shield, User, Check, AlertCircle, CheckCircle, Loader2, Award, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import Image from "next/image"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({ email: "", phone: "", password: "", confirmPassword: "" })
  const [message, setMessage] = useState("")
  const [passwordStrength, setPasswordStrength] = useState(0)
  const { toast } = useToast()
  const { isAuthenticated, login } = useAuth()
  const router = useRouter()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/products')
    }
  }, [isAuthenticated, router])

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
      const res = await fetch("https://smartcoms.onrender.com/api/auth/signup", {
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
          description: "Welcome to Smart Communications. Signing you in now...",
        })
        
        // Automatically log the user in after successful registration
        const loginSuccess = await login(form.email, form.password)
        if (loginSuccess) {
          router.push("/products")
        }
      } else {
        setMessage(data.error || "Signup failed")
        toast({
          title: "Signup failed",
          description: data.error || "Signup failed"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 sm:py-12">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-100 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Top Navigation */}
      <div className="relative container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8 lg:mb-12">
          <div className="flex items-center space-x-3">
            <Image
              src="/smart.png"
              alt="Smart Communications"
              width={32}
              height={32}
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />
            <span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Smart Communications
            </span>
          </div>
          <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
            <Link 
              href="/login"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-200"
            >
              Already have an account?
            </Link>
          </div>
        </div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
          
          {/* Left Side - Benefits and Social Proof */}
          <div className="order-2 lg:order-1 space-y-6 lg:space-y-8">
            {/* Hero Section */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-semibold shadow-sm mb-6">
                <Image
                  src="/smart.png"
                  alt="Smart Communications"
                  width={16}
                  height={16}
                  className="w-4 h-4 mr-2 object-contain"
                />
                Nigeria&apos;s #1 Trusted Mobile Store
                <Award className="h-4 w-4 ml-2" />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                Join the Future of
                <span className="block text-blue-600 dark:text-blue-400"> Phone Shopping</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Get exclusive access to the latest smartphones, unbeatable deals, and lightning-fast delivery. Join thousands of satisfied customers today!
              </p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              {[
                { icon: <Shield className="h-6 w-6" />, title: "Secure Payments", desc: "Bank-level encryption" },
                { icon: <CheckCircle className="h-6 w-6" />, title: "Quality Guarantee", desc: "30-day return policy" },
                { icon: <User className="h-6 w-6" />, title: "Premium Support", desc: "24/7 customer service" },
                { icon: <Phone className="h-6 w-6" />, title: "Latest Models", desc: "Always in stock" }
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-600">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{benefit.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Customer Review */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-600 p-6">
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">5.0/5 (2,847 reviews)</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm italic">
                &quot;Best mobile store in Nigeria! Authentic products, fast delivery, and excellent customer service. Highly recommended!&quot;
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">- Verified Customer</p>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="order-1 lg:order-2">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 px-6 sm:px-8 py-6 text-white">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">Create Account</h2>
                <p className="text-blue-100">Get started with your free account</p>
              </div>

              <div className="px-6 sm:px-8 py-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Email Address
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="Enter your email address"
                        className="pl-10 h-12 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        value={form.email}
                        onChange={handleChange}
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div>
                    <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Phone Number
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        required
                        placeholder="Enter your phone number"
                        className="pl-10 h-12 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        value={form.phone}
                        onChange={handleChange}
                      />
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <Label htmlFor="password" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
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
                        className="pl-10 pr-12 h-12 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        value={form.password}
                        onChange={handleChange}
                      />
                      <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-600"
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
                          <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
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
                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
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
                    <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
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
                        className="pl-10 pr-12 h-12 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        value={form.confirmPassword}
                        onChange={handleChange}
                      />
                      <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-600"
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
                        <AlertCircle className="h-3 w-3" />
                        Passwords do not match
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading || passwordStrength < 3 || form.password !== form.confirmPassword}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-3 text-base h-14"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <User className="w-5 h-5" />
                      </>
                    )}
                  </Button>

                  {/* Message */}
                  {message && (
                    <p className={`mt-4 text-center text-sm font-medium ${
                      message.includes('successful') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {message}
                    </p>
                  )}

                  {/* Terms */}
                  <p className="text-xs text-center text-gray-600 dark:text-gray-400 mt-6">
                    By creating an account, you agree to our{" "}
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline">
                      Privacy Policy
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}