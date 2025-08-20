"use client"

import { useState, useEffect } from "react"
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Clock,
  ArrowUpRight,
  RefreshCw
} from "lucide-react"
import Link from "next/link"
import { fetchAdminDashboardStats } from "@/lib/api"

interface DashboardStats {
  totalProducts: number
  totalOrders: number
  totalUsers: number
  totalEarnings: number
  recentOrders: Array<{
    _id: string
    name: string
    total: number
    status: string
    date: string
  }>
  topProducts: Array<{
    _id: string
    totalSold: number
    totalRevenue: number
  }>
  monthlyEarnings: Array<{
    _id: { year: number; month: number }
    total: number
    count: number
  }>
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      setError("")
      const data = await fetchAdminDashboardStats("admin@phonehub.com")
      setStats(data)
      console.log("Dashboard stats loaded:", data)
    } catch (err) {
      console.error("Error fetching dashboard stats:", err)
      setError("Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchDashboardStats()
    setRefreshing(false)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'shipped':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg font-medium mb-4">{error}</div>
        <button 
          onClick={fetchDashboardStats}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome to Smart Communications Admin Panel</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="bg-white dark:bg-gray-800 rounded-lg px-3 sm:px-4 py-2 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="text-sm">Refresh</span>
          </button>
          <div className="bg-white dark:bg-gray-800 rounded-lg px-3 sm:px-4 py-2 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Products</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.totalProducts || 0}</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
              <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">Active</span>
          </div>
        </div>

  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.totalOrders || 0}</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">
              {stats?.totalOrders ? `${stats.totalOrders} total` : 'No orders yet'}
            </span>
          </div>
        </div>

  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.totalUsers || 0}</p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">Registered</span>
          </div>
        </div>

  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Earnings</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(stats?.totalEarnings || 0)}
              </p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/20 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">
              {stats?.totalEarnings ? 'From orders' : 'No earnings yet'}
            </span>
          </div>
        </div>
      </div>

      {/* Recent Orders and Top Products */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h3>
              <Link 
                href="/admin/orders"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 text-sm font-medium flex items-center"
              >
                View all
                <ArrowUpRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            {stats?.recentOrders && stats.recentOrders.length > 0 ? (
              <div className="space-y-4">
                {stats.recentOrders.map((order) => (
                  <div key={order._id} className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{order.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="h-3 w-3 inline mr-1" />
                        {formatDate(order.date)}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0 text-right">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(order.total)}
                      </p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <ShoppingCart className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">No recent orders found</p>
                <p className="text-xs mt-1">Orders will appear here once customers place them</p>
              </div>
            )}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Selling Products</h3>
              <Link 
                href="/admin/analytics"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 text-sm font-medium flex items-center"
              >
                View analytics
                <ArrowUpRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            {stats?.topProducts && stats.topProducts.length > 0 ? (
              <div className="space-y-4">
                {stats.topProducts.map((product, index) => (
                  <div key={product._id} className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                    <div className="flex items-start sm:items-center">
                      <div className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{product._id}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {product.totalSold} sold
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-0 text-right">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(product.totalRevenue)}
                      </p>
                      <div className="flex items-center text-sm text-green-600 justify-end">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Revenue
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Package className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">No sales data available</p>
                <p className="text-xs mt-1">Product sales will appear here once orders are placed</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          <Link 
            href="/admin/upload-product"
            className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          >
            <Package className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Add New Product</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Upload a new product to store</p>
            </div>
          </Link>
          
          <Link 
            href="/admin/orders"
            className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
          >
            <ShoppingCart className="h-8 w-8 text-green-600 dark:text-green-400 mr-3" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Manage Orders</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">View and update order status</p>
            </div>
          </Link>
          
          <Link 
            href="/admin/analytics"
            className="flex items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
          >
            <TrendingUp className="h-8 w-8 text-purple-600 dark:text-purple-400 mr-3" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">View Analytics</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sales and performance metrics</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}