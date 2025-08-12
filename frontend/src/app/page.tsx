import Hero from "@/components/sections/hero"
import Categories from "@/components/sections/categories"
import FeaturedProducts from "@/components/sections/featured-products"
import Newsletter from "@/components/sections/newsletter"
import { Shield, Users, Award, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Hero Section */}
        <Hero />

        {/* Categories Quick Access */}
        <Categories />

        {/* Featured Products */}
        <FeaturedProducts />

        {/* Simple Trust Section */}
        <section className="py-16 bg-slate-800/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { icon: Shield, text: "100% Authentic", subtext: "Genuine products" },
                { icon: Zap, text: "Fast Delivery", subtext: "Same day in Uyo" },
                { icon: Users, text: "Expert Support", subtext: "24/7 assistance" },
                { icon: Award, text: "Best Prices", subtext: "Price guarantee" }
              ].map((item, index) => (
                <div key={index} className="text-center group animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/20 rounded-full mb-4 group-hover:bg-blue-600/30 transition-all duration-300">
                    <item.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="text-lg font-semibold text-white mb-1">{item.text}</div>
                  <div className="text-sm text-slate-400">{item.subtext}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <Newsletter />
      </div>
    </>
  )
}