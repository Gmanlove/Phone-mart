"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Eye, EyeOff, Phone, Mail, Lock, User, Shield, ArrowRight, CheckCircle, AlertCircle, Loader2, Award, Star } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import Image from "next/image"

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({ email: "", password: "" })
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error">("success")
  const [rememberMe, setRememberMe] = useState(false)
  
  const { login, isAuthenticated } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnTo = searchParams.get('returnTo') || '/products'

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push(returnTo)
    }
  }, [isAuthenticated, router, returnTo])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setIsLoading(true)
    
    try {
      const success = await login(form.email, form.password)
      
      if (success) {
        setMessage("Sign in successful! Redirecting...")
        setMessageType("success")
        
        // Redirect after a short delay
        setTimeout(() => {
          router.push(returnTo)
        }, 1500)
      } else {
        setMessage("Invalid credentials. Please check your email and password.")
        setMessageType("error")
      }
    } catch (error) {
      setMessage("Network error. Please check your connection and try again.")
      setMessageType("error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-100 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <Image
              src="/smart.png"
              alt="Smart Communications"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              Smart Communications
            </span>
          </div>
          
          {/* Trust badge */}
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

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Welcome back! 👋
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
            Sign in to your account to continue your shopping journey
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 px-6 sm:px-8 py-6 text-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Secure Sign In</h3>
                <p className="text-blue-100 text-sm">Your data is protected with us</p>
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div className="px-6 sm:px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-base bg-white dark:bg-gray-700"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-14 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-base bg-white dark:bg-gray-700"
                    value={form.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-50 dark:hover:bg-gray-600 rounded-r-xl transition-colors duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded transition-colors duration-200 bg-white dark:bg-gray-700"
                  />
                  <label htmlFor="remember-me" className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Remember me
                  </label>
                </div>

                <button type="button" className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200">
                  Forgot password?
                </button>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading || !form.email || !form.password}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-3 text-base"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              {/* Message */}
              {message && (
                <div className={`p-4 rounded-xl border flex items-center gap-3 ${
                  messageType === "success" 
                    ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200" 
                    : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200"
                }`}>
                  {messageType === "success" ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <p className="font-medium text-sm">{message}</p>
                </div>
              )}

              {/* Sign Up Link */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-600">
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-200">
                    Sign up for free
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Security Badge & Customer Review */}
        <div className="space-y-4">
          {/* Security Badge */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-600 text-sm text-gray-600 dark:text-gray-400">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Your data is secure and encrypted</span>
            </div>
          </div>

          {/* Customer Review */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-600 p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-xs text-gray-600 dark:text-gray-400 ml-2">5.0/5 (2,847 reviews)</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-xs">
              &quot;Best mobile store in Nigeria! Fast, secure, and reliable.&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}