import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getLatestDraw, getDrawHistory } from '../api/draw.api';
import { getMyWins, uploadProof } from '../api/winner.api';

export function useLatestDraw() {
  return useQuery({
    queryKey: ['draws', 'latest'],
    queryFn: getLatestDraw,
  });
}

export function useDrawHistory(page = 1, limit = 10) {
  return useQuery({
    queryKey: ['draws', 'history', page, limit],
    queryFn: () => getDrawHistory(page, limit),
  });
}

export function useDraws() {
  const latestQuery = useQuery({
    queryKey: ['draws', 'latest'],
    queryFn: getLatestDraw,
  });

  const historyQuery = useQuery({
    queryKey: ['draws', 'history'],
    queryFn: () => getDrawHistory(1, 10),
  });

  // Extract from standard success/data nested structures
  const currentDraw = latestQuery.data?.data;
  const historyData = historyQuery.data?.data;
  const pastDraws = Array.isArray(historyData) ? historyData : (historyData?.data || []);

  return {
    currentDraw,
    pastDraws,
    isLoading: latestQuery.isLoading || historyQuery.isLoading,
  };
}

export function useWinnings() {
  const queryClient = useQueryClient();
  
  const query = useQuery({
    queryKey: ['winnings', 'my'],
    queryFn: getMyWins
  });

  const mutation = useMutation({
    mutationFn: ({ claimId, formData }) => {
      // Expect formData to be passed from ProofUploadForm
      // In WinningsPage: submitProof({ claimId, formData });
      // The API takes (winnerId, file), so we assume formData is a FormData object or just the file.
      // E.g. we expect proof to be uploaded.
      const proofFile = formData.get ? formData.get('proof') : formData;
      return uploadProof(claimId, proofFile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['winnings', 'my'] });
    }
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    submitProof: mutation.mutateAsync,
    isSubmitting: mutation.isPending
  };
}
