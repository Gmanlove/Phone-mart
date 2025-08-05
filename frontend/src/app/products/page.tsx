"use client"

import { Suspense } from "react"
import { useState } from "react"
import ProductsGrid from "@/components/products/products-grid"
import { Skeleton } from "@/components/ui/skeleton"
import { Search } from "lucide-react"
import Image from "next/image"

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search functionality
    console.log("Searching for:", searchQuery)
  }

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
              
              {/* Search Bar - Updated Design */}
              <div className="max-w-2xl">
                <form onSubmit={handleSearch} className="relative group">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search smartphones by brand, model, or features..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-14 py-3 sm:py-4 bg-white/95 backdrop-blur-sm border-2 border-white/20 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/40 transition-all duration-200 hover:bg-white"
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-all duration-200 hover:scale-105"
                      aria-label="Search products"
                    >
                      <Search className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </div>

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
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">★ 4.9</div>
                  <div className="text-sm sm:text-base text-blue-200 mt-1">Customer Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Simplified without filters */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
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
              
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  Sort by:
                </label>
                <select 
                  id="sort"
                  className="border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0 flex-shrink-0"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                  <option value="rating">Top Rated</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>

            {/* Products Grid - Full Width */}
            <Suspense fallback={<ProductsGridSkeleton />}>
              <ProductsGrid />
            </Suspense>

            {/* Pagination */}
            <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Showing <span className="font-medium text-blue-600 dark:text-blue-400">1</span> to <span className="font-medium text-blue-600 dark:text-blue-400">24</span> of{' '}
                  <span className="font-medium text-blue-600 dark:text-blue-400">500+</span> results
                </p>
                
                <nav className="flex items-center gap-1" aria-label="Pagination">
                  <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-l-xl hover:bg-blue-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    Previous
                  </button>
                  
                  <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 hover:bg-blue-700 transition-colors">
                    1
                  </button>
                  <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                    2
                  </button>
                  <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                    3
                  </button>
                  <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
                    ...
                  </span>
                  <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                    21
                  </button>
                  
                  <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-r-xl hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Professional CTA Section */}
        <div className="mt-16 mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-2xl p-8 sm:p-12 text-center text-white border border-blue-500 dark:border-blue-600">
            <div className="flex items-center justify-center mb-4">
              <Image
                src="/smart.png"
                alt="Smart Communications"
                width={48}
                height={48}
                className="w-10 h-10 mr-3 object-contain"
              />
              <h3 className="text-2xl sm:text-3xl font-bold">
                Need Expert Advice?
              </h3>
            </div>
            <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
              Our mobile technology experts are here to help you find the perfect smartphone that meets your needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors duration-200 border-2 border-white">
                Contact Expert
              </button>
              <button className="border-2 border-white text-white font-semibold px-8 py-3 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-200">
                Schedule Call
              </button>
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
      {/* Grid Skeleton - Now full width */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm">
            <Skeleton className="h-40 sm:h-48 w-full mb-4 rounded-lg bg-gray-200 dark:bg-gray-700" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700" />
              <div className="flex items-center justify-between pt-2">
                <Skeleton className="h-6 w-20 bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-8 w-24 rounded-lg bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination Skeleton */}
      <div className="flex justify-center pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-10 bg-gray-200 dark:bg-gray-700" />
          ))}
        </div>
      </div>
    </div>
  )
}