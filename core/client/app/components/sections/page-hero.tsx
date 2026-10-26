import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ArrowButton } from "@/components/ui/site-buttons";

const GLOW = [
  "radial-gradient(70% 90% at 50% 100%, #9cc3ff 0%, #4f8cf5 24%, rgb(37 99 235 / 0.6) 48%, rgb(29 78 216 / 0) 78%)",
  "linear-gradient(to bottom, rgb(19 19 21 / 0) 0%, rgb(30 64 175 / 0.25) 65%, rgb(59 130 246 / 0.7) 100%)",
].join(", ");

// The inner pages' header: like the home hero, centred over the blue
// horizon — a white badge (the page, or a note such as a date), the
// heading, an intro and an optional call to action.
export function PageHero({
  heading,
  intro,
  label,
  action,
}: {
  heading: string;
  intro?: string;
  label?: string;
  action?: { href: string; label: string };
}) {
  const badge = label ?? heading.replace(/\.$/, "");

  return (
    <section className="relative overflow-hidden bg-night-950">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%]" style={{ backgroundImage: GLOW }} aria-hidden="true" />
      <div className="grain pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
      <Container className="relative">
        <div className="relative border-x border-white/[0.08] px-4 pt-14 pb-24 text-center sm:pt-20 sm:pb-32">
          <nav className="flex justify-center" aria-label="Ruta">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 font-mono text-[10px] font-medium tracking-[0.14em] text-ink-950 uppercase">
              <Link href="/" className="text-ink-500 hover:text-ink-950">
                Inicio
              </Link>
              <span className="text-ink-400">/</span>
              {badge}
            </span>
          </nav>
          <h1 className="mx-auto mt-7 max-w-4xl text-balance font-display text-[2.4rem] leading-[1.05] font-medium tracking-[-0.04em] text-white sm:text-5xl lg:text-[3.4rem]">
            {heading}
          </h1>
          {intro && <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/60 sm:text-[15px]">{intro}</p>}
          {action && (
            <div className="mt-9">
              <ArrowButton href={action.href}>{action.label}</ArrowButton>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
