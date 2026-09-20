# TandStudios landing page

Next.js (App Router) + TypeScript + Tailwind + Framer Motion. Fully static: no backend, deploys to Vercel or Netlify.
**You edit content only in `src/data/*.ts`. You never need to touch the components.**

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000  (shows sample reviews for layout preview)
npm run build      # production build into /out, prints a "things still to replace" list
npm start          # serve the built /out folder
```

## What to edit

| File | What it controls |
|---|---|
| `src/data/site.ts` | Brand name, tagline, **WhatsApp number**, **email**, **Fiverr link**, socials, domain, hero trust points, stats, marquee |
| `src/data/services.ts` | Service cards, "Why us" points, process steps |
| `src/data/portfolio.ts` | Projects |
| `src/data/testimonials.ts` | Reviews |
| `src/data/pricing.ts` | Package cards (no prices, WhatsApp CTAs) |
| `src/data/faq.ts` | FAQ |

Search for `[PLACEHOLDER]`, `[EDIT` and `REPLACE WITH` to find every spot that needs your real content.

## Add a portfolio item

1. Open `src/data/portfolio.ts`, copy one object, paste it at the top of the array.
2. Edit these fields: `id` (unique), `title`, `client`, `category` (`shopify`, `woocommerce`, `pos-software`), `url` (the live link), `description`, `tags`.
3. Save a screenshot (about 1600x1000, top of the homepage) to `public/portfolio/name.jpg` and set `previewImage: "/portfolio/name.jpg"`.
4. Optional: `featured: true` (shown large; use it on one item), `results: [...]` (real results only), `livePreview: false` (never try an iframe).
5. Delete the `// REPLACE WITH REAL PROJECT` sample items.

**How previews work:** the screenshot is always shown first. At build time the script `scripts/check-placeholders.mjs` checks whether each real URL allows iframes. If it does, a live preview fades in on hover (or on scroll-into-view for the featured card). If a site blocks embedding, or doesn't load within 8 seconds, the screenshot simply stays. Without a `previewImage` a designed placeholder is shown, so add screenshots.
Clicking a card or "Visit Live Store" opens the URL in a new tab. The small expand button opens Quick View (Esc closes it).
Items whose URL contains `example.com` show a "Sample" badge, and the line "Every project above is a real, live build" is hidden until all are real.

## Add a review

1. Open `src/data/testimonials.ts`, copy an object and fill it in. **Do not** add `isPlaceholder`.
2. For a WhatsApp/Fiverr screenshot: save the image in `public/reviews/` and set `screenshot: "/reviews/name.jpg"` (it renders as a proof card).
3. Delete the sample entries (all marked `isPlaceholder: true`).

Honesty rules built in: sample reviews are **hidden in the production build**. If no real review exists, the whole Reviews section and its nav link disappear. The star-rating strip and `Review`/`AggregateRating` structured data use real reviews only. `npm run build` prints how many placeholders remain. (To preview samples in a production build anyway, set `NEXT_PUBLIC_SHOW_PLACEHOLDERS=true`. Not recommended for launch.)

## Packages (no prices shown)

The site intentionally shows **no prices**. Each package card in `src/data/pricing.ts` has a line like "Quoted to your needs" and a WhatsApp button with its own pre-filled message (plus an email link). Edit the text, features and `whatsappMessage` there.

## Change the brand color

Open `src/app/globals.css` and change one line: `--brand: #b5f423;`. Soft tints, glows and borders derive from it. The social/OG image colour is in `src/app/opengraph-image.tsx`, and the favicon in `src/app/icon.svg`.

## Contact form setup (no backend)

**Web3Forms (easiest):** go to web3forms.com, enter your email, and copy the access key. Then in `.env.local`:

```
NEXT_PUBLIC_WEB3FORMS_KEY=your-key-here
```

**Or Formspree:** create a form and set `NEXT_PUBLIC_FORMSPREE_URL=https://formspree.io/f/xxxxxxx`.

On Vercel/Netlify, add the same variable in the project's Environment Variables settings. Until a key is set, the form validates but shows an "isn't connected yet, use WhatsApp" message. WhatsApp and email buttons work regardless.

## Deploy

- **Vercel:** push to GitHub, import the repo at vercel.com. No settings needed. Add the env variable above.
- **Netlify:** build command `npm run build`, publish directory `out`.
- After you have a domain, update `url` in `site.ts` (used for canonical link, sitemap, robots and share cards).

## Before launch checklist

- [ ] `site.ts`: WhatsApp, email, Fiverr, socials, domain
- [ ] Portfolio: real URLs plus screenshots in `public/portfolio/`
- [ ] Real reviews in `testimonials.ts`
- [ ] Form key in env
- [ ] Remove the `[EDIT ...]` notes in `faq.ts` / `services.ts`
