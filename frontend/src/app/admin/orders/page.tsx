"use client"

import { useState, useEffect } from "react"
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash2, 
  Download,
  RefreshCw,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown
} from "lucide-react"

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

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [updating, setUpdating] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const statusOptions = [
    { value: "all", label: "All Orders", color: "gray" },
    { value: "processing", label: "Processing", color: "yellow" },
    { value: "shipped", label: "Shipped", color: "blue" },
    { value: "delivered", label: "Delivered", color: "green" },
    { value: "cancelled", label: "Cancelled", color: "red" }
  ]

  useEffect(() => {
    fetchOrders()
  }, [currentPage, selectedStatus, searchTerm, sortBy, sortOrder])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        ...(selectedStatus !== "all" && { status: selectedStatus }),
        ...(searchTerm && { search: searchTerm }),
        sort: sortOrder === "desc" ? `-${sortBy}` : sortBy
      })
      
      const response = await fetch(`https://smartcoms.onrender.com/api/admin/orders?adminEmail=admin@phonehub.com&${params}`)
      
      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders)
        setFilteredOrders(data.orders)
        setTotalPages(data.totalPages)
      } else {
        setError("Failed to fetch orders")
      }
    } catch (err) {
      setError("Network error occurred")
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setUpdating(orderId)
    try {
      const response = await fetch(`https://smartcoms.onrender.com/api/admin/order/${orderId}?adminEmail=admin@phonehub.com`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        await fetchOrders()
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus })
        }
      } else {
        setError("Failed to update order status")
      }
    } catch (err) {
      setError("Network error occurred")
    } finally {
      setUpdating(null)
    }
  }

  const deleteOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return
    
    try {
      const response = await fetch(`https://smartcoms.onrender.com/api/orders/${orderId}`, {
        method: "DELETE"
      })

      if (response.ok) {
        await fetchOrders()
        setShowOrderDetails(false)
      } else {
        setError("Failed to delete order")
      }
    } catch (err) {
      setError("Network error occurred")
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return <Clock className="h-4 w-4" />
      case 'shipped':
        return <Truck className="h-4 w-4" />
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />
      case 'cancelled':
        return <XCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'shipped':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount)
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

  const exportOrders = () => {
    const csvContent = [
      ['Order ID', 'Customer', 'Email', 'Phone', 'Total', 'Status', 'Date'],
      ...filteredOrders.map(order => [
        order._id,
        order.name,
        order.email,
        order.phone,
        order.total,
        order.status,
        formatDate(order.date)
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Orders Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage customer orders and track fulfillment</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={exportOrders}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </button>
          <button
            onClick={fetchOrders}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders by customer name, email, or phone..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value)
                  setCurrentPage(1)
                }}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <ArrowUpDown className="h-5 w-5 text-gray-400" />
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-')
                  setSortBy(field)
                  setSortOrder(order as "asc" | "desc")
                }}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="total-desc">Highest Amount</option>
                <option value="total-asc">Lowest Amount</option>
                <option value="name-asc">Customer A-Z</option>
                <option value="name-desc">Customer Z-A</option>
              </select>
            </div>
          </div>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-6">
          {statusOptions.map(status => {
            const count = status.value === 'all' 
              ? orders.length 
              : orders.filter(order => order.status === status.value).length
            
            return (
              <div key={status.value} className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{count}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{status.label}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-600 text-lg font-medium">{error}</div>
            <button 
              onClick={fetchOrders}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <div className="text-xl font-medium text-gray-900 dark:text-white">No orders found</div>
            <div className="text-gray-600 dark:text-gray-400">Try adjusting your search or filters</div>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Order Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            #{order._id.slice(-8)}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{order.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{order.email}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{order.phone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          {order.items.slice(0, 2).map((item, index) => (
                            <div key={index} className="text-sm text-gray-900 dark:text-white">
                              {item.quantity}x {item.name.length > 20 ? `${item.name.slice(0, 20)}...` : item.name}
                            </div>
                          ))}
                          {order.items.length > 2 && (
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              +{order.items.length - 2} more items
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {formatCurrency(order.total)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                            disabled={updating === order._id}
                            className={`text-xs font-medium px-2.5 py-1.5 rounded-full border-0 ${getStatusColor(order.status)} ${updating === order._id ? 'opacity-50' : ''}`}
                          >
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          {updating === order._id && (
                            <RefreshCw className="h-4 w-4 animate-spin text-blue-600" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {formatDate(order.date)}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => {
                              setSelectedOrder(order)
                              setShowOrderDetails(true)
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteOrder(order._id)}
                            className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete Order"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden divide-y divide-gray-200 dark:divide-gray-700">
              {filteredOrders.map((order) => (
                <div key={order._id} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        Order #{order._id.slice(-8)}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(order.date)}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        disabled={updating === order._id}
                        className={`text-xs font-medium px-2.5 py-1.5 rounded-full border-0 ${getStatusColor(order.status)}`}
                      >
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <User className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-900 dark:text-white">{order.name}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-600 dark:text-gray-400">{order.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-600 dark:text-gray-400">{order.phone}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </div>
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(order.total)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => {
                        setSelectedOrder(order)
                        setShowOrderDetails(true)
                      }}
                      className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </button>
                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="flex items-center text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-4 py-2 text-sm text-gray-900 dark:text-white">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Order Details
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Order #{selectedOrder._id}
                  </p>
                </div>
                <button
                  onClick={() => setShowOrderDetails(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <XCircle className="h-6 w-6 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Customer Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{selectedOrder.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Customer Name</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{selectedOrder.email}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Email Address</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{selectedOrder.phone}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Phone Number</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{selectedOrder.address}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Delivery Address</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Order Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{formatDate(selectedOrder.date)}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Order Date</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{formatCurrency(selectedOrder.total)}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Total Amount</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {getStatusIcon(selectedOrder.status)}
                      <div className="ml-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                          {selectedOrder.status}
                        </span>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Order Status</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Items</h3>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Product</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Quantity</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Price</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              {item.image && (
                                <img 
                                  src={item.image} 
                                  alt={item.name}
                                  className="w-12 h-12 object-cover rounded-lg mr-4"
                                />
                              )}
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Product ID: {item.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center text-gray-900 dark:text-white">{item.quantity}</td>
                          <td className="px-6 py-4 text-right text-gray-900 dark:text-white">{formatCurrency(item.price)}</td>
                          <td className="px-6 py-4 text-right font-medium text-gray-900 dark:text-white">
                            {formatCurrency(item.price * item.quantity)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <td colSpan={3} className="px-6 py-4 text-right font-medium text-gray-900 dark:text-white">
                          Total Amount:
                        </td>
                        <td className="px-6 py-4 text-right font-bold text-lg text-gray-900 dark:text-white">
                          {formatCurrency(selectedOrder.total)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Update Status:</label>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => updateOrderStatus(selectedOrder._id, e.target.value)}
                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowOrderDetails(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => deleteOrder(selectedOrder._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}