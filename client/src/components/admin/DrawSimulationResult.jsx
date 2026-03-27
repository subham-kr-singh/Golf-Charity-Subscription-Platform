import { Card } from '../ui/Card';
import { DrawNumberBall } from '../draw/DrawNumberBall';

export function DrawSimulationResult({ result }) {
  if (!result) return null;

  return (
    <Card className="mt-8">
      <h3 className="text-lg font-heading font-bold text-white mb-6">Draw Results</h3>
      
      <div className="mb-8">
        <p className="text-xs text-muted uppercase tracking-widest font-bold mb-4">Generated Winning Numbers</p>
        <div className="flex gap-4">
          {result.winning_numbers.map((num, i) => (
            <DrawNumberBall key={i} number={num} delay={i * 0.1} />
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <div className="bg-surface-2 p-4 rounded-xl border border-border text-center">
          <p className="text-xs text-muted uppercase tracking-widest font-bold mb-1">Total Winners</p>
          <p className="text-2xl font-black text-white">{result.stats.total_winners}</p>
        </div>
        <div className="bg-surface-2 p-4 rounded-xl border border-border text-center">
          <p className="text-xs text-muted uppercase tracking-widest font-bold mb-1">Total Prizes Value</p>
          <p className="text-2xl font-black text-accent-3">£{result.stats.total_prizes_value}</p>
        </div>
        <div className="bg-surface-2 p-4 rounded-xl border border-border text-center">
          <p className="text-xs text-muted uppercase tracking-widest font-bold mb-1">Jackpots Won</p>
          <p className="text-2xl font-black text-success">{result.stats.jackpot_winners}</p>
        </div>
      </div>
    </Card>
  );
}
