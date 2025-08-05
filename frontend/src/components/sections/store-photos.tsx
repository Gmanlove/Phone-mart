"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, MapPin, Clock, Users, Award } from "lucide-react"

const storeImages = [
  {
    id: 1,
    src: "/img5.jpeg",
    alt: "Smart Communications Main Store Interior",
    caption: "Our flagship store in Uyo, Akwa Ibom",
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Visit Our Store
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Experience our professional environment and meet our expert team
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image Carousel */}
        <div className="relative">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <img
              src={storeImages[currentImage].src}
              alt={storeImages[currentImage].alt}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white font-medium text-sm bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg">
                {storeImages[currentImage].caption}
              </p>
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 p-2 rounded-full shadow-lg transition-all duration-200"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 p-2 rounded-full shadow-lg transition-all duration-200"
          >
            <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-4">
            {storeImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentImage 
                    ? 'bg-blue-600 dark:bg-blue-400' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Store Information */}
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Smart Communications Ltd
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              Visit our flagship store to experience our premium devices firsthand. Our expert team is ready to help you find the perfect mobile solution for your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Location</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  87 IKot Ekpene Road, Uyo<br />
                  Nigeria
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Hours</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Mon-Sat: 9AM-8PM<br />
                  Sunday: 12PM-6PM
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Expert Staff</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Certified technicians<br />
                  & sales specialists
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Certified</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Authorized retailer<br />
                  for all major brands
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}