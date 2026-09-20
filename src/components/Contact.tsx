import { isSet, site, waLink } from "@/data/site";
import { Button, Icon, Reveal } from "./ui";

/** Contact without a form: visitors go straight to WhatsApp or email. */
export default function Contact() {
  return (
    <section id="contact" className="section relative overflow-hidden border-t border-line grain">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[600px] -translate-x-1/2 rounded-full bg-brand opacity-[0.09] blur-[120px]" aria-hidden />
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-4">Let&apos;s talk</p>
          <h2 className="h-display text-5xl sm:text-6xl">Tell us about your shop.</h2>
          <p className="mt-5 text-lg text-muted">{site.micro.quote}. {site.micro.noCommitment}. {site.micro.whatsapp}.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href={waLink()} external><Icon name="whatsapp" /> Message on WhatsApp</Button>
            <Button href={`mailto:${site.email}?subject=${encodeURIComponent("Quote request")}`} variant="ghost"><Icon name="mail" /> Send an email</Button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-2">
            <li>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="card card-hover flex items-center gap-4 p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand"><Icon name="whatsapp" /></span>
                <span className="min-w-0"><span className="block text-xs text-muted">WhatsApp</span><span className="h-display block truncate text-lg">{site.whatsappDisplay}</span></span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="card card-hover flex items-center gap-4 p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand"><Icon name="mail" /></span>
                <span className="min-w-0"><span className="block text-xs text-muted">Email</span><span className="h-display block truncate text-lg">{site.email}</span></span>
              </a>
            </li>
            {isSet(site.fiverr) && (
              <li className="sm:col-span-2">
                <a href={site.fiverr} target="_blank" rel="noopener noreferrer" className="card card-hover flex items-center gap-4 p-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand"><Icon name="external" /></span>
                  <span><span className="block text-xs text-muted">Prefer Fiverr?</span><span className="h-display block text-lg">Order on our Fiverr profile</span></span>
                </a>
              </li>
            )}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
