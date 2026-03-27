import { ScoreCard } from './ScoreCard';
import { Skeleton } from '../ui/Skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { Target } from 'lucide-react';

export function ScoreGrid({ scores, isLoading, onDelete, isDeleting }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <Skeleton key={i} className="h-32 rounded-card" />
        ))}
      </div>
    );
  }

  if (!scores?.length) {
    return (
      <div className="text-center py-16 bg-surface-2/50 rounded-2xl border border-border border-dashed">
        <Target size={48} className="mx-auto text-muted mb-4 opacity-50" />
        <h3 className="text-lg font-heading font-bold text-white mb-2">No Scores Logged</h3>
        <p className="text-muted">Start tracking your rounds to improve your draw odds.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {scores.map((score) => (
          <motion.div
            key={score.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            layout
          >
            <ScoreCard 
              score={score} 
              onDelete={onDelete} 
              isDeleting={isDeleting === score.id} 
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
