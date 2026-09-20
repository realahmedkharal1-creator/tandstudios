"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { faq } from "@/data/faq";
import { Icon, Reveal, SectionHead } from "./ui";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const [lang, setLang] = useState<"en" | "ur">("ur");
  const ur = lang === "ur";

  return (
    <section id="faq" className="section pt-0">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHead eyebrow="FAQ" title={<>Questions we hear a lot.</>} sub="Something missing? Message us on WhatsApp and we'll answer directly." />
          <div role="group" aria-label="FAQ language" className="inline-flex rounded-full border border-line bg-surface p-1">
            {([["ur", "Roman Urdu"], ["en", "English"]] as const).map(([k, label]) => (
              <button key={k} onClick={() => setLang(k)} aria-pressed={lang === k}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${lang === k ? "bg-brand text-on-brand" : "text-muted hover:text-ink"}`}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <Reveal>
          <div className="divide-y divide-line rounded-xl2 border border-line bg-surface">
            {faq.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q}>
                  <h3>
                    <button id={`faq-q-${i}`} aria-expanded={isOpen} aria-controls={`faq-a-${i}`} onClick={() => setOpen(isOpen ? null : i)}
                            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-medium">
                      <span lang={ur ? "ur-Latn" : "en"}>{ur ? f.qUr : f.q}</span>
                      <Icon name="chevron" className={`h-5 w-5 shrink-0 text-brand transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`}
                                  initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25 }} className="overflow-hidden">
                        <p lang={ur ? "ur-Latn" : "en"} className="px-6 pb-6 text-muted">{ur ? f.aUr : f.a}</p>
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
