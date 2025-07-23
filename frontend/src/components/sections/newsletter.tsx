import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Gift } from "lucide-react"

export default function Newsletter() {
  return (
    <section className="py-16 bg-blue-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 p-4 rounded-full">
              <Mail className="h-8 w-8 text-white" />
            </div>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Stay Updated with PhoneHub</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get exclusive deals, new product launches, and tech news delivered to your inbox. Plus, get 10% off your
            first order!
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:bg-white/20"
                />
              </div>
              <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                <Gift className="h-4 w-4 mr-2" />
                Get 10% Off
              </Button>
            </div>
            <p className="text-blue-200 text-sm mt-3">
              No spam, unsubscribe at any time. By subscribing, you agree to our Privacy Policy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50K+</div>
              <div className="text-blue-200">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">1000+</div>
              <div className="text-blue-200">Products Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-blue-200">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
