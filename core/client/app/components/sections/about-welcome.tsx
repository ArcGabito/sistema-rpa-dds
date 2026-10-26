import { Band, HAIRLINE, MonoLabel } from "@/components/ui/band";

// Who DDS is: a statement on the left (the key words in full ink, the rest
// muted), the longer story in blocks on the right.
export function AboutWelcome() {
  const strong = "text-ink-950";
  return (
    <Band tone="paper">
      <div className="grid lg:grid-cols-2">
        <div className="px-5 py-16 sm:px-10 sm:py-20 lg:px-12">
          <MonoLabel>Bienvenido a DDS</MonoLabel>
          <p className="mt-6 font-display text-[1.5rem] leading-[1.25] font-semibold tracking-[-0.03em] text-ink-400 sm:text-[1.9rem]">
            Somos DDS: <span className={strong}>tecnología con propósito</span>, <span className={strong}>soluciones con impacto</span>.
            Combinamos <span className={strong}>experiencia</span> y herramientas de <span className={strong}>última generación</span> para
            ayudarte a decidir mejor, automatizar tus procesos y <span className={strong}>liberar el potencial de tus datos</span>.
          </p>
        </div>

        <div className={`border-t lg:border-t-0 lg:border-l ${HAIRLINE.paper}`}>
          {[
            {
              title: "Lo que hacemos",
              body: "Integramos Power BI, Qlik, Looker, Rocketbot y modelos de IA en soluciones prácticas y escalables, hechas a la medida de cada negocio. Trabajamos con organizaciones de los sectores educativo, hotelero, financiero, de seguros, minero y tecnológico, entregando resultados medibles.",
            },
            {
              title: "Nuestro compromiso",
              body: "Nacimos para cerrar la brecha entre la tecnología y las necesidades reales del negocio. Acompañamos a nuestros clientes durante toda su transformación digital, con soluciones que combinan datos, automatización e IA con empatía y eficiencia.",
            },
            {
              title: "¿Por qué elegir DDS?",
              body: "No solo implementamos tecnología: nos convertimos en tu aliado estratégico. Conocemos a fondo tu negocio, optimizamos tus procesos y te ayudamos a decidir con la información que realmente importa.",
            },
          ].map((block, index) => (
            <div key={block.title} className={`px-5 py-8 sm:px-10 lg:px-8 ${index ? `border-t ${HAIRLINE.paper}` : "lg:pt-20"}`}>
              <p className="flex gap-4 text-[15px] font-semibold tracking-[-0.01em]">
                <span className="font-mono text-[13px] font-normal text-ink-400">/{String(index + 1).padStart(2, "0")}</span>
                {block.title}
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-ink-500 sm:pl-10">{block.body}</p>
            </div>
          ))}
        </div>
      </div>
    </Band>
  );
}
