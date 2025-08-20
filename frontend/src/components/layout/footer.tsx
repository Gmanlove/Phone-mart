"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-black p-2 rounded-lg border border-gray-300 dark:border-gray-600">
                <Image
                  src="/smart.png"
                  alt="Smart Communications"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Smart Communications
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
              Nigeria&apos;s trusted mobile store. Authentic smartphones, competitive prices, and exceptional service since 2020.
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
                <a href="mailto:info@smartcomms.ng" className="hover:text-blue-600 transition-colors">
                  info@smartcomms.ng
                </a>
              </div>
              
              <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span>89 IKot Ekpene rd ,Uyo, Nigeria</span>
              </div>
              
              <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
                <Clock className="h-4 w-4 text-blue-600" />
                <span>Mon-Sat: 9AM-7PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <a href="/accessories" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">
                  Accessories
                </a>
              </li>
              <li>
                <a href="/deals" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">
                  Hot Deals
                </a>
              </li>
              <li>
                <a href="/support" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Customer Service
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/support" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/support" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/support" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="/support" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="/support" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">
                  Warranty
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
              Get the latest deals and product updates
            </p>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              © 2024 Smart Communications. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}