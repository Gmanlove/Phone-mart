import { Suspense } from "react"
import Hero from "@/components/sections/hero"
import FeaturedProducts from "@/components/sections/featured-products"
import Categories from "@/components/sections/categories"
import Newsletter from "@/components/sections/newsletter"
import { Skeleton } from "@/components/ui/skeleton"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <Hero />
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-20 lg:py-24 xl:py-28 bg-gradient-to-b from-gray-50/80 to-white">
        <Categories />
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-20 lg:py-24 xl:py-28 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent opacity-50"></div>
        <div className="relative z-10">
          <Suspense fallback={<ProductsSkeleton />}>
            <FeaturedProducts />
          </Suspense>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: "🚚", title: "Fast Delivery", desc: "Same day delivery in Lagos" },
              { icon: "🛡️", title: "Authentic Products", desc: "100% genuine guarantee" },
              { icon: "💬", title: "24/7 Support", desc: "Always here to help" },
              { icon: "💳", title: "Secure Payment", desc: "Safe & encrypted" }
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="text-3xl md:text-4xl mb-3 md:mb-4 transform group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-sm md:text-base lg:text-lg mb-1 md:mb-2">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 lg:py-24 xl:py-28 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-40">
          <div className="absolute top-20 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs md:text-sm font-medium mb-4 md:mb-6">
              <svg className="w-3 h-3 md:w-4 md:h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              Customer Love
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4 md:mb-6">
              What Our Customers Say
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied customers who trust PhoneMart for their mobile needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {[
              {
                name: "Aisha Okafor",
                location: "Lagos, Nigeria",
                review: "Exceptional service! My iPhone 15 Pro arrived within hours of ordering. The packaging was pristine and the phone came with all original accessories. PhoneMart has earned a loyal customer.",
                rating: 5,
                avatar: "AO",
                verified: true
              },
              {
                name: "Chinedu Eze",
                location: "Abuja, Nigeria", 
                review: "Outstanding customer support team. When I had questions about my Samsung Galaxy warranty, they provided detailed answers immediately. The product quality exceeded my expectations.",
                rating: 5,
                avatar: "CE",
                verified: true
              },
              {
                name: "Ngozi Ukwu",
                location: "Port Harcourt, Nigeria",
                review: "Best mobile phone retailer in Nigeria! Competitive prices, authentic products, and lightning-fast delivery. I've recommended PhoneMart to all my friends and family.",
                rating: 5,
                avatar: "NU",
                verified: true
              }
            ].map((testimonial, i) => (
              <div key={i} className="group">
                <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl p-6 md:p-8 lg:p-10 border border-gray-100/50 hover:border-blue-200/50 transition-all duration-500 hover:-translate-y-2 transform relative overflow-hidden">
                  {/* Card decoration */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-bl-3xl"></div>
                  
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base shadow-lg">
                        {testimonial.avatar}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-gray-900 text-base md:text-lg truncate">
                          {testimonial.name}
                        </h4>
                        {testimonial.verified && (
                          <svg className="w-4 h-4 md:w-5 md:h-5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 01-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 01-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 01-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <p className="text-sm md:text-base text-gray-500">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  
                  <blockquote className="text-gray-700 text-sm md:text-base lg:text-lg leading-relaxed mb-6 relative">
                    <svg className="absolute -top-2 -left-1 w-6 h-6 text-blue-200" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14h-4c0-2.2 1.8-4 4-4V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-4c0-2.2 1.8-4 4-4V8z"/>
                    </svg>
                    <span className="relative z-10 pl-4">
                      {testimonial.review}
                    </span>
                  </blockquote>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, idx) => (
                        <svg key={idx} className="h-4 w-4 md:h-5 md:w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.388-2.462a1 1 0 00-1.175 0l-3.388 2.462c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.174 9.393c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.966z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs md:text-sm text-gray-400 font-medium">
                      Verified Purchase
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* CTA Section */}
          <div className="text-center mt-12 md:mt-16 lg:mt-20">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
              <div className="text-center sm:text-left">
                <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-2">
                  Join 50,000+ Happy Customers
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  Experience the PhoneMart difference today
                </p>
              </div>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        <div className="relative z-10">
          <Newsletter />
        </div>
      </section>
    </main>
  )
}

function ProductsSkeleton() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      {/* Header Skeleton */}
      <div className="text-center mb-12 md:mb-16 lg:mb-20">
        <Skeleton className="h-6 md:h-8 lg:h-10 w-32 md:w-48 mx-auto mb-4 md:mb-6 rounded-full" />
        <Skeleton className="h-8 md:h-12 lg:h-16 w-64 md:w-80 lg:w-96 mx-auto mb-4 md:mb-6" />
        <Skeleton className="h-4 md:h-5 w-48 md:w-64 lg:w-80 mx-auto mb-2" />
        <Skeleton className="h-4 md:h-5 w-40 md:w-56 lg:w-72 mx-auto" />
      </div>

      {/* Products Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>

      {/* Load More Button Skeleton */}
      <div className="text-center mt-12 md:mt-16">
        <Skeleton className="h-12 md:h-14 w-36 md:w-44 mx-auto rounded-xl" />
      </div>
    </div>
  )
}

function ProductCardSkeleton() {
  return (
    <div className="group bg-white rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100/50">
      {/* Image Skeleton */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <Skeleton className="h-full w-full" />
        {/* Badge Skeleton */}
        <div className="absolute top-3 md:top-4 left-3 md:left-4">
          <Skeleton className="h-6 md:h-7 w-16 md:w-20 rounded-full" />
        </div>
        {/* Wishlist Button Skeleton */}
        <div className="absolute top-3 md:top-4 right-3 md:right-4">
          <Skeleton className="h-9 md:h-10 w-9 md:w-10 rounded-full" />
        </div>
        {/* Quick View Skeleton */}
        <div className="absolute bottom-3 md:bottom-4 left-1/2 transform -translate-x-1/2">
          <Skeleton className="h-8 md:h-9 w-24 md:w-28 rounded-full" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-4 md:p-6 lg:p-8">
        {/* Category Skeleton */}
        <Skeleton className="h-3 md:h-4 w-20 md:w-24 mb-3 md:mb-4 rounded-full" />
        
        {/* Title Skeleton */}
        <Skeleton className="h-5 md:h-6 lg:h-7 w-full mb-2" />
        <Skeleton className="h-5 md:h-6 lg:h-7 w-3/4 mb-4 md:mb-6" />

        {/* Rating Skeleton */}
        <div className="flex items-center gap-1 mb-4 md:mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-4 md:h-5 w-4 md:w-5 rounded-sm" />
          ))}
          <Skeleton className="h-3 md:h-4 w-10 md:w-12 ml-2 rounded" />
        </div>

        {/* Price Skeleton */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div className="flex items-center gap-2 md:gap-3">
            <Skeleton className="h-6 md:h-7 lg:h-8 w-20 md:w-24" />
            <Skeleton className="h-4 md:h-5 w-16 md:w-20" />
          </div>
          <Skeleton className="h-4 md:h-5 w-12 md:w-16 rounded-full" />
        </div>

        {/* Buttons Skeleton */}
        <div className="space-y-3 md:space-y-4">
          <Skeleton className="h-11 md:h-12 lg:h-14 w-full rounded-xl" />
          <Skeleton className="h-9 md:h-10 w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}

// Enhanced Error Boundary
function ProductsErrorFallback() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="text-center py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-lg">
          <div className="relative mb-8">
            <div className="rounded-full bg-gradient-to-br from-red-100 to-red-200 p-4 md:p-6 mx-auto w-fit shadow-lg">
              <svg className="h-8 w-8 md:h-10 md:w-10 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
          </div>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
            Oops! Something went wrong
          </h3>
          <p className="text-base md:text-lg text-gray-600 mb-8 md:mb-10 leading-relaxed">
            We're having trouble loading our featured products right now. Our team has been notified and we're working to fix this issue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.reload()} 
              className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </button>
            <button 
              onClick={() => window.history.back()} 
              className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}