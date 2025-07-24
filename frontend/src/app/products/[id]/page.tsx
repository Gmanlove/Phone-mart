import { notFound } from "next/navigation"
import Image from "next/image"

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
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0].startsWith("/uploads") ? `http://localhost:5000${product.images[0]}` : product.images[0]}
              alt={product.name}
              width={500}
              height={500}
              className="rounded-lg object-cover w-full h-auto"
            />
          ) : (
            <div className="bg-gray-100 h-96 w-full rounded-lg" />
          )}
        </div>
        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-lg text-gray-600 mb-4">{product.brand} &bull; {product.category}</p>
          <p className="text-2xl font-bold text-blue-600 mb-4">${product.price}</p>
          <p className="mb-6 text-gray-700">{product.description}</p>
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Specifications</h2>
              <ul className="list-disc pl-6 text-gray-700">
                {Object.entries(product.specs).map(([key, value]) => (
                  <li key={key}><span className="font-medium capitalize">{key}:</span> {String(value)}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}