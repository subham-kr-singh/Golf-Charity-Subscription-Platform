import apiClient from './axios';

export const listCharities = async ({ search, featured } = {}) => {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (featured !== undefined) params.append('featured', featured);
  
  const res = await apiClient.get(`/charities?${params.toString()}`);
  return res.data;
};

export const getCharity = async (slug) => {
  const res = await apiClient.get(`/charities/${slug}`);
  return res.data;
};
