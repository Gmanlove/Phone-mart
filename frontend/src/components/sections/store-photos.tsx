"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const storeImages = [
  {
    id: 1,
    src: "/img1.jpeg",
    alt: "Smart Communications Main Store Interior",
    caption: "87 Ikot Ekpene Rd - Uyo, Akwa Ibom",
  },
  {
    id: 2,
    src: "/img2.jpeg", 
    alt: "Expert Staff Assisting Customer",
    caption: "Expert staff providing personalized service"
  },
  {
    id: 3,
    src: "/img3.jpeg",
    alt: "Product Display Area",
    caption: "Wide selection of premium devices"
  },
  {
    id: 4,
    src: "/img4.jpeg",
    alt: "Service Counter",
    caption: "Professional repair and support services"
  },
  {
    id: 5,
    src: "/img5.jpeg",
    alt: "Store Front View",
    caption: "Modern storefront with easy accessibility"
  }
]

export default function StorePhotos() {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % storeImages.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + storeImages.length) % storeImages.length)
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Main large image */}
      <div className="col-span-2 relative">
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-700 group">
          <Image
            src={storeImages[currentImage].src}
            alt={storeImages[currentImage].alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Image overlay with caption */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            {/* If caption mentions the store address, render it as a link to Google Maps */}
            {String(storeImages[currentImage].caption).includes("Ikot Ekpene") ? (
              <p className="text-white font-semibold text-lg mb-2">
                <a
                  href="https://maps.app.goo.gl/R9auquxBFEorUpVu7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-200"
                >
                  {storeImages[currentImage].caption}
                </a>
              </p>
            ) : (
              <p className="text-white font-semibold text-lg mb-2">{storeImages[currentImage].caption}</p>
            )}
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                {storeImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImage ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={prevImage}
                  className="p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two smaller images */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-700 group">
        <Image
          src="/img2.jpeg"
          alt="Product Display"
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
      </div>
      
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-700 group">
        <Image
          src="/img4.jpeg"
          alt="Customer Service"
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
      </div>
    </div>
  )
}
