// ─────────────────────────────────────────────────────────────
// All photos and video in one place.
//
// Site imagery uses pencil / ink field-sketch drawings matched to
// each destination and theme (river → river sketch, fort → fort, etc.).
//
// Sketch files live in /public/media/sketches/
// To swap one image, replace the matching JPG there.
//
// Hero video (compressed for phones):
//   desktop → /public/media/sketches/home.mp4 (+ home.webm)
//   mobile  → /public/media/sketches/home-mobile.mp4
// ─────────────────────────────────────────────────────────────

/** Local sketch drawing in /public/media/sketches */
const sketch = (name) => ({
  src: `/media/sketches/${name}.jpg?v=2`,
})

export const local = (base, widths, ext = 'jpg') => ({
  src: `${base}-${widths[Math.floor(widths.length / 2)]}.${ext}`,
  srcSet: widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(', '),
})

export const media = {
  hero: {
    // H.264 MP4 — reliable autoplay on iOS/Android and desktop.
    video: '/media/sketches/home.mp4',
    videoMobile: '/media/sketches/home-mobile.mp4',
    // Optional WebM for browsers that prefer it (desktop).
    videoWebm: '/media/sketches/home.webm',
    poster: sketch('sketch-intro'),
  },

  intro: sketch('sketch-intro'),
  journeys: sketch('sketch-journeys'),
  ready: sketch('sketch-ready'),
  impactA: sketch('sketch-impact-a'),
  impactB: sketch('sketch-impact-b'),

  parks: {
    // Ranthambore — tiger + fort / fort over lakes
    ranthambhore: sketch('sketch-ranthambore'),
    ranthambhoreAlt: sketch('sketch-ranthambore-alt'),
    // Jim Corbett — tiger in sal forest / Ramganga river
    corbett: sketch('sketch-corbett'),
    corbettAlt: sketch('sketch-corbett-alt'),
    // Panna — tiger on Ken gorge / gharial on river
    panna: sketch('sketch-panna'),
    pannaAlt: sketch('sketch-panna-alt'),
    // Satpura — canoe on Denwa / walking safari trail
    satpura: sketch('sketch-satpura'),
    satpuraAlt: sketch('sketch-satpura-alt'),
    // Sariska — tiger in Aravallis / hill fort ruin
    sariska: sketch('sketch-sariska'),
    sariskaAlt: sketch('sketch-sariska-alt'),
  },

  experiences: {
    jeep: sketch('sketch-jeep'),
    walking: sketch('sketch-walking'),
    canoe: sketch('sketch-canoe'),
    birding: sketch('sketch-birding'),
    elephant: sketch('sketch-elephant'),
    leopard: sketch('sketch-leopard'),
    stars: sketch('sketch-stars'),
  },

  why: {
    destinations: sketch('sketch-why-destinations'),
    wildlife: sketch('sketch-why-wildlife'),
    naturalists: sketch('sketch-why-naturalists'),
    lodges: sketch('sketch-why-lodges'),
    culture: sketch('sketch-why-culture'),
    travel: sketch('sketch-why-travel'),
    impact: sketch('sketch-why-impact'),
  },
}
