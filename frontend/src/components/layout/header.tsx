"use client"

import { useState, useCallback, useEffect } from "react"
import { Search, ShoppingCart, User, Menu, X, Phone, ChevronDown, MapPin, Clock, Heart, Truck, LogOut } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

// Mock components for demonstration
const Button = ({ variant = "default", size = "default", className = "", children, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500",
    ghost: "hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-500",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 focus-visible:ring-gray-500",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500",
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
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
)

const Badge = ({ variant = "default", className = "", children }) => {
  const variants = {
    default: "bg-blue-600 text-white",
    secondary: "bg-gray-100 text-gray-900",
    destructive: "bg-red-600 text-white",
    outline: "border border-gray-300 text-gray-900",
  }
  
  return (
    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`}>
      {children}
    </div>
  )
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  
  const { itemCount } = useCart()
  const { isAuthenticated, user, logout } = useAuth()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
        setIsSearchOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Close mobile menu and search on escape or outside click
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false)
        setIsSearchOpen(false)
      }
    }

    const handleClickOutside = (e) => {
      if (!e.target.closest("[data-mobile-menu]") && !e.target.closest("[data-search-toggle]")) {
        setIsMenuOpen(false)
      }
      if (!e.target.closest("[data-mobile-search]") && !e.target.closest("[data-search-toggle]")) {
        setIsSearchOpen(false)
      }
    }

    if (isMenuOpen || isSearchOpen) {
      document.addEventListener("keydown", handleEscape)
      document.addEventListener("click", handleClickOutside)
      if (isMenuOpen) document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.removeEventListener("click", handleClickOutside)
      if (isMenuOpen) document.body.style.overflow = "unset"
    }
  }, [isMenuOpen, isSearchOpen])

  const toggleMobileMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
    setIsSearchOpen(false)
  }, [])

  const toggleMobileSearch = useCallback(() => {
    setIsSearchOpen(prev => !prev)
    setIsMenuOpen(false)
  }, [])

  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log(`Searching for: ${searchQuery.trim()}`)
      setIsSearchOpen(false)
    }
  }, [searchQuery])

  const closeMobileMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  const handleLogout = () => {
    logout()
    // Optional: redirect to home page
    window.location.href = '/'
  }

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200/50' 
            : 'bg-white shadow-sm border-b border-gray-200'
        }`}
      >
        {/* Top announcement bar - Responsive visibility */}
        <div className="hidden lg:block bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-2.5 text-sm">
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-blue-300" />
                  <span className="text-gray-200">Mon-Sat 9AM-8PM</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-blue-300" />
                  <a 
                    href="tel:08146452793" 
                    className="text-gray-200 hover:text-blue-300 transition-colors duration-200"
                  >
                    0814 645 2793
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-blue-300" />
                  <span className="text-gray-200">Uyo, Akwa Ibom</span>
                </div>
              </div>
              <div className="flex items-center space-x-8 text-gray-200">
                <div className="flex items-center space-x-2">
                  <Truck className="h-4 w-4 text-green-400" />
                  <span className="font-medium">Free shipping on orders over ₦100,000</span>
                </div>
                <Link href="/track-order" className="hover:text-blue-300 transition-colors duration-200">
                  Track Order
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            
            {/* Logo and Brand */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-2 lg:p-2.5 shadow-lg group-hover:shadow-xl transition-all duration-200">
                    <Phone className="h-6 w-6 lg:h-7 lg:w-7 text-white" />
                  </div>
                </div>
                <div className="hidden sm:block">
                  <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    PhoneMart
                  </span>
                  <div className="text-xs text-gray-500 font-medium -mt-1">
                    Premium Electronics
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden xl:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Input
                  type="search"
                  placeholder="Search for phones, accessories, and more..."
                  className="w-full pl-4 pr-24 py-3 text-base rounded-full border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 bg-gray-50 focus:bg-white transition-all duration-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit(e)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <Button 
                    onClick={handleSearchSubmit}
                    size="sm" 
                    className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 font-medium transition-all duration-200 hover:shadow-lg"
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
              
              {/* Mobile Search Toggle */}
              <Button 
                variant="ghost" 
                size="icon"
                className="xl:hidden rounded-full p-2 hover:bg-gray-100 transition-all duration-200" 
                onClick={toggleMobileSearch}
                data-search-toggle
              >
                <Search className="h-5 w-5 text-gray-600" />
              </Button>

              {/* Wishlist - Hidden on very small screens */}
              <Link href="/wishlist" className="hidden sm:block">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="relative rounded-full p-2 hover:bg-gray-100 transition-all duration-200"
                >
                  <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
                </Button>
              </Link>

              {/* User menu - Enhanced responsive dropdown */}
              <div className="hidden lg:block">
                <div className="relative group">
                  <Button 
                    variant="ghost" 
                    className="flex items-center space-x-2 rounded-full px-3 py-2 hover:bg-gray-100 transition-all duration-200"
                  >
                    <div className="rounded-full bg-gradient-to-r from-blue-500 to-blue-600 p-1.5">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="hidden xl:block text-sm font-medium text-gray-700">
                      {isAuthenticated ? 'Account' : 'Sign In'}
                    </span>
                    <ChevronDown className="h-4 w-4 text-gray-500 transition-transform group-hover:rotate-180 duration-200" />
                  </Button>
                  
                  {/* Dropdown menu */}
                  <div className="absolute right-0 top-full mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                      {isAuthenticated ? (
                        <div className="py-2">
                          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                            <p className="text-sm font-semibold text-gray-900">Welcome back!</p>
                            <p className="text-xs text-gray-500">{user?.email}</p>
                          </div>
                          <Link href="/profile" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                            <User className="mr-3 h-4 w-4" />
                            My Account
                          </Link>
                          <Link href="/orders" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                            <ShoppingCart className="mr-3 h-4 w-4" />
                            My Orders
                          </Link>
                          <div className="border-t border-gray-100">
                            <button 
                              onClick={handleLogout}
                              className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <LogOut className="mr-3 h-4 w-4" />
                              Sign Out
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="py-2">
                          <Link href="/login" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                            Sign In
                          </Link>
                          <Link href="/register" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                            Create Account
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Cart */}
              <Link href="/cart">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="relative rounded-full p-2 hover:bg-gray-100 transition-all duration-200 hover:scale-105"
                >
                  <div className="rounded-full bg-gradient-to-r from-green-500 to-emerald-600 p-1.5">
                    <ShoppingCart className="h-4 w-4 text-white" />
                  </div>
                  {itemCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs font-bold bg-red-500 text-white rounded-full border-2 border-white">
                      {itemCount > 9 ? '9+' : itemCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Mobile menu button */}
              <Button 
                variant="ghost" 
                size="icon"
                className="lg:hidden rounded-full p-2 hover:bg-gray-100 transition-all duration-200"
                onClick={toggleMobileMenu}
                data-mobile-menu
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div 
            className="xl:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md"
            data-mobile-search
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Input
                  type="search"
                  placeholder="Search for phones, accessories..."
                  className="w-full pl-4 pr-20 py-3 text-base rounded-full border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <Button 
                  type="submit"
                  size="sm" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 text-sm font-medium"
                >
                  Search
                </Button>
              </form>
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div 
            className="lg:hidden fixed inset-x-0 top-full bg-white border-t border-gray-200 shadow-xl z-40"
            data-mobile-menu
          >
            <div className="px-4 py-6 space-y-4">
              
              {/* Authentication Section */}
              <div className="border-b border-gray-200 pb-4 mb-4">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="rounded-full bg-gradient-to-r from-blue-500 to-blue-600 p-2">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Welcome back!</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Link href="/profile" onClick={closeMobileMenu}>
                        <Button variant="outline" className="w-full justify-start">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Button>
                      </Link>
                      <Link href="/orders" onClick={closeMobileMenu}>
                        <Button variant="outline" className="w-full justify-start">
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Orders
                        </Button>
                      </Link>
                    </div>
                    <Button 
                      variant="destructive" 
                      className="w-full justify-start"
                      onClick={() => {
                        handleLogout()
                        closeMobileMenu()
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link href="/login" onClick={closeMobileMenu}>
                      <Button className="w-full">Sign In</Button>
                    </Link>
                    <Link href="/register" onClick={closeMobileMenu}>
                      <Button variant="outline" className="w-full">Create Account</Button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Navigation Links */}
              <div className="space-y-3">
                <Link href="/products" onClick={closeMobileMenu}>
                  <Button variant="ghost" className="w-full justify-start text-base font-medium">
                    All Products
                  </Button>
                </Link>
                <Link href="/deals" onClick={closeMobileMenu}>
                  <Button variant="ghost" className="w-full justify-start text-base font-medium">
                    Deals & Offers
                  </Button>
                </Link>
                <Link href="/accessories" onClick={closeMobileMenu}>
                  <Button variant="ghost" className="w-full justify-start text-base font-medium">
                    Accessories
                  </Button>
                </Link>
                <Link href="/support" onClick={closeMobileMenu}>
                  <Button variant="ghost" className="w-full justify-start text-base font-medium">
                    Support
                  </Button>
                </Link>
                <Link href="/track-order" onClick={closeMobileMenu}>
                  <Button variant="ghost" className="w-full justify-start text-base font-medium">
                    Track Order
                  </Button>
                </Link>
              </div>

              {/* Contact Info */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <a href="tel:08146452793" className="hover:text-blue-600 transition-colors">
                    0814 645 2793
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>Uyo, Akwa Ibom</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-16 lg:h-[4.5rem]" />
    </>
  )
}