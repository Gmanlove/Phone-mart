// Simple API utility for fetching data from backend
const API_BASE_URL = "https://smartcoms.onrender.com"

// Product functions
export async function fetchProducts(params?: {
  page?: number
  limit?: number
  category?: string
  search?: string
  sort?: string
  minPrice?: number
  maxPrice?: number
}) {
  const searchParams = new URLSearchParams()
  if (params?.page) searchParams.set('page', params.page.toString())
  if (params?.limit) searchParams.set('limit', params.limit.toString())
  if (params?.category) searchParams.set('category', params.category)
  if (params?.search) searchParams.set('search', params.search)
  if (params?.sort) searchParams.set('sort', params.sort)
  if (params?.minPrice) searchParams.set('minPrice', params.minPrice.toString())
  if (params?.maxPrice) searchParams.set('maxPrice', params.maxPrice.toString())
  
  const res = await fetch(`${API_BASE_URL}/api/products?${searchParams}`)
  if (!res.ok) throw new Error("Failed to fetch products")
  return res.json()
}

export async function fetchProductById(id: string) {
  const res = await fetch(`${API_BASE_URL}/api/products/${id}`)
  if (!res.ok) throw new Error("Failed to fetch product")
  return res.json()
}

export async function searchProducts(query: string) {
  const res = await fetch(`${API_BASE_URL}/api/products?search=${encodeURIComponent(query)}`)
  if (!res.ok) throw new Error("Failed to search products")
  return res.json()
}

export async function createProduct(productData: Record<string, unknown>) {
  const res = await fetch(`${API_BASE_URL}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  })
  if (!res.ok) throw new Error("Failed to create product")
  return res.json()
}

export async function updateProduct(id: string, productData: Record<string, unknown>) {
  const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  })
  if (!res.ok) throw new Error("Failed to update product")
  return res.json()
}

export async function deleteProduct(id: string) {
  const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Failed to delete product")
  return res.json()
}

// Order functions
export async function createOrder(orderData: Record<string, unknown>) {
  const res = await fetch(`${API_BASE_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  })
  if (!res.ok) throw new Error("Failed to create order")
  return res.json()
}

export async function fetchOrders(params?: {
  page?: number
  limit?: number
  status?: string
  search?: string
}) {
  const searchParams = new URLSearchParams()
  if (params?.page) searchParams.set('page', params.page.toString())
  if (params?.limit) searchParams.set('limit', params.limit.toString())
  if (params?.status) searchParams.set('status', params.status)
  if (params?.search) searchParams.set('search', params.search)
  
  const res = await fetch(`${API_BASE_URL}/api/orders?${searchParams}`)
  if (!res.ok) throw new Error("Failed to fetch orders")
  return res.json()
}

export async function fetchUserOrders(email: string, params?: {
  page?: number
  limit?: number
  status?: string
}) {
  const searchParams = new URLSearchParams()
  if (params?.page) searchParams.set('page', params.page.toString())
  if (params?.limit) searchParams.set('limit', params.limit.toString())
  if (params?.status) searchParams.set('status', params.status)
  
  const res = await fetch(`${API_BASE_URL}/api/orders/user/${encodeURIComponent(email)}?${searchParams}`)
  if (!res.ok) throw new Error("Failed to fetch user orders")
  return res.json()
}

export async function updateOrderStatus(orderId: string, status: string) {
  const res = await fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  })
  if (!res.ok) throw new Error("Failed to update order status")
  return res.json()
}

// Admin functions
export async function fetchAdminDashboardStats(adminEmail: string) {
  const res = await fetch(`${API_BASE_URL}/api/admin/dashboard-stats?adminEmail=${adminEmail}`)
  if (!res.ok) throw new Error("Failed to fetch dashboard stats")
  return res.json()
}

export async function fetchAdminOrders(adminEmail: string, params?: {
  page?: number
  limit?: number
  status?: string
  search?: string
}) {
  const searchParams = new URLSearchParams()
  searchParams.set('adminEmail', adminEmail)
  if (params?.page) searchParams.set('page', params.page.toString())
  if (params?.limit) searchParams.set('limit', params.limit.toString())
  if (params?.status) searchParams.set('status', params.status)
  if (params?.search) searchParams.set('search', params.search)
  
  const res = await fetch(`${API_BASE_URL}/api/admin/orders?${searchParams}`)
  if (!res.ok) throw new Error("Failed to fetch admin orders")
  return res.json()
}

export async function updateAdminOrderStatus(orderId: string, status: string, adminEmail: string) {
  const params = new URLSearchParams({
    adminEmail: adminEmail
  })
  
  const res = await fetch(`${API_BASE_URL}/api/admin/order/${orderId}?${params}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  })
  if (!res.ok) throw new Error("Failed to update order status")
  return res.json()
}

export async function fetchAdminProducts(adminEmail: string, params?: {
  page?: number
  limit?: number
  category?: string
  search?: string
  sort?: string
}) {
  const searchParams = new URLSearchParams()
  searchParams.set('adminEmail', adminEmail)
  if (params?.page) searchParams.set('page', params.page.toString())
  if (params?.limit) searchParams.set('limit', params.limit.toString())
  if (params?.category) searchParams.set('category', params.category)
  if (params?.search) searchParams.set('search', params.search)
  if (params?.sort) searchParams.set('sort', params.sort)
  
  const res = await fetch(`${API_BASE_URL}/api/admin/products?${searchParams}`)
  if (!res.ok) throw new Error("Failed to fetch admin products")
  return res.json()
}

export async function updateAdminProduct(id: string, productData: Record<string, unknown>, adminEmail: string) {
  const params = new URLSearchParams({ adminEmail })
  const res = await fetch(`${API_BASE_URL}/api/admin/product/${id}?${params.toString()}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  })
  if (!res.ok) throw new Error("Failed to update product")
  return res.json()
}

export async function deleteAdminProduct(id: string, adminEmail: string) {
  const params = new URLSearchParams({ adminEmail })
  const res = await fetch(`${API_BASE_URL}/api/admin/product/${id}?${params.toString()}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Failed to delete product")
  return res.json()
}

export async function fetchAdminEarnings(adminEmail: string, params?: {
  startDate?: string
  endDate?: string
  groupBy?: string
}) {
  const searchParams = new URLSearchParams()
  searchParams.set('adminEmail', adminEmail)
  if (params?.startDate) searchParams.set('startDate', params.startDate)
  if (params?.endDate) searchParams.set('endDate', params.endDate)
  if (params?.groupBy) searchParams.set('groupBy', params.groupBy)
  
  const res = await fetch(`${API_BASE_URL}/api/admin/earnings?${searchParams}`)
  if (!res.ok) throw new Error("Failed to fetch earnings data")
  return res.json()
}

// Analytics functions
export async function fetchAnalytics(adminEmail: string) {
  const res = await fetch(`${API_BASE_URL}/api/admin/analytics?adminEmail=${adminEmail}`)
  if (!res.ok) throw new Error("Failed to fetch analytics")
  return res.json()
}
