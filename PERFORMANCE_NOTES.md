# Landing-page first-render performance pass

## TL;DR
First paint of `/` was being held back by **~5 MB of unoptimized assets** in `/public` and a **blocking auth fetch** that gated every visitor (including unauthed ones) behind a full-screen skeleton. After this pass:

- `/public` shrank from **~4.8 MB → ~700 KB** (≈ 86% smaller).
- The landing page renders **immediately** — no auth round-trip on the critical path.
- Below-the-fold sections (`InteractiveShowcase`, `HowItWorks`, `Bottom`, `Dashboard`) are now code-split out of the initial JS bundle.
- All hero/showcase images are served via `next/image` with `avif`/`webp`, responsive `sizes`, and lazy-loading where appropriate.

---

## What was wrong

### 1. Public folder was the dominant cost
Every visitor was downloading the full-resolution originals. Worst offenders:

| File | Size | Notes |
|---|---|---|
| `try_on_result.png` | **3.5 MB** | 1536×2048 PNG, displayed at ~700 px |
| `target.jpeg` | 650 KB | 1536×2048, displayed at ~700 px |
| `exmaple.jpg` | 583 KB | 784×1168, displayed at 224 px |
| `example2.jpeg` | 264 KB | unused |
| `src.jpeg` | 183 KB | mildly oversized |
| `grokimage.png`, `logo.svg`, `logo2.svg`, `logo6.svg`, `file.svg`, `globe.svg` | — | unused |

### 2. Landing page blocked on `useMe()`
[app/page.tsx](app/page.tsx) returned a full-screen `<LoadingSkeleton/>` while `/api/auth/me` resolved. For an unauthed first-time visitor (the vast majority of landing traffic) that is pure latency added to first contentful paint.

### 3. Everything was a `"use client"` monolith
The whole tree (`Navbar`, `HeroSection`, `InteractiveShowcase`, `HowItWorks`, `Dashboard`, `Bottom`) was imported eagerly and shipped in the initial JS bundle, even though only `Navbar`+`HeroSection` are above the fold.

### 4. Plain `<img>` tags for everything
No responsive `srcset`, no AVIF/WebP, no lazy loading, no priority hints, no width/height (→ CLS).

### 5. External Unsplash images at `q=80&w=1080`
Three decorative cards each pulled ~150–250 KB of Unsplash JPEG into the hero, even though they render at 64×64 → 256×256 px.

---

## What I changed

### `public/` — image optimization & cleanup
- Re-encoded the 4 large rasters with `sips` (resized to ≤900 px on the long edge, JPEG q≈75–80):
  - `try_on_result.png` (3.5 MB) → `try_on_result.jpg` (216 KB) — **94% smaller**
  - `target.jpeg` (650 KB) → 228 KB — **65% smaller**
  - `exmaple.jpg` (583 KB) → 89 KB — **85% smaller**
  - `src.jpeg` (183 KB) → 163 KB
- Deleted unused assets: `example2.jpeg`, `grokimage.png`, `logo.svg`, `logo2.svg`, `logo6.svg`, `file.svg`, `globe.svg`.
- Updated reference in [components/InteractionShowCase.tsx](components/InteractionShowCase.tsx) for the renamed `try_on_result.jpg`.

Final `/public` size: **~700 KB** total (down from ~4.8 MB).

### [app/page.tsx](app/page.tsx) — render landing immediately
- Removed the blocking skeleton: the landing page now renders synchronously on first paint. We only swap in the `Dashboard` after `useMe()` resolves with a logged-in user.
- `Dashboard`, `InteractiveShowcase`, `HowItWorks`, `Bottom` are now `next/dynamic` imports — they no longer ship in the initial JS bundle.
- Removed unused `PreferencesScreen` import.

### [components/HeroSection.tsx](components/HeroSection.tsx)
- Switched logo `<img>` tags to `next/image` (with `priority` on the badge logo).
- Replaced the `/exmaple.jpg` `<img>` with a `next/image` `fill` + `sizes="224px"` so we serve a 224 px-wide AVIF/WebP instead of the 784 px source.
- Reduced both Unsplash decorative cards to `q=70&w=80` and `q=70&w=400` (the previous `w=1080` was ~5× larger than the rendered size). Added `loading="lazy"` and `decoding="async"`.

### [components/InteractionShowCase.tsx](components/InteractionShowCase.tsx)
- Both heavy product images (`/src.jpeg`, `/target.jpeg`, `/try_on_result.jpg`) now go through `next/image` with `fill` + responsive `sizes` + `loading="lazy"`.
- The toggle still works, but only the visible variant is requested at any time.

### [components/HowItWorks.tsx](components/HowItWorks.tsx)
- Reduced the Unsplash hero from `w=1080&q=80` to `w=600&q=70`, added `loading="lazy"` + `decoding="async"`.

### [next.config.ts](next.config.ts)
- Enabled AVIF + WebP transcoding (`formats: ["image/avif","image/webp"]`).
- Set `minimumCacheTTL` to 30 days for the optimizer cache.
- Tightened `deviceSizes` / `imageSizes` to realistic breakpoints (smaller variants → smaller payloads on mobile).
- Kept the existing `**` `remotePatterns` but added an explicit `images.unsplash.com` entry so the optimizer can rewrite the Unsplash URLs if you migrate them to `next/image` later.

---

## What you (or a follow-up) should still do

### 1. Move large rasters to S3 + CloudFront (the original ask)
I optimized the files in place but did not push them to S3 because there are no AWS credentials in this environment. To finish:

1. Create an S3 bucket (e.g. `furnfit-assets`) and put it behind CloudFront with a long `Cache-Control: public, max-age=31536000, immutable`.
2. Upload `public/src.jpeg`, `public/target.jpeg`, `public/try_on_result.jpg`, `public/exmaple.jpg`.
3. In each component, swap the `src="/file.jpg"` for `src="https://cdn.furnfit.com/file.jpg"`.
4. Delete those files from `/public` so they stop shipping with the Vercel deploy and stop counting against Vercel's image-optimization quota.
5. (Optional) Generate AVIF/WebP versions at upload time and use `<picture>` so you bypass Vercel's image optimizer entirely.

Sample upload command once creds are configured:
```bash
aws s3 sync public/ s3://furnfit-assets/ \
  --exclude "*" --include "*.jpg" --include "*.jpeg" --include "*.webp" \
  --cache-control "public, max-age=31536000, immutable"
```

### 2. Make the root route a Server Component
[app/page.tsx](app/page.tsx) is `"use client"` only because of `useMe()`. Splitting it like this would let the landing page stream as HTML with zero JS until interactivity:

- `app/page.tsx` → server component that renders `<Navbar/>` + `<HeroSection/>` + below-the-fold sections.
- A small client island (e.g. `<AuthGate/>`) handles the `useMe()`-driven swap to `<Dashboard/>`.

### 3. Drop `motion` from the hero (or load it lazily)
`motion/react` is ~40 KB gz on the critical path just for entrance animations. Either:
- Replace the hero entrance animations with CSS keyframes, or
- Wrap motion-only children in `next/dynamic(..., { ssr: false })`.

### 4. Strip the `console.log` calls in [features/auth/hooks/useMe.ts](features/auth/hooks/useMe.ts)
They print the entire `Response` and user object on every render in production.

### 5. Add a `loading.tsx`
A route-level `loading.tsx` will let Next stream the shell while the dynamic chunks load, instead of falling back to a blank frame on slow networks.

### 6. Audit the rest of the icons
`lucide-react` is tree-shakable but several components import 6–8 icons they don't all use. A quick pass to remove unused icons would save another few KB.

---

## How to verify

```bash
# size check
du -sh public/

# build & inspect bundle
npm run build
# look at the "First Load JS" column for "/" — should drop noticeably vs main

# lighthouse (mobile, slow 4G) on the deployed Vercel URL
npx lighthouse https://<your-vercel-url>/ --preset=mobile --view
```

Expect FCP/LCP improvements primarily from (a) the 4 MB asset reduction, (b) the auth fetch no longer being on the critical path, and (c) below-the-fold code-splitting.
