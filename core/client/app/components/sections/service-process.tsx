import { Band, H2, HAIRLINE, MonoLabel } from "@/components/ui/band";
import type { Service } from "@/lib/services-data";

const CELL_BORDERS = [
  "",
  "border-t sm:border-t-0 sm:border-l",
  "border-t lg:border-t-0 lg:border-l",
  "border-t sm:border-l lg:border-t-0",
];

// How the service is delivered, step by step, in numbered columns.
export function ServiceProcess({ service }: { service: Service }) {
  return (
    <Band tone="paper">
      <div className="flex flex-col gap-6 px-5 pt-16 sm:px-10 sm:pt-20 lg:flex-row lg:items-start lg:justify-between lg:px-12">
        <h2 className={`max-w-xl text-balance ${H2}`}>{service.stepsHeading}</h2>
        <MonoLabel className="max-w-[15rem] leading-relaxed lg:text-right">De la primera reunión al soporte continuo.</MonoLabel>
      </div>
      <ol className={`mt-14 grid border-y sm:grid-cols-2 lg:grid-cols-4 ${HAIRLINE.paper}`}>
        {service.steps.map((step, index) => (
          <li key={step.title} className={`px-4 pt-5 pb-10 ${HAIRLINE.paper} ${CELL_BORDERS[index % 4]}`}>
            <span className="font-mono text-[13px] text-ink-400">/{String(index + 1).padStart(2, "0")}</span>
            <p className="mt-8 text-[15px] font-semibold tracking-[-0.01em]">{step.title}</p>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-500">{step.description}</p>
          </li>
        ))}
      </ol>
      <div className="h-16 sm:h-20" />
    </Band>
  );
}
