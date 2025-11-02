import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyModal from '../components/PropertyModal';
import AddPropertyForm from '../components/AddPropertyForm';
import FiltersBar from '../components/FiltersBar';
import { propertyAPI } from '../services/api';
import { Home as HomeIcon, Search, Plus, MapPin, Users, Building, Key, TrendingUp } from 'lucide-react';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [filters, setFilters] = useState({
    transaction: 'all',
    propertyType: 'all',
    city: 'all',
    rooms: 'all',
    priceRange: 'all'
  });
  const navigate = useNavigate();

  // Mock data - Enhanced Tummim style
  const mockProperties = [
    {
      id: 1,
      title: "Ocean View Penthouse",
      description: "Stunning penthouse with panoramic ocean views and premium finishes. Modern architecture meets luxury living.",
      price: 2850000,
      city: "Gdańsk",
      street: "Marina Boulevard 15",
      areaSqm: 180,
      roomCount: 4,
      floorNumber: 25,
      propertyType: "SALE",
      createdAt: "2024-11-01T10:00:00",
      images: [{
        imageUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop"
      }]
    },
    {
      id: 2,  
      title: "Modern Tech Loft",
      description: "Contemporary design meets urban innovation in the heart of the city. Smart home technology integrated throughout.",
      price: 1650000,
      city: "Warsaw",
      street: "Innovation District 44",
      areaSqm: 95,
      roomCount: 2,
      floorNumber: 12,
      propertyType: "RENT",
      createdAt: "2024-10-30T15:30:00",
      images: [{
        imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"
      }]
    },
    {
      id: 3,
      title: "Heritage Townhouse",
      description: "Beautifully restored 19th-century townhouse with modern amenities. Perfect blend of history and comfort.",
      price: 3200000,
      city: "Kraków",
      street: "Old Town Square 7",
      areaSqm: 220,
      roomCount: 5,
      floorNumber: 3,
      propertyType: "SALE",
      createdAt: "2024-10-28T12:00:00",
      images: [{
        imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop"
      }]
    },
    {
      id: 4,
      title: "Riverside Apartment",
      description: "Contemporary riverside living with floor-to-ceiling windows and private balcony overlooking the water.",
      price: 1850000,
      city: "Wrocław",
      street: "Odra Waterfront 23",
      areaSqm: 110,
      roomCount: 3,
      floorNumber: 8,
      propertyType: "SALE",
      createdAt: "2024-10-25T09:15:00",
      images: [{
        imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop"
      }]
    }
  ];

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await propertyAPI.getAll();
      setProperties(response.data.length ? response.data : mockProperties);
    } catch (error) {
      console.error('Backend connection error:', error);
      setProperties(mockProperties);
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter(property => {
    // Search term filter
    const matchesSearch = !searchTerm || 
      property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.city?.toLowerCase().includes(searchTerm.toLowerCase());

    // Apply other filters here based on filters state
    // This is a simplified version - you can expand this logic
    const matchesCity = filters.city === 'all' || property.city?.toLowerCase() === filters.city;
    const matchesType = filters.propertyType === 'all' || property.propertyType?.toLowerCase() === filters.propertyType;
    const matchesTransaction = filters.transaction === 'all' || property.propertyType?.toLowerCase() === filters.transaction;

    return matchesSearch && matchesCity && matchesType && matchesTransaction;
  });

  const handlePropertyClick = (property) => {
    navigate(`/property/${property.id}`);
  };

  return (
    <div className="min-h-screen">
      
      {/* MODERN HERO SECTION WITH ANIMATED BUILDINGS */}
      <section className="modern-hero relative h-screen overflow-hidden">
        {/* Animated 3D Buildings Background */}
        <div className="absolute inset-0">
          {/* City Skyline - Animated Buildings */}
          <div className="absolute bottom-0 left-0 w-full h-2/3">
            {/* Background Buildings Layer */}
            <div className="absolute bottom-0 left-0 w-full h-full opacity-20">
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute bottom-0 bg-white"
                  style={{
                    left: `${i * 7}%`,
                    width: `${4 + Math.random() * 3}%`,
                    height: `${30 + Math.random() * 40}%`,
                    animationDelay: `${i * 0.2}s`,
                    transform: `translateY(${Math.sin(i) * 10}px)`
                  }}
                >
                  {/* Building windows */}
                  <div className="w-full h-full grid grid-cols-2 gap-1 p-1">
                    {Array.from({ length: 8 }).map((_, j) => (
                      <div
                        key={j}
                        className={`bg-accent-300 rounded-sm ${
                          Math.random() > 0.3 ? 'animate-pulse' : ''
                        }`}
                        style={{ animationDelay: `${j * 0.5}s` }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Foreground Buildings Layer */}
            <div className="absolute bottom-0 left-0 w-full h-full opacity-30">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={`fg-${i}`}
                  className="absolute bottom-0 bg-white building-rise"
                  style={{
                    left: `${i * 12 + 5}%`,
                    width: `${6 + Math.random() * 4}%`,
                    height: `${50 + Math.random() * 30}%`,
                    animationDelay: `${i * 0.3}s`
                  }}
                >
                  {/* Modern building details */}
                  <div className="w-full h-full relative">
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-primary-300 rounded"></div>
                    <div className="w-full h-full grid grid-cols-3 gap-1 p-2 pt-4">
                      {Array.from({ length: 12 }).map((_, j) => (
                        <div
                          key={j}
                          className={`bg-accent-400 rounded-sm window-glow ${
                            Math.random() > 0.4 ? 'animate-pulse' : ''
                          }`}
                          style={{ animationDelay: `${j * 0.3}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Floating Property Icons */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 property-float" style={{ animationDelay: '0s' }}>
              <div className="bg-white bg-opacity-20 p-4 rounded-2xl backdrop-blur-sm">
                <Building className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <div className="absolute top-40 right-20 property-float" style={{ animationDelay: '1s' }}>
              <div className="bg-white bg-opacity-20 p-4 rounded-2xl backdrop-blur-sm">
                <Key className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <div className="absolute top-60 left-1/3 property-float" style={{ animationDelay: '2s' }}>
              <div className="bg-white bg-opacity-20 p-4 rounded-2xl backdrop-blur-sm">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <div className="absolute top-32 right-1/3 property-float" style={{ animationDelay: '3s' }}>
              <div className="bg-white bg-opacity-20 p-4 rounded-2xl backdrop-blur-sm">
                <HomeIcon className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          
          {/* Animated Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full opacity-60 particle-drift"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${10 + Math.random() * 20}s`
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white max-w-6xl px-8">
            <h1 className="tummim-heading text-6xl md:text-8xl mb-6 leading-none slide-in-up">
              COMBINING INNOVATION
            </h1>
            <h1 className="tummim-heading text-6xl md:text-8xl mb-8 leading-none slide-in-up" style={{ animationDelay: '0.3s' }}>
              WITH THE POWER OF HOMES
            </h1>
            
            {/* Tummim signature dot */}
            <div className="tummim-dot mx-auto mb-8 pulse-glow" style={{ animationDelay: '0.6s' }}></div>
            
            <p className="tummim-subheading text-xl md:text-2xl opacity-90 mb-8 max-w-4xl mx-auto slide-in-up" style={{ animationDelay: '0.9s' }}>
              <strong>Strengthening families</strong> through the automation of key real estate processes.
            </p>
            
            <p className="tummim-body text-lg opacity-80 max-w-3xl mx-auto mb-16 leading-relaxed slide-in-up" style={{ animationDelay: '1.2s' }}>
              We automate manual property search, eliminating delays and errors. The lack of digitization limits home finding efficiency – we are changing that.
            </p>
            
            {/* Tummim-style CTA */}
            <button 
              onClick={() => document.getElementById('properties').scrollIntoView({ behavior: 'smooth' })}
              className="glass-card px-12 py-6 text-xl font-light text-white hover:bg-white hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105 slide-in-up"
              style={{ animationDelay: '1.5s' }}
            >
              Explore Properties
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white opacity-60">
          <div className="scroll-indicator">
            <div className="scroll-dot"></div>
          </div>
        </div>
      </section>

      {/* FILTERS SECTION */}
      <FiltersBar 
        filters={filters}
        onFiltersChange={setFilters}
        isSticky={true}
      />

      {/* PROPERTIES SECTION - styled as Tummim insights */}
      <section id="properties" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="tummim-heading text-6xl text-gray-900 mb-6 tracking-tight">
              Featured Properties
            </h2>
            <p className="tummim-subheading text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Premium listings in the most innovative locations
            </p>
            <div className="tummim-dot mx-auto mt-8 bg-primary-600"></div>
          </div>

          {/* Properties Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-32">
              <div className="relative">
                <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-primary-500"></div>
                <div className="absolute inset-0 animate-ping rounded-full h-20 w-20 border border-accent-300 opacity-20"></div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {filteredProperties.map((property) => (
                <article 
                  key={property.id}
                  className="insight-card cursor-pointer group hover:scale-[1.02] transition-all duration-500"
                  onClick={() => handlePropertyClick(property)}
                >
                  {/* Property Image */}
                  <div className="relative h-80 rounded-3xl overflow-hidden mb-8">
                    <img
                      src={property.images?.[0]?.imageUrl || "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop"}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                      <div className="absolute bottom-8 left-8 text-white">
                        <div className="text-4xl font-extralight mb-2 tracking-tight">
                          {new Intl.NumberFormat('pl-PL', {
                            style: 'currency',
                            currency: 'PLN',
                            minimumFractionDigits: 0,
                          }).format(property.price)}
                        </div>
                        <div className="text-lg opacity-90 font-light">
                          {property.city}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tags - Tummim style */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className={`tag-pill ${
                      property.propertyType === 'SALE' ? 'tag-secondary' : 'tag-primary'
                    }`}>
                      {property.propertyType === 'SALE' ? 'For Sale' : 'For Rent'}
                    </span>
                    {property.roomCount && (
                      <span className="tag-pill tag-accent">
                        {property.roomCount} Rooms
                      </span>
                    )}
                    {property.areaSqm && (
                      <span className="tag-pill bg-gray-100 text-gray-700">
                        {property.areaSqm} m²
                      </span>
                    )}
                  </div>

                  {/* Date */}
                  <div className="text-sm text-gray-500 mb-4 font-light">
                    {new Date(property.createdAt).toLocaleDateString('pl-PL')}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-light text-gray-900 mb-4 group-hover:text-primary-700 transition-colors leading-tight">
                    {property.title}
                  </h3>

                  {/* Description */}
                  <p className="tummim-body text-gray-600 mb-8 leading-relaxed">
                    {property.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-500 font-light">
                      <MapPin className="h-4 w-4 mr-2" />
                      {property.street && `${property.street}, `}{property.city}
                    </div>
                    <div className="text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
                      więcej →
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SOLUTIONS SECTION */}
      <section className="py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-20">
            <h2 className="tummim-heading text-6xl text-gray-900 mb-6 tracking-tight">
              <strong>Contemporary solutions</strong>
            </h2>
            <p className="tummim-subheading text-2xl text-gray-600">
              for modern real estate
            </p>
            <div className="tummim-dot mx-auto mt-8 bg-primary-600"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <div className="w-20 h-20 tummim-button rounded-3xl flex items-center justify-center mb-8 pulse-glow">
                <Search className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-light text-gray-900 mb-6">
                Advanced Search
              </h3>
              <p className="tummim-body text-gray-600 leading-relaxed">
                AI-powered search that finds perfect matches instantly.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <div className="w-20 h-20 tummim-card rounded-3xl flex items-center justify-center mb-8">
                <HomeIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-light text-gray-900 mb-6">
                Property Management
              </h3>
              <p className="tummim-body text-gray-600 leading-relaxed">
                Complete property lifecycle management with automated workflows.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <div className="w-20 h-20 ocean-gradient rounded-3xl flex items-center justify-center mb-8">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-light text-gray-900 mb-6">
                Client Coordination
              </h3>
              <p className="tummim-body text-gray-600 leading-relaxed">
                Seamless communication between buyers, sellers, and agents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-28 bg-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            
            <div className="float-animation">
              <div className="text-6xl font-extralight mb-4 tracking-tight">2.5k</div>
              <div className="text-xl font-light opacity-80">properties listed</div>
            </div>
            
            <div className="float-animation" style={{animationDelay: '1s'}}>
              <div className="text-6xl font-extralight mb-4 tracking-tight">150+</div>
              <div className="text-xl font-light opacity-80">satisfied customers</div>
            </div>
            
            <div className="float-animation" style={{animationDelay: '2s'}}>
              <div className="text-6xl font-extralight mb-4 tracking-tight">25</div>
              <div className="text-xl font-light opacity-80">cities covered</div>
            </div>
            
            <div className="float-animation" style={{animationDelay: '3s'}}>
              <div className="text-6xl font-extralight mb-4 tracking-tight">98%</div>
              <div className="text-xl font-light opacity-80">success rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="tummim-heading text-6xl text-gray-900 mb-8 tracking-tight">
            <strong>Calm the market.</strong> Get in Touch with Us!
          </h2>
          <p className="tummim-body text-2xl text-gray-600 mb-16 max-w-3xl mx-auto leading-relaxed">
            Individual solutions tailored to you – We specialize in adapting our services to the unique needs of your property search!
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8">
            <button 
              onClick={() => setIsAddFormOpen(true)}
              className="btn-primary text-xl px-16 py-6"
            >
              List Your Property
            </button>
            <div className="text-gray-600">
              <div className="font-medium text-lg">contact@propertyhub.com</div>
              <div className="text-primary-600 text-lg">+48 604 549 449</div>
            </div>
          </div>
        </div>
      </section>

      {/* MODALS */}
      <PropertyModal 
        property={selectedProperty}
        isOpen={!!selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />
      
      <AddPropertyForm 
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onPropertyAdded={(newProperty) => {
          setProperties(prev => [newProperty, ...prev]);
        }}
      />
    </div>
  );
};

export default Home;