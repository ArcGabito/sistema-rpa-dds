// A near-black surface lit by a blue glow, under a film grain: the backdrop
// of every dark band — the public heroes, the login panel, the process and
// call-to-action bands, the footer and the dashboard sidebar.
//
// - "horizon": a wide glow rising from the bottom edge, like light over a
//   horizon (the page heroes, with text above it).
// - "beam": a soft column of light through the middle (the login panel and
//   the call-to-action card).
// - "low": a faint glow pooled at the bottom, for long bands where the
//   light should stay out of the way of the content.
type Glow = "horizon" | "beam" | "low";

const GLOWS: Record<Glow, string> = {
  horizon: [
    "radial-gradient(60% 38% at 50% 100%, rgb(143 180 255 / 0.9) 0%, rgb(59 116 232 / 0.75) 30%, rgb(29 79 192 / 0) 100%)",
    "radial-gradient(95% 70% at 50% 110%, rgb(37 99 217 / 0.6) 0%, rgb(29 79 192 / 0.2) 45%, rgb(10 10 11 / 0) 75%)",
  ].join(", "),
  beam: [
    "radial-gradient(42% 60% at 50% 62%, rgb(59 130 246 / 0.75) 0%, rgb(30 95 190 / 0.4) 40%, rgb(10 10 11 / 0) 80%)",
    "linear-gradient(to bottom, #2a2a2e 0%, #121214 45%, #0a0a0b 100%)",
  ].join(", "),
  low: "radial-gradient(70% 45% at 30% 110%, rgb(37 99 217 / 0.45) 0%, rgb(29 79 192 / 0.12) 50%, rgb(10 10 11 / 0) 80%)",
};

export function GlowBackdrop({ glow = "horizon", className = "" }: { glow?: Glow; className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden bg-ink-950 ${className}`} aria-hidden="true">
      <div className="absolute inset-0" style={{ backgroundImage: GLOWS[glow] }} />
      <div className="grain absolute inset-0 opacity-40" />
    </div>
  );
}
