"use client"

import { Suspense } from "react"
import ProductsGrid from "@/components/products/products-grid"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section - Updated with Smart Communications branding */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-blue-800 dark:via-blue-900 dark:to-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12 sm:py-16 lg:py-20">
            <div className="max-w-4xl">
              {/* Logo and Brand */}
              <div className="flex items-center mb-6">
                <Image
                  src="/smart.png"
                  alt="Smart Communications"
                  width={48}
                  height={48}
                  className="w-10 h-10 lg:w-12 lg:h-12 mr-4 object-contain"
                />
                <div>
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
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">500+</div>
                  <div className="text-sm sm:text-base text-blue-200 mt-1">Premium Devices</div>
                </div>
                <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">20+</div>
                  <div className="text-sm sm:text-base text-blue-200 mt-1">Top Brands</div>
                </div>
                <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">24/7</div>
                  <div className="text-sm sm:text-base text-blue-200 mt-1">Expert Support</div>
                </div>
                <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">1 Year</div>
                  <div className="text-sm sm:text-base text-blue-200 mt-1">Warranty</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          
          {/* Products Section - Full Width */}
          <div className="p-4 sm:p-6 lg:p-8">
            
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  Premium Smartphones
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Showing authentic devices from top brands
                </p>
              </div>
            </div>

            {/* Products Grid with Suspense for loading */}
            <Suspense fallback={<ProductsGridSkeleton />}>
              <ProductsGrid />
            </Suspense>

            {/* Additional Info */}
            <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  All products are 100% authentic with manufacturer warranty
                </p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>In Stock</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span>Limited Stock</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Out of Stock</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductsGridSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-10 w-48" />
      </div>
      
      {/* Grid skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-6 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  )
}