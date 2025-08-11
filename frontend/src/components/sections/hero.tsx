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

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center min-h-[calc(100vh-8rem)]">
          {/* Left content - Centered on mobile */}
          <div className="space-y-6 sm:space-y-8 z-10 text-center lg:text-left">
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
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                <span className="block mb-2 sm:mb-4">
                  Smart Communications
                </span>
                <span className="block text-blue-600 dark:text-blue-400">
                  Premium Mobile Solutions
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 font-medium max-w-2xl mx-auto lg:mx-0">
                Professional mobile technology solutions with expert service, authentic products, and reliable support. Your trusted partner in mobile communications.
              </p>
            </div>

            {/* CTA Buttons - Centered on mobile */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Link href="/products" className="inline-flex items-center">
                  Shop Premium Phones
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300">
                <Link href="/support">Expert Consultation</Link>
              </Button>
            </div>

            {/* Trust indicators - Centered on mobile */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-8 pt-4">
              {[
                { icon: Shield, text: "100% Authentic", color: "text-blue-600 dark:text-blue-400" },
                { icon: Truck, text: "Fast Delivery", color: "text-blue-600 dark:text-blue-400" },
                { icon: Star, text: "5-Star Service", color: "text-blue-600 dark:text-blue-400" }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right content - Hero image - Centered on mobile */}
          <div className="relative z-10 flex justify-center lg:justify-end">
            <div className="relative max-w-lg w-full">
              <div className="relative bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-900 rounded-3xl p-8 shadow-2xl">
                <Image
                  src="/img1.jpeg"
                  alt="Premium Smartphones at Smart Communications"
                  width={500}
                  height={600}
                  className="w-full h-auto object-contain rounded-2xl shadow-lg"
                  priority
                />
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg">
                  <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg">
                  <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}