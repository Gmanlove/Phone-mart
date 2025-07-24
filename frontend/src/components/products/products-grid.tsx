"use client"

import { useState, useEffect } from "react"
import ProductCard from "@/components/product/product-card"
import { Button } from "@/components/ui/button"
import { fetchProducts } from "@/lib/api"
import type { Product } from "@/components/product/product-card"

export default function ProductsGrid() {
	const [sortBy, setSortBy] = useState("featured")
	const [currentPage, setCurrentPage] = useState(1)
	const [products, setProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState("")
	const productsPerPage = 12

	useEffect(() => {
		setLoading(true)
		fetchProducts()
			.then((data) => {
				setProducts(data)
				setLoading(false)
			})
			.catch((err) => {
				setError("Failed to load products")
				setLoading(false)
			})
	}, [])

	const sortedProducts = [...products].sort((a, b) => {
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

	if (loading)
		return <div className="py-12 text-center text-lg text-gray-500">Loading products...</div>
	if (error)
		return <div className="py-12 text-center text-lg text-red-500">{error}</div>

	return (
		<div className="space-y-6">
			{/* Results header */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<p className="text-gray-600">
					Showing {startIndex + 1}-{Math.min(startIndex + productsPerPage, sortedProducts.length)} of{" "}
					{sortedProducts.length} products
				</p>

				<select
					className="w-48 block rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
					value={sortBy}
					onChange={(e) => setSortBy(e.target.value)}
				>
					<option value="featured">Featured</option>
					<option value="newest">Newest First</option>
					<option value="price-low">Price: Low to High</option>
					<option value="price-high">Price: High to Low</option>
					<option value="rating">Highest Rated</option>
				</select>
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
