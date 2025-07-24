"use client"
import { useState, ChangeEvent } from "react"

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
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setMessage("")
    setLoading(true)
    let imageUrl = ""
    if (imageFile) {
      const data = new FormData()
      data.append("image", imageFile)
      const res = await fetch("http://localhost:5000/api/admin/upload-image?adminEmail=admin@phonehub.com", {
        method: "POST",
        body: data
      })
      const imgData = await res.json()
      if (res.ok && imgData.url) imageUrl = imgData.url
      else {
        setMessage("Image upload failed")
        setLoading(false)
        return
      }
    }
    let specsObj = {}
    if (form.specs.trim()) {
      try {
        specsObj = JSON.parse(form.specs)
      } catch {
        setMessage("Specs must be valid JSON")
        setLoading(false)
        return
      }
    }
    const payload = {
      ...form,
      price: Number(form.price),
      images: [imageUrl],
      specs: specsObj
    }
    const res = await fetch("http://localhost:5000/api/admin/product?adminEmail=admin@phonehub.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
    const data = await res.json()
    setLoading(false)
    if (res.ok) setMessage("Product uploaded!")
    else setMessage(data.error || "Upload failed")
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Admin Product Upload</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold mb-1">Product Name</label>
          <input name="name" value={form.name} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Brand</label>
          <input name="brand" value={form.brand} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Price</label>
          <input name="price" type="number" value={form.price} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Category</label>
          <select name="category" value={form.category} onChange={handleChange} className="w-full p-2 border rounded">
            {categories.map(cat => <option key={cat}>{cat}</option>)}
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">Specs (JSON, e.g. {'{"ram":"8GB","storage":"256GB"}'})</label>
          <textarea name="specs" value={form.specs} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Product Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-32 object-contain rounded border" />}
        </div>
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded text-lg font-semibold hover:bg-blue-700 transition">
          {loading ? "Uploading..." : "Upload Product"}
        </button>
      </form>
      {message && <p className="mt-6 text-center text-lg text-green-600 font-semibold">{message}</p>}
    </div>
  )
}
