"use client"
import { useEffect, useState } from "react"

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to load products")
        setLoading(false)
      })
  }, [])

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">All Uploaded Products</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <table className="w-full border mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Brand</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="text-center">
              <td className="p-2 border">{p.name}</td>
              <td className="p-2 border">{p.brand}</td>
              <td className="p-2 border">{p.category}</td>
              <td className="p-2 border">${p.price}</td>
              <td className="p-2 border">{p.isBought ? "Bought" : "Available"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
