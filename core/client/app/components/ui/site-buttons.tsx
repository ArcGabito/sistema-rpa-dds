import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import type { ReactNode } from "react";

// The site's two calls to action.

// A dark button with its arrow on a small white square. On night bands it's
// a translucent panel; on light ones, solid near-black.
export function ArrowButton({
  href,
  children,
  tone = "night",
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: "night" | "light";
  className?: string;
}) {
  const surface =
    tone === "night"
      ? "bg-white/[0.07] text-white ring-1 ring-white/10 ring-inset hover:bg-white/[0.12]"
      : "bg-night-950 text-white hover:bg-night-800";
  return (
    <Link
      href={href}
      className={`group inline-flex h-10 items-center gap-3 rounded-[7px] pr-1.5 pl-4 text-[13px] font-medium tracking-[-0.01em] transition-colors ${surface} ${className}`}
    >
      {children}
      <span className="flex h-7 w-7 items-center justify-center rounded-[5px] bg-white text-ink-950">
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
      </span>
    </Link>
  );
}

// Uppercase label over a thick light-blue rule, with a "+" at the end.
export function LineLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex w-64 max-w-full items-center justify-between pb-3 font-mono text-[11px] font-semibold tracking-[0.12em] text-ink-950 uppercase ${className}`}
    >
      {children}
      <Plus className="h-3.5 w-3.5 transition-transform group-hover:rotate-90" strokeWidth={2.25} />
      <span className="absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-gradient-to-r from-brand-300 via-brand-400 to-brand-300 transition-[filter] group-hover:brightness-90" />
    </Link>
  );
}
