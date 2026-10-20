## Learned User Preferences
- Brand primary color is `#123438` (deep teal); derive supporting neutrals and accents from that teal undertone rather than the older olive/bark palette.
- Prefer sketch/drawing-style imagery across the site matched to destinations and subjects; keep the home hero as video on desktop and mobile. Colorful sketch swaps were tried and reverted — stick with the sepia/field sketch set unless asked otherwise.
- Home hero video uses local compressed clips under `public/media/sketches/`: `home.mp4` / `home.webm` (desktop) and `home-mobile.mp4` (~1MB, phones). Keep `videoMobile` enabled so the hero video plays on phones.
- Use Solar Icons (`@solar-icons/react`, Linear style) for icons site-wide via the shared `Icon` wrapper.
- Enquiry/contact forms should use: Start Date (dd/mm/yyyy), Number of Days, Guests, Full Name, Email Address, Phone Number, Parks of interest (Ranthambore, Jim Corbett, Panna, Satpura, Sariska), Special Requests, and a Send enquiry CTA.
- Prefer spelling Ranthambore in URLs, titles, and H1s (use “Ranthambhore” sparingly as an alternate in body); prefer Jim Corbett over bare “Corbett” in titles/H1s.
- Use the navbar brand mark as the site-wide logo and favicon; prefer a white favicon so it stays visible.

## Learned Workspace Facts
- Production site/domain is `https://tigersafarisinindia.com` (brand: Tiger Safaris in India).
- Stack is Vite + React with `BrowserRouter` path URLs and a post-build prerender script (`scripts/prerender.mjs`) that writes per-route HTML for crawlers.
- Five focus parks/destinations: Ranthambore, Jim Corbett, Panna, Satpura, Sariska — public paths like `/destinations/ranthambore-tiger-safari/`.
- Local sketch media (images and hero `home.webm`) live under `public/media/sketches/`; media mapping is centralized in `src/data/media.js`.
- Primary booking CTA is Plan My Safari → `/plan-your-safari/`; main nav pattern is Destinations, Experiences, Journeys, Why Us, Impact, Stories.
- Brand contact (in `src/data/config.js`): email `regency@ranthambhor.com`, phone/WhatsApp `+91 9315297507`.
- Footer copyright year range starts at 2006 (© 2006–current year).
