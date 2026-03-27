import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { formatShortDate } from '../../lib/utils';
import { Check, X } from 'lucide-react';

export function WinnerAdminTable({ winners, onVerify, isVerifying }) {
  if (!winners?.length) {
    return (
      <div className="p-8 text-center text-muted border border-border rounded-xl bg-surface">
        No pending winner claims to verify.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {winners.map(win => (
        <div key={win.id} className="border border-border rounded-xl bg-surface p-6 flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 shrink-0">
            <h4 className="text-white font-bold mb-4">Proof Snapshot</h4>
            {win.proof_image_url ? (
              <div className="aspect-square rounded-xl overflow-hidden bg-surface-2 border border-border">
                <img src={win.proof_image_url} alt="Winner Proof" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="aspect-square rounded-xl bg-surface-2 border border-border flex items-center justify-center text-muted text-sm">
                No Image Provided
              </div>
            )}
            
            {win.proof_message && (
              <div className="mt-4 p-4 bg-surface-2 rounded-lg text-sm text-white italic border border-border/50">
                "{win.proof_message}"
              </div>
            )}
          </div>
          
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-heading font-bold text-white">
                  {win.profiles?.full_name || 'Anonymous User'}
                </h3>
                <Badge variant="warning">Action Required</Badge>
              </div>
              <p className="text-sm text-muted mb-6">{win.profiles?.email}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs text-muted uppercase tracking-widest font-bold mb-1">Prize Unlocked</p>
                  <p className="text-accent-3 font-bold text-lg">{win.prize_tiers?.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted uppercase tracking-widest font-bold mb-1">Draw Event</p>
                  <p className="text-white font-bold text-lg">{formatShortDate(win.draws?.month)}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-border/50">
              <Button 
                variant="primary" 
                className="flex-1 bg-success hover:bg-success/90 border-none text-white shadow-glow-cyan"
                leftIcon={<Check size={18} />}
                onClick={() => onVerify(win.id, 'verified')}
                isLoading={isVerifying === win.id}
              >
                Approve & Mark Verified
              </Button>
              <Button 
                variant="outline" 
                className="text-danger hover:text-danger hover:bg-danger/10 hover:border-danger/30"
                leftIcon={<X size={18} />}
                onClick={() => onVerify(win.id, 'rejected')}
                disabled={isVerifying === win.id}
              >
                Reject Claim
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
