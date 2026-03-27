import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../api/admin.api';
import apiClient from '../api/axios';

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

// Generic dashboard admin hook for admin pages
export function useAdmin(endpoint) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['admin', endpoint],
    queryFn: async () => {
      // Basic endpoint parsing
      const { data } = await apiClient.get(`/admin/${endpoint}`);
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (payload) => {
      const url = payload.endpoint ? `/admin/${payload.endpoint}` : `/admin/${endpoint}`;
      const dataPayload = payload.payload !== undefined ? payload.payload : payload;
      const { data } = await apiClient.post(url, dataPayload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, endpoint: overrideEndpoint, payload }) => {
      const targetEndpoint = overrideEndpoint || endpoint;
      // Depending on structure, try put or patch
      const { data } = await apiClient.put(`/admin/${targetEndpoint}/${id}`, payload).catch(async () => {
         // fallback if it was a patch
         const res = await apiClient.patch(`/admin/${targetEndpoint}/${id}`, payload);
         return res.data;
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin'] });
    },
  });

  return {
    ...query,
    createData: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    updateData: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
  };
}
