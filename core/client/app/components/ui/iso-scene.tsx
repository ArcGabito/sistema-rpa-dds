// Isometric line drawings of systems — boards, hubs, tables and stacked
// layers wired to small node tiles — in the site's blueprint style. Drawn
// flat and projected onto an isometric plane: the matrix maps a plane
// point (x, y) to the screen, x running down-right and y down-left.
export type IsoVariant = "board" | "hub" | "grid" | "stack";

const PLANE = "matrix(0.866 0.5 -0.866 0.5 280 150)";

function Node({ x, y, dot = "circle" }: { x: number; y: number; dot?: "circle" | "square" | "ring" }) {
  return (
    <g>
      <rect x={x - 17} y={y - 17} width="34" height="34" rx="6" className="fill-[var(--iso-fill)]" stroke="currentColor" />
      {dot === "circle" && <circle cx={x} cy={y} r="5" fill="currentColor" />}
      {dot === "square" && <rect x={x - 5} y={y - 5} width="10" height="10" rx="2" fill="currentColor" />}
      {dot === "ring" && <circle cx={x} cy={y} r="6" fill="none" stroke="currentColor" strokeWidth="2.5" />}
    </g>
  );
}

function Board() {
  return (
    <g transform={PLANE}>
      <rect x="-150" y="-95" width="300" height="190" rx="12" stroke="currentColor" className="fill-[var(--iso-fill)]" />
      <rect x="-138" y="-83" width="276" height="166" rx="8" stroke="currentColor" strokeOpacity="0.35" fill="none" />
      <rect x="-15" y="-70" width="140" height="105" rx="6" fill="currentColor" fillOpacity="0.07" stroke="currentColor" strokeOpacity="0.5" />
      <rect x="-125" y="-70" width="95" height="12" rx="6" stroke="currentColor" fill="none" />
      <rect x="-125" y="-48" width="65" height="12" rx="6" stroke="currentColor" fill="none" />
      <rect x="-125" y="45" width="80" height="10" rx="5" stroke="currentColor" fill="none" />
      <rect x="40" y="52" width="85" height="10" rx="5" stroke="currentColor" fill="none" />
      <path d="M150 -60h28M150 35h28M-150 -40h-28M-150 55h-28" stroke="currentColor" />
      <Node x={195} y={-60} />
      <Node x={195} y={35} dot="ring" />
      <Node x={-195} y={-40} dot="square" />
      <Node x={-195} y={55} />
    </g>
  );
}

function Hub() {
  return (
    <>
      <g transform={PLANE}>
        <rect x="-48" y="-48" width="96" height="96" rx="14" stroke="currentColor" strokeDasharray="5 5" fill="none" />
        <path d="M48 0h70M-48 0h-70M0 48v70M0 -48v-70" stroke="currentColor" strokeDasharray="4 5" />
        <Node x={135} y={0} />
        <Node x={-135} y={0} dot="ring" />
        <Node x={0} y={135} dot="square" />
        <Node x={0} y={-135} />
      </g>
      {/* The upright glyph at the centre: a large four-point spark and a
          small one, the usual sign for AI. */}
      <g transform="translate(280 148)" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" className="fill-[var(--iso-fill)]">
        <path d="M0 -34C3 -12 12 -3 34 0C12 3 3 12 0 34C-3 12 -12 3 -34 0C-12 -3 -3 -12 0 -34Z" />
        <path d="M30 -38C31 -31 34 -28 41 -27C34 -26 31 -23 30 -16C29 -23 26 -26 19 -27C26 -28 29 -31 30 -38Z" strokeWidth="2.5" />
      </g>
    </>
  );
}

function Grid() {
  return (
    <g transform={PLANE}>
      <rect x="10" y="-125" width="160" height="95" rx="8" stroke="currentColor" className="fill-[var(--iso-fill)]" />
      <rect x="22" y="-113" width="85" height="10" rx="5" stroke="currentColor" fill="none" />
      <rect x="22" y="-95" width="55" height="10" rx="5" stroke="currentColor" fill="none" />
      <rect x="95" y="-78" width="62" height="38" rx="4" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.5" />
      <rect x="-130" y="-20" width="180" height="84" rx="6" stroke="currentColor" className="fill-[var(--iso-fill)]" />
      <path d="M-130 22h180M-85 -20v84M-40 -20v84M5 -20v84" stroke="currentColor" strokeOpacity="0.6" />
      <circle cx="-108" cy="1" r="4" fill="currentColor" fillOpacity="0.5" />
      <circle cx="-63" cy="43" r="4" fill="currentColor" fillOpacity="0.5" />
      <circle cx="-18" cy="1" r="4" fill="currentColor" fillOpacity="0.5" />
      <path d="M50 22h40v-52" stroke="currentColor" strokeDasharray="4 5" fill="none" />
      <path d="M-108 64v46M-63 64v46M-18 64v46M27 64v46" stroke="currentColor" strokeDasharray="4 5" />
      <Node x={-108} y={128} />
      <Node x={-63} y={128} dot="ring" />
      <Node x={-18} y={128} dot="square" />
      <Node x={27} y={128} />
    </g>
  );
}

function Stack() {
  const layers = [-58, 0, 58];
  return (
    <>
      {layers.map((dy, index) => (
        <g key={dy} transform={`translate(0 ${dy})`}>
          <g transform={PLANE}>
            <rect x="-120" y="-75" width="240" height="150" rx="12" stroke="currentColor" className="fill-[var(--iso-fill)]" strokeOpacity={index === 0 ? 1 : 0.7} />
            {index === 0 && (
              <>
                <rect x="-100" y="-55" width="90" height="12" rx="6" stroke="currentColor" fill="none" />
                <rect x="-100" y="-33" width="60" height="12" rx="6" stroke="currentColor" fill="none" />
                <rect x="20" y="-55" width="80" height="70" rx="6" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.5" />
              </>
            )}
          </g>
        </g>
      ))}
      <path d="M176 92v116M384 92v116" stroke="currentColor" strokeDasharray="4 5" transform="translate(-1 -50)" />
      <g transform={PLANE}>
        <path d="M120 -40h40M-120 30h-40" stroke="currentColor" strokeDasharray="4 5" />
        <Node x={178} y={-40} />
        <Node x={-178} y={30} dot="ring" />
      </g>
    </>
  );
}

const SCENES: Record<IsoVariant, () => React.JSX.Element> = { board: Board, hub: Hub, grid: Grid, stack: Stack };

export function IsoScene({ variant, tone = "night", className = "" }: { variant: IsoVariant; tone?: "night" | "light"; className?: string }) {
  const Scene = SCENES[variant];
  // The tiles and boards are filled with the surface colour, so lines
  // behind them stay hidden.
  const style = { "--iso-fill": tone === "night" ? "#18181b" : "#dededf" } as React.CSSProperties;
  return (
    <svg
      viewBox="0 0 560 300"
      className={`${tone === "night" ? "text-white/60" : "text-ink-950/55"} ${className}`}
      style={style}
      fill="none"
      strokeWidth="1"
      aria-hidden="true"
    >
      <Scene />
    </svg>
  );
}
