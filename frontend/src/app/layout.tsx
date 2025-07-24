import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { CartProvider } from "@/contexts/cart-context"
import { Toaster } from "@/components/ui/toaster"

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
  title: "PhoneMart Nigeria - Premium Mobile Phones & Accessories | Best Prices Guaranteed",
  description: "Nigeria's #1 destination for authentic smartphones, accessories, and mobile technology. Shop iPhone, Samsung, Google Pixel with free delivery, 2-year warranty, and 24/7 support. Best prices guaranteed!",
  keywords: "smartphones Nigeria, iPhone Nigeria, Samsung Galaxy, mobile phones Uyo, phone accessories, authentic phones, best phone deals Nigeria, PhoneMart",
  authors: [{ name: "PhoneMart Nigeria" }],
  creator: "PhoneMart Nigeria",
  publisher: "PhoneMart Nigeria",
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
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://phonemart.ng',
    title: 'PhoneMart Nigeria - Premium Mobile Phones & Accessories',
    description: 'Nigeria\'s #1 destination for authentic smartphones and mobile accessories. Best prices, free delivery, 2-year warranty.',
    siteName: 'PhoneMart Nigeria',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PhoneMart Nigeria - Premium Mobile Store',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PhoneMart Nigeria - Premium Mobile Phones & Accessories',
    description: 'Nigeria\'s #1 destination for authentic smartphones and mobile accessories.',
    creator: '@PhoneMartNG',
    images: ['/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://phonemart.ng',
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/_next/static/media/inter-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Critical CSS for above-the-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS */
            * {
              box-sizing: border-box;
            }
            
            html {
              scroll-behavior: smooth;
            }
            
            body {
              margin: 0;
              font-family: var(--font-inter), system-ui, -apple-system, sans-serif;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              background-color: #ffffff;
              color: #111827;
              line-height: 1.6;
            }
            
            /* Loading skeleton animation */
            @keyframes skeleton-loading {
              0% { background-position: -200px 0; }
              100% { background-position: calc(200px + 100%) 0; }
            }
            
            .skeleton {
              background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
              background-size: 200px 100%;
              animation: skeleton-loading 1.5s infinite;
            }
            
            /* Custom scrollbar */
            ::-webkit-scrollbar {
              width: 8px;
            }
            
            ::-webkit-scrollbar-track {
              background: #f1f5f9;
            }
            
            ::-webkit-scrollbar-thumb {
              background: linear-gradient(135deg, #3b82f6, #8b5cf6);
              border-radius: 4px;
            }
            
            ::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(135deg, #2563eb, #7c3aed);
            }
            
            /* Focus styles for accessibility */
            *:focus-visible {
              outline: 2px solid #3b82f6;
              outline-offset: 2px;
            }
            
            /* Smooth transitions */
            * {
              transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
              transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
              transition-duration: 150ms;
            }
            
            /* High contrast mode support */
            @media (prefers-contrast: high) {
              .text-gray-600 {
                color: #374151 !important;
              }
              .text-gray-500 {
                color: #4b5563 !important;
              }
            }
            
            /* Reduced motion support */
            @media (prefers-reduced-motion: reduce) {
              *,
              *::before,
              *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
              }
            }
            
            /* Performance optimizations */
            img {
              content-visibility: auto;
            }
            
            .card-hover {
              will-change: transform;
            }
            
            /* Dark mode support */
            @media (prefers-color-scheme: dark) {
              :root {
                --background: #0f172a;
                --foreground: #f1f5f9;
              }
            }
          `
        }} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              "name": "PhoneMart Nigeria",
              "description": "Nigeria's #1 destination for authentic smartphones and mobile accessories",
              "url": "https://phonemart.ng",
              "telephone": "+234-814-645-2793",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "87 Ikot Ekpene - Uyo Rd",
                "addressLocality": "Uyo",
                "addressRegion": "Akwa Ibom State",
                "postalCode": "520103",
                "addressCountry": "NG"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "5.0378",
                "longitude": "7.9097"
              },
              "priceRange": "$$",
              "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "Bank Transfer"],
              "currenciesAccepted": "NGN",
              "openingHours": "Mo-Sa 09:00-20:00",
              "sameAs": [
                "https://facebook.com/phonemartng",
                "https://twitter.com/phonemartng",
                "https://instagram.com/phonemartng"
              ]
            })
          }}
        />
      </head>
      
      <body className="font-sans antialiased">
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>
        
        <CartProvider>
          <div className="flex flex-col min-h-screen bg-white text-gray-900">
            {/* Header with performance optimization */}
            <div className="sticky top-0 z-50">
              <Header />
            </div>
            
            {/* Main content */}
            <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
              {children}
            </main>
            
            {/* Footer */}
            <Footer />
          </div>
          
          {/* Toast notifications */}
          <Toaster />
          
          {/* Loading indicator for better UX */}
          <div id="loading-indicator" className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform -translate-x-full transition-transform duration-300 ease-out z-50" />
        </CartProvider>
        
        {/* Performance monitoring */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Basic performance monitoring
              window.addEventListener('load', function() {
                if ('performance' in window) {
                  const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                  console.log('Page load time:', loadTime + 'ms');
                  
                  // Report to analytics if needed
                  if (window.gtag) {
                    gtag('event', 'timing_complete', {
                      name: 'load',
                      value: loadTime
                    });
                  }
                }
              });
              
              // Loading indicator
              let loadingTimeout;
              function showLoading() {
                const indicator = document.getElementById('loading-indicator');
                if (indicator) {
                  indicator.style.transform = 'translateX(0)';
                  clearTimeout(loadingTimeout);
                  loadingTimeout = setTimeout(() => {
                    indicator.style.transform = 'translateX(100%)';
                  }, 300);
                }
              }
              
              // Show loading on navigation
              document.addEventListener('click', function(e) {
                const link = e.target.closest('a');
                if (link && link.href && !link.href.startsWith('#') && !link.href.startsWith('tel:') && !link.href.startsWith('mailto:')) {
                  showLoading();
                }
              });
            `
          }}
        />
      </body>
    </html>
  )
}