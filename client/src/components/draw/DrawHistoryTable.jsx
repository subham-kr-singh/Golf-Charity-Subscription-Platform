import { formatShortDate } from '../../lib/utils';
import { motion } from 'framer-motion';

export function DrawHistoryTable({ draws }) {
  if (!draws?.length) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-card mt-8">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-border bg-surface-2 text-muted text-xs uppercase tracking-wider font-bold">
              <th className="px-6 py-4">Draw Month</th>
              <th className="px-6 py-4">Winning Numbers</th>
              <th className="px-6 py-4">Your Matches</th>
              <th className="px-6 py-4 text-right">Prize Won</th>
            </tr>
          </thead>
          <tbody>
            {draws.map((result, i) => {
              const drawNumbers = typeof result.draw.winning_numbers === 'string'
                ? JSON.parse(result.draw.winning_numbers)
                : result.draw.winning_numbers;

              return (
                <motion.tr 
                  key={result.draw.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-border/50 last:border-0 hover:bg-surface-2/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-white">
                    {formatShortDate(result.draw.month)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1.5">
                      {drawNumbers ? drawNumbers.map((num, j) => (
                        <div key={j} className="w-8 h-8 rounded-full bg-surface-2 border border-border flex items-center justify-center text-xs font-bold text-white">
                          {num}
                        </div>
                      )) : <span className="text-muted italic">Pending</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-bold ${result.matches >= 3 ? 'text-success' : 'text-muted'}`}>
                      {result.matches}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`font-medium ${result.prize_tier ? 'text-accent-3' : 'text-muted'}`}>
                      {result.prize_tier ? result.prize_tier.name : '-'}
                    </span>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
