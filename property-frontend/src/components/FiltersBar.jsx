import React, { useState } from 'react';
import { Filter, MapPin, Home, DollarSign, Maximize, ChevronDown } from 'lucide-react';

const FiltersBar = ({ filters, onFiltersChange, isSticky = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const transactionTypes = [
    { value: 'all', label: 'All Properties' },
    { value: 'sale', label: 'For Sale' },
    { value: 'rent', label: 'For Rent' }
  ];

  const propertyTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'apartment', label: 'Apartments' },
    { value: 'house', label: 'Houses' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'land', label: 'Land' }
  ];

  const roomOptions = [
    { value: 'all', label: 'Any' },
    { value: '1', label: '1 Room' },
    { value: '2', label: '2 Rooms' },
    { value: '3', label: '3 Rooms' },
    { value: '4', label: '4 Rooms' },
    { value: '5+', label: '5+ Rooms' }
  ];

  const cities = [
    { value: 'all', label: 'All Cities' },
    { value: 'warszawa', label: 'Warsaw' },
    { value: 'krakow', label: 'Kraków' },
    { value: 'gdansk', label: 'Gdańsk' },
    { value: 'wroclaw', label: 'Wrocław' },
    { value: 'poznan', label: 'Poznań' }
  ];

  const priceRanges = [
    { value: 'all', label: 'Any Price' },
    { value: '0-500000', label: 'Up to 500k PLN' },
    { value: '500000-1000000', label: '500k - 1M PLN' },
    { value: '1000000-2000000', label: '1M - 2M PLN' },
    { value: '2000000-5000000', label: '2M - 5M PLN' },
    { value: '5000000+', label: '5M+ PLN' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
    setActiveDropdown(null);
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value && value !== 'all').length;
  };

  const Dropdown = ({ icon: Icon, label, value, options, filterKey }) => (
    <div className="relative">
      <button
        onClick={() => setActiveDropdown(activeDropdown === filterKey ? null : filterKey)}
        className={`flex items-center space-x-2 px-4 py-3 rounded-2xl transition-all duration-300 ${
          activeDropdown === filterKey 
            ? 'bg-primary-100 text-primary-700 shadow-lg' 
            : 'bg-white hover:bg-gray-50 text-gray-700 hover:shadow-md'
        } border border-gray-200`}
      >
        <Icon className="h-4 w-4" />
        <span className="font-medium">
          {options.find(opt => opt.value === value)?.label || label}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${
          activeDropdown === filterKey ? 'rotate-180' : ''
        }`} />
      </button>
      
      {activeDropdown === filterKey && (
        <div className="absolute top-full left-0 mt-2 min-w-full bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleFilterChange(filterKey, option.value)}
              className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                value === option.value ? 'text-primary-600 bg-primary-50' : 'text-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Click outside to close dropdowns */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setActiveDropdown(null)}
        />
      )}
      
      <div className={`bg-white/95 backdrop-blur-2xl border-b border-gray-100 transition-all duration-300 ${
        isSticky ? 'sticky top-20 z-40 shadow-lg' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            
            {/* Main Filters Row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-1">
                <Filter className="h-5 w-5 text-gray-500" />
                <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                {getActiveFiltersCount() > 0 && (
                  <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium ml-2">
                    {getActiveFiltersCount()} active
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-gray-600 hover:text-primary-600 transition-colors font-medium"
                >
                  {isExpanded ? 'Less Filters' : 'More Filters'}
                </button>
                
                {getActiveFiltersCount() > 0 && (
                  <button
                    onClick={() => onFiltersChange({
                      transaction: 'all',
                      propertyType: 'all',
                      city: 'all',
                      rooms: 'all',
                      priceRange: 'all',
                      areaRange: 'all'
                    })}
                    className="text-gray-500 hover:text-red-600 transition-colors text-sm font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>
            
            {/* Primary Filters */}
            <div className="flex flex-wrap gap-3 relative z-50">
              <Dropdown
                icon={Home}
                label="Transaction Type"
                value={filters.transaction || 'all'}
                options={transactionTypes}
                filterKey="transaction"
              />
              
              <Dropdown
                icon={Home}
                label="Property Type"
                value={filters.propertyType || 'all'}
                options={propertyTypes}
                filterKey="propertyType"
              />
              
              <Dropdown
                icon={MapPin}
                label="City"
                value={filters.city || 'all'}
                options={cities}
                filterKey="city"
              />
              
              <Dropdown
                icon={DollarSign}
                label="Price Range"
                value={filters.priceRange || 'all'}
                options={priceRanges}
                filterKey="priceRange"
              />
              
              {isExpanded && (
                <>
                  <Dropdown
                    icon={Home}
                    label="Rooms"
                    value={filters.rooms || 'all'}
                    options={roomOptions}
                    filterKey="rooms"
                  />
                  
                  <div className="flex items-center space-x-2 px-4 py-3 bg-white border border-gray-200 rounded-2xl">
                    <Maximize className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700 font-medium mr-2">Area:</span>
                    <input
                      type="number"
                      placeholder="Min m²"
                      value={filters.minArea || ''}
                      onChange={(e) => handleFilterChange('minArea', e.target.value)}
                      className="w-20 px-2 py-1 border-0 focus:ring-0 text-sm"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      placeholder="Max m²"
                      value={filters.maxArea || ''}
                      onChange={(e) => handleFilterChange('maxArea', e.target.value)}
                      className="w-20 px-2 py-1 border-0 focus:ring-0 text-sm"
                    />
                  </div>
                </>
              )}
            </div>
            
            {/* Results Summary */}
            <div className="mt-4 text-sm text-gray-600">
              Showing properties matching your criteria
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FiltersBar;