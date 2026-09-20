import { site } from "@/data/site";

export default function Marquee() {
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
