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
  /** Store logo (shown in the logo slider under the hero). Save it in /public/logos/ */
  logo?: string;
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
    logo: "/logos/tendoramart.png",
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
    logo: "/logos/reehmart.png",
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
    logo: "/logos/knivesseller.png",
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
    logo: "/logos/coffixclub.png",
    description: "Wellness brand store with sale banners, product collections and a customer trust-rating bar.",
    tags: ["Shopify", "Sale campaigns"],
    livePreview: false,
  },
  {
    id: "luxoramart",
    title: "Luxoramart",
    client: "Luxoramart",
    category: "shopify",
    url: "https://9smkux-ib.myshopify.com/?pb=0",
    previewImage: "/portfolio/luxoramart.jpg",
    logo: "/logos/luxoramart.png",
    description: "Home, kitchen and gadgets store with a bold sale banner and a clean category menu.",
    tags: ["Shopify", "Sale banners"],
    livePreview: false,
  },
  {
    id: "hscarts",
    title: "HS Carts Shop",
    client: "HS Carts Shop",
    category: "shopify",
    url: "https://hscarts.shop",
    previewImage: "/portfolio/hscarts.jpg",
    logo: "/logos/hscarts.png",
    description: "Home and kitchen deals store with a bright discount hero and easy category navigation.",
    tags: ["Shopify", "Deals store"],
    livePreview: false,
  },
  {
    id: "eastpret",
    title: "East Pret",
    client: "East Pret",
    category: "shopify",
    url: "https://eastpret.com",
    previewImage: "/portfolio/eastpret.jpg",
    logo: "/logos/eastpret.png",
    description: "Fashion store with an editorial hero, a clear collection menu and a sale announcement bar.",
    tags: ["Shopify", "Fashion"],
    livePreview: false,
  },
  {
    id: "urbannest",
    title: "Urban Nest",
    client: "Urban Nest",
    category: "shopify",
    url: "https://myurbannest.online",
    previewImage: "/portfolio/urbannest.jpg",
    logo: "/logos/urbannest.png",
    description: "Premium accessories store with an elegant brand-led hero and trust badges.",
    tags: ["Shopify", "Accessories"],
    livePreview: false,
  },
  {
    id: "novatech",
    title: "Nova Tech",
    client: "Nova Tech",
    category: "shopify",
    url: "https://thenovatech.store",
    previewImage: "/portfolio/novatech.jpg",
    logo: "/logos/novatech.png",
    description: "Audio and gadgets store with a limited-time sale countdown and shop-by-collection layout.",
    tags: ["Shopify", "Electronics"],
    livePreview: false,
  },
  {
    id: "meandmine",
    title: "Me and Mine",
    client: "Me and Mine",
    category: "shopify",
    url: "https://meandmine.com.pk",
    previewImage: "/portfolio/meandmine.jpg",
    logo: "/logos/meandmine.png",
    description: "Skin and hair care store with a bold visual hero and easy product categories.",
    tags: ["Shopify", "Beauty"],
    livePreview: false,
  },
  {
    id: "fahstore",
    title: "Fah Store",
    client: "Fah Store",
    category: "shopify",
    url: "https://fahstore.pk",
    previewImage: "/portfolio/fahstore.jpg",
    logo: "/logos/fahstore.png",
    description: "Sale-driven store with a high-impact promo hero and a simple, clean header.",
    tags: ["Shopify", "Sale campaigns"],
    livePreview: false,
  },
  {
    id: "robes",
    title: "ROBES",
    client: "ROBES",
    category: "shopify",
    url: "https://robespk.com",
    previewImage: "/portfolio/robes.jpg",
    logo: "/logos/robes.png",
    description: "Western wear brand store with a clean fashion hero and a full category menu.",
    tags: ["Shopify", "Fashion brand"],
    livePreview: false,
  },
  {
    id: "shafani",
    title: "Shafani",
    client: "Shafani",
    category: "shopify",
    url: "https://shafani.com",
    previewImage: "/portfolio/shafani.jpg",
    logo: "/logos/shafani.png",
    description: "Fashion brand store with a full-width editorial hero and a clear collection menu.",
    tags: ["Shopify", "Fashion brand"],
    livePreview: false,
  },
  {
    id: "moontouch",
    title: "Moon Touch",
    client: "Moon Touch",
    category: "shopify",
    url: "https://moontouch.co",
    previewImage: "/portfolio/moontouch.jpg",
    logo: "/logos/moontouch.png",
    description: "Skin care and cosmetics brand with a clean, product-first look.",
    tags: ["Shopify", "Beauty"],
    livePreview: false,
  },
  {
    id: "orlaxy",
    title: "Orlaxy Glow",
    client: "Orlaxy Glow",
    category: "shopify",
    url: "https://orlaxy.com",
    previewImage: "/portfolio/orlaxy.jpg",
    logo: "/logos/orlaxy.png",
    description: "Ladies' bags and accessories store with a soft brand look and clear categories.",
    tags: ["Shopify", "Accessories"],
    livePreview: false,
  },
];
