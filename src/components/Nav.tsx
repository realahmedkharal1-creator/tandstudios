"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { site, waLink } from "@/data/site";
import { Button, Icon, Logo } from "./ui";

export default function Nav({ hasReviews }: { hasReviews: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#services", label: "Services" },
    { href: "#work", label: "Work" },
    ...(hasReviews ? [{ href: "#reviews", label: "Reviews" }] : []),
    { href: "#pricing", label: "Packages" },
    { href: "#faq", label: "FAQ" },
  ];

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => { window.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? "border-b border-line bg-bg/70 backdrop-blur-xl" : "border-b border-transparent"}`}>
      <nav className="container-x flex h-16 items-center justify-between" aria-label="Main">
        <a href="#top" aria-label="TandStudios home"><Logo /></a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm text-muted transition-colors hover:text-ink">{l.label}</a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
             className="hidden h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-brand-line hover:text-brand sm:flex">
            <Icon name="whatsapp" />
          </a>
          <Button href="#contact" className="hidden !py-2.5 sm:inline-flex">Get a Free Quote</Button>
          <button className="flex h-11 w-11 items-center justify-center rounded-full border border-line md:hidden"
                  aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="fixed inset-x-0 bottom-0 top-16 flex flex-col justify-between bg-bg px-6 pb-8 pt-8 md:hidden">
            <ul className="space-y-1">
              {links.map((l, i) => (
                <motion.li key={l.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                  <a href={l.href} onClick={() => setOpen(false)} className="h-display block border-b border-line py-4 text-3xl">{l.label}</a>
                </motion.li>
              ))}
            </ul>
            <div className="space-y-3">
              <Button href="#contact" className="w-full" onClick={() => setOpen(false)}>Get a Free Quote</Button>
              <Button href={waLink()} external variant="ghost" className="w-full"><Icon name="whatsapp" /> WhatsApp us</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
