import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useReducedMotion } from 'framer-motion';

export function GlowDivider({ className }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={cn("w-full h-[1px] relative", className)}>
      <div className="absolute inset-0 bg-border" />
      
      {!prefersReducedMotion && (
        <motion.div 
          className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent"
          animate={{ 
            opacity: [0.3, 0.8, 0.3],
            boxShadow: [
              "0 0 10px rgba(0,229,255,0.1)", 
              "0 0 20px rgba(0,229,255,0.4)", 
              "0 0 10px rgba(0,229,255,0.1)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}
