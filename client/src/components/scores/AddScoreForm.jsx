import { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { AlertCircle } from 'lucide-react';
import { useScores } from '../../hooks/useScores';

export function AddScoreForm({ onSuccess }) {
  const [value, setValue] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');
  
  const { addScore, isAdding } = useScores();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const numericScore = parseInt(value, 10);
    if (isNaN(numericScore) || numericScore < 50 || numericScore > 150) {
      setError('Please enter a valid 18-hole gross score (50-150)');
      return;
    }

    try {
      await addScore({ value: numericScore, played_date: date });
      setValue('');
      onSuccess?.();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add score');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 rounded-lg bg-danger/10 border border-danger/20 flex items-start gap-3">
          <AlertCircle className="text-danger shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-danger">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input 
          label="Gross Score (18 holes)"
          type="number"
          min="50"
          max="150"
          placeholder="e.g. 85"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
        
        <Input 
          label="Date Played"
          type="date"
          value={date}
          max={new Date().toISOString().split('T')[0]}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <Button 
        type="submit" 
        variant="primary" 
        className="w-full"
        isLoading={isAdding}
      >
        Submit Score & Generate Numbers
      </Button>
    </form>
  );
}
