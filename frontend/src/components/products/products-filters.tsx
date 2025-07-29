"use client"

import { useState } from "react"
import { X, Filter, ChevronDown, ChevronUp, Smartphone, Star, Zap, Shield, Battery, Camera } from "lucide-react"

// Mock components for demonstration
const Card = ({ className = "", children, ...props }) => (
  <div className={`rounded-xl border border-gray-200 bg-white shadow-sm ${className}`} {...props}>
    {children}
  </div>
)

const CardContent = ({ className = "", children, ...props }) => (
  <div className={`p-4 ${className}`} {...props}>
    {children}
  </div>
)

const CardHeader = ({ className = "", children, ...props }) => (
  <div className={`p-4 pb-2 ${className}`} {...props}>
    {children}
  </div>
)

const CardTitle = ({ className = "", children, ...props }) => (
  <h3 className={`font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
)

const Button = ({ variant = "default", size = "default", className = "", children, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500",
    ghost: "hover:bg-gray-100 hover:text-gray-900",
    outline: "border border-gray-300 bg-white hover:bg-gray-50"
  }
  const sizes = {
    default: "h-10 px-4 py-2 text-sm rounded-lg",
    sm: "h-8 px-3 text-xs rounded-md",
    lg: "h-12 px-8 text-base rounded-lg"
  }
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  )
}

const Badge = ({ variant = "default", className = "", children, ...props }) => {
  const variants = {
    default: "bg-blue-100 text-blue-800 border border-blue-200",
    secondary: "bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-50",
    destructive: "bg-red-100 text-red-800 border border-red-200"
  }
  
  return (
    <span 
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </span>
  )
}

const Checkbox = ({ id, checked, onCheckedChange, className = "", ...props }) => (
  <input
    type="checkbox"
    id={id}
    checked={checked}
    onChange={(e) => onCheckedChange?.(e.target.checked)}
    className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 transition-colors ${className}`}
    {...props}
  />
)

const Label = ({ htmlFor, className = "", children, ...props }) => (
  <label 
    htmlFor={htmlFor} 
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} 
    {...props}
  >
    {children}
  </label>
)

// Custom Range Slider Component
const RangeSlider = ({ value, onValueChange, min = 0, max = 100, step = 1, className = "" }) => {
  const handleChange = (index, newValue) => {
    const newRange = [...value]
    newRange[index] = parseInt(newValue)
    onValueChange(newRange)
  }

  const percentage1 = ((value[0] - min) / (max - min)) * 100
  const percentage2 = ((value[1] - min) / (max - min)) * 100

  return (
    <div className={`relative ${className}`}>
      <div className="relative h-2 bg-gray-200 rounded-full">
        <div 
          className="absolute h-2 bg-blue-600 rounded-full"
          style={{
            left: `${percentage1}%`,
            width: `${percentage2 - percentage1}%`
          }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0]}
        onChange={(e) => handleChange(0, e.target.value)}
        className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[1]}
        onChange={(e) => handleChange(1, e.target.value)}
        className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
      />
      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        .slider-thumb::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  )
}

export default function ProductsFilters() {
  const [priceRange, setPriceRange] = useState([0, 2000000])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedFeatures, setSelectedFeatures] = useState([])
  const [selectedStorage, setSelectedStorage] = useState([])
  const [selectedRating, setSelectedRating] = useState("")
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    brands: true,
    features: true,
    storage: false,
    rating: false,
    condition: false
  })

  const brands = [
    { id: "apple", name: "Apple", count: 25, icon: "🍎" },
    { id: "samsung", name: "Samsung", count: 30, icon: "📱" },
    { id: "google", name: "Google", count: 15, icon: "🔍" },
    { id: "oneplus", name: "OnePlus", count: 12, icon: "⚡" },
    { id: "xiaomi", name: "Xiaomi", count: 18, icon: "🔥" },
    { id: "huawei", name: "Huawei", count: 8, icon: "🌟" },
    { id: "oppo", name: "OPPO", count: 14, icon: "✨" },
    { id: "vivo", name: "Vivo", count: 11, icon: "💫" }
  ]

  const features = [
    { id: "5g", name: "5G Ready", count: 45, icon: <Zap className="w-4 h-4" /> },
    { id: "wireless-charging", name: "Wireless Charging", count: 38, icon: <Battery className="w-4 h-4" /> },
    { id: "water-resistant", name: "Water Resistant", count: 52, icon: <Shield className="w-4 h-4" /> },
    { id: "dual-sim", name: "Dual SIM", count: 28, icon: <Smartphone className="w-4 h-4" /> },
    { id: "fast-charging", name: "Fast Charging", count: 41, icon: <Zap className="w-4 h-4" /> },
    { id: "triple-camera", name: "Triple Camera", count: 35, icon: <Camera className="w-4 h-4" /> }
  ]

  const storageOptions = [
    { id: "64gb", name: "64GB", count: 22 },
    { id: "128gb", name: "128GB", count: 45 },
    { id: "256gb", name: "256GB", count: 38 },
    { id: "512gb", name: "512GB", count: 25 },
    { id: "1tb", name: "1TB", count: 12 }
  ]

  const ratingOptions = [
    { id: "4+", name: "4+ Stars", count: 85 },
    { id: "3+", name: "3+ Stars", count: 120 },
    { id: "2+", name: "2+ Stars", count: 145 },
    { id: "1+", name: "1+ Stars", count: 160 }
  ]

  const conditionOptions = [
    { id: "new", name: "Brand New", count: 95 },
    { id: "refurbished", name: "Refurbished", count: 32 },
    { id: "used", name: "Used - Like New", count: 18 }
  ]

  const handleBrandChange = (brandId, checked) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brandId])
    } else {
      setSelectedBrands(selectedBrands.filter((id) => id !== brandId))
    }
  }

  const handleFeatureChange = (featureId, checked) => {
    if (checked) {
      setSelectedFeatures([...selectedFeatures, featureId])
    } else {
      setSelectedFeatures(selectedFeatures.filter((id) => id !== featureId))
    }
  }

  const handleStorageChange = (storageId, checked) => {
    if (checked) {
      setSelectedStorage([...selectedStorage, storageId])
    } else {
      setSelectedStorage(selectedStorage.filter((id) => id !== storageId))
    }
  }

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const clearAllFilters = () => {
    setPriceRange([0, 2000000])
    setSelectedBrands([])
    setSelectedFeatures([])
    setSelectedStorage([])
    setSelectedRating("")
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const activeFiltersCount =
    selectedBrands.length + 
    selectedFeatures.length + 
    selectedStorage.length +
    (selectedRating ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 2000000 ? 1 : 0)

  const renderStars = (rating) => {
    const stars = []
    const numStars = parseInt(rating.replace('+', ''))
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          className={`w-3 h-3 ${i <= numStars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
        />
      )
    }
    return stars
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Filter className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Filters</h2>
            <p className="text-sm text-gray-600">Refine your search</p>
          </div>
        </div>
        {activeFiltersCount > 0 && (
          <Badge className="bg-blue-600 text-white border-blue-600">
            {activeFiltersCount} active
          </Badge>
        )}
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <Card className="border-blue-200 bg-blue-50/30">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-blue-900">Active Filters</CardTitle>
              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-blue-600 hover:text-blue-700 hover:bg-blue-100">
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {selectedBrands.map((brandId) => {
                const brand = brands.find((b) => b.id === brandId)
                return (
                  <Badge key={brandId} variant="secondary" className="flex items-center gap-1.5 pr-1">
                    <span className="text-xs">{brand?.icon}</span>
                    {brand?.name}
                    <button
                      onClick={() => handleBrandChange(brandId, false)}
                      className="ml-1 hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )
              })}
              {selectedFeatures.map((featureId) => {
                const feature = features.find((f) => f.id === featureId)
                return (
                  <Badge key={featureId} variant="secondary" className="flex items-center gap-1.5 pr-1">
                    {feature?.icon}
                    {feature?.name}
                    <button
                      onClick={() => handleFeatureChange(featureId, false)}
                      className="ml-1 hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )
              })}
              {selectedStorage.map((storageId) => {
                const storage = storageOptions.find((s) => s.id === storageId)
                return (
                  <Badge key={storageId} variant="secondary" className="flex items-center gap-1.5 pr-1">
                    {storage?.name}
                    <button
                      onClick={() => handleStorageChange(storageId, false)}
                      className="ml-1 hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )
              })}
              {selectedRating && (
                <Badge variant="secondary" className="flex items-center gap-1.5 pr-1">
                  <div className="flex items-center gap-0.5">
                    {renderStars(selectedRating)}
                  </div>
                  {selectedRating}
                  <button
                    onClick={() => setSelectedRating("")}
                    className="ml-1 hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {(priceRange[0] > 0 || priceRange[1] < 2000000) && (
                <Badge variant="secondary" className="flex items-center gap-1.5 pr-1">
                  {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  <button
                    onClick={() => setPriceRange([0, 2000000])}
                    className="ml-1 hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Price Range */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader 
          className="cursor-pointer hover:bg-gray-50 transition-colors rounded-t-xl"
          onClick={() => toggleSection('price')}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
              💰 Price Range
            </CardTitle>
            {expandedSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </CardHeader>
        {expandedSections.price && (
          <CardContent className="space-y-6">
            <RangeSlider 
              value={priceRange} 
              onValueChange={setPriceRange} 
              max={2000000} 
              min={0} 
              step={50000} 
              className="w-full"
            />
            <div className="flex justify-between items-center">
              <div className="bg-gray-50 px-3 py-2 rounded-lg border">
                <span className="text-sm font-medium text-gray-700">{formatPrice(priceRange[0])}</span>
              </div>
              <span className="text-gray-400 mx-2">—</span>
              <div className="bg-gray-50 px-3 py-2 rounded-lg border">
                <span className="text-sm font-medium text-gray-700">{formatPrice(priceRange[1])}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPriceRange([0, 100000])}
                className="text-gray-600 hover:text-gray-900"
              >
                Under ₦100K
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPriceRange([100000, 500000])}
                className="text-gray-600 hover:text-gray-900"
              >
                ₦100K - ₦500K
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPriceRange([500000, 1000000])}
                className="text-gray-600 hover:text-gray-900"
              >
                ₦500K - ₦1M
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPriceRange([1000000, 2000000])}
                className="text-gray-600 hover:text-gray-900"
              >
                Over ₦1M
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Brands */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader 
          className="cursor-pointer hover:bg-gray-50 transition-colors rounded-t-xl"
          onClick={() => toggleSection('brands')}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
              📱 Brands
            </CardTitle>
            {expandedSections.brands ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </CardHeader>
        {expandedSections.brands && (
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={brand.id}
                      checked={selectedBrands.includes(brand.id)}
                      onCheckedChange={(checked) => handleBrandChange(brand.id, checked)}
                    />
                    <Label htmlFor={brand.id} className="text-sm font-normal cursor-pointer flex items-center gap-2">
                      <span className="text-base">{brand.icon}</span>
                      {brand.name}
                    </Label>
                  </div>
                  <Badge variant="secondary" className="text-xs px-2 py-1">
                    {brand.count}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Features */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader 
          className="cursor-pointer hover:bg-gray-50 transition-colors rounded-t-xl"
          onClick={() => toggleSection('features')}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
              ⚡ Features
            </CardTitle>
            {expandedSections.features ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </CardHeader>
        {expandedSections.features && (
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
              {features.map((feature) => (
                <div key={feature.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={feature.id}
                      checked={selectedFeatures.includes(feature.id)}
                      onCheckedChange={(checked) => handleFeatureChange(feature.id, checked)}
                    />
                    <Label htmlFor={feature.id} className="text-sm font-normal cursor-pointer flex items-center gap-2">
                      <span className="text-blue-600">{feature.icon}</span>
                      {feature.name}
                    </Label>
                  </div>
                  <Badge variant="secondary" className="text-xs px-2 py-1">
                    {feature.count}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Storage */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader 
          className="cursor-pointer hover:bg-gray-50 transition-colors rounded-t-xl"
          onClick={() => toggleSection('storage')}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
              💾 Storage
            </CardTitle>
            {expandedSections.storage ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </CardHeader>
        {expandedSections.storage && (
          <CardContent>
            <div className="space-y-3">
              {storageOptions.map((storage) => (
                <div key={storage.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={storage.id}
                      checked={selectedStorage.includes(storage.id)}
                      onCheckedChange={(checked) => handleStorageChange(storage.id, checked)}
                    />
                    <Label htmlFor={storage.id} className="text-sm font-normal cursor-pointer">
                      {storage.name}
                    </Label>
                  </div>
                  <Badge variant="secondary" className="text-xs px-2 py-1">
                    {storage.count}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Customer Rating */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader 
          className="cursor-pointer hover:bg-gray-50 transition-colors rounded-t-xl"
          onClick={() => toggleSection('rating')}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
              ⭐ Customer Rating
            </CardTitle>
            {expandedSections.rating ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </CardHeader>
        {expandedSections.rating && (
          <CardContent>
            <div className="space-y-3">
              {ratingOptions.map((rating) => (
                <div key={rating.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id={rating.id}
                      name="rating"
                      checked={selectedRating === rating.id}
                      onChange={() => setSelectedRating(rating.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <Label htmlFor={rating.id} className="text-sm font-normal cursor-pointer flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        {renderStars(rating.id)}
                      </div>
                      & up
                    </Label>
                  </div>
                  <Badge variant="secondary" className="text-xs px-2 py-1">
                    {rating.count}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Condition */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader 
          className="cursor-pointer hover:bg-gray-50 transition-colors rounded-t-xl"
          onClick={() => toggleSection('condition')}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
              📦 Condition
            </CardTitle>
            {expandedSections.condition ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </CardHeader>
        {expandedSections.condition && (
          <CardContent>
            <div className="space-y-3">
              {conditionOptions.map((condition) => (
                <div key={condition.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <Checkbox id={condition.id} />
                    <Label htmlFor={condition.id} className="text-sm font-normal cursor-pointer">
                      {condition.name}
                    </Label>
                  </div>
                  <Badge variant="secondary" className="text-xs px-2 py-1">
                    {condition.count}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Apply Filters Button - Mobile */}
      <div className="sticky bottom-4 lg:hidden">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg">
          Apply Filters ({activeFiltersCount})
        </Button>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  )
}