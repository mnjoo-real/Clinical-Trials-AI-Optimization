export function generateOptimizedDesign(inputs, locked) {
  const optimized = { ...inputs };

  if (!locked.endpoint && optimized.endpoint !== "HbA1c Change") {
    optimized.endpoint = "HbA1c Change";
  }

  if (!locked.blinding && optimized.blinding === "Open Label") {
    optimized.blinding = "Single Blind";
  }

  if (!locked.controlType && optimized.controlType === "Active Comparator") {
    optimized.controlType = "Placebo";
  }

  if (!locked.participants && optimized.participants < 150) {
    optimized.participants = optimized.participants + 50;
  }

  if (!locked.durationMonths && optimized.durationMonths > 18) {
    optimized.durationMonths = optimized.durationMonths - 4;
  }

  return optimized;
}
