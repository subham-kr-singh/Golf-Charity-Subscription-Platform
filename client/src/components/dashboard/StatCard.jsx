import { Card } from '../ui/Card';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export function StatCard({ title, value, icon: Icon, trend, description, glow = 'cyan', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
    >
      <Card glow={glow} className="h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-accent-2/10 flex items-center justify-center">
            <Icon size={24} className="text-accent" />
          </div>
          {trend && (
            <div className={cn(
              "px-2 py-1 rounded text-xs font-bold",
              trend.isPositive ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
            )}>
              {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
            </div>
          )}
        </div>
        <div>
          <h3 className="text-muted text-sm uppercase tracking-wider font-bold mb-1">{title}</h3>
          <div className="text-3xl font-heading font-black text-white">{value}</div>
          {description && (
            <p className="text-xs text-muted mt-2">{description}</p>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
