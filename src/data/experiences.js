import { media } from './media'

export const experiences = [
  {
    slug: 'jeep-and-canter-safaris',
    path: '/safaris/jeep-and-canter-safaris',
    title: 'Jeep & Canter Safaris',
    metaTitle: 'Jeep & Canter Tiger Safaris India | Gypsy Drives',
    description: 'Morning and afternoon gypsy and canter safaris across India’s tiger reserves with expert naturalists.',
    short: 'Morning and afternoon drives in an open gypsy with a naturalist who knows each tiger by name.',
    image: media.experiences.jeep,
    where: 'All five reserves',
    who: 'First-timers, families, photographers',
    carry: ['Neutral clothing', 'Binoculars', 'Warm layer for dawn', 'Government photo ID'],
    body: 'The classic Indian tiger safari: an open Gypsy (usually six seats) or a shared canter, entering the forest at first light and again in the afternoon. We book zones strategically and pair you with naturalists who read tracks, alarm calls and territorial signs.',
    faq: [
      { q: 'Private jeep or shared canter?', a: 'Gypsies can often be booked privately; canters are shared. Rules vary by park.' },
      { q: 'How long is a drive?', a: 'Typically about three hours, morning or afternoon.' },
    ],
  },
  {
    slug: 'walking-safaris',
    path: '/safaris/walking-safaris',
    title: 'Walking Safaris',
    metaTitle: 'Walking Safaris India | Satpura Tiger Reserve',
    description: 'Guided walking safaris in Satpura’s buffer forests — tracks, birds and slow wildlife travel on foot.',
    short: 'Slow down and read the forest on foot: pugmarks, scrapes, alarm calls and the small life of the jungle.',
    image: media.experiences.walking,
    where: 'Satpura (buffer areas)',
    who: 'Active travellers who want immersion over speed',
    carry: ['Closed shoes', 'Long sleeves', 'Hat', 'Water bottle'],
    body: 'Satpura is one of the rare tiger landscapes where guided walks are a highlight. You move with a naturalist and forest staff on approved trails, focusing on signs, birds and the pace of the forest rather than racing between sightings.',
    faq: [
      { q: 'Are walks in the core zone?', a: 'Walking is limited to approved buffer areas with trained staff.' },
      { q: 'Is it safe?', a: 'Yes when you follow guide instructions and park rules.' },
    ],
  },
  {
    slug: 'boat-safaris',
    path: '/safaris/boat-safaris',
    title: 'Boat & Canoe Safaris',
    metaTitle: 'Boat & Canoe Safaris | Satpura & Panna',
    description: 'Boat and canoe safaris on the Denwa backwaters and Ken river — birds, gharial and quiet wildlife viewing.',
    short: 'Glide across still backwaters at first light, with gaur on the banks and kingfishers overhead.',
    image: media.experiences.canoe,
    where: 'Satpura, Panna',
    who: 'Photographers, birders, couples',
    carry: ['Light jacket', 'Dry bag for camera', 'Binoculars'],
    body: 'On Satpura’s Denwa backwaters and Panna’s Ken river, water becomes the trail. Dawn canoe or boat time is ideal for birds, crocodilians and bank-side mammals — a calm counterpoint to jeep drives.',
    faq: [
      { q: 'When is boat safari best?', a: 'Early morning is usually calmest and best for light.' },
    ],
  },
  {
    slug: 'photography-safaris',
    path: '/safaris/photography-safaris',
    title: 'Photography Safaris',
    metaTitle: 'Tiger Photography Safaris India | Specialist Itineraries',
    description: 'Photography-led tiger safari itineraries with zone strategy, golden-hour drives and naturalist support.',
    short: 'Zone strategy, soft light and patient drives built around making photographs, not rushing checklists.',
    image: media.experiences.leopard,
    where: 'Ranthambore, Jim Corbett, Panna, Satpura, Sariska',
    who: 'Enthusiasts and serious amateurs',
    carry: ['Long lens', 'Bean bag / support', 'Spare batteries', 'Dust cover'],
    body: 'We plan more safaris, better light windows and mixed zones so you are not stuck repeating one route. Ranthambore’s open lakes and Satpura’s boat light are favourites for many photographers.',
    faq: [
      { q: 'Do you guarantee sightings for photos?', a: 'No — we improve odds with planning, never guarantees.' },
    ],
  },
  {
    slug: 'family-safaris',
    path: '/safaris/family-safaris',
    title: 'Family Safaris',
    metaTitle: 'Family Tiger Safaris India | Kids & Multi-Gen Trips',
    description: 'Family-friendly tiger safari planning with age rules, pacing, lodge choice and educational naturalist time.',
    short: 'Safaris paced for multi-generational groups, with clear age rules and lodges that work for children.',
    image: media.experiences.elephant,
    where: 'Selected parks by season and child age rules',
    who: 'Families and multi-gen groups',
    carry: ['Sun protection', 'Snacks for lodge time', 'Soft layers'],
    body: 'We match parks and lodges to your children’s ages, keep travel days sane, and brief everyone on wildlife etiquette. Some parks have minimum ages for safari seats — we check current rules before you book.',
    faq: [
      { q: 'What age can kids join safaris?', a: 'It varies by park and vehicle type. Ask us for current policies.' },
    ],
  },
]

/** Homepage / park “relevant experiences” helpers (legacy shape) */
export const experienceCards = experiences.map((e) => ({
  title: e.title,
  text: e.short,
  image: e.image,
  where: e.where,
  slug: e.slug,
  path: e.path,
}))

export const getExperience = (slug) => experiences.find((e) => e.slug === slug)
