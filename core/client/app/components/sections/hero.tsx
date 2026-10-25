import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { GlowBackdrop } from "@/components/layout/glow-backdrop";
import { FrameMarks } from "@/components/ui/frame-marks";
import { CLIENTS } from "@/lib/clients";
import { SITE } from "@/lib/site-config";

// Centered over the horizon glow, inside a hairline frame, with a strip of
// clients sitting on the light at the bottom.
export function Hero() {
  return (
    <section id="top" className="relative scroll-mt-24 overflow-hidden">
      <GlowBackdrop glow="horizon" />

      <Container className="relative">
        <div className="relative border-x border-white/10 px-2 pt-20 pb-28 text-center sm:pt-28 sm:pb-40">
          <FrameMarks tone="dark" />

          <span className="inline-flex items-center rounded-full bg-white px-3 py-1 font-mono text-[10px] font-medium tracking-[0.12em] text-ink-950 uppercase">
            {SITE.tagline}
          </span>
          <h1 className="mx-auto mt-7 max-w-4xl text-balance font-display text-[2.6rem] leading-[1.05] font-medium tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
            Soluciones inteligentes en Analítica, RPA e IA
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            Más de 30 organizaciones ya confían en nosotros para transformar
            sus operaciones y potenciar su crecimiento.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <a
              href="#servicios"
              className="inline-flex h-11 items-center gap-3 rounded-md border border-white/15 bg-white/5 pr-1.5 pl-5 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              Explorar servicios
              <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-white text-ink-950">
                <ArrowRight className="h-4 w-4" />
              </span>
            </a>
            <Link
              href={SITE.contactUrl}
              className="inline-flex h-11 items-center rounded-md px-5 text-sm font-medium text-white/75 transition-colors hover:text-white"
            >
              Solicitar diagnóstico
            </Link>
          </div>
        </div>

        <div className="relative grid gap-6 border-x border-t border-white/10 px-2 py-8 sm:grid-cols-[12rem_1fr] sm:items-center sm:px-6">
          <p className="text-center text-sm leading-snug text-white/80 sm:text-left">
            Más de 30 empresas
            <br className="hidden sm:block" /> confían en DDS
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:justify-between">
            {CLIENTS.slice(0, 7).map((name) => (
              <li key={name} className="font-display text-base font-medium tracking-[-0.02em] text-white sm:text-lg">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
