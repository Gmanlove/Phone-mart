// Simple API utility for fetching data from backend
export async function fetchProducts() {
  const res = await fetch("https://smartcoms.onrender.com/api/products")
  if (!res.ok) throw new Error("Failed to fetch products")
  return res.json()
}

export async function fetchCategories() {
  const res = await fetch("https://smartcoms.onrender.com/api/categories")
  if (!res.ok) throw new Error("Failed to fetch categories")
  return res.json()
}

// Order management
export async function createOrder(orderData: {
  name: string
  email: string
  phone: string
  address: string
  items: Array<{
    id: string
    name: string
    price: number
    image: string
    quantity: number
  }>
  total: number
}) {
  const res = await fetch("https://smartcoms.onrender.com/api/orders", {
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
  
  const res = await fetch(`https://smartcoms.onrender.com/api/orders?${searchParams}`)
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
  
  const res = await fetch(`https://smartcoms.onrender.com/api/orders/user/${encodeURIComponent(email)}?${searchParams}`)
  if (!res.ok) throw new Error("Failed to fetch user orders")
  return res.json()
}

export async function updateOrderStatus(orderId: string, status: string) {
  const res = await fetch(`https://smartcoms.onrender.com/api/orders/${orderId}`, {
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
  const res = await fetch(`https://smartcoms.onrender.com/api/admin/dashboard-stats?adminEmail=${adminEmail}`)
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
  
  const res = await fetch(`https://smartcoms.onrender.com/api/admin/orders?${searchParams}`)
  if (!res.ok) throw new Error("Failed to fetch admin orders")
  return res.json()
}

export async function fetchAdminEarnings(adminEmail: string, params?: {
  startDate?: string
  endDate?: string
  groupBy?: 'day' | 'week' | 'month'
}) {
  const searchParams = new URLSearchParams()
  searchParams.set('adminEmail', adminEmail)
  if (params?.startDate) searchParams.set('startDate', params.startDate)
  if (params?.endDate) searchParams.set('endDate', params.endDate)
  if (params?.groupBy) searchParams.set('groupBy', params.groupBy)
  
  const res = await fetch(`https://smartcoms.onrender.com/api/admin/earnings?${searchParams}`)
  if (!res.ok) throw new Error("Failed to fetch earnings")
  return res.json()
}

// Product management
export async function fetchProduct(productId: string) {
  const res = await fetch(`https://smartcoms.onrender.com/api/products/${productId}`)
  if (!res.ok) throw new Error("Failed to fetch product")
  return res.json()
}

// Add more API calls as needed
