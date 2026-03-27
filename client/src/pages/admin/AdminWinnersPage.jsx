import { useAdmin } from '../../hooks/useAdmin';
import { WinnerAdminTable } from '../../components/admin/WinnerAdminTable';
import { Spinner } from '../../components/ui/Spinner';

export function AdminWinnersPage() {
  const { data: claimsRes, isLoading, updateData, isUpdating } = useAdmin('winners/claims');
  
  const pendingClaims = claimsRes?.data?.filter(c => c.status === 'pending_validation') || [];

  const handleVerify = async (id, status) => {
    await updateData({ 
      id, 
      endpoint: 'winners/claims', 
      payload: { status } 
    });
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-extrabold text-white mb-2">
          Prize Verification
        </h1>
        <p className="text-muted">Review proof submissions from platform winners and authorize prize dispatch.</p>
      </div>

      <div className="glass p-6 rounded-xl border border-border mb-8 max-w-3xl">
        <h3 className="font-bold text-white mb-2">Verification Guidelines</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted">
          <li>Ensure the identity in the image matches the account holder.</li>
          <li>For physical prizes, proof of ID may be additionally required.</li>
          <li>Reject blurry, altered, or suspicious submissions.</li>
          <li>Once approved, fulfillment pipelines are triggered automatically.</li>
        </ul>
      </div>

      <h2 className="text-xl font-heading font-bold text-white mb-4">
        Pending Claims ({pendingClaims.length})
      </h2>
      
      <WinnerAdminTable 
        winners={pendingClaims} 
        onVerify={handleVerify}
        isVerifying={isUpdating ? 'current_id' : null}
      />
    </div>
  );
}
