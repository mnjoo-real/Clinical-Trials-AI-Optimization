import { useEffect, useMemo, useState } from "react";
import Card from "../components/Card";
import { useLanguage } from "../context/LanguageContext";
import { predictSuccess } from "../ai/predictSuccess";
import { estimateCost } from "../ai/economicModel";
import { calculateEfficiency } from "../ai/efficiencyScore";
import { generateSuggestions } from "../ai/suggestions";
import { generateOptimizedDesign } from "../ai/generateOptimizedDesign";

const STORAGE_KEY = "aiModelInputs";

const defaultInputs = {
  participants: 280,
  duration: 14,
  control: "placebo",
  blinding: "double",
  endpoint: "hba1c"
};

const normalizeInputs = (raw) => {
  const mapped = { ...raw };
  const controlMap = {
    Placebo: "placebo",
    "Active Comparator": "active"
  };
  const blindingMap = {
    "Open Label": "open",
    "Single Blind": "single",
    "Double Blind": "double"
  };
  const endpointMap = {
    "HbA1c Change": "hba1c",
    "Fasting Glucose": "fasting",
    Composite: "composite"
  };

  if (mapped.control && controlMap[mapped.control]) {
    mapped.control = controlMap[mapped.control];
  }
  if (mapped.blinding && blindingMap[mapped.blinding]) {
    mapped.blinding = blindingMap[mapped.blinding];
  }
  if (mapped.endpoint && endpointMap[mapped.endpoint]) {
    mapped.endpoint = endpointMap[mapped.endpoint];
  }

  return {
    ...defaultInputs,
    ...mapped
  };
};

const buildModelInputs = (inputs) => {
  const blindingMap = {
    open: "Open Label",
    single: "Single Blind",
    double: "Double Blind"
  };
  const controlMap = {
    placebo: "Placebo",
    active: "Active Comparator"
  };
  const endpointMap = {
    hba1c: "HbA1c Change",
    fasting: "Fasting Glucose",
    composite: "Composite"
  };

  return {
    participants: inputs.participants,
    durationMonths: inputs.duration,
    blinding: blindingMap[inputs.blinding] ?? "Double Blind",
    controlType: controlMap[inputs.control] ?? "Placebo",
    endpoint: endpointMap[inputs.endpoint] ?? "HbA1c Change"
  };
};

const computeModelResults = (inputs) => {
  const modelInputs = buildModelInputs(inputs);
  const successProb = predictSuccess(modelInputs);
  const cost = estimateCost(modelInputs.participants, modelInputs.durationMonths);
  const efficiencyScore = calculateEfficiency(
    successProb,
    cost,
    modelInputs.durationMonths
  );
  const suggestions = generateSuggestions(modelInputs);
  const optimizedDesign = generateOptimizedDesign(modelInputs);
  const optimizedSuccess = predictSuccess(optimizedDesign);
  const optimizedCost = estimateCost(
    optimizedDesign.participants,
    optimizedDesign.durationMonths
  );
  const optimizedEfficiency = calculateEfficiency(
    optimizedSuccess,
    optimizedCost,
    optimizedDesign.durationMonths
  );

  return {
    original: modelInputs,
    successProb,
    cost,
    efficiencyScore,
    suggestions,
    optimized: {
      design: optimizedDesign,
      successProb: optimizedSuccess,
      cost: optimizedCost,
      efficiencyScore: optimizedEfficiency
    }
  };
};

export default function AIModel() {
  const { t } = useLanguage();
  const [inputs, setInputs] = useState(defaultInputs);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed?.inputs) {
          const normalized = normalizeInputs(parsed.inputs);
          setInputs(normalized);
          if (
            Array.isArray(parsed?.results?.suggestions) &&
            parsed?.results?.original &&
            parsed?.results?.optimized
          ) {
            setResults(parsed.results);
          } else {
            setResults(computeModelResults(normalized));
          }
        }
      } catch {
        setInputs(defaultInputs);
      }
    }
  }, []);

  useEffect(() => {
    if (results) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ inputs, results })
      );
    }
  }, [inputs, results]);

  const controlLabel = useMemo(() => {
    if (inputs.control === "active") return t("option_control_active");
    return t("option_control_placebo");
  }, [inputs.control, t]);

  const formSummary = useMemo(
    () =>
      t("form_summary", {
        participants: inputs.participants,
        duration: inputs.duration,
        control: controlLabel
      }),
    [inputs, t, controlLabel]
  );

  const handleChange = (field) => (event) => {
    const value =
      event.target.type === "range"
        ? Number(event.target.value)
        : event.target.value;
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleRun = () => {
    setResults(computeModelResults(inputs));
  };

  return (
    <main className="bg-mist py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate">
            {t("ai_kicker")}
          </p>
          <h1 className="mt-4 font-display text-4xl text-ink">
            {t("ai_title")}
          </h1>
          <p className="mt-4 max-w-2xl text-slate">
            {t("ai_intro")}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl border border-accent/10 bg-white p-8 shadow-card">
            <h2 className="font-display text-2xl text-ink">
              {t("input_params_title")}
            </h2>
            <p className="mt-2 text-sm text-slate">{formSummary}</p>

            <div className="mt-8 space-y-6">
              <div>
                <label className="text-sm font-semibold text-ink">
                  {t("label_participants")}
                </label>
                <div className="mt-3 flex items-center gap-4">
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    value={inputs.participants}
                    onChange={handleChange("participants")}
                    className="w-full"
                  />
                  <span className="w-16 text-sm text-slate">
                    {inputs.participants}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-ink">
                  {t("label_duration")}
                </label>
                <div className="mt-3 flex items-center gap-4">
                  <input
                    type="range"
                    min="6"
                    max="30"
                    value={inputs.duration}
                    onChange={handleChange("duration")}
                    className="w-full"
                  />
                  <span className="w-16 text-sm text-slate">
                    {inputs.duration}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-ink">
                  {t("label_control")}
                </label>
                <select
                  value={inputs.control}
                  onChange={handleChange("control")}
                  className="mt-2 w-full rounded-xl border border-slate/20 bg-white px-4 py-2 text-sm"
                >
                  <option value="placebo">{t("option_control_placebo")}</option>
                  <option value="active">{t("option_control_active")}</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-ink">
                  {t("label_blinding")}
                </label>
                <select
                  value={inputs.blinding}
                  onChange={handleChange("blinding")}
                  className="mt-2 w-full rounded-xl border border-slate/20 bg-white px-4 py-2 text-sm"
                >
                  <option value="open">{t("option_blinding_open")}</option>
                  <option value="single">{t("option_blinding_single")}</option>
                  <option value="double">{t("option_blinding_double")}</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-ink">
                  {t("label_endpoint")}
                </label>
                <select
                  value={inputs.endpoint}
                  onChange={handleChange("endpoint")}
                  className="mt-2 w-full rounded-xl border border-slate/20 bg-white px-4 py-2 text-sm"
                >
                  <option value="hba1c">{t("option_endpoint_hba1c")}</option>
                  <option value="fasting">{t("option_endpoint_fasting")}</option>
                  <option value="composite">{t("option_endpoint_composite")}</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleRun}
                className="w-full rounded-xl bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white"
              >
                {t("btn_run")}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate/10 bg-white p-8 shadow-card">
              <h2 className="font-display text-2xl text-ink">
                {t("results_title")}
              </h2>
              {!results ? (
                <p className="mt-6 text-sm text-slate">
                  {t("results_prompt")}
                </p>
              ) : (
                <div className="mt-6 grid gap-4">
                  <Card title={t("card_success")}>
                    <div className="text-3xl font-semibold text-ink">
                      {(results.successProb * 100).toFixed(1)}%
                    </div>
                  </Card>
                  <Card title={t("card_cost")}>
                    <div className="text-xl font-semibold text-ink">
                      ${results.cost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                  </Card>
                  <Card title={t("card_efficiency")}>
                    <div className="text-xl font-semibold text-ink">
                      {results.efficiencyScore.toFixed(2)} index
                    </div>
                  </Card>
                </div>
              )}
            </div>

            {results?.optimized && (
              <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-8 shadow-card">
                <h2 className="font-display text-2xl text-ink">
                  AI-Recommended Optimized Trial Design
                </h2>
                <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
                      Original Design
                    </p>
                    <div className="mt-4 space-y-2 text-sm text-slate">
                      <p>Participants: {results.original.participants}</p>
                      <p>Duration (months): {results.original.durationMonths}</p>
                      <p>Control Group: {results.original.controlType}</p>
                      <p>Blinding: {results.original.blinding}</p>
                      <p>Primary Endpoint: {results.original.endpoint}</p>
                    </div>
                    <div className="mt-4 space-y-2 text-sm text-slate">
                      <p>Success Probability: {(results.successProb * 100).toFixed(1)}%</p>
                      <p>Estimated Cost: ${results.cost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                      <p>Efficiency Score: {results.efficiencyScore.toFixed(2)} index</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                      AI-Optimized Design
                    </p>
                    <div className="mt-4 space-y-2 text-sm text-emerald-700">
                      <p>Participants: {results.optimized.design.participants}</p>
                      <p>Duration (months): {results.optimized.design.durationMonths}</p>
                      <p>Control Group: {results.optimized.design.controlType}</p>
                      <p>Blinding: {results.optimized.design.blinding}</p>
                      <p>Primary Endpoint: {results.optimized.design.endpoint}</p>
                    </div>
                    <div className="mt-4 space-y-2 text-sm text-emerald-700">
                      <p>Success Probability: {(results.optimized.successProb * 100).toFixed(1)}%</p>
                      <p>Estimated Cost: ${results.optimized.cost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                      <p>Efficiency Score: {results.optimized.efficiencyScore.toFixed(2)} index</p>
                    </div>
                  </div>
                </div>
                <p className="mt-6 text-sm text-slate">
                  The AI-optimized design is automatically generated by adjusting key trial parameters such as endpoint selection, masking strategy, sample size, and duration. This reflects the research approach where AI explores alternative configurations to achieve higher efficiency while maintaining clinical success probability.
                </p>
              </div>
            )}

            <div className="rounded-3xl border border-accent/10 bg-white p-8 shadow-card">
              <h2 className="font-display text-2xl text-ink">
                {t("adjustments_title")}
              </h2>
              <div className="mt-4 text-sm text-slate">
                {!results ? (
                  <p>{t("adjustments_none")}</p>
                ) : results.suggestions.length ? (
                  <ul className="space-y-2">
                    {results.suggestions.map((rec) => (
                      <li key={rec}>• {rec}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{t("adjustments_ok")}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
