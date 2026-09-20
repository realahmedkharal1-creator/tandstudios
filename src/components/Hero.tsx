import { site } from "@/data/site";
import { Button, Counter, Icon, Reveal } from "./ui";
import HeroVisual from "./HeroVisual";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-36 grain">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-brand opacity-[0.07] blur-[120px]" aria-hidden />

      <div className="container-x relative grid items-center gap-14 pb-20 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" /> {site.micro.quote} · {site.micro.noCommitment}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="h-display text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-7xl">
              Stores that sell.
              <br />
              <span className="text-brand">Software</span> that fits your shop.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-lg text-muted">
              Shopify &amp; WooCommerce stores, custom POS software, and Facebook &amp; TikTok ads, built by the person you&apos;ll actually talk to.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="#contact">Get a Free Quote <Icon name="arrow" className="h-4 w-4" /></Button>
              <Button href="#work" variant="ghost">See Our Work</Button>
            </div>
            <p className="mt-4 text-sm text-muted">{site.micro.whatsapp}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:max-w-lg">
              {site.trustSignals.map((t) => (
                <li key={t} className="flex items-center gap-2 text-ink/90">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-soft text-brand"><Icon name="check" className="h-3 w-3" /></span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15}><HeroVisual /></Reveal>
      </div>

      {site.stats.length > 0 && (
        <div className="container-x relative pb-16">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl2 border border-line bg-line md:grid-cols-4">
            {site.stats.map((s) => (
              <div key={s.label} className="flex flex-col bg-surface px-5 py-6">
                <dt className="order-2 text-xs text-muted">{s.label}</dt>
                <dd className="h-display mb-1 text-4xl text-brand"><Counter value={s.value} suffix={s.suffix} /></dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
}
