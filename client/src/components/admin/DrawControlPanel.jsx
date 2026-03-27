import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Play, RotateCw, CheckCircle } from 'lucide-react';

export function DrawControlPanel({ onExecute, isExecuting }) {
  const [targetMonth, setTargetMonth] = useState('');
  const [profitPool, setProfitPool] = useState('10000');
  
  if (!targetMonth) {
    const d = new Date();
    d.setMonth(d.getMonth() + 1);
    d.setDate(1);
    setTargetMonth(d.toISOString().split('T')[0]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.confirm('WARNING: Executing the draw is a permanent action that generates winning numbers and assigns prizes. Are you sure you want to proceed?')) {
      onExecute({ month: targetMonth, totalProfitPool: Number(profitPool) });
    }
  };

  return (
    <Card className="border-accent/30 bg-accent/5">
      <div className="mb-6">
        <h3 className="text-xl font-heading font-bold text-white mb-2 flex items-center gap-2">
          <Play size={20} className="text-accent" />
          Execute Live Draw
        </h3>
        <p className="text-sm text-muted">
          Generate truly random algorithmic numbers and distribute prizes to matching users based on active subscriptions and logged scores.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="Draw target Date (Month)"
            type="date"
            value={targetMonth}
            onChange={(e) => setTargetMonth(e.target.value)}
            required
          />
          <Input
            label="Total Profit Pool (£)"
            type="number"
            value={profitPool}
            onChange={(e) => setProfitPool(e.target.value)}
            required
            min="0"
          />
        </div>

        <div className="bg-surface p-4 rounded-xl border border-border/50 text-sm mb-4">
          <h4 className="font-bold text-white mb-2">Algorithm Execution Steps:</h4>
          <ul className="space-y-1 text-muted">
            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-success" /> Tally all active ticket numbers for the period</li>
            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-success" /> Generate cryptographically secure random values</li>
            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-success" /> Scale prize pool according to platform total net profit</li>
            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-success" /> Calculate and record winners for the dashboard</li>
          </ul>
        </div>

        <Button 
          type="submit" 
          variant="primary" 
          className="w-full bg-danger hover:bg-danger/80 border-none text-white shadow-glow-gold"
          isLoading={isExecuting}
          leftIcon={<RotateCw size={18} />}
        >
          EXECUTE CRYPTOGRAPHIC DRAW
        </Button>
      </form>
    </Card>
  );
}
