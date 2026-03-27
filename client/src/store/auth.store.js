import { create } from 'zustand';
import apiClient from '../api/axios';

export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  isLoading: true,
  
  setAuth: ({ user, token }) => {
    if (token) {
      localStorage.setItem('golf_auth_token', token);
    }
    set({ user, token: token || get().token, isLoading: false });
  },

  logout: () => {
    localStorage.removeItem('golf_auth_token');
    set({ user: null, token: null, isLoading: false });
  },

  initFromStorage: async () => {
    const token = localStorage.getItem('golf_auth_token');
    if (!token) {
      set({ isLoading: false });
      return;
    }

    set({ token, isLoading: true });

    try {
      // apiClient will use the token attached by interceptor
      const res = await apiClient.get('/users/me');
      set({ user: res.data.data, isLoading: false });
    } catch (err) {
      localStorage.removeItem('golf_auth_token');
      set({ user: null, token: null, isLoading: false });
    }
  }
}));

// Initialize immediately (handle safely in SSR environments if needed, but this is a SPA)
if (typeof window !== 'undefined') {
  useAuthStore.getState().initFromStorage();
}
