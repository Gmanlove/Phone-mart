// Simple API utility for fetching data from backend
export async function fetchProducts() {
  const res = await fetch("http://localhost:5000/api/products")
  if (!res.ok) throw new Error("Failed to fetch products")
  return res.json()
}

export async function fetchCategories() {
  const res = await fetch("http://localhost:5000/api/categories")
  if (!res.ok) throw new Error("Failed to fetch categories")
  return res.json()
}

// Add more API calls as needed
