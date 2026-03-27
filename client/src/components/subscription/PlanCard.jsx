import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Check } from 'lucide-react';

export function PlanCard({ plan, isPopular, onSubscribe, isLoading, isCurrentPlan }) {
  return (
    <Card 
      glow={isPopular ? 'cyan' : 'none'} 
      className={`relative flex flex-col ${isPopular ? 'border-accent shadow-[0_0_30px_rgba(var(--color-accent),0.15)]' : ''}`}
    >
      {isPopular && (
        <Badge variant="info" className="absolute -top-3 left-1/2 -translate-x-1/2">
          MOST POPULAR
        </Badge>
      )}
      
      <div className="text-center mb-8 pt-4">
        <h3 className="font-heading font-bold text-2xl text-white mb-2">{plan.name}</h3>
        <div className="flex items-end justify-center gap-1">
          <span className="text-4xl font-heading font-black text-white">£{plan.price}</span>
          <span className="text-muted font-medium mb-1">/{plan.interval}</span>
        </div>
        <p className="text-sm text-muted mt-4">{plan.description}</p>
      </div>

      <div className="flex-1 space-y-4 mb-8">
        {plan.features.map((feature, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-success/20 text-success flex items-center justify-center shrink-0 mt-0.5">
              <Check size={12} strokeWidth={3} />
            </div>
            <span className="text-sm text-white/90 leading-snug">{feature}</span>
          </div>
        ))}
      </div>

      <Button
        variant={isPopular ? 'primary' : 'outline'}
        className="w-full"
        onClick={() => onSubscribe(plan.id)}
        isLoading={isLoading}
        disabled={isCurrentPlan}
      >
        {isCurrentPlan ? 'Current Plan' : 'Subscribe Now'}
      </Button>
    </Card>
  );
}
