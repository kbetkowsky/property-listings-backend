'use client'

import { useEffect, useState } from 'react'
import { Property, PagedResponse } from '@/types/property'

export default function TestPage() {
  const [data, setData] = useState<PagedResponse<Property> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('http://localhost:8080/api/properties?page=0&size=5')
      .then(res => {
        if (!res.ok) throw new Error('API Error')
        return res.json()
      })
      .then((data: PagedResponse<Property>) => {
        setData(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="p-8">Ładowanie...</div>
  if (error) return <div className="p-8 text-red-500">Błąd: {error}</div>
  if (!data) return null

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Test połączenia z API</h1>
      
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <p className="text-sm">
          Znaleziono: <strong>{data.totalElements}</strong> nieruchomości
        </p>
      </div>

      <div className="grid gap-4">
        {data.content.map(property => (
          <div key={property.id} className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
            <p className="text-gray-600 mb-3">{property.description}</p>
            
            <div className="flex gap-4 text-sm">
              <span className="font-semibold text-green-600">
                {property.price.toLocaleString('pl-PL')} PLN
              </span>
              <span className="text-gray-500">|</span>
              <span>{property.area} m²</span>
              <span className="text-gray-500">|</span>
              <span>{property.city}</span>
            </div>

            <div className="mt-3 text-xs text-gray-400">
              Właściciel: {property.owner.firstName} {property.owner.lastName}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
