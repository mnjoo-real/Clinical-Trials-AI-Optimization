import ClinicalChat from "../components/ClinicalChat";
import { useLanguage } from "../context/LanguageContext";

export default function ResearchChat() {
  const { t } = useLanguage();

  return (
    <main className="bg-mist py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate">
            {t("chat_kicker")}
          </p>
          <h1 className="mt-4 font-display text-4xl text-ink">
            {t("chat_title")}
          </h1>
          <p className="mt-4 max-w-2xl text-slate">
            {t("chat_disclaimer")}
          </p>
        </div>

        <ClinicalChat />
      </div>
    </main>
  );
}
