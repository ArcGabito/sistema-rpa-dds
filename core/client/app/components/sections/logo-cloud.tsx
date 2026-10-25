import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FrameMarks } from "@/components/ui/frame-marks";
import { ClientLogo } from "@/components/ui/client-logo";
import { StatCounter } from "@/components/ui/stat-counter";
import { CLIENTS } from "@/lib/clients";

// The customer wall as a hairline grid, one logo per cell.
export function LogoCloud() {
  return (
    <section className="bg-brand-50 py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <Eyebrow>Confían en nosotros</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-3xl leading-tight font-medium tracking-[-0.02em] text-ink-950 sm:text-4xl">
              Suite integral de soluciones para digitalizar y transformar tu
              negocio
            </h2>
          </div>

          <dl className="flex gap-12 lg:justify-end">
            <div>
              <dt className="font-display text-5xl font-medium tracking-[-0.03em] text-ink-950">
                <StatCounter target={30} suffix="+" />
              </dt>
              <dd className="mt-2 max-w-[11rem] font-mono text-[11px] leading-snug tracking-[0.06em] text-ink-500 uppercase">
                empresas confiaron en nuestras soluciones
              </dd>
            </div>
            <div>
              <dt className="font-display text-5xl font-medium tracking-[-0.03em] text-ink-950">
                <StatCounter target={97} suffix="%" />
              </dt>
              <dd className="mt-2 max-w-[11rem] font-mono text-[11px] leading-snug tracking-[0.06em] text-ink-500 uppercase">
                de satisfacción con los proyectos entregados
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative mt-12 border-t border-l border-line">
          <FrameMarks />
          <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
            {CLIENTS.map((client) => (
              <li key={client.name} className="flex h-20 items-center justify-center border-r border-b border-line px-3">
                <ClientLogo client={client} className="h-11" />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
