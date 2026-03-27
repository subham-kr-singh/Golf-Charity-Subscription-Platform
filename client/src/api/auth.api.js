import apiClient from './axios';
import { useAuthStore } from '../store/auth.store';

export const register = async (data) => {
  const res = await apiClient.post('/auth/register', data);
  return res.data;
};

export const login = async (data) => {
  const res = await apiClient.post('/auth/login', data);
  if (res.data.data?.access_token) {
    useAuthStore.getState().setAuth({
      user: res.data.data.user,
      token: res.data.data.access_token
    });
  }
  return res.data;
};

export const logout = async () => {
  try {
    await apiClient.post('/auth/logout');
  } finally {
    useAuthStore.getState().logout();
  }
};
