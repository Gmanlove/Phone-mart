import { Suspense } from "react"
import Hero from "@/components/sections/hero"
import FeaturedProducts from "@/components/sections/featured-products"
import Newsletter from "@/components/sections/newsletter"
import StorePhotos from "@/components/sections/store-photos"

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <Hero />
        </section>

        {/* Store Photos Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-blue-50/50 via-white to-blue-50/30 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
          <StorePhotos />
        </section>

        {/* Featured Products Section with Carousel */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-blue-50/30 via-white to-blue-50/50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
          <Suspense fallback={<ProductsSkeleton />}>
            <FeaturedProducts />
          </Suspense>
        </section>

        {/* Trust Indicators Section - Mobile Centered */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
                Why Choose Smart Communications?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-2xl mx-auto px-4">
                Experience professional service and commitment to excellence
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                { 
                  icon: "truck",
                  title: "Lightning Fast Delivery", 
                  desc: "Same day delivery in Lagos & Abuja",
                  color: "blue"
                },
                { 
                  icon: "shield",
                  title: "100% Authentic", 
                  desc: "Original products with warranty",
                  color: "blue"
                },
                { 
                  icon: "headphones",
                  title: "24/7 Expert Support", 
                  desc: "Professional assistance anytime",
                  color: "blue"
                },
                { 
                  icon: "credit-card",
                  title: "Secure Payments", 
                  desc: "Bank-level security & encryption",
                  color: "blue"
                }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="text-center group px-4"
                >
                  <div className="relative mb-4 sm:mb-6">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-4 sm:p-6 rounded-2xl shadow-lg transform group-hover:scale-105 transition-all duration-300 mx-auto w-fit">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-blue-600 dark:text-blue-400">
                        {item.icon === 'truck' && (
                          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        {item.icon === 'shield' && (
                          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        )}
                        {item.icon === 'headphones' && (
                          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        )}
                        {item.icon === 'credit-card' && (
                          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                  <h3 className="font-bold text-base sm:text-lg md:text-xl mb-2 text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base max-w-xs mx-auto">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Stats Section - Mobile Centered */}
            <div className="mt-12 sm:mt-16 pt-12 sm:pt-16 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
                {[
                  { number: "50K+", label: "Happy Customers" },
                  { number: "500+", label: "Products Available" },
                  { number: "99.9%", label: "Uptime Guarantee" },
                  { number: "24/7", label: "Customer Support" }
                ].map((stat, i) => (
                  <div key={i} className="px-2">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1 sm:mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
          <Newsletter />
        </section>
      </div>
    </>
  )
}

function ProductsSkeleton() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-soft">
            <div className="animate-shimmer h-40 sm:h-48 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
            <div className="animate-shimmer h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="animate-shimmer h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="animate-shimmer h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  )
}