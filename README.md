# UNTITLED — Brand Site

Dark streetwear brand site structured after the kOTR Framer template
(layout/typography patterns only — all imagery and copy are our own),
built as a React SPA.

## Stack

- **Vite + React 19 + TypeScript**, react-router SPA (`/`, `/products`,
  `/collections`, `/about`)
- **GSAP + ScrollTrigger** — pinned horizontal parallax gallery on Home
- **Lenis** smooth scroll, driven on `gsap.ticker` (single frame loop for
  Lenis + ScrollTrigger + gallery lerp — see `src/hooks/useSmoothScroll.ts`)
- **ReactBits components** (`src/components/reactbits/`, MIT + Commons
  Clause): SplitText, BlurText, AnimatedContent, FadeContent, Noise, Magnet,
  TiltedCard, SpotlightCard
- Fonts: **Anton SC** (display), **Geist Mono** (captions/UI), **Inter**
  (body), **Caveat** (scrawl accents) — Google Fonts

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
```

## Structure

- `src/App.tsx` — shell: NavCard (kOTR-style floating card), CartDrawer,
  SearchOverlay, Toast, Footer, routes
- `src/context/CartContext.tsx` — localStorage cart (`untitled-cart` key)
- `src/components/HorizontalGallery.tsx` — the pinned scroll gallery;
  ScrollTrigger supplies the target, a `deltaRatio`-damped lerp renders it.
  Cleanup removes the ticker callback (StrictMode-safe)
- `src/components/Monument.tsx` — full-bleed marble-monolith section
  (Higgsfield artwork, `public/brand/monument.webp`) with scroll parallax
  and the current drop's products in glass cards
- `src/components/Hero.tsx` — scroll-scrubbed 85-frame canvas sequence
  extracted from a Higgsfield product video (`public/hero-seq/`)
- `public/brand/` — logo art extracted from the brand PDF

## Placeholder content

- Product photos (`public/images/*.webp`) are demo images — swap for real
  photography
- Checkout button is a stub ("connect Shopify checkout here")

## Shopify note

This is a plain React SPA. For the eventual Shopify migration, either port
sections into a Liquid theme (Dawn) or move to Hydrogen and reuse the React
components largely as-is.
