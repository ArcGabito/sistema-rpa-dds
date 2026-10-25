// The palette tokens from globals.css as hex values: recharts draws SVG and
// takes colors as props, not Tailwind classes.
export const CHART = {
  brand700: "#1d4fc0",
  brand600: "#2563d9",
  brand500: "#3b74e8",
  brand400: "#6797f0",
  brand300: "#9dbcf7",
  brand200: "#c9dafb",
  glow400: "#5b8dff",
  ink950: "#0a0a0b",
  ink500: "#6b6b74",
  ink400: "#a1a1aa",
  line: "#e4e4e7",
} as const;

export const AXIS_TICK = { fill: CHART.ink500, fontSize: 12 };

// Prioritization quadrants (diagnosis): the more urgent, the deeper the blue.
export const CUADRANTE_COLORES: Record<string, string> = {
  quick_win: CHART.brand700,
  estrategico: CHART.brand500,
  mejora_menor: "#8fb4ff",
  postergar: CHART.ink400,
};

const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

// "2026-05" -> "may" (or "may 2026" when asked for the year).
export function mesCorto(mes: string, conAnio = false) {
  const [anio, numero] = mes.split("-");
  const nombre = MESES[Number(numero) - 1] ?? mes;
  return conAnio ? `${nombre} ${anio}` : nombre;
}

// Axis labels: "S/ 85k", "S/ 1.2M". Formatted by hand so server and browser agree.
export function solesCompacto(value: number) {
  if (value >= 1_000_000) return `S/ ${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (value >= 1_000) return `S/ ${Math.round(value / 1_000)}k`;
  return `S/ ${Math.round(value)}`;
}
