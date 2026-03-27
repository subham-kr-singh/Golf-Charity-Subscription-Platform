import { useAdmin } from '../../hooks/useAdmin';
import { CharityAdminTable } from '../../components/admin/CharityAdminTable';
import { Spinner } from '../../components/ui/Spinner';
import { Button } from '../../components/ui/Button';
import { Plus } from 'lucide-react';

export function AdminCharitiesPage() {
  const { data: charitiesRes, isLoading, updateData, isUpdating } = useAdmin('charities');
  const charities = charitiesRes?.data || [];

  const handleToggleFeatured = async (id, isFeatured) => {
    await updateData({ id, endpoint: 'charities', payload: { featured: isFeatured } });
  };

  const handleEdit = (charity) => {
    console.log("Edit charity", charity);
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-white mb-2">
            Charity Directory
          </h1>
          <p className="text-muted">Manage available causes and track total donations allocated.</p>
        </div>
        <Button 
          variant="primary" 
          leftIcon={<Plus size={18} />}
        >
          Add Charity
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface-2 p-6 rounded-xl border border-border">
          <p className="text-xs text-muted font-bold uppercase tracking-wider mb-2">Total Platform Donations</p>
          <p className="text-3xl font-black text-danger text-glow-danger">£12,500</p>
        </div>
        <div className="bg-surface-2 p-6 rounded-xl border border-border">
          <p className="text-xs text-muted font-bold uppercase tracking-wider mb-2">Active Supported Causes</p>
          <p className="text-3xl font-black text-white">{charities.length}</p>
        </div>
        <div className="bg-surface-2 p-6 rounded-xl border border-border">
          <p className="text-xs text-muted font-bold uppercase tracking-wider mb-2">Pending Distributions</p>
          <p className="text-3xl font-black text-warning">£3,450</p>
          <p className="text-xs text-muted mt-2">To be wired end of month</p>
        </div>
      </div>

      <CharityAdminTable 
        charities={charities} 
        onToggleFeatured={handleToggleFeatured}
        onEdit={handleEdit}
      />
    </div>
  );
}
