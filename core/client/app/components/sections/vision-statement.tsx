import { Band, H2, HAIRLINE, MonoLabel, lead } from "@/components/ui/band";

const BOTTOM_GLOW =
  "radial-gradient(50% 100% at 50% 100%, rgb(59 130 246 / 0.45) 0%, rgb(29 78 216 / 0.14) 45%, rgb(19 19 21 / 0) 75%)";

// The vision on a dark band: the heading lit from the top on the left, the
// text on the right.
export function VisionStatement() {
  return (
    <Band
      tone="night"
      backdrop={<div className="pointer-events-none absolute inset-x-0 bottom-0 h-48" style={{ backgroundImage: BOTTOM_GLOW }} aria-hidden="true" />}
    >
      <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
        <div className={`border-b lg:border-r lg:border-b-0 ${HAIRLINE.night}`}>
          <div className="h-24 bg-[linear-gradient(to_bottom,#7fb0ff_0%,#3c78ea_40%,rgb(19_19_21/0)_100%)] sm:h-32" aria-hidden="true" />
          <div className="px-5 pb-12 sm:px-10 lg:px-8 lg:pb-20">
            <MonoLabel tone="night" className="-mt-3">Nuestra visión y propósito</MonoLabel>
            <h2 className={`mt-5 ${H2}`}>Equilibramos los desafíos de hoy con la visión del mañana.</h2>
          </div>
        </div>
        <div className={`flex flex-col gap-5 px-5 py-14 sm:px-10 lg:px-8 lg:pt-36 lg:pb-24 ${lead("night")}`}>
          <p>
            En Data Discovery Solutions acompañamos a organizaciones que buscan crecer de manera sostenible, superando retos
            operativos y transformando su cultura con tecnología estratégica. Nuestros logros se basan en la colaboración profunda
            con nuestros clientes y en un equipo diverso, comprometido y en constante evolución.
          </p>
          <p>
            Contamos con especialistas en analítica, automatización e inteligencia artificial que aplican conocimiento real para
            diseñar soluciones escalables, adaptadas a cada presupuesto y objetivo de negocio.
          </p>
        </div>
      </div>
    </Band>
  );
}
