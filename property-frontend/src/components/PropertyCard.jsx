import React from 'react';
import { MapPin, Bed, Square, Calendar, Euro } from 'lucide-react';

const PropertyCard = ({ property, onClick }) => {
  const formatPrice = (price) => {
    // price to BigDecimal z backend
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getMainImage = () => {
    return property.images && property.images.length > 0 
      ? property.images[0].imageUrl 
      : 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop&crop=center';
  };

  const getPricePerSqm = () => {
    if (property.areaSqm && property.areaSqm > 0) {
      const pricePerSqm = property.price / property.areaSqm;
      return new Intl.NumberFormat('pl-PL', {
        style: 'currency',
        currency: 'PLN',
        minimumFractionDigits: 0,
      }).format(pricePerSqm);
    }
    return null;
  };

  return (
    <div 
      className="property-card cursor-pointer group transform hover:scale-[1.02] transition-all duration-300"
      onClick={() => onClick(property)}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        <img
          src={getMainImage()}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop&crop=center';
          }}
        />
        
        {/* Property Type Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium text-white shadow-lg ${
            property.propertyType === 'SALE' 
              ? 'bg-green-500' 
              : 'bg-blue-500'
          }`}>
            {property.propertyType === 'SALE' ? '💰 Sprzedaż' : '🏠 Wynajem'}
          </span>
        </div>

        {/* Image Count */}
        {property.images && property.images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-lg text-sm">
            📷 {property.images.length}
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-5">
        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="text-2xl font-bold text-gray-900">
            {formatPrice(property.price)}
          </div>
          {getPricePerSqm() && (
            <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {getPricePerSqm()}/m²
            </div>
          )}
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2 min-h-[56px]">
          {property.title}
        </h3>
        
        {/* Location */}
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-2 text-red-500 flex-shrink-0" />
          <span className="text-sm truncate">
            {property.city}
            {property.street && `, ${property.street}`}
            {property.postalCode && ` ${property.postalCode}`}
          </span>
        </div>
        
        {/* Details */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-4">
            {property.areaSqm && (
              <div className="flex items-center">
                <Square className="h-4 w-4 mr-1 text-blue-500" />
                <span>{property.areaSqm} m²</span>
              </div>
            )}
            {property.roomCount && (
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1 text-green-500" />
                <span>{property.roomCount} pok.</span>
              </div>
            )}
          </div>
          {property.floorNumber !== null && property.floorNumber !== undefined && (
            <div className="text-sm text-gray-500">
              {property.floorNumber > 0 ? `${property.floorNumber}. piętro` : 
               property.floorNumber === 0 ? 'Parter' : 
               `${Math.abs(property.floorNumber)}. podziemie`}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="h-3 w-3 mr-1" />
            <span>
              {property.createdAt ? formatDate(property.createdAt) : 'Brak daty'}
            </span>
          </div>
          <div className="text-sm font-medium text-blue-600 group-hover:text-blue-700">
            Zobacz szczegóły →
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
