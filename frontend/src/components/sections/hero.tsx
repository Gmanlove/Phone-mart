
"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Shield, Truck, Zap, Award, Clock } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent pointer-events-none"></div>
      </div>

      <div className="relative container mx-auto px-4 pt-16 pb-20 lg:pt-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-8rem)]">
          {/* Left content */}
          <div className="space-y-8 z-10">
            {/* Trust badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
              <Award className="h-4 w-4 mr-2" />
              Nigeria's #1 Trusted Phone Store
              <span className="ml-2 animate-pulse" aria-hidden="true">✨</span>
            </div>

            {/* Main heading and value proposition */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Premium Mobile Experience
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Smartphones & Accessories
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-700 font-medium max-w-2xl">
                Shop the latest devices, unbeatable prices, and enjoy fast delivery, warranty, and expert support. Your satisfaction is our priority.
              </p>
            </div>

            {/* CTA Buttons - improved accessibility */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Shop Now - Browse Products"
              >
                <Link href="/products">
                  <Zap className="mr-2 h-5 w-5" aria-hidden="true" />
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="View Hot Deals"
              >
                <Link href="/deals">
                  <Star className="mr-2 h-5 w-5" aria-hidden="true" />
                  View Hot Deals
                </Link>
              </Button>
            </div>

            {/* Enhanced Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 pt-8">
              <div className="flex items-center space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl shadow-lg">
                  <Truck className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Free Delivery</p>
                  <p className="text-sm text-gray-600">Orders over ₦100,000</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl shadow-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">2-Year Warranty</p>
                  <p className="text-sm text-gray-600">On all devices</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl shadow-lg">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">24/7 Support</p>
                  <p className="text-sm text-gray-600">Expert assistance</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl shadow-lg">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Authentic Only</p>
                  <p className="text-sm text-gray-600">100% genuine products</p>
                </div>
              </div>
            </div>

            {/* Social proof */}
            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-blue-700">50K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-blue-700">4.9</div>
                <div className="flex items-center justify-center text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-blue-700">1000+</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
            </div>
          </div>

          {/* Right content - Enhanced hero image */}
          <div className="relative z-10">
            {/* Main image container */}
            <div className="relative">
              <div className="relative z-20 transform hover:scale-105 transition-transform duration-500">
                <div className="bg-gradient-to-br from-white to-gray-100 rounded-3xl p-8 shadow-2xl">
                  <Image
                    src="/love.webp?height=600&width=500"
                    alt="Latest Premium Smartphones"
                    width={500}
                    height={600}
                    className="w-full h-auto rounded-2xl"
                    priority
                  />
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold z-30 shadow-xl animate-bounce">
                Up to 40% OFF
              </div>

              {/* Background decorative elements */}
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-50 animate-pulse"></div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-r from-pink-200 to-orange-200 rounded-full opacity-30 animate-pulse animation-delay-2000"></div>
              {/* Floating particles */}
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
              <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-400 rounded-full animate-ping animation-delay-1000"></div>
              <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-pink-400 rounded-full animate-ping animation-delay-3000"></div>
            </div>

            {/* Stats overlay - visible and engaging */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-30">
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">24h</div>
                  <div className="text-xs text-gray-600">Delivery</div>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">99%</div>
                  <div className="text-xs text-gray-600">Satisfaction</div>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">5⭐</div>
                  <div className="text-xs text-gray-600">Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator with hint */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce flex flex-col items-center">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
          <span className="mt-2 text-xs text-gray-500">Scroll down</span>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
      `}</style>
    </section>
  )
}