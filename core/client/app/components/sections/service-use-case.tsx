"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Band, H2, HAIRLINE, MonoLabel, lead } from "@/components/ui/band";

export type ServiceUseCaseItem = {
  icon: ReactNode;
  title: string;
  description: string;
  bullets: string[];
};

const BOTTOM_GLOW =
  "radial-gradient(45% 100% at 55% 100%, rgb(59 130 246 / 0.5) 0%, rgb(29 78 216 / 0.16) 45%, rgb(19 19 21 / 0) 75%)";

// Use cases on a dark band: the list as tabs in a column lit from the top,
// the chosen case in detail beside it.
export function ServiceUseCase({
  heading,
  intro,
  useCases,
}: {
  heading: string;
  intro: string;
  useCases: ServiceUseCaseItem[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = useCases[activeIndex];

  return (
    <Band
      tone="night"
      backdrop={<div className="pointer-events-none absolute inset-x-0 bottom-0 h-48" style={{ backgroundImage: BOTTOM_GLOW }} aria-hidden="true" />}
    >
      <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
        <div className={`border-b lg:border-r lg:border-b-0 ${HAIRLINE.night}`}>
          <div className="h-24 bg-[linear-gradient(to_bottom,#7fb0ff_0%,#3c78ea_40%,rgb(19_19_21/0)_100%)] sm:h-32" aria-hidden="true" />
          <div className="px-5 pb-12 sm:px-10 lg:px-8 lg:pb-20">
            <h2 className={`-mt-3 text-balance ${H2}`}>{heading}</h2>
            <p className={`mt-5 max-w-sm ${lead("night")}`}>{intro}</p>
            <ol className="mt-10 flex flex-col">
              {useCases.map((useCase, index) => {
                const isActive = index === activeIndex;
                return (
                  <li key={useCase.title}>
                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-pressed={isActive}
                      className={`flex w-full items-center justify-between border-l-2 px-3 py-2.5 text-left text-[13px] transition-colors ${
                        isActive ? "border-white text-white" : "border-transparent text-white/45 hover:text-white/80"
                      }`}
                    >
                      {useCase.title}
                      {isActive && <ArrowRight className="h-3.5 w-3.5 shrink-0" />}
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <div className="px-5 py-14 sm:px-10 lg:px-8 lg:py-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.title}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-night-900 p-6 ring-1 ring-white/[0.06] ring-inset sm:p-10"
            >
              <MonoLabel tone="night">Caso de uso {String(activeIndex + 1).padStart(2, "0")}</MonoLabel>
              <div className="mt-6 flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] bg-white text-ink-950">{active.icon}</span>
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.02em]">{active.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/55">{active.description}</p>
                </div>
              </div>
              <ul className={`mt-8 border-b ${HAIRLINE.night}`}>
                {active.bullets.map((bullet, index) => (
                  <li key={bullet} className={`flex gap-5 border-t py-3.5 text-[13px] text-white/75 ${HAIRLINE.night}`}>
                    <span className="font-mono text-white/35">/{String(index + 1).padStart(2, "0")}</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Band>
  );
}
