/** SERVICES, WHY-US POINTS AND PROCESS STEPS: edit the text freely. */

export type IconName =
  | "store" | "pos" | "code" | "wrench" | "user" | "wifioff" | "tag"
  | "headset" | "globe" | "layout" | "zap" | "pill" | "cart" | "truck" | "plus";

export const services = {
  store: {
    icon: "store" as IconName,
    kicker: "E-commerce",
    title: "Online stores that turn visitors into orders",
    blurb:
      "Shopify and WooCommerce stores designed around how your customers actually shop, on a phone, with one thumb.",
    includes: [
      "Custom theme design, not a recycled template",
      "Product pages built to convert",
      "Speed and Core Web Vitals tuning",
      "Payments and shipping set up (local and international)",
      "Mobile-first layouts",
      "Migration from your old store or marketplace",
    ],
  },
  software: {
    icon: "pos" as IconName,
    kicker: "Custom software & POS",
    title: "Software built around your shop, not the other way round",
    blurb:
      "Billing, inventory, khata/ledger, suppliers and reports, shaped to the way your team already works. Offline-capable when your internet isn't.",
    useCases: [
      {
        icon: "pill" as IconName,
        title: "Medical stores & pharmacies",
        text: "Batch and expiry tracking, salt-based search.",
      },
      {
        icon: "cart" as IconName,
        title: "Grocery & shopping marts",
        text: "Barcode billing and fast checkout lanes.",
      },
      {
        icon: "truck" as IconName,
        title: "Wholesalers & distributors",
        text: "Bulk pricing, supplier and customer khata.",
      },
      {
        icon: "store" as IconName,
        title: "Retail shops",
        text: "Stock, sizes, returns, staff and daily closing.",
      },
      {
        icon: "plus" as IconName,
        title: "Something else?",
        text: "Tell us how you work. We'll build it.",
      },
    ],
  },
  web: {
    icon: "code" as IconName,
    kicker: "Web development",
    title: "Websites and web apps that load fast and look sharp",
    blurb: "Business sites, landing pages and custom web apps, built clean and easy for you to update.",
    includes: ["Business websites", "Landing pages", "Web apps and dashboards", "SEO-ready structure"],
  },
  fix: {
    icon: "wrench" as IconName,
    kicker: "Redesign · Fix · Speed up",
    title: "Already have a store or site that underperforms?",
    blurb:
      "We audit it, fix what's slowing it down or putting buyers off, and hand it back working better. No rebuild unless it's truly needed.",
  },
};

export const why: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "user",
    title: "You talk to the builder",
    text: "No account managers, no lost-in-translation. The person who designs and codes your project is the one replying.",
  },
  {
    icon: "layout",
    title: "Software fits your workflow",
    text: "We start from how your shop runs day to day, then build. Not the other way round.",
  },
  {
    icon: "wifioff",
    title: "Offline-capable POS",
    text: "Load-shedding or dropped internet shouldn't stop a sale. Offline options are available for POS projects.",
  },
  {
    icon: "tag",
    title: "Transparent pricing",
    text: "You see the scope and the price before we start. Pay in PKR or USD.",
  },
  {
    icon: "headset",
    title: "Support after launch",
    text: "Launch isn't the end. Ask for help, fixes and changes after go-live.",
  },
  {
    icon: "globe",
    title: "Local and international",
    text: "Comfortable working with shops in Pakistan and clients in the US, UK, Canada and Australia.",
  },
];

export const process: { title: string; text: string; duration: string }[] = [
  { title: "Discovery call", text: "We learn your business, goals and how things work today.", duration: "30–45 min" },
  { title: "Proposal & design", text: "You get a clear scope, price, timeline and first designs.", duration: "1–2 days" },
  { title: "Build & review", text: "We build in stages. You review and give feedback along the way.", duration: "3–4 days" },
  { title: "Launch", text: "Testing, data import, go-live. Your team gets trained.", duration: "1 day" },
  { title: "Support", text: "Fixes, tweaks and questions answered after you're live.", duration: "Ongoing" },
];
