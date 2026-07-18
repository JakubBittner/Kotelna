export default function SectionLabel({ children, className = "" }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="h-px w-8 bg-[hsl(var(--gold-dark))]" aria-hidden="true" />
      <span className="eyebrow">{children}</span>
    </div>
  );
}