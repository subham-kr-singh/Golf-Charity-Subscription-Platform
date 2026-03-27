import { formatShortDate } from '../../lib/utils';
import { getScoreLabel, getScoreColor } from '../../lib/scoring';
import { Badge } from '../ui/Badge';
import { motion } from 'framer-motion';

export function ScoreHistory({ scores }) {
  if (!scores?.length) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-card mt-8">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-border bg-surface-2 text-muted text-xs uppercase tracking-wider font-bold">
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-center">Gross Score</th>
              <th className="px-6 py-4">Performance Bracket</th>
              <th className="px-6 py-4 text-right">Numbers Awarded</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, i) => (
              <motion.tr 
                key={score.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-border/50 last:border-0 hover:bg-surface-2/50 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-medium text-white">
                  {formatShortDate(score.played_date)}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 text-accent font-black text-lg font-heading">
                    {score.value}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Badge className={getScoreColor(score.value)}>
                    {getScoreLabel(score.value)}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-white font-bold">+5</span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
