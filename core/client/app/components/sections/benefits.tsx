import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { BENEFITS } from "@/lib/benefits";

// Columns of a hairline table, each headed by its number in monospace.
export function Benefits() {
  return (
    <section id="beneficios" className="scroll-mt-24 bg-white py-24">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>Beneficios</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-medium tracking-[-0.02em] text-ink-950 sm:text-4xl">
            ¿Por qué elegir Data Discovery Solutions?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-700">
            Aceleramos la eficiencia de tus procesos con analítica avanzada,
            automatización y soluciones inteligentes.
          </p>
        </div>

        <div className="mt-14 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map(({ icon: Icon, title, description }, index) => (
            <div
              key={title}
              className="flex flex-col border-b border-line py-8 sm:px-6 sm:[&:nth-child(odd)]:border-r lg:border-r lg:[&:nth-child(4n)]:border-r-0 lg:first:pl-0"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] tracking-[0.12em] text-ink-400 uppercase">
                  /{String(index + 1).padStart(2, "0")}
                </span>
                <Icon className="h-5 w-5 text-brand-600" strokeWidth={1.5} />
              </div>
              <h3 className="mt-8 font-display text-lg leading-snug font-medium tracking-[-0.01em] text-ink-950">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">
                {description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
