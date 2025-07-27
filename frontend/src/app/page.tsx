import { Suspense } from "react"
import Hero from "@/components/sections/hero"
import FeaturedProducts from "@/components/sections/featured-products"
import Categories from "@/components/sections/categories"
import Newsletter from "@/components/sections/newsletter"
// Make sure that "@/components/sections/newsletter" exports a React component that returns JSX.Element, not void.
import { Skeleton } from "@/components/ui/skeleton"
import { CldImage } from "next-cloudinary";
import { extractCloudinaryPublicId } from "@/lib/utils";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative">
        <Hero />
      </section>

      {/* Categories Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50/50">
        <Categories />
      </section>

      {/* Featured Products Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <Suspense fallback={<ProductsSkeleton />}>
          <FeaturedProducts />
        </Suspense>
      </section>

      {/* Testimonials/Trust Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-purple-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Real reviews from happy PhoneMart customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[{
              name: "Aisha O.",
              review: "Fast delivery and genuine products! My iPhone arrived the next day.",
              rating: 5
            }, {
              name: "Chinedu E.",
              review: "Customer support was excellent. Highly recommend PhoneMart.",
              rating: 5
            }, {
              name: "Ngozi U.",
              review: "Best prices and authentic warranty. Will shop again!",
              rating: 5
            }].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-3">
                  <span className="inline-block w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3"></span>
                  <span className="font-bold text-gray-900">{t.name}</span>
                </div>
                <p className="text-gray-700 mb-3">{t.review}</p>
                <div className="flex items-center">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <svg key={idx} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.388-2.462a1 1 0 00-1.175 0l-3.388 2.462c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.174 9.393c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.966z" /></svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <Newsletter />
      </section>
    </main>
  )
}

function ProductsSkeleton() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      {/* Header Skeleton */}
      <div className="text-center mb-8 sm:mb-12 lg:mb-16">
        <Skeleton className="h-6 sm:h-8 lg:h-10 w-48 sm:w-64 lg:w-80 mx-auto mb-3 sm:mb-4" />
        <Skeleton className="h-3 sm:h-4 w-64 sm:w-80 lg:w-96 mx-auto mb-2" />
        <Skeleton className="h-3 sm:h-4 w-48 sm:w-64 lg:w-80 mx-auto" />
      </div>

      {/* Products Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>

      {/* Load More Button Skeleton */}
      <div className="text-center mt-8 sm:mt-12">
        <Skeleton className="h-10 sm:h-12 w-32 sm:w-40 mx-auto" />
      </div>
    </div>
  )
}

function ProductCardSkeleton() {
  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image Skeleton */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Skeleton className="h-full w-full" />
        {/* Badge Skeleton */}
        <div className="absolute top-3 left-3">
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
        {/* Wishlist Button Skeleton */}
        <div className="absolute top-3 right-3">
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-4 sm:p-5">
        {/* Category Skeleton */}
        <Skeleton className="h-3 w-16 mb-2" />
        
        {/* Title Skeleton */}
        <Skeleton className="h-4 sm:h-5 w-full mb-1" />
        <Skeleton className="h-4 sm:h-5 w-3/4 mb-3" />

        {/* Rating Skeleton */}
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-3 w-3" />
          ))}
          <Skeleton className="h-3 w-8 ml-1" />
        </div>

        {/* Price Skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 sm:h-6 w-16" />
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-4 w-8" />
        </div>

        {/* Button Skeleton */}
        <Skeleton className="h-9 sm:h-10 w-full rounded-lg" />
      </div>
    </div>
  )
}

// Optional: Add error boundary for better UX
function ProductsErrorFallback() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="text-center py-12 sm:py-16">
        <div className="mx-auto max-w-md">
          <div className="rounded-full bg-red-100 p-3 mx-auto w-fit mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Unable to load products
          </h3>
          <p className="text-gray-600 mb-6">
            We're having trouble loading the featured products. Please try refreshing the page.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  )
}