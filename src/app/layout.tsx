import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import Providers from "@/components/Providers";
import { isSet, site } from "@/data/site";
import { aggregate, realTestimonials } from "@/lib/data";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap", fallback: ["system-ui", "sans-serif"] });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap", fallback: ["system-ui", "sans-serif"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: site.url, siteName: site.name, title: `${site.name}: ${site.tagline}`, description: site.description },
  twitter: { card: "summary_large_image", title: `${site.name}: ${site.tagline}`, description: site.description },
};

export const viewport: Viewport = { themeColor: "#0a0a0a", width: "device-width", initialScale: 1 };

/** Structured data. Review markup is included ONLY when real (non-placeholder) reviews exist. */
function jsonLd() {
  const agg = aggregate();
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description: site.description,
    url: site.url,
    email: site.email,
    areaServed: site.serviceArea,
    sameAs: [site.fiverr, ...site.socials.map((s) => s.url)].filter(isSet),
    knowsAbout: ["Shopify development", "WooCommerce development", "POS software", "Facebook ads", "TikTok ads", "Digital marketing"],
  };
  if (agg) {
    data.aggregateRating = { "@type": "AggregateRating", ratingValue: agg.avg, reviewCount: agg.count };
    data.review = realTestimonials.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewRating: { "@type": "Rating", ratingValue: t.rating },
      reviewBody: t.quote,
    }));
  }
  return JSON.stringify(data);
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a href="#services" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-on-brand">Skip to content</a>
        <Providers>{children}</Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd() }} />
      </body>
    </html>
  );
}
