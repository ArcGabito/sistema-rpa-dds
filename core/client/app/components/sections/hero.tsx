import Image from "next/image";
import { Container } from "@/components/ui/container";
import { H1, Mark } from "@/components/ui/band";
import { ArrowButton } from "@/components/ui/site-buttons";
import { CLIENTS, logoBlanco } from "@/lib/clients";
import { SITE } from "@/lib/site-config";

// Centred over a blue horizon glow that rises from the bottom edge, inside
// the page frame, with the clients' logos in white on the light below.
const GLOW = [
  "radial-gradient(75% 85% at 50% 100%, #a9cbff 0%, #5b95f7 22%, rgb(37 99 235 / 0.75) 46%, rgb(29 78 216 / 0) 78%)",
  "linear-gradient(to bottom, rgb(19 19 21 / 0) 0%, rgb(30 64 175 / 0.3) 60%, rgb(59 130 246 / 0.9) 100%)",
].join(", ");

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-night-950">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[52%]" style={{ backgroundImage: GLOW }} aria-hidden="true" />
      <div className="grain pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />

      <Container className="relative">
        <div className="border-x border-white/[0.08] px-4 pt-16 pb-28 text-center sm:pt-24 sm:pb-40">
          <span className="inline-flex items-center rounded-full bg-white px-3 py-1 font-mono text-[10px] font-medium tracking-[0.14em] text-ink-950 uppercase">
            {SITE.tagline}
          </span>
          <h1 className={`mx-auto mt-7 max-w-4xl text-balance text-white ${H1}`}>
            Soluciones inteligentes en Analítica, RPA e IA.
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-white/55 sm:text-[15px]">
            Convertimos procesos manuales y datos dispersos en sistemas que trabajan solos.
            Automatización, analítica e inteligencia artificial al ritmo de tu equipo.
          </p>
          <div className="mt-10">
            <ArrowButton href={SITE.contactUrl}>Solicita tu diagnóstico</ArrowButton>
          </div>
        </div>

        <div className="relative grid grid-cols-3 border-x border-t border-white/15 sm:grid-cols-[minmax(10rem,1.2fr)_repeat(6,1fr)]">
          <Mark tone="night" className="-top-[5px] -left-[5px] !text-white/70" />
          <Mark tone="night" className="-top-[5px] -right-[5px] !text-white/70" />
          <p className="col-span-3 px-5 py-5 text-[13px] leading-snug text-white sm:col-span-1 sm:py-7">
            Más de 30 empresas
            <br className="hidden sm:block" /> confían en DDS
          </p>
          {CLIENTS.slice(0, 6).map((client, index) => (
            <div
              key={client.name}
              className={`flex items-center justify-center border-t border-white/15 px-3 py-5 sm:border-t-0 sm:border-l sm:py-7 ${index % 3 ? "border-l" : ""}`}
            >
              <Image src={logoBlanco(client)} alt={client.name} width={150} height={50} className="h-8 w-auto sm:h-9" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
