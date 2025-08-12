"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Mail, Gift, Star, Shield, Zap, Users, Package, Headphones, CheckCircle, Sparkles, ArrowRight } from "lucide-react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubscribed(true)
    setEmail("")
    setIsLoading(false)
    
    // Reset success state after 4 seconds
    setTimeout(() => setIsSubscribed(false), 4000)
  }

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-20 h-20 bg-white rounded-full animate-float animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-white rounded-full animate-float animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Newsletter Signup
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Stay Updated with <span className="text-yellow-300">Smart Communications</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Get exclusive deals, early access to new products, tech tips, and special offers 
              delivered straight to your inbox. Join thousands of satisfied customers!
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            {isSubscribed ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Welcome to Smart Communications!
                </h3>
                <p className="text-blue-100 text-lg">
                  You&apos;ve successfully subscribed. Check your email for a special welcome offer!
                </p>
              </div>
            ) : (
              <div>
                {/* Newsletter Benefits */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                  {[
                    { icon: Gift, text: "Exclusive Deals", color: "text-yellow-400" },
                    { icon: Zap, text: "Early Access", color: "text-green-400" },
                    { icon: Star, text: "Tech Tips", color: "text-blue-400" },
                    { icon: Package, text: "New Arrivals", color: "text-purple-400" }
                  ].map((benefit, index) => (
                    <div key={index} className="text-center group">
                      <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-white/20 transition-colors">
                        <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
                      </div>
                      <p className="text-white font-semibold text-sm">{benefit.text}</p>
                    </div>
                  ))}
                </div>

                {/* Subscription Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-12 h-14 bg-white/90 backdrop-blur-sm border-white/20 text-slate-900 placeholder:text-slate-500 rounded-xl text-lg"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="h-14 px-8 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Subscribing...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          Subscribe Now
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </div>
                      )}
                    </Button>
                  </div>

                  <div className="text-center">
                    <p className="text-blue-100 text-sm">
                      🔒 We respect your privacy. Unsubscribe at any time.
                    </p>
                  </div>
                </form>

                {/* Social Proof */}
                <div className="mt-10 text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="flex -space-x-2">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-2 border-white flex items-center justify-center text-white font-bold"
                        >
                          {String.fromCharCode(65 + i)}
                        </div>
                      ))}
                    </div>
                    <span className="text-white font-semibold ml-3">+5,000 subscribers</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-blue-100">
                    &quot;Best tech deals and customer service in Nigeria!&quot; - Happy Customer
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Additional Benefits */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            {[
              {
                icon: Shield,
                title: "100% Secure",
                description: "Your email is safe with us. We never spam or share your data."
              },
              {
                icon: Users,
                title: "Join 5K+ Customers",
                description: "Be part of Nigeria's largest tech community for exclusive updates."
              },
              {
                icon: Headphones,
                title: "24/7 Support",
                description: "Get priority customer support and technical assistance."
              }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-colors">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-blue-100">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
