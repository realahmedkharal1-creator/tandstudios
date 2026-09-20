import { testimonials, type Testimonial } from "@/data/testimonials";

/** Sample reviews are only visible in dev, or if you explicitly opt in. */
const showPlaceholders =
  process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "true";

export const visibleTestimonials: Testimonial[] = testimonials.filter(
  (t) => !t.isPlaceholder || showPlaceholders,
);
export const realTestimonials = testimonials.filter((t) => !t.isPlaceholder);

/** Average of REAL reviews only (never placeholders). */
export function aggregate() {
  const r = realTestimonials;
  if (!r.length) return null;
  const avg = r.reduce((s, t) => s + t.rating, 0) / r.length;
  return { avg: Math.round(avg * 10) / 10, count: r.length };
}
