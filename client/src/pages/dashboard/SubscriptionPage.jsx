import { useSubscription } from '../../hooks/useSubscription';
import { PlanCard } from '../../components/subscription/PlanCard';
import { SubscriptionStatus } from '../../components/subscription/SubscriptionStatus';
import { StripePortalButton } from '../../components/subscription/StripePortalButton';
import { Spinner } from '../../components/ui/Spinner';
import { ShieldCheck } from 'lucide-react';

export function SubscriptionPage() {
  const { 
    data: subscription, 
    isLoading, 
    checkout, 
    isCheckingOut, 
    goToPortal, 
    isGoingToPortal 
  } = useSubscription();

  const isActive = subscription?.status === 'active';

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  const thePlan = {
    id: 'price_123',
    name: "Club Membership",
    price: "15",
    interval: "mo",
    description: "Full access to score tracking, draws, and charity routing.",
    features: [
      "Access to algorithmic prize draws",
      "Unlimited verifiable score logging",
      "20% direct charity donation",
      "Premium performance bracket indexing",
      "Member-only discounts on partner gear"
    ]
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-heading font-extrabold text-white mb-2">
          Subscription Management
        </h1>
        <p className="text-muted">Manage your billing, view past invoices, and update payment methods.</p>
      </div>

      <SubscriptionStatus 
        subscription={subscription} 
        onManage={() => goToPortal()} 
        isManaging={isGoingToPortal} 
      />

      {!isActive ? (
        <div className="mt-12 max-w-md mx-auto">
          <PlanCard 
            plan={thePlan} 
            isPopular={true} 
            onSubscribe={() => checkout({ plan: 'monthly' })}
            isLoading={isCheckingOut}
            isCurrentPlan={false}
          />
        </div>
      ) : (
        <div className="mt-12 glass p-8 rounded-2xl border border-border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-heading font-bold text-white mb-2 flex items-center gap-2">
                <ShieldCheck className="text-success" size={20} />
                Secure Billing
              </h3>
              <p className="text-muted max-w-md text-sm">
                GolfGives uses Stripe to encrypt and securely process your payments. 
                We do not store your credit card information on our servers.
              </p>
            </div>
            
            <StripePortalButton onClick={() => goToPortal()} isLoading={isGoingToPortal} />
          </div>
        </div>
      )}
    </div>
  );
}
