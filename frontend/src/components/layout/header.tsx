"use client"

import { useState, useCallback, useEffect } from "react"
import Link from "next/link"
import { Search, ShoppingCart, User, Menu, X, Phone, ChevronDown, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger, 
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu"

interface NavigationItem {
  href: string
  label: string
  className?: string
  isSpecial?: boolean
}

const MAIN_NAVIGATION: NavigationItem[] = [
  { href: "/products", label: "All Phones" },
  { href: "/products?brand=apple", label: "iPhone" },
  { href: "/products?brand=samsung", label: "Samsung" },
  { href: "/products?brand=google", label: "Google Pixel" },
  { href: "/accessories", label: "Accessories" },
  { href: "/deals", label: "Hot Deals", className: "text-red-600 hover:text-red-700 font-semibold animate-pulse", isSpecial: true },
]

const USER_MENU_ITEMS: NavigationItem[] = [
  { href: "/login", label: "Sign In" },
  { href: "/register", label: "Create Account" },
  { href: "/profile", label: "My Account" },
  { href: "/orders", label: "My Orders" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const { items } = useCart()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const itemCount = items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when clicking outside or on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false)
    }

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest("[data-mobile-menu]")) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape)
      document.addEventListener("click", handleClickOutside)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.removeEventListener("click", handleClickOutside)
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  useEffect(() => {
    // In a real app, you'd check authentication status properly
    setIsLoggedIn(false) // Replace localStorage check for artifact compatibility
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }, [searchQuery])

  const closeMobileMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
          : 'bg-white border-b border-gray-200'
      }`}>
        {/* Top announcement bar - Only visible on large screens */}
        <div className="hidden xl:block bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-2 text-sm">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Mon-Sat 9AM-8PM</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <a 
                    href="tel:08146452793" 
                    className="hover:text-blue-200 transition-colors"
                    aria-label="Call Smart Communications Ltd"
                  >
                    0814 645 2793
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Uyo, Akwa Ibom</span>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <span className="font-medium animate-bounce">🚚 Free shipping on orders over ₦100,000</span>
                <Link 
                  href="/track-order" 
                  className="hover:text-blue-200 transition-colors"
                >
                  Track Order
                </Link>
                <Link 
                  href="/support" 
                  className="hover:text-blue-200 transition-colors"
                >
                  24/7 Support
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex flex-shrink-0 items-center space-x-3 group"
              aria-label="PhoneMart - Go to homepage"
            >
              <div className="relative">
                <div className="rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 p-3 text-white shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
                  <Phone className="h-7 w-7" />
                </div>
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  PhoneMart
                </span>
                <div className="text-xs text-gray-500 font-medium">Premium Mobile Store</div>
              </div>
            </Link>

            {/* Search bar - Enhanced for better UX */}
            <div className="mx-8 hidden flex-1 max-w-2xl lg:block">
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="search"
                  placeholder="Search iPhone, Samsung, accessories..."
                  className="w-full rounded-full border-2 border-gray-200 bg-gray-50/50 py-3 pl-12 pr-4 text-base transition-all duration-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/20 hover:bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search products"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <Button 
                    type="submit" 
                    size="default" 
                    className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6"
                  >
                    Search
                  </Button>
                </div>
              </form>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-3">
              {/* User menu - Enhanced dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="hidden lg:flex items-center space-x-2 rounded-full px-4 py-2 transition-all duration-300 hover:bg-gray-100 hover:scale-105"
                    aria-label="User account menu"
                  >
                    <div className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-2">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="hidden xl:block text-sm font-medium">Account</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 overflow-hidden rounded-xl border-0 bg-white shadow-2xl ring-1 ring-gray-200">
                  {isLoggedIn ? (
                    <div className="py-2">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">Welcome back!</p>
                        <p className="text-xs text-gray-500">user@example.com</p>
                      </div>
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                          <User className="mr-3 h-4 w-4" />
                          My Account
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/orders" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                          <ShoppingCart className="mr-3 h-4 w-4" />
                          My Orders
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50">
                        Sign Out
                      </DropdownMenuItem>
                    </div>
                  ) : (
                    <div className="py-2">
                      <DropdownMenuItem asChild>
                        <Link href="/login" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                          Sign In
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/register" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                          Create Account
                        </Link>
                      </DropdownMenuItem>
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Enhanced Cart */}
              <Link href="/cart" aria-label={`Shopping cart with ${itemCount} items`}>
                <Button 
                  variant="ghost" 
                  className="relative rounded-full p-3 transition-all duration-300 hover:bg-gray-100 hover:scale-105"
                >
                  <div className="rounded-full bg-gradient-to-r from-green-500 to-blue-500 p-2">
                    <ShoppingCart className="h-4 w-4 text-white" />
                  </div>
                  {itemCount > 0 && (
                    <Badge 
                      className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center border-2 border-white bg-red-500 text-xs font-bold text-white hover:bg-red-500 animate-bounce"
                      aria-label={`${itemCount} items in cart`}
                    >
                      {itemCount > 99 ? "99+" : itemCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Mobile menu toggle */}
              <Button 
                variant="ghost" 
                className="rounded-full p-3 transition-all duration-300 hover:bg-gray-100 hover:scale-105 lg:hidden" 
                onClick={toggleMobileMenu}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                data-mobile-menu
              >
                <div className="relative">
                  {isMenuOpen ? (
                    <X className="h-5 w-5 transition-transform duration-300 rotate-90" />
                  ) : (
                    <Menu className="h-5 w-5 transition-transform duration-300" />
                  )}
                </div>
              </Button>
            </div>
          </div>

          {/* Desktop Navigation - Enhanced with hover effects */}
          <nav 
            className="hidden border-t border-gray-100 py-4 lg:block" 
            role="navigation" 
            aria-label="Main navigation"
          >
            <div className="flex items-center justify-center space-x-8">
              {MAIN_NAVIGATION.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative font-medium transition-all duration-300 hover:scale-105 group ${
                    item.className || "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {item.label}
                  {item.isSpecial && (
                    <span className="absolute -top-2 -right-2 flex h-2 w-2">
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
      </header>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <>
          {/* Enhanced backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden" 
            onClick={closeMobileMenu}
          />
          
          {/* Enhanced mobile menu panel */}
          <div 
            className="fixed top-0 right-0 z-50 h-full w-full max-w-sm overflow-y-auto bg-white shadow-2xl transition-transform duration-300 lg:hidden" 
            data-mobile-menu
            role="dialog" 
            aria-modal="true" 
            aria-label="Mobile navigation menu"
          >
            <div className="p-6">
              {/* Mobile header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 p-2 text-white">
                    <Phone className="h-5 w-5" />
                  </div>
                  <span className="text-lg font-bold text-gray-900">PhoneMart</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={closeMobileMenu}
                  className="rounded-full p-2"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Mobile search */}
              <form onSubmit={handleSearchSubmit} className="relative mb-8">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full rounded-full border-2 border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-base focus:border-blue-500 focus:bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search products"
                />
              </form>

              {/* Mobile navigation */}
              <nav className="space-y-2" role="navigation" aria-label="Mobile navigation">
                {MAIN_NAVIGATION.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between rounded-xl px-4 py-4 font-medium transition-all duration-300 active:scale-95 ${
                      item.className?.includes('red') 
                        ? "bg-red-50 text-red-600 hover:bg-red-100" 
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                    onClick={closeMobileMenu}
                  >
                    <span>{item.label}</span>
                    {item.isSpecial && (
                      <Badge className="bg-red-500 text-white text-xs px-2 py-1">HOT</Badge>
                    )}
                  </Link>
                ))}
                
                {/* Enhanced separator */}
                <div className="my-8 border-t border-gray-200" />
                
                {/* User menu items in mobile */}
                <div className="space-y-2">
                  <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">Account</h3>
                  {USER_MENU_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center rounded-xl px-4 py-4 font-medium text-gray-700 transition-all duration-300 hover:bg-blue-50 hover:text-blue-600 active:scale-95"
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* Enhanced mobile contact info */}
                <div className="mt-8 border-t border-gray-200 pt-8">
                  <div className="rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Get in Touch</h3>
                    <a 
                      href="tel:08146452793" 
                      className="flex items-center mb-3 text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <Phone className="mr-3 h-5 w-5" />
                      0814 645 2793
                    </a>
                    <div className="text-sm text-gray-600 mb-2">
                      🚚 Free shipping on orders over ₦100,000
                    </div>
                    <div className="text-sm font-medium text-green-600">
                      ⭐ Rated #1 Phone Store in Nigeria
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </>
      )}

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-20 lg:h-24 xl:h-28"></div>
    </>
  )
}