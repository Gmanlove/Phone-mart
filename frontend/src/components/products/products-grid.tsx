"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from 'next/navigation'
import ProductCard from "@/components/product/product-card"

export interface Product {
  specs?: Record<string, unknown>
  _id: string
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  rating: number
  reviews?: number | any[] // Make optional
  features?: string[] // Make optional
  inStock?: boolean // Make optional
  isNew?: boolean
  isFeatured?: boolean
  fastDelivery?: boolean
  warranty?: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://smartcoms.onrender.com"

export default function ProductsGrid() {
    const searchParams = useSearchParams()
    const [sortBy, setSortBy] = useState("featured")
    const [currentPage, setCurrentPage] = useState(1)
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
    const productsPerPage = 12

    // Get search query from URL
    const searchQuery = searchParams.get('search') || ''
    const categoryFilter = searchParams.get('category') || ''

    useEffect(() => {
        setLoading(true)
        
        // Build API query parameters
        const queryParams = new URLSearchParams()
        if (searchQuery) {
          queryParams.set('search', searchQuery)
        }
        if (categoryFilter && categoryFilter !== 'all') {
          queryParams.set('category', categoryFilter)
        }
        
        // Fetch with search parameters
        const apiUrl = queryParams.toString() 
          ? `${API_BASE_URL}/api/products?${queryParams.toString()}`
          : `${API_BASE_URL}/api/products`
        
        console.log('Fetching products from:', apiUrl)
        
        fetch(apiUrl)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`)
                }
                return res.json()
            })
            .then((data) => {
                console.log("Fetched products:", data)
                console.log("Search query:", searchQuery)
                console.log("Number of products found:", data.length)
                setProducts(data)
                setFilteredProducts(data)
                setLoading(false)
            })
            .catch((err) => {
                console.error("Error fetching products:", err)
                setError("Failed to load products")
                setLoading(false)
            })
    }, [searchQuery, categoryFilter])

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case "price-low":
                return a.price - b.price
            case "price-high":
                return b.price - a.price
            case "rating":
                return (b.rating || 4.5) - (a.rating || 4.5)
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

    // Helper function to construct proper Cloudinary URL or validate existing URL
    const getImageUrl = (product: Product) => {
        if (!product.images || product.images.length === 0) {
            return "/img1.jpeg"; // Fallback image
        }
        
        const firstImage = product.images[0];
        
        // If it's already a full URL, return it
        if (firstImage.startsWith("http")) {
            return firstImage;
        }
        
        // If it doesn't include the Cloudinary path, add it
        if (!firstImage.includes("phone-mart-products/") && !firstImage.startsWith("http")) {
            return `https://res.cloudinary.com/dn7zah8um/image/upload/phone-mart-products/${firstImage}.png`;
        }
        
        return firstImage;
    }

    return (
        <div className="space-y-6">
            {/* Results header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <p className="text-gray-600">
                        {searchQuery ? (
                            <>Showing results for "<span className="font-semibold text-gray-900">{searchQuery}</span>" - </>
                        ) : ''}
                        {startIndex + 1}-{Math.min(startIndex + productsPerPage, sortedProducts.length)} of {sortedProducts.length} products
                    </p>
                    {searchQuery && sortedProducts.length === 0 && (
                        <p className="text-red-500 mt-2">No products found for "{searchQuery}". Try different keywords or browse all products.</p>
                    )}
                </div>

                <select
                    className="w-48 block rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest First</option>
                </select>
            </div>

            {/* Products Grid - Responsive: 2 cols mobile, 3 cols md, 4 cols lg */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {displayedProducts.map((product) => (
                    <ProductCard
                        key={product._id || product.id}
                        product={{
                            ...product,
                            id: product._id || product.id || '',
                            image: getImageUrl(product),
                            rating: product.rating || 4.5,
                            reviews: product.reviews || 0, // Provide default value for undefined
                            specs: product.specs || {}, // Also fix specs if needed
                            features: product.features || [], // Provide default for features
                            inStock: product.stock > 0, // Convert stock to boolean
                            warranty: product.warranty || "1 Year", // Provide default warranty
                            fastDelivery: true, // Default value
                            isFeatured: false, // Default value
                            isNew: product.isNew || false // Handle optional isNew
                        }}
                    />
                ))}
            </div>

            {/* No products found message */}
            {sortedProducts.length === 0 && !loading && (
                <div className="text-center py-12">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                    {searchQuery ? (
                        <p className="text-gray-600">
                            No products match your search for "{searchQuery}". Try:
                            <br />
                            • Checking your spelling
                            <br />
                            • Using different keywords
                            <br />
                            • Browsing our categories instead
                        </p>
                    ) : (
                        <p className="text-gray-600">No products available at the moment.</p>
                    )}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 pt-8">
                    <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>

                    <div className="flex space-x-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-4 py-2 text-sm font-medium rounded-md ${
                                    currentPage === page
                                        ? "bg-blue-600 text-white"
                                        : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    )
}
