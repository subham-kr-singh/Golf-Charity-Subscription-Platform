import { StatsCard } from '../../components/admin/StatsCard';
import { UserTable } from '../../components/admin/UserTable';
import { ReportCharts } from '../../components/admin/ReportCharts';
import { useAdmin } from '../../hooks/useAdmin';
import { Users, CreditCard, Gift, HandHeart } from 'lucide-react';
import { Spinner } from '../../components/ui/Spinner';
import { Link } from 'react-router-dom';

export function AdminDashboard() {
  const { 
    data: statsRes, 
    isLoading: isStatsLoading 
  } = useAdmin('platform/stats');
  
  const { 
    data: usersRes, 
    isLoading: isUsersLoading 
  } = useAdmin('users?limit=5');

  if (isStatsLoading || isUsersLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  const stats = statsRes?.data || {
    total_users: 1420,
    active_subscriptions: 854,
    total_donated: 12500,
    active_charities: 12
  };
  
  const recentUsers = usersRes?.data || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-extrabold text-white mb-2">
          Platform Overview
        </h1>
        <p className="text-muted">High-level metrics and recent activity across the GolfGives platform.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Users" 
          value={stats.total_users.toLocaleString()} 
          icon={Users} 
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard 
          title="Active Subscriptions" 
          value={stats.active_subscriptions.toLocaleString()} 
          icon={CreditCard} 
          trend={{ value: 8, isPositive: true }}
          className="border-accent/30 shadow-[0_0_15px_rgba(var(--color-accent),0.1)]"
        />
        <StatsCard 
          title="Total Donated" 
          value={`£${stats.total_donated.toLocaleString()}`} 
          icon={HandHeart} 
          trend={{ value: 15, isPositive: true }}
          className="border-danger/30"
        />
        <StatsCard 
          title="Active Charities" 
          value={stats.active_charities} 
          icon={Gift} 
        />
      </div>

      <ReportCharts />

      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-heading font-bold text-white">Recent Registrations</h2>
          <Link to="/admin/users" className="text-sm font-bold text-accent hover:text-white transition-colors">
            View All Users &rarr;
          </Link>
        </div>
        
        <UserTable users={recentUsers} onUpdateStatus={() => {}} />
      </div>
    </div>
  );
}
