import apiClient from './axios';

export const getLatestDraw = async () => {
  const res = await apiClient.get('/draws/latest');
  return res.data;
};

export const getDrawHistory = async (page = 1, limit = 10) => {
  const res = await apiClient.get(`/draws/history?page=${page}&limit=${limit}`);
  return res.data;
};
