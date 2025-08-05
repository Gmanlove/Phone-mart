"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Mail, Gift, Star, Shield, Zap, Users, Package, Headphones, CheckCircle, Sparkles } from "lucide-react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubscribed(true)
    setEmail("")
    setIsLoading(false)
    
    // Reset success state after 4 seconds
    setTimeout(() => setIsSubscribed(false), 4000)
  }

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Stay Updated with Phone Mart
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get the latest deals, new product launches, and exclusive offers delivered to your inbox.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        {isSubscribed ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Welcome to Phone Mart!
            </h3>
            <p className="text-gray-600">
              You&apos;re now subscribed to our newsletter. Check your email for a welcome message.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="h-12 px-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Subscribing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Subscribe
                  </div>
                )}
              </Button>
            </div>
          </form>
        )}

        <div className="mt-8 pt-8 border-t border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-2">
              <Gift className="w-6 h-6 text-blue-600 mx-auto" />
              <p className="text-sm text-gray-600">Exclusive Deals</p>
            </div>
            <div className="space-y-2">
              <Sparkles className="w-6 h-6 text-blue-600 mx-auto" />
              <p className="text-sm text-gray-600">New Arrivals</p>
            </div>
            <div className="space-y-2">
              <Shield className="w-6 h-6 text-blue-600 mx-auto" />
              <p className="text-sm text-gray-600">Tech Tips</p>
            </div>
            <div className="space-y-2">
              <Users className="w-6 h-6 text-blue-600 mx-auto" />
              <p className="text-sm text-gray-600">Community</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}