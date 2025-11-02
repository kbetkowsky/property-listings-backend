import React, { useState } from 'react';
import { Home, Search, Plus, Menu, X, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const MegaNav = ({ onAddProperty, onSearch, searchTerm }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();

  const menuItems = {
    Browse: {
      sections: [
        {
          title: 'Property Types',
          links: [
            { name: 'Apartments', href: '/properties?type=apartment' },
            { name: 'Houses', href: '/properties?type=house' },
            { name: 'Commercial', href: '/properties?type=commercial' },
            { name: 'Land', href: '/properties?type=land' }
          ]
        },
        {
          title: 'Transaction Type',
          links: [
            { name: 'For Sale', href: '/properties?transaction=sale' },
            { name: 'For Rent', href: '/properties?transaction=rent' },
            { name: 'New Developments', href: '/properties?status=new' }
          ]
        }
      ]
    },
    Cities: {
      sections: [
        {
          title: 'Major Cities',
          links: [
            { name: 'Warsaw', href: '/properties?city=warszawa' },
            { name: 'Kraków', href: '/properties?city=krakow' },
            { name: 'Gdańsk', href: '/properties?city=gdansk' },
            { name: 'Wrocław', href: '/properties?city=wroclaw' }
          ]
        },
        {
          title: 'Popular Areas',
          links: [
            { name: 'City Centers', href: '/properties?area=center' },
            { name: 'Suburbs', href: '/properties?area=suburbs' },
            { name: 'Waterfront', href: '/properties?area=waterfront' }
          ]
        }
      ]
    },
    Insights: {
      sections: [
        {
          title: 'Market Analysis',
          links: [
            { name: 'Market Trends', href: '/insights/trends' },
            { name: 'Price Analysis', href: '/insights/prices' },
            { name: 'Investment Guide', href: '/insights/investment' }
          ]
        },
        {
          title: 'Resources',
          links: [
            { name: 'Buying Guide', href: '/insights/buying-guide' },
            { name: 'Selling Tips', href: '/insights/selling-tips' },
            { name: 'Legal Info', href: '/insights/legal' }
          ]
        }
      ]
    }
  };

  return (
    <>
      {/* Main Header */}
      <header className="bg-white/95 backdrop-blur-2xl shadow-xl border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Tummim-style Logo */}
            <Link to="/" className="flex items-center space-x-4 group">
              <div className="bg-ocean-gradient p-3 rounded-2xl pulse-glow group-hover:scale-105 transition-transform">
                <Home className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-extralight text-gray-900 tracking-tight">
                  PropertyHub
                </h1>
                <p className="text-xs text-gray-500 font-light tracking-[0.2em] uppercase">
                  Digital Real Estate
                </p>
              </div>
            </Link>
            
            {/* Desktop Mega Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {Object.entries(menuItems).map(([key, value]) => (
                <div 
                  key={key}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(key)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 font-light transition-colors py-2">
                    <span>{key}</span>
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                  </button>
                  
                  {/* Mega Menu Dropdown */}
                  {activeDropdown === key && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 pt-4">
                      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 min-w-[600px]">
                        <div className="grid grid-cols-2 gap-8">
                          {value.sections.map((section, idx) => (
                            <div key={idx}>
                              <h3 className="text-lg font-medium text-gray-900 mb-4">
                                {section.title}
                              </h3>
                              <ul className="space-y-3">
                                {section.links.map((link, linkIdx) => (
                                  <li key={linkIdx}>
                                    <Link 
                                      to={link.href}
                                      className="text-gray-600 hover:text-primary-600 transition-colors block py-1 font-light"
                                    >
                                      {link.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              <Link to="/about" className="text-gray-700 hover:text-primary-600 font-light transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-primary-600 font-light transition-colors">
                Contact
              </Link>
            </nav>
            
            {/* Search */}
            <div className="flex-1 max-w-md mx-8 hidden md:block">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => onSearch(e.target.value)}
                  className="w-full pl-12 pr-6 py-3 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all font-light"
                />
              </div>
            </div>
            
            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={onAddProperty}
                className="bg-tummim-button text-white px-8 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center space-x-3"
              >
                <Plus className="h-5 w-5" />
                <span>Add Property</span>
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-light text-gray-900">Menu</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <X className="h-6 w-6 text-gray-700" />
                </button>
              </div>
              
              {/* Mobile Search */}
              <div className="mb-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search properties..."
                    value={searchTerm}
                    onChange={(e) => onSearch(e.target.value)}
                    className="w-full pl-12 pr-6 py-3 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-primary-500 font-light"
                  />
                </div>
              </div>
              
              {/* Mobile Navigation */}
              <nav className="space-y-6 mb-8">
                {Object.entries(menuItems).map(([key, value]) => (
                  <div key={key}>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">{key}</h3>
                    <div className="space-y-4 ml-4">
                      {value.sections.map((section, idx) => (
                        <div key={idx}>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">{section.title}</h4>
                          <ul className="space-y-2 ml-4">
                            {section.links.map((link, linkIdx) => (
                              <li key={linkIdx}>
                                <Link 
                                  to={link.href}
                                  onClick={() => setIsMenuOpen(false)}
                                  className="text-gray-600 hover:text-primary-600 transition-colors block py-1 font-light"
                                >
                                  {link.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <Link 
                  to="/about" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lg font-medium text-gray-900 hover:text-primary-600 transition-colors"
                >
                  About
                </Link>
                <Link 
                  to="/contact" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lg font-medium text-gray-900 hover:text-primary-600 transition-colors"
                >
                  Contact
                </Link>
              </nav>
              
              {/* Mobile CTA */}
              <button
                onClick={() => {
                  onAddProperty();
                  setIsMenuOpen(false);
                }}
                className="w-full bg-tummim-button text-white px-6 py-4 rounded-2xl font-medium transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <Plus className="h-5 w-5" />
                <span>Add Property</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MegaNav;