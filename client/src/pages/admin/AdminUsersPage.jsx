import { useAdmin } from '../../hooks/useAdmin';
import { UserTable } from '../../components/admin/UserTable';
import { Spinner } from '../../components/ui/Spinner';
import { Button } from '../../components/ui/Button';
import { Download } from 'lucide-react';

export function AdminUsersPage() {
  const { data: usersRes, isLoading, updateData, isUpdating } = useAdmin('users');
  const users = usersRes?.data || [];

  const handleUpdateStatus = async (id, payload) => {
    await updateData({ id, endpoint: 'users', payload });
  };

  const exportCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Role', 'Status', 'Joined'];
    const rows = users.map(u => [
      u.id, 
      u.full_name, 
      u.email, 
      u.role, 
      u.is_active ? 'Active' : 'Suspended',
      u.created_at
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "golfgives_users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            User Management
          </h1>
          <p className="text-muted">View, search, and manage platform members and administrators.</p>
        </div>
        <Button 
          variant="outline" 
          leftIcon={<Download size={18} />}
          onClick={exportCSV}
        >
          Export CSV
        </Button>
      </div>

      <UserTable users={users} onUpdateStatus={handleUpdateStatus} isUpdating={isUpdating} />
    </div>
  );
}
