"use client"

import { useState, useEffect } from "react"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Package, 
  ShoppingCart, 
  Users, 
  Calendar,
  Download,
  RefreshCw,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Eye,
  Heart,
  Zap
} from "lucide-react"

interface AnalyticsData {
  totalEarnings: number
  totalOrders: number
  totalProducts: number
  totalUsers: number
  monthlyEarnings: Array<{
    _id: { year: number; month: number }
    total: number
    count: number
  }>
  topProducts: Array<{
    _id: string
    totalSold: number
    totalRevenue: number
  }>
  recentOrders: Array<{
    _id: string
    name: string
    total: number
    status: string
    date: string
  }>
}

interface EarningsData {
  _id: string | null
  total: number
  count: number
}

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [earningsData, setEarningsData] = useState<EarningsData[]>([])
  const [loading, setLoading] = useState(true)
  const [earningsLoading, setEarningsLoading] = useState(false)
  const [error, setError] = useState("")
  const [dateRange, setDateRange] = useState("30")
  const [groupBy, setGroupBy] = useState("day")

  useEffect(() => {
    fetchAnalytics()
  }, [])

  useEffect(() => {
    fetchEarningsData()
  }, [dateRange, groupBy])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/dashboard-stats?adminEmail=admin@phonehub.com")
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data)
      } else {
        setError("Failed to fetch analytics data")
      }
    } catch (err) {
      setError("Network error occurred")
    } finally {
      setLoading(false)
    }
  }

  const fetchEarningsData = async () => {
    setEarningsLoading(true)
    try {
      const endDate = new Date()
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - parseInt(dateRange))

      const params = new URLSearchParams({
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        groupBy
      })

      const response = await fetch(`http://localhost:5000/api/admin/earnings?adminEmail=admin@phonehub.com&${params}`)
      if (response.ok) {
        const data = await response.json()
        setEarningsData(data)
      }
    } catch (err) {
      console.error("Failed to fetch earnings data:", err)
    } finally {
      setEarningsLoading(false)
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
      month: 'short',
      day: 'numeric'
    })
  }

  const getGrowthRate = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0
    return ((current - previous) / previous) * 100
  }

  const exportAnalytics = () => {
    const csvContent = [
      ['Metric', 'Value'],
      ['Total Earnings', analytics?.totalEarnings || 0],
      ['Total Orders', analytics?.totalOrders || 0],
      ['Total Products', analytics?.totalProducts || 0],
      ['Total Users', analytics?.totalUsers || 0],
      [''],
      ['Top Products', ''],
      ['Product Name', 'Units Sold', 'Revenue'],
      ...(analytics?.topProducts || []).map(product => [
        product._id,
        product.totalSold,
        product.totalRevenue
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analytics-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
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
          onClick={fetchAnalytics}
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track your store performance and insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={exportAnalytics}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
          <button
            onClick={fetchAnalytics}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(analytics?.totalEarnings || 0)}
              </p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">+12.5%</span>
            <span className="text-gray-600 dark:text-gray-400 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{analytics?.totalOrders || 0}</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">+8.2%</span>
            <span className="text-gray-600 dark:text-gray-400 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Products</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{analytics?.totalProducts || 0}</p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg">
              <Package className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">+15</span>
            <span className="text-gray-600 dark:text-gray-400 ml-1">new products</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Customers</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{analytics?.totalUsers || 0}</p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/20 p-3 rounded-lg">
              <Users className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">+5.8%</span>
            <span className="text-gray-600 dark:text-gray-400 ml-1">vs last month</span>
          </div>
        </div>
      </div>

      {/* Earnings Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Revenue Trends</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Track your revenue over time</p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last year</option>
              </select>
              <select
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="day">Daily</option>
                <option value="week">Weekly</option>
                <option value="month">Monthly</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {earningsLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="h-64 flex items-end justify-between space-x-2">
              {earningsData.slice(-10).map((item, index) => {
                const maxValue = Math.max(...earningsData.map(d => d.total))
                const height = (item.total / maxValue) * 100
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-blue-500 rounded-t-md min-h-[4px] transition-all duration-300 hover:bg-blue-600"
                      style={{ height: `${Math.max(height, 4)}%` }}
                      title={`${formatCurrency(item.total)} (${item.count} orders)`}
                    />
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center">
                      {groupBy === 'day' && `${item._id.day}/${item._id.month}`}
                      {groupBy === 'week' && `W${item._id.week}`}
                      {groupBy === 'month' && `${item._id.month}/${item._id.year}`}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Top Products and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Products */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Selling Products</h3>
              <Star className="h-5 w-5 text-yellow-500" />
            </div>
          </div>
          <div className="p-6">
            {analytics?.topProducts && analytics.topProducts.length > 0 ? (
              <div className="space-y-4">
                {analytics.topProducts.map((product, index) => (
                  <div key={product._id} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                    <div className="flex items-center">
                      <div className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium mr-3">
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
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(product.totalRevenue)}
                      </p>
                      <div className="flex items-center text-sm text-green-600">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Popular
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No sales data available
              </div>
            )}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Performance Metrics</h3>
              <BarChart3 className="h-5 w-5 text-blue-500" />
            </div>
          </div>
          <div className="p-6 space-y-6">
            {/* Average Order Value */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Order Value</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {analytics?.totalOrders ? 
                    formatCurrency((analytics.totalEarnings || 0) / analytics.totalOrders) 
                    : formatCurrency(0)
                  }
                </p>
              </div>
              <div className="flex items-center text-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">+5.2%</span>
              </div>
            </div>

            {/* Conversion Rate */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {analytics?.totalUsers && analytics?.totalOrders ? 
                    `${((analytics.totalOrders / analytics.totalUsers) * 100).toFixed(1)}%`
                    : '0%'
                  }
                </p>
              </div>
              <div className="flex items-center text-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">+2.1%</span>
              </div>
            </div>

            {/* Products per Order */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Products per Order</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">2.4</p>
              </div>
              <div className="flex items-center text-red-600">
                <ArrowDownRight className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">-0.3%</span>
              </div>
            </div>

            {/* Customer Lifetime Value */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Customer Lifetime Value</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {analytics?.totalUsers ? 
                    formatCurrency((analytics.totalEarnings || 0) / analytics.totalUsers) 
                    : formatCurrency(0)
                  }
                </p>
              </div>
              <div className="flex items-center text-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">+8.7%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Earnings Breakdown */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Monthly Performance</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Revenue and order trends by month</p>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Month</th>
                  <th className="text-right py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Revenue</th>
                  <th className="text-right py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Orders</th>
                  <th className="text-right py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Avg Order</th>
                  <th className="text-right py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {analytics?.monthlyEarnings?.slice(0, 6).map((month, index) => {
                  const monthName = new Date(month._id.year, month._id.month - 1).toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })
                  const avgOrder = month.count > 0 ? month.total / month.count : 0
                  const prevMonth = analytics.monthlyEarnings[index + 1]
                  const growth = prevMonth ? getGrowthRate(month.total, prevMonth.total) : 0
                  
                  return (
                    <tr key={`${month._id.year}-${month._id.month}`}>
                      <td className="py-4 text-gray-900 dark:text-white font-medium">{monthName}</td>
                      <td className="py-4 text-right text-gray-900 dark:text-white font-semibold">
                        {formatCurrency(month.total)}
                      </td>
                      <td className="py-4 text-right text-gray-900 dark:text-white">{month.count}</td>
                      <td className="py-4 text-right text-gray-900 dark:text-white">
                        {formatCurrency(avgOrder)}
                      </td>
                      <td className="py-4 text-right">
                        <div className={`flex items-center justify-end ${
                          growth >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {growth >= 0 ? (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 mr-1" />
                          )}
                          <span className="font-medium">
                            {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                          </span>
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