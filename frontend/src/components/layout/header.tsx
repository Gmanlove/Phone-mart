"use client"
import { useState, useCallback, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { 
  Search, ShoppingCart, User, Menu, X, ChevronDown, 
  Phone, MapPin, Clock, Truck
} from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"

// Simple components (since they're defined at bottom of file)
const Button = ({ children, variant = "default", size = "default", className = "", onClick, ...props }: {
  children: React.ReactNode;
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
  
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700",
    ghost: "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 hover:text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
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
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

const Input = ({ className = "", ...props }: { className?: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400 dark:focus-visible:ring-blue-400 ${className}`}
    {...props}
  />
)

export default function Header() {
  const cartContext = useCart()
  const authContext = useAuth()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Safe access to cart items with fallback
  const cartItems = cartContext?.items || []
  const user = authContext?.user
  const logout = authContext?.logout

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  // Prevent hydration mismatch by only showing cart count after mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  // Mobile search state and ref for expanding input
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const mobileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (mobileSearchOpen) {
      // focus the input when opened
      setTimeout(() => mobileInputRef.current?.focus(), 50)
    }
  }, [mobileSearchOpen])

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to products page with search query
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("") // Clear search after navigation
    }
  }, [searchQuery, router])

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
  {/* Top Bar removed per request */}

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-gray-50/95 dark:bg-slate-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-600 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                {/* Light mode logo */}
                <Image
                  src="/smartfullB.png"
                  alt="Smart Communications logo"
                  width={200}
                  height={60}
                  className="w-40 h-12 md:w-44 md:h-14 lg:w-56 lg:h-16 object-contain dark:hidden transition-transform duration-200"
                />

                {/* Dark mode logo */}
                <Image
                  src="/smartfull.png"
                  alt="Smart Communications logo"
                  width={200}
                  height={60}
                  className="hidden dark:block w-40 h-12 md:w-44 md:h-14 lg:w-56 lg:h-16 object-contain transition-transform duration-200"
                />
              </div>
              {/* Removed text label to give logo more presence */}
            </Link>

            {/* Mobile: compact search icon that expands when active */}
            <div className="lg:hidden flex items-center space-x-2">
              <div className="relative">
                <button
                  onClick={() => setMobileSearchOpen((s) => !s)}
                  aria-label="Open search"
                  className="p-2 rounded-full text-gray-700 dark:text-gray-300 bg-white/0 hover:bg-white/5 transition"
                >
                  <Search className="h-5 w-5" />
                </button>

                <form onSubmit={(e) => { e.preventDefault(); handleSearch(e); setMobileSearchOpen(false) }} className={`absolute right-0 top-0 transform transition-all duration-200 ${mobileSearchOpen ? 'translate-y-0 opacity-100' : 'translate-y-0 opacity-0 pointer-events-none'}`}>
                  <div className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden" style={{ width: mobileSearchOpen ? '220px' : '0px', transition: 'width 220ms ease' }}>
                    <input
                      ref={mobileInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full px-3 py-2 text-sm bg-transparent border-0 outline-none"
                    />
                    <button type="submit" className="px-3 py-2 bg-blue-600 text-white rounded-full mr-1 ml-1">Search</button>
                  </div>
                </form>
              </div>

            {/* Mobile Actions: cart + hamburger */}
            <div className="lg:hidden flex items-center space-x-2">
              <Link href="/cart" className="relative">
                <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300">
                  <ShoppingCart className="h-5 w-5" />
                  {mounted && cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {cartItemsCount}
                    </span>
                  )}
                </Button>
              </Link>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 dark:text-gray-300 p-2 rounded-md"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>

            {/* Desktop Search - Fixed to remove duplicate search icon */}
            <div className="hidden lg:block flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="relative group">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search smartphones, accessories, brands..."
                    value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-14 py-3 rounded-full border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 group-hover:shadow-md"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Search products"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                </div>
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
                      {user.email ? user.email.split('@')[0] : 'Account'}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.email || 'User'}
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
                          Profile
                        </Link>
                        <Link
                          href="/orders"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={closeProfile}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Orders
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <X className="h-4 w-4 mr-2" />
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
                <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300">
                  <ShoppingCart className="h-5 w-5" />
                  {mounted && cartItemsCount > 0 && (
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

          {/* mobile search moved inline with logo */}

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
                        {user.email || 'User'}
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
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Orders
                    </Link>
                    <Link
                      href="/cart"
                      className="flex items-center py-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                      onClick={closeMenu}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Cart ({cartItemsCount})
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        closeMenu()
                      }}
                      className="flex items-center py-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 w-full text-left"
                    >
                      <X className="h-4 w-4 mr-2" />
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