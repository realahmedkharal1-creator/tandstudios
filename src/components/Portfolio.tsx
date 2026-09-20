"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { categoryLabels, isSampleUrl, portfolio, type PortfolioCategory, type PortfolioItem } from "@/data/portfolio";
import embeds from "@/data/generated/embeds.json";
import { Icon, Reveal, SectionHead } from "./ui";

const embeddable = embeds as Record<string, boolean>;
const domain = (url: string) => { try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return url; } };

/**
 * Preview area. Always renders the image (or a designed placeholder) first.
 * A live iframe is layered on top ONLY if: the site was confirmed embeddable at build time,
 * the card is in view / hovered (`active`), and it actually finishes loading in time.
 * Otherwise the image simply stays. No broken or empty frame is ever shown.
 */
function Preview({ item, active, eager }: { item: PortfolioItem; active: boolean; eager?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);
  const [live, setLive] = useState(false);
  const [failed, setFailed] = useState(false);
  const canEmbed = item.livePreview !== false && embeddable[item.url] === true && !isSampleUrl(item.url) && !failed;

  useEffect(() => {
    if (!wrap.current) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / 1280));
    ro.observe(wrap.current);
    return () => ro.disconnect();
  }, []);

  // Give the iframe 8s to load; otherwise give up and keep the image.
  useEffect(() => {
    if (!(active && canEmbed) || live) return;
    const t = setTimeout(() => setFailed(true), 8000);
    return () => clearTimeout(t);
  }, [active, canEmbed, live]);

  return (
    <div ref={wrap} className="relative aspect-[16/10] overflow-hidden bg-surface-2">
      {item.previewImage ? (
        <Image src={item.previewImage} alt={`${item.title} website preview`} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover object-top" priority={eager} loading={eager ? undefined : "lazy"} />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_30%_20%,var(--brand-soft),transparent_60%)] p-6 text-center">
          <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
          <span className="relative h-display text-2xl sm:text-3xl">{item.title}</span>
          <span className="relative mt-2 text-xs text-muted">{domain(item.url)}</span>
          <span className="relative mt-4 rounded-full border border-line bg-bg/70 px-3 py-1 text-[10px] uppercase tracking-widest text-muted">Preview coming soon</span>
        </div>
      )}
      {active && canEmbed && (
        <iframe
          src={item.url}
          title={`Live preview of ${item.title}`}
          loading="lazy"
          tabIndex={-1}
          sandbox="allow-scripts allow-same-origin"
          referrerPolicy="no-referrer"
          onLoad={() => setLive(true)}
          onError={() => setFailed(true)}
          style={{ width: 1280, height: 800, transform: `scale(${scale})` }}
          className={`pointer-events-none absolute left-0 top-0 origin-top-left border-0 bg-white transition-opacity duration-500 ${live ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}

function BrowserFrame({ item, active, eager }: { item: PortfolioItem; active: boolean; eager?: boolean }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-bg">
      <div className="flex items-center gap-1.5 border-b border-line bg-surface-2 px-3 py-2">
        <i className="h-2.5 w-2.5 rounded-full bg-white/20" /><i className="h-2.5 w-2.5 rounded-full bg-white/20" /><i className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="ml-3 max-w-[70%] truncate rounded-full bg-bg px-3 py-0.5 text-[11px] text-muted">{domain(item.url)}</span>
      </div>
      <Preview item={item} active={active} eager={eager} />
    </div>
  );
}

function Card({ item, big, onQuick }: { item: PortfolioItem; big?: boolean; onQuick: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const [hover, setHover] = useState(false);
  const [inView, setInView] = useState(false);

  // Featured card loads its live preview when scrolled into view; others only on hover/focus.
  useEffect(() => {
    if (!big || !ref.current) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setInView(true), io.disconnect()), { rootMargin: "100px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [big]);

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
      onPointerEnter={() => setHover(true)}
      onFocusCapture={() => setHover(true)}
      className={`card card-hover group relative p-3 ${big ? "md:col-span-2" : ""}`}
    >
      {/* Stretched link: the whole card opens the live store in a new tab */}
      <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit live store: ${item.title}`} className="absolute inset-0 z-10 rounded-xl2" />
      <BrowserFrame item={item} active={hover || inView} eager={big} />
      <div className="flex items-start justify-between gap-4 px-2 pb-2 pt-5">
        <div>
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <span className="eyebrow !text-[10px]">{categoryLabels[item.category]}</span>
            {isSampleUrl(item.url) && <span className="rounded-full border border-line px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted">Sample</span>}
          </div>
          <h3 className="h-display text-xl">{item.title}</h3>
          <p className="mt-1.5 text-sm text-muted">{item.description}</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {item.tags.map((t) => <li key={t} className="rounded-full bg-brand px-2.5 py-1 text-[11px] font-medium text-on-brand">{t}</li>)}
          </ul>
        </div>
        <button onClick={onQuick} aria-label={`Quick view: ${item.title}`}
                className="relative z-20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-brand-line hover:text-brand">
          <Icon name="expand" className="h-4 w-4" />
        </button>
      </div>
    </motion.article>
  );
}

function QuickView({ item, onClose }: { item: PortfolioItem; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => { window.removeEventListener("keydown", esc); document.body.style.overflow = ""; prev?.focus(); };
  }, [onClose]);

  return (
    <motion.div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div role="dialog" aria-modal="true" aria-label={item.title} onClick={(e) => e.stopPropagation()}
                  initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
                  className="card max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-b-none p-4 sm:rounded-b-[var(--radius-lg)] sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="eyebrow">{categoryLabels[item.category]}</span>
          <button ref={closeRef} onClick={onClose} aria-label="Close quick view" className="flex h-10 w-10 items-center justify-center rounded-full border border-line hover:border-brand-line hover:text-brand">
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>
        <BrowserFrame item={item} active />
        <div className="mt-6 grid gap-6 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h3 className="h-display text-3xl">{item.title}</h3>
            <p className="mt-1 text-sm text-muted">Client: {item.client}</p>
            <p className="mt-4 text-muted">{item.description}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {item.tags.map((t) => <li key={t} className="rounded-full bg-brand px-2.5 py-1 text-xs font-medium text-on-brand">{t}</li>)}
            </ul>
          </div>
          <div>
            {item.results && item.results.length > 0 && (
              <ul className="mb-5 space-y-2 text-sm">
                {item.results.map((r) => <li key={r} className="flex gap-2"><Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />{r}</li>)}
              </ul>
            )}
            <a href={item.url} target="_blank" rel="noopener noreferrer"
               className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-on-brand hover:shadow-glow">
              Visit Live Store <Icon name="external" className="h-4 w-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Shopify first: our main service leads the grid (stable sort keeps your order within a category)
const priority: Record<PortfolioCategory, number> = { shopify: 0, woocommerce: 1, "pos-software": 2 };
const sorted = [...portfolio].sort((a, b) => priority[a.category] - priority[b.category]);

export default function Portfolio() {
  const [filter, setFilter] = useState<"all" | PortfolioCategory>("all");
  const [quick, setQuick] = useState<PortfolioItem | null>(null);
  const [expanded, setExpanded] = useState(false);
  const closeQuick = useCallback(() => setQuick(null), []);

  const cats = useMemo(() => (Object.keys(categoryLabels) as PortfolioCategory[]).filter((c) => portfolio.some((p) => p.category === c)), []);
  const items = filter === "all" ? sorted : sorted.filter((p) => p.category === filter);
  const featuredId = filter === "all" ? (sorted.find((p) => p.featured && p.category === "shopify") ?? sorted.find((p) => p.featured))?.id : undefined;
  const ordered = featuredId ? [items.find((p) => p.id === featuredId)!, ...items.filter((p) => p.id !== featuredId)] : items;
  const LIMIT = 6;
  const shown = expanded ? ordered : ordered.slice(0, LIMIT);
  const allReal = portfolio.every((p) => !isSampleUrl(p.url));

  return (
    <section id="work" className="section">
      <div className="container-x">
        <SectionHead eyebrow="Selected work" title={<>Our work. Click to explore.</>} sub="Stores, POS systems and sites, each card opens the project itself." />

        {cats.length > 1 && (
        <Reveal>
          <div role="tablist" aria-label="Filter projects" className="no-scrollbar mb-8 flex gap-2 overflow-x-auto pb-1">
            {(["all", ...cats] as const).map((c) => {
              const on = filter === c;
              return (
                <button key={c} role="tab" aria-selected={on} onClick={() => setFilter(c)}
                        className={`relative shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${on ? "border-transparent text-on-brand" : "border-line text-muted hover:text-ink"}`}>
                  {on && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-brand" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                  <span className="relative">{c === "all" ? "All" : categoryLabels[c]}</span>
                </button>
              );
            })}
          </div>
        </Reveal>
        )}

        <motion.div layout className="grid gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {shown.map((item, i) => (
              <Card key={item.id} item={item} big={i === 0 && item.id === featuredId} onQuick={() => setQuick(item)} />
            ))}
          </AnimatePresence>
        </motion.div>

        {ordered.length > LIMIT && (
          <div className="mt-8 text-center">
            <button onClick={() => setExpanded(!expanded)} aria-expanded={expanded}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-semibold transition-colors hover:border-brand-line hover:text-brand">
              {expanded ? "Show fewer projects" : `Show all ${ordered.length} projects`}
              <Icon name="chevron" className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
            </button>
          </div>
        )}

        {/* Only shown when NO project still uses a sample URL, so it's never untrue */}
        {allReal && <p className="mt-8 text-center text-sm text-muted">Every project above is a real, live build. Click any to explore it.</p>}
      </div>

      <AnimatePresence>{quick && <QuickView item={quick} onClose={closeQuick} />}</AnimatePresence>
    </section>
  );
}
