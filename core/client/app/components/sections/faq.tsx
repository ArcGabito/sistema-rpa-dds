import { Accordion } from "@/components/ui/accordion";
import { Band, H2, HAIRLINE, Mark, MonoLabel, lead } from "@/components/ui/band";
import { FAQ_ITEMS } from "@/lib/faq-data";

// The home page's questions: a large heading, then the accordion in the
// right-hand column of a hairline grid.
export function Faq() {
  return (
    <Band tone="paper" id="faq">
      <div className="px-5 pt-16 pb-14 sm:px-10 sm:pt-20 lg:px-12">
        <h2 className={`${H2} sm:!text-5xl`}>
          Preguntas
          <br /> frecuentes
        </h2>
        <p className={`mt-6 max-w-md ${lead("paper")}`}>
          Cerramos la brecha entre la tecnología y la operación diaria. Si tienes dudas sobre cómo automatizamos y
          analizamos los procesos de tu empresa, aquí encontrarás las respuestas.
        </p>
      </div>

      <div className={`relative grid border-t lg:grid-cols-[0.75fr_1.25fr] ${HAIRLINE.paper}`}>
        <Mark tone="paper" className="-top-[5px] -left-[5px]" />
        <Mark tone="paper" className="-top-[5px] -right-[5px]" />
        <MonoLabel className="px-5 py-3 sm:px-10 lg:px-4">Conócenos</MonoLabel>
        <div className={`pb-16 lg:border-l lg:pb-24 ${HAIRLINE.paper}`}>
          <div className="lg:pt-6">
            <Accordion items={FAQ_ITEMS} />
          </div>
        </div>
      </div>
    </Band>
  );
}
