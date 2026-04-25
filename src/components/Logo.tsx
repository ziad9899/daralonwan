import { Link } from "react-router-dom";

interface LogoProps {
  variant?: "dark" | "light";
}

export default function Logo({ variant = "dark" }: LogoProps) {
  const text = variant === "dark" ? "text-ink" : "text-sand";
  const sub = variant === "dark" ? "text-ink-soft" : "text-sand/70";
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-gold shadow-soft group-hover:bg-black transition">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M4 13 L12 5 L20 13 V20 H15 V14 H9 V20 H4 Z" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className={`block font-display font-extrabold text-lg ${text}`}>
          دار العنوان
        </span>
        <span className={`block text-[10px] font-bold tracking-[0.25em] ${sub}`}>
          REAL ESTATE
        </span>
      </span>
    </Link>
  );
}
