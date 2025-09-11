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
  title: {
    default: "Smart Communications | Premium Mobile Phones & Accessories Nigeria",
    template: "%s | Smart Communications"
  },
  description: "Nigeria's premier destination for premium smartphones, mobile accessories, and tech gadgets. Shop iPhone, Samsung, Android phones with warranty. Fast delivery across Nigeria.",
  keywords: [
    "smartphones Nigeria",
    "mobile phones Lagos",
    "iPhone Nigeria",
    "Samsung Galaxy",
    "Android phones",
    "mobile accessories",
    "phone cases",
    "wireless chargers",
    "tech gadgets Nigeria",
    "Smart Communications",
    "phone repair",
    "mobile shopping Nigeria"
  ],
  authors: [{ name: "Smart Communications Ltd" }],
  creator: "Smart Communications Ltd",
  publisher: "Smart Communications Ltd",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://smartcommunicationsltd.ng'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Smart Communications | Premium Mobile Phones & Accessories Nigeria",
    description: "Nigeria's premier destination for premium smartphones, mobile accessories, and tech gadgets. Shop iPhone, Samsung, Android phones with warranty.",
    url: 'https://smartcommunicationsltd.ng',
    siteName: 'Smart Communications',
    images: [
      {
        url: '/smartfull.png',
        width: 1200,
        height: 630,
        alt: 'Smart Communications - Premium Mobile Experience',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Smart Communications | Premium Mobile Phones Nigeria",
    description: "Shop premium smartphones, iPhone, Samsung, Android phones & accessories in Nigeria. Fast delivery, warranty included.",
    images: ['/smartfull.png'],
    creator: '@smartcommunications',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'dQUtIiYHODk5aVHdYhk6h4FTyagIbx6BEpWAz2eVGYY', // Replace with your actual code
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script dangerouslySetInnerHTML={{ __html: forceDarkMode }} />
        <link rel="canonical" href="https://smartcommunicationsltd.ng" />
        <meta name="geo.region" content="NG" />
        <meta name="geo.placename" content="Nigeria" />
        <meta name="geo.position" content="9.0765;7.3986" />
        <meta name="ICBM" content="9.0765, 7.3986" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Smart Communications Ltd",
              "url": "https://smartcommunicationsltd.ng",
              "logo": "https://smartcommunicationsltd.ng/smartfull.png",
              "description": "Nigeria's premier destination for premium smartphones and mobile accessories",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "NG",
                "addressRegion": "Nigeria"
              },
              "sameAs": [
                "https://www.facebook.com/smartcommunications",
                "https://www.instagram.com/smartcommunications"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              <div className="min-h-screen bg-background text-foreground">
                <Header />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
              <Toaster />
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}