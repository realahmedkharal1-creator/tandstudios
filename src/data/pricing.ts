/**
 * PACKAGES: no prices are shown on the site on purpose. Visitors are sent to WhatsApp or email
 * for a quote. Edit the text below freely.
 * `quoteLine` is the short line shown where a price would normally be.
 * `whatsappMessage` is the pre-filled WhatsApp text for that package.
 */
export interface Plan {
  id: string;
  name: string;
  tagline: string;
  quoteLine: string;
  features: string[];
  cta: string;
  whatsappMessage: string;
  highlight?: boolean;
}

export const pricingNote =
  "Every project is different, so we quote to fit your shop. Message us and you'll get a clear price, usually within 24 hours.";

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter Store",
    tagline: "Launch a clean, fast store",
    quoteLine: "Fixed quote for your store",
    features: [
      "Shopify or WooCommerce setup",
      "Polished theme customization",
      "Product upload and setup",
      "Payments and shipping setup",
      "Mobile-first layout",
    ],
    cta: "Get a quote on WhatsApp",
    whatsappMessage: "Hi TandStudios, Main Starter Store banwana chahta hoon muje apna portfolio or price send kardo.",
  },
  {
    id: "growth",
    name: "Growth Store",
    tagline: "A custom store built to convert",
    quoteLine: "Quoted to your needs",
    features: [
      "Fully custom design",
      "Conversion-focused product pages",
      "Speed optimization",
      "Migration from an old store",
      "Post-launch support",
    ],
    cta: "Get a quote on WhatsApp",
    whatsappMessage: "Hi TandStudios, Main custom Growth Store banwana chahta hoon muje apna portfolio or price send kardo.",
    highlight: true,
  },
  {
    id: "software",
    name: "Custom Software / POS",
    tagline: "Built around your workflow",
    quoteLine: "Scoped and quoted after a call",
    features: [
      "Discovery around how your shop runs",
      "Billing, inventory, khata and reports",
      "Offline-capable options",
      "Data import and staff training",
      "Scoped and priced up front",
    ],
    cta: "Talk to us on WhatsApp",
    whatsappMessage: "Hi TandStudios, Main apni shop ke liye POS / software banwana chahta hoon muje apna portfolio or price send kardo.",
  },
];
