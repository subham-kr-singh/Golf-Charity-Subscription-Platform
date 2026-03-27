export function getMatchLabel(count) {
  if (count === 5) return "5-Number Match";
  if (count === 4) return "4-Number Match";
  if (count === 3) return "3-Number Match";
  return "No Match";
}

export function getMatchVariant(count) {
  if (count === 5) return "success";
  if (count === 4 || count === 3) return "warning";
  return "neutral";
}

export function getMatchPrizePercent(count) {
  if (count === 5) return 40;
  if (count === 4) return 35;
  if (count === 3) return 25;
  return 0;
}
