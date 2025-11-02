import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor dla lepszego error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const propertyAPI = {
  // Pobierz wszystkie nieruchomości - zwraca Property[] (pełne obiekty)
  getAll: () => api.get('/properties'),
  
  // Pobierz nieruchomość po ID - zwraca Property (pełny obiekt)
  getById: (id) => api.get(`/properties/${id}`),
  
  // Dodaj nową nieruchomość - przyjmuje CreatePropertyRequest, zwraca PropertyResponse
  create: (property) => api.post('/properties', property),
  
  // Usuń nieruchomość
  delete: (id) => api.delete(`/properties/${id}`),
  
  // Aktualizuj nieruchomość - przyjmuje Property
  update: (id, property) => api.put(`/properties/${id}`, property),
};

export default api;
