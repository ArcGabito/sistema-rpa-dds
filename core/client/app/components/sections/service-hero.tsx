import { GlowBackdrop } from "@/components/layout/glow-backdrop";
import { ArrowRight, ChevronRight, Phone } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { FrameMarks } from "@/components/ui/frame-marks";
import { SITE } from "@/lib/site-config";

export function ServiceHero({
  heading,
  intro,
}: {
  heading: string;
  intro: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <GlowBackdrop glow="horizon" />
      <Container className="relative">
        <div className="relative grid gap-10 border-x border-white/10 px-2 pt-14 pb-24 sm:px-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:pt-20 lg:pb-32">
          <FrameMarks tone="dark" />
          <div>
            <nav className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.08em] text-white/50 uppercase">
              <Link href="/" className="hover:text-white">
                Inicio
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white">{heading}</span>
            </nav>

            <h1 className="mt-8 max-w-4xl text-balance font-display text-4xl leading-[1.05] font-medium tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
              {heading}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
              {intro}
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <p className="font-mono text-[11px] tracking-[0.12em] text-white/50 uppercase">
              Sesión de exploración
            </p>
            <p className="mt-3 font-display text-lg font-medium text-white">
              Agenda una conversación con nuestro equipo
            </p>
            <a
              href={`tel:${SITE.phone.replace(/\s/g, "")}`}
              className="mt-3 flex items-center gap-2 text-sm text-white/70 hover:text-white"
            >
              <Phone className="h-4 w-4 shrink-0" />
              (+51) {SITE.phoneDisplay.replace(/^\(51\)\s*/, "")}
            </a>
            <Link
              href={SITE.contactUrl}
              className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-medium text-ink-950 transition-colors hover:bg-white/85"
            >
              Solicita una demo gratuita
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
