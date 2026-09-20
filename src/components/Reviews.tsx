"use client";
import Image from "next/image";
import { useRef } from "react";
import { reviewsIntro, serviceLabels, type Testimonial } from "@/data/testimonials";
import { Icon, Reveal, SectionHead } from "./ui";

/** Stars with partial fill, so a 4.8 rating shows 4 full stars and one almost-full star. */
function Stars({ n, label }: { n: number; label?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2" role="img" aria-label={`${n} out of 5 stars`}>
      <span className="flex gap-0.5 text-brand">
        {[0, 1, 2, 3, 4].map((i) => {
          const fill = Math.max(0, Math.min(1, n - i));
          return (
            <span key={i} className="relative inline-block h-4 w-4">
              <Icon name="star" className="absolute inset-0 h-4 w-4 opacity-20" />
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Icon name="star" className="h-4 w-4" />
              </span>
            </span>
          );
        })}
      </span>
      {label && <span className="text-sm font-medium text-ink">{n.toFixed(1)}</span>}
    </span>
  );
}

function Meta({ t }: { t: Testimonial }) {
  return (
    <div className="flex items-center gap-3">
      {t.avatar ? (
        <Image src={t.avatar} alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
      ) : (
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-soft font-semibold text-brand" aria-hidden>{t.name[0]}</span>
      )}
      <div className="min-w-0 text-sm">
        <div className="font-medium">{t.name}</div>
        <div className="truncate text-muted">{[t.role, t.city].filter(Boolean).join(" · ")}</div>
      </div>
    </div>
  );
}

function Tags({ t }: { t: Testimonial }) {
  return (
    <div className="flex flex-wrap gap-1.5 text-[11px]">
      <span className="rounded-full bg-brand-soft px-2.5 py-1 text-brand">{serviceLabels[t.service]}</span>
      {t.businessType && <span className="rounded-full bg-surface-2 px-2.5 py-1 text-muted">{t.businessType}</span>}
      {t.verifiedSource && <span className="rounded-full bg-surface-2 px-2.5 py-1 text-muted">via {t.verifiedSource}</span>}
      {t.isPlaceholder && <span className="rounded-full border border-dashed border-line px-2.5 py-1 text-muted">Sample review</span>}
    </div>
  );
}

export default function Reviews({ reviews, aggregate }: { reviews: Testimonial[]; aggregate: { avg: number; count: number } | null }) {
  const scroller = useRef<HTMLDivElement>(null);
  const featured = reviews[0];
  const rest = reviews.slice(1);
  const hasPlaceholder = reviews.some((r) => r.isPlaceholder);

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section id="reviews" className="section border-y border-line bg-surface/40">
      <div className="container-x">
        <SectionHead
          eyebrow="Client feedback"
          title={hasPlaceholder ? <>What shop owners say <span className="text-muted">(sample layout)</span></> : <>Trusted by shop owners across Pakistan</>}
          sub={hasPlaceholder ? "Sample reviews shown for layout only. Real reviews go in src/data/testimonials.ts." : reviewsIntro}
        />

        {aggregate && (
          <Reveal>
            <p className="mb-8 flex items-center gap-3 text-sm text-muted">
              <Stars n={aggregate.avg} /> <strong className="text-ink">{aggregate.avg.toFixed(1)}</strong> average from {aggregate.count} client review{aggregate.count > 1 ? "s" : ""}
            </p>
          </Reveal>
        )}

        <Reveal>
          {featured.screenshot ? (
            <figure className="card mx-auto max-w-md overflow-hidden p-2"><Image src={featured.screenshot} alt={`Screenshot of a review from ${featured.name}`} width={800} height={1000} className="h-auto w-full rounded-xl" /></figure>
          ) : (
            <figure className="card relative overflow-hidden p-8 sm:p-12">
              <span className="pointer-events-none absolute -top-6 right-6 select-none font-display text-[10rem] leading-none text-brand opacity-10" aria-hidden>&ldquo;</span>
              {featured.rating && <Stars n={featured.rating} label />}
              <blockquote className="h-display mt-5 max-w-3xl text-2xl leading-snug sm:text-4xl">&ldquo;{featured.quote}&rdquo;</blockquote>
              <figcaption className="mt-8 flex flex-wrap items-center justify-between gap-4"><Meta t={featured} /><Tags t={featured} /></figcaption>
            </figure>
          )}
        </Reveal>

        {rest.length > 0 && (
          <div className="mt-6">
            <div className="mb-3 flex justify-end gap-2">
              <button onClick={() => scrollBy(-1)} aria-label="Previous reviews" className="flex h-10 w-10 items-center justify-center rounded-full border border-line hover:border-brand-line hover:text-brand"><Icon name="left" className="h-4 w-4" /></button>
              <button onClick={() => scrollBy(1)} aria-label="Next reviews" className="flex h-10 w-10 items-center justify-center rounded-full border border-line hover:border-brand-line hover:text-brand"><Icon name="right" className="h-4 w-4" /></button>
            </div>
            <div
              ref={scroller}
              tabIndex={0}
              role="region"
              aria-label="More reviews. Use left and right arrow keys to scroll."
              onKeyDown={(e) => { if (e.key === "ArrowRight") { e.preventDefault(); scrollBy(1); } if (e.key === "ArrowLeft") { e.preventDefault(); scrollBy(-1); } }}
              className={`no-scrollbar -mx-4 snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 ${rest.length > 6 ? "grid grid-flow-col grid-rows-2" : "flex"}`}
            >
              {rest.map((t, i) =>
                t.screenshot ? (
                  <figure key={i} className="card w-[280px] shrink-0 snap-start overflow-hidden p-2 sm:w-[320px]">
                    <Image src={t.screenshot} alt={`Screenshot of a review from ${t.name}`} width={640} height={800} className="h-auto w-full rounded-xl" />
                  </figure>
                ) : (
                  <figure key={i} className="card flex w-[300px] shrink-0 snap-start flex-col justify-between gap-6 p-6 sm:w-[360px]">
                    <div>{t.rating && <Stars n={t.rating} label />}<blockquote className={`${t.rating ? "mt-4 " : ""}text-ink/90`}>&ldquo;{t.quote}&rdquo;</blockquote></div>
                    <figcaption className="space-y-4"><Meta t={t} /><Tags t={t} /></figcaption>
                  </figure>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
