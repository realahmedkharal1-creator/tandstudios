"use client";
/** Small shared UI pieces: Icon, Logo, Reveal, Counter, Button, Section heading. */
import { animate, motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

const paths: Record<string, string> = {
  arrow: "M5 12h14M13 6l6 6-6 6",
  check: "M5 12l5 5 9-10",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
  external: "M14 4h6v6M20 4l-9 9M18 14v5H5V6h5",
  chevron: "M6 9l6 6 6-6",
  left: "M15 6l-6 6 6 6",
  right: "M9 6l6 6-6 6",
  up: "M12 19V5M6 11l6-6 6 6",
  expand: "M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5",
  store: "M4 9l1.5-5h13L20 9M4 9v11h16V9M4 9c0 1.5 1.5 2.5 2.7 2.5S9.3 10.5 9.3 9c0 1.5 1.3 2.5 2.7 2.5s2.7-1 2.7-2.5c0 1.5 1.3 2.5 2.7 2.5S20 10.5 20 9M10 20v-5h4v5",
  pos: "M3 5h18v11H3zM8 20h8M12 16v4",
  code: "M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14",
  wrench: "M14.5 6.5a4 4 0 0 0-5 5L3 18l3 3 6.5-6.5a4 4 0 0 0 5-5l-2.5 2.5-2.5-.5-.5-2.5z",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c0-4 3.5-6 8-6s8 2 8 6",
  wifioff: "M3 3l18 18M8.5 16.5a5 5 0 0 1 7 0M5 12.5a10 10 0 0 1 5-2.7M12 20h.01M19 12.5a10 10 0 0 0-4-2.4",
  tag: "M3 12V3h9l9 9-9 9-9-9zM7.5 7.5h.01",
  headset: "M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v5H4zM17 14h3v5h-3zM20 19c0 1.5-2 2-5 2",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",
  layout: "M3 4h18v16H3zM3 9h18M9 9v11",
  zap: "M13 2L4 14h7l-1 8 9-12h-7z",
  pill: "M10.5 20.5a5 5 0 0 1-7-7l10-10a5 5 0 0 1 7 7zM8.5 8.5l7 7",
  cart: "M3 4h3l2.5 11h9.5l2-8H7M10 20h.01M17 20h.01",
  truck: "M2 6h12v10H2zM14 9h4l3 3v4h-7M6 19h.01M17 19h.01",
  plus: "M12 5v14M5 12h14",
  whatsapp:
    "M3 21l1.6-4.6A8.5 8.5 0 1 1 8 19.6L3 21zM9 9.5c.5 2 2.5 4 5 5l1.2-1.2-1.8-1-.8.8c-.9-.4-1.9-1.4-2.3-2.3l.8-.8-1-1.8z",
};

export function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  if (name === "star")
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
        <path d="M12 2l3 7 7 .5-5.5 4.7L18 22l-6-3.8L6 22l1.5-7.8L2 9.5 9 9z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={paths[name] ?? paths.plus} />
    </svg>
  );
}

export function Logo({ className = "text-xl" }: { className?: string }) {
  return (
    <span className={`h-display inline-flex items-baseline ${className}`} aria-label="TandStudios">
      <span className="text-ink">Tand</span>
      <span className="text-brand">Studios</span>
      <span className="ml-0.5 h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
    </span>
  );
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return setN(value);
    const c = animate(0, value, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

type BtnProps = {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  children: ReactNode;
  external?: boolean;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
};

/** Button/link with a subtle magnetic pull toward the cursor. */
export function Button({ href, onClick, variant = "primary", children, external, className = "", type = "button", disabled, ariaLabel }: BtnProps) {
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 18 });
  const move = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.18);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  };
  const leave = () => { x.set(0); y.set(0); };
  const cls =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-colors disabled:opacity-60 " +
    (variant === "primary"
      ? "bg-brand text-on-brand hover:shadow-glow"
      : "border border-line text-ink hover:border-brand-line hover:text-brand") +
    " " + className;
  const common = { style: { x, y }, onClick, onPointerMove: move, onPointerLeave: leave, className: cls, "aria-label": ariaLabel };
  if (href)
    return (
      <motion.a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...common}>
        {children}
      </motion.a>
    );
  return (
    <motion.button type={type} disabled={disabled} {...common}>
      {children}
    </motion.button>
  );
}

export function SectionHead({ eyebrow, title, sub, center }: { eyebrow: string; title: ReactNode; sub?: string; center?: boolean }) {
  return (
    <Reveal className={`mb-12 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="h-display text-4xl sm:text-5xl">{title}</h2>
      {sub && <p className="mt-5 text-lg text-muted">{sub}</p>}
    </Reveal>
  );
}
