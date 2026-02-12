export function calculateEfficiency(successProb, cost, durationMonths) {
  const successWeight = 120;
  const costScale = 750_000;
  const durationWeight = 1.25;

  const denominator = cost / costScale + durationMonths * durationWeight;
  return (successProb * successWeight) / denominator;
}
