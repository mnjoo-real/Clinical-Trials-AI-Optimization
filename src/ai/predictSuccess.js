import { modelWeights } from "./modelWeights";

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

export function predictSuccess(inputs) {
  const {
    participants,
    durationMonths,
    blinding,
    controlType,
    endpoint
  } = inputs;

  let score = modelWeights.intercept;

  // Numeric features
  score += participants * modelWeights.enrollment;
  score += ((durationMonths * 4) / 10) * modelWeights.durationWeeks;

  // Endpoint
  if (endpoint === "HbA1c Change") score += modelWeights.endpoint_hba1c;
  if (endpoint === "Fasting Glucose") score += modelWeights.endpoint_fpg;
  if (endpoint === "Composite") score += modelWeights.endpoint_composite;

  // Masking
  if (blinding === "Single Blind") score += modelWeights.masking_single;
  if (blinding === "Double Blind") score += modelWeights.masking_double;
  if (blinding === "Open Label") score += modelWeights.masking_open;

  // Comparator
  if (controlType === "Placebo") score += modelWeights.comparator_placebo;
  if (controlType === "Active Comparator") score += modelWeights.comparator_active;

  const probability = sigmoid(score);

  return probability;
}
