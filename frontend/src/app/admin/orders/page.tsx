"use client"

import { useState, useEffect } from "react"
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Eye,
  Edit,
  Truck,
  Package,
  CheckCircle,
  Clock,
  XCircle,
  Calendar,
  User,
  Phone,
  MapPin,
  DollarSign,
  Loader2,
  RefreshCw,
  Download,
  MoreVertical
} from "lucide-react"
import Image from "next/image"

interface OrderItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface Order {
  _id: string
  name: string
  email: string
  phone: string
  address: string
  items: OrderItem[]
  total: number
  status: string
  date: string
}

interface OrdersResponse {
  orders: Order[]
  totalPages: number
  currentPage: number
  total: number
}

const statusOptions = [
  { value: "processing", label: "Processing", color: "yellow", icon: Clock },
  { value: "confirmed", label: "Confirmed", color: "blue", icon: CheckCircle },
  { value: "shipped", label: "Shipped", color: "purple", icon: Truck },
  { value: "delivered", label: "Delivered", color: "green", icon: Package },
  { value: "cancelled", label: "Cancelled", color: "red", icon: XCircle },
]

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [currentPage, selectedStatus, searchTerm])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "20"
      })
      
      if (selectedStatus !== "all") params.append("status", selectedStatus)
      if (searchTerm) params.append("search", searchTerm)

      const res = await fetch(`http://localhost:5000/api/orders?${params}`)
      if (res.ok) {
        const data: OrdersResponse = await res.json()
        setOrders(data.orders)
        setTotalPages(data.totalPages)
      } else {
        setError("Failed to load orders")
      }
    } catch (err) {
      setError("Network error occurred")
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setUpdatingStatus(orderId)
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      })
      
      if (res.ok) {
        setOrders(orders.map(order => 
          order._id === orderId ? { ...order, status: newStatus } : order
        ))
      } else {
        setError("Failed to update order status")
      }
    } catch (err) {
      setError("Network error occurred")
    } finally {
      setUpdatingStatus(null)
    }
  }

  const getStatusConfig = (status: string) => {
    const config = statusOptions.find(option => option.value === status) || statusOptions[0]
    return config
  }

  const getStatusColor = (status: string) => {
    const config = getStatusConfig(status)
    const colors = {
      yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
      blue: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      purple: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
      green: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      red: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
    }
    return colors[config.color as keyof typeof colors]// filepath: /home/kingtom/Documents/web2/Phone-mart/frontend/src/app/admin/orders/page.tsx
"use client"

import { useState, useEffect } from "react"
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Eye,
  Edit,
  Truck,
  Package,
  CheckCircle,
  Clock,
  XCircle,
  Calendar,
  User,
  Phone,
  MapPin,
  DollarSign,
  Loader2,
  RefreshCw,
  Download,
  MoreVertical
} from "lucide-react"
import Image from "next/image"

interface OrderItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface Order {
  _id: string
  name: string
  email: string
  phone: string
  address: string
  items: OrderItem[]
  total: number
  status: string
  date: string
}

interface OrdersResponse {
  orders: Order[]
  totalPages: number
  currentPage: number
  total: number
}

const statusOptions = [
  { value: "processing", label: "Processing", color: "yellow", icon: Clock },
  { value: "confirmed", label: "Confirmed", color: "blue", icon: CheckCircle },
  { value: "shipped", label: "Shipped", color: "purple", icon: Truck },
  { value: "delivered", label: "Delivered", color: "green", icon: Package },
  { value: "cancelled", label: "Cancelled", color: "red", icon: XCircle },
]

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [currentPage, selectedStatus, searchTerm])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "20"
      })
      
      if (selectedStatus !== "all") params.append("status", selectedStatus)
      if (searchTerm) params.append("search", searchTerm)

      const res = await fetch(`http://localhost:5000/api/orders?${params}`)
      if (res.ok) {
        const data: OrdersResponse = await res.json()
        setOrders(data.orders)
        setTotalPages(data.totalPages)
      } else {
        setError("Failed to load orders")
      }
    } catch (err) {
      setError("Network error occurred")
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setUpdatingStatus(orderId)
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      })
      
      if (res.ok) {
        setOrders(orders.map(order => 
          order._id === orderId ? { ...order, status: newStatus } : order
        ))
      } else {
        setError("Failed to update order status")
      }
    } catch (err) {
      setError("Network error occurred")
    } finally {
      setUpdatingStatus(null)
    }
  }

  const getStatusConfig = (status: string) => {
    const config = statusOptions.find(option => option.value === status) || statusOptions[0]
    return config
  }

  const getStatusColor = (status: string) => {
    const config = getStatusConfig(status)
    const colors = {
      yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
      blue: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      purple: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
      green: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      red: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
    }
    return colors[config.color as keyof typeof colors]