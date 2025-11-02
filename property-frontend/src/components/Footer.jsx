import React from 'react';
import { Home, Mail, Phone, MapPin, ArrowRight, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-white bg-opacity-10 p-3 rounded-2xl pulse-glow">
                  <Home className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-extralight tracking-tight">
                    PropertyHub
                  </h2>
                  <p className="text-xs text-white text-opacity-60 tracking-[0.2em] uppercase">
                    Digital Real Estate
                  </p>
                </div>
              </div>
              
              <p className="text-white text-opacity-80 font-light leading-relaxed mb-6">
                <strong>Strengthening families</strong> through the automation of key real estate processes.
              </p>
              
              <div className="tummim-dot mb-6"></div>
              
              <p className="text-sm text-white text-opacity-60 font-light">
                Innovation meets tradition in modern property search.
              </p>
            </div>
            
            {/* Properties Links */}
            <div>
              <h3 className="text-lg font-medium mb-6">Properties</h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/properties?transaction=sale" className="text-white text-opacity-80 hover:text-white transition-colors font-light">
                    For Sale
                  </Link>
                </li>
                <li>
                  <Link to="/properties?transaction=rent" className="text-white text-opacity-80 hover:text-white transition-colors font-light">
                    For Rent
                  </Link>
                </li>
                <li>
                  <Link to="/properties?type=apartment" className="text-white text-opacity-80 hover:text-white transition-colors font-light">
                    Apartments
                  </Link>
                </li>
                <li>
                  <Link to="/properties?type=house" className="text-white text-opacity-80 hover:text-white transition-colors font-light">
                    Houses
                  </Link>
                </li>
                <li>
                  <Link to="/properties?type=commercial" className="text-white text-opacity-80 hover:text-white transition-colors font-light">
                    Commercial
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Cities Links */}
            <div>
              <h3 className="text-lg font-medium mb-6">Cities</h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/properties?city=warszawa" className="text-white text-opacity-80 hover:text-white transition-colors font-light">
                    Warsaw
                  </Link>
                </li>
                <li>
                  <Link to="/properties?city=krakow" className="text-white text-opacity-80 hover:text-white transition-colors font-light">
                    Kraków
                  </Link>
                </li>
                <li>
                  <Link to="/properties?city=gdansk" className="text-white text-opacity-80 hover:text-white transition-colors font-light">
                    Gdańsk
                  </Link>
                </li>
                <li>
                  <Link to="/properties?city=wroclaw" className="text-white text-opacity-80 hover:text-white transition-colors font-light">
                    Wrocław
                  </Link>
                </li>
                <li>
                  <Link to="/properties?city=poznan" className="text-white text-opacity-80 hover:text-white transition-colors font-light">
                    Poznań
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Contact & Resources */}
            <div>
              <h3 className="text-lg font-medium mb-6">Connect</h3>
              
              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-white text-opacity-60" />
                  <a href="mailto:contact@propertyhub.com" className="text-white text-opacity-80 hover:text-white transition-colors font-light">
                    contact@propertyhub.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-white text-opacity-60" />
                  <a href="tel:+48604549449" className="text-white text-opacity-80 hover:text-white transition-colors font-light">
                    +48 604 549 449
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-white text-opacity-60" />
                  <span className="text-white text-opacity-80 font-light">
                    Kraków, Poland
                  </span>
                </div>
              </div>
              
              {/* Social Links */}
              <div>
                <h4 className="text-sm font-medium mb-4 text-white text-opacity-80">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="bg-white bg-opacity-10 p-2 rounded-xl hover:bg-opacity-20 transition-all">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="#" className="bg-white bg-opacity-10 p-2 rounded-xl hover:bg-opacity-20 transition-all">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="bg-white bg-opacity-10 p-2 rounded-xl hover:bg-opacity-20 transition-all">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="bg-white bg-opacity-10 p-2 rounded-xl hover:bg-opacity-20 transition-all">
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Newsletter CTA Section */}
        <div className="bg-white bg-opacity-5 border-t border-white border-opacity-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h3 className="text-2xl font-extralight mb-4">
                Stay Updated with Market Insights
              </h3>
              <p className="text-white text-opacity-80 font-light mb-8 max-w-2xl mx-auto">
                Get the latest property trends, market analysis, and exclusive listings delivered to your inbox.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-2xl text-white placeholder-white placeholder-opacity-60 focus:ring-2 focus:ring-white focus:ring-opacity-20 font-light"
                />
                <button className="w-full sm:w-auto bg-white text-primary-900 px-8 py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2">
                  <span>Subscribe</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="bg-white bg-opacity-5 border-t border-white border-opacity-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8">
                <p className="text-white text-opacity-60 text-sm font-light">
                  © 2025 PropertyHub. All rights reserved.
                </p>
                <div className="flex items-center space-x-6">
                  <Link to="/privacy" className="text-white text-opacity-60 hover:text-white text-sm font-light transition-colors">
                    Privacy Policy
                  </Link>
                  <Link to="/terms" className="text-white text-opacity-60 hover:text-white text-sm font-light transition-colors">
                    Terms of Service
                  </Link>
                  <Link to="/cookies" className="text-white text-opacity-60 hover:text-white text-sm font-light transition-colors">
                    Cookie Policy
                  </Link>
                </div>
              </div>
              
              <div className="text-white text-opacity-60 text-sm font-light">
                Made with ❤️ in Poland
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;