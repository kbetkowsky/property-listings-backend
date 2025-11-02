import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Home, Maximize, Layers, Calendar, Share2, Heart, Phone, Mail } from 'lucide-react';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock data for demonstration
  const mockProperties = {
    1: {
      id: 1,
      title: "Ocean View Penthouse",
      description: "Stunning penthouse with panoramic ocean views and premium finishes. This exceptional property offers luxury living at its finest, featuring floor-to-ceiling windows, premium materials throughout, and breathtaking views of the Baltic Sea. The open-concept design seamlessly blends indoor and outdoor living spaces, creating an atmosphere of refined elegance.",
      price: 2850000,
      city: "Gdańsk",
      street: "Marina Boulevard 15",
      areaSqm: 180,
      roomCount: 4,
      floorNumber: 25,
      propertyType: "SALE",
      createdAt: "2024-11-01T10:00:00",
      images: [
        { imageUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&h=800&fit=crop" },
        { imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop" },
        { imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&h=800&fit=crop" },
        { imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop" }
      ],
      features: [
        "Panoramic ocean views",
        "Premium finishes throughout",
        "Smart home technology",
        "Private balcony",
        "Underground parking",
        "24/7 concierge service",
        "Fitness center access",
        "Rooftop terrace"
      ],
      agent: {
        name: "Anna Kowalska",
        phone: "+48 604 549 449",
        email: "anna.kowalska@propertyhub.com",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b372?w=150&h=150&fit=crop&crop=face"
      }
    },
    2: {
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
      images: [
        { imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop" }
      ],
      features: [
        "Smart home integration",
        "High-speed fiber internet",
        "Modern appliances",
        "City center location"
      ],
      agent: {
        name: "Tomasz Nowak",
        phone: "+48 604 549 450",
        email: "tomasz.nowak@propertyhub.com",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      }
    }
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundProperty = mockProperties[id];
      setProperty(foundProperty || null);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-primary-500"></div>
          <div className="absolute inset-0 animate-ping rounded-full h-20 w-20 border border-accent-300 opacity-20"></div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-light text-gray-900 mb-4">Property not found</h2>
          <button onClick={() => navigate('/')} className="btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: property.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section with Image Gallery */}
      <section className="relative h-screen overflow-hidden">
        {/* Main Image */}
        <div className="relative h-full">
          <img
            src={property.images[currentImageIndex]?.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Navigation */}
          <div className="absolute top-8 left-8">
            <button
              onClick={() => navigate('/')}
              className="glass-card p-4 hover:bg-white hover:bg-opacity-20 transition-all"
            >
              <ArrowLeft className="h-6 w-6 text-white" />
            </button>
          </div>
          
          {/* Actions */}
          <div className="absolute top-8 right-8 flex space-x-4">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`glass-card p-4 transition-all ${
                isFavorite 
                  ? 'bg-red-500 bg-opacity-90 hover:bg-red-600' 
                  : 'hover:bg-white hover:bg-opacity-20'
              }`}
            >
              <Heart className={`h-6 w-6 ${
                isFavorite ? 'text-white fill-current' : 'text-white'
              }`} />
            </button>
            <button
              onClick={handleShare}
              className="glass-card p-4 hover:bg-white hover:bg-opacity-20 transition-all"
            >
              <Share2 className="h-6 w-6 text-white" />
            </button>
          </div>
          
          {/* Property Info Overlay */}
          <div className="absolute bottom-12 left-12 text-white max-w-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <span className={`tag-pill ${
                property.propertyType === 'SALE' ? 'bg-secondary-500 text-white' : 'bg-primary-500 text-white'
              }`}>
                {property.propertyType === 'SALE' ? 'For Sale' : 'For Rent'}
              </span>
              <span className="tag-pill bg-white bg-opacity-20 text-white">
                {property.roomCount} Rooms
              </span>
              <span className="tag-pill bg-white bg-opacity-20 text-white">
                {property.areaSqm} m²
              </span>
            </div>
            
            <h1 className="tummim-heading text-5xl md:text-6xl mb-4 leading-tight">
              {property.title}
            </h1>
            
            <div className="flex items-center space-x-2 mb-6">
              <MapPin className="h-5 w-5 opacity-80" />
              <span className="text-xl font-light opacity-90">
                {property.street}, {property.city}
              </span>
            </div>
            
            <div className="text-4xl font-extralight mb-6">
              {new Intl.NumberFormat('pl-PL', {
                style: 'currency',
                currency: 'PLN',
                minimumFractionDigits: 0,
              }).format(property.price)}
            </div>
          </div>
          
          {/* Image Navigation */}
          {property.images.length > 1 && (
            <div className="absolute bottom-8 right-8 flex space-x-2">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentImageIndex 
                      ? 'bg-white' 
                      : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Property Details */}
            <div className="lg:col-span-2">
              
              {/* Key Facts */}
              <div className="mb-16">
                <h2 className="tummim-heading text-4xl text-gray-900 mb-8">Key Facts</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Home className="h-8 w-8 text-primary-600" />
                    </div>
                    <div className="text-2xl font-light text-gray-900 mb-1">{property.roomCount}</div>
                    <div className="text-sm text-gray-600">Rooms</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Maximize className="h-8 w-8 text-secondary-600" />
                    </div>
                    <div className="text-2xl font-light text-gray-900 mb-1">{property.areaSqm}</div>
                    <div className="text-sm text-gray-600">m²</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Layers className="h-8 w-8 text-accent-600" />
                    </div>
                    <div className="text-2xl font-light text-gray-900 mb-1">{property.floorNumber}</div>
                    <div className="text-sm text-gray-600">Floor</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Calendar className="h-8 w-8 text-gray-600" />
                    </div>
                    <div className="text-2xl font-light text-gray-900 mb-1">2024</div>
                    <div className="text-sm text-gray-600">Year</div>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <div className="mb-16">
                <h2 className="tummim-heading text-4xl text-gray-900 mb-8">Description</h2>
                <div className="tummim-dot mb-8 bg-primary-600"></div>
                <p className="tummim-body text-lg text-gray-700 leading-relaxed">
                  {property.description}
                </p>
              </div>
              
              {/* Features */}
              <div className="mb-16">
                <h2 className="tummim-heading text-4xl text-gray-900 mb-8">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Image Gallery */}
              {property.images.length > 1 && (
                <div className="mb-16">
                  <h2 className="tummim-heading text-4xl text-gray-900 mb-8">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative aspect-square rounded-2xl overflow-hidden hover:scale-105 transition-transform ${
                          index === currentImageIndex ? 'ring-4 ring-primary-500' : ''
                        }`}
                      >
                        <img
                          src={image.imageUrl}
                          alt={`${property.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              
              {/* Agent Card */}
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 mb-8 sticky top-8">
                <h3 className="text-2xl font-light text-gray-900 mb-6">Contact Agent</h3>
                
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={property.agent.avatar}
                    alt={property.agent.name}
                    className="w-16 h-16 rounded-2xl object-cover"
                  />
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{property.agent.name}</h4>
                    <p className="text-gray-600">Property Specialist</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-8">
                  <a
                    href={`tel:${property.agent.phone}`}
                    className="flex items-center space-x-3 text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    <Phone className="h-5 w-5" />
                    <span>{property.agent.phone}</span>
                  </a>
                  <a
                    href={`mailto:${property.agent.email}`}
                    className="flex items-center space-x-3 text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                    <span>{property.agent.email}</span>
                  </a>
                </div>
                
                <div className="space-y-3">
                  <button className="w-full btn-primary">
                    Schedule Viewing
                  </button>
                  <button className="w-full btn-secondary">
                    Request Info
                  </button>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="bg-gray-50 rounded-3xl p-8">
                <h3 className="text-xl font-medium text-gray-900 mb-6">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price per m²</span>
                    <span className="font-medium">
                      {new Intl.NumberFormat('pl-PL', {
                        style: 'currency',
                        currency: 'PLN',
                        minimumFractionDigits: 0,
                      }).format(Math.round(property.price / property.areaSqm))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property ID</span>
                    <span className="font-medium">PH-{property.id.toString().padStart(6, '0')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Listed</span>
                    <span className="font-medium">
                      {new Date(property.createdAt).toLocaleDateString('pl-PL')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyDetail;