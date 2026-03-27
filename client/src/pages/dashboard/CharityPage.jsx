import { useCharities, useUserCharity } from '../../hooks/useCharity';
import { CharitySelector } from '../../components/charity/CharitySelector';
import { CharityCard } from '../../components/charity/CharityCard';
import { Spinner } from '../../components/ui/Spinner';

export function CharityPage() {
  const { data: charitiesRes, isLoading: isListLoading } = useCharities();
  const { data: userCharityRes, isLoading: isUserLoading, updateCharity, isUpdating } = useUserCharity();

  if (isListLoading || isUserLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  const charities = charitiesRes?.data || [];
  const currentSelectionId = userCharityRes?.data?.supported_charity_id;
  const currentCharity = charities.find(c => c.id === currentSelectionId);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-heading font-extrabold text-white mb-2">
          Your Impact
        </h1>
        <p className="text-muted">Manage the charity you are currently supporting through your subscription.</p>
      </div>

      <CharitySelector 
        charities={charities} 
        currentSelectionId={currentSelectionId} 
        onSelect={(id) => updateCharity(id)}
        isUpdating={isUpdating}
      />

      {currentCharity && (
        <div className="mt-12">
          <h2 className="text-xl font-heading font-bold text-white mb-6">About Your Supported Cause</h2>
          <div className="max-w-xl">
            <CharityCard charity={currentCharity} />
          </div>
        </div>
      )}

      <div className="glass p-8 rounded-2xl border border-border mt-12">
        <h3 className="text-lg font-heading font-bold text-white mb-4">Impact Tracking</h3>
        <p className="text-muted mb-8 leading-relaxed max-w-2xl">
          GolfGives automatically routes 20% of your net subscription fee directly to your selected charity. Statements of donations are provided annually for tax purposes if applicable in your jurisdiction.
        </p>
        
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="bg-surface-2 p-4 rounded-xl border border-border/50">
            <p className="text-xs text-muted font-bold uppercase tracking-wider mb-1">Your Lifetime Donations</p>
            <p className="text-2xl font-black text-danger">£15.00</p>
          </div>
          <div className="bg-surface-2 p-4 rounded-xl border border-border/50">
            <p className="text-xs text-muted font-bold uppercase tracking-wider mb-1">Months Subscribed</p>
            <p className="text-2xl font-black text-white">1</p>
          </div>
        </div>
      </div>
    </div>
  );
}
