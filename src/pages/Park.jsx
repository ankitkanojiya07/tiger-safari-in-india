import { Link, Navigate, useParams } from 'react-router-dom'
import { m, useReducedMotion } from 'framer-motion'
import { getPark, parks, journeys, experiencePages, getStory, siteUrl } from '../data/site'
import { useSite } from '../App'
import Img from '../components/Img'
import Reveal from '../components/Reveal'
import Ready from '../components/Ready'
import Breadcrumbs from '../components/Breadcrumbs'
import FaqSection from '../components/FaqSection'
import Seo, { breadcrumbLd, faqLd, organizationLd } from '../components/Seo'
import AuthorByline from '../components/AuthorByline'
import { Icon } from '../components/Icons'
import NotFound from './NotFound'

export default function Park() {
  const { parkSlug, slug } = useParams()
  const param = parkSlug || slug
  const { openEnquiry } = useSite()
  const reduce = useReducedMotion()
  const park = getPark(param)

  if (!park) return <NotFound />
  if (param === park.legacySlug || param === park.destinationSlug) {
    return <Navigate to={`${park.path}/`} replace />
  }

  const others = parks.filter((p) => p.slug !== park.slug)
  const relatedJourneys = journeys.filter((j) => park.relatedJourneys?.includes(j.slug))
  const relatedExperiences = experiencePages.filter((e) => park.relatedExperiences?.includes(e.slug))
  const relatedGuides = (park.relatedGuides || []).map(getStory).filter(Boolean)

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Tiger reserves', path: '/tiger-reserves/' },
    { name: park.name, path: park.path },
  ]

  return (
    <article key={park.slug}>
      <Seo
        title={park.title}
        description={park.description}
        path={park.path}
        image={`${siteUrl}/images/og/${park.slug}.jpg`}
        jsonLd={[
          organizationLd(),
          breadcrumbLd(crumbs),
          faqLd(park.faq),
          {
            '@context': 'https://schema.org',
            '@type': ['TouristDestination', 'Park'],
            name: `${park.name} National Park`,
            alternateName: park.altSpelling || undefined,
            description: park.short,
            containedInPlace: { '@type': 'State', name: park.state },
            url: `${siteUrl}${park.path}/`,
          },
        ]}
      />

      <section className="relative h-[86svh] min-h-[560px] overflow-hidden text-white">
        <m.div
          className="absolute inset-0"
          initial={reduce ? false : { scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Img
            src={park.image}
            alt={`${park.name} tiger safari landscape`}
            className="h-full w-full"
            priority
            sizes="100vw"
            label={park.name}
          />
        </m.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40" />
        <div className="wrap relative flex h-full flex-col justify-end pb-16 lg:pb-20">
          <Breadcrumbs items={crumbs} light />
          <m.p
            className="mt-6 text-[11px] uppercase tracking-eyebrow text-white/80"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9 }}
          >
            {park.state} · Tiger reserve
          </m.p>
          <m.h1
            className="mt-3 max-w-4xl font-display text-4xl leading-[1.05] sm:text-6xl lg:text-7xl"
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {park.h1}
          </m.h1>
          <m.p
            className="mt-6 max-w-2xl text-[15px] leading-[1.8] text-white/85 sm:text-[17px]"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            {park.short}
          </m.p>
        </div>
      </section>

      {/* Quick facts */}
      <section className="border-b border-line bg-stone py-10">
        <div className="wrap">
          <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {park.facts.map(([k, v]) => (
              <div key={k}>
                <dt className="text-[11px] uppercase tracking-[0.18em] text-ink/50">{k}</dt>
                <dd className="mt-2 text-[15px] leading-snug text-ink/85">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-[12px] text-ink/45">
            Season dates and zone openings are set by the forest department each year and can change.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-stone py-24 lg:py-32">
        <div className="wrap grid gap-16 lg:grid-cols-[1.25fr_1fr] lg:gap-24">
          <Reveal>
            <p className="eyebrow">Overview</p>
            <h2 className="h-section mt-5">{park.whyTitle}</h2>
            <p className="lede mt-7">{park.overview}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to={`${park.path}/safari-booking/`} className="btn-solid">
                Book {park.name} safari
              </Link>
              <Link to={`${park.path}/hotels/`} className="btn-ghost-dark">
                Hotels near {park.name}
              </Link>
              <button type="button" onClick={() => openEnquiry(park.slug)} className="btn-ghost-dark">
                Quick enquiry
              </button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Img
              src={park.imageAlt}
              alt={`${park.name} forest landscape`}
              className="aspect-[4/5] w-full"
              label={park.name}
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </Reveal>
        </div>
      </section>

      {/* Wildlife */}
      <section className="bg-bark py-20 text-stone lg:py-24">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">Wildlife</p>
            <h2 className="h-section mt-5">{park.wildlifeTitle}</h2>
            <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-stone/75">{park.wildlifeText}</p>
          </Reveal>
          <ul className="mt-12 grid grid-cols-2 border-l border-t border-white/15 sm:grid-cols-3 lg:grid-cols-6">
            {park.wildlife.map((w) => (
              <li key={w} className="border-b border-r border-white/15 px-5 py-8 font-display text-2xl">
                {w}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Zones */}
      <section className="bg-sand py-24 lg:py-28">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">Safari zones</p>
            <h2 className="h-section mt-5">{park.zonesTitle}</h2>
            <p className="lede mt-6 max-w-3xl">{park.zonesIntro}</p>
          </Reveal>
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[640px] border-t border-ink/15 text-left text-[14px]">
              <thead>
                <tr className="border-b border-ink/15 text-[11px] uppercase tracking-[0.16em] text-ink/50">
                  <th className="py-4 pr-4 font-medium">Zone / style</th>
                  <th className="py-4 pr-4 font-medium">Terrain</th>
                  <th className="py-4 pr-4 font-medium">Typical highlights</th>
                  <th className="py-4 font-medium">Who it suits</th>
                </tr>
              </thead>
              <tbody>
                {park.zones.map((z) => (
                  <tr key={z.name} className="border-b border-ink/10">
                    <td className="py-4 pr-4 font-display text-xl">{z.name}</td>
                    <td className="py-4 pr-4 text-ink/75">{z.terrain}</td>
                    <td className="py-4 pr-4 text-ink/75">{z.highlights}</td>
                    <td className="py-4 text-ink/75">{z.suits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link to={`${park.path}/zones/`} className="link-line mt-8 text-ochre">
            Full {park.name} zones guide <Icon name="arrowR" className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* Safari booking CTA */}
      <section className="bg-bark py-16 text-stone">
        <div className="wrap flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow text-mist">Safari booking</p>
            <h2 className="mt-3 font-display text-3xl lg:text-4xl">Book a {park.name} safari</h2>
            <p className="mt-3 max-w-xl text-[15px] text-stone/75">
              Zone strategy, jeep or canter options, documents and an enquiry-led quote — permits via official forest systems.
            </p>
          </div>
          <Link to={`${park.path}/safari-booking/`} className="btn-ghost-light shrink-0">
            Safari booking page
          </Link>
        </div>
      </section>

      {/* Best time */}
      <section className="bg-stone py-24 lg:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Season</p>
            <h2 className="h-section mt-5">{park.bestTimeTitle}</h2>
            <ul className="mt-10 space-y-6">
              {park.bestTime.map(([t, d]) => (
                <li key={t}>
                  <h3 className="font-display text-2xl">{t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{d}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to={`${park.path}/best-time/`} className="link-line text-ochre">
                {park.name} best time <Icon name="arrowR" className="h-3.5 w-3.5" />
              </Link>
              <Link to="/guides/best-time-for-tiger-safari-in-india/" className="link-line text-ink">
                India-wide guide <Icon name="arrowR" className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">Getting there</p>
            <h2 className="h-section mt-5">How to get there</h2>
            <dl className="mt-10 border-t border-ink/15">
              {park.gettingThere.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[6rem_1fr] gap-4 border-b border-ink/15 py-4">
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-ink/50">{k}</dt>
                  <dd className="text-[15px] text-ink/85">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to={`${park.path}/how-to-reach/`} className="link-line text-ochre">
                Full how-to-reach guide <Icon name="arrowR" className="h-3.5 w-3.5" />
              </Link>
              <Link to={`${park.path}/safari-cost/`} className="link-line text-ink">
                Safari cost guide <Icon name="arrowR" className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stay + itinerary */}
      <section className="bg-sand py-24 lg:py-28">
        <div className="wrap">
          <div className="grid gap-16 lg:grid-cols-2">
            <Reveal>
              <p className="eyebrow">Where to stay</p>
              <h2 className="h-section mt-5">Lodges near the gates</h2>
              <p className="lede mt-6">{park.stay}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="eyebrow">Sample itinerary</p>
              <h2 className="h-section mt-5">{park.itineraryTitle}</h2>
              <ol className="mt-8 space-y-4">
                {park.itinerary.map((day, i) => (
                  <li key={day} className="grid grid-cols-[2.5rem_1fr] gap-3">
                    <span className="font-display text-xl text-ochre">{String(i + 1).padStart(2, '0')}</span>
                    <p className="text-[15px] leading-relaxed text-ink/80">{day}</p>
                  </li>
                ))}
              </ol>
              <Link to={`${park.path}/tour-packages/`} className="link-line mt-6 text-ochre">
                {park.name} tour packages <Icon name="arrowR" className="h-3.5 w-3.5" />
              </Link>
            </Reveal>
          </div>
          {park.featuredStays?.length > 0 && (
            <div className="mt-16">
              <h3 className="font-display text-2xl">Featured stay styles by gate distance</h3>
              <p className="mt-3 max-w-2xl text-[14px] text-ink/65">
                Named hotel pages go live only after our indexation gate (unique write-up, verified distance, photos). Until then we match these bands on enquiry.
              </p>
              <div className="mt-8 overflow-x-auto">
                <table className="w-full min-w-[720px] border-t border-ink/15 text-left text-[14px]">
                  <thead>
                    <tr className="border-b border-ink/15 text-[11px] uppercase tracking-[0.16em] text-ink/50">
                      <th className="py-4 pr-4 font-medium">Stay style</th>
                      <th className="py-4 pr-4 font-medium">Band</th>
                      <th className="py-4 pr-4 font-medium">Gate / transfer</th>
                      <th className="py-4 font-medium">Best for</th>
                    </tr>
                  </thead>
                  <tbody>
                    {park.featuredStays.map((s) => (
                      <tr key={s.name} className="border-b border-ink/10">
                        <td className="py-4 pr-4 font-display text-xl">{s.name}</td>
                        <td className="py-4 pr-4 text-ink/75">{s.band}</td>
                        <td className="py-4 pr-4 text-ink/75">{s.distance}</td>
                        <td className="py-4 text-ink/75">{s.suits}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Link to={`${park.path}/hotels/`} className="link-line mt-8 text-ochre">
                Hotels near {park.name} <Icon name="arrowR" className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Tips + nearby */}
      <section className="bg-stone py-24 lg:py-28">
        <div className="wrap grid gap-16 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Tips and rules</p>
            <h2 className="h-section mt-5">Travel well in the forest</h2>
            <ul className="mt-8 list-disc space-y-3 pl-5 text-[15px] leading-relaxed text-ink/75">
              {park.tips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">Nearby</p>
            <h2 className="h-section mt-5">Nearby places</h2>
            <ul className="mt-8 space-y-3">
              {park.nearby.map((n) => (
                <li key={n} className="border-b border-ink/10 py-3 font-display text-2xl">
                  {n}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <FaqSection title={`${park.name} safari FAQ`} faqs={park.faq} />

      <section className="bg-stone pb-8">
        <div className="wrap">
          <AuthorByline />
        </div>
      </section>

      {/* Internal linking */}
      <section className="border-t border-line bg-stone py-20 lg:py-24">
        <div className="wrap space-y-16">
          <div>
            <Reveal className="flex items-end justify-between gap-6">
              <h2 className="font-display text-4xl lg:text-5xl">Other parks</h2>
              <Link to="/tiger-reserves/" className="link-line hidden text-ochre sm:inline-flex">
                Compare all parks <Icon name="arrowR" className="h-3.5 w-3.5" />
              </Link>
            </Reveal>
            <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {others.map((p) => (
                <Link key={p.slug} to={`${p.path}/`} className="group block">
                  <Img
                    src={p.image}
                    alt={`${p.name} tiger safari`}
                    className="aspect-[3/4] w-full"
                    imgClassName="transition-transform duration-700 group-hover:scale-105"
                    label={p.name}
                    sizes="(min-width: 1024px) 25vw, 50vw"
                  />
                  <p className="mt-4 text-[10px] uppercase tracking-eyebrow text-ink/50">{p.state}</p>
                  <p className="mt-1 flex items-center gap-2 font-display text-2xl group-hover:text-ochre">
                    {p.name} <Icon name="arrowR" className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {(relatedJourneys.length > 0 || relatedExperiences.length > 0) && (
            <div className="grid gap-10 md:grid-cols-2">
              {relatedJourneys.length > 0 && (
                <div>
                  <h2 className="font-display text-3xl">Related tours</h2>
                  <ul className="mt-5 space-y-3">
                    {relatedJourneys.map((j) => (
                      <li key={j.slug}>
                        <Link to={`${j.path}/`} className="link-line text-ink">
                          {j.title} <Icon name="arrowR" className="h-3.5 w-3.5" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {relatedExperiences.length > 0 && (
                <div>
                  <h2 className="font-display text-3xl">Related safaris</h2>
                  <ul className="mt-5 space-y-3">
                    {relatedExperiences.map((e) => (
                      <li key={e.slug}>
                        <Link to={`${e.path}/`} className="link-line text-ink">
                          {e.title} <Icon name="arrowR" className="h-3.5 w-3.5" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {relatedGuides.length > 0 && (
            <div>
              <h2 className="font-display text-3xl">Planning guides</h2>
              <ul className="mt-5 grid gap-4 sm:grid-cols-3">
                {relatedGuides.map((s) => (
                  <li key={s.slug}>
                    <Link to={`${s.path}/`} className="group block border-t border-ink/15 pt-4">
                      <p className="text-[10px] uppercase tracking-eyebrow text-ink/50">{s.category}</p>
                      <p className="mt-2 font-display text-xl group-hover:text-ochre">{s.title}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <Ready image={park.imageAlt} />
    </article>
  )
}
