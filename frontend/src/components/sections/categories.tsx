"use client"
import Link from "next/link"
import { Smartphone, Laptop, Headphones, Watch, Tablet, Camera, Gamepad2, Settings } from "lucide-react"

const categories = [
  {
    name: "Smartphones",
    icon: Smartphone,
    href: "/products?category=smartphones",
    gradient: "from-blue-500 to-cyan-500",
    count: "200+ Models"
  },
  {
    name: "Laptops",
    icon: Laptop,
    href: "/products?category=laptops",
    gradient: "from-purple-500 to-pink-500",
    count: "50+ Models"
  },
  {
    name: "Accessories",
    icon: Headphones,
    href: "/accessories",
    gradient: "from-green-500 to-emerald-500",
    count: "100+ Items"
  },
  {
    name: "Smart Watches",
    icon: Watch,
    href: "/products?category=watches",
    gradient: "from-orange-500 to-red-500",
    count: "30+ Models"
  },
  {
    name: "Tablets",
    icon: Tablet,
    href: "/products?category=tablets",
    gradient: "from-indigo-500 to-purple-500",
    count: "25+ Models"
  },
  {
    name: "Cameras",
    icon: Camera,
    href: "/products?category=cameras",
    gradient: "from-pink-500 to-rose-500",
    count: "15+ Models"
  },
  {
    name: "Gaming",
    icon: Gamepad2,
    href: "/products?category=gaming",
    gradient: "from-teal-500 to-cyan-500",
    count: "40+ Items"
  },
  {
    name: "Tech Support",
    icon: Settings,
    href: "/support",
    gradient: "from-yellow-500 to-orange-500",
    count: "24/7 Service"
  }
]

export default function Categories() {
  return (
    <section className="py-16 bg-slate-800/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Shop by <span className="text-gradient">Category</span>
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Discover our extensive range of premium tech products, carefully curated for every need and budget.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 hover-lift animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                  {category.count}
                </p>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
