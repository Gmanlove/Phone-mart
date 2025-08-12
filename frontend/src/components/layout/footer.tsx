"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/smart.png"
                  alt="Smart Communications"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  Smart Communications
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
                Nigeria's trusted mobile store. Authentic smartphones, competitive prices, and exceptional service since 2020.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
                  <Phone className="h-4 w-4 text-blue-600" />
                  <a href="tel:08146452793" className="hover:text-blue-600 transition-colors">
                    0814 645 2793
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <a href="mailto:support@smartcommunications.ng" className="hover:text-blue-600 transition-colors">
                    support@smartcommunications.ng
                  </a>
                </div>
                <div className="flex items-start space-x-3 text-sm text-gray-600 dark:text-gray-300">
                  <MapPin className="h-4 w-4 text-blue-600 mt-0.5" />
                  <span>87 Ikot Ekpene - Uyo Rd, Uyo, Akwa Ibom State</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Shop</h3>
              <ul className="space-y-3">
                {[
                  { label: "All Products", href: "/products" },
                  { label: "iPhones", href: "/products?brand=apple" },
                  { label: "Samsung", href: "/products?brand=samsung" },
                  { label: "Accessories", href: "/accessories" },
                  { label: "Hot Deals", href: "/deals" }
                ].map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Support</h3>
              <ul className="space-y-3">
                {[
                  { label: "Help Center", href: "/support" },
                  { label: "Track Order", href: "/track-order" },
                  { label: "Returns", href: "/returns" },
                  { label: "Contact Us", href: "/contact" },
                  { label: "Warranty", href: "/warranty" }
                ].map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-800 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © 2024 Smart Communications. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-500">
                <span className="flex items-center gap-1">
                  <span>🇳🇬</span>
                  <span>Proudly Nigerian</span>
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Youtube, href: "#", label: "YouTube" }
              ].map(({ icon: Icon, href, label }, index) => (
                <Link
                  key={index}
                  href={href}
                  className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-4 text-sm">
              <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}