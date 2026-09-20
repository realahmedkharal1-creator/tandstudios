/**
 * SITE SETTINGS: edit this file to change brand text, contact details and links.
 * Anything marked [PLACEHOLDER] must be replaced before you launch.
 */
export const site = {
  name: "TandStudios",
  tagline: "Stores that sell. Software that fits your shop.",
  description:
    "TandStudios builds Shopify and WooCommerce stores, custom POS software, and Facebook and TikTok ad campaigns. Work directly with the person who builds it.",
  // [PLACEHOLDER] your real domain (used for canonical URL, sitemap, Open Graph)
  url: "https://tandstudios.com",

  // [PLACEHOLDER] digits only, with country code, no + or spaces. Example: 923001234567
  whatsapp: "923000000000",
  // Shown to visitors
  whatsappDisplay: "+92 300 0000000",
  whatsappMessage: "Hi TandStudios, I'd like a free quote. My business is ",

  // [PLACEHOLDER]
  email: "hello@example.com",

  // [PLACEHOLDER] leave as "" to hide the Fiverr link
  fiverr: "",

  // Add or remove freely. Entries with an empty url are hidden.
  socials: [
    { label: "Instagram", url: "" },
    { label: "LinkedIn", url: "" },
    { label: "YouTube", url: "" },
  ],

  location: "Pakistan",
  serviceArea: ["Pakistan", "United States", "United Kingdom", "Canada", "Australia"],

  // Friction-reducing micro-copy (edit freely, keep it true)
  micro: {
    quote: "Free quote in 24 hours",
    noCommitment: "No commitment",
    whatsapp: "Reply on WhatsApp in minutes",
  },

  // Trust row under the hero buttons. Only claims you can stand behind.
  trustSignals: [
    "Shopify & WooCommerce",
    "Custom POS software",
    "Fast delivery",
    "Talk directly to the builder",
  ],

  // Animated counters. Keep them TRUE. Delete any you can't back up.
  stats: [
    { value: 24, suffix: "h", label: "Quote turnaround" },
    { value: 3, suffix: "", label: "Core services" },
    { value: 2, suffix: "", label: "Currencies: PKR & USD" },
    { value: 1, suffix: "", label: "Person you deal with" },
  ],

  // Marquee under the hero. Plain text, no logos to hotlink.
  techMarquee: [
    "Shopify",
    "WooCommerce",
    "WordPress",
    "React",
    "Next.js",
    "Node.js",
    "Electron",
    "TypeScript",
    "Stripe",
    "JazzCash",
    "Easypaisa",
    "PayFast",
    "PostgreSQL",
    "SQLite",
  ],
};

export const isSet = (v: string | undefined) => !!v && v.trim().length > 0;

export const waLink = (message: string = site.whatsappMessage) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
