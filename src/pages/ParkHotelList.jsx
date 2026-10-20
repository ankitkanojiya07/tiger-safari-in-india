import { Link, useParams } from 'react-router-dom'
import { getPark, siteUrl } from '../data/site'
import { useSite } from '../App'
import Seo, { breadcrumbLd } from '../components/Seo'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import AuthorByline from '../components/AuthorByline'
import Ready from '../components/Ready'
import { Icon } from '../components/Icons'
import NotFound from './NotFound'

const LISTS = {
  'luxury-resorts': {
    crumb: 'Luxury resorts',
    title: (p) => `Luxury Resorts in ${p.name} | Curated Jungle Lodges`,
    h1: (p) => `Luxury resorts in ${p.name}`,
    description: (p) =>
      `Hand-curated luxury resorts and jungle lodges near ${p.name}, chosen for gate proximity, guiding and atmosphere — not OTA scrapes.`,
    band: '₹₹₹',
    criteria:
      'We shortlist luxury stays for distance to safari gates, naturalist quality, room count (prefer smaller), and whether the property suits photographers or families.',
  },
  'budget-hotels': {
    crumb: 'Budget hotels',
    title: (p) => `Budget Hotels in ${p.name} | Stays Near Safari Gates`,
    h1: (p) => `Budget hotels in ${p.name}`,
    description: (p) =>
      `Curated budget and value hotels near ${p.name} gates — clean, early-morning friendly, and matched to your safari plan.`,
    band: '₹',
    criteria:
      'Value stays are chosen for reliable hot water, quiet nights before dawn drives, and drive time to the gate — not the lowest OTA rate alone.',
  },
  'riverside-resorts': {
    crumb: 'Riverside resorts',
    title: (p) => `Riverside Resorts in ${p.name} | Kosi & Forest Edge`,
    h1: (p) => `Riverside resorts in ${p.name}`,
    description: (p) => `Riverside and forest-edge resorts near ${p.name}, curated for setting and safari access.`,
    band: '₹₹–₹₹₹',
    criteria: 'Riverside picks balance views with practical transfer times to the zones you plan to book.',
  },
}

export default function ParkHotelList({ listSlug }) {
  const { parkSlug } = useParams()
  const { openEnquiry } = useSite()
  const park = getPark(parkSlug)
  const list = LISTS[listSlug]
  if (!park || !list) return <NotFound />
  // Riverside list is mainly Corbett-intent; still allow other parks with adapted copy
  if (listSlug === 'riverside-resorts' && park.slug !== 'jim-corbett') return <NotFound />

  const path = `${park.path}/hotels/${listSlug}`
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: park.name, path: park.path },
    { name: 'Hotels', path: `${park.path}/hotels` },
    { name: list.crumb, path },
  ]

  return (
    <>
      <Seo title={list.title(park)} description={list.description(park)} path={path} image={`${siteUrl}/images/og/${park.slug}.jpg`} jsonLd={[breadcrumbLd(crumbs)]} />
      <PageHero crumbs={crumbs} eyebrow={`${park.name} · Hotels`} title={list.h1(park)} lede={list.criteria} />

      <section className="bg-stone py-20 lg:py-28">
        <div className="wrap max-w-3xl">
          <Reveal>
            <p className="text-[16px] leading-[1.85] text-ink/80">{park.stay}</p>
            <h2 className="mt-12 font-display text-3xl">Selection criteria</h2>
            <ul className="mt-6 list-disc space-y-3 pl-5 text-[15px] text-ink/80">
              <li>Verified or estimated distance / drive time to the nearest safari gate</li>
              <li>Price band {list.band} (no live Offer prices)</li>
              <li>Suitability for your zones and group type</li>
              <li>First-hand or guest-trip feedback where we have it</li>
            </ul>
            <p className="mt-8 text-[14px] text-ink/60">
              Individual hotel pages publish only after they pass our indexation gate (unique write-up, gate distance, 5+
              photos, map, price band). Until then, ask us for a shortlist matched to your dates.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button type="button" onClick={() => openEnquiry(park.slug)} className="btn-solid">
                Get a stay shortlist
              </button>
              <Link to={`${park.path}/hotels/`} className="btn-ghost-dark">
                All {park.name} hotels
              </Link>
              <Link to={`${park.path}/safari-booking/`} className="link-line text-ochre">
                Book safari + stay <Icon name="arrowR" className="h-3.5 w-3.5" />
              </Link>
            </div>
            <AuthorByline />
          </Reveal>
        </div>
      </section>
      <Ready image={park.image} />
    </>
  )
}
