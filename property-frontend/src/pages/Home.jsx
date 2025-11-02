import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyModal from '../components/PropertyModal';
import AddPropertyForm from '../components/AddPropertyForm';
import FiltersBar from '../components/FiltersBar';
import VideoBackground from '../components/VideoBackground';
import { propertyAPI } from '../services/api';
import { Home as HomeIcon, Search, Plus, MapPin, Users } from 'lucide-react';

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
      
      {/* HERO SECTION WITH VIDEO BACKGROUND */}
      <section className="relative h-screen overflow-hidden">
        <VideoBackground 
          srcWebm="/hero/real-estate-showcase.webm"
          srcMp4="/hero/real-estate-showcase.mp4"
          poster="/hero/real-estate-showcase-poster.jpg"
          overlay={true}
        />

        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white max-w-6xl px-8">
            <h1 className="tummim-heading text-6xl md:text-8xl mb-6 leading-none">
              COMBINING INNOVATION
            </h1>
            <h1 className="tummim-heading text-6xl md:text-8xl mb-8 leading-none">
              WITH THE POWER OF HOMES
            </h1>
            <div className="tummim-dot mx-auto mb-8"></div>
            <p className="tummim-subheading text-xl md:text-2xl opacity-90 mb-8 max-w-4xl mx-auto">
              <strong>Strengthening families</strong> through the automation of key real estate processes.
            </p>
            <p className="tummim-body text-lg opacity-80 max-w-3xl mx-auto mb-16 leading-relaxed">
              We automate manual property search, eliminating delays and errors. The lack of digitization limits home finding efficiency – we are changing that.
            </p>
            <button 
              onClick={() => document.getElementById('properties').scrollIntoView({ behavior: 'smooth' })}
              className="glass-card px-12 py-6 text-xl font-light text-white hover:bg-white hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105"
            >
              Explore Properties
            </button>
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
                  <div className="relative h-80 rounded-3xl overflow-hidden mb-8">
                    <img
                      src={property.images?.[0]?.imageUrl || "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop"}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                      <div className="absolute bottom-8 left-8 text-white">
                        <div className="text-4xl font-extralight mb-2 tracking-tight">
                          {new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN', minimumFractionDigits: 0 }).format(property.price)}
                        </div>
                        <div className="text-lg opacity-90 font-light">{property.city}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className={`tag-pill ${property.propertyType === 'SALE' ? 'tag-secondary' : 'tag-primary'}`}>
                      {property.propertyType === 'SALE' ? 'For Sale' : 'For Rent'}
                    </span>
                    {property.roomCount && <span className="tag-pill tag-accent">{property.roomCount} Rooms</span>}
                    {property.areaSqm && <span className="tag-pill bg-gray-100 text-gray-700">{property.areaSqm} m²</span>}
                  </div>
                  <div className="text-sm text-gray-500 mb-4 font-light">{new Date(property.createdAt).toLocaleDateString('pl-PL')}</div>
                  <h3 className="text-2xl font-light text-gray-900 mb-4 group-hover:text-primary-700 transition-colors leading-tight">{property.title}</h3>
                  <p className="tummim-body text-gray-600 mb-8 leading-relaxed">{property.description}</p>
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-500 font-light">
                      <MapPin className="h-4 w-4 mr-2" />
                      {property.street && `${property.street}, `}{property.city}
                    </div>
                    <div className="text-primary-600 font-medium group-hover:text-primary-700 transition-colors">więcej →</div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SOLUTIONS SECTION, STATS, CTA remain unchanged */}
      {/* ... keep rest of sections from previous version ... */}

      {/* MODALS */}
      <PropertyModal property={selectedProperty} isOpen={!!selectedProperty} onClose={() => setSelectedProperty(null)} />
      <AddPropertyForm isOpen={isAddFormOpen} onClose={() => setIsAddFormOpen(false)} onPropertyAdded={(newProperty) => { setProperties(prev => [newProperty, ...prev]); }} />
    </div>
  );
};

export default Home;
