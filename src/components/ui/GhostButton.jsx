import { Link } from "react-router-dom";

export default function GhostButton({ children, to, href, onClick, type = "button", variant = "default", className = "", ariaLabel }) {
  const base = variant === "gold" ? "ghost-btn-gold" : "ghost-btn";
  const cls = `${base} ${className}`;

  if (to) {
    return (
      <Link to={to} className={cls} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} aria-label={ariaLabel}>
      {children}
    </button>
  );
}