import apiClient from './axios';

export const getScores = async () => {
  const res = await apiClient.get('/scores');
  return res.data;
};

export const addScore = async ({ value, played_date }) => {
  const res = await apiClient.post('/scores', { value, played_date });
  return res.data;
};

export const deleteScore = async (id) => {
  const res = await apiClient.delete(`/scores/${id}`);
  return res.data;
};
