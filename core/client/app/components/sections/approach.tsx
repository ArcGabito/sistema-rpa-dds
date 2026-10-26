import { Band, H2, HAIRLINE, Mark, lead } from "@/components/ui/band";

const POINTS = [
  { text: "Diagnóstico de procesos", strong: "basado en datos, sin suposiciones." },
  { text: "Bots y modelos probados", strong: "listos para producción." },
  { text: "De tus sistemas actuales al reporte final", strong: "de punta a punta." },
  { text: "Costos transparentes", strong: "crecimiento medible." },
];

// What DDS stands for, in one heading and four numbered lines.
export function Approach() {
  return (
    <Band tone="paper" id="enfoque">
      <div className="grid lg:grid-cols-2">
        <div className="px-5 py-16 sm:px-10 sm:py-20 lg:px-12">
          <h2 className={H2}>
            Enfocados en resultados,
            <br className="hidden sm:block" /> no en complejidad.
          </h2>
          <p className={`mt-6 max-w-sm ${lead("paper")}`}>
            Traducimos el potencial de la automatización y la IA en mejoras operativas concretas.
            Sin humo: impacto directo en tu operación.
          </p>
        </div>

        <div className={`border-t px-5 pt-12 pb-16 sm:px-10 lg:border-t-0 lg:border-l lg:px-0 lg:pt-20 ${HAIRLINE.paper}`}>
          <p className="font-display text-sm font-semibold tracking-[-0.01em] uppercase lg:px-4">Lo que nos diferencia</p>
          <ol className={`relative mt-6 border-b ${HAIRLINE.paper}`}>
            {POINTS.map((point, index) => (
              <li key={point.text} className={`flex gap-5 border-t py-4 text-[13px] lg:px-4 ${HAIRLINE.paper}`}>
                <span className="font-mono text-ink-400">/{String(index + 1).padStart(2, "0")}</span>
                <span className="text-ink-500">
                  {point.text} —{" "}
                  <span className="font-mono text-[12px] font-semibold tracking-[0.04em] text-ink-950 uppercase">{point.strong}</span>
                </span>
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
