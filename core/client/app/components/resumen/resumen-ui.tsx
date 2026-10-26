import type { ReactNode } from "react";
import { ActionLink } from "@/components/ui/action-link";
import { CARD } from "@/components/ui/panel-styles";

// A module's block on the summary: its title, a link into it, its content.
export function SeccionResumen({ titulo, href, enlace, children }: { titulo: string; href: string; enlace: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-display text-xl font-semibold tracking-[-0.03em] text-ink-950">{titulo}</h2>
        <ActionLink href={href}>{enlace}</ActionLink>
      </div>
      {children}
    </section>
  );
}

export type Kpi = { label: string; valor: ReactNode; detalle?: ReactNode; alerta?: boolean };

// Headline figures in one card; the 1px gaps over a line-colored background
// draw the dividers, on two rows or one.
export function KpiStrip({ kpis }: { kpis: Kpi[] }) {
  return (
    <dl className={`${CARD} mt-4 grid grid-cols-2 gap-px overflow-hidden bg-line lg:grid-cols-4`}>
      {kpis.map((k) => (
        <div key={k.label} className="min-w-0 bg-white">
          <dt className="truncate bg-ink-950/[0.04] px-5 py-2 font-mono text-[10px] tracking-[0.12em] text-ink-500 uppercase sm:px-6">{k.label}</dt>
          <dd className={`truncate px-5 pt-5 font-display text-3xl font-medium tracking-[-0.04em] sm:px-6 sm:text-4xl ${k.alerta ? "text-red-600" : "text-ink-950"}`}>{k.valor}</dd>
          <dd className="px-5 pt-1 pb-5 text-xs text-ink-400 sm:px-6">{k.detalle ?? "\u00a0"}</dd>
        </div>
      ))}
    </dl>
  );
}
