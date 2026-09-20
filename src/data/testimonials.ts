/**
 * REVIEWS: paste REAL customer reviews here.
 *
 * To add one: copy an object, fill it in, and DO NOT set isPlaceholder.
 * Optional `screenshot`: path to a WhatsApp/Fiverr review image in /public/reviews/
 * (that entry then renders as a "screenshot proof" card).
 *
 * Entries with isPlaceholder: true are HIDDEN in the production build
 * (they only show in `npm run dev`). If no real reviews exist, the whole section
 * and its nav link disappear so the site never shows invented reviews.
 */
export interface Testimonial {
  name: string;
  role: string;
  city: string;
  businessType: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  service: "shopify" | "woocommerce" | "pos-software" | "website";
  avatar?: string;
  verifiedSource?: string; // "Fiverr", "WhatsApp", "Google"
  screenshot?: string;
  isPlaceholder?: boolean;
}

export const serviceLabels: Record<Testimonial["service"], string> = {
  shopify: "Shopify store",
  woocommerce: "WooCommerce store",
  "pos-software": "POS software",
  website: "Website",
};

export const testimonials: Testimonial[] = [
  // REPLACE WITH REAL REVIEW
  {
    name: "Sample Customer",
    role: "Owner, City Pharmacy",
    city: "Lahore",
    businessType: "Pharmacy",
    quote: "Sample text: the POS matched how we already work. Billing is faster and expiry alerts save us real money.",
    rating: 5,
    service: "pos-software",
    verifiedSource: "WhatsApp",
    isPlaceholder: true,
  },
  // REPLACE WITH REAL REVIEW
  {
    name: "Sample Customer",
    role: "Founder, Sample Boutique",
    city: "Karachi",
    businessType: "Fashion brand",
    quote: "Sample text: our new Shopify store looks premium and loads fast on mobile. Orders went smoother from day one.",
    rating: 5,
    service: "shopify",
    verifiedSource: "Fiverr",
    isPlaceholder: true,
  },
  // REPLACE WITH REAL REVIEW
  {
    name: "Sample Customer",
    role: "Owner, Sample Mart",
    city: "Faisalabad",
    businessType: "Grocery mart",
    quote: "Sample text: barcode billing and stock tracking finally work without slowing the counter.",
    rating: 5,
    service: "pos-software",
    isPlaceholder: true,
  },
  // REPLACE WITH REAL REVIEW
  {
    name: "Sample Customer",
    role: "Director, Sample Traders",
    city: "Arifwala",
    businessType: "Wholesaler",
    quote: "Sample text: supplier and customer ledger in one place. No more notebooks.",
    rating: 4,
    service: "pos-software",
    isPlaceholder: true,
  },
  // REPLACE WITH REAL REVIEW
  {
    name: "Sample Customer",
    role: "Owner, Sample Electronics",
    city: "Islamabad",
    businessType: "Electronics retailer",
    quote: "Sample text: WooCommerce with JazzCash and COD set up exactly the way I asked.",
    rating: 5,
    service: "woocommerce",
    isPlaceholder: true,
  },
];
