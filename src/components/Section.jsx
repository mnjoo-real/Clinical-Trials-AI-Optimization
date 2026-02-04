export default function Section({ id, title, subtitle, children, className = "" }) {
  return (
    <section id={id} className={`py-16 md:py-20 ${className}`}>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6">
        {(title || subtitle) && (
          <div className="max-w-2xl">
            {subtitle && (
              <p className="text-xs uppercase tracking-[0.3em] text-slate">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">
                {title}
              </h2>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
