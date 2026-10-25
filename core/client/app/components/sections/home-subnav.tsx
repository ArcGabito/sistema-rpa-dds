"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SITE } from "@/lib/site-config";

const SECTIONS = [
  { id: "servicios", label: "Servicios" },
  { id: "nosotros", label: "Nosotros" },
  { id: "sectores", label: "Sectores" },
  { id: "proceso", label: "Proceso" },
  { id: "beneficios", label: "Beneficios" },
  { id: "casos", label: "Casos de éxito" },
  { id: "faq", label: "Preguntas frecuentes" },
];

// Sticky bar height plus a little slack: a section counts as current once
// its top reaches this far down the viewport.
const ACTIVE_OFFSET = 140;

// The home page's own sticky section nav, with the section
// currently in view underlined.
export function HomeSubnav() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    // The current section is the last one whose top has scrolled past the
    // sticky bar; none while still above the first one. Recomputed at most
    // once per frame.
    let frame = 0;
    const update = () => {
      frame = 0;
      let current: string | null = null;
      for (const { id } of SECTIONS) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= ACTIVE_OFFSET) current = id;
      }
      setActiveId(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav aria-label="Secciones de la página" className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur">
      <Container className="flex h-14 items-center justify-between gap-6">
        <ul className="-mx-3 flex h-full items-stretch overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SECTIONS.map(({ id, label }) => {
            const active = id === activeId;
            return (
              <li key={id} className="flex">
                <a
                  href={`#${id}`}
                  aria-current={active ? "location" : undefined}
                  className={`flex items-center px-3 font-mono text-[11px] font-medium tracking-[0.08em] whitespace-nowrap uppercase transition-colors ${
                    active
                      ? "text-ink-950 shadow-[inset_0_-2px_0_var(--color-ink-950)]"
                      : "text-ink-500 hover:text-ink-950"
                  }`}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
        <Link
          href={SITE.contactUrl}
          className="hidden h-8 shrink-0 items-center rounded-full bg-ink-950 px-4 font-mono text-[11px] font-medium tracking-[0.08em] text-white uppercase transition-colors hover:bg-ink-800 md:inline-flex"
        >
          Solicita tu asesoría
        </Link>
      </Container>
    </nav>
  );
}
