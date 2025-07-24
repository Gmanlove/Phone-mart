"use client"
import { useState } from "react"

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
  const [uploading, setUploading] = useState(false)

  const handleChange = (e: any) => {
    const { name, value, files } = e.target
    if (name === "imageFile") {
      setForm({ ...form, imageFile: files[0] })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setMessage("")
    setUploading(true)
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
        setMessage("Image upload failed")
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
    setUploading(false)
    if (res.ok) setMessage("Product uploaded!")
    else setMessage(data.error || "Upload failed")
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Upload Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required className="w-full p-2 border rounded" />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required className="w-full p-2 border rounded" />
        <select name="category" value={form.category} onChange={handleChange} className="w-full p-2 border rounded">
          {categories.map(cat => <option key={cat}>{cat}</option>)}
        </select>
        <textarea name="specs" placeholder='Specs (e.g. RAM: 8GB, Storage: 256GB)' value={form.specs} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="imageFile" type="file" accept="image/*" onChange={handleChange} className="w-full p-2 border rounded" required />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded" disabled={uploading}>{uploading ? "Uploading..." : "Upload Product"}</button>
      </form>
      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </div>
  )
}
