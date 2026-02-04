import Section from "../components/Section";
import Card from "../components/Card";
import { useLanguage } from "../context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  const objectives = [
    t("objective_1"),
    t("objective_2"),
    t("objective_3"),
    t("objective_4"),
    t("objective_5")
  ];

  const impactGroups = [
    { title: t("impact_pharma_title"), text: t("impact_pharma_text") },
    { title: t("impact_investor_title"), text: t("impact_investor_text") },
    { title: t("impact_patient_title"), text: t("impact_patient_text") },
    { title: t("impact_system_title"), text: t("impact_system_text") }
  ];

  return (
    <main className="bg-white">
      <section className="bg-hero-radial pb-20 pt-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div className="fade-up">
            <p className="text-xs uppercase tracking-[0.4em] text-slate">
              {t("hero_kicker")}
            </p>
            <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">
              {t("hero_title")}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate">
              {t("hero_subtitle")}
            </p>
            <div className="mt-10 flex items-center gap-3 text-sm text-slate">
              <div className="h-10 w-10 rounded-full border border-accent/20 bg-white shadow-soft" />
              <p>{t("hero_note")}</p>
            </div>
          </div>
          <div className="rounded-3xl border border-accent/20 bg-white p-8 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-slate">
              {t("summary_kicker")}
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate">
              <li>{t("summary_item_1")}</li>
              <li>{t("summary_item_2")}</li>
              <li>{t("summary_item_3")}</li>
            </ul>
            <div className="mt-8 rounded-2xl bg-mist p-4 text-xs text-slate">
              {t("summary_note")}
            </div>
          </div>
        </div>
        <div className="mt-12 flex justify-center">
          <div className="scroll-indicator flex flex-col items-center gap-2 text-xs uppercase tracking-[0.4em] text-slate">
            <span>{t("scroll_label")}</span>
            <div className="h-10 w-[2px] rounded-full bg-accent" />
          </div>
        </div>
      </section>

      <Section
        id="background"
        subtitle={t("background_subtitle")}
        title={t("background_title")}
        className="bg-white"
      >
        <div className="grid gap-8 md:grid-cols-3">
          <Card title={t("background_card1_title")}>
            {t("background_card1_text")}
          </Card>
          <Card title={t("background_card2_title")}>
            {t("background_card2_text")}
          </Card>
          <Card title={t("background_card3_title")}>
            {t("background_card3_text")}
          </Card>
        </div>
      </Section>

      <Section
        id="objectives"
        subtitle={t("objectives_subtitle")}
        title={t("objectives_title")}
        className="bg-section-grid"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {objectives.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-accent/10 bg-white p-6 shadow-soft"
            >
              <p className="text-sm font-semibold text-ink">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="ai-model"
        subtitle={t("model_subtitle")}
        title={t("model_title")}
      >
        <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
          <div className="rounded-2xl border border-slate/10 bg-white p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-slate">
              {t("model_inputs_label")}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate">
              <li>{t("model_input_1")}</li>
              <li>{t("model_input_2")}</li>
              <li>{t("model_input_3")}</li>
              <li>{t("model_input_4")}</li>
              <li>{t("model_input_5")}</li>
            </ul>
          </div>
          <div className="hidden h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent md:flex">
            →
          </div>
          <div className="rounded-2xl border border-accent/20 bg-mist p-6 shadow-soft">
            <p className="text-xs uppercase tracking-[0.3em] text-slate">
              {t("model_ai_label")}
            </p>
            <p className="mt-4 text-sm text-slate">
              {t("model_ai_text")}
            </p>
          </div>
          <div className="hidden h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent md:flex">
            →
          </div>
          <div className="rounded-2xl border border-slate/10 bg-white p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-slate">
              {t("model_outputs_label")}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate">
              <li>{t("model_output_1")}</li>
              <li>{t("model_output_2")}</li>
              <li>{t("model_output_3")}</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section
        id="economics"
        subtitle={t("econ_flow_subtitle")}
        title={t("econ_flow_title")}
        className="bg-section-grid"
      >
        <div className="grid gap-4 md:grid-cols-5">
          {[
            t("econ_flow_step_1"),
            t("econ_flow_step_2"),
            t("econ_flow_step_3"),
            t("econ_flow_step_4"),
            t("econ_flow_step_5")
          ].map((step) => (
            <div
              key={step}
              className="rounded-2xl border border-accent/10 bg-white p-5 text-center text-sm font-semibold text-ink shadow-soft"
            >
              {step}
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="impact"
        subtitle={t("impact_subtitle")}
        title={t("impact_title")}
      >
        <div className="grid gap-6 md:grid-cols-2">
          {impactGroups.map((group) => (
            <Card key={group.title} title={group.title}>
              {group.text}
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}
