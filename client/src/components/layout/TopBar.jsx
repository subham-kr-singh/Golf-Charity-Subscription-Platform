import { Menu, Bell } from 'lucide-react';
import { useAuthStore } from '../../store/auth.store';
import { useUIStore } from '../../store/ui.store';
import { Avatar } from '../ui/Avatar';

export function TopBar({ title }) {
  const { user } = useAuthStore();
  const { toggleSidebar } = useUIStore();

  return (
    <header className="h-16 border-b border-border bg-surface/50 backdrop-blur-xl sticky top-0 z-30 shrink-0">
      <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar}
            className="lg:hidden p-2 -ml-2 text-muted hover:text-white rounded-lg hover:bg-surface-2 transition-colors"
          >
            <Menu size={20} />
          </button>
          <div className="font-heading font-bold text-lg text-text hidden sm:flex items-center">
            {title}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-muted hover:text-white transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-accent rounded-full border border-bg"></span>
          </button>
          <div className="h-6 w-px bg-border mx-2"></div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-medium leading-none">{user?.full_name}</span>
              <span className="text-xs text-muted mt-1">{user?.email}</span>
            </div>
            <Avatar fallback={user?.full_name} size="sm" className="ring-2 ring-border" />
          </div>
        </div>
      </div>
    </header>
  );
}
