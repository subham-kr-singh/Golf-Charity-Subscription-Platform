import { useDraws } from '../../hooks/useDraw';
import { DrawCountdown } from '../../components/draw/DrawCountdown';
import { DrawResultCard } from '../../components/draw/DrawResultCard';
import { DrawHistoryTable } from '../../components/draw/DrawHistoryTable';
import { Spinner } from '../../components/ui/Spinner';

export function DrawPage() {
  const { currentDraw, pastDraws, isLoading } = useDraws();

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  const today = new Date();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-heading font-extrabold text-white mb-2">
          Algorithm Draw
        </h1>
        <p className="text-muted">View your generated numbers and match them against the monthly draw.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {currentDraw ? (
            <div className="space-y-4">
              <h2 className="text-xl font-heading font-bold text-white">Current Month</h2>
              <DrawResultCard result={currentDraw} isCurrent={true} />
            </div>
          ) : (
            <div className="glass rounded-2xl p-8 border border-border text-center">
              <h3 className="text-lg font-heading font-bold text-white mb-2">No Draw Data Needed</h3>
              <p className="text-muted">
                Log a score this month to generate numbers for the upcoming draw.
              </p>
            </div>
          )}
        </div>
        
        <div>
          <DrawCountdown nextDrawDate={nextMonth.toISOString()} />
          <div className="mt-6 glass p-6 rounded-2xl border border-border">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-4">How to Win</h3>
            <ul className="space-y-4 text-sm text-muted">
              <li className="flex justify-between border-b border-border/50 pb-2">
                <span>Match 5 Numbers</span>
                <span className="text-amber-400 font-bold">Jackpot (40%)</span>
              </li>
              <li className="flex justify-between border-b border-border/50 pb-2">
                <span>Match 4 Numbers</span>
                <span className="text-accent-2 font-bold">Major (35%)</span>
              </li>
              <li className="flex justify-between border-b border-border/50 pb-2">
                <span>Match 3 Numbers</span>
                <span className="text-accent font-bold">Minor (25%)</span>
              </li>
              <li className="text-xs pt-2">
                Prize pool scale dynamically based on total active subscriptions.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {pastDraws?.length > 0 && (
        <div>
          <h2 className="text-xl font-heading font-bold text-white mb-6">Draw History</h2>
          <DrawHistoryTable draws={pastDraws} />
        </div>
      )}
    </div>
  );
}
