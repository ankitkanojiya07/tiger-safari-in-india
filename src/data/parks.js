import { media } from './media'

/**
 * Five tiger reserves. `path` is the public URL path (no trailing slash in router).
 * Prefer "Ranthambore" / "Jim Corbett" in titles & H1; alternate spellings in body.
 */
export const parks = [
  {
    slug: 'ranthambore',
    destinationSlug: 'ranthambore-tiger-safari',
    legacySlug: 'ranthambhore',
    name: 'Ranthambore',
    altSpelling: 'Ranthambhore',
    state: 'Rajasthan',
    hook: 'Tigers, lakes and a fort (Rajasthan)',
    path: '/ranthambore',
    image: media.parks.ranthambhore,
    imageAlt: media.parks.ranthambhoreAlt,
    title: 'Ranthambore Tiger Safari: Zones, Hotels & Best Time | Tiger Safaris in India',
    description:
      'Plan a Ranthambore tiger safari with expert guides, the right zones and handpicked stays. Best time, safari booking, zones and a sample itinerary.',
    ogDescription: 'Expert-planned Ranthambore tiger safaris.',
    h1: 'Ranthambore Tiger Safari: Tigers, Lakes and a Fortress Wilderness',
    short:
      'Tigers among thousand-year-old ruins. Dry dhok forest, lake-fringed meadows and a fort on the ridge make this the most photogenic tiger country in India.',
    whyTitle: 'Why Ranthambore?',
    overview:
      'Ranthambore National Park (also spelled Ranthambhore) is one of India\'s most famous tiger reserves, and for good reason. Dry deciduous forest, rocky hills and three lakes sit around the 10th-century Ranthambore Fort, a UNESCO World Heritage Site as part of the Hill Forts of Rajasthan. Tigers here are often active in daylight, which makes it one of the more rewarding parks for photography. Ranthambore is easy to reach from Jaipur and Delhi, so it is the usual first stop on an Indian tiger journey.',
    wildlifeTitle: 'What you can see',
    wildlifeText:
      'Tiger and leopard are the headline species, but the reserve also holds sloth bear, striped hyena, sambar, spotted deer (chital), nilgai, wild boar, marsh crocodile, and a rich bird list (often cited at 270+ species — confirm seasonally). Padam Talao, Raj Bagh and Malik Talao lakes attract wildlife throughout the day, and the ruins of old pavilions make for unusual photographs.',
    wildlife: ['Bengal tiger', 'Leopard', 'Sloth bear', 'Sambar', 'Mugger crocodile', 'Striped hyena'],
    zonesTitle: 'Ranthambore safari zones explained',
    zonesIntro:
      'The park is divided into numbered zones (typically 1 to 10, with additional buffer zones — confirm current maps with the forest department). Zones 1–5 are the long-established core zones and are generally the most popular for sightings; the others are less crowded and still produce good tiger encounters. A good itinerary books several safaris across different zones rather than repeating one, since tiger movements change by season.',
    zones: [
      { name: 'Zones 1–5', terrain: 'Lakes, dhok forest, fort foothills', highlights: 'Classic sightings, ruins, waterholes', suits: 'First-timers, photographers' },
      { name: 'Zones 6–10', terrain: 'Varied forest and buffer edges', highlights: 'Fewer vehicles, strong tiger presence in places', suits: 'Repeat visitors, quieter drives' },
    ],
    bestTimeTitle: 'Best time for a Ranthambore safari',
    bestTime: [
      ['October–February', 'Cool mornings, lush forest, comfortable; thicker vegetation can make sightings slightly harder'],
      ['March–June', 'Hot but open forest; tigers visit waterholes, so many photographers prefer April–June'],
      ['July–September', 'Park closed for monsoon (buffer areas may differ — verify seasonally)'],
    ],
    gettingThere: [
      ['Rail', 'Sawai Madhopur Junction is on the Delhi–Mumbai main line (about 10–11 km from the park)'],
      ['Road', 'About 3.5–4 hours from Jaipur, about 6–7 hours from Delhi'],
      ['Air', 'Jaipur International Airport is the closest major airport'],
    ],
    stay: 'Choose between luxury jungle lodges, heritage-style resorts and comfortable mid-range hotels, all near the park gates. We match your lodge to your zone and budget.',
    itineraryTitle: '4 days / 3 nights',
    itinerary: [
      'Day 1: Arrive Sawai Madhopur; check-in; evening briefing',
      'Day 2: Morning safari (Zone A); visit Ranthambore Fort; afternoon safari (Zone B)',
      'Day 3: Morning and afternoon safari in different zones; village or craft visit',
      'Day 4: Optional early game drive; transfer to Jaipur or Delhi',
    ],
    tips: [
      'Carry government photo ID for every guest (required for permits).',
      'Wear neutral colours.',
      'Bring a layer: early mornings are cold even in summer.',
      'Follow your guide\'s instructions and keep quiet near wildlife.',
    ],
    nearby: ['Ranthambore Fort', 'Sawai Madhopur craft markets', 'Jaipur (forts and city)'],
    facts: [
      ['State', 'Rajasthan (Sawai Madhopur district)'],
      ['Nearest rail', 'Sawai Madhopur Junction (about 10–11 km)'],
      ['Open', 'October to June (closed in monsoon — verify annually)'],
      ['Safari types', 'Gypsy (6-seater), Canter (about 20-seater)'],
      ['Best for', 'First-time tiger safari, photography, heritage + wildlife'],
    ],
    faq: [
      { q: 'What is the best zone in Ranthambore?', a: 'No single zone guarantees a tiger. Zones 1–5 are popular, but we plan a mix of zones to improve your chances.' },
      { q: 'How many safaris should I take?', a: 'At least 3–4 to give yourself a good chance.' },
      { q: 'Can I book a private jeep?', a: 'Yes, a Gypsy can be booked privately; canters are shared.' },
      { q: 'Is Ranthambore good for families?', a: 'Yes, with age rules for safari seats; ask us about current child policies.' },
      { q: 'Is Ranthambhore the same as Ranthambore?', a: 'Yes — alternate spellings of the same park.' },
    ],
    relatedJourneys: ['rajasthan-tiger-trail', 'golden-triangle-tiger-tour'],
    relatedExperiences: ['jeep-and-canter-safaris', 'photography-safaris'],
    relatedGuides: ['best-time-for-tiger-safari-in-india', 'how-to-book-tiger-safari-india'],
    booking: {
      asOf: '2026-10-17',
      portals: [
        {
          name: 'Rajasthan Forest Department — online safari / zoo booking',
          url: 'https://forest.rajasthan.gov.in',
          note: 'Advance booking and Tatkal routes (including obms-tourist.rajasthan.gov.in) are linked from the department site. Confirm the live portal before you travel.',
        },
      ],
      vehicles: 'Gypsy (jeep, typically 6 seats) and canter (shared). Private jeep where rules allow.',
      season:
        'Tourism season is typically October to June. Core zones often close in monsoon; buffer zones 6–10 may run differently — verify each year.',
      timings:
        'Morning and afternoon slots shift by season (earlier in summer heat). Exact gate times are set by the forest department.',
      documents: 'Government photo ID for Indian nationals; passport for foreign nationals. Names must match permits.',
      feeNote:
        'Entry and vehicle fees differ for Indian and foreign nationals and change by order. We quote with an “as of” date — do not rely on reseller “all-in” prices.',
    },
    featuredStays: [
      { name: 'Gate-proximate luxury lodge', band: '₹₹₹', distance: 'Typically 1–4 km from popular gates', suits: 'Photographers, first-timers' },
      { name: 'Heritage-style resort', band: '₹₹₹', distance: 'Short drive to Sawai Madhopur / park gates', suits: 'Couples, comfort travellers' },
      { name: 'Comfort jungle resort', band: '₹₹', distance: 'Within ~15–25 min of morning reporting', suits: 'Families, mid-range trips' },
      { name: 'Value hotel near Sawai Madhopur', band: '₹', distance: 'Town-side; allow transfer time', suits: 'Budget / short stays' },
      { name: 'Quiet buffer-side stay', band: '₹₹', distance: 'Closer to zones 6–10 access', suits: 'Repeat visitors' },
      { name: 'Family cottage lodge', band: '₹₹', distance: 'Gate-adjacent with early breakfast', suits: 'Families with children' },
    ],
  },
  {
    slug: 'jim-corbett',
    destinationSlug: 'jim-corbett-tiger-safari',
    legacySlug: 'corbett',
    name: 'Jim Corbett',
    altSpelling: 'Corbett',
    state: 'Uttarakhand',
    hook: "India's oldest national park (Uttarakhand)",
    path: '/jim-corbett',
    image: media.parks.corbett,
    imageAlt: media.parks.corbettAlt,
    title: 'Jim Corbett Tiger Safari: Zones, Hotels & Best Time | Tiger Safaris in India',
    description:
      'Explore Jim Corbett National Park with expert naturalists. Compare Dhikala, Bijrani, Jhirna and Dhela zones, best time to visit and sample itineraries.',
    ogDescription: 'Expert-planned Jim Corbett tiger safaris and zone strategy.',
    h1: "Jim Corbett Tiger Safari: India's Oldest National Park",
    short:
      "India's oldest national park. Sal forest, the Ramganga river and wide grassland chaurs, with elephant herds, tigers and the Himalayan foothills behind.",
    whyTitle: 'Why Jim Corbett?',
    overview:
      "Founded in 1936, Corbett is India's oldest national park and the place where Project Tiger was launched in 1973. It is named after Jim Corbett, the hunter-turned-conservationist and author. The landscape is a rare mix of Himalayan foothills, sal forest, grassland and the Ramganga river, and the reserve is known for a healthy tiger population. Sightings can be challenging in dense forest, but the scenery and bird life make every safari rewarding.",
    wildlifeTitle: 'What you can see',
    wildlifeText:
      'Tiger, leopard, Asian elephant, sloth bear, hog deer, sambar, gharial and mugger crocodile, and a celebrated bird list (often 600+ species — verify with current checklists) including the Himalayan fish-owl and great hornbill.',
    wildlife: ['Bengal tiger', 'Asian elephant', 'Gharial', 'Hog deer', 'Leopard', '550+ bird species'],
    zonesTitle: 'Corbett safari zones compared',
    zonesIntro:
      'Corbett Tiger Reserve lists tourism zones including Bijrani, Jhirna, Dhikala, Durgadevi, Dhela, Garjiya, Sonanadi and Pakhro (confirm current openings on corbettgov.org). Access rules and seasons differ by zone.',
    zones: [
      { name: 'Bijrani (Amdanda gate)', terrain: 'Grassland and mixed forest', highlights: 'Popular day safari; typically mid-Oct to end-Jun', suits: 'First-timers' },
      { name: 'Jhirna (Dhela gate)', terrain: 'Open forest and riverbeds', highlights: 'Often open through the year — verify', suits: 'Monsoon / shoulder travel' },
      { name: 'Dhikala (Dhangari)', terrain: 'Grassland over Ramganga reservoir', highlights: 'Overnight rest houses; canter day options — verify rules', suits: 'Immersive trips (book far ahead)' },
      { name: 'Durgadevi', terrain: 'Scenic foothill forest', highlights: 'Quieter drives; seasonal day safari window', suits: 'Birders, quieter days' },
      { name: 'Dhela', terrain: 'Newer tourism zone', highlights: 'Often open longer; less crowded', suits: 'Shoulder season' },
      { name: 'Garjiya', terrain: 'Buffer / river-side forest', highlights: 'Day safari; seasonal window', suits: 'Add-on drives' },
      { name: 'Sonanadi (Vatanvasa)', terrain: 'Quieter forest', highlights: 'Seasonal day safari', suits: 'Repeat visitors' },
      { name: 'Pakhro', terrain: 'Forest day routes', highlights: 'Seasonal day safari', suits: 'Quieter options' },
    ],
    bestTimeTitle: 'Best time for a Jim Corbett safari',
    bestTime: [
      ['November–February', 'Cold, clear and good for birds; Dhikala night-stay season typically from mid-Nov'],
      ['March–June', 'Warm; strong wildlife viewing around water; many zones open until mid/late June'],
      ['Monsoon / closed windows', 'Jhirna and Dhela often remain useful when other zones close — verify on the official portal'],
    ],
    gettingThere: [
      ['Road', 'Ramnagar is about 5–6 hours from Delhi (about 250–260 km)'],
      ['Rail', 'Ramnagar is the nearest railhead'],
      ['Air', 'Pantnagar is the closest airport (about 1.5 hours away)'],
    ],
    stay: 'Riverside lodges near Ramnagar, forest rest houses inside the park (Dhikala), and boutique resorts along the Kosi river.',
    itineraryTitle: '3 days / 2 nights, weekend from Delhi',
    itinerary: [
      'Day 1: Drive Delhi to Corbett; afternoon safari',
      'Day 2: Morning and afternoon safari in different zones; nature walk outside the park',
      'Day 3: Optional early drive; return to Delhi',
    ],
    tips: [
      'Entry to Dhikala requires advance permits and rest-house booking.',
      'Plan at least 4 safaris.',
      'Keep warm clothing for winter mornings.',
    ],
    nearby: ['Ramnagar', 'Kosi river resorts', 'Nainital (further afield)'],
    facts: [
      ['State', 'Uttarakhand (Nainital and Pauri Garhwal districts)'],
      ['Base town', 'Ramnagar (about 250–260 km from Delhi)'],
      ['Established', '1936 as Hailey National Park; India\'s oldest national park'],
      ['Safari types', 'Jeep, canter; elephant-back in select areas where offered — verify'],
      ['Best for', 'Weekend trips from Delhi, birding, river and hill scenery'],
    ],
    faq: [
      { q: 'Which Corbett zone has the best tiger sightings?', a: 'Bijrani and Dhikala are traditionally popular; success depends on season and luck.' },
      { q: 'Is Corbett open all year?', a: 'Most zones close for the monsoon; check Jhirna and buffer zones.' },
      { q: 'How many days do I need?', a: '2–3 nights is ideal.' },
      { q: 'Can I stay inside the park?', a: 'Yes, at Dhikala and a few other forest rest houses with advance booking.' },
      { q: 'Is Corbett good for birdwatching?', a: 'Yes, it is among India\'s best birding parks.' },
    ],
    relatedJourneys: ['corbett-weekend-from-delhi'],
    relatedExperiences: ['jeep-and-canter-safaris', 'walking-safaris'],
    relatedGuides: ['best-time-for-tiger-safari-in-india', 'how-to-book-tiger-safari-india'],
    booking: {
      asOf: '2026-10-17',
      portals: [
        {
          name: 'Corbett Tiger Reserve official booking',
          url: 'https://booking.corbettgov.org',
          note: 'Official portal (corbettgov.org). Helplines listed on the forest site include +91 9759363344 and 1800 309 6260 — confirm before calling.',
        },
      ],
      vehicles: 'Day jeep (max occupancy rules apply), Dhikala canter, and overnight forest rest-house packages where offered.',
      season:
        'Zone calendars differ: Jhirna/Dhela often year-round; Bijrani/Garjiya typically mid-Oct–Jun; Dhikala and several zones from mid-Nov. Always verify.',
      timings: 'Morning and afternoon jeep slots; Dhikala canter has longer morning/afternoon windows. Confirm on the permit.',
      documents: 'Government photo ID or passport. If any guest is a foreign national, foreign fee rules often apply to the whole permit — verify.',
      feeNote:
        'Official pricing pages list per-person permit, vehicle and guide components (and GST on some products). We quote from the live tariff with an “as of” date.',
    },
    featuredStays: [
      { name: 'Kosi riverside lodge', band: '₹₹₹', distance: 'Ramnagar / Kosi belt; short transfer to gates', suits: 'Couples, birders' },
      { name: 'Dhikala forest rest house', band: '₹₹', distance: 'Inside park (overnight permit)', suits: 'Immersive Corbett trips' },
      { name: 'Gate-side comfort resort', band: '₹₹', distance: 'Near Amdanda / Dhela reporting points', suits: 'Weekend travellers' },
      { name: 'Family riverside resort', band: '₹₹', distance: 'Kosi river views; transfer to zones', suits: 'Families' },
      { name: 'Value hotel in Ramnagar', band: '₹', distance: 'Town base; allow morning buffer', suits: 'Budget weekends' },
      { name: 'Boutique forest-edge lodge', band: '₹₹₹', distance: 'Quiet, naturalist-led stays', suits: 'Photographers' },
    ],
  },
  {
    slug: 'panna',
    destinationSlug: 'panna-tiger-safari',
    legacySlug: 'panna',
    name: 'Panna',
    state: 'Madhya Pradesh',
    hook: 'A tiger comeback story (Madhya Pradesh)',
    path: '/panna',
    image: media.parks.panna,
    imageAlt: media.parks.pannaAlt,
    title: 'Panna Tiger Safari: Zones, Hotels & Best Time | Tiger Safaris in India',
    description:
      "Visit Panna Tiger Reserve, India's tiger comeback story. Safaris on the Ken river, Khajuraho temples nearby, best time to visit and custom itineraries.",
    ogDescription: 'Panna tiger safaris paired with Khajuraho.',
    h1: 'Panna Tiger Safari: A Conservation Success Story on the Ken River',
    short:
      'The comeback reserve. Tigers lost and brought back to the Ken river gorges, a short drive from the temples of Khajuraho.',
    whyTitle: 'Why Panna?',
    overview:
      "Panna lost all of its tigers by 2009. Through a reintroduction programme with tigers brought from other reserves, the population has recovered, and Panna is now cited worldwide as a case study in tiger recovery. The park spreads across plateaus, gorges and dry deciduous forest cut by the Ken river. With far fewer vehicles than the better-known parks, safaris feel quiet and unhurried.",
    wildlifeTitle: 'What you can see',
    wildlifeText:
      'Tiger, leopard, sloth bear, sambar, nilgai, chital, gharial and mugger crocodile in the Ken river, and a notable vulture population along cliffs. Birders can look for the Indian skimmer and bar-headed goose in winter.',
    wildlife: ['Bengal tiger', 'Leopard', 'Gharial', 'Chinkara', 'Indian vulture', 'Four-horned antelope'],
    zonesTitle: 'Highlights around Panna',
    zonesIntro: 'Main tourism gates include Madla and Hinauta (confirm current gate openings). Beyond jeep drives, the Ken river and nearby falls define the experience.',
    zones: [
      { name: 'Ken river', terrain: 'River gorge', highlights: 'Boat rides, gharial, birds', suits: 'Everyone' },
      { name: 'Madla / Hinauta gates', terrain: 'Plateau and dry forest', highlights: 'Core jeep safaris', suits: 'Tiger-focused days' },
      { name: 'Nearby falls', terrain: 'Gorges and seasonal falls', highlights: 'Pandav Falls, Raneh Falls', suits: 'Landscape lovers' },
    ],
    bestTimeTitle: 'Best time for a Panna safari',
    bestTime: [
      ['October–June', 'Main safari season; park typically closes in monsoon — verify'],
      ['November–April', 'Most comfortable temperatures'],
      ['March–May / April–June', 'Hot but good for waterhole sightings'],
    ],
    gettingThere: [
      ['Air', 'Khajuraho Airport has connections from major cities (schedules vary — verify)'],
      ['Rail', 'Khajuraho / Satna are the nearest railheads'],
      ['Road', 'Khajuraho is about 25–35 km; Panna town is roughly 10 km from the gate area'],
    ],
    stay: 'Lodges near the Ken river and Madla gate, plus Khajuraho hotels for a combined temple and tiger stay.',
    itineraryTitle: '4 days / 3 nights',
    itinerary: [
      'Day 1: Fly to Khajuraho; visit the Western Group of temples',
      'Day 2: Morning and afternoon safari in Panna',
      'Day 3: Boat ride on the Ken; second safari; Raneh Falls',
      'Day 4: Transfer to Satpura or return',
    ],
    tips: [
      'Combine with Satpura for a Central India circuit.',
      'Keep expectations realistic: sightings vary.',
    ],
    nearby: ['Khajuraho temples', 'Ken Gharial Sanctuary', 'Pandav Falls', 'Raneh Falls'],
    facts: [
      ['State', 'Madhya Pradesh (Bundelkhand region)'],
      ['Nearest town', 'Khajuraho (about 25–35 km — verify)'],
      ['Notable', 'UNESCO Biosphere Reserve; Ken river gorge'],
      ['Gates', 'Madla and Hinauta (main tourism gates — verify)'],
      ['Best for', 'Combining tigers with Khajuraho temples; quieter safaris'],
    ],
    faq: [
      { q: 'Is Panna good for tiger sightings?', a: 'It has a healthy tiger population and fewer vehicles, but sightings are never guaranteed.' },
      { q: 'Can I visit Khajuraho temples in the same trip?', a: 'Yes, they are close.' },
      { q: 'How far is Panna from Satpura?', a: 'Roughly a full travel day by road; we plan a connecting route.' },
      { q: 'Best months for Panna?', a: 'November to April for comfort; April–June for waterholes.' },
    ],
    relatedJourneys: ['central-india-tiger-circuit'],
    relatedExperiences: ['boat-safaris', 'photography-safaris'],
    relatedGuides: ['best-time-for-tiger-safari-in-india', 'how-to-book-tiger-safari-india'],
    booking: {
      asOf: '2026-10-17',
      portals: [
        {
          name: 'Madhya Pradesh Forest online booking',
          url: 'https://forest.mponline.gov.in',
          note: 'MP Forest Dept portal is the official route. Third-party reseller sites are not official.',
        },
      ],
      vehicles: 'Jeep safaris from Madla / Hinauta gates; Ken river boat safari where offered.',
      season: 'Core zones typically about mid-October to end-June; monsoon closure for core — confirm reopening dates each year.',
      timings: 'Winter and summer morning/afternoon slots differ. Confirm on the permit.',
      documents: 'Government photo ID or passport for every guest.',
      feeNote:
        'Full-jeep prices vary by core vs buffer and weekday/weekend. Official vehicle and guide components should be confirmed on the MP portal — reseller totals are not authoritative.',
    },
    featuredStays: [
      { name: 'Madla gate lodge', band: '₹₹₹', distance: 'Short drive to Madla reporting', suits: 'Tiger-focused trips' },
      { name: 'Ken riverside stay', band: '₹₹', distance: 'Near river / boat points', suits: 'Birders, couples' },
      { name: 'Hinauta-side resort', band: '₹₹', distance: 'Access to Hinauta gate', suits: 'Quiet safaris' },
      { name: 'Khajuraho hotel (combo trip)', band: '₹₹', distance: '~25–35 km to park', suits: 'Temples + tigers' },
      { name: 'Comfort mid-range lodge', band: '₹₹', distance: 'Gate-proximate', suits: 'Families' },
      { name: 'Value stay near Panna town', band: '₹', distance: 'Allow transfer buffer', suits: 'Budget travellers' },
    ],
  },
  {
    slug: 'satpura',
    destinationSlug: 'satpura-tiger-safari',
    legacySlug: 'satpura',
    name: 'Satpura',
    state: 'Madhya Pradesh',
    hook: 'Walk, paddle and track (Madhya Pradesh)',
    path: '/satpura',
    image: media.parks.satpura,
    imageAlt: media.parks.satpuraAlt,
    title: 'Satpura Tiger Safari: Zones, Hotels & Best Time | Tiger Safaris in India',
    description:
      'Explore Satpura Tiger Reserve on foot, by canoe and by jeep. Plan a Madhya Pradesh wildlife trip with expert naturalists and handpicked lodges.',
    ogDescription: 'Walking, boat and jeep safaris in Satpura.',
    h1: 'Satpura Tiger Safari: Walk, Paddle and Track in Wild Central India',
    short:
      'Walk, canoe and drive. Sandstone hills, the Denwa backwaters and few vehicles make this the quiet, slow safari of central India.',
    whyTitle: 'Why Satpura?',
    overview:
      'Satpura is unlike any other tiger reserve on this list. Instead of only riding in a jeep, you can follow forest trails on foot with a naturalist, drift across the Denwa backwaters by boat, and look for wildlife on night drives in permitted buffer areas (where offered — verify). The reserve combines Satpura National Park with the Bori and Pachmarhi sanctuaries, forming a large forest corridor in the Satpura range, and is part of the Pachmarhi Biosphere Reserve.',
    wildlifeTitle: 'What you can see',
    wildlifeText:
      'Tigers are present but harder to see in dense forest. Many visitors come for leopard, sloth bear, Indian bison (gaur), dhole (wild dog), Indian giant squirrel, and more than 300 bird species.',
    wildlife: ['Sloth bear', 'Leopard', 'Bengal tiger', 'Gaur', 'Indian giant squirrel', 'Wild dog (dhole)'],
    zonesTitle: 'Satpura safari styles',
    zonesIntro: 'Gates include Madhai and access toward Pachmarhi, among others — confirm current entry points.',
    zones: [
      { name: 'Jeep safari', terrain: 'Core / tourism zones', highlights: 'Classic game drives', suits: 'Everyone' },
      { name: 'Walking safari', terrain: 'Buffer trails', highlights: 'Tracks, birds, immersive pacing', suits: 'Active travellers' },
      { name: 'Boat / canoe', terrain: 'Denwa backwaters', highlights: 'Dawn paddles, birds, bank wildlife', suits: 'Photographers' },
      { name: 'Night safari', terrain: 'Permitted buffer', highlights: 'Nocturnal life where allowed', suits: 'Enthusiasts' },
    ],
    bestTimeTitle: 'Best time for a Satpura safari',
    bestTime: [
      ['October–June', 'Main season; monsoon closure typically applies — verify'],
      ['Winter', 'Best for birds'],
      ['Summer', 'Better visibility around water'],
    ],
    gettingThere: [
      ['Rail', 'Pipariya (about 50 km) and Itarsi are the main railheads'],
      ['Air', 'Bhopal is the nearest major airport (about 3–3.5 hours by road — verify)'],
    ],
    stay: 'Riverside lodges near Madhai, many with their own naturalist teams.',
    itineraryTitle: '3 days / 2 nights',
    itinerary: [
      'Day 1: Arrive from Bhopal; boat safari on the Denwa',
      'Day 2: Morning jeep safari; afternoon walking safari',
      'Day 3: Optional sunrise canoe; transfer to Pachmarhi or Bhopal',
    ],
    tips: [
      'Wear closed shoes and long sleeves for walks.',
      'A naturalist is mandatory in the park.',
    ],
    nearby: ['Pachmarhi hill station', 'Cave paintings', 'Denwa river lodges'],
    facts: [
      ['State', 'Madhya Pradesh (Narmadapuram / Hoshangabad district)'],
      ['Gates', 'Madhai and Pachmarhi, among others — verify'],
      ['Terrain', 'Sandstone peaks, Denwa river backwaters, sal and teak forest'],
      ['Notable', 'Guided walking and canoe safaris in buffer areas where permitted'],
      ['Best for', 'Slow, immersive wildlife travel; photography; small groups'],
    ],
    faq: [
      { q: 'Can I see tigers in Satpura?', a: 'Yes, but visibility is lower than in Ranthambore; the reserve\'s strength is variety of experiences.' },
      { q: 'Are walking safaris safe?', a: 'They are guided by trained forest staff and limited to approved areas.' },
      { q: 'How long should I stay?', a: '2–3 nights.' },
      { q: 'Best way to combine with Panna?', a: 'Fly into Khajuraho, then road transfer to Satpura.' },
    ],
    relatedJourneys: ['central-india-tiger-circuit'],
    relatedExperiences: ['walking-safaris', 'boat-safaris'],
    relatedGuides: ['best-time-for-tiger-safari-in-india', 'how-to-book-tiger-safari-india'],
    booking: {
      asOf: '2026-10-17',
      portals: [
        {
          name: 'Satpura Tiger Reserve / MP Forest booking',
          url: 'https://www.satpuratigerreserve.org/',
          note: 'Official reserve site links booking; MP portal forest.mponline.gov.in is commonly used. Office contacts on the reserve site — confirm before travel.',
        },
      ],
      vehicles: 'Jeep in core/tourism zones; guided walking and boat/canoe on the Denwa where permitted.',
      season: 'Tourism season typically mid-October to end-June; core closed in monsoon — verify exact dates.',
      timings: 'Morning and evening jeep slots; walking and canoe by arrangement. Confirm locally.',
      documents: 'Government photo ID or passport. Walking requires approved guides and forest staff.',
      feeNote:
        'Permit, shared vehicle and boat-transfer components vary. Treat blog receipts as indicative only; we quote from current official tariffs.',
    },
    featuredStays: [
      { name: 'Madhai riverside lodge', band: '₹₹₹', distance: 'Near Madhai gate / Denwa', suits: 'Walk + canoe trips' },
      { name: 'Naturalist-led tented camp', band: '₹₹₹', distance: 'Forest edge', suits: 'Immersive travellers' },
      { name: 'Comfort Madhai resort', band: '₹₹', distance: 'Short transfer to jeep reporting', suits: 'Couples, families' },
      { name: 'Pachmarhi combo stay', band: '₹₹', distance: 'Hill station add-on', suits: 'Mixed itineraries' },
      { name: 'Value Madhai hotel', band: '₹', distance: 'Town / gate area', suits: 'Budget travellers' },
      { name: 'Quiet Denwa-view lodge', band: '₹₹', distance: 'Boat safari access', suits: 'Photographers' },
    ],
  },
  {
    slug: 'sariska',
    destinationSlug: 'sariska-tiger-safari',
    legacySlug: 'sariska',
    name: 'Sariska',
    state: 'Rajasthan',
    hook: 'Aravalli tigers near Delhi (Rajasthan)',
    path: '/sariska',
    image: media.parks.sariska,
    imageAlt: media.parks.sariskaAlt,
    title: 'Sariska Tiger Safari: Zones, Hotels & Best Time | Tiger Safaris in India',
    description:
      'Plan a Sariska tiger safari in the Aravallis. Close to Delhi and Jaipur, with ancient temples, forts and a tiger reintroduction success story.',
    ogDescription: 'Sariska tiger safaris near Delhi and Jaipur.',
    h1: 'Sariska Tiger Safari: Aravalli Wilderness Near Delhi and Jaipur',
    short:
      'The closest tiger reserve to Delhi. Aravalli valleys, a hilltop fort and a tiger population rebuilt after it was lost.',
    whyTitle: 'Why Sariska?',
    overview:
      'Sariska lost its tigers in the early 2000s, and a reintroduction programme began in 2008 with tigers translocated from Ranthambore. The population has since grown, making Sariska an important recovery story. The park sits in the Aravalli range, one of the world\'s oldest mountain chains, and is dotted with ruins such as Kankwari Fort and the ancient Neelkanth temple complex nearby.',
    wildlifeTitle: 'What you can see',
    wildlifeText:
      'Tiger, leopard, striped hyena, jackal, sambar, nilgai, chital and 200+ bird species, including the Indian peafowl and grey partridge.',
    wildlife: ['Bengal tiger', 'Leopard', 'Striped hyena', 'Nilgai', 'Golden jackal', 'Indian peafowl'],
    zonesTitle: 'What to explore',
    zonesIntro: 'Sariska pairs wildlife drives with heritage stops inside and near the reserve.',
    zones: [
      { name: 'Core jeep / canter routes', terrain: 'Aravalli valleys and dry forest', highlights: 'Tiger and leopard habitat', suits: 'Weekend travellers' },
      { name: 'Kankwari Fort', terrain: 'Hilltop fort', highlights: 'History inside the reserve', suits: 'Culture + wildlife' },
      { name: 'Pandupole / temples', terrain: 'Forest valleys', highlights: 'Hanuman temple and scenic drives', suits: 'Families' },
    ],
    bestTimeTitle: 'Best time for a Sariska safari',
    bestTime: [
      ['October–March', 'Pleasant weather'],
      ['April–June', 'Hotter; waterholes can concentrate wildlife'],
      ['Monsoon', 'Access is often limited — verify'],
    ],
    gettingThere: [
      ['Road', 'Roughly 200 km from Delhi, about 110 km from Jaipur — verify current drive times'],
      ['Rail', 'Alwar is the nearest major town and railhead'],
    ],
    stay: "Hotels near Sariska's gate area and heritage properties in Alwar.",
    itineraryTitle: '2 days / 1 night',
    itinerary: [
      'Day 1: Drive from Delhi; afternoon safari',
      'Day 2: Morning safari; visit Kankwari Fort or Pandupole Hanuman temple; return',
    ],
    tips: [
      'Sariska works well as an add-on to a Jaipur or Ranthambore trip.',
      'Vehicle entry quotas apply; book early.',
    ],
    nearby: ['Alwar', 'Kankwari Fort', 'Neelkanth temples', 'Jaipur'],
    facts: [
      ['State', 'Rajasthan (Alwar district)'],
      ['Distance', 'Roughly 200 km from Delhi, 110 km from Jaipur — verify'],
      ['Terrain', 'Aravalli hills, dry forest, valleys and rocky outcrops'],
      ['Notable', 'Tigers reintroduced after local extinction (from 2008)'],
      ['Best for', 'Short trips, history and wildlife together'],
    ],
    faq: [
      { q: 'Is Sariska good for first-timers?', a: 'Yes, especially for a short trip, but the chance of a tiger sighting is typically lower than in Ranthambore.' },
      { q: 'How many days do I need?', a: '1 night is possible; 2 nights is better.' },
      { q: 'Can I combine Sariska with Ranthambore?', a: 'Yes, they are both part of our Rajasthan Tiger Trail.' },
    ],
    relatedJourneys: ['rajasthan-tiger-trail', 'corbett-weekend-from-delhi'],
    relatedExperiences: ['jeep-and-canter-safaris', 'family-safaris'],
    relatedGuides: ['best-time-for-tiger-safari-in-india', 'how-to-book-tiger-safari-india'],
    booking: {
      asOf: '2026-10-17',
      portals: [
        {
          name: 'Rajasthan FMDSS / online safari booking',
          url: 'https://fmdss.forest.rajasthan.gov.in/',
          note: 'Advance and Tatkal routes (including obms-tourist.rajasthan.gov.in) are used for Rajasthan parks. Confirm which portal is live for your dates.',
        },
      ],
      vehicles: 'Jeep and canter on approved routes from Sariska / Tehla and related gates.',
      season: 'Typically October to June; closed or restricted in monsoon — verify.',
      timings: 'Morning and afternoon slots shift by season, similar to other Rajasthan reserves.',
      documents: 'Government photo ID or passport for every guest.',
      feeNote:
        'Entry fees revise periodically (including reported April 2026 adjustments). We quote from the live tariff — reseller “all-in” seat prices vary.',
    },
    featuredStays: [
      { name: 'Sariska gate lodge', band: '₹₹₹', distance: 'Minutes to morning reporting', suits: 'Short Delhi/Jaipur trips' },
      { name: 'Heritage Alwar stay', band: '₹₹₹', distance: 'Town + transfer to park', suits: 'Culture + wildlife' },
      { name: 'Comfort resort near gate', band: '₹₹', distance: 'Short drive to Sariska Gate', suits: 'Families' },
      { name: 'Quiet valley lodge', band: '₹₹', distance: 'Tehla / alternate access', suits: 'Repeat visitors' },
      { name: 'Value hotel Alwar', band: '₹', distance: 'Allow transfer time', suits: 'Budget day trips' },
      { name: 'Boutique Aravalli stay', band: '₹₹', distance: 'Scenic, quieter evenings', suits: 'Couples' },
    ],
  },
]

export const getPark = (slug) =>
  parks.find((p) => p.slug === slug || p.legacySlug === slug || p.destinationSlug === slug)

export const parkPath = (parkOrSlug) => {
  const p = typeof parkOrSlug === 'string' ? getPark(parkOrSlug) : parkOrSlug
  return p?.path || '/tiger-reserves'
}
