import { CharityCard } from './CharityCard';
import { Skeleton } from '../ui/Skeleton';
import { motion } from 'framer-motion';

export function CharityGrid({ charities, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <Skeleton key={i} className="h-96 rounded-card" />
        ))}
      </div>
    );
  }

  if (!charities?.length) {
    return (
      <div className="text-center py-20 bg-surface-2/50 rounded-xl border border-border">
        <p className="text-muted text-lg">No charities found matching your criteria.</p>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {charities.map(charity => (
        <motion.div key={charity.id} variants={item}>
          <CharityCard charity={charity} />
        </motion.div>
      ))}
    </motion.div>
  );
}
