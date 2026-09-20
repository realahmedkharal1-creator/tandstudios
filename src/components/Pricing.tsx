import { plans, pricingNote } from "@/data/pricing";
import { site, waLink } from "@/data/site";
import { Button, Icon, Reveal, SectionHead } from "./ui";

/** Packages without prices: every CTA sends the visitor to WhatsApp (or email). */
export default function Pricing() {
  return (
    <section id="pricing" className="section">
      <div className="container-x">
        <SectionHead eyebrow="Packages" title={<>Pick a starting point. We&apos;ll quote the rest.</>} sub={pricingNote} />

        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <article className={`card card-hover relative flex h-full flex-col p-7 ${p.highlight ? "border-brand-line shadow-glow" : ""}`}>
                {p.highlight && <span className="absolute right-6 top-6 rounded-full bg-brand px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-on-brand">Popular</span>}
                <h3 className="h-display text-xl">{p.name}</h3>
                <p className="mt-1 text-sm text-muted">{p.tagline}</p>
                <p className="h-display mt-6 text-2xl text-brand">{p.quoteLine}</p>
                <ul className="mt-7 flex-1 space-y-3 text-sm">
                  {p.features.map((f) => <li key={f} className="flex gap-2.5"><Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />{f}</li>)}
                </ul>
                <Button href={waLink(p.whatsappMessage)} external variant={p.highlight ? "primary" : "ghost"} className="mt-8 w-full">
                  <Icon name="whatsapp" /> {p.cta}
                </Button>
                <a href={`mailto:${site.email}?subject=${encodeURIComponent(`Quote request: ${p.name}`)}`} className="mt-3 text-center text-sm text-muted hover:text-brand">
                  or email us
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
