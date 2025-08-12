import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { CartProvider } from "@/contexts/cart-context"
import { OrderProvider } from "@/contexts/order-context"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"

// Force dark mode with a simple script
const forceDarkMode = `
  (function() {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  })()
`

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
})

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: "Smart Communications | Premium Mobile Experience",
  description: "Shop the latest smartphones and accessories with unbeatable prices, fast delivery, and expert support.",
  icons: {
    icon: '/smart.png',
    shortcut: '/smart.png',
    apple: '/smart.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} scroll-smooth dark`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: forceDarkMode }} />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-900 text-white font-sans antialiased">
        <AuthProvider>
          <OrderProvider>
            <CartProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 page-transition">
                  {children}
                </main>
                <Footer />
              </div>
              <Toaster />
            </CartProvider>
          </OrderProvider>
        </AuthProvider>
      </body>
    </html>
  )
}