import { useState } from 'react';
import { useScores } from '../../hooks/useScores';
import { ScoreGrid } from '../../components/scores/ScoreGrid';
import { ScoreHistory } from '../../components/scores/ScoreHistory';
import { AddScoreForm } from '../../components/scores/AddScoreForm';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Plus, Target } from 'lucide-react';

export function ScoresPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  
  const { data: response, isLoading, deleteScore, isDeleting } = useScores();
  const scores = response?.data || [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-white mb-2">
            Score Tracking
          </h1>
          <p className="text-muted">Log your rounds to generate numbers for the monthly draw.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-surface-2 p-1 rounded-lg flex border border-border">
            <button 
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === 'grid' ? 'bg-surface text-white shadow' : 'text-muted hover:text-white'}`}
            >
              Cards
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === 'list' ? 'bg-surface text-white shadow' : 'text-muted hover:text-white'}`}
            >
              History
            </button>
          </div>
          <Button 
            variant="primary" 
            leftIcon={<Plus size={18} />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Log Score
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass p-4 rounded-xl border border-border">
          <p className="text-xs text-muted uppercase tracking-wider font-bold mb-1">Total Rounds</p>
          <p className="text-2xl font-black text-white">{scores.length}</p>
        </div>
        <div className="glass p-4 rounded-xl border border-border">
          <p className="text-xs text-muted uppercase tracking-wider font-bold mb-1">Numbers Generated</p>
          <p className="text-2xl font-black text-accent">{scores.length * 5}</p>
        </div>
        <div className="glass p-4 rounded-xl border border-border">
          <p className="text-xs text-muted uppercase tracking-wider font-bold mb-1">Best Score</p>
          <p className="text-2xl font-black text-white">
            {scores.length ? Math.min(...scores.map(s => s.value)) : '-'}
          </p>
        </div>
        <div className="glass p-4 rounded-xl border border-border hover:border-accent/50 transition-colors cursor-pointer group">
          <div className="flex items-center justify-between h-full">
            <div>
              <p className="text-xs text-muted uppercase tracking-wider font-bold mb-1 group-hover:text-accent transition-colors">How it works</p>
              <p className="text-sm font-medium text-white">Performance Bracket logic</p>
            </div>
            <Target className="text-muted group-hover:text-accent transition-colors" size={24} />
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <ScoreGrid 
          scores={scores} 
          isLoading={isLoading} 
          onDelete={(id) => deleteScore(id)}
          isDeleting={isDeleting}
        />
      ) : (
        <ScoreHistory scores={scores} />
      )}

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Log a New Score"
      >
        <div className="p-1">
          <p className="text-sm text-muted mb-6">
            Enter your 18-hole gross score. Higher performance places you in better brackets, awarding multiplier odds for the algorithm draw.
          </p>
          <AddScoreForm onSuccess={() => setIsAddModalOpen(false)} />
        </div>
      </Modal>
    </div>
  );
}
