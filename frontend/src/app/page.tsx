import { Suspense } from "react"
import Hero from "@/components/sections/hero"

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section - Already contains featured products */}
        <Hero />

        {/* Trust Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-12">
                Why Choose Smart Communications?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                  {
                    title: "100% Authentic",
                    description: "All products are genuine and come with manufacturer warranty",
                    icon: "🛡️"
                  },
                  {
                    title: "Expert Service",
                    description: "Our team provides professional advice and technical support",
                    icon: "👨‍💻"
                  },
                  {
                    title: "Fast Delivery",
                    description: "Quick and reliable delivery across Nigeria",
                    icon: "🚚"
                  }
                ].map((feature, index) => (
                  <div key={index} className="p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Store Information & Contact Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Store Info */}
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Visit Our Store
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  Experience our products firsthand at our modern showroom. Our expert team is ready to help you find the perfect smartphone.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 text-xl">📍</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Our Location</p>
                      <p className="text-gray-600 dark:text-gray-300">87 Ikot Ekpene - Uyo Rd, Uyo, Akwa Ibom State</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 text-xl">📞</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Call Us</p>
                      <a href="tel:08146452793" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                        0814 645 2793
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 text-xl">⏰</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Opening Hours</p>
                      <p className="text-gray-600 dark:text-gray-300">Mon - Sat: 9:00 AM - 8:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:08146452793"
                    className="inline-flex items-center justify-center bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors duration-200"
                  >
                    📞 Call Now
                  </a>
                  <a
                    href="https://share.google/g4HCo5eZmN0S17Url"
                    className="inline-flex items-center justify-center bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-semibold px-8 py-4 rounded-xl border-2 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    🗺️ Get Directions
                  </a>
                </div>
              </div>

              {/* Store Images */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <img
                      src="/img1.jpeg"
                      alt="Store Interior"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="aspect-video rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <img
                      src="/img2.jpeg"
                      alt="Product Display"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="aspect-video rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <img
                      src="/img3.jpeg"
                      alt="Store Front"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="aspect-square rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <img
                      src="/img4.jpeg"
                      alt="Customer Service"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}