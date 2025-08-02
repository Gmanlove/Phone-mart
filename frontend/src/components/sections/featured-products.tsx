"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product/product-card"
import { useEffect, useState } from "react"
import { fetchProducts } from "@/lib/api"
import { CldImage } from "next-cloudinary";
import { extractCloudinaryPublicId } from "@/lib/utils";

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
		reviews: 620,
		features: ["Snapdragon 8 Gen 3", "Fast Charging", "OxygenOS"],
		inStock: true,
		isNew: false,
	},
	{
		id: "5",
		name: "iPhone 14",
		brand: "Apple",
		price: 699,
		originalPrice: 799,
		image: "sample",
		rating: 4.7,
		reviews: 2100,
		features: ["A15 Bionic", "Dual Camera", "All-Day Battery"],
		inStock: true,
		isNew: false,
	},
	{
		id: "6",
		name: "Samsung Galaxy A54",
		brand: "Samsung",
		price: 449,
		originalPrice: 499,
		image: "sample",
		rating: 4.4,
		reviews: 890,
		features: ["50MP Camera", "5000mAh Battery", "Super AMOLED"],
		inStock: true,
		isNew: false,
	},
	{
		id: "7",
		name: "Google Pixel 7a",
		brand: "Google",
		price: 399,
		originalPrice: 449,
		image: "sample",
		rating: 4.5,
		reviews: 1100,
		features: ["Google Tensor G2", "Wireless Charging", "Pixel Camera"],
		inStock: false,
		isNew: false,
	},
	{
		id: "8",
		name: "OnePlus Nord 3",
		brand: "OnePlus",
		price: 329,
		originalPrice: 379,
		image: "sample",
		rating: 4.3,
		reviews: 450,
		features: ["MediaTek Dimensity", "Triple Camera", "Fast Charging"],
		inStock: true,
		isNew: false,
	},
]

export default function FeaturedProducts() {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState("")

	useEffect(() => {
		setLoading(true)
		fetchProducts()
			.then((data) => {
				setProducts(data.filter((p: any) => p.isFeatured))
				setLoading(false)
			})
			.catch(() => {
				setError("Failed to load featured products")
				setLoading(false)
			})
	}, [])

	if (loading)
		return <div className="py-12 text-center text-lg text-gray-500">Loading featured products...</div>
	if (error) return <div className="py-12 text-center text-lg text-red-500">{error}</div>

	return (
		<section className="py-16 bg-gray-50">
			<div className="container mx-auto px-4">
				<div className="text-center mb-12">
					<h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
						Featured Products
					</h2>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						Discover our handpicked selection of the latest and most popular
						smartphones
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
					{featuredProducts.map((product) => (
						<div key={product.id} className="...">
							<CldImage
								width={300}
								height={300}
								src={extractCloudinaryPublicId(product.image) || "placeholder"}
								alt={product.name}
								className="w-full h-56 object-contain p-4"
							/>
						</div>
					))}
				</div>

				<div className="text-center">
					<Button asChild size="lg" variant="outline">
						<Link href="/products">View All Products</Link>
					</Button>
				</div>
			</div>
		</section>
	)
}
