import { Button } from '../ui/Button';
import { ExternalLink } from 'lucide-react';

export function StripePortalButton({ onClick, isLoading }) {
  return (
    <Button 
      variant="outline" 
      onClick={onClick} 
      isLoading={isLoading}
      rightIcon={<ExternalLink size={16} />}
      className="w-full sm:w-auto"
    >
      Manage in Stripe Portal
    </Button>
  );
}
