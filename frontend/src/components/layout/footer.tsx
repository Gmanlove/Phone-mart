"use client"

import Link from "next/link"
import { 
  Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, Send, 
  Shield, Award, Clock, Star, CheckCircle2, Truck, CreditCard, 
  Globe, ArrowRight, ExternalLink, Smartphone, Headphones, Users
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email && !isSubmitting) {
      setIsSubmitting(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsSubscribed(true)
      setEmail("")
      setIsSubmitting(false)
      setTimeout(() => setIsSubscribed(false), 4000)
    }
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white relative overflow-hidden">
      {/* Enhanced background patterns */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-indigo-900/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-cyan-500/3 to-pink-500/3 rounded-full blur-3xl"></div>
        
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 opacity-30">
          <div 
            className="w-full h-full" 
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
              backgroundSize: '30px 30px'
            }}
          ></div>
        </div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Newsletter & Stats Section */}
        <div className="py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Newsletter */}
            <div className="space-y-6 lg:space-y-8">
              <div className="space-y-4 lg:space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-400/30 backdrop-blur-sm">
                  <Send className="h-4 w-4 mr-2 text-blue-400" />
                  <span className="text-sm font-medium text-blue-300">Join 50,000+ subscribers</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Stay Ahead
                  </span>{" "}
                  <span className="text-white">of the Tech Game</span>
                </h2>
                
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
                  Exclusive deals, new arrivals, and expert insights delivered weekly. 
                  Plus, unlock <span className="font-bold text-yellow-400">15% OFF</span> your first purchase instantly!
                </p>
              </div>

              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 z-10" />
                    <Input
                      type="email"
                      placeholder="Enter your email for exclusive deals..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 pl-12 py-4 h-14 rounded-2xl focus:bg-white/20 focus:border-blue-400 transition-all duration-300 text-base"
                      required
                      disabled={isSubmitting || isSubscribed}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-semibold px-6 lg:px-8 py-4 h-14 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-base whitespace-nowrap min-w-[160px]"
                    disabled={isSubmitting || isSubscribed}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Subscribing...
                      </>
                    ) : isSubscribed ? (
                      <>
                        <CheckCircle2 className="h-5 w-5 mr-2" />
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
                
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span>Privacy protected</span>
                  </div>
                  <div className="w-px h-4 bg-gray-600"></div>
                  <span>Unsubscribe anytime</span>
                  <div className="w-px h-4 bg-gray-600"></div>
                  <span>No spam, ever</span>
                </div>
              </form>
            </div>

            {/* Enhanced Trust Indicators */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {[
                { 
                  icon: Users, 
                  value: "50K+", 
                  label: "Happy Customers", 
                  color: "from-blue-500 to-cyan-500",
                  bgColor: "bg-blue-500/10 border-blue-500/20"
                },
                { 
                  icon: Star, 
                  value: "4.9/5", 
                  label: "Customer Rating", 
                  color: "from-yellow-500 to-orange-500",
                  bgColor: "bg-yellow-500/10 border-yellow-500/20"
                },
                { 
                  icon: Smartphone, 
                  value: "10K+", 
                  label: "Devices Sold", 
                  color: "from-green-500 to-emerald-500",
                  bgColor: "bg-green-500/10 border-green-500/20"
                },
                { 
                  icon: Truck, 
                  value: "Same Day", 
                  label: "Delivery", 
                  color: "from-purple-500 to-violet-500",
                  bgColor: "bg-purple-500/10 border-purple-500/20"
                },
                { 
                  icon: Shield, 
                  value: "100%", 
                  label: "Authentic", 
                  color: "from-red-500 to-pink-500",
                  bgColor: "bg-red-500/10 border-red-500/20"
                },
                { 
                  icon: Headphones, 
                  value: "24/7", 
                  label: "Support", 
                  color: "from-indigo-500 to-blue-500",
                  bgColor: "bg-indigo-500/10 border-indigo-500/20"
                }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className={`text-center p-4 lg:p-6 ${stat.bgColor} backdrop-blur-sm rounded-2xl border hover:scale-105 transform transition-all duration-300 group ${index >= 4 ? 'col-span-2 lg:col-span-1' : ''}`}
                >
                  <div className="flex flex-col items-center space-y-2 lg:space-y-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white shadow-lg group-hover:shadow-xl transition-shadow`}>
                      <stat.icon className="h-5 w-5 lg:h-6 lg:w-6" />
                    </div>
                    <div className={`text-2xl lg:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                    <div className="text-gray-300 text-xs lg:text-sm font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16 md:py-20 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1 space-y-6 lg:space-y-8">
              {/* Brand */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-3 lg:p-4 rounded-2xl shadow-xl">
                      <Phone className="h-7 w-7 lg:h-8 lg:w-8" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse"></div>
                  </div>
                  <div>
                    <span className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      PhoneMart
                    </span>
                    <div className="text-sm text-gray-400 font-medium">Nigeria's #1 Mobile Store</div>
                  </div>
                </div>
                
                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                  Your trusted destination for premium smartphones and mobile accessories. 
                  Authentic products, competitive prices, exceptional service since 2020.
                </p>
              </div>

              {/* Trust Badges */}
              <div className="space-y-3">
                {[
                  { icon: Shield, text: "100% Authentic Products", color: "text-green-400" },
                  { icon: Award, text: "Award-winning Service", color: "text-blue-400" },
                  { icon: Clock, text: "Same-day Delivery Available", color: "text-purple-400" }
                ].map((badge, index) => (
                  <div key={index} className="flex items-center space-x-3 text-sm lg:text-base text-gray-300 group">
                    <badge.icon className={`h-4 w-4 lg:h-5 lg:w-5 ${badge.color} group-hover:scale-110 transition-transform`} />
                    <span className="group-hover:text-white transition-colors">{badge.text}</span>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div className="space-y-4">
                <h4 className="font-semibold text-white text-lg">Connect With Us</h4>
                <div className="flex space-x-3">
                  {[
                    { icon: Facebook, href: "#", color: "hover:bg-blue-600", name: "Facebook" },
                    { icon: Twitter, href: "#", color: "hover:bg-sky-500", name: "Twitter" },
                    { icon: Instagram, href: "#", color: "hover:bg-pink-600", name: "Instagram" },
                    { icon: Youtube, href: "#", color: "hover:bg-red-600", name: "YouTube" }
                  ].map(({ icon: Icon, href, color, name }, index) => (
                    <Link key={index} href={href} className="group">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className={`bg-white/10 text-gray-300 hover:text-white border border-white/20 rounded-xl transition-all duration-300 hover:scale-110 ${color} h-11 w-11 lg:h-12 lg:w-12`}
                        aria-label={`Follow us on ${name}`}
                      >
                        <Icon className="h-5 w-5 lg:h-6 lg:w-6" />
                      </Button>
                    </Link>
                  ))}
                </div>
                <p className="text-xs text-gray-400">Follow for daily deals and tech updates</p>
              </div>
            </div>

            {/* Shop Links */}
            <div className="space-y-6">
              <h3 className="text-xl lg:text-2xl font-bold text-white flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-blue-400" />
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
                      className="text-gray-300 hover:text-blue-400 transition-all duration-300 hover:translate-x-2 transform inline-flex items-center gap-2 group text-sm lg:text-base"
                    >
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className="text-xs bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full font-bold animate-pulse">
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
              <h3 className="text-xl lg:text-2xl font-bold text-white flex items-center gap-2">
                <Headphones className="h-5 w-5 text-green-400" />
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
                      className="text-gray-300 hover:text-green-400 transition-all duration-300 hover:translate-x-2 transform inline-flex items-center gap-2 group text-sm lg:text-base"
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
              <h3 className="text-xl lg:text-2xl font-bold text-white flex items-center gap-2">
                <Phone className="h-5 w-5 text-purple-400" />
                Get in Touch
              </h3>
              
              <div className="space-y-4">
                {/* Phone */}
                <div className="group">
                  <div className="p-4 lg:p-5 bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl border border-green-500/20 hover:border-green-400/40 transition-all duration-300 hover:scale-105">
                    <div className="flex items-start space-x-3">
                      <div className="bg-green-500/20 p-2 lg:p-3 rounded-xl group-hover:bg-green-500/30 transition-colors">
                        <Phone className="h-5 w-5 lg:h-6 lg:w-6 text-green-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white text-sm lg:text-base mb-1">Call Us Now</p>
                        <a 
                          href="tel:08146452793" 
                          className="text-green-400 hover:text-green-300 transition-colors font-bold text-base lg:text-lg"
                        >
                          0814 645 2793
                        </a>
                        <p className="text-xs lg:text-sm text-gray-400 mt-1">Mon-Sat: 9AM-8PM WAT</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="group">
                  <div className="p-4 lg:p-5 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105">
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-500/20 p-2 lg:p-3 rounded-xl group-hover:bg-blue-500/30 transition-colors">
                        <MapPin className="h-5 w-5 lg:h-6 lg:w-6 text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white text-sm lg:text-base mb-1">Visit Our Store</p>
                        <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
                          87 Ikot Ekpene - Uyo Rd,<br />
                          Uyo 520103, Akwa Ibom State
                        </p>
                        <Link 
                          href="#" 
                          className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs lg:text-sm mt-2 group"
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
                  <div className="p-4 lg:p-5 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105">
                    <div className="flex items-start space-x-3">
                      <div className="bg-purple-500/20 p-2 lg:p-3 rounded-xl group-hover:bg-purple-500/30 transition-colors">
                        <Mail className="h-5 w-5 lg:h-6 lg:w-6 text-purple-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white text-sm lg:text-base mb-1">Email Support</p>
                        <a 
                          href="mailto:support@phonemart.ng" 
                          className="text-purple-400 hover:text-purple-300 transition-colors text-sm lg:text-base break-all"
                        >
                          support@phonemart.ng
                        </a>
                        <p className="text-xs lg:text-sm text-gray-400 mt-1">24/7 Response Guaranteed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
              <p className="text-gray-400 text-sm lg:text-base">
                © 2024 PhoneMart Nigeria. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-xs lg:text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="text-base">🇳🇬</span>
                  <span>Proudly Nigerian</span>
                </span>
                <div className="w-px h-4 bg-gray-600"></div>
                <span className="flex items-center gap-1">
                  <span className="text-red-500">❤️</span>
                  <span>Made with love</span>
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
                  className="text-gray-400 hover:text-white text-sm lg:text-base transition-colors duration-300 hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 lg:mt-12 pt-6 lg:pt-8 border-t border-white/5">
            <div className="text-center space-y-4">
              <p className="text-xs lg:text-sm text-gray-500 flex items-center justify-center gap-2 flex-wrap">
                <span className="flex items-center gap-1">
                  <Shield className="h-3 w-3 lg:h-4 lg:w-4 text-green-400" />
                  256-bit SSL Encryption
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  <CreditCard className="h-3 w-3 lg:h-4 lg:w-4 text-blue-400" />
                  Secure Payments
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 lg:h-4 lg:w-4 text-purple-400" />
                  30-Day Guarantee
                </span>
              </p>
              
              <div className="flex justify-center items-center space-x-3 lg:space-x-4">
                {[
                  { label: "SSL SECURED", color: "border-green-500/30 text-green-400" },
                  { label: "VERIFIED BUSINESS", color: "border-blue-500/30 text-blue-400" },
                  { label: "TRUSTED STORE", color: "border-purple-500/30 text-purple-400" }
                ].map((badge, index) => (
                  <div 
                    key={index}
                    className={`text-xs lg:text-sm bg-white/5 backdrop-blur-sm px-3 py-2 rounded-full border ${badge.color} font-medium hover:scale-105 transition-transform`}
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