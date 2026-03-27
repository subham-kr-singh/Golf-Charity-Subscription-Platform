import { Card } from '../ui/Card';
import { DrawNumberBall } from './DrawNumberBall';
import { MatchBadge } from './MatchBadge';
import { formatShortDate } from '../../lib/utils';
import { motion } from 'framer-motion';

export function DrawResultCard({ result, isCurrent = false }) {
  const { draw, matches, prize_tier } = result;
  const userNumbers = typeof result.ticket_numbers === 'string' 
    ? JSON.parse(result.ticket_numbers) 
    : result.ticket_numbers;
  
  const drawNumbers = typeof draw.winning_numbers === 'string'
    ? JSON.parse(draw.winning_numbers)
    : draw.winning_numbers;

  return (
    <Card 
      glow={matches >= 3 ? (matches === 5 ? 'gold' : 'cyan') : 'none'} 
      className={`relative overflow-hidden ${isCurrent ? 'border-accent/50 p-8' : ''}`}
    >
      {isCurrent && (
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[80px] rounded-full pointer-events-none" />
      )}
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 border-b border-border/50 pb-6">
        <div>
          <h3 className="text-xl font-heading font-bold text-white mb-2">
            {formatShortDate(draw.month)} Draw
          </h3>
          <p className="text-sm text-muted">Status: <span className="text-white capitalize">{draw.status}</span></p>
        </div>
        <div className="mt-4 md:mt-0 text-right">
          <p className="text-xs text-muted uppercase tracking-wider font-bold mb-2">Your Result</p>
          <MatchBadge matches={matches} />
          {prize_tier && (
            <p className="text-sm text-accent-3 font-bold mt-2 truncate w-48 text-right">
              Won: {prize_tier.name}
            </p>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 relative z-10">
        <div>
          <p className="text-xs text-muted font-bold uppercase tracking-wider mb-4">Winning Numbers</p>
          <div className="flex gap-2 sm:gap-4">
            {drawNumbers ? drawNumbers.map((num, i) => (
              <DrawNumberBall 
                key={`win-${i}`} 
                number={num} 
                isMatched={userNumbers?.includes(num)}
                delay={i * 0.1}
              />
            )) : (
              <p className="text-sm text-muted italic">Pending draw...</p>
            )}
          </div>
        </div>

        <div>
          <p className="text-xs text-muted font-bold uppercase tracking-wider mb-4">Your Ticket</p>
          <div className="flex flex-wrap gap-2">
            {userNumbers ? userNumbers.map((num, i) => (
              <motion.div 
                key={`user-${i}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + (i * 0.05) }}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border 
                  ${drawNumbers?.includes(num) 
                    ? 'bg-success/20 text-success border-success/30 shadow-glow-cyan' 
                    : 'bg-surface-2 text-muted border-border'
                  }`}
              >
                {num}
              </motion.div>
            )) : (
              <p className="text-sm text-warning italic border border-warning/20 bg-warning/10 p-3 rounded-lg">
                No active ticket numbers established.
              </p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
