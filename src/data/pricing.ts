/**
 * PRICING: ALL NUMBERS BELOW ARE PLACEHOLDERS. Edit usd and pkr for each plan.
 * Use `null` for a price to show "Custom quote" instead.
 */
export interface Plan {
  id: string;
  name: string;
  tagline: string;
  usd: number | null;
  pkr: number | null;
  features: string[];
  cta: string;
  highlight?: boolean;
}

export const pricingNote =
  "Indicative starting prices. Your final quote comes after a free discovery call.";

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter Store",
    tagline: "Launch a clean, fast store",
    usd: 400, // [PLACEHOLDER]
    pkr: 110000, // [PLACEHOLDER]
    features: [
      "Shopify or WooCommerce setup",
      "Polished theme customization",
      "Up to 25 products loaded",
      "Payments and shipping setup",
      "Mobile-first layout",
    ],
    cta: "Start a store",
  },
  {
    id: "growth",
    name: "Growth Store",
    tagline: "A custom store built to convert",
    usd: 1200, // [PLACEHOLDER]
    pkr: 335000, // [PLACEHOLDER]
    features: [
      "Fully custom design",
      "Conversion-focused product pages",
      "Speed optimization",
      "Migration from an old store",
      "30 days post-launch support",
    ],
    cta: "Build my store",
    highlight: true,
  },
  {
    id: "software",
    name: "Custom Software / POS",
    tagline: "Built around your workflow",
    usd: null,
    pkr: null,
    features: [
      "Discovery around how your shop runs",
      "Billing, inventory, khata and reports",
      "Offline-capable options",
      "Data import and staff training",
      "Scoped and priced up front",
    ],
    cta: "Get a custom quote",
  },
];
