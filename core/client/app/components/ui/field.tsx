import type { ReactNode } from "react";

// Label + control + error for the panel's forms. The control itself is
// passed as children, so it can be an input, a select or a textarea wired to
// react-hook-form; give it id={id} and aria-describedby={`${id}-error`}.
export function Field({
  id,
  label,
  error,
  hint,
  optional = false,
  className = "",
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      {/* Uppercase monospace, like the site's labels. */}
      <label htmlFor={id} className="mb-2 flex items-baseline gap-2 font-mono text-[10px] font-medium tracking-[0.12em] text-ink-700 uppercase sm:text-[11px]">
        {label}
        {optional && <span className="tracking-[0.08em] text-ink-400">· Opcional</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 text-xs text-ink-400">{hint}</p>
      )}
    </div>
  );
}
