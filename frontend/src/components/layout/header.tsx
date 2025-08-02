"use client"

import { useState, useCallback, useEffect } from "react"
import { Search, ShoppingCart, User, Menu, X, Phone, ChevronDown, MapPin, Clock, Heart, Truck } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

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

const Link = ({ href, className = "", children, ...props }) => (
  <a href={href} className={className} {...props}>
    {children}
  </a>
)

// Navigation data
const MAIN_NAVIGATION = [
  { href: "/products", label: "All Phones" },
  { href: "/products?brand=apple", label: "iPhone" },
  { href: "/products?brand=samsung", label: "Samsung" },
  { href: "/products?brand=google", label: "Google Pixel" },
  { href: "/accessories", label: "Accessories" },
  { href: "/deals", label: "Hot Deals", isSpecial: true },
]

const USER_MENU_ITEMS = [
  { href: "/login", label: "Sign In" },
  { href: "/register", label: "Create Account" },
  { href: "/profile", label: "My Account" },
  { href: "/orders", label: "My Orders" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { items } = useCart() // Use the real cart context
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const itemCount = items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when window resizes
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
                <Link href="/support" className="hover:text-blue-300 transition-colors duration-200">
                  24/7 Support
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo - Enhanced responsive design */}
            <Link 
              href="/" 
              className="flex flex-shrink-0 items-center space-x-2 lg:space-x-3 group"
            >
              <div className="relative">
                <div className="rounded-xl lg:rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-2 lg:p-3 text-white shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
                  <Phone className="h-5 w-5 lg:h-6 lg:w-6" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 lg:-top-1 lg:-right-1 h-3 w-3 lg:h-4 lg:w-4 bg-red-500 rounded-full animate-pulse shadow-sm"></div>
              </div>
              <div className="hidden sm:block">
                <div className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  PhoneMart
                </div>
                <div className="text-xs lg:text-sm text-gray-500 font-medium -mt-1">
                  Premium Mobile Store
                </div>
              </div>
            </Link>

            {/* Desktop Search bar - Hidden on mobile/tablet */}
            <div className="hidden xl:flex flex-1 max-w-2xl mx-8">
              <div onSubmit={handleSearchSubmit} className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="search"
                  placeholder="Search iPhone, Samsung, Google Pixel, accessories..."
                  className="w-full rounded-full border-2 border-gray-200 bg-gray-50/80 py-3 pl-12 pr-24 text-base transition-all duration-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 hover:bg-white hover:border-gray-300"
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
                    <span className="hidden xl:block text-sm font-medium text-gray-700">Account</span>
                    <ChevronDown className="h-4 w-4 text-gray-500 transition-transform group-hover:rotate-180 duration-200" />
                  </Button>
                  
                  {/* Dropdown menu */}
                  <div className="absolute right-0 top-full mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                      {isLoggedIn ? (
                        <div className="py-2">
                          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                            <p className="text-sm font-semibold text-gray-900">Welcome back!</p>
                            <p className="text-xs text-gray-500">user@example.com</p>
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
                            <button className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors">
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
                    <Badge 
                      className="absolute -right-1 -top-1 h-5 w-5 flex items-center justify-center border-2 border-white bg-red-500 text-white text-xs font-bold rounded-full animate-bounce"
                    >
                      {itemCount > 99 ? "99+" : itemCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Mobile menu toggle */}
              <Button 
                variant="ghost" 
                size="icon"
                className="lg:hidden rounded-full p-2 hover:bg-gray-100 transition-all duration-200" 
                onClick={toggleMobileMenu}
                data-mobile-menu
              >
                <div className="relative">
                  {isMenuOpen ? (
                    <X className="h-5 w-5 text-gray-600 transition-transform duration-300 rotate-90" />
                  ) : (
                    <Menu className="h-5 w-5 text-gray-600 transition-transform duration-300" />
                  )}
                </div>
              </Button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block border-t border-gray-100 py-4">
            <div className="flex items-center justify-center space-x-8">
              {MAIN_NAVIGATION.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative font-medium transition-all duration-300 hover:scale-105 group ${
                    item.isSpecial 
                      ? "text-red-600 hover:text-red-700 font-semibold" 
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {item.label}
                  {item.isSpecial && (
                    <span className="absolute -top-2 -right-3 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                  )}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </nav>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="xl:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm" data-mobile-search>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full rounded-full border-2 border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-base focus:border-blue-500 focus:bg-white transition-all duration-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit(e)}
                  autoFocus
                />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile menu overlay and panel */}
      {isMenuOpen && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden" 
            onClick={closeMobileMenu}
          />
          
          <div 
            className="fixed top-0 right-0 z-50 h-full w-full max-w-sm overflow-y-auto bg-white shadow-2xl transition-transform duration-300 lg:hidden" 
            data-mobile-menu
          >
            <div className="p-6">
              {/* Mobile header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 p-2 text-white">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">PhoneMart</div>
                    <div className="text-xs text-gray-500">Premium Mobile Store</div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={closeMobileMenu}
                  className="rounded-full"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Mobile navigation */}
              <nav className="space-y-1">
                {MAIN_NAVIGATION.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between rounded-xl px-4 py-4 font-medium transition-all duration-200 ${
                      item.isSpecial 
                        ? "bg-red-50 text-red-600 hover:bg-red-100" 
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                    onClick={closeMobileMenu}
                  >
                    <span>{item.label}</span>
                    {item.isSpecial && (
                      <Badge className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        HOT
                      </Badge>
                    )}
                  </Link>
                ))}
                
                <div className="my-6 border-t border-gray-200" />
                
                {/* User menu items */}
                <div className="space-y-1">
                  <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Account
                  </h3>
                  {USER_MENU_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center rounded-xl px-4 py-4 font-medium text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* Contact info */}
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <div className="rounded-xl bg-gradient-to-r from-blue-50 to-slate-50 p-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Get in Touch</h3>
                    <div className="space-y-3">
                      <a 
                        href="tel:08146452793" 
                        className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Phone className="mr-3 h-4 w-4" />
                        <span className="font-medium">0814 645 2793</span>
                      </a>
                      <div className="flex items-center text-gray-600">
                        <Clock className="mr-3 h-4 w-4" />
                        <span className="text-sm">Mon-Sat 9AM-8PM</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="mr-3 h-4 w-4" />
                        <span className="text-sm">Uyo, Akwa Ibom</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="text-sm text-green-600 mb-2 flex items-center">
                        <Truck className="mr-2 h-4 w-4" />
                        Free shipping on orders over ₦100,000
                      </div>
                      <div className="text-sm font-medium text-blue-600">
                        ⭐ Rated #1 Phone Store in Nigeria
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </>
      )}

      {/* Spacer for fixed header */}
      <div className={`${isScrolled ? 'h-16 lg:h-24' : 'h-16 lg:h-28'} transition-all duration-300`}></div>
    </>
  )
}