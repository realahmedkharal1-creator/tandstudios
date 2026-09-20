import { isSet, site } from "@/data/site";
import { Logo } from "./ui";

export default function Footer({ hasReviews }: { hasReviews: boolean }) {
  const socials = site.socials.filter((s) => isSet(s.url));
  const links = [
    ["Services", "#services"], ["Work", "#work"], ...(hasReviews ? [["Reviews", "#reviews"]] : []), ["Packages", "#pricing"], ["FAQ", "#faq"], ["Contact", "#contact"],
  ];
  return (
    <footer className="border-t border-line bg-surface/40 py-14">
      <div className="container-x grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo className="text-2xl" />
          <p className="mt-4 max-w-sm text-sm text-muted">{site.description}</p>
        </div>
        <nav aria-label="Footer">
          <p className="eyebrow mb-4">Explore</p>
          <ul className="space-y-2.5 text-sm text-muted">
            {links.map(([l, h]) => <li key={h}><a href={h} className="hover:text-ink">{l}</a></li>)}
          </ul>
        </nav>
        <div>
          <p className="eyebrow mb-4">Contact</p>
          <ul className="space-y-2.5 text-sm text-muted">
            <li><a href={`mailto:${site.email}`} className="hover:text-ink">{site.email}</a></li>
            <li>WhatsApp: {site.whatsappDisplay}</li>
            {isSet(site.fiverr) && <li><a href={site.fiverr} target="_blank" rel="noopener noreferrer" className="hover:text-ink">Fiverr profile</a></li>}
            {socials.map((s) => <li key={s.label}><a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-ink">{s.label}</a></li>)}
          </ul>
        </div>
      </div>
      <div className="container-x mt-12 border-t border-line pt-6 text-xs text-muted">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
