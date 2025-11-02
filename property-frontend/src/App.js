import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import PropertyModal from './components/PropertyModal';
import AddPropertyForm from './components/AddPropertyForm';
import { propertyAPI } from './services/api';
import { Home, Search, Plus, MapPin, Users } from 'lucide-react';

function App() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  // Mock data - Tummim style
  const mockProperties = [
    {
      id: 1,
      title: "Ocean View Penthouse",
      description: "Stunning penthouse with panoramic ocean views and premium finishes",
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
      description: "Contemporary design meets urban innovation in the heart of the city",
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

  const filteredProperties = properties.filter(property =>
    !searchTerm || 
    property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      
      {/* TUMMIM-STYLE HERO SECTION */}
      <section className="tummim-hero relative h-screen overflow-hidden">
        {/* Animated Ocean Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white bg-opacity-10 rounded-full blur-3xl float-animation"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-accent-300 bg-opacity-20 rounded-full blur-2xl" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-secondary-400 bg-opacity-20 rounded-full blur-3xl pulse-glow"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white max-w-6xl px-8">
            <h1 className="tummim-heading text-6xl md:text-8xl mb-6">
              COMBINING INNOVATION
            </h1>
            <h1 className="tummim-heading text-6xl md:text-8xl mb-8">
              WITH THE POWER OF HOMES
            </h1>
            
            {/* Tummim signature dot */}
            <div className="tummim-dot mx-auto mb-8"></div>
            
            <p className="tummim-subheading text-xl md:text-2xl opacity-90 mb-8 max-w-4xl mx-auto">
              <strong>Strengthening families</strong> through the automation of key real estate processes.
            </p>
            
            <p className="tummim-body text-lg opacity-80 max-w-3xl mx-auto mb-16">
              We automate manual property search, eliminating delays and errors. The lack of digitization limits home finding efficiency – we are changing that.
            </p>
            
            {/* Tummim-style CTA */}
            <button 
              onClick={() => document.getElementById('properties').scrollIntoView({ behavior: 'smooth' })}
              className="glass-card px-12 py-6 text-xl font-light text-white hover:bg-white hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105"
            >
              Explore Properties
            </button>
          </div>
        </div>
      </section>

      {/* TUMMIM-STYLE HEADER (sticky after scroll) */}
      <div className="sticky top-0 z-50">
        <Header 
          onAddProperty={() => setIsAddFormOpen(true)}
          onSearch={setSearchTerm}
          searchTerm={searchTerm}
        />
      </div>

      {/* PROPERTIES SECTION - styled as Tummim insights */}
      <section id="properties" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="tummim-heading text-5xl text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="tummim-subheading text-xl text-gray-600 max-w-2xl mx-auto">
              Premium listings in the most innovative locations
            </p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProperties.map((property) => (
                <article 
                  key={property.id}
                  className="insight-card cursor-pointer group"
                  onClick={() => setSelectedProperty(property)}
                >
                  {/* Property Image */}
                  <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                    <img
                      src={property.images?.[0]?.imageUrl || "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop"}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black from-opacity-60 to-transparent">
                      <div className="absolute bottom-6 left-6 text-white">
                        <div className="text-3xl font-light mb-2">
                          {new Intl.NumberFormat('pl-PL', {
                            style: 'currency',
                            currency: 'PLN',
                            minimumFractionDigits: 0,
                          }).format(property.price)}
                        </div>
                        <div className="text-lg opacity-90">
                          {property.city}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tags - Tummim style */}
                  <div className="flex space-x-2 mb-4">
                    <span className={`tag-pill ${property.propertyType === 'SALE' ? 'tag-secondary' : 'tag-primary'}`}>
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
                  <div className="text-sm text-gray-500 mb-3">
                    {new Date(property.createdAt).toLocaleDateString('pl-PL')}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">
                    {property.title}
                  </h3>

                  {/* Description */}
                  <p className="tummim-body text-gray-600 mb-6">
                    {property.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-2" />
                      {property.street && `${property.street}, `}{property.city}
                    </div>
                    <div className="text-primary-600 font-medium group-hover:text-primary-700">
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
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-8">
          
          <div className="text-center mb-16">
            <h2 className="tummim-heading text-5xl text-gray-900 mb-4">
              <strong>Contemporary solutions</strong>
            </h2>
            <p className="tummim-subheading text-xl text-gray-600">
              for modern real estate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 tummim-button rounded-2xl flex items-center justify-center mb-6 pulse-glow">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Advanced Search
              </h3>
              <p className="tummim-body text-gray-600">
                AI-powered search that finds perfect matches instantly.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 tummim-card rounded-2xl flex items-center justify-center mb-6">
                <Home className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Property Management
              </h3>
              <p className="tummim-body text-gray-600">
                Complete property lifecycle management with automated workflows.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 ocean-gradient rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Client Coordination
              </h3>
              <p className="tummim-body text-gray-600">
                Seamless communication between buyers, sellers, and agents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-24 bg-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            
            <div className="float-animation">
              <div className="text-5xl font-extralight mb-2">2.5k</div>
              <div className="text-lg font-light opacity-80">properties listed</div>
            </div>
            
            <div className="float-animation">
              <div className="text-5xl font-extralight mb-2">150+</div>
              <div className="text-lg font-light opacity-80">satisfied customers</div>
            </div>
            
            <div className="float-animation">
              <div className="text-5xl font-extralight mb-2">25</div>
              <div className="text-lg font-light opacity-80">cities covered</div>
            </div>
            
            <div className="float-animation">
              <div className="text-5xl font-extralight mb-2">98%</div>
              <div className="text-lg font-light opacity-80">success rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="tummim-heading text-5xl text-gray-900 mb-6">
            <strong>Calm the market.</strong> Get in Touch with Us!
          </h2>
          <p className="tummim-body text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Individual solutions tailored to you – We specialize in adapting our services to the unique needs of your property search!
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              onClick={() => setIsAddFormOpen(true)}
              className="btn-primary text-lg px-12 py-6"
            >
              List Your Property
            </button>
            <div className="text-gray-600">
              <div className="font-medium">contact@propertyhub.com</div>
              <div className="text-primary-600">+48 604 549 449</div>
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
}

export default App;
