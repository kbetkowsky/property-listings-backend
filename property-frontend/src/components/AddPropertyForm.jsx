import React, { useState } from 'react';
import { X, Upload, Plus, AlertCircle, CheckCircle } from 'lucide-react';
import { propertyAPI } from '../services/api';

const AddPropertyForm = ({ isOpen, onClose, onPropertyAdded }) => {
  // Stan formularza zgodny z CreatePropertyRequest
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    areaSqm: '',
    roomCount: '',
    floorNumber: '',
    propertyType: 'SALE',
    city: '',
    street: '',
    postalCode: '',
    ownerId: 1, // Tymczasowo - można dodać wybór użytkownika
    images: []
  });

  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Walidacja zgodna z backend walidacjami
  const validateField = (name, value) => {
    switch(name) {
      case 'title':
        if (!value.trim()) return 'Tytuł jest wymagany';
        if (value.length > 200) return 'Tytuł nie może być dłuższy niż 200 znaków';
        break;
      case 'description':
        if (!value.trim()) return 'Opis jest wymagany';
        if (value.length > 3000) return 'Opis nie może być dłuższy niż 3000 znaków';
        break;
      case 'price':
        const price = parseFloat(value);
        if (!value || isNaN(price)) return 'Cena jest wymagana';
        if (price <= 0) return 'Cena musi być dodatnia';
        if (price > 99999999.99) return 'Cena nie może przekraczać 99,999,999.99';
        break;
      case 'areaSqm':
        const area = parseFloat(value);
        if (!value || isNaN(area)) return 'Powierzchnia jest wymagana';
        if (area <= 0) return 'Powierzchnia musi być dodatnia';
        if (area > 9999.99) return 'Powierzchnia nie może przekraczać 9999.99 m²';
        break;
      case 'city':
        if (!value.trim()) return 'Miasto jest wymagane';
        if (value.length > 100) return 'Nazwa miasta nie może być dłuższa niż 100 znaków';
        break;
      case 'street':
        if (value && value.length > 200) return 'Nazwa ulicy nie może być dłuższa niż 200 znaków';
        break;
      case 'postalCode':
        if (value && !/^\d{2}-\d{3}$/.test(value)) return 'Kod pocztowy musi mieć format XX-XXX';
        break;
      case 'roomCount':
        if (value) {
          const rooms = parseInt(value);
          if (rooms <= 0) return 'Liczba pokoi musi być dodatnia';
          if (rooms > 50) return 'Liczba pokoi nie może przekraczać 50';
        }
        break;
      case 'floorNumber':
        if (value !== '') {
          const floor = parseInt(value);
          if (floor < -5) return 'Piętro nie może być niższe niż -5';
          if (floor > 200) return 'Piętro nie może być wyższe niż 200';
        }
        break;
    }
    return '';
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const addImage = () => {
    if (!imageUrl.trim()) {
      alert('Wprowadź URL obrazka');
      return;
    }

    // Walidacja URL zgodna z backend regex
    const urlPattern = /^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i;
    if (!urlPattern.test(imageUrl.trim())) {
      alert('URL musi być poprawnym linkiem do obrazka (jpg, jpeg, png, gif, webp)');
      return;
    }

    if (formData.images.length >= 10) {
      alert('Można dodać maksymalnie 10 zdjęć');
      return;
    }

    const newImage = {
      imageUrl: imageUrl.trim(),
      displayOrder: formData.images.length + 1,
      originalFileName: `image-${Date.now()}.jpg`,
      contentType: 'image/jpeg'
    };
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, newImage]
    }));
    
    setImageUrl('');
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images
        .filter((_, i) => i !== index)
        .map((img, i) => ({ ...img, displayOrder: i + 1 })) // Ponumeruj ponownie
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Sprawdź wszystkie wymagane pola
    newErrors.title = validateField('title', formData.title);
    newErrors.description = validateField('description', formData.description);
    newErrors.price = validateField('price', formData.price);
    newErrors.areaSqm = validateField('areaSqm', formData.areaSqm);
    newErrors.city = validateField('city', formData.city);
    newErrors.street = validateField('street', formData.street);
    newErrors.postalCode = validateField('postalCode', formData.postalCode);
    newErrors.roomCount = validateField('roomCount', formData.roomCount);
    newErrors.floorNumber = validateField('floorNumber', formData.floorNumber);
    
    // Usuń puste błędy
    Object.keys(newErrors).forEach(key => {
      if (!newErrors[key]) delete newErrors[key];
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Popraw błędy w formularzu');
      return;
    }
    
    setLoading(true);
    
    try {
      // Przygotuj dane zgodnie z CreatePropertyRequest
      const propertyData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        areaSqm: parseFloat(formData.areaSqm),
        roomCount: formData.roomCount ? parseInt(formData.roomCount) : null,
        floorNumber: formData.floorNumber !== '' ? parseInt(formData.floorNumber) : null,
        propertyType: formData.propertyType,
        city: formData.city.trim(),
        street: formData.street ? formData.street.trim() : null,
        postalCode: formData.postalCode || null,
        ownerId: parseInt(formData.ownerId),
        images: formData.images
      };
      
      console.log('Wysyłam dane:', propertyData); // Debug
      
      const response = await propertyAPI.create(propertyData);
      console.log('Odpowiedź z backend:', response.data); // Debug
      
      onPropertyAdded(response.data);
      onClose();
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        price: '',
        areaSqm: '',
        roomCount: '',
        floorNumber: '',
        propertyType: 'SALE',
        city: '',
        street: '',
        postalCode: '',
        ownerId: 1,
        images: []
      });
      setErrors({});
      
    } catch (error) {
      console.error('Błąd dodawania nieruchomości:', error);
      
      if (error.response?.status === 400 && error.response?.data?.validationErrors) {
        // Backend validation errors
        setErrors(error.response.data.validationErrors);
        alert('Popraw błędy walidacji w formularzu');
      } else if (error.response?.data?.message) {
        alert(`Błąd: ${error.response.data.message}`);
      } else {
        alert('Wystąpił nieoczekiwany błąd. Sprawdź czy backend działa na localhost:8080');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
          <h2 className="text-2xl font-bold text-gray-900">📝 Dodaj nowe ogłoszenie</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-60 rounded-xl transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title - wymagane */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tytuł ogłoszenia <span className="text-red-500">*</span>
              <span className="text-xs text-gray-500 ml-2">(max 200 znaków)</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`input-field ${errors.title ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              placeholder="np. Mieszkanie 3-pokojowe w centrum Warszawy"
              maxLength={200}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.title}
              </p>
            )}
          </div>
          
          {/* Price and Area - wymagane */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cena (PLN) <span className="text-red-500">*</span>
                <span className="text-xs text-gray-500 ml-2">(max 99,999,999.99)</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`input-field ${errors.price ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                placeholder="750000"
                min="1"
                max="99999999.99"
                step="1000"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.price}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Powierzchnia (m²) <span className="text-red-500">*</span>
                <span className="text-xs text-gray-500 ml-2">(max 9999.99)</span>
              </label>
              <input
                type="number"
                step="0.1"
                name="areaSqm"
                value={formData.areaSqm}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`input-field ${errors.areaSqm ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                placeholder="65.5"
                min="1"
                max="9999.99"
              />
              {errors.areaSqm && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.areaSqm}
                </p>
              )}
            </div>
          </div>
          
          {/* Rooms, Floor, Type */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Liczba pokoi
                <span className="text-xs text-gray-500 ml-2">(1-50)</span>
              </label>
              <input
                type="number"
                name="roomCount"
                value={formData.roomCount}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`input-field ${errors.roomCount ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                placeholder="3"
                min="1"
                max="50"
              />
              {errors.roomCount && (
                <p className="text-red-500 text-sm mt-1">{errors.roomCount}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Piętro
                <span className="text-xs text-gray-500 ml-2">(-5 do 200)</span>
              </label>
              <input
                type="number"
                name="floorNumber"
                value={formData.floorNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`input-field ${errors.floorNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                placeholder="4"
                min="-5"
                max="200"
              />
              {errors.floorNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.floorNumber}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Typ nieruchomości <span className="text-red-500">*</span>
              </label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="input-field"
              >
                <option value="SALE">🏷️ Na sprzedaż</option>
                <option value="RENT">🏠 Na wynajem</option>
              </select>
            </div>
          </div>
          
          {/* Location - miasto wymagane */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Miasto <span className="text-red-500">*</span>
                <span className="text-xs text-gray-500 ml-2">(max 100 znaków)</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`input-field ${errors.city ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                placeholder="Warszawa"
                maxLength={100}
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.city}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ulica
                <span className="text-xs text-gray-500 ml-2">(max 200 znaków)</span>
              </label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`input-field ${errors.street ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                placeholder="Marszałkowska 15"
                maxLength={200}
              />
              {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kod pocztowy
                <span className="text-xs text-gray-500 ml-2">(XX-XXX)</span>
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`input-field ${errors.postalCode ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                placeholder="00-001"
                pattern="[0-9]{2}-[0-9]{3}"
              />
              {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
            </div>
          </div>
          
          {/* Description - wymagane */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Opis <span className="text-red-500">*</span>
              <span className="text-xs text-gray-500 ml-2">(max 3000 znaków)</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={4}
              className={`input-field resize-none ${errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              placeholder="Szczegółowy opis nieruchomości... (lokalizacja, stan, wyposażenie, dojazd, itp.)"
              maxLength={3000}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.description ? (
                <p className="text-red-500 text-sm flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.description}
                </p>
              ) : (
                <div></div>
              )}
              <span className="text-xs text-gray-500">
                {formData.description.length}/3000
              </span>
            </div>
          </div>
          
          {/* Images - max 10 zgodnie z backend */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Zdjęcia
              <span className="text-xs text-gray-500 ml-2">(max 10, formaty: jpg, jpeg, png, gif, webp)</span>
            </label>
            
            {/* Add Image URL */}
            <div className="flex space-x-2 mb-4">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="input-field flex-1"
                placeholder="https://example.com/image.jpg"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
              />
              <button
                type="button"
                onClick={addImage}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center"
                disabled={formData.images.length >= 10}
              >
                <Plus className="h-4 w-4 mr-1" />
                Dodaj
              </button>
            </div>
            
            {/* Image List */}
            {formData.images.length > 0 && (
              <div className="space-y-3">
                <div className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded">
                  📷 {formData.images.length}/10 zdjęć
                </div>
                {formData.images.map((image, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-sm font-medium text-gray-700 bg-blue-100 px-2 py-1 rounded">
                        #{image.displayOrder}
                      </div>
                      <img
                        src={image.imageUrl}
                        alt={`Zdjęcie ${index + 1}`}
                        className="w-16 h-16 object-cover rounded border-2 border-gray-200"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/64x64/cccccc/ffffff?text=Error';
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-600 truncate">
                          {image.imageUrl}
                        </p>
                        <p className="text-xs text-gray-500">
                          {image.originalFileName} • {image.contentType}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Submit */}
          <div className="flex space-x-4 pt-6 border-t">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Dodawanie...
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Dodaj ogłoszenie
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              disabled={loading}
            >
              Anuluj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyForm;
