"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Shield, Truck, Zap, Award, Clock } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-100 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative container mx-auto px-4 pt-16 pb-20 lg:pt-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-8rem)]">
          {/* Left content */}
          <div className="space-y-8 z-10">
            {/* Trust badge with official logo */}
            <div className="inline-flex items-center bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
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

            {/* Main heading and value proposition */}
            <div className="space-y-4 -ml-4">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
              <span className="block mb-4">
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
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                variant="outline"
                asChild 
                size="lg" 
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300"
              >
                <Link href="/support">
                  Learn More
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
              {[
                { icon: Shield, text: "100% Authentic", color: "text-blue-600 dark:text-blue-400" },
                { icon: Truck, text: "Fast Delivery", color: "text-blue-600 dark:text-blue-400" },
                { icon: Star, text: "Expert Support", color: "text-blue-600 dark:text-blue-400" },
                { icon: Award, text: "Trusted Store", color: "text-blue-600 dark:text-blue-400" }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
                  <item.icon className={`h-6 w-6 ${item.color} mb-2`} />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right content - Hero Image (No Card Background) */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Large Logo/Image - No card wrapper */}
            <div className="relative mb-8">
              <Image
                src="/smart.png"
                alt="Smart Communications - Latest Smartphones"
                width={400}
                height={400}
                className="w-80 h-80 lg:w-96 lg:h-96 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
              />
              
              {/* Floating badges around the image */}
              <div className="absolute -top-6 -right-6 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce-gentle">
                New Arrivals
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-bold shadow-lg border border-blue-200 dark:border-blue-700 animate-pulse-soft">
                Best Prices
              </div>
            </div>

            {/* Text below the image */}
            <div className="text-center space-y-4 max-w-md">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Latest Smartphones
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Premium devices from top brands with cutting-edge technology and exceptional performance
              </p>
            </div>

            {/* Floating elements around the image */}
            <div className="absolute top-16 -left-8 bg-blue-500 text-white p-4 rounded-xl shadow-lg animate-float">
              <Clock className="h-8 w-8" />
            </div>
            <div className="absolute bottom-20 -right-8 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 p-4 rounded-xl shadow-lg animate-float animation-delay-2000 border border-blue-200 dark:border-blue-700">
              <Zap className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}