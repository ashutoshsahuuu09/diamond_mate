import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.detail || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

// ── Rings ──────────────────────────────────────────────────────────────────

export const getRings = (params = {}) => api.get('/api/rings', { params });
export const getRing = (id) => api.get(`/api/rings/${id}`);
export const getFeaturedRings = () => api.get('/api/rings/featured');
export const getCollections = () => api.get('/api/rings/collections');
export const createRing = (data) => api.post('/api/rings', data);

// ── Customizations ─────────────────────────────────────────────────────────

export const createCustomization = (data) => api.post('/api/customizations', data);
export const getCustomization = (id) => api.get(`/api/customizations/${id}`);

// ── Cart ───────────────────────────────────────────────────────────────────

export const getCart = (userId) => api.get(`/api/cart/${userId}`);
export const addToCart = (data) => api.post('/api/cart', data);
export const removeFromCart = (userId, ringId) => api.delete(`/api/cart/${userId}/${ringId}`);

// ── Orders ─────────────────────────────────────────────────────────────────

export const createOrder = (data) => api.post('/api/orders', data);
export const getOrder = (orderId) => api.get(`/api/orders/${orderId}`);

// ── Certificates ───────────────────────────────────────────────────────────

export const getCertificate = (certId) => api.get(`/api/certificates/${certId}`);

// ── Health ─────────────────────────────────────────────────────────────────

export const checkHealth = () => api.get('/health');

export default api;
