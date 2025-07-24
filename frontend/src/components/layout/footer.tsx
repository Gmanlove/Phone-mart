"use client"

import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, Send, Shield, Award, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 py-16">
        {/* Top section with newsletter and stats */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Newsletter */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Stay Connected with PhoneMart
                </h2>
                <p className="text-xl text-gray-300">
                  Get exclusive deals, new arrivals, and tech insights delivered to your inbox. 
                  Plus, enjoy 15% off your first purchase!
                </p>
              </div>

              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Enter your email for exclusive deals..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pl-12 py-4 rounded-xl focus:bg-white/20 focus:border-blue-400 transition-all duration-300"
                      required
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-semibold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                    disabled={isSubscribed}
                  >
                    {isSubscribed ? (
                      <>
                        <Shield className="h-5 w-5 mr-2" />
                        Subscribed!
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Get 15% OFF
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-sm text-gray-400">
                  🔒 We respect your privacy. Unsubscribe anytime. No spam, ever.
                </p>
              </form>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-3xl font-bold text-blue-400 mb-2">50K+</div>
                <div className="text-gray-300 text-sm">Happy Customers</div>
              </div>
              <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-3xl font-bold text-green-400 mb-2">99.8%</div>
                <div className="text-gray-300 text-sm">Satisfaction Rate</div>
              </div>
              <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 col-span-2 sm:col-span-1">
                <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
                <div className="text-gray-300 text-sm">Expert Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-3 rounded-2xl shadow-lg">
                  <Phone className="h-7 w-7" />
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    PhoneMart
                  </span>
                  <div className="text-sm text-gray-400">Premium Mobile Store</div>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Nigeria's most trusted destination for premium smartphones and mobile accessories. 
                Authentic products, unbeatable prices, exceptional service.
              </p>
            </div>

            {/* Trust badges */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <Shield className="h-4 w-4 text-green-400" />
                <span>100% Authentic Products</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <Award className="h-4 w-4 text-blue-400" />
                <span>Nigeria's #1 Phone Store</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <Clock className="h-4 w-4 text-purple-400" />
                <span>Same-day Delivery Available</span>
              </div>
            </div>

            {/* Social media */}
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Follow Us</h4>
              <div className="flex space-x-3">
                {[
                  { icon: Facebook, href: "#", color: "hover:bg-blue-600" },
                  { icon: Twitter, href: "#", color: "hover:bg-sky-500" },
                  { icon: Instagram, href: "#", color: "hover:bg-pink-600" },
                  { icon: Youtube, href: "#", color: "hover:bg-red-600" }
                ].map(({ icon: Icon, href, color }, index) => (
                  <Link key={index} href={href}>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={`bg-white/10 text-gray-300 hover:text-white border border-white/20 rounded-xl transition-all duration-300 hover:scale-110 ${color}`}
                    >
                      <Icon className="h-5 w-5" />
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Shop</h3>
            <ul className="space-y-3">
              {[
                { label: "All Smartphones", href: "/products" },
                { label: "iPhone Collection", href: "/products?brand=apple" },
                { label: "Samsung Galaxy", href: "/products?brand=samsung" },
                { label: "Google Pixel", href: "/products?brand=google" },
                { label: "Phone Accessories", href: "/accessories" },
                { label: "Hot Deals & Offers", href: "/deals" }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Support</h3>
            <ul className="space-y-3">
              {[
                { label: "Help Center & FAQ", href: "/support" },
                { label: "Track Your Order", href: "/track-order" },
                { label: "Returns & Exchanges", href: "/returns" },
                { label: "Warranty Information", href: "/warranty" },
                { label: "Contact Support", href: "/contact" },
                { label: "Installation Service", href: "/services" }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Contact Us</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-500/20 p-2 rounded-lg">
                    <Phone className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Call Us</p>
                    <a 
                      href="tel:08146452793" 
                      className="text-green-400 hover:text-green-300 transition-colors font-semibold"
                    >
                      0814 645 2793
                    </a>
                    <p className="text-xs text-gray-400">Mon-Sat: 9AM-8PM</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-500/20 p-2 rounded-lg">
                    <MapPin className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Visit Our Store</p>
                    <p className="text-gray-300 text-sm">
                      87 Ikot Ekpene - Uyo Rd,<br />
                      Uyo 520103, Akwa Ibom State
                    </p>
                    <Link 
                      href="#" 
                      className="text-blue-400 hover:text-blue-300 text-xs"
                    >
                      Get Directions →
                    </Link>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-500/20 p-2 rounded-lg">
                    <Mail className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Email Support</p>
                    <a 
                      href="mailto:support@phonemart.ng" 
                      className="text-purple-400 hover:text-purple-300 transition-colors text-sm"
                    >
                      support@phonemart.ng
                    </a>
                    <p className="text-xs text-gray-400">24/7 Response</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <p className="text-gray-400 text-sm">
                © 2024 PhoneMart Nigeria. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span>🇳🇬 Made in Nigeria with ❤️</span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Cookie Policy", href: "/cookies" },
                { label: "Sitemap", href: "/sitemap" }
              ].map((link, index) => (
                <Link 
                  key={index}
                  href={link.href} 
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Additional trust indicators */}
          <div className="mt-8 pt-6 border-t border-white/5">
            <div className="text-center space-y-2">
              <p className="text-xs text-gray-500">
                Secured by SSL • PayPal & Card Payments • 30-Day Money Back Guarantee
              </p>
              <div className="flex justify-center items-center space-x-4 opacity-60">
                <div className="text-xs bg-white/5 px-3 py-1 rounded-full">SSL SECURED</div>
                <div className="text-xs bg-white/5 px-3 py-1 rounded-full">VERIFIED BUSINESS</div>
                <div className="text-xs bg-white/5 px-3 py-1 rounded-full">TRUSTED STORE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}