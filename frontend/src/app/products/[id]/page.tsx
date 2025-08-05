"use client"

import { useEffect, useState } from "react"
import { notFound } from "next/navigation"
import { CldImage } from "next-cloudinary"
import { extractCloudinaryPublicId } from "@/lib/utils"
import { Star, Truck, Shield, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import ProductActionsSimple from "@/components/product/product-actions-simple"

// Define the Product type
interface Product {
  _id: string;
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  description?: string;
  category?: string;
  images?: string[];
}


async function fetchProduct(id: string): Promise<Product | null> {
  try {
    console.log(`Fetching product with ID: ${id}`)
    const res = await fetch(`http://localhost:5000/api/products/${id}`, {
      cache: 'no-store'
    })
    
    console.log(`Response status: ${res.status}`)
    
    if (!res.ok) {
      console.log(`Failed to fetch product: ${res.status} ${res.statusText}`)
      return null
    }
    
    const product = await res.json()
    console.log('Fetched product:', product)
    return product
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export default function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }>
}) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true)
        const resolvedParams = await params
        const fetchedProduct = await fetchProduct(resolvedParams.id)
        if (!fetchedProduct) {
          setError(true)
        } else {
          setProduct(fetchedProduct)
          // Set document title for SEO as a workaround
          document.title = `${fetchedProduct.name} - Smart Communications`
        }
      } catch (err) {
        console.error('Error loading product:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [params])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading product...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return notFound()
  }

  // Helper function to format price in Nigerian Naira
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price)
  }

  // Extract primary image
  const primaryImage = product.images && product.images.length > 0 ? product.images[0] : null
  const publicId = primaryImage ? extractCloudinaryPublicId(primaryImage) : null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="hover:text-blue-600 transition-colors">
              Products
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          href="/products"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative bg-gray-50 rounded-xl overflow-hidden aspect-square">
                {publicId ? (
                  <CldImage
                    width={600}
                    height={600}
                    src={publicId}
                    alt={product.name}
                    className="w-full h-full object-contain p-8"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-gray-400 text-sm">No Image</span>
                      </div>
                      <p className="text-gray-400">Image not available</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Thumbnail images - if there are multiple images */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.slice(0, 4).map((image, index) => {
                    const thumbPublicId = extractCloudinaryPublicId(image)
                    return (
                      <div key={index} className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 cursor-pointer transition-colors">
                          {thumbPublicId ? (
                            <CldImage
                              width={80}
                              height={80}
                              src={thumbPublicId}
                              alt={`${product.name} view ${index + 1}`}
                              className="w-full h-full object-contain p-2"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                              No img
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              {/* Brand and Title */}
              <div>
                <p className="text-sm font-medium text-blue-600 mb-2">{product.brand}</p>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(4.0) 156 reviews</span>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl lg:text-4xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-xl text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-100 text-red-700 border-0">
                      Save {formatPrice(product.originalPrice - product.price)}
                    </Badge>
                    <span className="text-sm text-green-600 font-medium">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* Category */}
              {product.category && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">Category</h3>
                  <Badge variant="secondary" className="text-sm">
                    {product.category}
                  </Badge>
                </div>
              )}

              {/* Service Features */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">Free Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-700">1 Year Warranty</span>
                </div>
              </div>

              {/* Product Actions */}
              <div className="pt-4">
                <ProductActionsSimple 
                  product={{
                    _id: product._id,
                    id: product._id,
                    name: product.name,
                    price: product.price,
                    image: primaryImage || "",
                    images: product.images
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Product Information */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Details */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Brand</span>
                  <p className="font-medium text-gray-900">{product.brand}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Category</span>
                  <p className="font-medium text-gray-900">{product.category || 'Smartphone'}</p>
                </div>
              </div>
              {product.description && (
                <div>
                  <span className="text-sm text-gray-500">Description</span>
                  <p className="font-medium text-gray-900">{product.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Shipping & Returns */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping & Returns</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900">Free Delivery</h3>
                  <p className="text-sm text-gray-600">Get free delivery on orders over ₦50,000</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900">Warranty</h3>
                  <p className="text-sm text-gray-600">1 year manufacturer warranty included</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}