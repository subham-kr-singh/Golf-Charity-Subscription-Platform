export function getScoreLabel(value) {
  if (value <= 15) return "Beginner";
  if (value <= 25) return "Regular";
  if (value <= 35) return "Good";
  return "Excellent";
}

export function getScoreColor(value) {
  if (value <= 15) return "bg-surface-2 text-muted border-none";
  if (value <= 25) return "bg-cyan-900/40 text-accent border border-accent/20";
  if (value <= 35) return "bg-blue-900/40 text-blue-400 border border-blue-400/20";
  return "bg-amber-900/40 text-accent-3 border border-accent-3/20 shadow-glow-gold";
}
