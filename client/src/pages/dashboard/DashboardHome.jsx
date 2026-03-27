import { useAuth } from '../../hooks/useAuth';
import { useScores } from '../../hooks/useScores';
import { useSubscription } from '../../hooks/useSubscription';
import { StatCard } from '../../components/dashboard/StatCard';
import { RecentActivity } from '../../components/dashboard/RecentActivity';
import { SubscriptionStatus } from '../../components/subscription/SubscriptionStatus';
import { Target, Zap, Gift, TrendingUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function DashboardHome() {
  const { user } = useAuth();
  const { data: scoresRes } = useScores();
  const { data: subRes, isLoading: isSubLoading } = useSubscription();
  const navigate = useNavigate();

  const scores = scoresRes?.data || [];
  const subscription = subRes?.data;
  
  const avgScore = scores.length 
    ? Math.round(scores.reduce((sum, s) => sum + s.value, 0) / scores.length) 
    : 0;

  const recentActivities = [
    { type: 'score', title: 'Logged a Score of 82', description: 'Generated 5 numbers for the upcoming draw', time: '2 days ago' },
    { type: 'user', title: 'Joined GolfGives', description: 'Selected St. Jude as supported charity', time: '1 week ago' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-extrabold text-white mb-2">
          Welcome back, {user?.full_name?.split(' ')[0]}
        </h1>
        <p className="text-muted">Here's your performance and impact overview.</p>
      </div>

      {!isSubLoading && (
        <SubscriptionStatus 
          subscription={subscription} 
          onManage={() => navigate('/dashboard/subscription')} 
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Avg Gross Score" 
          value={avgScore || '-'} 
          icon={Target} 
          trend={avgScore ? { value: 2, isPositive: true } : null}
          description="Last 5 rounds"
          delay={0.1}
        />
        <StatCard 
          title="Draw Entries" 
          value={scores.length * 5} 
          icon={Zap} 
          glow="violet"
          description="For next month's draw"
          delay={0.2}
        />
        <StatCard 
          title="Total Donated" 
          value="£45" 
          icon={Gift} 
          glow="gold"
          description="Through your subscription"
          delay={0.3}
        />
        <StatCard 
          title="Prize Value Won" 
          value="£0" 
          icon={TrendingUp} 
          glow="success"
          description="Lifetime winnings"
          delay={0.4}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-bold text-white">Recent Scores</h2>
            <Link to="/dashboard/scores" className="text-sm font-bold text-accent hover:text-white transition-colors">
              View All &rarr;
            </Link>
          </div>
          
          <div className="bg-surface-2/50 border border-border rounded-xl p-8 text-center">
            <Target size={40} className="mx-auto text-muted mb-4 opacity-50" />
            <h3 className="text-white font-bold mb-2">Ready to improve your odds?</h3>
            <p className="text-muted text-sm mb-6 max-w-sm mx-auto">
              Every score you log generates numbers for the algorithmic draw. The better you play, the better your chances.
            </p>
            <Link to="/dashboard/scores">
              <button className="px-6 py-2 bg-accent text-bg font-bold rounded-lg shadow-glow-cyan">
                Log New Score
              </button>
            </Link>
          </div>
        </div>

        <div>
          <RecentActivity activities={recentActivities} isLoading={false} />
        </div>
      </div>
    </div>
  );
}
