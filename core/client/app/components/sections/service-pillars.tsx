import { ChevronDown } from "lucide-react";
import { Band, H2, HAIRLINE, MonoLabel, lead } from "@/components/ui/band";
import type { Service } from "@/lib/services-data";

// Hairlines between the four cells: stacked on phones, 2 × 2 on tablets,
// one row on desktop.
const CELL_BORDERS = [
  "",
  "border-t sm:border-t-0 sm:border-l",
  "border-t lg:border-t-0 lg:border-l",
  "border-t sm:border-l lg:border-t-0",
];

// The service's four pillars as a hairline grid of labelled columns.
export function ServicePillars({ service }: { service: Service }) {
  return (
    <Band tone="mist">
      <div className="flex flex-col gap-6 px-5 pt-16 sm:px-10 sm:pt-20 lg:flex-row lg:items-end lg:justify-between lg:gap-16 lg:px-12">
        <h2 className={`max-w-2xl text-balance ${H2}`}>{service.pillarsHeading}</h2>
        <p className={`max-w-sm ${lead("mist")}`}>{service.pillarsIntro}</p>
      </div>

      <div className={`mt-14 grid border-y sm:grid-cols-2 lg:grid-cols-4 ${HAIRLINE.mist}`}>
        {service.pillars.map((pillar, index) => (
          <div key={pillar.title} className={`flex flex-col ${HAIRLINE.mist} ${CELL_BORDERS[index % 4]}`}>
            <div className="flex items-center justify-between bg-ink-950/[0.05] px-4 py-2">
              <MonoLabel className="!text-[10px] !tracking-[0.12em]">Pilar {String(index + 1).padStart(2, "0")}</MonoLabel>
              <ChevronDown className="h-3 w-3 text-ink-400" />
            </div>
            <p className="px-4 pt-5 text-[15px] font-semibold tracking-[-0.01em]">{pillar.title}</p>
            <p className="px-4 pt-2 pb-8 text-[13px] leading-relaxed text-ink-500">{pillar.description}</p>
          </div>
        ))}
      </div>
      <div className="h-16 sm:h-20" />
    </Band>
  );
}
