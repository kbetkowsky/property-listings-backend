import React from 'react';
import PropertyCard from './PropertyCard';
import { Home, Search } from 'lucide-react';

const PropertyList = ({ properties, loading, onPropertyClick, searchTerm }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Ładowanie ogłoszeń...</p>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
          {searchTerm ? (
            <Search className="h-12 w-12 text-gray-400" />
          ) : (
            <Home className="h-12 w-12 text-gray-400" />
          )}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {searchTerm ? 'Brak wyników wyszukiwania' : 'Brak ogłoszeń'}
        </h3>
        <p className="text-gray-600 mb-6">
          {searchTerm 
            ? `Nie znaleziono ogłoszeń dla "${searchTerm}"`
            : 'Nie ma jeszcze żadnych ogłoszeń w bazie danych'
          }
        </p>
        {searchTerm && (
          <p className="text-sm text-gray-500">
            Spróbuj wyszukać inne frazy lub dodaj nowe ogłoszenie
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      {/* Results Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {searchTerm ? `Wyniki dla "${searchTerm}"` : 'Dostępne nieruchomości'}
        </h2>
        <p className="text-gray-600">
          Znaleziono {properties.length} {properties.length === 1 ? 'ogłoszenie' : 'ogłoszeń'}
        </p>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onClick={onPropertyClick}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
