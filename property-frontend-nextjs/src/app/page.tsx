'use client'

import { useEffect, useState } from 'react'
import { Property, PagedResponse } from '@/types/property'
import { Search, MapPin, Home, Bed, Bath, Maximize } from 'lucide-react'

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetch('http://localhost:8080/api/properties?page=0&size=20')
      .then(res => res.json())
      .then((data: PagedResponse<Property>) => {
        setProperties(data.content)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.city.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Home className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">PropertyHub</span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Szukaj po mieście lub tytule..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
              Dodaj ogłoszenie
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-5xl font-bold mb-4">Znajdź swoje wymarzone mieszkanie</h1>
          <p className="text-xl text-blue-100">Ponad {properties.length} nieruchomości czeka na Ciebie</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              Znaleziono <span className="font-semibold text-gray-900">{filteredProperties.length}</span> nieruchomości
            </p>
            <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Najnowsze</option>
              <option>Najtańsze</option>
              <option>Najdroższe</option>
              <option>Największe</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Ładowanie nieruchomości...</p>
          </div>
        )}

        {/* Properties Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProperties.length === 0 && (
          <div className="text-center py-20">
            <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-600">Nie znaleziono nieruchomości</p>
            <p className="text-gray-400 mt-2">Spróbuj zmienić kryteria wyszukiwania</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Property Card Component
function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group">
      {/* Image Placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-blue-400 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <Home className="w-16 h-16 text-white opacity-50" />
        </div>

        {/* Type Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-blue-600">
            {property.type === 'SALE' ? 'Sprzedaż' : 'Wynajem'}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-3 right-3">
          <span className="bg-white px-3 py-1.5 rounded-lg font-bold text-blue-600">
            {property.price.toLocaleString('pl-PL')} PLN
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition">
          {property.title}
        </h3>

        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          {property.city}
        </div>

        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {property.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t">
          <div className="flex items-center">
            <Maximize className="w-4 h-4 mr-1" />
            {property.area} m²
          </div>

          {property.rooms && (
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              {property.rooms} pokoje
            </div>
          )}

          {property.bathrooms && (
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              {property.bathrooms}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
