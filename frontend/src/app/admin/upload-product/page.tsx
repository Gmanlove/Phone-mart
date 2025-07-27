"use client"
import { useState } from "react"
import { Upload, Package, DollarSign, FileText, Tag, Smartphone, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { CldImage } from "next-cloudinary"

const categories = [
  "iPhone",
  "Samsung",
  "Android/Pixel",
  "Accessories",
  "Other"
]

export default function AdminUploadProduct() {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
    category: categories[0],
    specs: "",
    imageFile: null as File | null,
  })
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error">("success")
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleChange = (e: any) => {
    const { name, value, files } = e.target
    if (name === "imageFile") {
      setForm({ ...form, imageFile: files[0] })
    } else {
      setForm({ ...form, [name]: value })
    }
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
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setForm({ ...form, imageFile: e.dataTransfer.files[0] })
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setMessage("")
    setUploading(true)
    
    try {
      let imagePath = ""
      if (form.imageFile) {
        const imgData = new FormData()
        imgData.append("image", form.imageFile)
        const imgRes = await fetch("http://localhost:5000/api/admin/upload-image?adminEmail=admin@phonehub.com", {
          method: "POST",
          body: imgData
        })
        const imgJson = await imgRes.json()
        if (imgRes.ok && imgJson.url) {
          imagePath = imgJson.url
        } else {
          setMessage("Image upload failed. Please try again.")
          setMessageType("error")
          setUploading(false)
          return
        }
      }

      const payload = {
        name: form.name,
        brand: form.brand,
        price: Number(form.price),
        description: form.description,
        category: form.category,
        specs: form.specs,
        images: [imagePath]
      }

      const res = await fetch("http://localhost:5000/api/admin/product?adminEmail=admin@phonehub.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      
      if (res.ok) {
        setMessage("Product uploaded successfully!")
        setMessageType("success")
        // Reset form on success
        setForm({
          name: "",
          brand: "",
          price: "",
          description: "",
          category: categories[0],
          specs: "",
          imageFile: null,
        })
      } else {
        setMessage(data.error || "Upload failed. Please check your inputs and try again.")
        setMessageType("error")
      }
    } catch (error) {
      setMessage("Network error. Please check your connection and try again.")
      setMessageType("error")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-4 px-4 sm:py-8 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-600 rounded-full">
              <Package className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Upload New Product
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Add a new product to your inventory. Fill in all the required fields below to create a comprehensive product listing.
          </p>
        </div>

        {/* Main Form Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="space-y-6 sm:space-y-8">
              {/* Basic Information Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 pb-2 border-b border-gray-200">
                  <Smartphone className="w-5 h-5 text-blue-600" />
                  Basic Information
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Product Name *
                    </label>
                    <div className="relative">
                      <input
                        name="name"
                        placeholder="Enter product name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Brand *
                    </label>
                    <input
                      name="brand"
                      placeholder="Enter brand name"
                      value={form.brand}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Price *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        name="price"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={form.price}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Category *
                    </label>
                    <div className="relative">
                      <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 appearance-none bg-white"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 pb-2 border-b border-gray-200">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Product Details
                </h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      placeholder="Enter a detailed product description..."
                      value={form.description}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Specifications
                    </label>
                    <textarea
                      name="specs"
                      placeholder="RAM: 8GB, Storage: 256GB, Display: 6.1 inch, etc."
                      value={form.specs}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Image Upload Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 pb-2 border-b border-gray-200">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Product Image
                </h3>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Upload Image *
                  </label>
                  
                  <div
                    className={`relative border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-all duration-200 ${
                      dragActive 
                        ? 'border-blue-500 bg-blue-50' 
                        : form.imageFile 
                          ? 'border-green-400 bg-green-50' 
                          : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      name="imageFile"
                      type="file"
                      accept="image/*"
                      onChange={handleChange}
                      required
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    
                    <div className="space-y-3">
                      {form.imageFile ? (
                        <>
                          <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                          <div>
                            <p className="text-green-700 font-medium">{form.imageFile.name}</p>
                            <p className="text-sm text-green-600">File selected successfully</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                          <div>
                            <p className="text-gray-700 font-medium">Drop your image here or click to browse</p>
                            <p className="text-sm text-gray-500">Supports JPG, PNG, WebP up to 10MB</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                onClick={handleSubmit}
                disabled={uploading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Uploading Product...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Upload Product
                  </>
                )}
              </button>
            </div>

            {/* Success/Error Message */}
            {message && (
              <div className={`mt-6 p-4 rounded-xl border flex items-center gap-3 ${
                messageType === "success" 
                  ? "bg-green-50 border-green-200 text-green-800" 
                  : "bg-red-50 border-red-200 text-red-800"
              }`}>
                {messageType === "success" ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                )}
                <p className="font-medium">{message}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}