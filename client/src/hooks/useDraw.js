import { useQuery } from '@tanstack/react-query';
import { getLatestDraw, getDrawHistory } from '../api/draw.api';

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
