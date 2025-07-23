import { Suspense } from "react"
import Hero from "@/components/sections/hero"
import FeaturedProducts from "@/components/sections/featured-products"
import Categories from "@/components/sections/categories"
import Newsletter from "@/components/sections/newsletter"
import { Skeleton } from "@/components/ui/skeleton"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Categories />
      <Suspense fallback={<ProductsSkeleton />}>
        <FeaturedProducts />
      </Suspense>
      <Newsletter />
    </main>
  )
}

function ProductsSkeleton() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Skeleton className="h-8 w-64 mx-auto mb-4" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-4">
              <Skeleton className="h-48 w-full mb-4" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
