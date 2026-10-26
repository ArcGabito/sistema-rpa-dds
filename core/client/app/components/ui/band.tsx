import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

// The public site's building blocks. Every section is a full-width band —
// night (dark), paper (light) or mist (light grey) — whose content sits
// inside a frame of vertical hairlines that runs down the whole page; a
// band opens with a hairline across the frame and a "+" registration mark
// where it meets each side.
export type Tone = "night" | "paper" | "mist";

const SURFACE: Record<Tone, string> = {
  night: "bg-night-950 text-white",
  paper: "bg-brand-50 text-ink-950",
  mist: "bg-mist text-ink-950",
};

// Hairlines inside a band (rows, columns, cells), by tone.
export const HAIRLINE: Record<Tone, string> = {
  night: "border-white/[0.08]",
  paper: "border-ink-950/[0.09]",
  mist: "border-ink-950/[0.1]",
};

const MARK: Record<Tone, string> = {
  night: "text-white/40",
  paper: "text-ink-400",
  mist: "text-ink-400",
};

export function Mark({ tone, className }: { tone: Tone; className: string }) {
  return (
    <svg viewBox="0 0 9 9" className={`pointer-events-none absolute z-10 h-[9px] w-[9px] ${MARK[tone]} ${className}`} aria-hidden="true">
      <path d="M4.5 0v9M0 4.5h9" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function Band({
  tone = "paper",
  id,
  backdrop,
  opens = true,
  className = "",
  frameClassName = "",
  children,
}: {
  tone?: Tone;
  id?: string;
  // Painted behind the frame (a glow).
  backdrop?: ReactNode;
  // The hairline and marks across the top of the frame.
  opens?: boolean;
  className?: string;
  frameClassName?: string;
  children: ReactNode;
}) {
  return (
    // overflow-clip, not hidden: it clips the glow without becoming a scroll
    // container, so sticky columns inside still stick.
    <section id={id} className={`relative scroll-mt-16 overflow-clip ${SURFACE[tone]} ${className}`}>
      {backdrop}
      <Container className="relative">
        <div className={`relative border-x ${HAIRLINE[tone]} ${opens ? "border-t" : ""} ${frameClassName}`}>
          {opens && (
            <>
              <Mark tone={tone} className="-top-[5px] -left-[5px]" />
              <Mark tone={tone} className="-top-[5px] -right-[5px]" />
            </>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
}

// Inner padding of a band's content, so every section lines up.
export const PAD = "px-5 py-16 sm:px-10 sm:py-20 lg:px-12";

// Uppercase monospace caption: section notes, column labels, figures.
export function MonoLabel({ children, tone = "paper", className = "" }: { children: ReactNode; tone?: Tone; className?: string }) {
  const color = tone === "night" ? "text-white/55" : "text-ink-500";
  return <p className={`font-mono text-[10px] font-medium tracking-[0.16em] uppercase sm:text-[11px] ${color} ${className}`}>{children}</p>;
}

// Headings: a tight grotesk — the hero's in medium weight, the sections' a
// step bolder.
export const H1 = "font-display text-[2.5rem] leading-[1.04] font-medium tracking-[-0.04em] sm:text-[3.4rem] lg:text-[3.75rem]";
export const H2 = "font-display text-[2rem] leading-[1.06] font-semibold tracking-[-0.04em] sm:text-[2.6rem]";
export const H3 = "font-display text-[1.35rem] leading-[1.2] font-semibold tracking-[-0.03em] sm:text-[1.6rem]";

export function lead(tone: Tone) {
  return `text-sm leading-relaxed sm:text-[15px] ${tone === "night" ? "text-white/60" : "text-ink-500"}`;
}
