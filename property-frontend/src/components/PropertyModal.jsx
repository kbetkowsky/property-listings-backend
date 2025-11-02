import React, { useState } from 'react';
import { X, MapPin, Bed, Square, Calendar, User, Euro, Building, Home } from 'lucide-react';

const PropertyModal = ({ property, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !property) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const images = property.images && property.images.length > 0 
    ? property.images 
    : [{ imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop' }];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Szczegóły nieruchomości</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Image Gallery */}
          <div className="mb-8">
            <div className="relative h-64 md:h-96 rounded-xl overflow-hidden bg-gray-100">
              <img
                src={images[currentImageIndex].imageUrl}
                alt={`${property.title} - zdjęcie ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop';
                }}
              />
              
              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all"
                  >
                    →
                  </button>
                </>
              )}
              
              {/* Image counter */}
              {images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-lg text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              )}
            </div>
            
            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="flex space-x-2 mt-4 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image.imageUrl}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Title and Price */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900 flex-1 mr-4">
                {property.title}
              </h1>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">
                  {formatPrice(property.price)}
                </div>
                {property.areaSqm && (
                  <div className="text-lg text-gray-500">
                    {formatPrice(property.price / property.areaSqm)}/m²
                  </div>
                )}
              </div>
            </div>
            
            {/* Property Type Badge */}
            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
              property.propertyType === 'SALE' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {property.propertyType === 'SALE' ? '🏷️ Na sprzedaż' : '🏠 Do wynajęcia'}
            </span>
          </div>
          
          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Basic Info */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">
                📋 Podstawowe informacje
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                  <MapPin className="h-5 w-5 mr-3 text-red-500" />
                  <div>
                    <div className="font-medium">{property.city}</div>
                    {property.street && (
                      <div className="text-sm text-gray-500">{property.street}</div>
                    )}
                    {property.postalCode && (
                      <div className="text-sm text-gray-500">{property.postalCode}</div>
                    )}
                  </div>
                </div>
                
                {property.areaSqm && (
                  <div className="flex items-center text-gray-700">
                    <Square className="h-5 w-5 mr-3 text-blue-500" />
                    <span><strong>{property.areaSqm} m²</strong> powierzchni</span>
                  </div>
                )}
                
                {property.roomCount && (
                  <div className="flex items-center text-gray-700">
                    <Bed className="h-5 w-5 mr-3 text-green-500" />
                    <span><strong>{property.roomCount}</strong> {property.roomCount === 1 ? 'pokój' : 'pokoje'}</span>
                  </div>
                )}
                
                {property.floorNumber !== null && property.floorNumber !== undefined && (
                  <div className="flex items-center text-gray-700">
                    <Building className="h-5 w-5 mr-3 text-purple-500" />
                    <span><strong>{property.floorNumber}</strong>. piętro</span>
                  </div>
                )}
                
                <div className="flex items-center text-gray-700">
                  <Calendar className="h-5 w-5 mr-3 text-orange-500" />
                  <span>Dodane <strong>{formatDate(property.createdAt)}</strong></span>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">
                📝 Opis
              </h3>
              <div className="text-gray-700 leading-relaxed">
                {property.description || (
                  <div className="italic text-gray-500 bg-gray-50 p-4 rounded-lg">
                    Brak szczegółowego opisu dla tej nieruchomości.
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Contact Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-600" />
              Kontakt z właścicielem
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-4 sm:mb-0">
                <p className="text-gray-600">
                  Skontaktuj się, aby umówić się na oglądanie
                </p>
                <p className="text-sm text-gray-500">
                  ID ogłoszenia: #{property.id}
                </p>
              </div>
              <div className="flex space-x-3">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105">
                  📞 Zadzwoń
                </button>
                <button className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-medium border border-gray-300 transition-all duration-200">
                  ✉️ Wyślij wiadomość
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;
