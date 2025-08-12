"use client"

import { useState, useEffect } from "react"
import ProductCard from "@/components/product/product-card"
import { Button } from "@/components/ui/button"
import { fetchProducts } from "@/lib/api"

interface Product {
    isNew: boolean
    rating: number
    _id: string
    id?: string
    name: string
    brand: string
    price: number
    images?: string[]
}

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
                console.log("Fetched products:", data)
                // Debug: Log each product's ID
                data.forEach((product: Product, index: number) => {
                    console.log(`Product ${index}: _id=${product._id}, id=${product.id}, name=${product.name}`)
                })
                setProducts(data)
                setLoading(false)
            })
            .catch((err) => {
                console.error("Error fetching products:", err)
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
    const getValidImageUrl = (images: string[] | undefined): string => {
        if (!images || images.length === 0) {
            return "/img1.jpeg"; // Return fallback image instead of empty string
        }
        
        const firstImage = images[0];
        
        // If the image is empty or null, return fallback
        if (!firstImage || firstImage.trim() === "") {
            return "/img1.jpeg";
        }
        
        // If it's already a full URL, return it
        if (firstImage.startsWith("http")) {
            return firstImage;
        }
        
        // If it's a Cloudinary public ID (partial path), construct full URL
        if (firstImage.includes("phone-mart-products/")) {
            return `https://res.cloudinary.com/dn7zah8um/image/upload/${firstImage}.png`;
        }
        
        // If it looks like a public ID without the folder prefix, add it
        if (!firstImage.includes("phone-mart-products/") && !firstImage.startsWith("http")) {
            return `https://res.cloudinary.com/dn7zah8um/image/upload/phone-mart-products/${firstImage}.png`;
        }
        
        return firstImage;
    }

    return (
        <div className="space-y-6">
            {/* Results header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p className="text-gray-600">
                    Showing {startIndex + 1}-{Math.min(startIndex + productsPerPage, sortedProducts.length)} of {sortedProducts.length} products
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
                </select>
            </div>

            {/* Products grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {displayedProducts.map((product) => {
                    // Get valid image URL using helper function
                    const imageUrl = getValidImageUrl(product.images);
                    
                    // Use _id as the primary identifier
                    const productId = product._id || product.id || "";
                    console.log(`Rendering product card with ID: ${productId} for product: ${product.name}`)
                    console.log(`Image URL for ${product.name}: ${imageUrl}`)
                    
                    return (
                        <ProductCard
                            key={productId}
                            product={{
                                _id: productId,
                                id: productId, // Use _id as id
                                name: product.name,
                                brand: product.brand,
                                price: product.price,
                                image: imageUrl, // Use the constructed URL
                                images: product.images || [],
                                rating: 4.5,
                                reviews: 128,
                                features: ["Latest Model", "Fast Charging", "Premium Design"],
                                inStock: true,
                                isNew: false,
                                isFeatured: false,
                                fastDelivery: true,
                                warranty: "1 Year",
                                specs: {},
                                originalPrice: Math.round(product.price * 1.2)
                            }}
                        />
                    )
                })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                    <Button
                        variant="outline"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Previous
                    </Button>
                    
                    {[...Array(totalPages)].map((_, i) => (
                        <Button
                            key={i + 1}
                            variant={currentPage === i + 1 ? "default" : "outline"}
                            onClick={() => setCurrentPage(i + 1)}
                            className="w-10"
                        >
                            {i + 1}
                        </Button>
                    ))}
                    
                    <Button
                        variant="outline"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    )
}
