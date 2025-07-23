"use client"

import { useState } from "react"
import ProductCard from "@/components/product/product-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data - In real app, this would come from your API
const allProducts = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    price: 1199,
    originalPrice: 1299,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 1250,
    features: ["A17 Pro Chip", "256GB Storage", "Pro Camera System"],
    inStock: true,
    isNew: true,
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    price: 1099,
    originalPrice: 1199,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 980,
    features: ["S Pen Included", "512GB Storage", "200MP Camera"],
    inStock: true,
    isNew: true,
  },
  {
    id: "3",
    name: "Google Pixel 8 Pro",
    brand: "Google",
    price: 899,
    originalPrice: 999,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 750,
    features: ["Google Tensor G3", "Magic Eraser", "Pure Android"],
    inStock: true,
    isNew: false,
  },
  // Add more products...
]

export default function ProductsGrid() {
  const [sortBy, setSortBy] = useState("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12

  const sortedProducts = [...allProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
      default:
        return 0
    }
  })

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const displayedProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage)

  return (
    <div className="space-y-6">
      {/* Results header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <p className="text-gray-600">
          Showing {startIndex + 1}-{Math.min(startIndex + productsPerPage, sortedProducts.length)} of{" "}
          {sortedProducts.length} products
        </p>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => setCurrentPage(page)}
              className="w-10"
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
