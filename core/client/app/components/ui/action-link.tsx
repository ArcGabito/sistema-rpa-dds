import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

// Uppercase monospace link led by a small square arrow, like the site's
// buttons. Static on purpose: no hover motion, just the underline.
export function ActionLink({
  href,
  children,
  external = false,
  tone = "light",
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  tone?: "light" | "dark";
  className?: string;
}) {
  const text = tone === "dark" ? "text-white" : "text-ink-950";
  const icon = tone === "dark" ? "bg-white text-ink-950" : "bg-ink-950 text-white";
  const content = (
    <>
      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] ${icon}`}>
        <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
      </span>
      <span className="underline-offset-4 group-hover:underline">{children}</span>
      {external && <span className="sr-only">(se abre en una pestaña nueva)</span>}
    </>
  );
  const classes = `group inline-flex items-center gap-2 font-mono text-[11px] font-medium tracking-[0.1em] uppercase ${text} ${className}`;

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {content}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
