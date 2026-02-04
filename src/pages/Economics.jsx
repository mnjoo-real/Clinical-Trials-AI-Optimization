import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import Card from "../components/Card";
import { useLanguage } from "../context/LanguageContext";

const STORAGE_KEY = "economicDataset";
const costPerDay = 23737;

const randomNormal = (mean, std) => {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  const value = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return value * std + mean;
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const generateDataset = () => {
  return Array.from({ length: 990 }, (_, index) => {
    const durationDays = Math.round(clamp(randomNormal(520, 110), 240, 860));
    const durationAI = Math.round(durationDays * (0.75 + Math.random() * 0.1));
    const cost = durationDays * costPerDay;
    const costAI = durationAI * costPerDay;
    return {
      id: `T${String(index + 1).padStart(4, "0")}`,
      durationDays,
      cost,
      durationAI,
      costAI
    };
  });
};

const getDataset = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return null;
};

const median = (values) => {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

const buildHistogram = (values, bins = 10) => {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const binSize = (max - min) / bins;
  const buckets = Array.from({ length: bins }, (_, index) => ({
    name: `${Math.round(min + index * binSize)}-${Math.round(
      min + (index + 1) * binSize
    )}`,
    count: 0
  }));

  values.forEach((value) => {
    const idx = Math.min(
      Math.floor((value - min) / binSize),
      buckets.length - 1
    );
    buckets[idx].count += 1;
  });

  return buckets;
};

export default function Economics() {
  const { t } = useLanguage();
  const [dataset] = useState(() => {
    const existing = getDataset();
    if (existing) return existing;
    const created = generateDataset();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(created));
    return created;
  });

  const [page, setPage] = useState(1);
  const pageSize = 12;
  const totalPages = Math.ceil(dataset.length / pageSize);

  const durationHistogram = useMemo(
    () => buildHistogram(dataset.map((item) => item.durationDays), 12),
    [dataset]
  );

  const costHistogram = useMemo(
    () => buildHistogram(dataset.map((item) => item.cost), 12),
    [dataset]
  );

  const medianDuration = useMemo(
    () => median(dataset.map((item) => item.durationDays)),
    [dataset]
  );

  const medianDurationAI = useMemo(
    () => median(dataset.map((item) => item.durationAI)),
    [dataset]
  );

  const medianCost = useMemo(
    () => median(dataset.map((item) => item.cost)),
    [dataset]
  );

  const medianCostAI = useMemo(
    () => median(dataset.map((item) => item.costAI)),
    [dataset]
  );

  const comparisonDuration = [
    { name: t("chart_median_duration_label"), value: Math.round(medianDuration) },
    { name: t("chart_ai_duration_label"), value: Math.round(medianDurationAI) }
  ];

  const comparisonCost = [
    { name: t("chart_median_cost_label"), value: Math.round(medianCost) },
    { name: t("chart_ai_cost_label"), value: Math.round(medianCostAI) }
  ];

  const paged = dataset.slice((page - 1) * pageSize, page * pageSize);

  return (
    <main className="bg-white py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate">
            {t("econ_kicker")}
          </p>
          <h1 className="mt-4 font-display text-4xl text-ink">
            {t("econ_title")}
          </h1>
          <p className="mt-4 max-w-2xl text-slate">
            {t("econ_intro")}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card title={t("chart_duration_title")}>
            <div className="mt-6 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={durationHistogram}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3c7dff" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card title={t("chart_cost_title")}>
            <div className="mt-6 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={costHistogram}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0f1b2d" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card title={t("chart_median_duration_title")}>
            <div className="mt-6 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonDuration}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3c7dff" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card title={t("chart_median_cost_title")}>
            <div className="mt-6 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonCost}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `$${(value / 1e6).toFixed(1)}M`} />
                  <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                  <Bar dataKey="value" fill="#0f1b2d" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="rounded-3xl border border-slate/10 bg-mist p-8 shadow-card">
          <h2 className="font-display text-2xl text-ink">{t("dataset_title")}</h2>
          <p className="mt-2 text-sm text-slate">
            {t("dataset_subtitle", {
              page,
              total: totalPages,
              median: Math.round(medianDuration),
              medianAI: Math.round(medianDurationAI)
            })}
          </p>
          <div className="mt-6 overflow-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.2em] text-slate">
                <tr>
                  <th className="pb-3">{t("table_id")}</th>
                  <th className="pb-3">{t("table_duration")}</th>
                  <th className="pb-3">{t("table_cost")}</th>
                  <th className="pb-3">{t("table_duration_ai")}</th>
                  <th className="pb-3">{t("table_cost_ai")}</th>
                </tr>
              </thead>
              <tbody className="text-slate">
                {paged.map((trial) => (
                  <tr key={trial.id} className="border-t border-slate/10">
                    <td className="py-3 font-semibold text-ink">{trial.id}</td>
                    <td className="py-3">{trial.durationDays}</td>
                    <td className="py-3">
                      ${trial.cost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </td>
                    <td className="py-3">{trial.durationAI}</td>
                    <td className="py-3">
                      ${trial.costAI.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="rounded-xl border border-slate/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate disabled:opacity-40"
            >
              {t("prev")}
            </button>
            <span className="text-xs uppercase tracking-[0.3em] text-slate">
              {t("page_label", { page, total: totalPages })}
            </span>
            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="rounded-xl border border-slate/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate disabled:opacity-40"
            >
              {t("next")}
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card title={t("notes_title")}>{t("notes_text")}</Card>
          <Card title={t("references_title")}>
            <ul className="space-y-2">
              <li>FDA (2021) AI/ML in Drug Development</li>
              <li>ClinicalTrials.gov</li>
              <li>IBM AI Clinical Trial Research</li>
              <li>Exscientia AI Drug Discovery</li>
              <li>Pocock Clinical Trials Textbook</li>
              <li>Friedman et al. Fundamentals of Clinical Trials</li>
            </ul>
          </Card>
        </div>
      </div>
    </main>
  );
}
