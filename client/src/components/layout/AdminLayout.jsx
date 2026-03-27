import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { useAuthStore } from '../../store/auth.store';
import { Spinner } from '../ui/Spinner';
import { Badge } from '../ui/Badge';

export function AdminLayout() {
  const { user, isLoading, token } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!token || !user?.is_admin) {
    return <Navigate to="/dashboard" replace />;
  }

  const getPageTitle = (pathname) => {
    if (pathname === '/admin') return 'Admin Overview';
    if (pathname.includes('/users')) return 'Manage Users';
    if (pathname.includes('/draws')) return 'Draw Configuration';
    if (pathname.includes('/charities')) return 'Charities Management';
    if (pathname.includes('/winners')) return 'Winner Verification';
    if (pathname.includes('/reports')) return 'Platform Reports';
    return 'Admin Control Panel';
  };

  const titleNode = (
    <div className="flex items-center gap-3">
      <span>{getPageTitle(location.pathname)}</span>
      <Badge variant="warning" size="sm" className="hidden sm:inline-flex bg-amber-500/10 border-amber-500/20 text-amber-500">ADMIN</Badge>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-bg">
      <Sidebar isAdminConfig={true} />
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <TopBar title={titleNode} />
        <main className="flex-1 overflow-y-auto">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
