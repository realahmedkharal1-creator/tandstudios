"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { faq } from "@/data/faq";
import { Icon, Reveal, SectionHead } from "./ui";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section pt-0">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHead eyebrow="FAQ" title={<>Questions we hear a lot.</>} sub="Something missing? Message us on WhatsApp and we'll answer directly." />
        <Reveal>
          <div className="divide-y divide-line rounded-xl2 border border-line bg-surface">
            {faq.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q}>
                  <h3>
                    <button id={`faq-q-${i}`} aria-expanded={isOpen} aria-controls={`faq-a-${i}`} onClick={() => setOpen(isOpen ? null : i)}
                            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-medium">
                      {f.q}
                      <Icon name="chevron" className={`h-5 w-5 shrink-0 text-brand transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`}
                                  initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25 }} className="overflow-hidden">
                        <p className="px-6 pb-6 text-muted">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
