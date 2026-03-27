import axios from 'axios';
import { useAuthStore } from '../store/auth.store';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config.url.includes('/auth/login')) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    if (error.response?.status === 403 && error.response?.data?.error === 'subscription_required') {
      window.location.href = '/dashboard/subscription';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
