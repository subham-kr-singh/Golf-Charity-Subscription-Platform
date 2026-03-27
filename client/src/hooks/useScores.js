import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getScores, addScore, deleteScore } from '../api/score.api';

export function useScores() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['scores'],
    queryFn: getScores,
  });

  const addScoreMutation = useMutation({
    mutationFn: addScore,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scores'] });
    }
  });

  const deleteScoreMutation = useMutation({
    mutationFn: deleteScore,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scores'] });
    }
  });

  return {
    data: query.data?.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    addScore: addScoreMutation.mutateAsync,
    deleteScore: deleteScoreMutation.mutateAsync,
    isAdding: addScoreMutation.isPending,
    isDeleting: deleteScoreMutation.isPending
  };
}
