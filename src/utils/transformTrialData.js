const DAILY_COST = 23737;

function checkROIEfficiency(costOriginal, costAI) {
  const revenues = [1e4, 1e6, 1e8, 5e8, 1e9, 2e9];
  for (const R of revenues) {
    const roiOriginal = (R - costOriginal) / costOriginal;
    const roiAI = (R - costAI) / costAI;
    if (roiAI <= roiOriginal) return "—";
  }
  return "✓";
}

export function transformTrialRow(row, index) {
  const durationRaw = row.DurationWeeks ?? row.durationWeeks ?? "";
  const parsedWeeks = Number(durationRaw);
  const durationWeeks = Number.isFinite(parsedWeeks) && parsedWeeks > 0 ? parsedWeeks : 52;
  const durationDays = durationWeeks * 7;
  const durationAI = durationDays * 0.8;

  const cost = durationDays * DAILY_COST;
  const costAI = durationAI * DAILY_COST;
  const costSavings = cost - costAI;
  const roiEfficiency = checkROIEfficiency(cost, costAI);

  const id = row.NCTId || row.nct_id || row.NctId || `Trial-${index + 1}`;

  return {
    id,
    durationDays,
    cost,
    durationAI,
    costAI,
    costSavings,
    roiEfficiency
  };
}

export function transformTrialDataset(csvData) {
  return csvData
    .filter((row) => {
      if (!row) return false;
      const hasId = row.NCTId || row.nct_id || row.NctId;
      const hasDuration = row.DurationWeeks || row.durationWeeks;
      return Boolean(hasId || hasDuration);
    })
    .map((row, index) => transformTrialRow(row, index));
}
