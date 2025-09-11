import { Suspense } from "react"
import ProductsGrid from "@/components/products/products-grid"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Products | Premium Smartphones & Accessories Nigeria',
  description: 'Browse our complete collection of smartphones, iPhones, Samsung Galaxy, Android phones, and mobile accessories in Nigeria. Best prices, warranty included.',
  keywords: ['smartphones Nigeria', 'iPhone Nigeria', 'Samsung Galaxy', 'Android phones', 'mobile accessories'],
  openGraph: {
    title: 'All Products | Smart Communications Nigeria',
    description: 'Browse our complete collection of smartphones and mobile accessories in Nigeria. Best prices, warranty included.',
  },
  alternates: {
    canonical: '/products',
  },
}

export default function ProductsPage() {
  return (
    <main className="bg-gradient-to-b from-blue-700 via-blue-800 to-blue-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-32">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse-soft"></div>
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-white/3 rounded-full blur-2xl animate-float"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          {/* Product showcase image */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <Image
                  src="/33.png"
                  alt="Premium smartphones"
                  width={48}
                  height={48}
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-contain"
                />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-bounce-gentle"></div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-blue-200 rounded-full animate-pulse animation-delay-100"></div>
                <div className="w-2 h-2 bg-blue-100 rounded-full animate-pulse animation-delay-2000"></div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                    Premium Smartphones
                  </h1>
                  <p className="text-blue-200 text-sm lg:text-base mt-1">
                    Smart Communications Collection
                  </p>
                </div>
              </div>

              <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 mb-6 sm:mb-8 leading-relaxed max-w-3xl">
                Discover our curated collection of premium smartphones with authentic products, expert service, and competitive prices.
              </p>

              {/* Quick Stats - Updated */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12">
                <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">500+</div>
                  <div className="text-blue-200 text-sm">Products</div>
                </div>
                <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">50+</div>
                  <div className="text-blue-200 text-sm">Brands</div>
                </div>
                <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">24/7</div>
                  <div className="text-blue-200 text-sm">Support</div>
                </div>
                <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">1000+</div>
                  <div className="text-blue-200 text-sm">Happy Customers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="relative -mt-16 sm:-mt-20 lg:-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-t-3xl shadow-2xl min-h-screen">
            <div className="pt-8 sm:pt-12 lg:pt-16 pb-16">
              <Suspense fallback={<ProductsGridSkeleton />}>
                <ProductsGrid />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function ProductsGridSkeleton() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
            <Skeleton className="w-full h-48 mb-4" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-6 w-1/3" />
          </div>
        ))}
      </div>
    </div>
  )
}