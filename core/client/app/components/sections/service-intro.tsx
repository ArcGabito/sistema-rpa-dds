import { Band, H2, HAIRLINE, Mark, lead } from "@/components/ui/band";
import type { Service } from "@/lib/services-data";

// What the service is, on the left; what it achieves, as numbered lines on
// the right.
export function ServiceIntro({ service }: { service: Service }) {
  return (
    <Band tone="paper">
      <div className="grid lg:grid-cols-2">
        <div className="px-5 py-16 sm:px-10 sm:py-20 lg:px-12">
          <h2 className={`text-balance ${H2}`}>{service.introHeading}</h2>
          <div className={`mt-6 flex max-w-md flex-col gap-4 ${lead("paper")}`}>
            {service.introBody.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className={`border-t px-5 pt-12 pb-16 sm:px-10 lg:border-t-0 lg:border-l lg:px-0 lg:pt-20 ${HAIRLINE.paper}`}>
          <p className="font-display text-sm font-semibold tracking-[-0.01em] uppercase lg:px-4">Lo que logras</p>
          <ol className={`relative mt-6 border-b ${HAIRLINE.paper}`}>
            {service.highlights.map((highlight, index) => (
              <li key={highlight.title} className={`flex gap-5 border-t py-5 lg:px-4 ${HAIRLINE.paper}`}>
                <span className="font-mono text-[13px] text-ink-400">/{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-[15px] font-semibold tracking-[-0.01em]">{highlight.title}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink-500">{highlight.description}</p>
                </div>
              </li>
            ))}
            <Mark tone="paper" className="-bottom-[5px] -left-[5px]" />
            <Mark tone="paper" className="-right-[5px] -bottom-[5px]" />
          </ol>
        </div>
      </div>
    </Band>
  );
}
