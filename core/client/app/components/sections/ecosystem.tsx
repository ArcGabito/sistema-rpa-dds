"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Band, H2, HAIRLINE, lead } from "@/components/ui/band";
import { IsoScene, type IsoVariant } from "@/components/ui/iso-scene";
import { ArrowButton } from "@/components/ui/site-buttons";
import { PROCESS_STEPS } from "@/lib/process-steps";
import { SITE } from "@/lib/site-config";

const SCENES: IsoVariant[] = ["board", "hub", "grid", "stack"];
const TABS = ["Diagnosticamos", "Diseñamos", "Planificamos", "Implementamos"];

const BOTTOM_GLOW =
  "radial-gradient(45% 100% at 55% 100%, rgb(59 130 246 / 0.55) 0%, rgb(29 78 216 / 0.18) 45%, rgb(19 19 21 / 0) 75%)";

// How a project runs, on a dark band: a sticky column with the steps as
// tabs, and one drawing per step; the tab follows the step in view.
export function Ecosystem() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <Band
      tone="night"
      id="proceso"
      backdrop={<div className="pointer-events-none absolute inset-x-0 bottom-0 h-48" style={{ backgroundImage: BOTTOM_GLOW }} aria-hidden="true" />}
    >
      <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
        <div className={`border-b lg:border-r lg:border-b-0 ${HAIRLINE.night}`}>
          <div className="h-28 bg-[linear-gradient(to_bottom,#7fb0ff_0%,#3c78ea_40%,rgb(19_19_21/0)_100%)] sm:h-40" aria-hidden="true" />
          <div className="px-5 pb-12 sm:px-10 lg:sticky lg:top-6 lg:px-8 lg:pb-20">
            <h2 className={`-mt-4 ${H2}`}>
              Un solo equipo, de punta a punta. Automatiza sin límites.
            </h2>
            <p className={`mt-6 max-w-sm ${lead("night")}`}>
              Integramos automatización, analítica e IA en cada área de tu negocio con un proceso claro, medible y
              acompañado en cada etapa.
            </p>
            <ArrowButton href={SITE.contactUrl} className="mt-8">
              Hablemos de tu proceso
            </ArrowButton>

            <ol className="mt-10 flex flex-col">
              {TABS.map((tab, index) => {
                const isActive = index === active;
                return (
                  <li key={tab}>
                    <button
                      type="button"
                      onClick={() => refs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" })}
                      className={`flex w-full items-center justify-between border-l-2 px-3 py-2.5 text-left text-[13px] transition-colors ${
                        isActive ? "border-white text-white" : "border-transparent text-white/45 hover:text-white/80"
                      }`}
                    >
                      {tab}
                      {isActive && <ArrowRight className="h-3.5 w-3.5" />}
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <div className="flex flex-col gap-14 px-5 py-14 sm:px-10 lg:px-8 lg:py-20">
          {PROCESS_STEPS.map((step, index) => (
            <article
              key={step.title}
              ref={(el) => {
                refs.current[index] = el;
              }}
              data-index={index}
            >
              <div className="flex aspect-[16/9] items-center justify-center bg-night-900 ring-1 ring-white/[0.06] ring-inset">
                <IsoScene variant={SCENES[index % SCENES.length]} className="w-[88%]" />
              </div>
              <h3 className="mt-6 text-[15px] font-semibold tracking-[-0.01em] text-white">{step.title}</h3>
              <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-white/50">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </Band>
  );
}
