import axios from 'axios';
import Cookies from 'js-cookie';


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Add Token to every request
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (data: any) => api.post('/auth/login', data),
  register: (data: any) => api.post('/auth/register', data),
};

export const inventoryAPI = {
  getAll: () => api.get('/inventory/medicines'),
  updateStock: (id: string, qty: number) => api.patch(`/inventory/medicines/${id}/stock`, { quantity: qty }),
};

export const orderAPI = {
  create: (data: any) => api.post('/orders', data),
  getMyOrders: () => api.get('/orders'),
};

export default api;