import { GlowBackdrop } from "@/components/layout/glow-backdrop";
import { Container } from "@/components/ui/container";
import { PRIVACY_LAST_UPDATED } from "@/lib/privacy-data";

export function PrivacyHero() {
  return (
    <section className="relative overflow-hidden pt-14 pb-24 lg:pt-20 lg:pb-32">
      <GlowBackdrop glow="horizon" />
      <Container className="relative text-center">
        <h1 className="font-display text-4xl font-medium tracking-[-0.03em] text-white sm:text-5xl">
          Políticas de Privacidad
        </h1>
        <p className="mt-4 font-mono text-[11px] tracking-[0.08em] text-white/50 uppercase">
          Última actualización: {PRIVACY_LAST_UPDATED}
        </p>
      </Container>
    </section>
  );
}
