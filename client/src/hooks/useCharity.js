import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listCharities, getCharity } from '../api/charity.api';
import { getCharitySelection, setCharity } from '../api/user.api';

export function useCharities(params = {}) {
  return useQuery({
    queryKey: ['charities', 'list', params],
    queryFn: () => listCharities(params),
  });
}

export function useCharityDetail(slug) {
  return useQuery({
    queryKey: ['charities', 'detail', slug],
    queryFn: () => getCharity(slug),
    enabled: !!slug
  });
}

export function useMyCharity() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['user', 'charity'],
    queryFn: getCharitySelection,
  });

  const selectMutation = useMutation({
    mutationFn: setCharity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'charity'] });
    }
  });

  return {
    data: query.data?.data,
    isLoading: query.isLoading,
    isError: query.isError,
    setCharity: selectMutation.mutateAsync,
    isUpdating: selectMutation.isPending
  };
}

export const useUserCharity = useMyCharity;
