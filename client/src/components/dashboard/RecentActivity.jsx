import { Card } from '../ui/Card';
import { Target, Zap, Gift, User } from 'lucide-react';

export function RecentActivity({ activities, isLoading }) {
  if (isLoading) {
    return (
      <Card>
        <div className="h-6 w-32 bg-surface-2 rounded animate-pulse mb-6" />
        <div className="space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-surface-2 animate-pulse shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-full bg-surface-2 rounded animate-pulse" />
                <div className="h-3 w-1/2 bg-surface-2 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  const getIcon = (type) => {
    switch (type) {
      case 'score': return <Target size={16} className="text-accent" />;
      case 'draw': return <Zap size={16} className="text-accent-2" />;
      case 'win': return <Gift size={16} className="text-accent-3" />;
      default: return <User size={16} className="text-muted" />;
    }
  };

  return (
    <Card>
      <h3 className="font-heading font-bold text-lg text-white mb-6">Recent Activity</h3>
      
      {!activities?.length ? (
        <p className="text-muted text-sm py-4">No recent activity found.</p>
      ) : (
        <div className="space-y-6">
          {activities.map((activity, i) => (
            <div key={i} className="flex gap-4 relative">
              {i !== activities.length - 1 && (
                <div className="absolute left-5 top-10 bottom-[-24px] w-px bg-border" />
              )}
              <div className="w-10 h-10 rounded-full bg-surface-2 border border-border flex items-center justify-center shrink-0 z-10 glass">
                {getIcon(activity.type)}
              </div>
              <div>
                <p className="text-white text-sm font-medium">{activity.title}</p>
                <p className="text-muted text-xs mt-1">{activity.description}</p>
                <p className="text-muted/60 text-xs mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
