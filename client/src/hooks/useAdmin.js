import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../api/admin.api';

export function useAdminUsers(params = {}) {
  return useQuery({
    queryKey: ['admin', 'users', params],
    queryFn: () => adminApi.listUsers(params),
  });
}

export function useAdminUser(id) {
  return useQuery({
    queryKey: ['admin', 'users', id],
    queryFn: () => adminApi.getUser(id),
    enabled: !!id
  });
}

export function useAdminDraws() {
  return useQuery({
    queryKey: ['admin', 'draws'],
    queryFn: adminApi.listDraws,
  });
}

export function useAdminCharities() {
  return useQuery({
    queryKey: ['admin', 'charities'],
    queryFn: adminApi.listCharities,
  });
}

export function useAdminWinners(params = {}) {
  return useQuery({
    queryKey: ['admin', 'winners', params],
    queryFn: () => adminApi.listWinners(params),
  });
}

export function useAdminReports() {
  return {
    summary: useQuery({
      queryKey: ['admin', 'reports', 'summary'],
      queryFn: adminApi.getSummary
    }),
    drawStats: useQuery({
      queryKey: ['admin', 'reports', 'draws'],
      queryFn: adminApi.getDrawStats
    }),
    charityStats: useQuery({
      queryKey: ['admin', 'reports', 'charities'],
      queryFn: adminApi.getCharityStats
    })
  };
}
