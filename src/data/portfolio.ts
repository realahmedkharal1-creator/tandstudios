/**
 * PORTFOLIO: one object per project. To add a real project:
 * Shopify projects are always listed first. Set featured: true on one project to show it large.
 *   1. Copy an object, paste it at the top of the array
 *   2. Change id, title, client, category, url, description, tags
 *   3. Save a screenshot in /public/portfolio/ and set previewImage: "/portfolio/name.jpg"
 *   4. Keep screenshots around 1400px wide (JPG) so the page stays fast
 *
 * Any item whose url contains "example.com" is treated as a SAMPLE: it shows a "Sample" badge
 * and the "every project is real" line is hidden.
 * All of these sites block iframes, so visitors see the screenshot (previewImage).
 */
export type PortfolioCategory = "shopify" | "woocommerce" | "pos-software";

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: PortfolioCategory;
  url: string;
  previewImage?: string;
  description: string;
  tags: string[];
  results?: string[]; // only REAL results you can prove
  featured?: boolean;
  /** Set to false to never try a live iframe preview for this item. */
  livePreview?: boolean;
}

export const categoryLabels: Record<PortfolioCategory, string> = {
  shopify: "Shopify",
  woocommerce: "WooCommerce",
  "pos-software": "POS & Software",
};

export const isSampleUrl = (url: string) => url.includes("example.com");

export const portfolio: PortfolioItem[] = [
  {
    id: "tendoramart",
    title: "Tendora Mart",
    client: "Tendora Mart",
    category: "shopify",
    url: "https://tendoramart.com",
    previewImage: "/portfolio/tendoramart.jpg",
    description: "Smart-gadget store with a bold category banner, PKR pricing and free delivery across Pakistan.",
    tags: ["Shopify", "Custom theme", "PKR"],
    livePreview: false,
  },
  {
    id: "reehmart",
    title: "ReehMart",
    client: "ReehMart",
    category: "shopify",
    url: "https://reehmart.com",
    previewImage: "/portfolio/reehmart.jpg",
    description: "Kitchenware and home store with a full-width hero, clear category menu and cash on delivery.",
    tags: ["Shopify", "Cash on delivery", "UAE"],
    livePreview: false,
  },
  {
    id: "knivesseller",
    title: "Knivesseller",
    client: "Knivesseller",
    category: "shopify",
    url: "https://knivesseller.com",
    previewImage: "/portfolio/knivesseller.jpg",
    description: "Premium knife store with personalized engraving, clean collections and a bold brand look.",
    tags: ["Shopify", "Brand store", "US shipping"],
    livePreview: false,
  },
  {
    id: "coffixclub",
    title: "Coffix Club",
    client: "Coffix Club",
    category: "shopify",
    url: "https://coffixclub.com",
    previewImage: "/portfolio/coffixclub.jpg",
    description: "Wellness brand store with sale banners, product collections and a customer trust-rating bar.",
    tags: ["Shopify", "Sale campaigns"],
    livePreview: false,
  },
];
