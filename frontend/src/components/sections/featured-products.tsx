"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product/product-card"
import { useEffect, useState } from "react"
import { fetchProducts } from "@/lib/api"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Mock data - In real app, this would come from your API
const featuredProducts = [
    {
        id: "1",
        name: "iPhone 15 Pro Max",
        brand: "Apple",
        price: 1199,
        originalPrice: 1299,
        image: "sample",
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
        image: "sample",
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
        image: "sample",
        rating: 4.6,
        reviews: 750,
        features: ["Google Tensor G3", "Magic Eraser", "Pure Android"],
        inStock: true,
        isNew: false,
    },
    {
        id: "4",
        name: "OnePlus 12",
        brand: "OnePlus",
        price: 799,
        originalPrice: 899,
        image: "sample",
        rating: 4.5,
        reviews: 650,
        features: ["Snapdragon 8 Gen 3", "Fast Charging", "OxygenOS"],
        inStock: true,
        isNew: true,
    },
    {
        id: "5",
        name: "iPhone 14 Pro",
        brand: "Apple",
        price: 999,
        originalPrice: 1099,
        image: "sample",
        rating: 4.7,
        reviews: 890,
        features: ["A16 Bionic", "Dynamic Island", "48MP Camera"],
        inStock: true,
        isNew: false,
    },
    {
        id: "6",
        name: "Samsung Galaxy S23",
        brand: "Samsung",
        price: 799,
        originalPrice: 899,
        image: "sample",
        rating: 4.6,
        reviews: 720,
        features: ["Snapdragon 8 Gen 2", "One UI 5", "50MP Camera"],
        inStock: true,
        isNew: false,
    }
]

export default function FeaturedProducts() {
    const [products, setProducts] = useState(featuredProducts)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isAutoPlay, setIsAutoPlay] = useState(true)

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

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlay) return

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides)
        }, 4000)

        return () => clearInterval(interval)
    }, [totalSlides, isAutoPlay])

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides)
        setIsAutoPlay(false)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
        setIsAutoPlay(false)
    }

    const getCurrentProducts = () => {
        const startIndex = currentSlide * productsPerSlide
        return products.slice(startIndex, startIndex + productsPerSlide)
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                    Featured Products
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                    Discover our handpicked selection of premium mobile devices
                </p>
            </div>

            {/* Carousel Container */}
            <div className="relative">
                {/* Navigation Buttons */}
                <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 p-3 rounded-full shadow-lg transition-all duration-200 group"
                    aria-label="Previous products"
                >
                    <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                </button>
                
                <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 p-3 rounded-full shadow-lg transition-all duration-200 group"
                    aria-label="Next products"
                >
                    <ChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                </button>

                {/* Products Grid */}
                <div className="overflow-hidden rounded-2xl">
                    <div 
                        className="flex transition-transform duration-500 ease-in-out"
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
                                            key={product.id} 
                                            className="flex-1"
                                            style={{ minWidth: `${100 / productsPerSlide}%` }}
                                        >
                                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-full">
                                                <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-xl mb-4 overflow-hidden">
                                                    <img
                                                        src="/api/placeholder/300/300"
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
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
                                                            ${product.price}
                                                        </span>
                                                        {product.originalPrice && (
                                                            <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                                                                ${product.originalPrice}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <Button 
                                                        className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
                                                        asChild
                                                    >
                                                        <Link href={`/products/${product.id}`}>
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

                {/* Slide Indicators */}
                <div className="flex justify-center space-x-2 mt-8">
                    {Array.from({ length: totalSlides }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setCurrentSlide(index)
                                setIsAutoPlay(false)
                            }}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                index === currentSlide 
                                    ? 'bg-blue-600 dark:bg-blue-400' 
                                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
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
