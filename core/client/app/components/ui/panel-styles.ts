// Class names shared by the panel's forms and actions, in the public site's
// style: a solid near-black primary button, hairline secondary buttons,
// white inputs with a fine edge that darkens on focus, and cards drawn as
// hairline frames with no depth.
export const BUTTON_PRIMARY =
  "inline-flex h-10 items-center justify-center gap-2 rounded-[7px] bg-night-950 px-5 text-[13px] font-medium tracking-[-0.01em] text-white transition-colors hover:bg-night-800 disabled:opacity-60";
export const BUTTON_SECONDARY =
  "inline-flex h-10 items-center justify-center gap-2 rounded-[7px] bg-white px-5 text-[13px] font-medium tracking-[-0.01em] text-ink-950 ring-1 ring-ink-950/10 ring-inset transition-colors hover:bg-brand-50 hover:ring-ink-950/20 disabled:opacity-60";
export const BUTTON_DANGER =
  "inline-flex h-10 items-center justify-center gap-2 rounded-[7px] px-4 text-[13px] font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60";

export const INPUT_BASE =
  "h-10 w-full rounded-[6px] border bg-white px-3 text-sm text-ink-950 outline-none transition-colors placeholder:text-ink-400 disabled:opacity-60";

export function inputState(hasError: boolean) {
  return hasError ? "border-red-400 focus:border-red-500" : "border-ink-950/10 focus:border-ink-950/40";
}

export const CARD = "bg-white shadow-card";

// Status pills: monospace uppercase, like the site's badges.
export const BADGE_BASE =
  "inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-[3px] font-mono text-[10px] font-medium tracking-[0.08em] whitespace-nowrap uppercase";

// Small uppercase monospace caption above a block (section labels, column
// headers).
export const MONO_LABEL = "font-mono text-[10px] font-medium tracking-[0.14em] text-ink-500 uppercase sm:text-[11px]";
