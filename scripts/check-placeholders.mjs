/**
 * Runs before `npm run build` / `npm run dev`.
 *  1. Lists placeholders that still need replacing (warnings only, never fails).
 *  2. For each REAL portfolio URL, checks whether the site allows iframe embedding
 *     (X-Frame-Options / CSP frame-ancestors) and saves the result to
 *     src/data/generated/embeds.json. Blocked sites simply show their preview image.
 */
import { readFileSync, writeFileSync } from "node:fs";

const read = (p) => readFileSync(new URL(`../src/data/${p}`, import.meta.url), "utf8");
const warn = [];

const testimonials = read("testimonials.ts");
const ph = (testimonials.match(/^\s+isPlaceholder:\s*true,/gm) || []).length;
if (ph) warn.push(`${ph} placeholder testimonial(s) in testimonials.ts (hidden in production)`);

const portfolio = read("portfolio.ts");
const urls = [...portfolio.matchAll(/^\s+url:\s*"([^"]+)"/gm)].map((m) => m[1]);
const sample = urls.filter((u) => u.includes("example.com"));
if (sample.length) warn.push(`${sample.length} sample project URL(s) in portfolio.ts`);
const noImg = [...portfolio.matchAll(/id:\s*"([^"]+)"[\s\S]*?(?=\n  \},)/g)]
  .filter((m) => !/previewImage:/.test(m[0]))
  .map((m) => m[1]);
if (noImg.length) warn.push(`Missing previewImage for: ${noImg.join(", ")}`);

const site = read("site.ts");
if (site.includes('"923000000000"')) warn.push("WhatsApp number is still the placeholder (site.ts)");
if (site.includes("hello@example.com")) warn.push("Email is still the placeholder (site.ts)");
if (/fiverr:\s*""/.test(site)) warn.push("Fiverr URL empty (link hidden)");
if (/\[EDIT/.test(read("faq.ts") + read("services.ts"))) warn.push("Text marked [EDIT ...] still present in faq.ts / services.ts");

console.log("\n=== TandStudios: things still to replace ===");
if (warn.length) warn.forEach((w) => console.log("  ! " + w));
else console.log("  none");
console.log("");

// --- iframe embeddability probe ---
const embeds = {};
for (const url of urls.filter((u) => !u.includes("example.com"))) {
  try {
    const res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(8000) });
    const xfo = res.headers.get("x-frame-options");
    const csp = res.headers.get("content-security-policy") || "";
    embeds[url] = !(xfo || /frame-ancestors/i.test(csp) || !res.ok);
  } catch {
    embeds[url] = false;
  }
}
writeFileSync(new URL("../src/data/generated/embeds.json", import.meta.url), JSON.stringify(embeds, null, 2));
if (Object.keys(embeds).length) console.log("Embeddable check:", embeds);
