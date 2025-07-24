"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const [form, setForm] = useState({ email: "", password: "" })
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    const res = await fetch("http://localhost:5000/api/auth/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    setLoading(false)
    if (res.ok && data.isAdmin) {
      localStorage.setItem("isAdmin", "true")
      router.push("/admin/upload-product")
    } else {
      setMessage(data.error || "Not authorized as admin")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow max-w-md w-full space-y-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        <input name="email" type="email" placeholder="Admin Email" value={form.email} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded" disabled={loading}>{loading ? "Logging in..." : "Login as Admin"}</button>
        {message && <p className="text-center text-red-500">{message}</p>}
      </form>
    </div>
  )
}
