"use client"

import { useState, useEffect, useCallback } from "react"
import {
  Package,
  Search,
  Filter,
  RefreshCw,
  Eye,
  Edit3,
  Clock,
  CheckCircle,
  Truck,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  User,
  Phone,
  MapPin,
  DollarSign,
  Tag,
  AlertCircle
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface Order {
  _id: string
  name: string
  email: string
  phone: string
  address: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    image: string
  }>
  total: number
  status: 'processing' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  date: string
}

interface OrdersResponse {
  orders: Order[]
  totalPages: number
  currentPage: number
  total: number
}

export default function AdminOrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)
  const [openStatusMenuOrderId, setOpenStatusMenuOrderId] = useState<string | null>(null)

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        adminEmail: user?.email || "admin@phonehub.com",
        page: currentPage.toString(),
        limit: "20"
      })
      
      if (statusFilter !== "all") {
        params.set("status", statusFilter)
      }
      
      if (searchTerm) {
        params.set("search", searchTerm)
      }

      const response = await fetch(`https://smartcoms.onrender.com/api/admin/orders?${params}`)
      
      if (response.ok) {
        const data: OrdersResponse = await response.json()
        setOrders(data.orders || [])
        setTotalPages(data.totalPages || 1)
      } else {
        throw new Error("Failed to fetch orders")
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err)
      setError("Failed to load orders. Please try again.")
    } finally {
      setLoading(false)
    }
  }, [currentPage, statusFilter, searchTerm, user])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      setUpdatingStatus(orderId)
      
      // Send adminEmail as query parameter, not in body
      const params = new URLSearchParams({
        adminEmail: user?.email || "admin@phonehub.com"
      })
      
      const response = await fetch(`https://smartcoms.onrender.com/api/admin/order/${orderId}?${params}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          status: newStatus
        })
      })

      if (response.ok) {
        // Update the order in the local state
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === orderId 
              ? { ...order, status: newStatus as Order['status'] }
              : order
          )
        )
        
        // Update selected order if it's the one being updated
        if (selectedOrder?._id === orderId) {
          setSelectedOrder(prev => prev ? { ...prev, status: newStatus as Order['status'] } : null)
        }
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update order status")
      }
    } catch (err) {
      console.error("Failed to update order status:", err)
      setError("Failed to update order status. Please try again.")
    } finally {
      setUpdatingStatus(null)
      // close any open status menu on completion
      setOpenStatusMenuOrderId(null)
    }
  }

  const toggleStatusMenu = (orderId: string) => {
    setOpenStatusMenuOrderId(prev => prev === orderId ? null : orderId)
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      processing: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock },
      confirmed: { color: "bg-blue-100 text-blue-800 border-blue-200", icon: CheckCircle },
      shipped: { color: "bg-purple-100 text-purple-800 border-purple-200", icon: Truck },
      delivered: { color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle },
      cancelled: { color: "bg-red-100 text-red-800 border-red-200", icon: X }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.processing
    const Icon = config.icon
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}>
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Order Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            View and manage all customer orders
          </p>
        </div>
        <button
          onClick={fetchOrders}
          disabled={loading}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
            <span className="text-red-700 dark:text-red-300">{error}</span>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search by customer name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="lg:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="processing">Processing</option>
              <option value="confirmed">Confirmed</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table (desktop) and Cards (mobile) */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Desktop table - hidden on small screens */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Order Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Package className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            #{order._id.slice(-8)}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {order.items.length} item{order.items.length > 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{order.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{order.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatCurrency(order.total)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(order.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedOrder(order)
                          setShowOrderDetails(true)
                        }}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors mr-2"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      {order.status !== 'delivered' && order.status !== 'cancelled' && (
                        <div className="relative">
                          <button
                            onClick={() => toggleStatusMenu(order._id)}
                            disabled={updatingStatus === order._id}
                            aria-expanded={openStatusMenuOrderId === order._id}
                            className="p-1 text-gray-400 hover:text-green-600 transition-colors disabled:opacity-50"
                            title="Update Status"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>

                          {openStatusMenuOrderId === order._id && (
                            <div className="absolute right-0 top-8 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg transition-all z-10">
                              <div className="p-2">
                                {['processing', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((status) => (
                                  order.status !== status && (
                                    <button
                                      key={status}
                                      onClick={() => updateOrderStatus(order._id, status)}
                                      disabled={updatingStatus === order._id}
                                      className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors disabled:opacity-50 capitalize"
                                    >
                                      {updatingStatus === order._id ? 'Updating...' : `Mark as ${status}`}
                                    </button>
                                  )
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No orders found</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      {searchTerm || statusFilter !== 'all' 
                        ? 'Try adjusting your search criteria or filters.' 
                        : 'Orders will appear here once customers make purchases.'}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards - visible on small screens */}
        <div className="sm:hidden p-4 space-y-4">
          {orders.length > 0 ? (
            orders.map(order => (
              <div key={order._id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">#{order._id.slice(-8)} • {order.items.length} item{order.items.length > 1 ? 's' : ''}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-300">{order.name} • {order.email}</div>
                    <div className="mt-2">{getStatusBadge(order.status)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(order.total)}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-300 mt-1">{formatDate(order.date)}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => { setSelectedOrder(order); setShowOrderDetails(true) }}
                    className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-200"
                  >
                    <Eye className="inline h-4 w-4 mr-2" /> View
                  </button>

                  {order.status !== 'delivered' && order.status !== 'cancelled' && (
                    <div className="relative">
                      <button
                        onClick={() => toggleStatusMenu(order._id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm flex items-center"
                      >
                        <Edit3 className="h-4 w-4 mr-2" /> Update
                      </button>

                      {openStatusMenuOrderId === order._id && (
                        <div className="mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow p-2">
                          {['processing', 'confirmed', 'shipped', 'delivered', 'cancelled'].map(status => (
                            order.status !== status && (
                              <button
                                key={status}
                                onClick={() => updateOrderStatus(order._id, status)}
                                disabled={updatingStatus === order._id}
                                className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors disabled:opacity-50 capitalize"
                              >
                                {updatingStatus === order._id ? 'Updating...' : `Mark as ${status}`}
                              </button>
                            )
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-6">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No orders found</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search criteria or filters.' 
                  : 'Orders will appear here once customers make purchases.'}
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3 border-t border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Order Details - #{selectedOrder._id.slice(-8)}
                </h2>
                <button
                  onClick={() => setShowOrderDetails(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Customer Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Customer Information
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
                    <div>
                      <label className="text-sm text-gray-600 dark:text-gray-400">Name</label>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedOrder.name}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 dark:text-gray-400">Email</label>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedOrder.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 dark:text-gray-400">Phone</label>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedOrder.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 dark:text-gray-400">Address</label>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedOrder.address}</p>
                    </div>
                  </div>
                </div>

                {/* Order Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Package className="h-5 w-5 mr-2" />
                    Order Information
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
                    <div>
                      <label className="text-sm text-gray-600 dark:text-gray-400">Status</label>
                      <div className="mt-1">{getStatusBadge(selectedOrder.status)}</div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 dark:text-gray-400">Order Date</label>
                      <p className="font-medium text-gray-900 dark:text-white">{formatDate(selectedOrder.date)}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 dark:text-gray-400">Total Amount</label>
                      <p className="font-bold text-xl text-gray-900 dark:text-white">{formatCurrency(selectedOrder.total)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Tag className="h-5 w-5 mr-2" />
                  Order Items
                </h3>
                <div className="space-y-4">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{item.name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {formatCurrency(item.price * item.quantity)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatCurrency(item.price)} each
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Update */}
              {selectedOrder.status !== 'delivered' && selectedOrder.status !== 'cancelled' && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Update Status</h4>
                  <div className="flex flex-wrap gap-2">
                    {['processing', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((status) => (
                      selectedOrder.status !== status && (
                        <button
                          key={status}
                          onClick={() => updateOrderStatus(selectedOrder._id, status)}
                          disabled={updatingStatus === selectedOrder._id}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors capitalize"
                        >
                          {updatingStatus === selectedOrder._id ? 'Updating...' : `Mark as ${status}`}
                        </button>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
