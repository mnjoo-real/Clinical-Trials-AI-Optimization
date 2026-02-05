export function generateOptimizedDesign(inputs) {
  const optimized = { ...inputs };

  // Improve endpoint
  if (optimized.endpoint !== "HbA1c Change") {
    optimized.endpoint = "HbA1c Change";
  }

  // Improve masking
  if (optimized.blinding === "Open Label") {
    optimized.blinding = "Single Blind";
  }

  // Improve comparator
  if (optimized.controlType === "Active Comparator") {
    optimized.controlType = "Placebo";
  }

  // Increase statistical power if sample too small
  if (optimized.participants < 150) {
    optimized.participants = optimized.participants + 50;
  }

  // Reduce overly long duration
  if (optimized.durationMonths > 18) {
    optimized.durationMonths = optimized.durationMonths - 4;
  }

  return optimized;
}
