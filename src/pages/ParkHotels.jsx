import { Link, useParams } from 'react-router-dom'
import { getPark, siteUrl } from '../data/site'
import { useSite } from '../App'
import Seo, { breadcrumbLd } from '../components/Seo'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Ready from '../components/Ready'
import { Icon } from '../components/Icons'
import NotFound from './NotFound'

/** Featured stay bands until individual hotel pages pass the indexation gate (§9). */
const stayBands = [
  { band: '₹₹₹', label: 'Luxury jungle lodges', note: 'Gate-proximate lodges with strong naturalist support' },
  { band: '₹₹', label: 'Comfort resorts', note: 'Reliable mid-range stays within a short drive of the gate' },
  { band: '₹', label: 'Value stays', note: 'Clean, practical hotels for early safari mornings' },
]

export default function ParkHotels() {
  const { parkSlug } = useParams()
  const { openEnquiry } = useSite()
  const park = getPark(parkSlug)
  if (!park) return <NotFound />

  const path = `${park.path}/hotels`
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: park.name, path: park.path },
    { name: 'Hotels', path },
  ]
  const title = `Hotels Near ${park.name}: Stays by Safari Gate | Tiger Safaris in India`
  const description = `Hotels and jungle lodges near ${park.name}. We match stays by distance to the safari gate, price band and zone strategy — then send an enquiry-led quote.`

  return (
    <>
      <Seo title={title} description={description} path={path} image={`${siteUrl}/images/og/${park.slug}.jpg`} jsonLd={[breadcrumbLd(crumbs)]} />
      <PageHero
        crumbs={crumbs}
        eyebrow={`${park.name} · Hotels`}
        title={`Hotels near ${park.name}`}
        lede={`${park.stay} Individual hotel pages go live only after they pass our indexation gate (unique write-up, gate distance, photos and price band).`}
      />

      <section className="bg-stone py-20 lg:py-28">
        <div className="wrap">
          <Reveal>
            <h2 className="h-section">How we choose stays</h2>
            <p className="lede mt-6 max-w-3xl">
              Distance to the gate matters more than star ratings for early morning safaris. We also weigh guiding quality, noise, and whether the lodge suits families or photographers.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {stayBands.map((s) => (
              <li key={s.band} className="border-t border-ink/15 pt-6">
                <p className="text-[11px] uppercase tracking-eyebrow text-ink/50">Price band {s.band}</p>
                <h3 className="mt-3 font-display text-2xl">{s.label}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{s.note}</p>
              </li>
            ))}
          </ul>
          <div className="mt-14 flex flex-wrap gap-4">
            <button type="button" onClick={() => openEnquiry(park.slug)} className="btn-solid">
              Ask for stay options
            </button>
            <Link to={`${park.path}/safari-booking/`} className="btn-ghost-dark">
              Book {park.name} safari
            </Link>
            <Link to={`${park.path}/hotels/luxury-resorts/`} className="link-line text-ochre">
              Luxury resorts in {park.name} <Icon name="arrowR" className="h-3.5 w-3.5" />
            </Link>
            <Link to={`${park.path}/hotels/budget-hotels/`} className="link-line text-ink">
              Budget hotels <Icon name="arrowR" className="h-3.5 w-3.5" />
            </Link>
            {park.slug === 'jim-corbett' && (
              <Link to="/jim-corbett/hotels/riverside-resorts/" className="link-line text-ink">
                Riverside resorts <Icon name="arrowR" className="h-3.5 w-3.5" />
              </Link>
            )}
            <Link to="/hotels/luxury-jungle-lodges/" className="link-line text-ink">
              Cross-park luxury lodges <Icon name="arrowR" className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-sand py-16">
        <div className="wrap flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-[15px] text-ink/70">
            Prefer a full itinerary with safaris and stays? Start with the {park.name} park hub or a multi-park tour.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to={`${park.path}/`} className="link-line text-ochre">
              {park.name} hub <Icon name="arrowR" className="h-3.5 w-3.5" />
            </Link>
            <Link to="/tours/" className="link-line text-ink">
              Tour packages <Icon name="arrowR" className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <Ready image={park.image} />
    </>
  )
}
