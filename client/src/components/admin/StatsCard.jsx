import { Card } from '../ui/Card';

export function StatsCard({ title, value, icon: Icon, trend, className = '' }) {
  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted mb-1">{title}</p>
          <h3 className="text-2xl font-heading font-bold text-white mb-2">{value}</h3>
          
          {trend && (
            <div className={`flex items-center text-xs font-medium ${trend.isPositive ? 'text-success' : 'text-danger'}`}>
              <span className="mr-1">{trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%</span>
              <span className="text-muted font-normal ml-1">vs last month</span>
            </div>
          )}
        </div>
        
        {Icon && (
          <div className="w-12 h-12 rounded-xl bg-surface-2 border border-border flex items-center justify-center text-muted shrink-0">
            <Icon size={24} />
          </div>
        )}
      </div>
    </Card>
  );
}
