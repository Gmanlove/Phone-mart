"use client";

import { Search, Filter, Grid, List, ChevronDown, Star, Clock, MapPin } from "lucide-react";
import { useState } from "react";

export default function SearchPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  
  const searchResults = [
    {
      id: 1,
      title: "Premium Wireless Headphones",
      description: "High-quality noise-canceling headphones with premium sound quality and long battery life.",
      price: "$299.99",
      rating: 4.8,
      reviews: 1247,
      location: "Electronics Store",
      time: "2 hours ago",
      image: "bg-gradient-to-br from-blue-400 to-blue-600"
    },
    {
      id: 2,
      title: "Smart Fitness Watch",
      description: "Advanced fitness tracking with heart rate monitor, GPS, and water resistance up to 50m.",
      price: "$199.99",
      rating: 4.6,
      reviews: 892,
      location: "Tech Hub",
      time: "4 hours ago",
      image: "bg-gradient-to-br from-green-400 to-green-600"
    },
    {
      id: 3,
      title: "Professional Camera Lens",
      description: "85mm f/1.4 portrait lens with superior optical performance and bokeh quality.",
      price: "$599.99",
      rating: 4.9,
      reviews: 456,
      location: "Camera World",
      time: "6 hours ago",
      image: "bg-gradient-to-br from-purple-400 to-purple-600"
    },
    {
      id: 4,
      title: "Ergonomic Office Chair",
      description: "Premium ergonomic design with lumbar support, adjustable height, and breathable mesh.",
      price: "$399.99",
      rating: 4.7,
      reviews: 723,
      location: "Office Solutions",
      time: "8 hours ago",
      image: "bg-gradient-to-br from-orange-400 to-orange-600"
    },
    {
      id: 5,
      title: "Mechanical Gaming Keyboard",
      description: "RGB backlit mechanical keyboard with tactile switches and programmable keys.",
      price: "$149.99",
      rating: 4.5,
      reviews: 1089,
      location: "Gaming Paradise",
      time: "10 hours ago",
      image: "bg-gradient-to-br from-red-400 to-red-600"
    },
    {
      id: 6,
      title: "Portable Power Bank",
      description: "20,000mAh high-capacity power bank with fast charging and multiple USB ports.",
      price: "$79.99",
      rating: 4.4,
      reviews: 2156,
      location: "Mobile Accessories",
      time: "12 hours ago",
      image: "bg-gradient-to-br from-teal-400 to-teal-600"
    }
  ];

  const ResultCard = ({ result, isListView = false }) => (
    <div className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200 group ${isListView ? 'flex flex-col sm:flex-row gap-4 p-4' : 'p-6'}`}>
      <div className={`${result.image} rounded-lg ${isListView ? 'w-full sm:w-48 h-32 flex-shrink-0' : 'w-full h-48 mb-4'} flex items-center justify-center`}>
        <div className="w-16 h-16 bg-white/20 rounded-lg backdrop-blur-sm"></div>
      </div>
      
      <div className={`${isListView ? 'flex-1' : ''}`}>
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {result.title}
          </h3>
          <div className="text-xl font-bold text-gray-900 ml-2 flex-shrink-0">
            {result.price}
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {result.description}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-gray-700">{result.rating}</span>
            <span>({result.reviews.toLocaleString()})</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>{result.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{result.time}</span>
          </div>
        </div>
        
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200">
          View Details
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                Search Results
              </h1>
              <p className="text-gray-600">
                Found <span className="font-semibold text-gray-900">{searchResults.length}</span> results for your query
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Refine your search..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span className="font-medium">Filters</span>
            </button>
            
            <div className="relative">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="relevance">Sort by Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Results Grid/List */}
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
            : "space-y-4"
        }>
          {searchResults.map((result) => (
            <ResultCard key={result.id} result={result} isListView={viewMode === 'list'} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-8 border border-gray-300 rounded-lg transition-colors duration-200">
            Load More Results
          </button>
        </div>
      </div>
    </div>
  );
}