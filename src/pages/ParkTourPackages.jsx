import { Link, useParams } from 'react-router-dom'
import { getPark, journeys, siteUrl } from '../data/site'
import { useSite } from '../App'
import Seo, { breadcrumbLd } from '../components/Seo'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Ready from '../components/Ready'
import { Icon } from '../components/Icons'
import NotFound from './NotFound'

export default function ParkTourPackages() {
  const { parkSlug } = useParams()
  const { openEnquiry } = useSite()
  const park = getPark(parkSlug)
  if (!park) return <NotFound />

  const path = `${park.path}/tour-packages`
  const related = journeys.filter(
    (j) => j.slug !== 'custom-private-journey' && (park.relatedJourneys?.includes(j.slug) || j.parkSlugs?.includes(park.slug)),
  )
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: park.name, path: park.path },
    { name: 'Tour packages', path },
  ]
  const title = `${park.name} Tour Packages | 2–4 Day Safari Itineraries`
  const description = `${park.name} safari tour packages with sample itineraries, start-city options and enquiry-led quotes. Combine with lodges and multi-park tours.`

  return (
    <>
      <Seo title={title} description={description} path={path} image={`${siteUrl}/images/og/${park.slug}.jpg`} jsonLd={[breadcrumbLd(crumbs)]} />
      <PageHero
        crumbs={crumbs}
        eyebrow={`${park.name} · Tours`}
        title={`${park.name} tour packages`}
        lede={`Sample ${park.itineraryTitle.toLowerCase()} plans, plus multi-park tours that include ${park.name}. Every package is quoted on enquiry.`}
      />

      <section className="bg-stone py-20 lg:py-28">
        <div className="wrap grid gap-16 lg:grid-cols-2">
          <Reveal>
            <h2 className="h-section">{park.itineraryTitle}</h2>
            <ol className="mt-8 space-y-4">
              {park.itinerary.map((day, i) => (
                <li key={day} className="grid grid-cols-[2.5rem_1fr] gap-3">
                  <span className="font-display text-xl text-ochre">{String(i + 1).padStart(2, '0')}</span>
                  <p className="text-[15px] leading-relaxed text-ink/80">{day}</p>
                </li>
              ))}
            </ol>
            <button type="button" onClick={() => openEnquiry(park.slug)} className="btn-solid mt-10">
              Request this plan
            </button>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="h-section">Related tours</h2>
            <ul className="mt-8 space-y-4">
              {related.map((j) => (
                <li key={j.slug} className="border-b border-ink/10 pb-4">
                  <Link to={`${j.path}/`} className="group block">
                    <span className="font-display text-2xl group-hover:text-ochre">{j.title}</span>
                    <span className="mt-1 block text-[13px] text-ink/55">
                      {j.duration} · {j.bestFor}
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/tours/" className="link-line text-ochre">
                  All tiger safari tours <Icon name="arrowR" className="h-3.5 w-3.5" />
                </Link>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>
      <Ready image={park.image} />
    </>
  )
}
