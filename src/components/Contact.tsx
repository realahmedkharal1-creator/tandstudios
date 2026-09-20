"use client";
import { useState, type FormEvent } from "react";
import { isSet, site, waLink } from "@/data/site";
import { Button, Icon, Reveal } from "./ui";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const FORMSPREE_URL = process.env.NEXT_PUBLIC_FORMSPREE_URL;

const businessTypes = ["Pharmacy / medical store", "Grocery / mart", "Wholesaler / distributor", "Retail shop", "Online brand / store", "Other"];
const budgets = ["Under $500", "$500 – $1,500", "$1,500 – $5,000", "$5,000+", "Not sure yet"];

type Status = "idle" | "loading" | "success" | "error";
type Errors = Partial<Record<"name" | "contact" | "need", string>>;

const field = "w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-ink placeholder:text-muted/70 focus:border-brand-line focus:outline-none";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const val = (k: string) => String(d.get(k) ?? "").trim();

    const errs: Errors = {};
    if (val("name").length < 2) errs.name = "Please enter your name.";
    const contact = val("contact");
    if (!/^\S+@\S+\.\S+$/.test(contact) && contact.replace(/\D/g, "").length < 7) errs.contact = "Enter a valid email or WhatsApp number.";
    if (val("need").length < 10) errs.need = "Tell us a little more (at least a sentence).";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    if (val("botcheck")) return; // honeypot: bots fill this in

    if (!WEB3FORMS_KEY && !FORMSPREE_URL) {
      setMessage("The form isn't connected yet. Please use WhatsApp or email below.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const payload = Object.fromEntries(d.entries());
      const res = FORMSPREE_URL
        ? await fetch(FORMSPREE_URL, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) })
        : await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({ ...payload, access_key: WEB3FORMS_KEY, subject: `New quote request from ${val("name")}` }),
          });
      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
    } catch {
      setMessage("Something went wrong sending that. Please try again or message us on WhatsApp.");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section relative overflow-hidden border-t border-line grain">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[600px] -translate-x-1/2 rounded-full bg-brand opacity-[0.09] blur-[120px]" aria-hidden />
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-4">Let&apos;s talk</p>
          <h2 className="h-display text-5xl sm:text-6xl">Tell us about your shop.</h2>
          <p className="mt-5 text-lg text-muted">{site.micro.quote}. {site.micro.noCommitment}. {site.micro.whatsapp}.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={waLink()} external><Icon name="whatsapp" /> Message on WhatsApp</Button>
            <Button href={`mailto:${site.email}`} variant="ghost"><Icon name="mail" /> {site.email}</Button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} noValidate className="card mx-auto mt-14 grid max-w-3xl gap-5 p-6 sm:grid-cols-2 sm:p-10">
            {status === "success" ? (
              <div className="py-10 text-center sm:col-span-2" role="status">
                <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-on-brand"><Icon name="check" className="h-7 w-7" /></span>
                <h3 className="h-display text-2xl">Message sent. Thank you!</h3>
                <p className="mt-2 text-muted">We&apos;ll get back to you shortly. For a faster reply, message us on WhatsApp.</p>
                <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-sm text-brand underline underline-offset-4">Send another message</button>
              </div>
            ) : (
              <>
                {/* Honeypot */}
                <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

                <label className="block text-sm">
                  <span className="mb-1.5 block text-muted">Your name *</span>
                  <input name="name" autoComplete="name" className={field} placeholder="Ahmed" aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} />
                  {errors.name && <span id="err-name" className="mt-1 block text-xs text-red-400">{errors.name}</span>}
                </label>
                <label className="block text-sm">
                  <span className="mb-1.5 block text-muted">Email or WhatsApp *</span>
                  <input name="contact" autoComplete="email" className={field} placeholder="you@email.com or +92 3XX XXXXXXX" aria-invalid={!!errors.contact} aria-describedby={errors.contact ? "err-contact" : undefined} />
                  {errors.contact && <span id="err-contact" className="mt-1 block text-xs text-red-400">{errors.contact}</span>}
                </label>
                <label className="block text-sm">
                  <span className="mb-1.5 block text-muted">Business type</span>
                  <select name="business_type" className={field} defaultValue="">
                    <option value="" disabled>Select…</option>
                    {businessTypes.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </label>
                <label className="block text-sm">
                  <span className="mb-1.5 block text-muted">Budget range</span>
                  <select name="budget" className={field} defaultValue="">
                    <option value="" disabled>Select…</option>
                    {budgets.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </label>
                <label className="block text-sm sm:col-span-2">
                  <span className="mb-1.5 block text-muted">What do you need? *</span>
                  <select name="need_type" className={field} defaultValue="">
                    <option value="" disabled>Select…</option>
                    {["Online store (Shopify / WooCommerce)", "POS / custom software", "Facebook / TikTok ads", "Fix or speed up an existing site", "Not sure yet"].map((b) => <option key={b}>{b}</option>)}
                  </select>
                </label>
                <label className="block text-sm sm:col-span-2">
                  <span className="mb-1.5 block text-muted">Message *</span>
                  <textarea name="need" rows={4} className={field} placeholder="Tell us how your shop works today and what you want to fix." aria-invalid={!!errors.need} aria-describedby={errors.need ? "err-need" : undefined} />
                  {errors.need && <span id="err-need" className="mt-1 block text-xs text-red-400">{errors.need}</span>}
                </label>

                <div className="sm:col-span-2">
                  <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
                    {status === "loading" ? "Sending…" : <>Send my request <Icon name="arrow" className="h-4 w-4" /></>}
                  </Button>
                  {status === "error" && <p role="alert" className="mt-4 text-sm text-red-400">{message}</p>}
                </div>
              </>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
