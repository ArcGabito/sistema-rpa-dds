import { GlowBackdrop } from "@/components/layout/glow-backdrop";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { FrameMarks } from "@/components/ui/frame-marks";

export function PageHero({
  heading,
  intro,
}: {
  heading: string;
  intro: string;
}) {
  const breadcrumbLabel = heading.replace(/\.$/, "");

  return (
    <section className="relative overflow-hidden">
      <GlowBackdrop glow="horizon" />
      <Container className="relative">
        <div className="relative border-x border-white/10 px-2 pt-14 pb-24 sm:px-6 lg:pt-20 lg:pb-32">
          <FrameMarks tone="dark" />
          <nav className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.08em] text-white/50 uppercase">
            <Link href="/" className="hover:text-white">
              Inicio
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">{breadcrumbLabel}</span>
          </nav>

          <h1 className="mt-8 max-w-4xl text-balance font-display text-4xl leading-[1.05] font-medium tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
            {heading}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
            {intro}
          </p>
        </div>
      </Container>
    </section>
  );
}
