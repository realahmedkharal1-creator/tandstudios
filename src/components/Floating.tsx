"use client";
import { useEffect, useState } from "react";
import { waLink } from "@/data/site";
import { Icon } from "./ui";

export default function Floating() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const on = () => setShowTop(window.scrollY > 700);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 sm:right-6">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
        className={`flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface/90 backdrop-blur transition-all hover:border-brand-line hover:text-brand ${showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
      >
        <Icon name="up" className="h-4 w-4" />
      </button>
      <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
         className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-on-brand shadow-glow transition-transform hover:scale-105">
        <Icon name="whatsapp" className="h-7 w-7" />
      </a>
    </div>
  );
}
