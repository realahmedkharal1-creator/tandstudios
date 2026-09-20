"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
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
        <Image src={t.avatar} alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
      ) : (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft font-semibold text-brand" aria-hidden>{t.name[0]}</span>
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
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });
  const [edge, setEdge] = useState({ start: true, end: false, progress: 0 });
  const [dragging, setDragging] = useState(false);

  // Featured quote rotates through every review; the slider below shows them all.
  const [fi, setFi] = useState(0);
  const featured = reviews[fi % reviews.length];
  const rest = reviews;
  const hoverFeatured = useRef(false);
  const hoverSlider = useRef(false);
  const pausedUntil = useRef(0); // manual interaction pauses autoplay for a while
  const visible = useRef(true);
  const [reduceMotion, setReduceMotion] = useState(true); // safe default until we know
  const hasPlaceholder = reviews.some((r) => r.isPlaceholder);

  const update = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft >= max - 4, progress: max > 0 ? el.scrollLeft / max : 0 });
  }, []);

  useEffect(() => {
    update();
    const el = scroller.current;
    if (!el) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [update]);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Only autoplay while the section is on screen
  useEffect(() => {
    const el = scroller.current?.closest("section");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { visible.current = e.isIntersecting; }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const canAuto = () => !reduceMotion && visible.current && !document.hidden && Date.now() > pausedUntil.current;
  const pauseAuto = (ms = 8000) => { pausedUntil.current = Date.now() + ms; };

  // Featured quote: fade to the next review every 7 seconds
  useEffect(() => {
    if (reduceMotion || reviews.length < 2) return;
    const t = setInterval(() => {
      if (canAuto() && !hoverFeatured.current) setFi((i) => (i + 1) % reviews.length);
    }, 7000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion, reviews.length]);

  // Slider: advance one card every 3.5 seconds, loop back to the start at the end
  useEffect(() => {
    if (reduceMotion) return;
    const t = setInterval(() => {
      const el = scroller.current;
      const card = el?.firstElementChild as HTMLElement | null;
      if (!el || !card || !canAuto() || hoverSlider.current || drag.current.active) return;
      const max = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= max - 4) el.scrollTo({ left: 0, behavior: "smooth" });
      else el.scrollBy({ left: card.offsetWidth + 16, behavior: "smooth" });
    }, 3500);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  /** Slide by one "page" of cards (however many are fully visible), landing on a card edge. */
  const slide = (dir: 1 | -1) => {
    const el = scroller.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    pauseAuto();
    const step = card.offsetWidth + 16;
    const perPage = Math.max(1, Math.floor((el.clientWidth + 16) / step));
    el.scrollBy({ left: dir * step * perPage, behavior: "smooth" });
  };

  // Mouse drag-to-scroll (touch already swipes natively)
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !scroller.current) return;
    pauseAuto();
    drag.current = { active: true, startX: e.clientX, startLeft: scroller.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.active || !scroller.current) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) > 4) { d.moved = true; setDragging(true); }
    if (d.moved) scroller.current.scrollLeft = d.startLeft - dx;
  };
  const endDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
    // settle on the nearest card
    const el = scroller.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (el && card) {
      const step = card.offsetWidth + 16;
      el.scrollTo({ left: Math.round(el.scrollLeft / step) * step, behavior: "smooth" });
    }
  };

  const arrow = "flex h-10 w-10 items-center justify-center rounded-full border border-line transition-colors hover:border-brand-line hover:text-brand disabled:pointer-events-none disabled:opacity-30";

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
            <p className="mb-8 flex flex-wrap items-center gap-3 text-sm text-muted">
              <Stars n={aggregate.avg} /> <strong className="text-ink">{aggregate.avg.toFixed(1)}</strong> average from {aggregate.count} client review{aggregate.count > 1 ? "s" : ""}
            </p>
          </Reveal>
        )}

        <Reveal>
          <div onMouseEnter={() => { hoverFeatured.current = true; }} onMouseLeave={() => { hoverFeatured.current = false; }}>
            <AnimatePresence mode="wait" initial={false}>
              {featured.screenshot ? (
                <motion.figure key={fi} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }} className="card mx-auto max-w-md overflow-hidden p-2">
                  <Image src={featured.screenshot} alt={`Screenshot of a review from ${featured.name}`} width={800} height={1000} className="h-auto w-full rounded-xl" />
                </motion.figure>
              ) : (
                <motion.figure key={fi} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}
                               className="card relative flex min-h-[300px] flex-col justify-between overflow-hidden p-6 sm:min-h-[270px] sm:p-9">
                  <span className="pointer-events-none absolute -top-4 right-6 select-none font-display text-[8rem] leading-none text-brand opacity-10" aria-hidden>&ldquo;</span>
                  <div>
                    {featured.rating && <Stars n={featured.rating} label />}
                    <blockquote className="h-display mt-4 max-w-3xl text-xl leading-snug sm:text-3xl">&ldquo;{featured.quote}&rdquo;</blockquote>
                  </div>
                  <figcaption className="mt-6 flex flex-wrap items-center justify-between gap-4"><Meta t={featured} /><Tags t={featured} /></figcaption>
                </motion.figure>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        {rest.length > 0 && (
          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between gap-4">
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-line" aria-hidden>
                <div className="h-full rounded-full bg-brand transition-[width] duration-200" style={{ width: `${Math.max(12, edge.progress * 100)}%` }} />
              </div>
              <div className="flex gap-2">
                <button onClick={() => slide(-1)} disabled={edge.start} aria-label="Previous reviews" className={arrow}><Icon name="left" className="h-4 w-4" /></button>
                <button onClick={() => slide(1)} disabled={edge.end} aria-label="Next reviews" className={arrow}><Icon name="right" className="h-4 w-4" /></button>
              </div>
            </div>

            <div
              ref={scroller}
              tabIndex={0}
              role="region"
              aria-label="More reviews. Use left and right arrow keys to scroll."
              onScroll={update}
              onKeyDown={(e) => { if (e.key === "ArrowRight") { e.preventDefault(); slide(1); } if (e.key === "ArrowLeft") { e.preventDefault(); slide(-1); } }}
              onMouseEnter={() => { hoverSlider.current = true; }}
              onMouseLeave={() => { hoverSlider.current = false; }}
              onFocus={() => pauseAuto(15000)}
              onTouchStart={() => pauseAuto(10000)}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerLeave={endDrag}
              onPointerCancel={endDrag}
              className={`no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 ${dragging ? "cursor-grabbing select-none" : "cursor-grab snap-x snap-mandatory"}`}
            >
              {rest.map((t, i) =>
                t.screenshot ? (
                  <figure key={i} className="card w-[260px] shrink-0 snap-start overflow-hidden p-2 sm:w-[300px]">
                    <Image src={t.screenshot} alt={`Screenshot of a review from ${t.name}`} width={640} height={800} draggable={false} className="h-auto w-full rounded-xl" />
                  </figure>
                ) : (
                  <figure key={i} className="card flex w-[270px] shrink-0 snap-start flex-col justify-between gap-5 p-5 sm:w-[310px]">
                    <div>
                      {t.rating && <Stars n={t.rating} label />}
                      <blockquote className={`${t.rating ? "mt-3 " : ""}text-sm leading-relaxed text-ink/90`}>&ldquo;{t.quote}&rdquo;</blockquote>
                    </div>
                    <figcaption className="space-y-3"><Meta t={t} /><Tags t={t} /></figcaption>
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
