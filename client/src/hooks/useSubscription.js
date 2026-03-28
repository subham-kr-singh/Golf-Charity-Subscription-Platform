import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getStatus, createCheckoutSession, cancelSubscription, getBillingPortalUrl } from '../api/subscription.api';

export function useSubscription() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['subscription', 'status'],
    queryFn: getStatus,
  });

  const checkoutMutation = useMutation({
    mutationFn: createCheckoutSession,
    onSuccess: (res) => {
      if (res?.data?.checkout_url) {
        window.location.href = res.data.checkout_url;
      }
    }
  });

  const cancelMutation = useMutation({
    mutationFn: cancelSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscription', 'status'] });
    }
  });

  const portalMutation = useMutation({
    mutationFn: getBillingPortalUrl,
    onSuccess: (res) => {
      if (res?.data?.portal_url) {
        window.location.href = res.data.portal_url;
      }
    }
  });

  return {
    data: query.data?.data,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    checkout: checkoutMutation.mutateAsync,
    isCheckingOut: checkoutMutation.isPending,
    cancel: cancelMutation.mutateAsync,
    isCancelling: cancelMutation.isPending,
    goToPortal: portalMutation.mutateAsync,
    isGoingToPortal: portalMutation.isPending
  };
}
