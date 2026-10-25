// Class names shared by the panel's forms and actions: a black primary
// button that sits above the page, hairline secondary buttons, and inputs
// filled in light grey that turn white with a dark edge on focus.
export const BUTTON_PRIMARY =
  "inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[linear-gradient(to_bottom,var(--color-ink-800),var(--color-ink-950))] px-5 text-sm font-medium text-white shadow-button transition-[filter,opacity] hover:brightness-125 disabled:opacity-60";
export const BUTTON_SECONDARY =
  "inline-flex h-10 items-center justify-center gap-2 rounded-md border border-line bg-white px-5 text-sm font-medium text-ink-950 transition-colors hover:bg-brand-50 disabled:opacity-60";
export const BUTTON_DANGER =
  "inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60";

export const INPUT_BASE =
  "h-10 w-full rounded-md border bg-brand-50 px-3 text-sm text-ink-950 outline-none transition-colors placeholder:text-ink-400 focus:bg-white disabled:opacity-60";

export function inputState(hasError: boolean) {
  return hasError ? "border-red-400 focus:border-red-500" : "border-transparent focus:border-ink-400";
}

export const CARD = "rounded-lg bg-white shadow-card";
