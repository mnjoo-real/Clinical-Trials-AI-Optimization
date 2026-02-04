import { NavLink } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const linkBase =
  "text-sm uppercase tracking-[0.18em] font-semibold transition-colors";

const getLinkClass = ({ isActive }) =>
  `${linkBase} ${isActive ? "text-accent" : "text-slate hover:text-ink"}`;

export default function Navbar() {
  const { toggleLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b border-slate/10 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div>
          <p className="font-display text-lg text-ink">{t("nav_brand_title")}</p>
          <p className="text-xs uppercase tracking-[0.3em] text-slate">
            {t("nav_brand_subtitle")}
          </p>
        </div>
        <div className="flex items-center gap-6">
          <NavLink to="/" className={getLinkClass} end>
            {t("nav_home")}
          </NavLink>
          <NavLink to="/ai-model" className={getLinkClass}>
            {t("nav_ai")}
          </NavLink>
          <NavLink to="/economics" className={getLinkClass}>
            {t("nav_econ")}
          </NavLink>
          <button
            type="button"
            onClick={toggleLanguage}
            className="rounded-full border border-slate/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate hover:text-ink"
          >
            {t("lang_toggle")}
          </button>
        </div>
      </nav>
    </header>
  );
}
