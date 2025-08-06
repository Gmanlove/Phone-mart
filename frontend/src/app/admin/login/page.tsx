"use client"
import { useState } from "react"
import { Eye, EyeOff, Lock, Mail, Shield, AlertCircle, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const [form, setForm] = useState({ email: "", password: "" })
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({ email: "", password: "" })
  const [loginSuccess, setLoginSuccess] = useState(false)
  const router = useRouter()

  const validateForm = () => {
    const newErrors = { email: "", password: "" }
    let isValid = true

    if (!form.email) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address"
      isValid = false
    }

    if (!form.password) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    
    // Clear specific field error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: "" })
    }
    
    // Clear general message
    if (message) setMessage("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    setMessage("")
    
    try {
      const res = await fetch("https://smartcoms.onrender.com/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      
      const data = await res.json()
      
      if (res.ok && data.isAdmin) {
        // Store auth state in session storage
        sessionStorage.setItem("isAdmin", "true")
        setLoginSuccess(true)
        setMessage("Login successful! Redirecting to admin dashboard...")
        router.push("/admin/upload-product")
      } else {
        setMessage(data.error || "Invalid credentials or insufficient privileges")
      }
    } catch (error) {
      setMessage("Network error. Please check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-2xl">
            <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
            Admin Portal
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Secure access to administrative dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10">
          <div className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@company.com"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-white/10 border-2 rounded-xl sm:rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.email 
                      ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' 
                      : 'border-white/20 focus:border-blue-400 focus:ring-blue-400/20 hover:border-white/30'
                  }`}
                />
              </div>
              {errors.email && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full pl-10 sm:pl-12 pr-12 sm:pr-14 py-3 sm:py-4 bg-white/10 border-2 rounded-xl sm:rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.password 
                      ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' 
                      : 'border-white/20 focus:border-blue-400 focus:ring-blue-400/20 hover:border-white/30'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 text-sm">
              <label className="flex items-center text-gray-300 cursor-pointer group">
                <input
                  type="checkbox"
                  className="sr-only"
                />
                <div className="relative">
                  <div className="w-4 h-4 bg-white/10 border-2 border-white/20 rounded group-hover:border-white/40 transition-colors"></div>
                  <div className="absolute inset-0 w-4 h-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <span className="ml-2 select-none">Remember me</span>
              </label>
              <button
                type="button"
                className="text-blue-400 hover:text-blue-300 transition-colors text-left xs:text-right"
              >
                Forgot password?
              </button>
            </div>

            {/* Error/Success Message */}
            {message && (
              <div className={`border rounded-xl p-4 flex items-center gap-3 ${
                loginSuccess 
                  ? 'bg-green-900/30 border-green-400/50' 
                  : 'bg-red-900/30 border-red-400/50'
              }`}>
                <AlertCircle className={`w-5 h-5 flex-shrink-0 ${
                  loginSuccess ? 'text-green-400' : 'text-red-400'
                }`} />
                <p className={`text-sm ${
                  loginSuccess ? 'text-green-200' : 'text-red-200'
                }`}>{message}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 sm:py-4 px-6 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center justify-center gap-3 text-base sm:text-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  <span>Access Admin Panel</span>
                </>
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              Protected by enterprise-grade security
            </p>
            <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-500">
              <span>SSL Encrypted</span>
              <span>•</span>
              <span>2FA Ready</span>
              <span>•</span>
              <span>Audit Logged</span>
            </div>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            Need technical support?{" "}
            <button className="text-blue-400 hover:text-blue-300 transition-colors underline">
              Contact IT Department
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}