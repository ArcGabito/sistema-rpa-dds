import { Band, H2, HAIRLINE, MonoLabel } from "@/components/ui/band";
import { WHY_CHOOSE } from "@/lib/why-choose";

// Six reasons in a hairline grid of labelled cells, three per row.
export function AboutWhyChoose() {
  return (
    <Band tone="paper">
      <div className="flex flex-col gap-6 px-5 pt-16 sm:px-10 sm:pt-20 lg:flex-row lg:items-start lg:justify-between lg:px-12">
        <h2 className={`max-w-xl ${H2}`}>¿Por qué elegir Data Discovery Solutions?</h2>
        <MonoLabel className="max-w-[15rem] leading-relaxed lg:text-right">Seis razones para confiarnos tus procesos.</MonoLabel>
      </div>
      <div className={`mt-14 grid border-t sm:grid-cols-2 lg:grid-cols-3 ${HAIRLINE.paper}`}>
        {WHY_CHOOSE.map(({ icon: Icon, title, description }, index) => (
          <div
            key={title}
            className={`border-b ${HAIRLINE.paper} ${index % 2 ? "sm:border-l" : ""} ${index % 3 ? "lg:border-l" : "lg:border-l-0"}`}
          >
            <div className="flex items-center justify-between bg-ink-950/[0.05] px-4 py-2">
              <MonoLabel className="!text-[10px] !tracking-[0.12em]">/{String(index + 1).padStart(2, "0")}</MonoLabel>
              <Icon className="h-3.5 w-3.5 text-ink-400" strokeWidth={1.75} />
            </div>
            <p className="px-4 pt-5 text-[15px] font-semibold tracking-[-0.01em]">{title}</p>
            <p className="px-4 pt-2 pb-8 text-[13px] leading-relaxed text-ink-500">{description}</p>
          </div>
        ))}
      </div>
      <div className="h-16 sm:h-20" />
    </Band>
  );
}
