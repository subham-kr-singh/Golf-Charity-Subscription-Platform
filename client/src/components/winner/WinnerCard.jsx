import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Gift, Image as ImageIcon } from 'lucide-react';
import { formatShortDate } from '../../lib/utils';
import { Link } from 'react-router-dom';

export function WinnerCard({ win }) {
  const { prize_tier, draw, draw_result_id } = win;
  const isClaimed = win.status === 'claimed';

  return (
    <Card glow={isClaimed ? 'none' : 'gold'} className="relative overflow-hidden group">
      {!isClaimed && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-3/10 blur-[40px] rounded-full pointer-events-none" />
      )}
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-5">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 
            ${isClaimed ? 'bg-surface-2 text-muted' : 'bg-accent-3/20 text-accent-3 shadow-glow-gold'}`}
          >
            <Gift size={32} />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="font-heading font-bold text-xl text-white">{prize_tier.name}</h3>
              <Badge variant={isClaimed ? 'success' : 'warning'}>
                {isClaimed ? 'Claimed' : 'Action Required'}
              </Badge>
            </div>
            <p className="text-sm text-muted">
              Won in the {formatShortDate(draw.month)} Draw 
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block mr-4">
            <p className="text-xs text-muted font-bold uppercase tracking-wider mb-1">Prize Value</p>
            <p className="text-white font-medium">~£{prize_tier.value_estimate}</p>
          </div>
          
          {isClaimed ? (
            <Button variant="outline" disabled rightIcon={<ImageIcon size={16} />}>
              Proof Submitted
            </Button>
          ) : (
            <Link to={`/dashboard/winnings/claim/${win.id}`}>
              <Button variant="primary" className="bg-gradient-to-r from-amber-500 to-amber-600 text-bg hover:from-amber-400 hover:to-amber-500 border-none shadow-glow-gold">
                Claim Prize
              </Button>
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
}
