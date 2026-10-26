"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { HAIRLINE, type Tone } from "@/components/ui/band";

export type AccordionItem = { question: string; answer: string };

// Numbered questions in hairline rows; the open one shows its answer in a
// row of its own and turns its "+" into an "×".
export function Accordion({
  items,
  defaultOpen = 0,
  tone = "paper",
  start = 1,
}: {
  items: AccordionItem[];
  defaultOpen?: number | null;
  tone?: Tone;
  // The number of the first item (to keep counting across groups).
  start?: number;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const line = HAIRLINE[tone];

  return (
    <div className={`border-b ${line}`}>
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.question} className={`border-t ${line}`}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-5 px-4 py-4 text-left sm:px-5"
            >
              <span className="w-7 shrink-0 font-mono text-[12px] text-ink-400">/{String(start + index).padStart(2, "0")}</span>
              <span className="flex-1 text-[14px] font-medium tracking-[-0.01em] text-ink-950">{item.question}</span>
              <Plus className={`h-4 w-4 shrink-0 text-ink-500 transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className={`border-t px-4 py-5 text-[13px] leading-relaxed text-ink-500 sm:px-5 ${line}`}>{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
