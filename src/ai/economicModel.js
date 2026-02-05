export function estimateCost(participants, durationMonths) {
  const dailyCost = 23737;
  const durationDays = durationMonths * 30;
  return participants * dailyCost * (durationDays / 365);
}
