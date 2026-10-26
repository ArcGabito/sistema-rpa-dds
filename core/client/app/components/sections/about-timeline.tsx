import { Band, H2, HAIRLINE, MonoLabel } from "@/components/ui/band";
import { TIMELINE } from "@/lib/timeline";

const BOTTOM_GLOW =
  "radial-gradient(50% 100% at 50% 100%, rgb(59 130 246 / 0.45) 0%, rgb(29 78 216 / 0.14) 45%, rgb(19 19 21 / 0) 75%)";

// DDS's history on a dark band, one hairline row per milestone.
export function AboutTimeline() {
  return (
    <Band
      tone="night"
      backdrop={<div className="pointer-events-none absolute inset-x-0 bottom-0 h-48" style={{ backgroundImage: BOTTOM_GLOW }} aria-hidden="true" />}
    >
      <div className="flex flex-col gap-6 px-5 pt-16 sm:px-10 sm:pt-20 lg:flex-row lg:items-start lg:justify-between lg:px-12">
        <h2 className={H2}>Nuestra historia</h2>
        <MonoLabel tone="night" className="max-w-[15rem] leading-relaxed lg:text-right">Más de una década en la operación de empresas peruanas.</MonoLabel>
      </div>
      <ol className={`mt-14 border-b ${HAIRLINE.night}`}>
        {TIMELINE.map((milestone) => (
          <li key={milestone.title} className={`grid gap-2 border-t px-5 py-6 sm:grid-cols-[10rem_14rem_1fr] sm:gap-8 sm:px-10 lg:px-12 ${HAIRLINE.night}`}>
            <span className="font-mono text-[12px] tracking-[0.1em] text-white/45 uppercase">{milestone.years}</span>
            <span className="text-[15px] font-semibold tracking-[-0.01em]">{milestone.title}</span>
            <span className="text-[13px] leading-relaxed text-white/55">{milestone.description}</span>
          </li>
        ))}
      </ol>
      <div className="h-20 sm:h-24" />
    </Band>
  );
}
