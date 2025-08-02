"use client"

import { useState } from "react"
import { Package, Truck, CheckCircle, Clock, Search, Filter, Eye, Download, Star, MessageCircle, RefreshCw, MapPin, Calendar, CreditCard } from "lucide-react"
import { CldImage } from "next-cloudinary";
import { extractCloudinaryPublicId } from "@/lib/utils";

import { useOrders } from "@/contexts/order-context"

const OrderCard = ({ order }: { order: any }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200'
      case 'shipped': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'processing': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="w-4 h-4" />
      case 'shipped': return <Truck className="w-4 h-4" />
      case 'processing': return <Clock className="w-4 h-4" />
      case 'cancelled': return <RefreshCw className="w-4 h-4" />
      default: return <Package className="w-4 h-4" />
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200">
      {/* Order Header */}
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Order {order.id}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(order.date).toLocaleDateString('en-NG')}
                </span>
                <span className="flex items-center gap-1">
                  <CreditCard className="w-4 h-4" />
                  {order.paymentMethod}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between sm:justify-end gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                ₦{order.total.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">
                {order.items.length} item{order.items.length > 1 ? 's' : ''}
              </div>
            </div>
            
            <div className={`px-3 py-2 rounded-full text-sm font-medium border flex items-center gap-2 ${getStatusColor(order.status)}`}>
              {getStatusIcon(order.status)}
              <span className="capitalize">{order.status}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items Preview */}
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {order.items.slice(0, 3).map((item: any, index: number) => (
            <div key={index} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
              <CldImage
                width={100}
                height={100}
                src={extractCloudinaryPublicId(item.image) || "sample"}
                alt={item.name}
                className="w-8 h-8 rounded-lg object-cover"
              />
              <span className="text-sm font-medium text-gray-900 truncate max-w-32">
                {item.name}
              </span>
              {item.quantity > 1 && (
                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                  x{item.quantity}
                </span>
              )}
            </div>
          ))}
          {order.items.length > 3 && (
            <div className="flex items-center justify-center bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-500">
              +{order.items.length - 3} more
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            {isExpanded ? 'Hide Details' : 'View Details'}
          </button>
          
          {order.status === 'delivered' && (
            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2">
              <Star className="w-4 h-4" />
              Rate & Review
            </button>
          )}
          
          {(order.status === 'shipped' || order.status === 'delivered') && (
            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Invoice
            </button>
          )}
          
          {order.status === 'processing' && (
            <button className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Cancel Order
            </button>
          )}
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-gray-100 p-4 sm:p-6 bg-gray-50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Items Details */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Package className="w-4 h-4" />
                Order Items
              </h4>
              <div className="space-y-3">
                {order.items.map((item: any, index: number) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-xl">
                    <CldImage
                      width={100}
                      height={100}
                      src={extractCloudinaryPublicId(item.image) || "sample"}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-gray-900 truncate">{item.name}</h5>
                      <p className="text-sm text-gray-600">{item.specs}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                        <span className="font-semibold text-gray-900">₦{item.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Info */}
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Shipping Details
                </h4>
                <div className="bg-white p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-2">Delivery Address:</p>
                  <p className="font-medium text-gray-900">{order.shippingAddress}</p>
                  
                  {order.trackingNumber && (
                    <>
                      <p className="text-sm text-gray-600 mt-3 mb-2">Tracking Number:</p>
                      <p className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{order.trackingNumber}</p>
                    </>
                  )}
                  
                  {order.estimatedDelivery && (
                    <>
                      <p className="text-sm text-gray-600 mt-3 mb-2">
                        {order.status === 'delivered' ? 'Delivered:' : 'Estimated Delivery:'}
                      </p>
                      <p className="font-medium text-gray-900">
                        {new Date(order.actualDelivery || order.estimatedDelivery).toLocaleDateString('en-NG')}
                      </p>
                    </>
                  )}
                  
                  {order.cancelReason && (
                    <>
                      <p className="text-sm text-gray-600 mt-3 mb-2">Cancel Reason:</p>
                      <p className="text-red-600 font-medium">{order.cancelReason}</p>
                    </>
                  )}
                </div>
              </div>

              {/* Contact Support */}
              <div className="bg-white p-4 rounded-xl">
                <h5 className="font-medium text-gray-900 mb-3">Need Help?</h5>
                <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


  const { orders } = useOrders()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  const statusOptions = [
    { value: "all", label: "All Orders" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" }
  ]

  const dateOptions = [
    { value: "all", label: "All Time" },
    { value: "30days", label: "Last 30 Days" },
    { value: "90days", label: "Last 3 Months" },
    { value: "year", label: "This Year" }
  ]

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item: any) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalSpent = orders.reduce((sum, order) => sum + (order.status !== 'cancelled' ? order.total : 0), 0)
  const totalOrders = orders.length
  const deliveredOrders = orders.filter(order => order.status === 'delivered').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4 sm:py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-2xl">
              <Package className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-600 text-base sm:text-lg">Track and manage your purchases</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-xl">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{totalOrders}</div>
                  <div className="text-sm text-gray-600">Total Orders</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{deliveredOrders}</div>
                  <div className="text-sm text-gray-600">Delivered</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-xl">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">₦{totalSpent.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total Spent</div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search orders by ID or product name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex gap-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>

                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {dateOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4 sm:space-y-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : null}
        </div>
      </div>
    </div>
  )
}