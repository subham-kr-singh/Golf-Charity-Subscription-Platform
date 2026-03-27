import { motion } from 'framer-motion';

export function PlanToggle({ isAnnual, onChange }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-12">
      <span className={`text-sm font-bold uppercase tracking-wider ${!isAnnual ? 'text-white' : 'text-muted'}`}>
        Monthly
      </span>
      <button
        onClick={() => onChange(!isAnnual)}
        className="w-16 h-8 rounded-full bg-surface-2 border border-border relative p-1 transition-colors"
      >
        <motion.div
          animate={{ x: isAnnual ? 32 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="w-6 h-6 rounded-full bg-accent shadow-glow-cyan"
        />
      </button>
      <div className="flex items-center gap-2">
        <span className={`text-sm font-bold uppercase tracking-wider ${isAnnual ? 'text-white' : 'text-muted'}`}>
          Annually
        </span>
        <span className="text-[10px] font-bold bg-success/20 text-success px-2 py-0.5 rounded-full uppercase tracking-widest">
          Save 20%
        </span>
      </div>
    </div>
  );
}
