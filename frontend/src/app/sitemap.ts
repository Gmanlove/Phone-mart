import { MetadataRoute } from 'next'

const BASE_URL = 'https://smartcommunicationsltd.ng'

interface Product {
  _id: string;
  updatedAt?: string;
  createdAt?: string;
}

async function getProducts(): Promise<Product[]> {
  try {
    // Replace with your actual API endpoint
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products`, {
      next: { revalidate: 3600 } // Revalidate every hour
    })
    if (!response.ok) return []
    const data = await response.json()
    return data.products || []
  } catch (error) {
    console.error('Error fetching products for sitemap:', error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts()
  
  // Static pages
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/accessories`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/deals`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/support`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/track-order`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }
  ]

  // Dynamic product pages
  const productPages = products.map((product: Product) => ({
    url: `${BASE_URL}/products/${product._id}`,
    lastModified: new Date(product.updatedAt || product.createdAt || Date.now()),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...productPages]
}