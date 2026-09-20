import { portfolio } from "@/data/portfolio";
import { site } from "@/data/site";

/** Slider of client store logos (from portfolio.ts). Falls back to platform names if no logos are set. */
export default function Marquee() {
  const logos = portfolio.filter((p) => p.logo);

  if (logos.length === 0) {
    const items = [...site.techMarquee, ...site.techMarquee];
    return (
      <div className="marquee overflow-hidden border-y border-line bg-surface/60 py-5" aria-label="Platforms and technologies we work with">
        <div className="marquee-track flex items-center gap-12">
          {items.map((t, i) => (
            <span key={i} aria-hidden={i >= site.techMarquee.length} className="h-display flex items-center gap-12 whitespace-nowrap text-xl text-muted/80">
              {t}
              <span className="h-1.5 w-1.5 rounded-full bg-brand/70" aria-hidden />
            </span>
          ))}
        </div>
      </div>
    );
  }

  const items = [...logos, ...logos];
  return (
    <section className="border-y border-line bg-surface/60 py-8" aria-label="Stores we have built">
      <p className="eyebrow mb-6 text-center">Stores we&apos;ve built</p>
      <div className="marquee overflow-hidden">
        <ul className="marquee-track flex items-center gap-4" style={{ animationDuration: `${Math.max(30, logos.length * 4)}s` }}>
          {items.map((p, i) => (
            <li key={i} aria-hidden={i >= logos.length} className="flex h-16 w-40 shrink-0 items-center justify-center rounded-xl bg-ink px-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.logo} alt={i < logos.length ? `${p.title} logo` : ""} loading="lazy" decoding="async" className="max-h-10 w-auto max-w-full object-contain" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
