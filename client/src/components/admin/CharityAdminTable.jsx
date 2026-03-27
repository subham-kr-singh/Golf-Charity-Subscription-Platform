import { useState } from 'react';
import { Button } from '../ui/Button';
import { Edit, CheckCircle2, XCircle } from 'lucide-react';

export function CharityAdminTable({ charities, onToggleFeatured, onEdit }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCharities = charities?.filter(c => 
    c.name?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search charities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-sm px-4 py-2 bg-surface-2 border border-border rounded-lg text-white text-sm focus:outline-none focus:border-accent"
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-border bg-surface-2 text-muted text-xs uppercase tracking-wider font-bold">
              <th className="px-6 py-4">Organization Name</th>
              <th className="px-6 py-4">Total Raised</th>
              <th className="px-6 py-4">Featured</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCharities.map((charity) => (
              <tr key={charity.id} className="border-b border-border/50 hover:bg-surface-2/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white">{charity.name}</span>
                    <span className="text-xs text-muted max-w-[200px] truncate">{charity.description}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-white">£{charity.total_raised || 0}</span>
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => onToggleFeatured(charity.id, !charity.featured)}
                    className="hover:opacity-80 transition-opacity"
                  >
                    {charity.featured ? (
                      <CheckCircle2 size={20} className="text-success" />
                    ) : (
                      <XCircle size={20} className="text-muted" />
                    )}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onEdit(charity)}
                    leftIcon={<Edit size={16} />}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
            
            {filteredCharities.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center text-muted">
                  No charities found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
