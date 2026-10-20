# Tiger Safaris in India — website

React + Vite + Tailwind + Framer Motion. Homepage plus one page per reserve
(Ranthambhore, Corbett, Panna, Satpura, Sariska).

## Run it

```bash
npm install
npm run dev        # local dev server at http://localhost:5173
npm run build      # production build in /dist — upload that folder to any static host
npm run preview    # test the production build locally (use this to judge speed, not `dev`)
```

Works on Netlify, Vercel, Cloudflare Pages, GitHub Pages, Hostinger/cPanel. Routing uses
`HashRouter` (`/#/parks/satpura`), so no server rewrite rules are needed.

## How the site stays fast

- **Right-sized images.** Every photo has a `srcset` from 480 to 2400 px. Phones download
  roughly 480–768 px files and desktops get the larger ones. Unsplash and Pexels serve AVIF or WebP
  automatically.
- **Blur-up.** A ~1 KB blurred preview shows instantly, then the sharp image fades in.
- **Lazy loading.** Only images near the screen load. The hero poster is preloaded from
  `index.html` before any JavaScript runs.
- **Hero video loads last.** The poster shows first. The video starts downloading only after the
  page has finished loading, fades in when it can play, and pauses when scrolled out of view.
  It is skipped for Data Saver, 2G/3G connections and reduced-motion settings. On phones the poster
  gets a slow zoom instead, unless you set `videoMobile` in `src/data/media.js`.
- **Smaller JavaScript.** Animations use `LazyMotion`. Park pages and the enquiry form are
  code-split. React and animation libraries are separate long-cached files.
- **Fonts.** Only the 5 weights used are loaded, with `display=swap`.

### Biggest remaining win: self-host a compressed hero video

The stock clip is a large 1920×1440 file served from Pexels. Export your own 10–20 s seamless loop
and compress it:

```bash
# Desktop: 1280×720, no audio, ~2–3 MB
ffmpeg -i hero-master.mov -an -vf "scale=1280:-2,fps=25" -c:v libx264 -preset slow -crf 28 \
  -profile:v high -pix_fmt yuv420p -movflags +faststart public/media/hero-720.mp4

# Phone (vertical-friendly crop optional): 720 wide, ~1 MB
ffmpeg -i hero-master.mov -an -vf "scale=720:-2,fps=25" -c:v libx264 -preset slow -crf 30 \
  -pix_fmt yuv420p -movflags +faststart public/media/hero-mobile.mp4

# Poster: first frame as a JPG
ffmpeg -i public/media/hero-720.mp4 -frames:v 1 -q:v 3 public/media/hero-poster.jpg
```

Then in `src/data/media.js` set `video: 'media/hero-720.mp4'`, `videoMobile: 'media/hero-mobile.mp4'`,
`poster: 'media/hero-poster.jpg'`, and update the preload link in `index.html`.
`-movflags +faststart` lets the video start playing before it has fully downloaded.

## Where to change things

| What | File |
|---|---|
| Brand name, wordmark, email, phone | `src/data/site.js` → `brand` |
| Logo mark | `src/components/Icons.jsx` → `Mark` |
| Park text, facts, wildlife, highlights | `src/data/site.js` → `parks` |
| Experiences, "Why" tabs, stats | `src/data/site.js` |
| Awards and testimonials (**placeholders**) | `src/data/site.js` → `awards`, `testimonials` |
| Hero video and every photo | `src/data/media.js` |
| Colours and fonts | `tailwind.config.js` |

## Before going live

- Replace placeholder email, phone, awards and guest reviews (don't publish invented reviews).
- Replace stock photos with your own park photography. Stock images are free-licence
  (Unsplash / Pexels) but aren't guaranteed to be from the park they illustrate.
- Check park facts (zones, season dates, distances) against current forest department notices.
- Forms are front-end only. Connect them where marked `TODO` in
  `src/components/EnquiryModal.jsx` and `src/components/Newsletter.jsx`.

## Media credits

- Hero video: "Majestic Tiger Strolling Through Green Jungle" by Mytho Digital, Pexels (Pexels License)
- Photos: various contributors, Unsplash (Unsplash License)
