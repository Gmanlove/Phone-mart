"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { fetchProducts } from "@/lib/api"

interface Product {
    _id: string
    name: string
    brand: string
    price: number
    description: string
    category: string
    images: string[]
    createdAt?: string
    updatedAt?: string
}

export default function FeaturedProducts() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [currentSlide, setCurrentSlide] = useState(0)

    // Fetch ALL products from API
    useEffect(() => {
        setLoading(true)
        fetchProducts()
            .then((data: Product[]) => {
                console.log("Fetched products for featured section:", data)
                // Show ALL products instead of limiting to 8
                setProducts(data)
                setLoading(false)
            })
            .catch((err) => {
                console.error("Error fetching products:", err)
                setError("Failed to load products")
                setLoading(false)
            })
    }, [])

    // Calculate how many products to show per slide based on screen size
    const getProductsPerSlide = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth >= 1280) return 4 // xl screens
            if (window.innerWidth >= 1024) return 3 // lg screens
            if (window.innerWidth >= 640) return 2  // sm screens
            return 1 // mobile
        }
        return 4
    }

    const [productsPerSlide, setProductsPerSlide] = useState(4)

    useEffect(() => {
        const handleResize = () => {
            setProductsPerSlide(getProductsPerSlide())
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const totalSlides = Math.ceil(products.length / productsPerSlide)

    // Continuous auto-play functionality - slower sliding (6 seconds interval)
    useEffect(() => {
        if (totalSlides <= 1) return

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides)
        }, 6000) // Increased from 4000ms to 6000ms for slower sliding

        return () => clearInterval(interval)
    }, [totalSlides])

    // Helper function to construct proper Cloudinary URL
    const getValidImageUrl = (images: string[] | undefined): string => {
        if (!images || images.length === 0) {
            return ""; // Fallback placeholder
        }
        
        const firstImage = images[0];
        
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

    // Loading state
    if (loading) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                        Featured Products
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                        Discover our complete collection of premium mobile devices
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                            <div className="animate-shimmer h-48 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
                            <div className="animate-shimmer h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                            <div className="animate-shimmer h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                            <div className="animate-shimmer h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="text-center py-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                        Featured Products
                    </h2>
                    <p className="text-red-500 dark:text-red-400 text-lg">
                        {error}
                    </p>
                </div>
            </div>
        )
    }

    // No products state
    if (products.length === 0) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="text-center py-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                        Featured Products
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                        No products available at the moment.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                    Featured Products
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                    Discover our complete collection of premium mobile devices
                </p>
            </div>

            {/* Carousel Container */}
            <div className="relative">
                {/* Products Grid - Auto-sliding without manual controls */}
                <div className="overflow-hidden rounded-2xl">
                    <div 
                        className="flex transition-transform duration-1000 ease-in-out"
                        style={{ 
                            transform: `translateX(-${currentSlide * 100}%)`,
                            width: `${totalSlides * 100}%`
                        }}
                    >
                        {Array.from({ length: totalSlides }).map((_, slideIndex) => {
                            const slideProducts = products.slice(
                                slideIndex * productsPerSlide,
                                (slideIndex + 1) * productsPerSlide
                            )
                            
                            return (
                                <div 
                                    key={slideIndex}
                                    className="flex gap-6"
                                    style={{ width: `${100 / totalSlides}%` }}
                                >
                                    {slideProducts.map((product) => (
                                        <div 
                                            key={product._id} 
                                            className="flex-1"
                                            style={{ minWidth: `${100 / productsPerSlide}%` }}
                                        >
                                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-full">
                                                <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-xl mb-4 overflow-hidden">
                                                    <img
                                                        src={getValidImageUrl(product.images)}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.src = ""
                                                        }}
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <div>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">{product.brand}</p>
                                                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-2">
                                                            {product.name}
                                                        </h3>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                            ₦{product.price.toLocaleString()}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                                                        {product.description}
                                                    </p>
                                                    <Button 
                                                        className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
                                                        asChild
                                                    >
                                                        <Link href={`/products/${product._id}`}>
                                                            View Details
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Slide Indicators - Show current progress */}
                {totalSlides > 1 && (
                    <div className="flex justify-center space-x-2 mt-8">
                        {Array.from({ length: totalSlides }).map((_, index) => (
                            <div
                                key={index}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    index === currentSlide 
                                        ? 'bg-blue-600 dark:bg-blue-400' 
                                        : 'bg-gray-300 dark:bg-gray-600'
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* View All Button */}
            <div className="text-center mt-12">
                <Button 
                    asChild 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white"
                >
                    <Link href="/products">
                        View All Products
                    </Link>
                </Button>
            </div>
        </div>
    )
}
