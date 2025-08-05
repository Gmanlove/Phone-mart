"use client"

import { useState, useCallback, useEffect, SetStateAction } from "react"
import { Search, ShoppingCart, User, Menu, X, Phone, ChevronDown, MapPin, Clock, Heart, Truck, LogOut } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import Image from "next/image"

// Mock components for demonstration
import { ReactNode, ButtonHTMLAttributes } from "react"

type ButtonProps = {
  variant?: "default" | "ghost" | "outline" | "secondary" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  children?: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ variant = "default", size = "default", className = "", children, ...props }: ButtonProps) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500",
    ghost: "hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-100",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 focus-visible:ring-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
    destructive: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
  }
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  }
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

const Input = ({ className = "", ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400 dark:focus-visible:ring-blue-400 ${className}`}
    {...props}
  />
)

export default function Header() {
  const cartContext = useCart()
  const authContext = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  // Safe access to cart items with fallback
  const cartItems = cartContext?.items || []
  const user = authContext?.user
  const logout = authContext?.logout

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }, [searchQuery])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  const closeProfile = useCallback(() => {
    setIsProfileOpen(false)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close menu if clicking outside
      if (isMenuOpen) {
        const menu = document.getElementById('mobile-menu')
        if (menu && !menu.contains(event.target as Node)) {
          closeMenu()
        }
      }

      // Close profile if clicking outside
      if (isProfileOpen) {
        const profile = document.getElementById('profile-dropdown')
        if (profile && !profile.contains(event.target as Node)) {
          closeProfile()
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen, isProfileOpen, closeMenu, closeProfile])

  const handleLogout = async () => {
    if (logout) {
      await logout()
    }
    closeProfile()
  }

  return (
    <>
      {/* Top Bar */}
      <div className="bg-blue-600 dark:bg-blue-700 text-white py-2 px-4 text-sm">
        <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center space-y-1 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Phone className="h-4 w-4 text-blue-300 mr-1" />
              <strong>0814 645 2793</strong>
            </span>
            <span className="hidden md:flex items-center">
              <MapPin className="h-4 w-4 text-blue-300 mr-1" />
              Uyo, Akwa Ibom State
            </span>
          </div>
          <div className="flex items-center space-x-4 text-xs sm:text-sm">
            <span className="flex items-center">
              <Clock className="h-4 w-4 text-blue-300 mr-1" />
              Mon-Sat: 9AM-8PM WAT
            </span>
            <span className="flex items-center">
              <Truck className="h-4 w-4 text-blue-300 mr-1" />
              Free delivery on orders over ₦50,000
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Image
                  src="/smart.png"
                  alt="Smart Communications Logo"
                  width={40}
                  height={40}
                  className="w-8 h-8 lg:w-10 lg:h-10 object-contain group-hover:scale-110 transition-transform duration-200"
                />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  Smart Communications
                </span>
              </div>
            </Link>

            {/* Desktop Search */}
            <div className="hidden lg:block flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Search for smartphones, accessories, and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Button 
                  type="submit" 
                  size="sm" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-lg"
                >
                  Search
                </Button>
              </form>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
                <div className="relative" id="profile-dropdown">
                  <Button
                    variant="ghost"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <User className="h-5 w-5" />
                    <span className="text-sm font-medium">
                      {user.name ? user.name.split(' ')[0] : 'Account'}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.name || 'User'}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {user.email}
                        </p>
                      </div>
                      
                      <div className="py-1">
                        <Link
                          href="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={closeProfile}
                        >
                          <User className="h-4 w-4 mr-2" />
                          Profile Settings
                        </Link>
                        <Link
                          href="/orders"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={closeProfile}
                        >
                          <Truck className="h-4 w-4 mr-2" />
                          My Orders
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login">
                  <Button variant="ghost" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                    <User className="h-5 w-5 mr-2" />
                    Sign In
                  </Button>
                </Link>
              )}

              <Link href="/cart" className="relative">
                <Button variant="ghost" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {cartItemsCount}
                    </span>
                  )}
                </Button>
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center space-x-2">
              <Link href="/cart" className="relative">
                <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {cartItemsCount}
                    </span>
                  )}
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 dark:text-gray-300"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="lg:hidden pb-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search for smartphones, accessories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div id="mobile-menu" className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="px-4 py-4 space-y-3">
              {/* Navigation Links */}
              <div className="space-y-2">
                <Link
                  href="/"
                  className="block py-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                  onClick={closeMenu}
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className="block py-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                  onClick={closeMenu}
                >
                  All Products
                </Link>
                <Link
                  href="/deals"
                  className="block py-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                  onClick={closeMenu}
                >
                  Deals
                </Link>
                <Link
                  href="/accessories"
                  className="block py-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                  onClick={closeMenu}
                >
                  Accessories
                </Link>
                <Link
                  href="/support"
                  className="block py-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                  onClick={closeMenu}
                >
                  Support
                </Link>
              </div>

              {/* User Actions */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                {user ? (
                  <>
                    <div className="py-2">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.name || 'User'}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/profile"
                      className="flex items-center py-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                      onClick={closeMenu}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                    <Link
                      href="/orders"
                      className="flex items-center py-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                      onClick={closeMenu}
                    >
                      <Truck className="h-4 w-4 mr-2" />
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center py-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center py-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                    onClick={closeMenu}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}