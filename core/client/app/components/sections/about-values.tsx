import { Band, HAIRLINE, MonoLabel } from "@/components/ui/band";
import { VALUES } from "@/lib/values";

const CELL_BORDERS = [
  "",
  "border-t sm:border-t-0 sm:border-l",
  "border-t lg:border-t-0 lg:border-l",
  "border-t sm:border-l lg:border-t-0",
];

// The team's four values, one per cell.
export function AboutValues() {
  return (
    <Band tone="mist">
      <MonoLabel className="px-5 pt-10 sm:px-10 lg:px-12">Cómo trabajamos</MonoLabel>
      <ul className={`mt-6 grid border-t sm:grid-cols-2 lg:grid-cols-4 ${HAIRLINE.mist}`}>
        {VALUES.map((value, index) => (
          <li key={value} className={`flex gap-3 px-5 py-6 sm:px-6 ${HAIRLINE.mist} ${CELL_BORDERS[index % 4]}`}>
            <span className="font-mono text-[13px] text-ink-400">+</span>
            <span className="text-[15px] leading-snug font-semibold tracking-[-0.01em]">{value}</span>
          </li>
        ))}
      </ul>
    </Band>
  );
}
