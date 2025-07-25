import { Suspense } from "react"
import ProductsGrid from "@/components/products/products-grid"
import ProductsFilters from "@/components/products/products-filters"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "All Phones - PhoneHub",
  description: "Browse our complete collection of smartphones from top brands like Apple, Samsung, Google, and more.",
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12 sm:py-16 lg:py-20">
            <div className="max-w-4xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                All Phones
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 mb-6 sm:mb-8 leading-relaxed max-w-3xl">
                Discover our complete collection of smartphones from the world&apos;s leading brands
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search phones by brand, model, or features..."
                    className="w-full pl-11 pr-4 py-3 sm:py-4 bg-white/95 backdrop-blur-sm border border-white/20 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">500+</div>
                  <div className="text-sm sm:text-base text-blue-200 mt-1">Models</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">20+</div>
                  <div className="text-sm sm:text-base text-blue-200 mt-1">Brands</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">24/7</div>
                  <div className="text-sm sm:text-base text-blue-200 mt-1">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">★ 4.9</div>
                  <div className="text-sm sm:text-base text-blue-200 mt-1">Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Mobile Filter Button */}
          <div className="lg:hidden bg-gray-50 border-b p-4">
            <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
              </svg>
              Filters & Sort
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-4 gap-0">
            
            {/* Desktop Filters Sidebar */}
            <div className="hidden lg:block lg:col-span-1 border-r border-gray-200 bg-gray-50">
              <div className="sticky top-4 p-6">
                <div className="flex items-center gap-2 mb-6">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                  </svg>
                  <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                </div>
                <ProductsFilters />
              </div>
            </div>

            {/* Products Grid Section */}
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="p-4 sm:p-6 lg:p-8">
                
                {/* Results Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                      All Smartphones
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600">
                      Showing 1-24 of 500+ results
                    </p>
                  </div>
                  
                  {/* Sort Dropdown */}
                  <div className="flex items-center gap-2">
                    <label htmlFor="sort" className="text-sm font-medium text-gray-700 whitespace-nowrap">
                      Sort by:
                    </label>
                    <select 
                      id="sort"
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0 flex-shrink-0"
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

                {/* Active Filters */}
                <div className="mb-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">Active filters:</span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      Brand: Apple
                      <button className="ml-1 hover:text-blue-600">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      Price: $500-$1000
                      <button className="ml-1 hover:text-green-600">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                    <button className="text-sm text-gray-500 hover:text-gray-700 underline">
                      Clear all
                    </button>
                  </div>
                </div>

                {/* Products Grid */}
                <Suspense fallback={<ProductsGridSkeleton />}>
                  <ProductsGrid />
                </Suspense>

                {/* Pagination */}
                <div className="mt-12 border-t border-gray-200 pt-8">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-600">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">24</span> of{' '}
                      <span className="font-medium">500+</span> results
                    </p>
                    
                    <nav className="flex items-center gap-1" aria-label="Pagination">
                      <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous
                      </button>
                      
                      <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600">
                        1
                      </button>
                      <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50">
                        2
                      </button>
                      <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50">
                        3
                      </button>
                      <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300">
                        ...
                      </span>
                      <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50">
                        21
                      </button>
                      
                      <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-50">
                        Next
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 mb-8">
          <div className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-2xl p-8 sm:p-12 text-center text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Stay Updated with Latest Phones
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Get notified about new releases, exclusive deals, and tech reviews delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 whitespace-nowrap">
                Subscribe
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
      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
            <Skeleton className="h-40 sm:h-48 w-full mb-4 rounded-lg" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex items-center justify-between pt-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-8 w-24 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination Skeleton */}
      <div className="flex justify-center pt-8 border-t border-gray-200">
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-10" />
          ))}
        </div>
      </div>
    </div>
  )
}