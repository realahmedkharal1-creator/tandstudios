import { services, why } from "@/data/services";
import { Button, Icon, Reveal, SectionHead } from "./ui";

function Includes({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-2.5 text-sm text-ink/85">
      {items.map((i) => (
        <li key={i} className="flex gap-2.5">
          <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {i}
        </li>
      ))}
    </ul>
  );
}

function Badge({ icon, children }: { icon: string; children: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand"><Icon name={icon} /></span>
      <span className="eyebrow">{children}</span>
    </div>
  );
}

export default function Services() {
  const { store, software, web, fix } = services;
  return (
    <>
      <section id="services" className="section">
        <div className="container-x">
          <SectionHead eyebrow="What we build" title={<>Three things, done properly.</>} sub="Pick one or combine them. Every project is scoped and priced before we start." />

          <div className="grid gap-5 lg:grid-cols-12">
            {/* Lead service: Shopify / e-commerce is the main offer, so it goes first and full width */}
            <Reveal className="lg:col-span-12">
              <article className="card card-hover relative grid gap-8 overflow-hidden border-brand-line/60 p-7 sm:p-9 lg:grid-cols-[1.1fr_1fr]">
                <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand opacity-[0.09] blur-[90px]" aria-hidden />
                <div className="relative">
                  <div className="mb-5 flex flex-wrap items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand"><Icon name={store.icon} /></span>
                    <span className="eyebrow">{store.kicker}</span>
                    <span className="rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-on-brand">Our main service</span>
                  </div>
                  <h3 className="h-display text-3xl sm:text-4xl">{store.title}</h3>
                  <p className="mt-4 max-w-xl text-muted">{store.blurb}</p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Button href="#contact">Get a Shopify quote</Button>
                    <Button href="#work" variant="ghost">See store work</Button>
                  </div>
                </div>
                <div className="relative"><ul className="grid gap-3 text-sm text-ink/85 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {store.includes.map((i) => (
                    <li key={i} className="flex gap-2.5 rounded-xl border border-line bg-bg/60 p-4">
                      <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {i}
                    </li>
                  ))}
                </ul></div>
              </article>
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-7">
              <article className="card card-hover relative h-full overflow-hidden border-brand-line/60 p-7">
                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand opacity-[0.08] blur-[80px]" aria-hidden />
                <Badge icon={software.icon}>{software.kicker}</Badge>
                <h3 className="h-display text-3xl">{software.title}</h3>
                <p className="mt-3 max-w-xl text-muted">{software.blurb}</p>
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {software.useCases.map((u, i) => (
                    <li key={u.title} className={`rounded-xl border border-line bg-bg/60 p-4 ${i === software.useCases.length - 1 ? "border-dashed sm:col-span-2" : ""}`}>
                      <div className="mb-1.5 flex items-center gap-2 font-medium"><Icon name={u.icon} className="h-4 w-4 text-brand" />{u.title}</div>
                      <p className="text-sm text-muted">{u.text}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-7"><Button href="#contact">Tell us how your shop works</Button></div>
              </article>
            </Reveal>

            <Reveal delay={0.12} className="lg:col-span-5">
              <article className="card card-hover h-full p-7">
                <Badge icon={web.icon}>{web.kicker}</Badge>
                <h3 className="h-display text-2xl">{web.title}</h3>
                <p className="mt-3 text-muted">{web.blurb}</p>
                <Includes items={web.includes} />
              </article>
            </Reveal>

            <Reveal delay={0.16} className="lg:col-span-12">
              <article className="card card-hover flex flex-col items-start justify-between gap-5 p-7 md:flex-row md:items-center">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand"><Icon name={fix.icon} /></span>
                  <div>
                    <p className="eyebrow mb-1">{fix.kicker}</p>
                    <h3 className="h-display text-xl">{fix.title}</h3>
                    <p className="mt-1.5 max-w-2xl text-muted">{fix.blurb}</p>
                  </div>
                </div>
                <Button href="#contact" variant="ghost" className="shrink-0">Get it audited</Button>
              </article>
            </Reveal>
          </div>
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
