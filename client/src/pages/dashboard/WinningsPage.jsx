import { useWinnings } from '../../hooks/useDraw';
import { WinnerCard } from '../../components/winner/WinnerCard';
import { ProofUploadForm } from '../../components/winner/ProofUploadForm';
import { Spinner } from '../../components/ui/Spinner';
import { Gift } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

export function WinningsPage() {
  const { claimId } = useParams();
  const navigate = useNavigate();
  const { data: res, isLoading, submitProof, isSubmitting } = useWinnings();
  const winnings = res?.data || [];

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (claimId) {
    const win = winnings.find(w => w.id === claimId);
    
    if (!win) {
      return (
        <div className="text-center py-20">
          <h2 className="text-xl text-white font-bold mb-4">Winning record not found</h2>
          <button onClick={() => navigate('/dashboard/winnings')} className="text-accent hover:underline">
            Back to Winnings
          </button>
        </div>
      );
    }

    const handleClaim = async (formData) => {
      await submitProof({ claimId, formData });
      navigate('/dashboard/winnings');
    };

    return (
      <div className="space-y-8">
        <div>
          <button onClick={() => navigate('/dashboard/winnings')} className="text-muted hover:text-white text-sm mb-6 flex items-center gap-2">
            &larr; Back to Winnings
          </button>
          <h1 className="text-3xl font-heading font-extrabold text-white mb-2">
            Claim Your {win.prize_tier.name}
          </h1>
          <p className="text-muted">Upload proof to verify your identity and claim your prize.</p>
        </div>
        
        <ProofUploadForm winId={claimId} onSubmit={handleClaim} isSubmitting={isSubmitting} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-extrabold text-white mb-2">
          Your Winnings
        </h1>
        <p className="text-muted">Track your prizes and submit proof to claim them.</p>
      </div>

      {!winnings.length ? (
        <div className="glass rounded-3xl p-12 text-center border border-border border-dashed">
          <Gift size={64} className="mx-auto text-muted mb-6 opacity-30" />
          <h2 className="text-2xl font-heading font-bold text-white mb-2">No Winnings Yet</h2>
          <p className="text-muted max-w-md mx-auto">
            Keep logging your scores to increase your odds for the next monthly algorithmic draw.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {winnings.map(win => (
            <WinnerCard key={win.id} win={win} />
          ))}
        </div>
      )}
    </div>
  );
}
