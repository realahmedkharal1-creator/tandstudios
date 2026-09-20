import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const dynamic = "force-static";
export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// On-brand OG card: near-black, lime accent. Edit colours here if you change --brand.
export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0a0a0a", color: "#f5f5f0", padding: 72, backgroundImage: "radial-gradient(circle at 85% 10%, rgba(181,244,35,0.25), transparent 45%)" }}>
        <div style={{ display: "flex", fontSize: 44, fontWeight: 700 }}>
          Tand<span style={{ color: "#b5f423" }}>Studios</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 700, lineHeight: 1.03, letterSpacing: -3 }}>
          <span>Stores that sell.</span>
          <span><span style={{ color: "#b5f423" }}>Software</span>&nbsp;that fits your shop.</span>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#9a9a94" }}>Shopify · WooCommerce · Custom POS · Web development</div>
      </div>
    ),
    size,
  );
}
