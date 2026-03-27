import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

export function WinnersBanner({ recentWinners }) {
  if (!recentWinners?.length) return null;

  return (
    <div className="bg-gradient-to-r from-accent-3/20 via-surface to-transparent border-y border-border py-3 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="flex items-center gap-2 mr-6 shrink-0">
          <Trophy size={16} className="text-accent-3" />
          <span className="text-xs font-bold uppercase tracking-widest text-white">Recent Winners</span>
        </div>
        
        <div className="flex-1 relative overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
          <motion.div 
            className="flex whitespace-nowrap items-center gap-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          >
            {[...recentWinners, ...recentWinners].map((winner, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="text-white font-medium">{winner.profiles?.full_name || 'Anonymous'}</span>
                <span className="text-muted">won</span>
                <span className="text-accent-3 font-bold">{winner.prize_tiers?.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
