"use client"

import { useState, useCallback, useEffect } from "react"
import Link from "next/link"
import { Search, ShoppingCart, User, Menu, X, Phone, ChevronDown } from "lucide-react"
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
}

const MAIN_NAVIGATION: NavigationItem[] = [
  { href: "/products", label: "All Phones" },
  { href: "/products?brand=apple", label: "iPhone" },
  { href: "/products?brand=samsung", label: "Samsung" },
  { href: "/products?brand=google", label: "Google Pixel" },
  { href: "/accessories", label: "Accessories" },
  { href: "/deals", label: "Deals", className: "text-red-600 hover:text-red-700 font-semibold" },
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
  const { items } = useCart()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const itemCount = items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0

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
      // Prevent body scroll on mobile
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.removeEventListener("click", handleClickOutside)
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true")
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
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      {/* Container with responsive padding */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top announcement bar - Only visible on extra large screens */}
        <div className="hidden xl:flex items-center justify-between border-b border-gray-100 py-2 text-sm text-gray-600">
          <div className="flex items-center space-x-6">
            <a 
              href="tel:+15551234567" 
              className="flex items-center transition-colors duration-200 hover:text-gray-900"
              aria-label="Call us at +1 (555) 123-4567"
            >
              <Phone className="mr-2 h-4 w-4" />
              <span>+1 (555) 123-4567</span>
            </a>
            <span className="font-medium text-green-600">
              Free shipping on orders over $100
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <Link 
              href="/track-order" 
              className="transition-colors duration-200 hover:text-gray-900"
            >
              Track Order
            </Link>
            <Link 
              href="/support" 
              className="transition-colors duration-200 hover:text-gray-900"
            >
              Support
            </Link>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex flex-shrink-0 items-center space-x-3 group"
            aria-label="PhoneHub - Go to homepage"
          >
            <div className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 p-2.5 text-white shadow-md transition-shadow duration-200 group-hover:shadow-lg">
              <Phone className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold text-gray-900 transition-colors duration-200 group-hover:text-blue-600">
              PhoneMart
            </span>
          </Link>

          {/* Search bar - Hidden on mobile and tablet */}
          <div className="mx-8 hidden flex-1 max-w-2xl lg:flex">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search for phones, accessories, and more..."
                className="w-full rounded-lg border-gray-200 py-3 pl-12 pr-4 text-base transition-colors duration-200 focus:border-blue-500 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search products"
              />
            </form>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            {/* User menu - Hidden on mobile and tablet */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="hidden items-center space-x-2 rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-gray-50 lg:flex"
                  aria-label="User account menu"
                >
                  <User className="h-5 w-5" />
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                {isLoggedIn ? (
                  <div className="py-1">
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="block w-full px-4 py-2 text-sm text-gray-700 rounded transition-colors duration-200 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none">My Account</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders" className="block w-full px-4 py-2 text-sm text-gray-700 rounded transition-colors duration-200 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none">My Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-2" />
                    <DropdownMenuItem onClick={() => { localStorage.removeItem("isLoggedIn"); window.location.href = "/"; }} className="block w-full px-4 py-2 text-sm text-gray-700 rounded transition-colors duration-200 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none">Sign Out</DropdownMenuItem>
                  </div>
                ) : (
                  <div className="py-1">
                    <DropdownMenuItem asChild>
                      <Link href="/login" className="block w-full px-4 py-2 text-sm text-gray-700 rounded transition-colors duration-200 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none">Sign In</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/register" className="block w-full px-4 py-2 text-sm text-gray-700 rounded transition-colors duration-200 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none">Create Account</Link>
                    </DropdownMenuItem>
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart */}
            <Link href="/cart" aria-label={`Shopping cart with ${itemCount} items`}>
              <Button 
                variant="ghost" 
                className="relative rounded-lg p-3 transition-colors duration-200 hover:bg-gray-50"
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge 
                    className="absolute -right-1 -top-1 flex h-5 w-5 min-w-0 items-center justify-center p-0 text-xs bg-red-500 hover:bg-red-500"
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
              className="rounded-lg p-3 transition-colors duration-200 hover:bg-gray-50 lg:hidden" 
              onClick={toggleMobileMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              data-mobile-menu
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav 
          className="hidden border-t border-gray-100 py-4 lg:flex items-center space-x-8" 
          role="navigation" 
          aria-label="Main navigation"
        >
          {MAIN_NAVIGATION.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-medium transition-all duration-200 hover:scale-105 ${
                item.className || "text-gray-700 hover:text-blue-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-black bg-opacity-25 transition-opacity duration-200 lg:hidden" 
            onClick={closeMobileMenu}
          />
          
          {/* Mobile menu panel */}
          <div 
            className="relative z-50 max-h-screen overflow-y-auto border-t border-gray-200 bg-white shadow-xl lg:hidden" 
            data-mobile-menu
            role="dialog" 
            aria-modal="true" 
            aria-label="Mobile navigation menu"
          >
            <div className="px-4 py-6 sm:px-6">
              {/* Mobile search */}
              <form onSubmit={handleSearchSubmit} className="relative mb-6">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full rounded-lg border-gray-200 py-3 pl-12 pr-4 text-base transition-colors duration-200 focus:border-blue-500 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search products"
                />
              </form>

              {/* Mobile navigation */}
              <nav className="space-y-1" role="navigation" aria-label="Mobile navigation">
                {MAIN_NAVIGATION.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-lg px-4 py-3.5 font-medium transition-all duration-200 active:scale-95 ${
                      item.className?.includes('red') 
                        ? "text-red-600 hover:bg-red-50 hover:text-red-700 active:bg-red-100" 
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600 active:bg-blue-100"
                    }`}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {/* Separator */}
                <div className="my-6 border-t border-gray-200" />
                
                {/* User menu items in mobile */}
                {USER_MENU_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg px-4 py-3.5 font-medium text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 active:scale-95 active:bg-blue-100"
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Mobile-only contact info */}
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <a 
                    href="tel:+15551234567" 
                    className="flex items-center px-4 py-3.5 text-gray-600 transition-colors duration-200 hover:text-gray-900"
                    aria-label="Call us at +1 (555) 123-4567"
                  >
                    <Phone className="mr-3 h-5 w-5" />
                    +1 (555) 123-4567
                  </a>
                  <div className="px-4 py-2 text-sm font-medium text-green-600">
                    Free shipping on orders over $100
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  )
}