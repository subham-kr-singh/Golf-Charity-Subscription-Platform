import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { getScoreLabel, getScoreColor } from '../../lib/scoring';
import { formatShortDate } from '../../lib/utils';
import { Target, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';

export function ScoreCard({ score, onDelete, isDeleting }) {
  const label = getScoreLabel(score.value);
  const colorClass = getScoreColor(score.value);

  return (
    <Card hover className="group relative">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted font-medium mb-1 uppercase tracking-wider">Gross Score</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-heading font-black text-white">{score.value}</span>
          </div>
          <div className="mt-4 flex items-center gap-3 text-sm text-muted">
            <div className="flex items-center gap-1">
              <Target size={14} className="text-accent" />
              <span>{formatShortDate(score.played_date)}</span>
            </div>
          </div>
        </div>
        
        <div className="text-right flex flex-col items-end">
          <Badge className={colorClass}>{label}</Badge>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity text-danger hover:text-danger hover:bg-danger/10 p-2 h-auto"
            onClick={() => onDelete(score.id)}
            disabled={isDeleting}
            title="Remove Score"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    </Card>
  );
}
