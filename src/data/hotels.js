import { media } from './media'

/** Cross-park hotel content. Individual hotel pages require the indexation gate. */
export const hotelPages = [
  {
    slug: 'luxury-jungle-lodges',
    path: '/hotels/luxury-jungle-lodges',
    title: 'Luxury Jungle Lodges',
    metaTitle: 'Luxury Jungle Lodges India | Tiger Reserve Stays',
    description: 'Handpicked luxury jungle lodges and tented camps on the edge of India’s finest tiger reserves.',
    short: 'Small lodges and tented camps with verandas, local craft and naturalist teams on the forest edge.',
    image: media.experiences.stars,
    where: 'All five reserves',
    who: 'Travellers who want comfort without losing the forest',
    body: 'We choose stays for location relative to gates, guiding quality and atmosphere — not just thread count. Expect fewer rooms, more silence, and dinners that still feel close to the jungle.',
    faq: [
      { q: 'Are lodges inside the park?', a: 'Most luxury stays are on the edge; a few forest rest houses (e.g. Dhikala) sit inside with special permits.' },
    ],
  },
]

export const getHotelPage = (slug) => hotelPages.find((h) => h.slug === slug)

export const hotelsHubMeta = {
  path: '/hotels/',
  title: 'Hotels & Jungle Lodges Near India’s Tiger Reserves',
  description:
    'Browse stays near Ranthambore, Jim Corbett, Panna, Satpura and Sariska — sorted by distance to safari gates and price band.',
}
