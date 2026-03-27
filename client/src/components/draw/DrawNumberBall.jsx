import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export function DrawNumberBall({ number, isMatched, delay = 0, size = 'md' }) {
  const sizeClasses = {
    sm: 'w-10 h-10 text-lg',
    md: 'w-14 h-14 text-2xl',
    lg: 'w-20 h-20 md:w-24 md:h-24 text-4xl md:text-5xl'
  };

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay 
      }}
      className={cn(
        "rounded-full flex items-center justify-center font-heading font-black shadow-xl relative",
        sizeClasses[size],
        isMatched 
          ? "bg-gradient-to-br from-success to-emerald-600 text-white shadow-glow-cyan border-2 border-success/50" 
          : "bg-surface-2 text-white border border-border"
      )}
    >
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-full pointer-events-none" />
      <span className="relative z-10">{number}</span>
      {isMatched && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/50"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}
