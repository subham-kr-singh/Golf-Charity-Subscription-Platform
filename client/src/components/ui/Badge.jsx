import { cn } from '../../lib/utils';

export function Badge({ variant = 'neutral', size = 'md', className, children }) {
  const variants = {
    success: 'bg-emerald-500/10 text-success border border-success/20',
    warning: 'bg-amber-500/10 text-accent-3 border border-accent-3/20',
    danger: 'bg-red-500/10 text-danger border border-danger/20',
    info: 'bg-cyan-500/10 text-accent border border-accent/20',
    neutral: 'bg-surface-2 text-muted border border-border',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5'
  };

  return (
    <span className={cn(
      "inline-flex items-center justify-center rounded-badge font-body font-medium whitespace-nowrap",
      variants[variant],
      sizes[size],
      className
    )}>
      {children}
    </span>
  );
}
