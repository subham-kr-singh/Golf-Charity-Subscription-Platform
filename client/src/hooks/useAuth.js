import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi, register as registerApi, logout as logoutApi } from '../api/auth.api';
import { getMe } from '../api/user.api';
import { useAuthStore } from '../store/auth.store';

export function useAuth() {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['user', 'me'],
    queryFn: getMe,
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
    }
  });

  const registerMutation = useMutation({
    mutationFn: registerApi,
  });

  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.clear();
    }
  });

  return {
    user: data?.data,
    isLoading,
    isError,
    error,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending
  };
}
