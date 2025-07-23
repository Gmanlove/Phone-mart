import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    name: "iPhone",
    href: "/products?brand=apple",
    image: "/placeholder.svg?height=200&width=200",
    count: "25+ models",
  },
  {
    name: "Samsung",
    href: "/products?brand=samsung",
    image: "/placeholder.svg?height=200&width=200",
    count: "30+ models",
  },
  {
    name: "Google Pixel",
    href: "/products?brand=google",
    image: "/placeholder.svg?height=200&width=200",
    count: "15+ models",
  },
  {
    name: "OnePlus",
    href: "/products?brand=oneplus",
    image: "/placeholder.svg?height=200&width=200",
    count: "12+ models",
  },
  {
    name: "Accessories",
    href: "/accessories",
    image: "/placeholder.svg?height=200&width=200",
    count: "100+ items",
  },
  {
    name: "Refurbished",
    href: "/products?condition=refurbished",
    image: "/placeholder.svg?height=200&width=200",
    count: "Great deals",
  },
]

export default function Categories() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find the perfect phone from your favorite brand or explore our accessories collection
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={category.href}>
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={200}
                      height={200}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.count}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
