export function generateSuggestions(inputs) {
  const suggestions = [];

  if (inputs.durationMonths > 18) {
    suggestions.push("AI suggests reducing trial duration to improve efficiency.");
  }
  if (inputs.participants < 150) {
    suggestions.push("AI suggests increasing sample size to improve statistical power.");
  }
  if (inputs.endpoint !== "HbA1c Change") {
    suggestions.push("AI suggests using HbA1c Change as a primary endpoint for stronger success likelihood.");
  }

  return suggestions;
}
