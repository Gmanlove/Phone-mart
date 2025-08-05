"use client"

import Link from "next/link"
import Image from "next/image"
import { 
  Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube,
  Shield, Award, Clock, CheckCircle2, CreditCard, 
  ArrowRight, ExternalLink, Smartphone, Headphones
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 relative">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Brand */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Image
                      src="/smart.png"
                      alt="Smart Communications Logo"
                      width={48}
                      height={48}
                      className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-400">
                      Smart Communications
                    </span>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      Nigeria's Premier Mobile Store
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm lg:text-base">
                  Your trusted destination for premium smartphones and mobile accessories. 
                  Authentic products, competitive prices, exceptional service.
                </p>
              </div>

              {/* Trust Badges */}
              <div className="space-y-3">
                {[
                  { icon: Shield, text: "100% Authentic Products", color: "text-blue-600 dark:text-blue-400" },
                  { icon: Award, text: "Award-winning Service", color: "text-blue-600 dark:text-blue-400" },
                  { icon: Clock, text: "Same-day Delivery Available", color: "text-blue-600 dark:text-blue-400" }
                ].map((badge, index) => (
                  <div key={index} className="flex items-center space-x-3 text-sm lg:text-base text-gray-600 dark:text-gray-300 group">
                    <badge.icon className={`h-4 w-4 lg:h-5 lg:w-5 ${badge.color} group-hover:scale-110 transition-transform`} />
                    <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{badge.text}</span>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white text-lg">Connect With Us</h4>
                <div className="flex space-x-3">
                  {[
                    { icon: Facebook, href: "#", color: "hover:bg-blue-600 hover:text-white", name: "Facebook" },
                    { icon: Twitter, href: "#", color: "hover:bg-blue-500 hover:text-white", name: "Twitter" },
                    { icon: Instagram, href: "#", color: "hover:bg-blue-600 hover:text-white", name: "Instagram" },
                    { icon: Youtube, href: "#", color: "hover:bg-blue-600 hover:text-white", name: "YouTube" }
                  ].map(({ icon: Icon, href, color, name }, index) => (
                    <Link key={index} href={href} className="group">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className={`bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 rounded-xl transition-all duration-300 hover:scale-110 ${color} h-11 w-11 lg:h-12 lg:w-12`}
                        aria-label={`Follow us on ${name}`}
                      >
                        <Icon className="h-5 w-5 lg:h-6 lg:w-6" />
                      </Button>
                    </Link>
                  ))}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Follow for daily deals and tech updates</p>
              </div>
            </div>

            {/* Shop Links */}
            <div className="space-y-6">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Shop
              </h3>
              <ul className="space-y-3">
                {[
                  { label: "All Smartphones", href: "/products", badge: "New" },
                  { label: "iPhone Collection", href: "/products?brand=apple", badge: "Hot" },
                  { label: "Samsung Galaxy", href: "/products?brand=samsung" },
                  { label: "Google Pixel", href: "/products?brand=google" },
                  { label: "Phone Accessories", href: "/accessories" },
                  { label: "Hot Deals & Offers", href: "/deals", badge: "Sale" }
                ].map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href} 
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:translate-x-2 transform inline-flex items-center gap-2 group text-sm lg:text-base"
                    >
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className="text-xs bg-blue-600 dark:bg-blue-500 text-white px-2 py-1 rounded-full font-bold">
                          {link.badge}
                        </span>
                      )}
                      <ArrowRight className="h-3 w-3 lg:h-4 lg:w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div className="space-y-6">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Headphones className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Support
              </h3>
              <ul className="space-y-3">
                {[
                  { label: "Help Center & FAQ", href: "/support" },
                  { label: "Track Your Order", href: "/track-order" },
                  { label: "Returns & Exchanges", href: "/returns" },
                  { label: "Warranty Information", href: "/warranty" },
                  { label: "Contact Support", href: "/contact" },
                  { label: "Installation Services", href: "/services" }
                ].map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href} 
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:translate-x-2 transform inline-flex items-center gap-2 group text-sm lg:text-base"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="h-3 w-3 lg:h-4 lg:w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Get in Touch
              </h3>
              
              <div className="space-y-4">
                {/* Phone */}
                <div className="group">
                  <div className="p-4 lg:p-5 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:scale-105">
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 dark:bg-blue-800/50 p-2 lg:p-3 rounded-xl group-hover:bg-blue-200 dark:group-hover:bg-blue-700/50 transition-colors">
                        <Phone className="h-5 w-5 lg:h-6 lg:w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm lg:text-base mb-1">Call Us Now</p>
                        <a 
                          href="tel:08146452793" 
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-bold text-base lg:text-lg"
                        >
                          0814 645 2793
                        </a>
                        <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400 mt-1">Mon-Sat: 9AM-8PM WAT</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="group">
                  <div className="p-4 lg:p-5 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:scale-105">
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 dark:bg-blue-800/50 p-2 lg:p-3 rounded-xl group-hover:bg-blue-200 dark:group-hover:bg-blue-700/50 transition-colors">
                        <MapPin className="h-5 w-5 lg:h-6 lg:w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm lg:text-base mb-1">Visit Our Store</p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm lg:text-base leading-relaxed">
                          87 Ikot Ekpene - Uyo Rd,<br />
                          Uyo 520103, Akwa Ibom State
                        </p>
                        <Link 
                          href="#" 
                          className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-xs lg:text-sm mt-2 group"
                        >
                          <span>Get Directions</span>
                          <ExternalLink className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="group">
                  <div className="p-4 lg:p-5 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:scale-105">
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 dark:bg-blue-800/50 p-2 lg:p-3 rounded-xl group-hover:bg-blue-200 dark:group-hover:bg-blue-700/50 transition-colors">
                        <Mail className="h-5 w-5 lg:h-6 lg:w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm lg:text-base mb-1">Email Support</p>
                        <a 
                          href="mailto:support@smartcommunications.ng" 
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm lg:text-base break-all"
                        >
                          support@smartcommunications.ng
                        </a>
                        <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400 mt-1">24/7 Response Guaranteed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
              <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base">
                © 2024 Smart Communications Nigeria. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-xs lg:text-sm text-gray-500 dark:text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="text-base">🇳🇬</span>
                  <span>Proudly Nigerian</span>
                </span>
                <div className="w-px h-4 bg-gray-400 dark:bg-gray-600"></div>
                <span className="flex items-center gap-1">
                  <span className="text-blue-500">📱</span>
                  <span>Mobile Excellence</span>
                </span>
              </div>
            </div>
            
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center lg:justify-end gap-4 lg:gap-6">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Cookie Policy", href: "/cookies" },
                { label: "Sitemap", href: "/sitemap" }
              ].map((link, index) => (
                <Link 
                  key={index}
                  href={link.href} 
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm lg:text-base transition-colors duration-300 hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 lg:mt-12 pt-6 lg:pt-8 border-t border-gray-100 dark:border-gray-800">
            <div className="text-center space-y-4">
              <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-500 flex items-center justify-center gap-2 flex-wrap">
                <span className="flex items-center gap-1">
                  <Shield className="h-3 w-3 lg:h-4 lg:w-4 text-blue-600 dark:text-blue-400" />
                  256-bit SSL Encryption
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  <CreditCard className="h-3 w-3 lg:h-4 lg:w-4 text-blue-600 dark:text-blue-400" />
                  Secure Payments
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 lg:h-4 lg:w-4 text-blue-600 dark:text-blue-400" />
                  30-Day Guarantee
                </span>
              </p>
              
              <div className="flex justify-center items-center space-x-3 lg:space-x-4">
                {[
                  { label: "SSL SECURED", color: "border-blue-300 dark:border-blue-600 text-blue-600 dark:text-blue-400" },
                  { label: "VERIFIED BUSINESS", color: "border-blue-300 dark:border-blue-600 text-blue-600 dark:text-blue-400" },
                  { label: "TRUSTED STORE", color: "border-blue-300 dark:border-blue-600 text-blue-600 dark:text-blue-400" }
                ].map((badge, index) => (
                  <div 
                    key={index}
                    className={`text-xs lg:text-sm bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-full border ${badge.color} font-medium hover:scale-105 transition-transform`}
                  >
                    {badge.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}