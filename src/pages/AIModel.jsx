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

const defaultLocked = {
  participants: false,
  durationMonths: false,
  controlType: false,
  blinding: false,
  endpoint: false
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

const computeModelResults = (inputs, locked) => {
  const modelInputs = buildModelInputs(inputs);
  const successProb = predictSuccess(modelInputs);
  const cost = estimateCost(modelInputs.participants, modelInputs.durationMonths);
  const efficiencyScore = calculateEfficiency(
    successProb,
    cost,
    modelInputs.durationMonths
  );
  const suggestions = generateSuggestions(modelInputs);
  const optimizedDesign = generateOptimizedDesign(modelInputs, locked);
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
  const [locked, setLocked] = useState(defaultLocked);
  const [results, setResults] = useState(null);
  const [runResults, setRunResults] = useState(null);
  const [baselineResults, setBaselineResults] = useState(null);
  const [hasRun, setHasRun] = useState(false);
  const [hasUserRun, setHasUserRun] = useState(false);
  const [showOptimizedInfo, setShowOptimizedInfo] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed?.inputs) {
          const normalized = normalizeInputs(parsed.inputs);
          setInputs(normalized);
          if (parsed?.locked) {
            setLocked({ ...defaultLocked, ...parsed.locked });
          }
          const hasValidResults =
            Array.isArray(parsed?.results?.suggestions) &&
            parsed?.results?.original &&
            parsed?.results?.optimized;

          if (hasValidResults) {
            setResults(parsed.results);
            setHasRun(true);
          } else {
            setResults(computeModelResults(normalized, parsed?.locked ?? defaultLocked));
            setHasRun(true);
          }
        }
      } catch {
        setInputs(defaultInputs);
      }
    }
  }, []);

  useEffect(() => {
    if (!hasRun) return;
    setResults(computeModelResults(inputs, locked));
  }, [inputs, locked, hasRun]);

  useEffect(() => {
    if (results) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ inputs, locked, results })
      );
    }
  }, [inputs, locked, results]);

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
    const { type, value: raw, min, max } = event.target;
    if (type === "range" || type === "number") {
      const numeric = Number(raw);
      if (Number.isNaN(numeric)) return;
      const minValue = min === "" ? null : Number(min);
      const maxValue = max === "" ? null : Number(max);
      const clamped =
        minValue !== null && maxValue !== null
          ? Math.min(Math.max(numeric, minValue), maxValue)
          : numeric;
      setInputs((prev) => ({ ...prev, [field]: clamped }));
      return;
    }
    setInputs((prev) => ({ ...prev, [field]: raw }));
  };

  const handleRun = () => {
    setHasRun(true);
    setHasUserRun(true);
    const computed = computeModelResults(inputs, locked);
    const base = baselineResults ?? computed;
    if (!baselineResults) {
      setBaselineResults(computed);
    }
    const finalResults = {
      ...computed
    };
    setResults(finalResults);
    setRunResults(finalResults);
  };

  const handleLockChange = (field) => (event) => {
    const isLocked = event.target.checked;
    setLocked((prev) => ({ ...prev, [field]: isLocked }));
  };

  return (
    <main className="bg-mist py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6">
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

        <div className="grid gap-8 lg:grid-cols-[1fr_1.25fr]">
          <div className="rounded-3xl border border-accent/10 bg-white p-8 shadow-card">
            <h2 className="font-display text-2xl text-ink">
              {t("input_params_title")}
            </h2>
            <p className="mt-2 text-sm text-slate">{formSummary}</p>

            <div className="mt-8 space-y-6">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <label className="text-sm font-semibold text-ink">
                    {t("label_participants")}
                  </label>
                  <label className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate">
                    <input
                      type="checkbox"
                      checked={locked.participants}
                      onChange={handleLockChange("participants")}
                    />
                    {t("ai_lock")}
                  </label>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    value={inputs.participants}
                    onChange={handleChange("participants")}
                    className="w-full"
                  />
                  <input
                    type="number"
                    min="50"
                    max="1000"
                    value={inputs.participants}
                    onChange={handleChange("participants")}
                    className="w-20 rounded-lg border border-slate/20 px-2 py-1 text-sm text-slate"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-4">
                  <label className="text-sm font-semibold text-ink">
                    {t("label_duration")}
                  </label>
                  <label className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate">
                    <input
                      type="checkbox"
                      checked={locked.durationMonths}
                      onChange={handleLockChange("durationMonths")}
                    />
                    {t("ai_lock")}
                  </label>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <input
                    type="range"
                    min="6"
                    max="30"
                    value={inputs.duration}
                    onChange={handleChange("duration")}
                    className="w-full"
                  />
                  <input
                    type="number"
                    min="6"
                    max="30"
                    value={inputs.duration}
                    onChange={handleChange("duration")}
                    className="w-20 rounded-lg border border-slate/20 px-2 py-1 text-sm text-slate"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-4">
                  <label className="text-sm font-semibold text-ink">
                    {t("label_control")}
                  </label>
                  <label className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate">
                    <input
                      type="checkbox"
                      checked={locked.controlType}
                      onChange={handleLockChange("controlType")}
                    />
                    {t("ai_lock")}
                  </label>
                </div>
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
                <div className="flex items-center justify-between gap-4">
                  <label className="text-sm font-semibold text-ink">
                    {t("label_blinding")}
                  </label>
                  <label className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate">
                    <input
                      type="checkbox"
                      checked={locked.blinding}
                      onChange={handleLockChange("blinding")}
                    />
                    {t("ai_lock")}
                  </label>
                </div>
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
                <div className="flex items-center justify-between gap-4">
                  <label className="text-sm font-semibold text-ink">
                    {t("label_endpoint")}
                  </label>
                  <label className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate">
                    <input
                      type="checkbox"
                      checked={locked.endpoint}
                      onChange={handleLockChange("endpoint")}
                    />
                    {t("ai_lock")}
                  </label>
                </div>
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
                <div className="mt-6 space-y-6">
                  <div className="rounded-2xl border border-slate/10 bg-mist/60 p-4">
                    <div className="grid grid-cols-3 gap-3 text-xs uppercase tracking-[0.2em] text-slate">
                      <span />
                      <span>{t("ai_original_design")}</span>
                      <span>AI 결과</span>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-3 text-sm text-ink">
                      <span className="text-slate">{t("card_success")}</span>
                      <span>{((baselineResults ?? results).successProb * 100).toFixed(1)}%</span>
                      <span>
                        {(results.optimized.successProb * 100).toFixed(1)}%
                        <span
                          className={`ml-2 text-xs font-semibold ${
                            results.optimized.successProb - (baselineResults ?? results).successProb > 0
                              ? "text-emerald-700"
                              : results.optimized.successProb - (baselineResults ?? results).successProb < 0
                                ? "text-rose-600"
                                : "text-slate"
                          }`}
                        >
                          {results.optimized.successProb - (baselineResults ?? results).successProb < 0 ? "-" : "+"}
                          {Math.abs((results.optimized.successProb - (baselineResults ?? results).successProb) * 100).toFixed(1)}%
                        </span>
                      </span>
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-3 text-sm text-ink">
                      <span className="text-slate">{t("card_cost")}</span>
                      <span>${(baselineResults ?? results).cost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      <span>
                        ${results.optimized.cost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        <span
                          className={`ml-2 text-xs font-semibold ${
                            results.optimized.cost - (baselineResults ?? results).cost < 0
                              ? "text-emerald-700"
                              : "text-rose-600"
                          }`}
                        >
                          {(results.optimized.cost - (baselineResults ?? results).cost) < 0 ? "-" : "+"}
                          ${Math.abs(results.optimized.cost - (baselineResults ?? results).cost).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </span>
                      </span>
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-3 text-sm text-ink">
                      <span className="text-slate">{t("card_efficiency")}</span>
                      <span>{(baselineResults ?? results).efficiencyScore.toFixed(3)}</span>
                      <span>
                        {results.optimized.efficiencyScore.toFixed(3)}
                        <span
                          className={`ml-2 text-xs font-semibold ${
                            results.optimized.efficiencyScore - (baselineResults ?? results).efficiencyScore > 0
                              ? "text-emerald-700"
                              : results.optimized.efficiencyScore - (baselineResults ?? results).efficiencyScore < 0
                                ? "text-rose-600"
                                : "text-slate"
                          }`}
                        >
                          {results.optimized.efficiencyScore - (baselineResults ?? results).efficiencyScore < 0 ? "-" : "+"}
                          {Math.abs(results.optimized.efficiencyScore - (baselineResults ?? results).efficiencyScore).toFixed(3)}
                        </span>
                      </span>
                    </div>
                  </div>
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

            {hasUserRun && runResults?.optimized && (
              <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-8 shadow-card">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-display text-2xl text-ink">
                    <button
                      type="button"
                      onClick={() => setShowOptimizedInfo(true)}
                      className="text-left transition-colors hover:text-emerald-700"
                      aria-label={t("ai_optimized_title")}
                    >
                      {t("ai_optimized_title_locked")}
                    </button>
                  </h2>
                </div>
                <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
                      <span className="group relative inline-flex items-center">
                        {t("ai_original_design")}
                        <span className="pointer-events-none absolute left-0 top-full z-10 mt-2 w-max rounded-md border border-slate/10 bg-white px-3 py-2 text-[10px] font-medium normal-case tracking-normal text-slate opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                          {t("ai_original_tooltip")}
                        </span>
                      </span>
                    </p>
                    <div className="mt-4 space-y-2 text-sm text-slate">
                      <p>
                        {t("ai_label_participants")} {(baselineResults ?? runResults).original.participants}
                        {locked.participants && (
                          <span className="ml-2 text-xs uppercase tracking-[0.2em] text-amber-700">
                            {t("ai_locked")}
                          </span>
                        )}
                      </p>
                      <p>
                        {t("ai_label_duration")} {(baselineResults ?? runResults).original.durationMonths}
                        {locked.durationMonths && (
                          <span className="ml-2 text-xs uppercase tracking-[0.2em] text-amber-700">
                            {t("ai_locked")}
                          </span>
                        )}
                      </p>
                      <p>
                        {t("ai_label_control")} {(baselineResults ?? runResults).original.controlType}
                        {locked.controlType && (
                          <span className="ml-2 text-xs uppercase tracking-[0.2em] text-amber-700">
                            {t("ai_locked")}
                          </span>
                        )}
                      </p>
                      <p>
                        {t("ai_label_blinding")} {(baselineResults ?? runResults).original.blinding}
                        {locked.blinding && (
                          <span className="ml-2 text-xs uppercase tracking-[0.2em] text-amber-700">
                            {t("ai_locked")}
                          </span>
                        )}
                      </p>
                      <p>
                        {t("ai_label_endpoint")} {(baselineResults ?? runResults).original.endpoint}
                        {locked.endpoint && (
                          <span className="ml-2 text-xs uppercase tracking-[0.2em] text-amber-700">
                            {t("ai_locked")}
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="mt-4 space-y-2 text-sm text-slate">
                      <p>{t("ai_label_success")} {((baselineResults ?? runResults).successProb * 100).toFixed(1)}%</p>
                      <p>
                        {t("ai_label_cost")} ${(baselineResults ?? runResults).cost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                      <p>{t("ai_label_efficiency")} {(baselineResults ?? runResults).efficiencyScore.toFixed(3)}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                      {t("ai_optimized_design")}
                    </p>
                    <div className="mt-4 space-y-2 text-sm text-emerald-700">
                      <p>
                        {t("ai_label_participants")} {runResults.optimized.design.participants}
                        {locked.participants && (
                          <span className="ml-2 text-xs uppercase tracking-[0.2em] text-amber-700">
                            {t("ai_locked")}
                          </span>
                        )}
                      </p>
                      <p>
                        {t("ai_label_duration")} {runResults.optimized.design.durationMonths}
                        {locked.durationMonths && (
                          <span className="ml-2 text-xs uppercase tracking-[0.2em] text-amber-700">
                            {t("ai_locked")}
                          </span>
                        )}
                      </p>
                      <p>
                        {t("ai_label_control")} {runResults.optimized.design.controlType}
                        {locked.controlType && (
                          <span className="ml-2 text-xs uppercase tracking-[0.2em] text-amber-700">
                            {t("ai_locked")}
                          </span>
                        )}
                      </p>
                      <p>
                        {t("ai_label_blinding")} {runResults.optimized.design.blinding}
                        {locked.blinding && (
                          <span className="ml-2 text-xs uppercase tracking-[0.2em] text-amber-700">
                            {t("ai_locked")}
                          </span>
                        )}
                      </p>
                      <p>
                        {t("ai_label_endpoint")} {runResults.optimized.design.endpoint}
                        {locked.endpoint && (
                          <span className="ml-2 text-xs uppercase tracking-[0.2em] text-amber-700">
                            {t("ai_locked")}
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="mt-4 space-y-2 text-sm text-emerald-700">
                      <p>{t("ai_label_success")} {(runResults.optimized.successProb * 100).toFixed(1)}%</p>
                      <p>
                        {t("ai_label_cost")} ${runResults.optimized.cost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                      <p>
                        {t("ai_label_efficiency")} {runResults.optimized.efficiencyScore.toFixed(3)}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mt-6 text-sm text-slate">
                  {t("ai_constraint_note")}
                </p>
              </div>
            )}

            {showOptimizedInfo && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate/40 px-6">
                <div className="w-full max-w-xl rounded-3xl border border-slate/10 bg-white p-6 shadow-card">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl text-ink">
                        {t("ai_optimized_title")}
                      </h3>
                      <p className="mt-4 text-sm text-slate">
                        {t("ai_optimized_note")}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowOptimizedInfo(false)}
                      className="text-lg font-semibold text-slate hover:text-ink"
                      aria-label={t("ai_modal_close")}
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
