"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { useOrders } from "@/contexts/order-context"

// Paystack public key (replace with your own)
const PAYSTACK_PUBLIC_KEY = "pk_test_xxxxxxxxxxxxxxxxxxxxxxx"

declare global {
  interface Window {
    PaystackPop?: any;
  }
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const { placeOrder } = useOrders()
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  })
  const [paying, setPaying] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Paystack payment handler
  const handlePaystack = () => {
    setPaying(true)
    setError("")
    // Dynamically load Paystack script
    if (!window.PaystackPop) {
      const script = document.createElement("script")
      script.src = "https://js.paystack.co/v1/inline.js"
      script.async = true
      script.onload = payWithPaystack
      document.body.appendChild(script)
    } else {
      payWithPaystack()
    }
  }

  // Paystack payment logic
  const payWithPaystack = () => {
    if (!window.PaystackPop) return;
    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: form.email,
      amount: total * 100, // Paystack expects amount in kobo
      currency: "NGN",
      ref: "PMT-" + Math.floor(Math.random() * 1000000000),
      metadata: {
        custom_fields: [
          { display_name: "Name", variable_name: "name", value: form.name },
          { display_name: "Phone", variable_name: "phone", value: form.phone }
        ]
      },
      callback: async function(response: any) {
        setPaying(false)
        setSuccess(true)
        placeOrder(items, total)
        clearCart()
        // Send order to backend
        try {
          await fetch("http://localhost:5000/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: form.name,
              email: form.email,
              phone: form.phone,
              address: form.address,
              items,
              total
            })
          })
        } catch (err) {
          // Optionally handle backend error
        }
      },
      onClose: function() {
        setPaying(false)
        setError("Payment cancelled.")
      }
    })
    if (handler) handler.openIframe()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>
        {success ? (
          <div className="text-center text-green-600 text-xl font-semibold">
            Payment successful! Thank you for your order.
          </div>
        ) : (
          <form className="space-y-6" onSubmit={e => { e.preventDefault(); handlePaystack(); }}>
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input name="name" value={form.name} onChange={handleChange} required className="w-full border rounded px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full border rounded px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input name="phone" type="tel" value={form.phone} onChange={handleChange} required className="w-full border rounded px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input name="address" value={form.address} onChange={handleChange} required className="w-full border rounded px-4 py-2" />
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <h3 className="font-semibold mb-2">Order Summary</h3>
              <ul className="mb-2">
                {items.map((item, i) => (
                  <li key={i} className="flex justify-between text-sm mb-1">
                    <span>{item.name} x{item.quantity}</span>
                    <span>₦{item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₦{total}</span>
              </div>
            </div>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <Button type="submit" className="w-full h-12 bg-green-600 text-white font-semibold rounded-xl" disabled={paying}>
              {paying ? "Processing..." : "Pay with Paystack"}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
