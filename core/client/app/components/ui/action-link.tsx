import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

// Text link led by a small round arrow.
// Static on purpose: no hover motion, just the underline.
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
      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${icon}`}>
        <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.5} />
      </span>
      <span className="group-hover:underline">{children}</span>
      {external && <span className="sr-only">(se abre en una pestaña nueva)</span>}
    </>
  );
  const classes = `group inline-flex items-center gap-2 text-sm font-medium ${text} ${className}`;

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
