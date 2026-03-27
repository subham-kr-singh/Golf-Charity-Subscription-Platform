import apiClient from './axios';

export const adminApi = {
  // Users
  listUsers: async (params) => {
    const res = await apiClient.get('/admin/users', { params });
    return res.data;
  },
  getUser: async (id) => {
    const res = await apiClient.get(`/admin/users/${id}`);
    return res.data;
  },
  updateUser: async (id, data) => {
    const res = await apiClient.put(`/admin/users/${id}`, data);
    return res.data;
  },
  updateUserScores: async (id, scores) => {
    const res = await apiClient.put(`/admin/users/${id}/scores`, { scores });
    return res.data;
  },
  updateSubscription: async (id, status) => {
    const res = await apiClient.put(`/admin/users/${id}/subscription`, { status });
    return res.data;
  },

  // Draws
  listDraws: async () => {
    const res = await apiClient.get('/admin/draws');
    return res.data;
  },
  createDraw: async (data) => {
    const res = await apiClient.post('/admin/draws', data);
    return res.data;
  },
  simulateDraw: async (id) => {
    const res = await apiClient.post(`/admin/draws/${id}/simulate`);
    return res.data;
  },
  publishDraw: async (id) => {
    const res = await apiClient.post(`/admin/draws/${id}/publish`);
    return res.data;
  },

  // Charities
  listCharities: async () => {
    const res = await apiClient.get('/admin/charities');
    return res.data;
  },
  createCharity: async (data) => {
    const res = await apiClient.post('/admin/charities', data);
    return res.data;
  },
  updateCharity: async (id, data) => {
    const res = await apiClient.put(`/admin/charities/${id}`, data);
    return res.data;
  },
  deleteCharity: async (id) => {
    const res = await apiClient.delete(`/admin/charities/${id}`);
    return res.data;
  },

  // Winners
  listWinners: async (params) => {
    const res = await apiClient.get('/admin/winners', { params });
    return res.data;
  },
  verifyWinner: async (id, { status, admin_notes }) => {
    const res = await apiClient.put(`/admin/winners/${id}/verify`, { status, admin_notes });
    return res.data;
  },
  markPaid: async (id, admin_notes) => {
    const res = await apiClient.put(`/admin/winners/${id}/payout`, { admin_notes });
    return res.data;
  },

  // Reports
  getSummary: async () => {
    const res = await apiClient.get('/admin/reports/overview');
    return res.data;
  },
  getDrawStats: async () => {
    const res = await apiClient.get('/admin/reports/draws');
    return res.data;
  },
  getCharityStats: async () => {
    const res = await apiClient.get('/admin/reports/charities');
    return res.data;
  }
};
