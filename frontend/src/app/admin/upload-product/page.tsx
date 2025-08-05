"use client"

import { useState } from "react"
import { 
  Upload, 
  Package, 
  DollarSign, 
  FileText, 
  Tag, 
  Smartphone, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  X,
  Plus,
  Image as ImageIcon,
  Star,
  Zap,
  Laptop,
  Headphones
} from "lucide-react"

const categories = [
  { value: "iPhone", label: "iPhone", icon: Smartphone },
  { value: "Samsung", label: "Samsung", icon: Smartphone },
  { value: "Android/Pixel", label: "Android/Pixel", icon: Smartphone },
  { value: "Laptops", label: "Laptops", icon: Laptop },
  { value: "Accessories", label: "Accessories", icon: Headphones },
  { value: "Hot Deals", label: "Hot Deals", icon: Zap },
  { value: "Other", label: "Other", icon: Package }
]

const subcategories = {
  "iPhone": ["iPhone 15", "iPhone 14", "iPhone 13", "iPhone 12", "iPhone 11", "iPhone SE"],
  "Samsung": ["Galaxy S24", "Galaxy S23", "Galaxy A Series", "Galaxy Note", "Galaxy Z Fold", "Galaxy Z Flip"],
  "Android/Pixel": ["Google Pixel", "OnePlus", "Xiaomi", "Huawei", "Oppo", "Vivo"],
  "Laptops": ["MacBook", "Dell", "HP", "Lenovo", "Asus", "Acer", "Gaming Laptops"],
  "Accessories": ["Cases & Covers", "Screen Protectors", "Chargers", "Headphones", "Speakers", "Power Banks"],
  "Hot Deals": ["Weekly Deals", "Flash Sales", "Clearance", "Refurbished"],
  "Other": ["Tablets", "Smartwatches", "Gaming", "Electronics"]
}

interface FormData {
  name: string
  brand: string
  price: string
  originalPrice: string
  description: string
  category: string
  subcategory: string
  specs: string
  stock: string
  isHotDeal: boolean
  hotDealDiscount: string
  tags: string[]
  images: File[]
}

export default function AdminUploadProduct() {
  const [form, setForm] = useState<FormData>({
    name: "",
    brand: "",
    price: "",
    originalPrice: "",
    description: "",
    category: categories[0].value,
    subcategory: "",
    specs: "",
    stock: "1",
    isHotDeal: false,
    hotDealDiscount: "",
    tags: [],
    images: []
  })
  
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error">("success")
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [specFields, setSpecFields] = useState<Array<{key: string, value: string}>>([
    { key: "", value: "" }
  ])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setForm({ ...form, [name]: checked })
    } else {
      setForm({ ...form, [name]: value })
    }

    // Auto-calculate hot deal price
    if (name === "price" || name === "hotDealDiscount") {
      const price = name === "price" ? parseFloat(value) : parseFloat(form.price)
      const discount = name === "hotDealDiscount" ? parseFloat(value) : parseFloat(form.hotDealDiscount)
      
      if (price && discount) {
        const discountedPrice = price - (price * discount / 100)
        setForm(prev => ({ ...prev, originalPrice: price.toString() }))
      }
    }
  }

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return
    
    const newImages = Array.from(files).slice(0, 5 - form.images.length)
    const newImageUrls = newImages.map(file => URL.createObjectURL(file))
    
    setForm(prev => ({ ...prev, images: [...prev.images, ...newImages] }))
    setImagePreviewUrls(prev => [...prev, ...newImageUrls])
  }

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imagePreviewUrls[index])
    setForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index))
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files) {
      handleImageUpload(e.dataTransfer.files)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !form.tags.includes(newTag.trim())) {
      setForm(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setForm(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }))
  }

  const addSpecField = () => {
    setSpecFields(prev => [...prev, { key: "", value: "" }])
  }

  const updateSpecField = (index: number, field: "key" | "value", value: string) => {
    setSpecFields(prev => prev.map((spec, i) => 
      i === index ? { ...spec, [field]: value } : spec
    ))
  }

  const removeSpecField = (index: number) => {
    setSpecFields(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setUploading(true)

    try {
      // Upload images first
      let imageUrls: string[] = []
      
      if (form.images.length > 0) {
        const imageFormData = new FormData()
        form.images.forEach(image => {
          imageFormData.append("images", image)
        })

        const imgRes = await fetch("http://localhost:5000/api/admin/upload-images?adminEmail=admin@phonehub.com", {
          method: "POST",
          body: imageFormData
        })
        
        const imgData = await imgRes.json()
        if (imgRes.ok && imgData.urls) {
          imageUrls = imgData.urls
        } else {
          throw new Error("Image upload failed")
        }
      }

      // Prepare specs object
      const specs: Record<string, string> = {}
      specFields.forEach(field => {
        if (field.key.trim() && field.value.trim()) {
          specs[field.key.trim()] = field.value.trim()
        }
      })

      // Prepare product data
      const productData = {
        name: form.name,
        brand: form.brand,
        price: parseFloat(form.price),
        originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
        description: form.description,
        category: form.category,
        subcategory: form.subcategory,
        specs,
        images: imageUrls,
        stock: parseInt(form.stock),
        isHotDeal: form.isHotDeal,
        hotDealDiscount: form.hotDealDiscount ? parseFloat(form.hotDealDiscount) : 0,
        tags: form.tags
      }

      const response = await fetch("http://localhost:5000/api/admin/product?adminEmail=admin@phonehub.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData)
      })

      const data = await response.json()
      
      if (response.ok) {
        setMessage("Product uploaded successfully!")
        setMessageType("success")
        
        // Reset form
        setForm({
          name: "",
          brand: "",
          price: "",
          originalPrice: "",
          description: "",
          category: categories[0].value,
          subcategory: "",
          specs: "",
          stock: "1",
          isHotDeal: false,
          hotDealDiscount: "",
          tags: [],
          images: []
        })
        setImagePreviewUrls([])
        setSpecFields([{ key: "", value: "" }])
      } else {
        throw new Error(data.error || "Upload failed")
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Network error occurred")
      setMessageType("error")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Upload New Product</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Add a new product to your store inventory</p>
        </div>
        <div className="flex items-center space-x-3">
          <Package className="h-8 w-8 text-blue-600" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Basic Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Information */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Product Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
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
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
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
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
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
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Subcategory
                  </label>
                  <select
                    name="subcategory"
                    value={form.subcategory}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Select subcategory</option>
                    {subcategories[form.category as keyof typeof subcategories]?.map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Product Description *
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

            {/* Pricing */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Pricing & Deals
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
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
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Original Price (₦)
                  </label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={form.originalPrice}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Hot Deal Toggle */}
              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Zap className="h-5 w-5 text-yellow-600 mr-2" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Hot Deal</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Mark this product as a hot deal</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="isHotDeal"
                      checked={form.isHotDeal}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                {form.isHotDeal && (
                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Discount Percentage (%)
                    </label>
                    <input
                      type="number"
                      name="hotDealDiscount"
                      value={form.hotDealDiscount}
                      onChange={handleChange}
                      min="0"
                      max="100"
                      placeholder="0"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Product Specifications */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Product Specifications
              </h2>
              
              <div className="space-y-4">
                {specFields.map((spec, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <input
                      type="text"
                      placeholder="Specification name (e.g., Display)"
                      value={spec.key}
                      onChange={(e) => updateSpecField(index, "key", e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="Specification value (e.g., 6.7-inch Super Retina XDR)"
                      value={spec.value}
                      onChange={(e) => updateSpecField(index, "value", e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    {specFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSpecField(index)}
                        className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addSpecField}
                  className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Specification
                </button>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Tag className="h-5 w-5 mr-2" />
                Product Tags
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder="Add tags (e.g., flagship, 5G, wireless charging)"
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add
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
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Images */}
          <div className="space-y-6">
            {/* Image Upload */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <ImageIcon className="h-5 w-5 mr-2" />
                Product Images
              </h2>
              
              {/* Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Drop images here or click to upload
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Support: JPG, PNG (Max 5 images)
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files)}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Images
                </label>
              </div>

              {/* Image Previews */}
              {imagePreviewUrls.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {imagePreviewUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                      {index === 0 && (
                        <div className="absolute bottom-2 left-2 px-2 py-1 bg-blue-600 text-white text-xs rounded">
                          Main
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Preview */}
            {form.name && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Product Preview</h3>
                <div className="space-y-3">
                  <div className="font-medium text-gray-900 dark:text-white">{form.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{form.brand}</div>
                  <div className="flex items-center space-x-2">
                    {form.price && (
                      <span className="text-lg font-bold text-blue-600">
                        ₦{parseFloat(form.price).toLocaleString()}
                      </span>
                    )}
                    {form.originalPrice && parseFloat(form.originalPrice) > parseFloat(form.price) && (
                      <span className="text-sm text-gray-500 line-through">
                        ₦{parseFloat(form.originalPrice).toLocaleString()}
                      </span>
                    )}
                  </div>
                  {form.isHotDeal && (
                    <div className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      <Zap className="h-3 w-3 mr-1" />
                      Hot Deal
                    </div>
                  )}
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Category: {form.category}
                    {form.subcategory && ` > ${form.subcategory}`}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Stock: {form.stock} units
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            {message && (
              <div className={`flex items-center space-x-2 ${
                messageType === "success" ? "text-green-600" : "text-red-600"
              }`}>
                {messageType === "success" ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <AlertCircle className="h-5 w-5" />
                )}
                <span className="font-medium">{message}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Reset Form
            </button>
            <button
              type="submit"
              disabled={uploading || !form.name || !form.price || form.images.length === 0}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {uploading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5" />
                  <span>Upload Product</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}