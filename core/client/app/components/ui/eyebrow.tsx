import type { ReactNode } from "react";

// Small monospace label above a section heading, led by a square marker.
export function Eyebrow({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const color = tone === "dark" ? "text-white/60" : "text-ink-500";
  const marker = tone === "dark" ? "bg-glow-300" : "bg-brand-600";
  return (
    <p className={`flex items-center gap-2 font-mono text-[11px] font-medium tracking-[0.14em] uppercase ${color} ${className}`}>
      <span className={`h-1.5 w-1.5 shrink-0 ${marker}`} aria-hidden="true" />
      {children}
    </p>
  );
}
