"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Star, Shield, Truck, Zap, Award, Clock, Heart, ShoppingCart, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

// Sample featured products for hero section
const featuredProducts = [
	{
		id: "1",
		name: "iPhone 15 Pro Max",
		brand: "Apple",
		price: 1250000,
		originalPrice: 1350000,
		image: "/img1.jpeg",
		rating: 4.9,
		reviews: 234,
		isNew: true,
		inStock: true,
		discount: 7
	},
	{
		id: "2", 
		name: "Samsung Galaxy S24 Ultra",
		brand: "Samsung",
		price: 980000,
		originalPrice: 1100000,
		image: "/img2.jpeg",
		rating: 4.8,
		reviews: 189,
		isFeatured: true,
		inStock: true,
		discount: 11
	},
	{
		id: "3",
		name: "Google Pixel 8 Pro",
		brand: "Google",
		price: 750000,
		originalPrice: 850000,
		image: "/img3.jpeg",
		rating: 4.7,
		reviews: 156,
		inStock: true,
		discount: 12
	},
	{
		id: "4",
		name: "OnePlus 12",
		brand: "OnePlus",
		price: 650000,
		originalPrice: 750000,
		image: "/img4.jpeg",
		rating: 4.6,
		reviews: 98,
		inStock: true,
		discount: 13
	},
	{
		id: "5",
		name: "Xiaomi 14 Ultra",
		brand: "Xiaomi",
		price: 580000,
		originalPrice: 680000,
		image: "/img5.jpeg",
		rating: 4.5,
		reviews: 87,
		inStock: true,
		discount: 15
	}
]

const categories = [
	{
		name: "Smartphones",
		icon: "📱",
		href: "/products?category=smartphones",
		image: "/img1.jpeg"
	},
	{
		name: "Accessories",
		icon: "🎧",
		href: "/accessories",
		image: "/img2.jpeg"
	},
	{
		name: "Smart Watches",
		icon: "⌚",
		href: "/products?category=watches",
		image: "/img3.jpeg"
	},
	{
		name: "Tablets",
		icon: "📱",
		href: "/products?category=tablets",
		image: "/img4.jpeg"
	},
	{
		name: "Laptops",
		icon: "💻",
		href: "/products?category=laptops",
		image: "/img5.jpeg"
	},
	{
		name: "Gaming",
		icon: "🎮",
		href: "/products?category=gaming",
		image: "/img1.jpeg"
	}
]

const brands = [
	{ name: "Apple", logo: "/smart.png", href: "/products?brand=apple" },
	{ name: "Samsung", logo: "/smart.png", href: "/products?brand=samsung" },
	{ name: "Google", logo: "/smart.png", href: "/products?brand=google" },
	{ name: "OnePlus", logo: "/smart.png", href: "/products?brand=oneplus" },
	{ name: "Xiaomi", logo: "/smart.png", href: "/products?brand=xiaomi" },
	{ name: "Huawei", logo: "/smart.png", href: "/products?brand=huawei" }
]

const formatPrice = (price: number) => {
	return new Intl.NumberFormat('en-NG', {
		style: 'currency',
		currency: 'NGN',
		minimumFractionDigits: 0
	}).format(price)
}

function HeroBanner() {
	return (
		<div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-2xl overflow-hidden mb-8">
			<div className="absolute inset-0 bg-[url('/smart.png')] bg-cover bg-center opacity-10"></div>
			<div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 lg:p-12 min-h-[400px]">
				{/* Left content */}
				<div className="text-white space-y-6">
					<div className="space-y-2">
						<p className="text-blue-100 font-medium">Best Deal Online on smartphones</p>
						<h1 className="text-4xl lg:text-5xl font-bold leading-tight">
							SMART PHONES.<br />
							<span className="text-blue-200">SMART DEALS.</span>
						</h1>
						<p className="text-xl text-blue-100">UP to 80% OFF</p>
					</div>
					
					<div className="flex items-center space-x-2">
						{[...Array(5)].map((_, i) => (
							<div key={i} className={`h-2 w-2 rounded-full ${i === 0 ? 'bg-white' : 'bg-blue-300'}`}></div>
						))}
					</div>

					<Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8">
						<Link href="/products">Shop Now</Link>
					</Button>
				</div>

				{/* Right content - Hero image */}
				<div className="relative flex justify-center lg:justify-end">
					<div className="relative">
						<Image
							src="/img1.jpeg"
							alt="Featured Smartphone"
							width={300}
							height={400}
							className="rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300"
						/>
						<div className="absolute -top-4 -right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
							50% OFF
						</div>
					</div>
				</div>
			</div>
			
			{/* Navigation arrows */}
			<button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white transition-colors">
				<ChevronLeft className="h-6 w-6" />
			</button>
			<button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white transition-colors">
				<ChevronRight className="h-6 w-6" />
			</button>
		</div>
	)
}

function FeaturedProductCard({ product }: { product: typeof featuredProducts[0] }) {
	const [isWishlisted, setIsWishlisted] = useState(false)

	return (
		<Card className="group relative overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 min-w-[250px] flex-shrink-0">
			<CardContent className="p-4">
				{/* Discount badge */}
				<div className="absolute top-2 left-2 z-10">
					<Badge className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold">
						{product.discount}% OFF
					</Badge>
				</div>

				{/* Wishlist button */}
				<button
					onClick={() => setIsWishlisted(!isWishlisted)}
					className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-colors"
				>
					<Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'}`} />
				</button>

				{/* Product image */}
				<div className="relative aspect-square mb-3 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
					<Image
						src={product.image}
						alt={product.name}
						fill
						className="object-cover transition-transform duration-300 group-hover:scale-105"
					/>
				</div>

				{/* Product info */}
				<div className="space-y-2">
					<h3 className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2 leading-tight">
						{product.name}
					</h3>

					{/* Price */}
					<div className="space-y-1">
						<div className="flex items-center gap-2">
							<span className="font-bold text-gray-900 dark:text-white text-lg">
								{formatPrice(product.price)}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-sm text-gray-500 line-through">
								{formatPrice(product.originalPrice!)}
							</span>
							<span className="text-sm text-green-600 dark:text-green-400 font-medium">
								Save {formatPrice(product.originalPrice! - product.price)}
							</span>
						</div>
					</div>

					{/* Rating */}
					<div className="flex items-center gap-1">
						<div className="flex">
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									className={`h-3 w-3 ${
										i < Math.floor(product.rating)
											? 'fill-yellow-400 text-yellow-400'
											: 'text-gray-300 dark:text-gray-600'
									}`}
								/>
							))}
						</div>
						<span className="text-xs text-gray-600 dark:text-gray-400">
							({product.reviews})
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

function CategoryCard({ category }: { category: typeof categories[0] }) {
	return (
		<Link href={category.href} className="group">
			<div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 hover:scale-105">
				<div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
					<span className="text-2xl">{category.icon}</span>
				</div>
				<span className="text-sm font-medium text-gray-900 dark:text-white text-center">
					{category.name}
				</span>
			</div>
		</Link>
	)
}

function BrandCard({ brand }: { brand: typeof brands[0] }) {
	return (
		<Link href={brand.href} className="group">
			<div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 hover:scale-105 min-w-[160px] flex-shrink-0">
				<div className="flex flex-col items-center space-y-3">
					<div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
						<Image
							src={brand.logo}
							alt={brand.name}
							width={32}
							height={32}
							className="w-8 h-8 object-contain"
						/>
					</div>
					<span className="font-semibold text-gray-900 dark:text-white text-center">
						{brand.name}
					</span>
				</div>
			</div>
		</Link>
	)
}

export default function Hero() {
	return (
		<section className="bg-gray-50 dark:bg-gray-900 py-8">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				{/* Hero Banner */}
				<HeroBanner />

				{/* Featured Products Section */}
				<div className="mb-12">
					<div className="flex items-center justify-between mb-6">
						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
								Grab the best deal on <span className="text-blue-600">Smartphones</span>
							</h2>
						</div>
						<Link 
							href="/products" 
							className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium flex items-center gap-1"
						>
							View All <ArrowRight className="h-4 w-4" />
						</Link>
					</div>

					{/* Horizontal scrolling products */}
					<div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
						{featuredProducts.map((product) => (
							<FeaturedProductCard key={product.id} product={product} />
						))}
					</div>
				</div>

				{/* Categories Section */}
				<div className="mb-12">
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
							Shop From <span className="text-blue-600">Top Categories</span>
						</h2>
						<Link 
							href="/categories" 
							className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium flex items-center gap-1"
						>
							View All <ArrowRight className="h-4 w-4" />
						</Link>
					</div>

					<div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
						{categories.map((category, index) => (
							<CategoryCard key={index} category={category} />
						))}
					</div>
				</div>

				{/* Brands Section */}
				<div className="mb-12">
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
							Top <span className="text-blue-600">Electronics Brands</span>
						</h2>
						<Link 
							href="/brands" 
							className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium flex items-center gap-1"
						>
							View All <ArrowRight className="h-4 w-4" />
						</Link>
					</div>

					<div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
						{brands.map((brand, index) => (
							<BrandCard key={index} brand={brand} />
						))}
					</div>
				</div>

				{/* Trust indicators */}
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
					{[
						{ icon: Shield, text: "100% Authentic Products", subtext: "Guaranteed genuine items" },
						{ icon: Truck, text: "Fast & Free Delivery", subtext: "Same day delivery available" },
						{ icon: Star, text: "5-Star Customer Service", subtext: "24/7 support available" },
						{ icon: Award, text: "Best Price Guarantee", subtext: "Lowest prices guaranteed" }
					].map((item, index) => (
						<div key={index} className="flex items-start space-x-3">
							<div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
								<item.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 dark:text-white text-sm">
									{item.text}
								</h3>
								<p className="text-xs text-gray-600 dark:text-gray-400">
									{item.subtext}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}