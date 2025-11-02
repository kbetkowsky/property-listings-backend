import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import MegaNav from './components/MegaNav';
import Footer from './components/Footer';
import AddPropertyForm from './components/AddPropertyForm';

// Pages
import Home from './pages/Home';
import PropertyDetail from './pages/PropertyDetail';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        {/* Global Navigation */}
        <MegaNav 
          onAddProperty={() => setIsAddFormOpen(true)}
          onSearch={setSearchTerm}
          searchTerm={searchTerm}
        />
        
        {/* Main Content Routes */}
        <main>
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  searchTerm={searchTerm}
                  onSearch={setSearchTerm}
                  onAddProperty={() => setIsAddFormOpen(true)}
                />
              } 
            />
            <Route path="/property/:id" element={<PropertyDetail />} />
            
            {/* Properties List Route */}
            <Route 
              path="/properties" 
              element={
                <Home 
                  searchTerm={searchTerm}
                  onSearch={setSearchTerm}
                  onAddProperty={() => setIsAddFormOpen(true)}
                />
              } 
            />
            
            {/* Placeholder routes for mega nav links */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/insights/*" element={<InsightsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/cookies" element={<CookiesPage />} />
          </Routes>
        </main>
        
        {/* Global Footer */}
        <Footer />
        
        {/* Global Modals */}
        <AddPropertyForm 
          isOpen={isAddFormOpen}
          onClose={() => setIsAddFormOpen(false)}
          onPropertyAdded={(newProperty) => {
            // Handle new property added - you could add global state management here
            console.log('New property added:', newProperty);
          }}
        />
      </div>
    </Router>
  );
}

// Placeholder components for navigation routes
const AboutPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center max-w-2xl mx-auto px-8">
      <h1 className="tummim-heading text-6xl text-gray-900 mb-8">About PropertyHub</h1>
      <div className="tummim-dot mx-auto mb-8 bg-primary-600"></div>
      <p className="tummim-body text-xl text-gray-600 leading-relaxed">
        <strong>Strengthening families</strong> through the automation of key real estate processes. 
        We combine innovation with the power of homes to create exceptional property experiences.
      </p>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center max-w-2xl mx-auto px-8">
      <h1 className="tummim-heading text-6xl text-gray-900 mb-8">Contact Us</h1>
      <div className="tummim-dot mx-auto mb-8 bg-primary-600"></div>
      <div className="space-y-4">
        <p className="text-xl text-gray-700">contact@propertyhub.com</p>
        <p className="text-xl text-primary-600">+48 604 549 449</p>
        <p className="text-lg text-gray-600">Kraków, Poland</p>
      </div>
    </div>
  </div>
);

const InsightsPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center max-w-2xl mx-auto px-8">
      <h1 className="tummim-heading text-6xl text-gray-900 mb-8">Market Insights</h1>
      <div className="tummim-dot mx-auto mb-8 bg-primary-600"></div>
      <p className="tummim-body text-xl text-gray-600 leading-relaxed">
        Coming soon - comprehensive market analysis and property insights.
      </p>
    </div>
  </div>
);

const PrivacyPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center max-w-2xl mx-auto px-8">
      <h1 className="tummim-heading text-4xl text-gray-900 mb-8">Privacy Policy</h1>
      <div className="tummim-dot mx-auto mb-8 bg-primary-600"></div>
      <p className="tummim-body text-lg text-gray-600 leading-relaxed">
        Your privacy is important to us. This page will contain our full privacy policy.
      </p>
    </div>
  </div>
);

const TermsPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center max-w-2xl mx-auto px-8">
      <h1 className="tummim-heading text-4xl text-gray-900 mb-8">Terms of Service</h1>
      <div className="tummim-dot mx-auto mb-8 bg-primary-600"></div>
      <p className="tummim-body text-lg text-gray-600 leading-relaxed">
        Terms and conditions for using PropertyHub services.
      </p>
    </div>
  </div>
);

const CookiesPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center max-w-2xl mx-auto px-8">
      <h1 className="tummim-heading text-4xl text-gray-900 mb-8">Cookie Policy</h1>
      <div className="tummim-dot mx-auto mb-8 bg-primary-600"></div>
      <p className="tummim-body text-lg text-gray-600 leading-relaxed">
        Information about how we use cookies on PropertyHub.
      </p>
    </div>
  </div>
);

export default App;