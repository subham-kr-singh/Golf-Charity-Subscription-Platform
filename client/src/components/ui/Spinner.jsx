import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useReducedMotion } from 'framer-motion';

export function Spinner({ size = 'md', className }) {
  const prefersReducedMotion = useReducedMotion();
  
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-10 h-10 border-4'
  };

  if (prefersReducedMotion) {
    return (
      <div 
        className={cn(
          "rounded-full border-t-accent border-r-accent border-b-accent/20 border-l-accent/20 animate-spin",
          sizes[size],
          className
        )} 
      />
    );
  }

  return (
    <motion.div
      className={cn(
        "rounded-full border-t-accent border-r-accent border-b-accent/20 border-l-accent/20",
        sizes[size],
        className
      )}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
}
