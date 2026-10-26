import Link from "next/link";
import { Band, HAIRLINE, H3, Mark, MonoLabel, lead } from "@/components/ui/band";
import { IsoScene, type IsoVariant } from "@/components/ui/iso-scene";
import { SERVICES } from "@/lib/services-data";

// Per service: the drawing on its card and the tools under its name.
const CARDS: Record<string, { scene: IsoVariant; tools: string }> = {
  "analitica-de-datos": { scene: "grid", tools: "Power BI · Qlik · Looker" },
  "automatizacion-rpa": { scene: "board", tools: "Rocketbot · Excel · SAP · Oracle" },
  "inteligencia-artificial": { scene: "hub", tools: "Modelos LLM · OCR · Asistentes" },
};

// The three practices, as cards: a label, a drawing, the name and its tools.
export function Expertise() {
  return (
    <Band tone="mist" id="servicios">
      <div className="flex flex-col gap-6 px-5 pt-16 pb-14 sm:px-10 sm:pt-20 lg:flex-row lg:items-start lg:justify-between lg:px-12">
        <div className="max-w-xl">
          <h2 className={H3}>
            Donde el conocimiento del negocio se une a la precisión técnica para entregar impacto real en tu operación.
          </h2>
          <p className={`mt-5 max-w-md ${lead("mist")}`}>
            En DDS combinamos analistas, desarrolladores de automatización y especialistas en IA: un solo equipo que
            entiende tus procesos de principio a fin.
          </p>
        </div>
        <MonoLabel>Un equipo de especialistas.</MonoLabel>
      </div>

      <div className={`relative grid gap-6 border-t px-5 pt-10 pb-16 sm:grid-cols-3 sm:px-4 sm:pb-20 ${HAIRLINE.mist}`}>
        <Mark tone="mist" className="-top-[5px] -left-[5px]" />
        <Mark tone="mist" className="-top-[5px] -right-[5px]" />
        {SERVICES.map((service) => {
          const card = CARDS[service.slug];
          return (
            <Link key={service.slug} href={`/${service.slug}`} className="group">
              <MonoLabel className={`border-t pt-1.5 !text-[10px] !tracking-[0.12em] ${HAIRLINE.mist}`}>+ [ {service.title} ]</MonoLabel>
              <div className="mt-2 flex aspect-square items-center justify-center bg-[#dededf] transition-colors group-hover:bg-[#d6d6d8]">
                <IsoScene variant={card?.scene ?? "board"} tone="light" className="w-[92%]" />
              </div>
              <p className="mt-4 font-display text-[15px] font-semibold tracking-[-0.01em] group-hover:underline">{service.title}</p>
              <MonoLabel className="mt-1.5 !text-[10px] !tracking-[0.1em]">{card?.tools}</MonoLabel>
            </Link>
          );
        })}
      </div>
    </Band>
  );
}
