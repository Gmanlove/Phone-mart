"use client"
import { useState } from "react"

export default function CookieConsent() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-lg">
      <span>
        We use cookies to improve your experience. By using our site, you agree to our cookie policy.
      </span>
      <button
        onClick={() => setVisible(false)}
        className="ml-4 px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded text-white font-semibold transition"
      >
        Accept
      </button>
    </div>
  )
}
