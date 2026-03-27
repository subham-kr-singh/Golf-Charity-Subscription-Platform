import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useReducedMotion } from 'framer-motion';

export function Card({
  glow = 'none',
  hover = false,
  className,
  children,
  onClick,
  ...props
}) {
  const prefersReducedMotion = useReducedMotion();

  const glowStyles = {
    cyan: "hover:shadow-glow-cyan border-accent/20",
    violet: "hover:shadow-glow-violet border-accent-2/20",
    gold: "shadow-glow-gold border-accent-3/20", 
    none: "border-border" 
  };

  const isInteractive = hover || !!onClick;
  const baseClasses = cn(
    "glass rounded-card p-6 shadow-card transition-shadow relative overflow-hidden",
    glowStyles[glow],
    className
  );

  if (prefersReducedMotion || !isInteractive) {
    return (
      <div 
        className={baseClasses} 
        onClick={onClick} 
        style={{ cursor: isInteractive ? 'pointer' : 'default' }}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={baseClasses}
      onClick={onClick}
      whileHover={{ y: -4 }}
      style={{ cursor: isInteractive ? 'pointer' : 'default' }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
