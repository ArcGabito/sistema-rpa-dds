import { Bot, ChartColumn, ChevronDown, Plus, Sparkles } from "lucide-react";
import { Band, H2, HAIRLINE, MonoLabel, lead } from "@/components/ui/band";

type Column = { label: string; text: string; figure?: string; caption: string };

const COLUMNS: Column[] = [
  { label: "Experiencia", text: "Más de una década transformando la operación de empresas peruanas.", figure: "10+", caption: "Años automatizando procesos" },
  { label: "Confianza", text: "Banca, retail, educación, seguros y logística ya trabajan con nosotros.", figure: "30+", caption: "Empresas que nos eligen" },
  { label: "Resultados", text: "Proyectos con resultados medibles desde el primer piloto.", figure: "97%", caption: "Satisfacción con los proyectos" },
  { label: "Alianza estratégica", text: "No somos solo proveedores: somos socios que entienden tu negocio.", caption: "Analítica, RPA e IA en un solo equipo" },
];

const TEAMS = [ChartColumn, Bot, Sparkles];

// Hairlines between the four cells: stacked on phones, 2 × 2 on tablets,
// one row on desktop.
const CELL_BORDERS = [
  "",
  "border-t sm:border-t-0 sm:border-l",
  "border-t lg:border-t-0 lg:border-l",
  "border-t sm:border-l lg:border-t-0",
];

// Four reasons, each with its figure, in a hairline grid.
export function WhyUs() {
  return (
    <Band tone="paper" id="por-que-dds">
      <div className="flex flex-col gap-6 px-5 pt-16 sm:px-10 sm:pt-20 lg:flex-row lg:items-start lg:justify-between lg:px-12">
        <div>
          <h2 className={H2}>
            Por qué las empresas líderes
            <br className="hidden sm:block" /> trabajan con nosotros.
          </h2>
          <p className={`mt-5 ${lead("paper")}`}>Enfoque humano, tecnología de alto rendimiento.</p>
        </div>
        <MonoLabel className="max-w-[16rem] leading-relaxed lg:text-right">Llevamos la automatización a cada punto clave de tu negocio.</MonoLabel>
      </div>

      <div className={`mt-14 grid border-y sm:grid-cols-2 lg:grid-cols-4 ${HAIRLINE.paper}`}>
        {COLUMNS.map((column, index) => (
          <div
            key={column.label}
            className={`flex flex-col ${HAIRLINE.paper} ${CELL_BORDERS[index]}`}
          >
            <div className="flex items-center justify-between bg-ink-950/[0.05] px-4 py-2">
              <MonoLabel className="!text-[10px] !tracking-[0.12em]">{column.label}</MonoLabel>
              <ChevronDown className="h-3 w-3 text-ink-400" />
            </div>
            <p className="px-4 pt-5 text-[15px] leading-snug font-medium tracking-[-0.01em] text-ink-950 sm:pr-8">{column.text}</p>
            <div className="mt-auto flex items-end justify-between gap-3 px-4 pt-14 pb-5">
              {column.figure ? (
                <span className="font-display text-[2.6rem] leading-none font-medium tracking-[-0.04em]">{column.figure}</span>
              ) : (
                <span className="flex -space-x-2">
                  {TEAMS.map((Icon, i) => (
                    <span key={i} className="flex h-8 w-8 items-center justify-center rounded-full bg-night-950 text-white ring-2 ring-brand-50">
                      <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                    </span>
                  ))}
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink-950 ring-2 ring-brand-50">
                    <Plus className="h-3.5 w-3.5" />
                  </span>
                </span>
              )}
              <MonoLabel className="max-w-[9rem] text-right !text-[9.5px] leading-snug !tracking-[0.1em]">{column.caption}</MonoLabel>
            </div>
          </div>
        ))}
      </div>
      <div className="h-16 sm:h-20" />
    </Band>
  );
}
