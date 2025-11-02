import React from 'react';
import { Home, Search, Plus } from 'lucide-react';

const Header = ({ onAddProperty, onSearch, searchTerm }) => {
  return (
    <header className="bg-white/95 backdrop-blur-2xl shadow-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Tummim-style Logo */}
          <div className="flex items-center space-x-4">
            <div className="bg-ocean-gradient p-3 rounded-2xl pulse-glow">
              <Home className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-light text-gray-900">
                PropertyHub
              </h1>
              <p className="text-xs text-gray-500 font-light tracking-wider">
                DIGITAL REAL ESTATE
              </p>
            </div>
          </div>
          
          {/* Tummim-style Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#properties" className="text-gray-700 hover:text-primary-600 font-light transition-colors">
              Properties
            </a>
            <a href="#about" className="text-gray-700 hover:text-primary-600 font-light transition-colors">
              About
            </a>
            <a href="#insights" className="text-gray-700 hover:text-primary-600 font-light transition-colors">
              Insights
            </a>
            <a href="#contact" className="text-gray-700 hover:text-primary-600 font-light transition-colors">
              Contact
            </a>
          </nav>
          
          {/* Search */}
          <div className="flex-1 max-w-md mx-8">
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
          
          {/* Tummim-style CTA Button */}
          <button
            onClick={onAddProperty}
            className="bg-tummim-button text-white px-8 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center space-x-3"
          >
            <Plus className="h-5 w-5" />
            <span>Add Property</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
