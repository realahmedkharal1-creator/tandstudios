"use client";
import { useState } from "react";
import { plans, pricingNote } from "@/data/pricing";
import { currency } from "@/lib/data";
import { Button, Icon, Reveal, SectionHead } from "./ui";

export default function Pricing() {
  const [cur, setCur] = useState<"usd" | "pkr">("usd");

  return (
    <section id="pricing" className="section">
      <div className="container-x">
        <SectionHead eyebrow="Pricing" title={<>Clear packages. No surprise invoices.</>} sub={pricingNote} />

        <Reveal>
          <div role="group" aria-label="Currency" className="mb-10 inline-flex rounded-full border border-line bg-surface p-1">
            {(["usd", "pkr"] as const).map((c) => (
              <button key={c} onClick={() => setCur(c)} aria-pressed={cur === c}
                      className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${cur === c ? "bg-brand text-on-brand" : "text-muted hover:text-ink"}`}>
                {c.toUpperCase()}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((p, i) => {
            const price = p[cur];
            return (
              <Reveal key={p.id} delay={i * 0.08}>
                <article className={`card card-hover relative flex h-full flex-col p-7 ${p.highlight ? "border-brand-line shadow-glow" : ""}`}>
                  {p.highlight && <span className="absolute right-6 top-6 rounded-full bg-brand px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-on-brand">Most chosen</span>}
                  <h3 className="h-display text-xl">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted">{p.tagline}</p>
                  <p className="mt-6 flex items-baseline gap-2">
                    {price === null ? (
                      <span className="h-display text-4xl">Custom quote</span>
                    ) : (
                      <><span className="text-sm text-muted">from</span><span className="h-display text-5xl text-brand">{currency[cur](price)}</span></>
                    )}
                  </p>
                  <ul className="mt-7 flex-1 space-y-3 text-sm">
                    {p.features.map((f) => <li key={f} className="flex gap-2.5"><Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />{f}</li>)}
                  </ul>
                  <Button href="#contact" variant={p.highlight ? "primary" : "ghost"} className="mt-8 w-full">{p.cta}</Button>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
