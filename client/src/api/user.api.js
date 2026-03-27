import apiClient from './axios';

export const getMe = async () => {
  const res = await apiClient.get('/users/me');
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await apiClient.put('/users/me', data);
  return res.data;
};

export const getCharitySelection = async () => {
  const res = await apiClient.get('/users/me/charity');
  return res.data;
};

export const setCharity = async (data) => {
  const res = await apiClient.post('/users/me/charity', data);
  return res.data;
};
