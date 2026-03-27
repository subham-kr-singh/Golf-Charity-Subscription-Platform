import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { AlertCircle, CreditCard } from 'lucide-react';
import { formatShortDate } from '../../lib/utils';
import { useAuth } from '../../hooks/useAuth';

export function SubscriptionStatus({ subscription, onManage, isManaging }) {
  const { user } = useAuth();
  const isActive = subscription?.status === 'active';
  const isCanceled = subscription?.cancel_at_period_end;

  if (!subscription) {
    return (
      <Card className="border-warning/30 bg-warning/5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-warning/20 text-warning flex items-center justify-center shrink-0">
            <AlertCircle size={24} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg text-white mb-1">No Active Subscription</h3>
            <p className="text-muted text-sm mb-4">
              You need an active subscription to log scores, earn draw numbers, and win prizes.
            </p>
            <Button variant="primary" onClick={onManage} isLoading={isManaging}>
              View Plans
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card glow={isActive && !isCanceled ? 'cyan' : 'none'} className="relative overflow-hidden">
      {isActive && !isCanceled && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[50px] rounded-full pointer-events-none" />
      )}
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-5">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center 
            ${isActive ? 'bg-success/10 text-success' : 'bg-surface-2 text-muted'}`}
          >
            <CreditCard size={28} />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="font-heading font-bold text-xl text-white">GolfGives Member</h3>
              <Badge variant={isActive ? (isCanceled ? 'warning' : 'success') : 'neutral'}>
                {isCanceled ? 'Cancels Soon' : subscription.status}
              </Badge>
            </div>
            <p className="text-sm text-muted">
              {isCanceled 
                ? `Subscription ends on ${formatShortDate(subscription.current_period_end)}`
                : `Next billing date: ${formatShortDate(subscription.current_period_end)}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block mr-4">
            <p className="text-xs text-muted font-bold uppercase tracking-wider mb-1">Monthly Impact</p>
            <p className="text-white font-medium">£15.00/mo</p>
          </div>
          <Button variant="outline" onClick={onManage} isLoading={isManaging}>
            Manage Billing
          </Button>
        </div>
      </div>
    </Card>
  );
}
