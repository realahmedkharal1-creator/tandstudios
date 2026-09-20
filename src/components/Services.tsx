import { serviceList, why } from "@/data/services";
import { waLink } from "@/data/site";
import { Button, Icon, Reveal, SectionHead } from "./ui";

export default function Services() {
  return (
    <>
      <section id="services" className="section">
        <div className="container-x">
          <SectionHead
            eyebrow="What we do"
            title={<>Four ways we help your shop sell more.</>}
            sub="Pick the one you need. Not sure where to start? Message us and we'll tell you."
          />

          <ol className="grid gap-5 md:grid-cols-2">
            {serviceList.map((s, i) => (
              <li key={s.id}>
                <Reveal delay={(i % 2) * 0.08} className="h-full">
                  <article className={`card card-hover relative flex h-full flex-col p-7 sm:p-8 ${s.main ? "border-brand-line shadow-glow" : ""}`}>
                    <div className="mb-6 flex items-center justify-between gap-3">
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-on-brand"><Icon name={s.icon} className="h-7 w-7" /></span>
                      {s.main ? (
                        <span className="rounded-full bg-brand px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-on-brand">Our main service</span>
                      ) : (
                        <span className="h-display text-3xl text-muted opacity-40" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
                      )}
                    </div>

                    <h3 className="h-display text-2xl sm:text-[1.75rem]">{s.title}</h3>
                    <p className="mt-3 text-sm font-medium text-brand">{s.bestFor}</p>
                    <p className="mt-4 text-base leading-relaxed text-ink/85">{s.blurb}</p>

                    <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted">What you get</p>
                    <ul className="mt-3 space-y-2.5">
                      {s.gets.map((g) => (
                        <li key={g} className="flex gap-3 text-[15px] leading-snug">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand"><Icon name="check" className="h-3 w-3" /></span>
                          {g}
                        </li>
                      ))}
                    </ul>

                    {s.chips && (
                      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Shop types we build for">
                        {s.chips.map((c) => <li key={c} className="rounded-full bg-brand px-2.5 py-1 text-xs font-medium text-on-brand">{c}</li>)}
                      </ul>
                    )}

                    <div className="mt-auto pt-8">
                      <Button href={waLink(s.whatsappMessage)} external variant={s.main ? "primary" : "ghost"} className="w-full sm:w-auto">
                        <Icon name="whatsapp" /> {s.cta}
                      </Button>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="why-title">
        <div className="container-x">
          <SectionHead eyebrow="Why TandStudios" title={<span id="why-title">A studio that answers your messages.</span>} sub="Online stores are our main work. Here is why shop owners choose us." />
          <div className="grid gap-px overflow-hidden rounded-xl2 border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {why.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.04}>
                <div className="h-full bg-surface p-7 transition-colors hover:bg-surface-2">
                  <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-line text-brand"><Icon name={w.icon} /></span>
                  <h3 className="h-display text-lg">{w.title}</h3>
                  <p className="mt-2 text-sm text-muted">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
