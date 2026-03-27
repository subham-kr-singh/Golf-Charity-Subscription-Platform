import apiClient from './axios';

export const getStatus = async () => {
  const res = await apiClient.get('/subscriptions/status');
  return res.data;
};

export const createCheckoutSession = async ({ plan }) => {
  const res = await apiClient.post('/subscriptions/checkout', { plan });
  return res.data; 
};

export const cancelSubscription = async () => {
  const res = await apiClient.post('/subscriptions/cancel');
  return res.data;
};

export const getBillingPortalUrl = async () => {
  const res = await apiClient.get('/subscriptions/portal');
  return res.data; 
};
