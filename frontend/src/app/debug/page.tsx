"use client"

import { useState, useEffect } from "react"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://smartcoms.onrender.com"

export default function DebugPage() {
  type Product = { _id: string; name: string }
  const [products, setProducts] = useState<Product[]>([])
  const [testId, setTestId] = useState("")
  type TestResult = { success: boolean; data?: unknown; error?: unknown } | null
  const [testResult, setTestResult] = useState<TestResult>(null)

  useEffect(() => {
    console.log('Debug: Using API_BASE_URL =', API_BASE_URL)
    
    // Fetch all products to see their IDs
    fetch(`${API_BASE_URL}/api/products`)
      .then(res => {
        console.log('Debug: Response status =', res.status)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(data => {
        console.log("All products:", data)
        console.log("Product count:", data.length)
        setProducts(data)
      })
      .catch(err => {
        console.error("Error:", err)
        setProducts([])
      })
  }, [])

  const testProductFetch = async () => {
    if (!testId) return
    
    try {
      console.log(`Testing fetch for ID: ${testId}`)
      const response = await fetch(`${API_BASE_URL}/api/products/${testId}`)
      console.log(`Response status: ${response.status}`)
      
      if (response.ok) {
        const product = await response.json()
        setTestResult({ success: true, data: product })
      } else {
        const error = await response.json()
        setTestResult({ success: false, error })
      }
    } catch (err) {
      console.error("Fetch error:", err)
      const errorMessage = typeof err === "object" && err !== null && "message" in err ? (err as { message: string }).message : String(err)
      setTestResult({ success: false, error: errorMessage })
    }
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Debug Page</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">All Products</h2>
        <div className="space-y-2">
          {products.map((product, index) => (
            <div key={index} className="p-2 border rounded">
              <p><strong>Name:</strong> {product.name}</p>
              <p><strong>ID:</strong> {product._id}</p>
              <p><strong>Type:</strong> {typeof product._id}</p>
              <button 
                onClick={() => setTestId(product._id)}
                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Test This ID
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Test Product Fetch</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={testId}
            onChange={(e) => setTestId(e.target.value)}
            placeholder="Enter product ID"
            className="px-3 py-2 border rounded flex-1"
          />
          <button
            onClick={testProductFetch}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Test Fetch
          </button>
        </div>
        
        {testResult && (
          <div className="p-4 border rounded">
            <h3 className="font-semibold mb-2">Result:</h3>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
              {JSON.stringify(testResult, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Debug API</h2>
        <button
          onClick={() => {
            fetch(`${API_BASE_URL}/api/debug/products`)
              .then(res => res.json())
              .then(data => console.log("Debug API response:", data))
              .catch(err => console.error("Debug API error:", err))
          }}
          className="px-4 py-2 bg-purple-500 text-white rounded"
        >
          Test Debug API
        </button>
      </div>
    </div>
  )
}
