import { media } from './media'
import { brand } from './config'
import { parks } from './parks'
import { experiences as experiencePages, experienceCards } from './experiences'
import { journeys } from './journeys'
import { publishedStories } from './stories'

export { brand } from './config'
export { parks, getPark, parkPath } from './parks'
export { journeys, getJourney } from './journeys'
export { experiences as experiencePages, getExperience, experienceCards } from './experiences'
export { hotelPages, getHotelPage, hotelsHubMeta } from './hotels'
export { stories, publishedStories, publishedGuides, getStory, getGuide } from './stories'
export { siteFaq } from './faq'
export { siteUrl, absUrl, hashRedirects } from './config'

/** Main nav — mega menus + real paths (SEO §6 locked labels) */
export const nav = [
  { label: 'Parks', mega: 'parks' },
  { label: 'Safaris', mega: 'safaris' },
  { label: 'Hotels', href: '/hotels/' },
  { label: 'Tours', mega: 'tours' },
  { label: 'Guides', mega: 'guides' },
  { label: 'Journal', href: '/journal/' },
]

export const pageMeta = {
  home: {
    path: '/',
    title: 'Tiger Safaris in India | Private Tiger Safari Tours',
    description:
      "Plan a private tiger safari in India. Expert-designed trips to Ranthambore, Jim Corbett, Panna, Satpura and Sariska with naturalist guides and handpicked stays.",
  },
  destinations: {
    path: '/tiger-reserves/',
    title: 'Tiger Reserves in India | Five Parks Compared',
    description:
      'Compare tiger reserves across Ranthambore, Jim Corbett, Panna, Satpura and Sariska — landscapes, seasons, gates and how to choose.',
  },
  experiences: {
    path: '/safaris/',
    title: 'Tiger Safari Types in India | Jeep, Walk, Boat',
    description:
      "Choose how to experience India's tiger reserves: jeep safaris, walking safaris, boat safaris, photography tours and family-friendly wildlife trips.",
  },
  journeys: {
    path: '/tours/',
    title: 'Tiger Safari Tour Packages India | Itineraries',
    description:
      'Browse tiger safari tour packages across India: Golden Triangle plus tigers, Rajasthan Tiger Trail, Central India circuit and custom multi-park tours.',
  },
  hotels: {
    path: '/hotels/',
    title: 'Hotels & Jungle Lodges Near India’s Tiger Reserves',
    description:
      'Browse stays near Ranthambore, Jim Corbett, Panna, Satpura and Sariska — sorted by distance to safari gates and price band.',
  },
  whyUs: {
    path: '/about/',
    title: 'About Us | Expert Tiger Safari Planners India',
    description:
      'Meet the team behind your tiger safari. Local naturalists, transparent planning, responsible travel and one point of contact from enquiry to return.',
  },
  impact: {
    path: '/impact/',
    title: 'Responsible Tiger Tourism | Our Conservation Impact',
    description:
      "See how our tiger safaris support local communities, anti-poaching efforts and habitat conservation around India's national parks.",
  },
  stories: {
    path: '/guides/',
    title: 'Tiger Safari Guides | Best Time, Booking & Planning',
    description:
      "Read expert tiger safari guides: best time to visit, how to book, park comparisons and planning tips for India's national parks.",
  },
  guides: {
    path: '/guides/',
    title: 'Tiger Safari Guides | Best Time, Booking & Planning',
    description:
      "Read expert tiger safari guides: best time to visit, how to book, park comparisons and planning tips for India's national parks.",
  },
  plan: {
    path: '/plan-your-safari/',
    title: 'Plan My Tiger Safari | Free Custom Itinerary',
    description:
      "Tell us your dates, group size and interests. We'll design a private tiger safari itinerary for India's best national parks.",
  },
  faq: {
    path: '/faq/',
    title: 'Tiger Safari FAQ India | Sightings, Cost, Safety',
    description:
      'Answers to common tiger safari questions: best parks, sighting odds, costs, ID rules, seasons and trip length.',
  },
  contact: {
    path: '/contact/',
    title: 'Contact Tiger Safaris in India',
    description: 'Email, WhatsApp and enquiry form for private tiger safari planning across India.',
  },
}

export const stats = [
  { icon: 'parks', title: 'Reserves', text: "Five of India's finest tiger landscapes, from the Himalayan foothills to the Aravallis" },
  { icon: 'lodge', title: 'Lodges', text: 'Hand-picked forest lodges and tented camps on the edge of each reserve' },
  { icon: 'private', title: 'Private', text: 'Private gypsies and your own naturalist, so the day runs at your pace' },
  { icon: 'bespoke', title: 'Bespoke', text: 'Itineraries built around you, with every transfer and permit handled' },
  { icon: 'community', title: 'Community', text: "Village walks, local kitchens and guides from the forest's own communities" },
]

/** Used by Experiences homepage component and Park relevance filter */
export const experiences = experienceCards

export const why = [
  {
    tab: 'Destinations',
    title: 'Five forests, five characters',
    text: 'Fort ruins in Ranthambore, elephant grasslands in Jim Corbett, river gorges in Panna, sandstone hills in Satpura and Aravalli valleys in Sariska. We help you choose the mix that suits your season and your interests.',
    image: media.why.destinations,
  },
  {
    tab: 'Wildlife',
    title: 'More than the tiger',
    text: 'Tigers bring most people here, but the forests hold leopards, sloth bears, dhole, gaur and hundreds of bird species. We plan for the whole forest, so every drive has something to show you.',
    image: media.why.wildlife,
  },
  {
    tab: 'Naturalists',
    title: 'Guides who grew up here',
    text: 'Our naturalists know the territories, the water holes and the habits of individual animals. Many come from villages around the reserves and have spent their lives reading this landscape.',
    image: media.why.naturalists,
  },
  {
    tab: 'Lodges',
    title: 'Stays that belong to the forest',
    text: 'Small lodges and tented camps built with local stone, wood and craft. Fewer rooms, more space and verandas where the birdlife comes to you.',
    image: media.why.lodges,
  },
  {
    tab: 'Culture',
    title: 'Forts, temples and village kitchens',
    text: 'These forests sit among centuries of history. Add the temples of Khajuraho, the forts of Rajasthan or a meal cooked in a village home to your journey.',
    image: media.why.culture,
  },
  {
    tab: 'Travel',
    title: 'Every detail handled',
    text: 'Safari permits open months in advance and sell out fast. We book zones, vehicles, trains, flights and road transfers, and stay on call for the whole journey.',
    image: media.why.travel,
  },
  {
    tab: 'Impact',
    title: 'Travel that gives back',
    text: 'A share of every journey supports anti-poaching patrols, water holes for the dry season and education in villages on the forest edge.',
    image: media.why.impact,
  },
]

export const whyUsPoints = [
  { title: 'Planned end to end', text: 'Safari permits, zones, hotels, drivers and flights handled by one team.' },
  { title: 'Expert naturalists', text: 'Guides who read pugmarks, alarm calls and tiger behaviour.' },
  { title: 'Small-group and private departures', text: 'Your own vehicle where the park allows it.' },
  { title: 'Responsible by design', text: 'Part of every booking supports local conservation and communities.' },
  { title: 'Flexible planning', text: 'From a 2-night weekend to a 14-day multi-park expedition.' },
]

export const howItWorks = [
  'Tell us your dates, interests and group size',
  'We design your itinerary and zone strategy',
  'We confirm permits, stays and transfers',
  'You travel with a trip lead on call from arrival to departure',
]

export const testimonials = [
  { title: 'Guest review headline', quote: 'Paste a real guest review here. Keep it to three or four sentences so the cards stay even.', name: 'Guest name', place: 'Country' },
  { title: 'Guest review headline', quote: 'Paste a real guest review here. Reviews from Google or TripAdvisor work well, with the reviewer’s permission.', name: 'Guest name', place: 'Country' },
  { title: 'Guest review headline', quote: 'Paste a real guest review here. Mention which reserve they visited so readers can relate.', name: 'Guest name', place: 'Country' },
]

export const featuredJourneys = () => journeys.filter((j) => j.slug !== 'custom-private-journey').slice(0, 3)
export const latestStories = () => publishedStories().filter((s) => s.pillar === 'guides').slice(0, 3)
