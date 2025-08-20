"use client"

import { useEffect, useState, useCallback } from "react"
import { Search, Trash2, RefreshCw, Plus, AlertCircle, Check, X, Grid, List, DollarSign, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Product {
  _id: string
  name: string
  brand: string
  category: string
  subcategory?: string
  price: number
  originalPrice?: number
  stock: number
  isHotDeal: boolean
  hotDealDiscount: number
  tags: string[]
  images: string[]
  description: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface ProductsResponse {
  products: Product[]
  totalPages: number
  currentPage: number
  total: number
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "table">("table")
  const [sortBy, setSortBy] = useState("createdAt")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const categories = ["all", "iPhone", "Samsung", "Android/Pixel", "Accessories", "Laptops", "Hot Deals", "Other"]

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "20",
        sort: sortOrder === "desc" ? `-${sortBy}` : sortBy,
      })

      if (selectedCategory !== "all") params.append("category", selectedCategory)
      if (searchTerm) params.append("search", searchTerm)

      const res = await fetch(
        `https://smartcoms.onrender.com/api/admin/products?adminEmail=admin@phonehub.com&${params}`,
      )
      if (res.ok) {
        const data: ProductsResponse = await res.json()
        setProducts(data.products)
        setTotalPages(data.totalPages)
      } else {
        setError("Failed to load products")
      }
    } catch (error) {
      console.error("Network error:", error)
      setError("Network error occurred")
    } finally {
      setLoading(false)
    }
  }, [currentPage, selectedCategory, searchTerm, sortBy, sortOrder])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleDelete = async (productId: string) => {
    try {
      const res = await fetch(
        `https://smartcoms.onrender.com/api/admin/product/${productId}?adminEmail=admin@phonehub.com`,
        {
          method: "DELETE",
        },
      )

      if (res.ok) {
        setProducts(products.filter((p) => p._id !== productId))
        setDeleteConfirm(null)
      } else {
        setError("Failed to delete product")
      }
    } catch (error) {
      console.error("Delete error:", error)
      setError("Network error occurred")
    }
  }

  const handleUpdatePrice = async (productId: string, newPrice: number) => {
    try {
      const res = await fetch(
        `https://smartcoms.onrender.com/api/admin/product/${productId}?adminEmail=admin@phonehub.com`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ price: newPrice }),
        },
      )

      if (res.ok) {
        const updatedProduct = await res.json()
        setProducts(products.map((p) => (p._id === productId ? updatedProduct.product : p)))
      } else {
        setError("Failed to update price")
      }
    } catch (error) {
      console.error("Update price error:", error)
      setError("Network error occurred")
    }
  }

  const toggleProductActive = async (productId: string, isActive: boolean) => {
    try {
      const res = await fetch(
        `https://smartcoms.onrender.com/api/admin/product/${productId}?adminEmail=admin@phonehub.com`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isActive }),
        },
      )

      if (res.ok) {
        setProducts(products.map((p) => (p._id === productId ? { ...p, isActive } : p)))
      }
    } catch (error) {
      console.error("Toggle active error:", error)
      setError("Failed to update product status")
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading && products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Products</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your product inventory</p>
        </div>
        <Link
          href="/admin/upload-product"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </Link>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="lg:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="lg:w-48">
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split("-")
                setSortBy(field)
                setSortOrder(order as "asc" | "desc")
              }}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="price-asc">Price Low-High</option>
              <option value="price-desc">Price High-Low</option>
              <option value="stock-asc">Stock Low-High</option>
              <option value="stock-desc">Stock High-Low</option>
            </select>
          </div>

          {/* View Mode */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "table"
                  ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "grid"
                  ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={fetchProducts}
            className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            <span className="text-red-800 dark:text-red-200">{error}</span>
          </div>
        </div>
      )}

      {/* Products Display */}
      {viewMode === "table" ? (
        /* Table View */
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div>
            <table className="w-full table-fixed">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stock</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-2 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-2 py-2">
                      <div className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0">
                          <Image
                            src={product.images[0] || "/placeholder-product.jpg"}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{product.brand}</div>
                          {product.isHotDeal && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 mt-1">Hot Deal {product.hotDealDiscount}% OFF</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-2">
                      <div className="text-sm text-gray-900 dark:text-white">{product.category}</div>
                      {product.subcategory && (<div className="text-xs text-gray-500 dark:text-gray-400">{product.subcategory}</div>)}
                    </td>
                    <td className="px-2 py-2">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(product.price)}</div>
                      {product.originalPrice && product.originalPrice > product.price && (<div className="text-xs text-gray-500 dark:text-gray-400 line-through">{formatCurrency(product.originalPrice)}</div>)}
                    </td>
                    <td className="px-2 py-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${product.stock > 10 ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" : product.stock > 0 ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400" : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"}`}>{product.stock} in stock</span>
                    </td>
                    <td className="px-2 py-2">
                      <button onClick={() => toggleProductActive(product._id, !product.isActive)} className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${product.isActive ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"}`}>{product.isActive ? "Active" : "Inactive"}</button>
                    </td>
                    <td className="px-2 py-2 text-sm text-gray-500 dark:text-gray-400">{formatDate(product.createdAt)}</td>
                    <td className="px-2 py-2 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <QuickPriceEdit product={product} onUpdate={(newPrice) => handleUpdatePrice(product._id, newPrice)} />
                        <button onClick={() => setDeleteConfirm(product._id)} className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Delete Product"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <Image
                  src={product.images[0] || "/placeholder-product.jpg"}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                {product.isHotDeal && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
                    {product.hotDealDiscount}% OFF
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => toggleProductActive(product._id, !product.isActive)}
                    className={`p-2 rounded-lg text-xs font-medium ${
                      product.isActive ? "bg-green-500 text-white" : "bg-gray-500 text-white"
                    }`}
                  >
                    {product.isActive ? "Active" : "Inactive"}
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2">{product.name}</h3>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{product.brand}</p>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {formatCurrency(product.price)}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 line-through ml-2">
                        {formatCurrency(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      product.stock > 10
                        ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                        : product.stock > 0
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                    }`}
                  >
                    {product.stock} left
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{product.category}</span>
                  <div className="flex items-center space-x-1">
                    <QuickPriceEdit
                      product={product}
                      onUpdate={(newPrice) => handleUpdatePrice(product._id, newPrice)}
                    />
                    <button
                      onClick={() => setDeleteConfirm(product._id)}
                      className="p-1 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Previous
            </button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {page}
                  </button>
                )
              })}
            </div>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Confirm Delete</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && products.length > 0 && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
            <div className="flex items-center">
              <Loader2 className="animate-spin h-6 w-6 text-blue-600 mr-3" />
              <span className="text-gray-900 dark:text-white">Loading products...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Quick Price Edit Component
function QuickPriceEdit({ product, onUpdate }: { product: Product; onUpdate: (newPrice: number) => void }) {
  const [isEditing, setIsEditing] = useState(false)
  const [newPrice, setNewPrice] = useState(product.price.toString())
  const [loading, setLoading] = useState(false)

  const handleUpdate = async () => {
    const price = Number.parseFloat(newPrice)
    if (isNaN(price) || price < 0) return

    setLoading(true)
    await onUpdate(price)
    setLoading(false)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="flex items-center space-x-1">
        <input
          type="number"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          className="w-20 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          step="0.01"
          min="0"
        />
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="p-1 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/20 rounded"
        >
          {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
        </button>
        <button
          onClick={() => {
            setIsEditing(false)
            setNewPrice(product.price.toString())
          }}
          className="p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900/20 rounded"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setIsEditing(true)}
      className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
      title="Edit Price"
    >
      <DollarSign className="w-4 h-4" />
    </button>
  )
}
