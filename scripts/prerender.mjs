/**
 * Build-time prerender: unique head tags + full crawlable article HTML inside #root
 * so `curl` sees H1, tables, FAQs and links (SEO plan §9 acceptance test).
 * React replaces #root on hydrate — crawlers and no-JS clients still get the snapshot.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const dist = path.join(root, 'dist')
const siteUrl = 'https://tigersafarisinindia.com'

const PARKS = {
  ranthambore: {
    name: 'Ranthambore',
    alt: 'Ranthambhore',
    state: 'Rajasthan',
    h1: 'Ranthambore Tiger Safari: Tigers, Lakes and a Fortress Wilderness',
    short:
      'Tigers among ruins, lakes and dhok forest. Also spelled Ranthambhore. Best for first-timers and photography.',
    overview:
      'Ranthambore National Park is one of India’s most famous tiger reserves. Dry deciduous forest, rocky hills and lakes sit around the 10th-century Ranthambore Fort.',
    facts: [
      ['State', 'Rajasthan'],
      ['Nearest rail', 'Sawai Madhopur Junction'],
      ['Open', 'October to June (monsoon closure — verify)'],
      ['Vehicles', 'Gypsy / Canter'],
    ],
    zones: [
      ['Zones 1–5', 'Lakes, fort foothills', 'Classic sightings', 'First-timers'],
      ['Zones 6–10', 'Forest and buffer', 'Quieter drives', 'Repeat visitors'],
    ],
    bestTime: [
      ['October–February', 'Cool, comfortable'],
      ['March–June', 'Hot; waterhole sightings'],
      ['July–September', 'Typically closed'],
    ],
    reach: [
      ['Rail', 'Sawai Madhopur (~10–11 km)'],
      ['Road', '~3.5–4h Jaipur; ~6–7h Delhi'],
      ['Air', 'Jaipur Airport'],
    ],
  },
  'jim-corbett': {
    name: 'Jim Corbett',
    alt: 'Corbett',
    state: 'Uttarakhand',
    h1: "Jim Corbett Tiger Safari: India's Oldest National Park",
    short: 'Sal forest, Ramganga river and elephants in the Himalayan foothills. Ideal weekend from Delhi.',
    overview:
      'Founded in 1936, Corbett is India’s oldest national park and where Project Tiger launched in 1973.',
    facts: [
      ['State', 'Uttarakhand'],
      ['Base', 'Ramnagar'],
      ['Established', '1936'],
      ['Vehicles', 'Jeep / Canter'],
    ],
    zones: [
      ['Bijrani', 'Grassland / mixed forest', 'All-round day safaris', 'First-timers'],
      ['Dhikala', 'Reservoir grasslands', 'Overnight rest houses', 'Immersive trips'],
      ['Jhirna', 'Open forest', 'Often open longer', 'Shoulder season'],
      ['Dhela', 'Newer zone', 'Quieter', 'Repeat visitors'],
    ],
    bestTime: [
      ['November–February', 'Cold, clear, birds'],
      ['March–June', 'Warm; good wildlife viewing'],
      ['Monsoon', 'Most zones closed; verify Jhirna'],
    ],
    reach: [
      ['Road', '~5–6h from Delhi'],
      ['Rail', 'Ramnagar'],
      ['Air', 'Pantnagar (~1.5h)'],
    ],
  },
  panna: {
    name: 'Panna',
    state: 'Madhya Pradesh',
    h1: 'Panna Tiger Safari: A Conservation Success Story on the Ken River',
    short: 'Tiger reintroduction success on the Ken river, paired with Khajuraho temples.',
    overview: 'Panna lost its tigers by 2009 and recovered through reintroduction. Quieter safaris than the famous parks.',
    facts: [
      ['State', 'Madhya Pradesh'],
      ['Nearby', 'Khajuraho'],
      ['Gates', 'Madla / Hinauta'],
      ['Extra', 'Ken river boat'],
    ],
    zones: [
      ['Ken river', 'Gorge', 'Boat, gharial, birds', 'Everyone'],
      ['Madla / Hinauta', 'Plateau forest', 'Core jeep safaris', 'Tiger focus'],
    ],
    bestTime: [
      ['October–June', 'Main season'],
      ['November–April', 'Most comfortable'],
      ['April–June', 'Waterholes'],
    ],
    reach: [
      ['Air', 'Khajuraho Airport'],
      ['Rail', 'Khajuraho / Satna'],
      ['Road', 'Khajuraho ~25–35 km'],
    ],
  },
  satpura: {
    name: 'Satpura',
    state: 'Madhya Pradesh',
    h1: 'Satpura Tiger Safari: Walk, Paddle and Track in Wild Central India',
    short: 'Walking, canoe and jeep safaris on the Denwa — slow, immersive Central India.',
    overview: 'Satpura allows guided walks and boat/canoe time rarely offered in other tiger reserves.',
    facts: [
      ['State', 'Madhya Pradesh'],
      ['Gates', 'Madhai'],
      ['Styles', 'Jeep, walk, boat'],
      ['Nearby', 'Pachmarhi'],
    ],
    zones: [
      ['Jeep', 'Core tourism', 'Classic drives', 'Everyone'],
      ['Walking', 'Buffer trails', 'Tracks and birds', 'Active travellers'],
      ['Boat / canoe', 'Denwa', 'Dawn paddles', 'Photographers'],
    ],
    bestTime: [
      ['October–June', 'Main season'],
      ['Winter', 'Birds'],
      ['Summer', 'Visibility at water'],
    ],
    reach: [
      ['Rail', 'Pipariya / Itarsi'],
      ['Air', 'Bhopal (~3–3.5h)'],
    ],
  },
  sariska: {
    name: 'Sariska',
    state: 'Rajasthan',
    h1: 'Sariska Tiger Safari: Aravalli Wilderness Near Delhi and Jaipur',
    short: 'Closest tiger reserve to Delhi. Aravalli valleys, forts and a reintroduction story.',
    overview: 'Sariska’s tigers were reintroduced from 2008. Good for short trips from Delhi or Jaipur.',
    facts: [
      ['State', 'Rajasthan'],
      ['Distance', '~200 km Delhi'],
      ['Rail', 'Alwar'],
      ['Extra', 'Kankwari Fort'],
    ],
    zones: [
      ['Core routes', 'Aravalli valleys', 'Tiger / leopard habitat', 'Weekenders'],
      ['Kankwari Fort', 'Hilltop', 'Heritage inside reserve', 'Culture + wildlife'],
    ],
    bestTime: [
      ['October–March', 'Pleasant'],
      ['April–June', 'Hot; waterholes'],
      ['Monsoon', 'Often limited — verify'],
    ],
    reach: [
      ['Road', '~200 km Delhi; ~110 km Jaipur'],
      ['Rail', 'Alwar'],
    ],
  },
}

function escapeHtml(s = '') {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function table(headers, rows) {
  const th = headers.map((h) => `<th>${escapeHtml(h)}</th>`).join('')
  const tr = rows
    .map((r) => `<tr>${r.map((c) => `<td>${escapeHtml(c)}</td>`).join('')}</tr>`)
    .join('')
  return `<table><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table>`
}

function links(items) {
  return `<ul>${items.map(([href, label]) => `<li><a href="${href}">${escapeHtml(label)}</a></li>`).join('')}</ul>`
}

function faqBlock(items) {
  return items
    .map(
      ([q, a]) =>
        `<section><h3>${escapeHtml(q)}</h3><p>${escapeHtml(a)}</p></section>`,
    )
    .join('')
}

function parkFromPath(p) {
  const m = p.match(/^\/(ranthambore|jim-corbett|panna|satpura|sariska)(\/|$)/)
  return m ? PARKS[m[1]] : null
}

function metaFor(routePath) {
  const p = routePath === '/' ? '/' : routePath.replace(/\/$/, '') || '/'
  const park = parkFromPath(p)
  const base = { path: p, type: 'website' }

  if (p === '/') {
    return {
      ...base,
      title: 'Tiger Safaris in India | Private Tiger Safari Tours',
      description:
        'Plan a private tiger safari in India across Ranthambore, Jim Corbett, Panna, Satpura and Sariska.',
      h1: 'Private Tiger Safaris in India, Planned End to End',
    }
  }
  if (park) {
    const slug = Object.keys(PARKS).find((k) => PARKS[k] === park)
    if (p === `/${slug}`) {
      return {
        ...base,
        title: `${park.name} Tiger Safari: Zones, Hotels & Best Time | Tiger Safaris in India`,
        description: park.short,
        h1: park.h1,
      }
    }
    if (p.endsWith('/safari-booking')) {
      return {
        ...base,
        title: `${park.name} Safari Booking 2026–27: Zones, Jeep & Canter | Tiger Safaris in India`,
        description: `Book a ${park.name} tiger safari with zone strategy and enquiry-led quote.`,
        h1: `${park.name} Safari Booking 2026–27`,
      }
    }
    if (p.endsWith('/hotels') && !p.includes('/hotels/')) {
      return {
        ...base,
        title: `Hotels Near ${park.name}: Stays by Safari Gate | Tiger Safaris in India`,
        description: `Hotels and lodges near ${park.name} by distance to safari gates.`,
        h1: `Hotels near ${park.name}`,
      }
    }
    if (p.endsWith('/zones')) {
      return {
        ...base,
        title: `${park.name} Safari Zones | Tiger Safaris in India`,
        description: `Safari zones in ${park.name}: terrain, highlights and who each suits.`,
        h1: `${park.name} safari zones`,
        type: 'article',
      }
    }
    if (p.endsWith('/best-time')) {
      return {
        ...base,
        title: `Best Time to Visit ${park.name} (2026) | Tiger Safaris in India`,
        description: `Month-by-month best time for ${park.name} tiger safari.`,
        h1: `Best time to visit ${park.name}`,
        type: 'article',
      }
    }
    if (p.endsWith('/how-to-reach')) {
      return {
        ...base,
        title: `How to Reach ${park.name} | Rail, Road & Air`,
        description: `Getting to ${park.name}: airport, rail and road transfers.`,
        h1: `How to reach ${park.name}`,
      }
    }
    if (p.endsWith('/safari-cost')) {
      return {
        ...base,
        title: `${park.name} Safari Price & Cost Guide | Tiger Safaris in India`,
        description: `${park.name} safari cost components and enquiry-led quotes.`,
        h1: `${park.name} safari cost`,
      }
    }
    if (p.endsWith('/tour-packages')) {
      return {
        ...base,
        title: `${park.name} Tour Packages | Safari Itineraries`,
        description: `${park.name} tour packages and sample itineraries.`,
        h1: `${park.name} tour packages`,
      }
    }
    if (p.endsWith('/luxury-resorts')) {
      return {
        ...base,
        title: `Luxury Resorts in ${park.name} | Curated Jungle Lodges`,
        description: `Curated luxury resorts near ${park.name}.`,
        h1: `Luxury resorts in ${park.name}`,
      }
    }
    if (p.endsWith('/budget-hotels')) {
      return {
        ...base,
        title: `Budget Hotels in ${park.name} | Near Safari Gates`,
        description: `Budget hotels near ${park.name} gates.`,
        h1: `Budget hotels in ${park.name}`,
      }
    }
  }
  if (p === '/jim-corbett/zones/dhikala') {
    return {
      ...base,
      title: 'Dhikala Zone Booking & Forest Lodge | Jim Corbett',
      description: 'How Dhikala stays and safaris work in Jim Corbett.',
      h1: 'Dhikala zone booking',
      type: 'article',
    }
  }
  if (p === '/jim-corbett/hotels/riverside-resorts') {
    return {
      ...base,
      title: 'Riverside Resorts in Jim Corbett | Kosi & Forest Edge',
      description: 'Riverside resorts near Jim Corbett.',
      h1: 'Riverside resorts in Jim Corbett',
    }
  }

  const staticMeta = {
    '/tiger-reserves': {
      title: 'Tiger Reserves in India | Five Parks Compared',
      h1: 'Five parks, five different kinds of wild',
      description: 'Compare five tiger reserves for safari planning.',
    },
    '/safaris': {
      title: 'Tiger Safari Types in India | Jeep, Walk, Boat',
      h1: 'Tiger Safari Types in India',
      description: 'Jeep, walking, boat, photography and family safaris.',
    },
    '/hotels': {
      title: 'Hotels & Jungle Lodges Near India’s Tiger Reserves',
      h1: 'Stays by safari gate',
      description: 'Hotels near India’s tiger parks.',
    },
    '/tours': {
      title: 'Tiger Safari Tour Packages India | Itineraries',
      h1: 'Tiger Safari Tours Across India',
      description: 'Multi-park tiger safari tour packages.',
    },
    '/guides': {
      title: 'Tiger Safari Guides | Best Time, Booking & Planning',
      h1: 'Tiger safari planning guides',
      description: 'Guides for planning an Indian tiger safari.',
    },
    '/journal': {
      title: 'Tiger Safari Journal | Sightings & Field Notes',
      h1: 'Field notes from tiger country',
      description: 'Seasonal journal stories from tiger country.',
    },
    '/about': {
      title: 'About Us | Expert Tiger Safari Planners India',
      h1: 'Why Travel With Us',
      description: 'About Tiger Safaris in India.',
    },
    '/impact': {
      title: 'Responsible Tiger Tourism | Our Conservation Impact',
      h1: 'Travel That Gives Back',
      description: 'Conservation impact of our safaris.',
    },
    '/plan-your-safari': {
      title: 'Plan My Tiger Safari | Free Custom Itinerary',
      h1: 'Plan Your Tiger Safari',
      description: 'Enquiry form for a custom tiger safari.',
    },
    '/faq': {
      title: 'Tiger Safari FAQ India | Sightings, Cost, Safety',
      h1: 'Tiger safari questions, answered',
      description: 'FAQ on Indian tiger safaris.',
    },
    '/contact': {
      title: 'Contact Tiger Safaris in India',
      h1: 'Talk to the safari desk',
      description: 'Contact and WhatsApp for safari planning.',
    },
    '/hotels/luxury-jungle-lodges': {
      title: 'Luxury Jungle Lodges India | Tiger Reserve Stays',
      h1: 'Luxury Jungle Lodges',
      description: 'Luxury lodges near tiger reserves.',
    },
    '/guides/best-time-for-tiger-safari-in-india': {
      title: 'Best Time for Tiger Safari in India (2026)',
      h1: 'Best Time for Tiger Safari in India: Month by Month',
      description: 'Month-by-month tiger safari seasons.',
      type: 'article',
    },
    '/guides/how-to-book-tiger-safari-india': {
      title: 'How to Book a Tiger Safari in India',
      h1: 'How to Book a Tiger Safari in India',
      description: 'Official portals, documents and how we help.',
      type: 'article',
    },
    '/guides/best-tiger-safari-in-india': {
      title: 'Best Tiger Safari in India: Which Park Suits You?',
      h1: 'Best Tiger Safari in India: Which Park Suits You?',
      description: 'Compare five parks for the best fit.',
      type: 'article',
    },
    '/guides/tiger-safari-cost-india': {
      title: 'Tiger Safari Cost in India: What You Actually Pay',
      h1: 'Tiger Safari Cost in India',
      description: 'Cost components for Indian tiger safaris.',
      type: 'article',
    },
    '/guides/ranthambore-vs-jim-corbett': {
      title: 'Ranthambore vs Jim Corbett: Which Park Should You Choose?',
      h1: 'Ranthambore vs Jim Corbett',
      description: 'Side-by-side park comparison.',
      type: 'article',
    },
    '/guides/tiger-safari-for-foreigners': {
      title: 'Tiger Safari for Foreigners: Passports, Fees & Routes',
      h1: 'Tiger Safari for Foreigners',
      description: 'Foreign national safari booking guide.',
      type: 'article',
    },
    '/guides/tiger-safari-packing-list': {
      title: 'Tiger Safari Packing List: What to Wear on Safari',
      h1: 'Tiger Safari Packing List',
      description: 'What to pack for an Indian tiger safari.',
      type: 'article',
    },
    '/guides/tiger-sighting-chances': {
      title: 'Chances of Seeing a Tiger in India',
      h1: 'Chances of Seeing a Tiger in India',
      description: 'Honest sighting odds by park.',
      type: 'article',
    },
  }

  for (const [key, val] of Object.entries(staticMeta)) {
    if (p === key || p.startsWith('/safaris/') || p.startsWith('/tours/')) {
      if (p === key) return { ...base, ...val, description: val.description }
    }
  }
  if (staticMeta[p]) return { ...base, ...staticMeta[p] }

  if (p.startsWith('/safaris/')) {
    const name = p.split('/').pop().replace(/-/g, ' ')
    return {
      ...base,
      title: `${name} | Tiger Safaris in India`,
      h1: name.replace(/\b\w/g, (c) => c.toUpperCase()),
      description: `Safari experience: ${name}`,
    }
  }
  if (p.startsWith('/tours/')) {
    const name = p.split('/').pop().replace(/-/g, ' ')
    return {
      ...base,
      title: `${name} | Tiger Safaris in India`,
      h1: name.replace(/\b\w/g, (c) => c.toUpperCase()),
      description: `Tour package: ${name}`,
    }
  }

  return {
    ...base,
    title: 'Tiger Safaris in India',
    h1: 'Tiger Safaris in India',
    description: 'Private tiger safari planning in India.',
  }
}

function bodyHtml(page) {
  const p = page.path
  const park = parkFromPath(p === '/' ? '' : p)
  const slug = park && Object.keys(PARKS).find((k) => PARKS[k] === park)

  let inner = `<h1>${escapeHtml(page.h1)}</h1>`

  if (park && slug && p === `/${slug}`) {
    inner += `<p>${escapeHtml(park.overview)}</p>
      <p>${escapeHtml(park.short)}</p>
      <h2>Quick facts</h2>${table(['Fact', 'Detail'], park.facts)}
      <h2>Zones</h2>${table(['Zone', 'Terrain', 'Highlights', 'Suits'], park.zones)}
      <h2>Best time</h2>${table(['Period', 'Notes'], park.bestTime)}
      <h2>How to reach</h2>${table(['Mode', 'Detail'], park.reach)}
      <h2>Plan next</h2>${links([
        [`/${slug}/safari-booking/`, `Book ${park.name} safari`],
        [`/${slug}/hotels/`, `Hotels near ${park.name}`],
        [`/${slug}/zones/`, `${park.name} zones`],
        [`/${slug}/best-time/`, `Best time`],
        [`/${slug}/safari-cost/`, `Safari cost`],
        ['/plan-your-safari/', 'Plan your safari'],
      ])}
      <h2>FAQ</h2>${faqBlock([
        [`Is ${park.name} good for first-timers?`, park.short],
        ['Are you the official booking site?', 'No. We are a private operator. Permits go through official forest systems.'],
      ])}
      <p>Updated 2026-10-17 · Written by Tiger Safaris field team</p>`
  } else if (park && p.endsWith('/safari-booking')) {
    inner += `<p>How ${escapeHtml(park.name)} safari booking works: enquiry-led quotes, zone strategy, jeep or canter where offered, documents, and permits via official forest department systems. We are not a government website.</p>
      <h2>Zones</h2>${table(['Zone', 'Terrain', 'Highlights', 'Suits'], park.zones)}
      <h2>Steps</h2><ol><li>Share dates and group size</li><li>Zone and vehicle strategy</li><li>Official permits</li><li>Lodge and transfers</li></ol>
      ${links([
        [`/${slug}/hotels/`, `Hotels near ${park.name}`],
        [`/${slug}/`, `${park.name} hub`],
        ['/plan-your-safari/', 'Full trip planner'],
      ])}
      ${faqBlock([
        ['Official portal?', 'Permits are booked on official systems. We plan and arrange on your behalf.'],
        ['Documents?', 'Government photo ID or passport for every guest.'],
      ])}`
  } else if (park && (p.endsWith('/zones') || p.includes('/best-time') || p.includes('/how-to-reach') || p.includes('/safari-cost') || p.includes('/hotels') || p.includes('/tour-packages'))) {
    inner += `<p>${escapeHtml(park.overview)}</p>`
    if (p.includes('best-time') || p.endsWith('/zones')) inner += `<h2>Season / zones</h2>${table(['Period / Zone', 'Notes'], park.bestTime)}`
    if (p.endsWith('/zones')) inner += table(['Zone', 'Terrain', 'Highlights', 'Suits'], park.zones)
    if (p.includes('how-to-reach')) inner += `<h2>Access</h2>${table(['Mode', 'Detail'], park.reach)}`
    if (p.includes('safari-cost')) {
      inner += `<p>Cost components: permit, vehicle, guide, lodge band (₹–₹₹₹), transfers. No live Offer prices. Enquiry for a dated quote. As of 2026-10-17.</p>`
    }
    inner += links([
      [`/${slug}/safari-booking/`, `Book ${park.name} safari`],
      [`/${slug}/`, `${park.name} hub`],
      ['/plan-your-safari/', 'Plan your safari'],
    ])
  } else if (p === '/') {
    inner += `<p>Track wild tigers across five Indian national parks. We handle permits, zones, naturalists, lodges and transfers. Enquiry-led booking.</p>
      <h2>Five parks</h2>${links(Object.entries(PARKS).map(([s, pk]) => [`/${s}/`, `${pk.name} tiger safari`]))}
      <h2>Start here</h2>${links([
        ['/plan-your-safari/', 'Plan your safari'],
        ['/guides/best-tiger-safari-in-india/', 'Best tiger safari in India'],
        ['/tours/', 'Tour packages'],
        ['/hotels/', 'Hotels & lodges'],
      ])}`
  } else {
    inner += `<p>${escapeHtml(page.description || page.h1)}</p>
      ${links([
        ['/tiger-reserves/', 'Tiger reserves'],
        ['/plan-your-safari/', 'Plan your safari'],
        ['/guides/', 'Guides'],
        ['/contact/', 'Contact'],
      ])}`
  }

  return `<article id="static-seo" data-prerender="true">${inner}</article>`
}

function inject(html, page) {
  const pathWithSlash = page.path === '/' ? '/' : `${page.path.replace(/\/$/, '')}/`
  const url = `${siteUrl}${pathWithSlash}`
  const title = escapeHtml(page.title)
  const desc = escapeHtml(page.description || '')
  const ogParkMatch = String(page.path || '').match(/^\/(ranthambore|jim-corbett|panna|satpura|sariska)(\/|$)/)
  const ogImage = ogParkMatch
    ? `${siteUrl}/images/og/${ogParkMatch[1]}.jpg`
    : `${siteUrl}/media/sketches/sketch-intro.jpg?v=2`
  const ogType = page.type === 'article' ? 'article' : 'website'
  const article = bodyHtml(page)

  let out = html
  out = out.replace(/<html[^>]*>/, '<html lang="en-IN">')
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
  out = out.replace(/<meta\s+name="description"[^>]*>\s*/gi, '')
  out = out.replace(/<link\s+rel="canonical"[^>]*>\s*/gi, '')
  out = out.replace(/<meta\s+property="og:[^"]+"[^>]*>\s*/gi, '')
  out = out.replace(/<meta\s+name="twitter:[^"]+"[^>]*>\s*/gi, '')

  const headExtras = `
    <meta name="description" content="${desc}" />
    <link rel="canonical" href="${url}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:locale" content="en_IN" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${desc}" />
    <meta name="twitter:image" content="${ogImage}" />
  `
  out = out.replace('</head>', `${headExtras}</head>`)
  // Full article in #root for curl/crawler acceptance (§9)
  out = out.replace('<div id="root"></div>', `<div id="root">${article}</div>`)
  return out
}

function writePage(page) {
  const clean = page.path === '/' ? '/' : page.path.replace(/\/$/, '')
  const file =
    clean === '/' ? path.join(dist, 'index.html') : path.join(dist, clean.slice(1), 'index.html')
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, inject(template, page))
  console.log('prerender', clean === '/' ? '/' : `${clean}/`)
}

if (!fs.existsSync(path.join(dist, 'index.html'))) {
  console.error('dist/index.html missing — run vite build first')
  process.exit(1)
}

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const routeList = JSON.parse(fs.readFileSync(path.join(__dirname, 'route-list.json'), 'utf8'))

for (const routePath of routeList) {
  writePage(metaFor(routePath))
}

fs.writeFileSync(
  path.join(dist, '404.html'),
  inject(template, {
    path: '/404',
    title: 'Page not found | Tiger Safaris in India',
    description: 'This page does not exist.',
    h1: 'Page not found',
  }),
)

for (const name of ['sitemap.xml', 'sitemap-images.xml', 'robots.txt', 'llms.txt']) {
  const src = path.join(root, 'public', name)
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(dist, name))
    console.log('copied', name)
  }
}

console.log(`Prerendered ${routeList.length} pages with full static HTML`)
