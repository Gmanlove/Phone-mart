"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Shield, Truck, Zap, Award, Clock, Wifi } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Clean background pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 dark:bg-blue-600/10 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300/20 dark:bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-100/40 dark:bg-blue-700/10 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
      </div>

      <div className="relative container mx-auto px-4 pt-16 pb-20 lg:pt-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-8rem)]">
          {/* Left content */}
          <div className="space-y-8 z-10">
            {/* Trust badge with WiFi logo */}
            <div className="inline-flex items-center bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
              <Wifi className="h-4 w-4 mr-2" />
              Nigeria's #1 Trusted Mobile Store
              <Award className="h-4 w-4 ml-2" />
            </div>

            {/* Main heading and value proposition */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                <span className="flex items-center mb-4">
                  <Wifi className="h-12 w-12 lg:h-16 lg:w-16 text-blue-600 dark:text-blue-400 mr-4" />
                  Smart Communications
                </span>
                <span className="block text-blue-600 dark:text-blue-400">
                  Premium Mobile Solutions
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 font-medium max-w-2xl">
                Professional mobile technology solutions with expert service, authentic products, and reliable support. Your trusted partner in mobile communications.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Link href="/products" className="inline-flex items-center">
                  Browse Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300"
              >
                <Link href="/support" className="inline-flex items-center">
                  Visit Store
                  <Zap className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-8">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="font-semibold">4.9/5</span>
                <span className="ml-1">Customer Rating</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Shield className="h-4 w-4 text-green-500 mr-1" />
                <span className="font-semibold">100%</span>
                <span className="ml-1">Authentic Products</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Truck className="h-4 w-4 text-blue-500 mr-1" />
                <span className="font-semibold">Same Day</span>
                <span className="ml-1">Delivery Available</span>
              </div>
            </div>
          </div>

          {/* Right content - Hero Image */}
          <div className="relative z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/20 dark:from-blue-600/20 dark:to-blue-800/20 rounded-3xl blur-2xl transform rotate-6"></div>
              <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                <img
                  src="/img1.jpeg"
                  alt="Smart Communications Store"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
                <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white p-4 rounded-2xl shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold">50K+</div>
                    <div className="text-sm">Happy Customers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}