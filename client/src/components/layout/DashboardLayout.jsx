import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { useAuthStore } from '../../store/auth.store';
import { Spinner } from '../ui/Spinner';

export function DashboardLayout() {
  const { user, isLoading, token } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const getPageTitle = (pathname) => {
    if (pathname === '/dashboard') return 'Dashboard Home';
    if (pathname.includes('/scores')) return 'My Scores';
    if (pathname.includes('/draw')) return 'Monthly Draw';
    if (pathname.includes('/charity')) return 'My Charity';
    if (pathname.includes('/subscription')) return 'Subscription';
    if (pathname.includes('/winnings')) return 'My Winnings';
    if (pathname.includes('/profile')) return 'Profile Settings';
    return 'Dashboard';
  };

  return (
    <div className="flex h-screen overflow-hidden bg-bg">
      <Sidebar isAdminConfig={false} />
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <TopBar title={getPageTitle(location.pathname)} />
        <main className="flex-1 overflow-y-auto">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
