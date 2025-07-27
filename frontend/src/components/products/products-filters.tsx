"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export default function ProductsFilters() {
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  const brands = [
    { id: "apple", name: "Apple", count: 25 },
    { id: "samsung", name: "Samsung", count: 30 },
    { id: "google", name: "Google", count: 15 },
    { id: "oneplus", name: "OnePlus", count: 12 },
    { id: "xiaomi", name: "Xiaomi", count: 18 },
  ]

  const features = [
    { id: "5g", name: "5G Ready", count: 45 },
    { id: "wireless-charging", name: "Wireless Charging", count: 38 },
    { id: "water-resistant", name: "Water Resistant", count: 52 },
    { id: "dual-sim", name: "Dual SIM", count: 28 },
    { id: "fast-charging", name: "Fast Charging", count: 41 },
  ]

  const handleBrandChange = (brandId: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brandId])
    } else {
      setSelectedBrands(selectedBrands.filter((id) => id !== brandId))
    }
  }

  const handleFeatureChange = (featureId: string, checked: boolean) => {
    if (checked) {
      setSelectedFeatures([...selectedFeatures, featureId])
    } else {
      setSelectedFeatures(selectedFeatures.filter((id) => id !== featureId))
    }
  }

  const clearAllFilters = () => {
    setPriceRange([0, 2000])
    setSelectedBrands([])
    setSelectedFeatures([])
  }

  const activeFiltersCount =
    selectedBrands.length + selectedFeatures.length + (priceRange[0] > 0 || priceRange[1] < 2000 ? 1 : 0)

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Active Filters</CardTitle>
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {selectedBrands.map((brandId) => {
                const brand = brands.find((b) => b.id === brandId)
                return (
                  <Badge key={brandId} variant="secondary" className="flex items-center gap-1">
                    {brand?.name}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => handleBrandChange(brandId, false)} />
                  </Badge>
                )
              })}
              {selectedFeatures.map((featureId) => {
                const feature = features.find((f) => f.id === featureId)
                return (
                  <Badge key={featureId} variant="secondary" className="flex items-center gap-1">
                    {feature?.name}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => handleFeatureChange(featureId, false)} />
                  </Badge>
                )
              })}
              {(priceRange[0] > 0 || priceRange[1] < 2000) && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  ${priceRange[0]} - ${priceRange[1]}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setPriceRange([0, 2000])} />
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider value={priceRange} onValueChange={setPriceRange} max={2000} min={0} step={50} className="w-full" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Brands */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Brands</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {brands.map((brand) => (
              <div key={brand.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={brand.id}
                    checked={selectedBrands.includes(brand.id)}
                    onCheckedChange={(checked) => handleBrandChange(brand.id, checked as boolean)}
                  />
                  <Label htmlFor={brand.id} className="text-sm font-normal cursor-pointer">
                    {brand.name}
                  </Label>
                </div>
                <span className="text-xs text-gray-500">({brand.count})</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {features.map((feature) => (
              <div key={feature.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={feature.id}
                    checked={selectedFeatures.includes(feature.id)}
                    onCheckedChange={(checked) => handleFeatureChange(feature.id, checked as boolean)}
                  />
                  <Label htmlFor={feature.id} className="text-sm font-normal cursor-pointer">
                    {feature.name}
                  </Label>
                </div>
                <span className="text-xs text-gray-500">({feature.count})</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Storage */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Storage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {["64GB", "128GB", "256GB", "512GB", "1TB"].map((storage) => (
              <div key={storage} className="flex items-center space-x-2">
                <Checkbox id={storage} />
                <Label htmlFor={storage} className="text-sm font-normal cursor-pointer">
                  {storage}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
