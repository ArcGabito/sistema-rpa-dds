// Small "+" marks on the corners of a hairline frame, like registration
// marks on a blueprint. The parent must be relative.
const CORNERS = ["-top-[5px] -left-[5px]", "-top-[5px] -right-[5px]", "-bottom-[5px] -left-[5px]", "-bottom-[5px] -right-[5px]"];

export function FrameMarks({ tone = "light" }: { tone?: "light" | "dark" }) {
  const color = tone === "dark" ? "text-white/40" : "text-ink-400";
  return (
    <>
      {CORNERS.map((corner) => (
        <svg
          key={corner}
          viewBox="0 0 9 9"
          className={`pointer-events-none absolute h-[9px] w-[9px] ${corner} ${color}`}
          aria-hidden="true"
        >
          <path d="M4.5 0v9M0 4.5h9" stroke="currentColor" strokeWidth="1" />
        </svg>
      ))}
    </>
  );
}
