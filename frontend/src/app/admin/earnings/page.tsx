"use client"

import { useState, useEffect, useCallback } from "react"
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Wallet,
  BarChart3,
  Target,
  Award,
  Clock,
  ShoppingBag,
  Package
} from "lucide-react"

interface EarningsData {
  _id: {
    day?: number;
    month?: number;
    week?: number;
    year?: number;
  } | null
  total: number
  count: number
}

interface OrderData {
  _id: string
  name: string
  email: string
  total: number
  status: string
  date: string
  items: Array<{
    name: string
    price: number
    quantity: number
  }>
}

interface EarningsSummary {
  totalEarnings: number
  totalOrders: number
  averageOrderValue: number
  totalCustomers: number
  monthlyGrowth: number
  weeklyGrowth: number
  topEarningProducts: Array<{
    _id: string
    totalRevenue: number
    totalSold: number
  }>
}

export default function AdminEarningsPage() {
  const [earningsData, setEarningsData] = useState<EarningsData[]>([])
  const [recentOrders, setRecentOrders] = useState<OrderData[]>([])
  const [summary, setSummary] = useState<EarningsSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [dateRange, setDateRange] = useState("30")
  const [groupBy, setGroupBy] = useState("day")

  const fetchEarningsData = useCallback(async () => {
    try {
      const endDate = new Date()
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - parseInt(dateRange))

      const params = new URLSearchParams({
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        groupBy
      })

      const response = await fetch(`https://smartcoms.onrender.com/api/admin/earnings?adminEmail=admin@phonehub.com&${params}`)
      if (response.ok) {
        const data = await response.json()
        setEarningsData(data)
      }
    } catch (err) {
      console.error("Failed to fetch earnings data:", err)
    }
  }, [dateRange, groupBy])

  const fetchRecentOrders = useCallback(async () => {
    try {
      const response = await fetch("https://smartcoms.onrender.com/api/admin/orders?adminEmail=admin@phonehub.com&limit=10&status=delivered")
      if (response.ok) {
        const data = await response.json()
        setRecentOrders(data.orders || [])
      }
    } catch (err) {
      console.error("Failed to fetch recent orders:", err)
    }
  }, [])

  const fetchSummaryData = useCallback(async () => {
    try {
      const response = await fetch("https://smartcoms.onrender.com/api/admin/dashboard-stats?adminEmail=admin@phonehub.com")
      if (response.ok) {
        const data = await response.json()
        setSummary({
          totalEarnings: data.totalEarnings || 0,
          totalOrders: data.totalOrders || 0,
          averageOrderValue: data.totalOrders > 0 ? (data.totalEarnings / data.totalOrders) : 0,
          totalCustomers: data.totalUsers || 0,
          monthlyGrowth: 12.5, // Mock data - you can calculate this from monthlyEarnings
          weeklyGrowth: 8.2,   // Mock data
          topEarningProducts: data.topProducts || []
        })
      }
    } catch (err) {
      console.error("Failed to fetch summary data:", err)
    }
  }, [])

  const fetchAllData = useCallback(async () => {
    setLoading(true)
    try {
      await Promise.all([
        fetchEarningsData(),
        fetchRecentOrders(),
        fetchSummaryData()
      ])
    } catch {
      setError("Failed to fetch earnings data")
    } finally {
      setLoading(false)
    }
  }, [fetchEarningsData, fetchRecentOrders, fetchSummaryData])

  useEffect(() => {
    fetchAllData()
  }, [fetchAllData])

  useEffect(() => {
    fetchEarningsData()
  }, [fetchEarningsData])

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
      year: 'numeric'
    })
  }

  const exportEarnings = () => {
    const csvContent = [
      ['Date', 'Revenue', 'Orders', 'Average Order Value'],
      ...earningsData.map(item => [
        item._id ? `${item._id.day || ''}/${item._id.month}/${item._id.year}` : 'N/A',
        item.total,
        item.count,
        item.count > 0 ? (item.total / item.count).toFixed(2) : '0'
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `earnings-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getTotalEarnings = () => {
    return earningsData.reduce((sum, item) => sum + item.total, 0)
  }

  const getTotalOrders = () => {
    return earningsData.reduce((sum, item) => sum + item.count, 0)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg font-medium">{error}</div>
        <button 
          onClick={fetchAllData}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Earnings Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track your revenue, profits, and financial performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={exportEarnings}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Earnings
          </button>
          <button
            onClick={fetchAllData}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Earnings Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(summary?.totalEarnings || 0)}
              </p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">+{summary?.monthlyGrowth || 0}%</span>
            <span className="text-gray-600 dark:text-gray-400 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Period Revenue</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(getTotalEarnings())}
              </p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
              <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <Calendar className="h-4 w-4 text-blue-500 mr-1" />
            <span className="text-gray-600 dark:text-gray-400">Last {dateRange} days</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Order Value</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(summary?.averageOrderValue || 0)}
              </p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg">
              <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">+5.2%</span>
            <span className="text-gray-600 dark:text-gray-400 ml-1">improvement</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{getTotalOrders()}</p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/20 p-3 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">+{summary?.weeklyGrowth || 0}%</span>
            <span className="text-gray-600 dark:text-gray-400 ml-1">this period</span>
          </div>
        </div>
      </div>

      {/* Earnings Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Revenue Trends</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Track your earnings over time</p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last year</option>
              </select>
              <select
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="day">Daily</option>
                <option value="week">Weekly</option>
                <option value="month">Monthly</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {earningsData.length > 0 ? (
            <div className="h-80 flex items-end justify-between space-x-2">
              {earningsData.slice(-15).map((item, index) => {
                const maxValue = Math.max(...earningsData.map(d => d.total))
                const height = maxValue > 0 ? (item.total / maxValue) * 100 : 0
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center group">
                    <div className="relative">
                      <div
                        className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md min-h-[8px] transition-all duration-300 hover:from-blue-600 hover:to-blue-500 cursor-pointer"
                        style={{ height: `${Math.max(height, 8)}%` }}
                      />
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        <div className="font-medium">{formatCurrency(item.total)}</div>
                        <div>{item.count} orders</div>
                        <div>{item.count > 0 ? formatCurrency(item.total / item.count) : '₦0'} avg</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-3 text-center">
                      {groupBy === 'day' && item._id && `${item._id.day}/${item._id.month}`}
                      {groupBy === 'week' && item._id && `W${item._id.week}`}
                      {groupBy === 'month' && item._id && `${item._id.month}/${item._id.year}`}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center h-80 text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>No earnings data available for this period</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Top Earning Products and Recent High-Value Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Earning Products */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Earning Products</h3>
              <Award className="h-5 w-5 text-yellow-500" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Products generating the most revenue</p>
          </div>
          <div className="p-6">
            {summary?.topEarningProducts && summary.topEarningProducts.length > 0 ? (
              <div className="space-y-4">
                {summary.topEarningProducts.map((product, index) => (
                  <div key={product._id} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{product._id}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {product.totalSold} units sold
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 dark:text-white">
                        {formatCurrency(product.totalRevenue)}
                      </p>
                      <div className="flex items-center text-sm text-green-600">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Top earner
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No product earnings data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent High-Value Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent High-Value Orders</h3>
              <CreditCard className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Latest completed orders</p>
          </div>
          <div className="p-6">
            {recentOrders && recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.slice(0, 5).map((order) => (
                  <div key={order._id} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{order.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{order.email}</p>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDate(order.date)}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 dark:text-white">
                        {formatCurrency(order.total)}
                      </p>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Wallet className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No recent orders found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detailed Earnings Breakdown */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Earnings Breakdown</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Detailed revenue analysis for the selected period</p>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Date</th>
                  <th className="text-right py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Revenue</th>
                  <th className="text-right py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Orders</th>
                  <th className="text-right py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Avg Order</th>
                  <th className="text-right py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {earningsData.slice(-10).map((item, index) => {
                  const dateStr = item._id ? `${item._id.day || ''}/${item._id.month}/${item._id.year}` : 'N/A'
                  const avgOrder = item.count > 0 ? item.total / item.count : 0
                  const prevItem = earningsData[earningsData.indexOf(item) - 1]
                  const growth = prevItem && prevItem.total > 0 ? 
                    ((item.total - prevItem.total) / prevItem.total) * 100 : 0
                  
                  return (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="py-4 text-gray-900 dark:text-white font-medium">{dateStr}</td>
                      <td className="py-4 text-right text-gray-900 dark:text-white font-semibold">
                        {formatCurrency(item.total)}
                      </td>
                      <td className="py-4 text-right text-gray-900 dark:text-white">{item.count}</td>
                      <td className="py-4 text-right text-gray-900 dark:text-white">
                        {formatCurrency(avgOrder)}
                      </td>
                      <td className="py-4 text-right">
                        <div className={`flex items-center justify-end ${
                          growth >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {growth !== 0 && (
                            <>
                              {growth >= 0 ? (
                                <ArrowUpRight className="h-4 w-4 mr-1" />
                              ) : (
                                <ArrowDownRight className="h-4 w-4 mr-1" />
                              )}
                              <span className="font-medium">
                                {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                              </span>
                            </>
                          )}
                          {growth === 0 && (
                            <span className="text-gray-500 dark:text-gray-400">-</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}