import { useState } from 'react';
import { formatShortDate } from '../../lib/utils';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ShieldAlert, Ban, CheckCircle } from 'lucide-react';

export function UserTable({ users, onUpdateStatus }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users?.filter(user => 
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-sm px-4 py-2 bg-surface-2 border border-border rounded-lg text-white text-sm focus:outline-none focus:border-accent"
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-border bg-surface-2 text-muted text-xs uppercase tracking-wider font-bold">
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Joined</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-border/50 hover:bg-surface-2/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface-2 border border-border flex items-center justify-center font-bold text-white shrink-0">
                      {user.full_name?.charAt(0) || user.email?.charAt(0) || '?'}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{user.full_name || 'No Name'}</p>
                      <p className="text-xs text-muted">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={user.is_active ? 'success' : 'danger'}>
                    {user.is_active ? 'Active' : 'Suspended'}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={user.role === 'admin' ? 'info' : 'neutral'}>
                    {user.role}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-sm text-muted">
                  {formatShortDate(user.created_at)}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    {user.is_active ? (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-danger hover:bg-danger/10"
                        onClick={() => onUpdateStatus(user.id, { is_active: false })}
                        title="Suspend User"
                      >
                        <Ban size={16} />
                      </Button>
                    ) : (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-success hover:bg-success/10"
                        onClick={() => onUpdateStatus(user.id, { is_active: true })}
                        title="Activate User"
                      >
                        <CheckCircle size={16} />
                      </Button>
                    )}
                    {user.role !== 'admin' && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-info hover:bg-info/10"
                        onClick={() => onUpdateStatus(user.id, { role: 'admin' })}
                        title="Make Admin"
                      >
                        <ShieldAlert size={16} />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-muted">
                  No users found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
