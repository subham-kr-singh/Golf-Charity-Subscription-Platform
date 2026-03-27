import apiClient from './axios';

export const getMyWins = async () => {
  const res = await apiClient.get('/winners/my-wins');
  return res.data;
};

export const uploadProof = async (winnerId, file) => {
  const formData = new FormData();
  formData.append('proof', file);
  
  const res = await apiClient.post(`/winners/${winnerId}/submit-proof`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
};
