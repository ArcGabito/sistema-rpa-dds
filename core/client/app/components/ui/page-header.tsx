import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

// Title block at the top of every panel page: an optional way back, the
// title (with badges beside it), a line of context and the page's actions.
export function PageHeader({
  title,
  description,
  back,
  badges,
  actions,
}: {
  title: string;
  description?: ReactNode;
  back?: { href: string; label: string };
  badges?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div>
      {back && (
        <Link
          href={back.href}
          className="mb-4 inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] text-ink-500 uppercase transition-colors hover:text-ink-950"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {back.label}
        </Link>
      )}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-[1.75rem] leading-tight font-semibold tracking-[-0.035em] text-ink-950 sm:text-[2.1rem]">{title}</h1>
            {badges}
          </div>
          {description && <p className="mt-1.5 text-sm text-ink-500">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}
