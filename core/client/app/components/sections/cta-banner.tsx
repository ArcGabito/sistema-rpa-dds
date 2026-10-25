import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GlowBackdrop } from "@/components/layout/glow-backdrop";
import { Container } from "@/components/ui/container";
import { SITE } from "@/lib/site-config";

// Closing call to action: a rounded dark card lit by a column of blue
// light, floating on the page.
export function CtaBanner({
  heading,
  buttonLabel,
  href = SITE.contactUrl,
}: {
  heading: string;
  buttonLabel: string;
  href?: string;
}) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl px-6 py-20 text-center sm:px-12 sm:py-24">
          <GlowBackdrop glow="beam" />
          <div className="relative">
            <h2 className="mx-auto max-w-3xl text-balance font-display text-3xl leading-tight font-medium tracking-[-0.02em] text-white sm:text-5xl">
              {heading}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-white/65">
              O escríbenos a{" "}
              <a href={`mailto:${SITE.email}`} className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
                {SITE.email}
              </a>
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-2">
              <Link
                href={href}
                className="inline-flex h-11 items-center gap-2 rounded-md bg-white px-6 text-sm font-medium text-ink-950 transition-colors hover:bg-white/85"
              >
                {buttonLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center rounded-md border border-white/15 bg-white/5 px-6 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/10"
              >
                Escríbenos por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
