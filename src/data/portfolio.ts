/**
 * PORTFOLIO: one object per project. To add a real project:
 * Shopify projects are always listed first; set featured: true on your best Shopify store.
 *   1. Copy an object, paste it at the top of the array
 *   2. Change id, title, client, category, url, description, tags
 *   3. Save a screenshot in /public/portfolio/ and set previewImage: "/portfolio/name.jpg"
 *   4. Delete the `// REPLACE WITH REAL PROJECT` sample entries
 *
 * Any item whose url still contains "example.com" is treated as a SAMPLE:
 * it shows a "Sample" badge and the "every project is real" line is hidden.
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
  // REPLACE WITH REAL PROJECT
  {
    id: "sample-pos",
    title: "Sample Pharmacy POS",
    client: "Sample Client",
    category: "pos-software",
    url: "https://example.com/store-1",
    description: "Batch and expiry tracking, salt search and khata in one fast billing screen.",
    tags: ["Custom POS", "Offline-ready", "Inventory"],
  },
  // REPLACE WITH REAL PROJECT
  {
    id: "sample-shopify-1",
    featured: true,
    title: "Sample Fashion Store",
    client: "Sample Client",
    category: "shopify",
    url: "https://example.com/store-2",
    description: "A custom Shopify theme built for mobile shoppers and a faster checkout.",
    tags: ["Shopify", "Custom theme"],
  },
  // REPLACE WITH REAL PROJECT
  {
    id: "sample-woo-1",
    title: "Sample Electronics Shop",
    client: "Sample Client",
    category: "woocommerce",
    url: "https://example.com/store-3",
    description: "WooCommerce store with local payment methods and cash-on-delivery flow.",
    tags: ["WooCommerce", "Local payments"],
  },
  // REPLACE WITH REAL PROJECT
  {
    id: "sample-shopify-2",
    title: "Sample Skincare Brand",
    client: "Sample Client",
    category: "shopify",
    url: "https://example.com/store-4",
    description: "Brand-first storefront with bundles, reviews and a clean product story.",
    tags: ["Shopify", "Bundles"],
  },
  // REPLACE WITH REAL PROJECT
  {
    id: "sample-pos-2",
    title: "Sample Wholesale Ledger",
    client: "Sample Client",
    category: "pos-software",
    url: "https://example.com/store-6",
    description: "Supplier and customer khata with bulk pricing and daily reports.",
    tags: ["Custom software", "Khata / ledger"],
  },
];
