/** SERVICES, WHY-US POINTS AND PROCESS STEPS: edit the text freely. */

export type IconName =
  | "store" | "pos" | "code" | "wrench" | "user" | "wifioff" | "tag"
  | "headset" | "globe" | "megaphone" | "layout" | "zap" | "pill" | "cart" | "truck" | "plus";

export interface ServiceItem {
  id: string;
  icon: IconName;
  title: string;
  bestFor: string; // one line: who this is for
  blurb: string; // one plain sentence: what we do
  gets: string[]; // 4 short points: what the customer gets
  chips?: string[]; // optional small tags (e.g. shop types)
  main?: boolean; // highlight as the main service
  cta: string;
  whatsappMessage: string;
}

export const serviceList: ServiceItem[] = [
  {
    id: "store",
    icon: "store",
    title: "Online store (Shopify or WooCommerce)",
    bestFor: "For shops that want to sell online, or a store that isn't selling yet.",
    blurb: "We design and build your store so customers can find products, trust you and check out easily on their phone.",
    gets: [
      "Custom design that matches your brand",
      "Product pages that help people buy",
      "Fast and easy on mobile",
      "Payments and shipping set up (local and international)",
    ],
    main: true,
    cta: "Get a store quote",
    whatsappMessage: "Hi TandStudios, I want an online store (Shopify / WooCommerce). My business is ",
  },
  {
    id: "ads",
    icon: "megaphone",
    title: "Facebook and TikTok ads",
    bestFor: "For stores that have products but need more customers.",
    blurb: "We run paid ads that bring interested shoppers to your store, and show you what is working.",
    gets: [
      "Facebook ad campaigns",
      "TikTok ad campaigns",
      "Ad designs and copy",
      "Tracking and clear reports",
    ],
    cta: "Get an ads quote",
    whatsappMessage: "Hi TandStudios, I want Facebook / TikTok ads for my store. My business is ",
  },
  {
    id: "software",
    icon: "pos",
    title: "POS and custom software",
    bestFor: "For shops that still use notebooks, Excel, or software that doesn't fit.",
    blurb: "Billing, stock and khata software built around how your shop works. It can run without internet too.",
    gets: [
      "Fast billing, with barcode support",
      "Stock, expiry and supplier tracking",
      "Customer and supplier khata (ledger)",
      "Daily reports",
    ],
    chips: ["Pharmacies", "Grocery marts", "Wholesalers", "Retail shops", "Other"],
    cta: "Talk about software",
    whatsappMessage: "Hi TandStudios, I need a POS / business software for my shop. My business is ",
  },
  {
    id: "fix",
    icon: "wrench",
    title: "Redesign or fix your store",
    bestFor: "For a store or website that is slow, outdated or not selling.",
    blurb: "We check what is wrong, fix it and hand it back working better. No full rebuild unless it is really needed.",
    gets: [
      "Speed and mobile fixes",
      "Better product pages and checkout",
      "A fresh, modern redesign",
      "Fixes for bugs and setup problems",
    ],
    cta: "Get it checked",
    whatsappMessage: "Hi TandStudios, my store/website needs a redesign or fixes. It is ",
  },
];

export const why: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "store",
    title: "Stores built to sell",
    text: "Product pages, cart and checkout designed around getting orders, not just looking good.",
  },
  {
    icon: "layout",
    title: "Custom Shopify & WooCommerce themes",
    text: "Your brand, your layout. Not a recycled template that looks like every other store.",
  },
  {
    icon: "zap",
    title: "Fast and mobile-first",
    text: "Most shoppers buy on their phone. Your store loads quickly and feels natural on a small screen.",
  },
  {
    icon: "globe",
    title: "Local and international payments",
    text: "Payments and shipping set up for Pakistan and for customers in the US, UK, Canada and Australia.",
  },
  {
    icon: "user",
    title: "You talk to the builder",
    text: "No account managers, no lost-in-translation. The person who designs and codes your store is the one replying.",
  },
  {
    icon: "headset",
    title: "Support after launch",
    text: "Launch isn't the end. Ask for help, fixes and changes after go-live.",
  },
];

export const process: { title: string; text: string; duration: string }[] = [
  { title: "Discovery call", text: "We learn your business, goals and how things work today.", duration: "30–45 min" },
  { title: "Proposal & design", text: "You get a clear scope, price, timeline and first designs.", duration: "1–2 days" },
  { title: "Build & review", text: "We build in stages. You review and give feedback along the way.", duration: "3–4 days" },
  { title: "Launch", text: "Testing, data import, go-live. Your team gets trained.", duration: "1 day" },
  { title: "Support", text: "Fixes, tweaks and questions answered after you're live.", duration: "Ongoing" },
];
