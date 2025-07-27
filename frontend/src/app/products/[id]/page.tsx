import { notFound } from "next/navigation"
import { CldImage } from "next-cloudinary"
import { extractCloudinaryPublicId } from "@/lib/utils"

async function fetchProduct(id: string) {
  const res = await fetch(`http://localhost:5000/api/products/${id}`)
  if (!res.ok) return null
  return res.json()
}

export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = await params;
  const product = await fetchProduct(resolvedParams.id);
  
  if (!product) return notFound()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <nav className="flex text-sm text-gray-600">
              <span className="hover:text-gray-900 cursor-pointer">Home</span>
              <span className="mx-2">/</span>
              <span className="hover:text-gray-900 cursor-pointer capitalize">{product.category}</span>
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-medium truncate">{product.name}</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            
            {/* Product Image Section */}
            <div className="relative bg-gray-50 p-4 sm:p-6 lg:p-8">
              <div className="aspect-square relative overflow-hidden rounded-xl bg-white shadow-lg">
                {product.images && product.images.length > 0 ? (
                  <CldImage
                    src={extractCloudinaryPublicId(product.images[0]) || "sample"}
                    alt={product.name}
                    width={500}
                    height={500}
                    crop={{ type: 'fill' }}
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority
                  />
                ) : (
                  <CldImage
                    src="sample"
                    alt="No image"
                    width={500}
                    height={500}
                    crop={{ type: 'fill' }}
                    className="object-contain p-4"
                  />
                )}
              </div>
              
              {/* Additional product images thumbnails (placeholder for future enhancement) */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {product.images.slice(1, 5).map((image: string, index: number) => (
                    <div key={index} className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-white shadow-md">
                      <CldImage
                        src={image.replace(/^.*\/([^/]+)\.[a-zA-Z]+$/, '$1')}
                        alt={`${product.name} view ${index + 2}`}
                        width={64}
                        height={64}
                        crop={{ type: 'fill' }}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Section */}
            <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div className="space-y-6">
                {/* Product Header */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {product.brand}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 capitalize">
                      {product.category}
                    </span>
                  </div>
                  
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
                    {product.name}
                  </h1>
                  
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-3xl sm:text-4xl font-bold text-emerald-600">
                      ${Number(product.price).toLocaleString()}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-lg text-gray-500 line-through">
                        ${Number(product.originalPrice).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Product Description */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    {product.description || "No description available for this product."}
                  </p>
                </div>

                {/* Specifications */}
                {product.specs && Object.keys(product.specs).length > 0 && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h2>
                    <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                      <dl className="grid grid-cols-1 gap-3">
                        {Object.entries(product.specs).map(([key, value]) => (
                          <div key={key} className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-200 last:border-b-0">
                            <dt className="font-medium text-gray-900 capitalize mb-1 sm:mb-0">
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </dt>
                            <dd className="text-gray-700 sm:text-right sm:max-w-xs">
                              {String(value)}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-8 border-t border-gray-200 mt-8">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Add to Cart
                  </button>
                  <button className="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Save
                    </span>
                  </button>
                </div>
                
                {/* Additional Info */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-sm text-gray-600">
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>In Stock</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Fast Delivery</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Warranty</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section (Placeholder) */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
                <div className="aspect-square bg-gray-100 rounded-lg mb-3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-100 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}