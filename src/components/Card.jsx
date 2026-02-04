export default function Card({ title, children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-slate/10 bg-white p-6 shadow-card ${className}`}
    >
      {title && (
        <h3 className="font-display text-xl text-ink">{title}</h3>
      )}
      <div className="mt-3 text-sm text-slate">{children}</div>
    </div>
  );
}
