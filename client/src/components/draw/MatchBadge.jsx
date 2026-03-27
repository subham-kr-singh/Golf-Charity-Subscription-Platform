import { Badge } from '../ui/Badge';

export function MatchBadge({ matches }) {
  if (matches === 0) return <Badge variant="neutral">No Matches</Badge>;
  if (matches === 1) return <Badge variant="neutral">1 Match</Badge>;
  if (matches === 2) return <Badge variant="info">2 Matches</Badge>;
  if (matches === 3) return <Badge variant="success">3 Matches - Minor</Badge>;
  if (matches === 4) return <Badge variant="warning">4 Matches - Major</Badge>;
  if (matches === 5) return <Badge className="bg-gradient-to-r from-amber-400 to-amber-600 text-white font-bold border-amber-300 shadow-glow-gold">JACKPOT</Badge>;
  
  return null;
}
