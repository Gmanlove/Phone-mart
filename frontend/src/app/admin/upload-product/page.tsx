"use client"

import { useState } from "react"
import { Upload, Package, DollarSign, FileText, Tag, Smartphone, Loader2, CheckCircle, AlertCircle, X, Plus, Image as ImageIcon } from "lucide-react"

const categories = [
  "iPhone",
  "Samsung", 
  "Android/Pixel",
  "Accessories",
  "Laptops",
  "Hot Deals",
  "Other"
]

const phoneSubcategories = {
  "iPhone": ["iPhone 15", "iPhone 14", "iPhone 13", "iPhone 12", "iPhone SE"],
  "Samsung": ["Galaxy S24", "Galaxy S23", "Galaxy A Series", "Galaxy Note", "Galaxy Z Fold", "Galaxy Z Flip"],
  "Android/Pixel": ["Google Pixel", "OnePlus", "Xiaomi", "Huawei", "Tecno", "Infinix", "Oppo"],
  "Accessories": ["Cases & Covers", "Screen Protectors", "Chargers", "Power Banks", "Headphones", "Cables", "Stands"],
  "Laptops": ["Gaming Laptops", "Business Laptops", "Ultrabooks", "2-in-1 Laptops", "MacBooks"],
  "Hot Deals": ["Limited Time Offers", "Clearance", "Bundle Deals", "Refurbished"],
  "Other": ["Tablets", "Smartwatches", "Smart Home", "Gaming"]
}

export default function AdminUploadProduct() {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    originalPrice: "",
    description: "",
    category: categories[0],
    subcategory: "",
    specs: "",
    stock: "1",
    isHotDeal: false,
    hotDealDiscount: "",
    tags: [] as string[],
  })
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error">("success")
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [currentTag, setCurrentTag] = useState("")

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target
    
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked })
    } else {
      setForm({ ...form, [name]: value })
      
      // Reset subcategory when category changes
      if (name === "category") {
        setForm(prev => ({ ...prev, subcategory: "" }))
      }
    }
  }

  const handleImageSelect = (e: any) => {
    const files = Array.from(e.target.files) as File[]
    addImages(files)
  }

  const addImages = (files: File[]) => {
    const validFiles = files.filter(file => {
      const isValid = file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024 // 5MB max
      if (!isValid && file.size > 5 * 1024 * 1024) {
        setMessage(`File ${file.name} is too large. Maximum size is 5MB.`)
        setMessageType("error")
      }
      return isValid
    })

    if (images.length + validFiles.length > 5) {
      setMessage("Maximum 5 images allowed")
      setMessageType("error")
      return
    }

    const newImages = [...images, ...validFiles]
    setImages(newImages)

    // Create previews
    const newPreviews = validFiles.map(file => URL.createObjectURL(file))
    setImagePreviews([...imagePreviews, ...newPreviews])
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    const newPreviews = imagePreviews.filter((_, i) => i !== index)
    
    // Revoke object URL to prevent memory leaks
    URL.revokeObjectURL(imagePreviews[index])
    
    setImages(newImages)
    setImagePreviews(newPreviews)
  }

  const handleDrag = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files) as File[]
      addImages(files)
    }
  }

  const addTag = () => {
    if (currentTag.trim() && !form.tags.includes(currentTag.trim())) {
      setForm({
        ...form,
        tags: [...form.tags, currentTag.trim()]
      })
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setForm({
      ...form,
      tags: form.tags.filter(tag => tag !== tagToRemove)
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setMessage("")
    setUploading(true)
    
    try {
      // Validate required fields
      if (!form.name || !form.brand || !form.price || !form.description) {
        setMessage("Please fill in all required fields")
        setMessageType("error")
        setUploading(false)
        return
      }

      if (images.length === 0) {
        setMessage("Please upload at least one image")
        setMessageType("error")
        setUploading(false)
        return
      }

      // Upload images first
      const imageUrls: string[] = []
      
      for (const image of images) {
        const formData = new FormData()
        formData.append("image", image)
        
        const imgRes = await fetch("http://localhost:5000/api/admin/upload-image?adminEmail=admin@phonehub.com", {
          method: "POST",
          body: formData
        })
        
        const imgJson = await imgRes.json()
        if (imgRes.ok && imgJson.url) {
          imageUrls.push(imgJson.url)
        } else {
          throw new Error("Image upload failed")
        }
      }

      // Prepare product data
      const productData = {
        name: form.name,
        brand: form.brand,
        price: Number(form.price),
        originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
        description: form.description,
        category: form.category,
        subcategory: form.subcategory,
        specs: form.specs,
        images: imageUrls,
        stock: Number(form.stock),
        isHotDeal: form.isHotDeal,
        hotDealDiscount: form.hotDealDiscount ? Number(form.hotDealDiscount) : 0,
        tags: form.tags
      }

      // Create product
      const res = await fetch("http://localhost:5000/api/admin/product?adminEmail=admin@phonehub.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData)
      })
      
      const data = await res.json()
      
      if (res.ok) {
        setMessage("Product uploaded successfully!")
        setMessageType("success")
        
        // Reset form
        setForm({
          name: "",
          brand: "",
          price: "",
          originalPrice: "",
          description: "",
          category: categories[0],
          subcategory: "",
          specs: "",
          stock: "1",
          isHotDeal: false,
          hotDealDiscount: "",
          tags: [],
        })
        setImages([])
        setImagePreviews([])
      } else {
        setMessage(data.error || "Upload failed")
        setMessageType("error")
      }
    } catch (error) {
      setMessage("Network error. Please try again.")
      setMessageType("error")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Upload New Product</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Add a new product to your store inventory</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Product Images */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Product Images</h3>
          
          {/* Image Upload Area */}
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              dragActive 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10' 
                : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Drop images here or click to upload
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Maximum 5 images, up to 5MB each
            </p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
            >
              <ImageIcon className="w-5 h-5 mr-2" />
              Select Images
            </label>
          </div>

          {/* Image Previews */}
          {imagePreviews.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Selected Images ({imagePreviews.length}/5)
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Basic Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Basic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="e.g., iPhone 15 Pro Max"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Brand *
              </label>
              <input
                type="text"
                name="brand"
                value={form.brand}
                onChange={handleChange}
                required
                placeholder="e.g., Apple"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {phoneSubcategories[form.category as keyof typeof phoneSubcategories] && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subcategory
                </label>
                <select
                  name="subcategory"
                  value={form.subcategory}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select subcategory</option>
                  {phoneSubcategories[form.category as keyof typeof phoneSubcategories].map(subcat => (
                    <option key={subcat} value={subcat}>{subcat}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price (₦) *
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="0.00"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Original Price (₦)
              </label>
              <input
                type="number"
                name="originalPrice"
                value={form.originalPrice}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="For discounted items"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Stock Quantity *
              </label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                required
                min="0"
                placeholder="1"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Detailed product description..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Hot Deal Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Hot Deal Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isHotDeal"
                id="isHotDeal"
                checked={form.isHotDeal}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isHotDeal" className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Mark as Hot Deal
              </label>
            </div>

            {form.isHotDeal && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Discount Percentage
                  </label>
                  <input
                    type="number"
                    name="hotDealDiscount"
                    value={form.hotDealDiscount}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    placeholder="e.g., 20"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Specifications</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Technical Specifications
            </label>
            <textarea
              name="specs"
              value={form.specs}
              onChange={handleChange}
              rows={6}
              placeholder="Enter specifications in JSON format or plain text..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              You can enter plain text or JSON format. Example: {"{"}"display": "6.1 inch", "storage": "128GB"{"}"} 
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Tags</h3>
          
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Add a tag (e.g., flagship, budget, gaming)"
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {form.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {form.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
          <div>
            {message && (
              <div className={`flex items-center gap-2 text-sm font-medium ${
                messageType === "success" ? "text-green-600" : "text-red-600"
              }`}>
                {messageType === "success" ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                {message}
              </div>
            )}
          </div>
          
          <button
            type="submit"
            disabled={uploading}
            className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {uploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Package className="w-5 h-5" />
                Upload Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}