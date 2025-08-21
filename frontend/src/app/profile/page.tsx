"use client"

import React from "react"
import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useOrders } from '@/contexts/order-context'

type Billing = {
  fullName?: string
  addressLine1?: string
  addressLine2?: string
  city?: string
  state?: string
  country?: string
  postalCode?: string
  phone?: string
  totalSpent?: number
  totalChange?: string
}

type Profile = {
  email?: string
  name?: string
  phone?: string
  createdAt?: string
  isAdmin?: boolean
  billing?: Billing
}

export default function ProfilePage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const { orders = [], fetchUserOrders = async () => {} } = useOrders() || {}
  const [billing, setBilling] = useState<Billing>({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    phone: ''
  })
  const [loadingBilling, setLoadingBilling] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    const fetchBilling = async () => {
      if (!user || !user.email) return
      setLoadingBilling(true)
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://smartcoms.onrender.com'
  const token = localStorage.getItem('token') || ''
  console.log('fetchBilling: using token length', token ? token.length : 0)
  const headers: Record<string, string> = {}
  if (token) headers.Authorization = `Bearer ${token}`
  const res = await fetch(`${API_BASE_URL}/api/auth/billing`, { headers })
        if (res.ok) {
          const data = await res.json()
          setBilling({ ...(data.billing || {}) })
        }
      } catch (err) {
        console.error('Failed to fetch billing', err)
      } finally {
        setLoadingBilling(false)
      }
    }
    const fetchProfile = async () => {
      if (!user?.email) return
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://smartcoms.onrender.com'
  const token = localStorage.getItem('token') || ''
  console.log('fetchProfile: using token length', token ? token.length : 0)
  const headersP: Record<string, string> = {}
  if (token) headersP.Authorization = `Bearer ${token}`
  const res = await fetch(`${API_BASE_URL}/api/auth/profile`, { headers: headersP })
        if (res.ok) {
          const data = await res.json()
          setProfile(data)
          // also set billing from profile if empty
          if (!billing.fullName && data.billing) setBilling(prev => ({ ...prev, ...(data.billing || {}) }))
        }
      } catch (err) {
        console.error('Failed to fetch profile', err)
      }
    }

    fetchBilling()
    fetchProfile()
  }, [user])

  const handleChange = (field: string, value: string) => {
    setBilling(prev => ({ ...prev, [field]: value }))
  }

  const saveBilling = async () => {
    if (!user || !user.email) {
      setMessage('You must be signed in to save billing information.')
      return
    }
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://smartcoms.onrender.com'
      const token = localStorage.getItem('token') || ''
      console.log('saveBilling: token present?', !!token)
      const headers: Record<string, string> = { 'Content-Type': 'application/json' }
      if (token) headers.Authorization = `Bearer ${token}`
      const res = await fetch(`${API_BASE_URL}/api/auth/billing`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ billing })
      })
      if (res.ok) {
        setMessage('Billing information saved')
      } else {
        const err = await res.json()
        setMessage(err.error || 'Failed to save billing')
      }
    } catch (err) {
      console.error(err)
      setMessage('Failed to save billing')
    }
    setTimeout(() => setMessage(null), 3000)
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12 sm:py-16 lg:py-20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
              {/* Profile Avatar */}
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-16 lg:h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                  Welcome, {profile?.email || user?.email || 'Customer'}
                </h1>
                <p className="text-blue-100 text-base sm:text-lg mb-4">
                  Member since {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : '—'} • {profile?.isAdmin ? 'Admin' : 'Member'}
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <span className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {profile?.email ? 'Verified' : 'Unverified'}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 bg-yellow-500/30 backdrop-blur-sm rounded-full text-sm text-white">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    Premium
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-4">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Menu</h2>
                <nav className="space-y-1">
                  {[
                    { name: "Profile Overview", icon: "user", active: true },
                    { name: "Personal Info", icon: "id-card" },
                    { name: "Orders & Returns", icon: "shopping-bag" },
                    { name: "Payment Methods", icon: "credit-card" },
                    { name: "Addresses", icon: "location-marker" },
                    { name: "Notifications", icon: "bell" },
                    { name: "Security", icon: "shield-check" },
                    { name: "Help & Support", icon: "support" }
                  ].map((item, index) => (
                    <button
                      key={index}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                        item.active 
                          ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <NavIcon name={item.icon} />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
              
              {/* Logout Button */}
              <div className="p-6 border-t border-gray-200">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6 lg:space-y-8">
            
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { 
                    title: "Edit Profile", 
                    description: "Update your personal information", 
                    icon: "edit",
                    color: "blue"
                  },
                  { 
                    title: "View Orders", 
                    description: "Track your recent purchases", 
                    icon: "package",
                    color: "green"
                  },
                  { 
                    title: "Payment Settings", 
                    description: "Manage cards and billing", 
                    icon: "credit-card",
                    color: "purple"
                  },
                  { 
                    title: "Address Book", 
                    description: "Update shipping addresses", 
                    icon: "location",
                    color: "orange"
                  },
                  { 
                    title: "Security", 
                    description: "Password and 2FA settings", 
                    icon: "shield",
                    color: "red"
                  },
                  { 
                    title: "Help Center", 
                    description: "Get support and answers", 
                    icon: "help",
                    color: "indigo"
                  }
                ].map((action, index) => (
                  <button
                    key={index}
                    className="group p-4 sm:p-6 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-lg transition-all duration-200 text-left"
                  >
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-${action.color}-100 flex items-center justify-center mb-3 group-hover:bg-${action.color}-200 transition-colors duration-200`}>
                      <ActionIcon name={action.icon} color={action.color} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
                      {action.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {action.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Billing Information */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Billing Information</h2>
                <p className="text-sm text-gray-500">{user?.email || ''}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input className="p-3 border rounded-lg" placeholder="Full name" value={billing.fullName} onChange={(e) => handleChange('fullName', e.target.value)} />
                <input className="p-3 border rounded-lg" placeholder="Phone" value={billing.phone} onChange={(e) => handleChange('phone', e.target.value)} />
                <input className="p-3 border rounded-lg col-span-2" placeholder="Address line 1" value={billing.addressLine1} onChange={(e) => handleChange('addressLine1', e.target.value)} />
                <input className="p-3 border rounded-lg col-span-2" placeholder="Address line 2" value={billing.addressLine2} onChange={(e) => handleChange('addressLine2', e.target.value)} />
                <input className="p-3 border rounded-lg" placeholder="City" value={billing.city} onChange={(e) => handleChange('city', e.target.value)} />
                <input className="p-3 border rounded-lg" placeholder="State/Region" value={billing.state} onChange={(e) => handleChange('state', e.target.value)} />
                <input className="p-3 border rounded-lg" placeholder="Country" value={billing.country} onChange={(e) => handleChange('country', e.target.value)} />
                <input className="p-3 border rounded-lg" placeholder="Postal Code" value={billing.postalCode} onChange={(e) => handleChange('postalCode', e.target.value)} />
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button onClick={saveBilling} className="bg-blue-600 text-white px-4 py-2 rounded-lg">Save Billing</button>
                {message && <span className="text-sm text-green-600">{message}</span>}
                {loadingBilling && <span className="text-sm text-gray-500">Loading...</span>}
              </div>
            </div>

            {/* Account Statistics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { label: "Total Orders", value: String(orders?.length || 0), icon: "shopping-bag", change: "+3 this month" },
                { label: "Total Spent", value: profile?.billing?.totalSpent ? profile.billing.totalSpent : '-', icon: "currency", change: profile?.billing?.totalChange ? profile.billing.totalChange : '' },
                { label: "Saved Items", value: "18", icon: "heart", change: "+2 recently" },
                { label: "Reward Points", value: "1,250", icon: "star", change: "+50 earned" }
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <StatIcon name={stat.icon} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm font-medium text-gray-900">{stat.label}</p>
                    <p className="text-xs text-green-600">{stat.change}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Recent Activity</h2>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  View All Activity →
                </button>
              </div>
              
              <div className="space-y-4">
                {[
                  { 
                    action: "Order placed", 
                    details: "iPhone 15 Pro Max - Space Black", 
                    time: "2 hours ago",
                    type: "order"
                  },
                  { 
                    action: "Profile updated", 
                    details: "Changed shipping address", 
                    time: "1 day ago",
                    type: "profile"
                  },
                  { 
                    action: "Review submitted", 
                    details: "5-star review for Samsung Galaxy S24", 
                    time: "3 days ago",
                    type: "review"
                  },
                  { 
                    action: "Payment method added", 
                    details: "Visa ending in 4532", 
                    time: "1 week ago",
                    type: "payment"
                  }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      activity.type === 'order' ? 'bg-green-100' :
                      activity.type === 'profile' ? 'bg-blue-100' :
                      activity.type === 'review' ? 'bg-yellow-100' : 'bg-purple-100'
                    }`}>
                      <ActivityIcon type={activity.type} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600 truncate">{activity.details}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 rounded-2xl p-6 sm:p-8 text-white">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Personalized for You</h2>
              <p className="text-purple-100 mb-6">
                Based on your purchase history and preferences, we&apos;ve found some products you might love.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl p-4 text-left transition-all duration-200">
                  <h3 className="font-semibold mb-2">Recommended Phones</h3>
                  <p className="text-sm text-purple-100">Discover the latest smartphones picked just for you</p>
                </button>
                <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl p-4 text-left transition-all duration-200">
                  <h3 className="font-semibold mb-2">Exclusive Deals</h3>
                  <p className="text-sm text-purple-100">Special offers available only to premium members</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper Components for Icons
function NavIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactElement> = {
    user: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    "id-card": <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>,
    "shopping-bag": <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" /></svg>,
    "credit-card": <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
    "location-marker": <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    bell: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
    "shield-check": <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    support: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
  }
  return icons[name] || icons.user
}

function ActionIcon({ name, color }: { name: string; color: string }) {
  const iconClass = `w-5 h-5 sm:w-6 sm:h-6 text-${color}-600`
  const icons: Record<string, React.ReactElement> = {
    edit: <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    package: <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
    "credit-card": <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
    location: <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>,
    shield: <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    help: <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  }
  return icons[name] || icons.edit
}

function StatIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactElement> = {
    "shopping-bag": <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" /></svg>,
    currency: <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    heart: <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
    star: <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
  }
  return icons[name] || icons.star
}

function ActivityIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactElement> = {
    order: <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" /></svg>,
    profile: <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    review: <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>,
    payment: <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
  }
  return icons[type] || icons.profile
}