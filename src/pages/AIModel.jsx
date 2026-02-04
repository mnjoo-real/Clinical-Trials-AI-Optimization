import { useEffect, useMemo, useState } from "react";
import Card from "../components/Card";
import { useLanguage } from "../context/LanguageContext";

const STORAGE_KEY = "aiModelInputs";

const defaultInputs = {
  participants: 280,
  duration: 14,
  control: "placebo",
  blinding: "double",
  endpoint: "hba1c"
};

const endpointWeights = {
  hba1c: 0.07,
  fasting: 0.03,
  composite: 0.05
};

const blindingBonusMap = {
  double: 0.08,
  single: 0.04,
  open: 0
};

const costPerDay = 23737;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

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

function computeResults(inputs) {
  const base = 0.45;
  const sampleFactor = inputs.participants / 2000;
  const blindingBonus = blindingBonusMap[inputs.blinding] ?? 0;
  const endpointWeight = endpointWeights[inputs.endpoint] ?? 0.04;
  const durationPenalty = inputs.duration * 0.01;
  const successProb = clamp(
    base + sampleFactor + blindingBonus + endpointWeight - durationPenalty,
    0.2,
    0.92
  );

  const cost =
    inputs.participants * costPerDay * ((inputs.duration * 30) / 365);

  const efficiencyScore = clamp(
    0.72 + sampleFactor * 0.1 + blindingBonus * 0.8 - inputs.duration * 0.01,
    0.3,
    0.95
  );

  const recommendations = [];
  if (inputs.duration > 18) {
    recommendations.push("rec_duration");
  }
  if (inputs.participants < 150) {
    recommendations.push("rec_participants");
  }
  if (inputs.endpoint === "fasting") {
    recommendations.push("rec_endpoint");
  }

  return {
    successProb,
    cost,
    efficiencyScore,
    recommendations
  };
}

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
          setResults(parsed.results ?? null);
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
    const computed = computeResults(inputs);
    setResults(computed);
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
                    {(results.successProb * 100).toFixed(1)}%
                  </Card>
                  <Card title={t("card_cost")}>
                    ${results.cost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </Card>
                  <Card title={t("card_efficiency")}>
                    {(results.efficiencyScore * 100).toFixed(0)} / 100
                  </Card>
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-accent/10 bg-white p-8 shadow-card">
              <h2 className="font-display text-2xl text-ink">
                {t("adjustments_title")}
              </h2>
              <div className="mt-4 text-sm text-slate">
                {!results ? (
                  <p>{t("adjustments_none")}</p>
                ) : results.recommendations.length ? (
                  <ul className="space-y-2">
                    {results.recommendations.map((rec) => (
                      <li key={rec}>• {t(rec)}</li>
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
