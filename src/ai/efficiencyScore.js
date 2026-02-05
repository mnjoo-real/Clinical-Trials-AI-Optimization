export function calculateEfficiency(successProb, cost, durationMonths) {
  return (successProb * 100) / (cost / 1_000_000 + durationMonths);
}
