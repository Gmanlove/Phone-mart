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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">All Phones</h1>
        <p className="text-gray-600">Discover our complete collection of smartphones from the world&apos;s leading brands</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <ProductsFilters />
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <Suspense fallback={<ProductsGridSkeleton />}>
            <ProductsGrid />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

function ProductsGridSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-10 w-48" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-4 border">
            <Skeleton className="h-48 w-full mb-4" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <Skeleton className="h-8 w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
