import { Link, Navigate, useParams } from 'react-router-dom'
import { journeys, getJourney, pageMeta, getPark } from '../data/site'
import { useSite } from '../App'
import Seo, { breadcrumbLd } from '../components/Seo'
import PageHero from '../components/PageHero'
import Img from '../components/Img'
import Reveal from '../components/Reveal'
import Ready from '../components/Ready'
import { Icon } from '../components/Icons'

export function JourneysHub() {
  const meta = pageMeta.journeys
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Tours', path: '/tours/' },
  ]
  const rows = journeys.filter((j) => j.slug !== 'custom-private-journey')

  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} jsonLd={[breadcrumbLd(crumbs)]} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Tours"
        title="Tiger Safari Tours Across India"
        lede="Ready-made itineraries spanning Rajasthan, Uttarakhand and Madhya Pradesh — or a fully private route built around your dates."
      />
      <section className="bg-stone py-16 lg:py-20">
        <div className="wrap overflow-x-auto">
          <table className="w-full min-w-[720px] border-t border-ink/15 text-left text-[14px]">
            <thead>
              <tr className="border-b border-ink/15 text-[11px] uppercase tracking-[0.16em] text-ink/50">
                <th className="py-4 pr-4 font-medium">Journey</th>
                <th className="py-4 pr-4 font-medium">Duration</th>
                <th className="py-4 pr-4 font-medium">Parks</th>
                <th className="py-4 font-medium">Best for</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((j) => (
                <tr key={j.slug} className="border-b border-ink/10">
                  <td className="py-4 pr-4">
                    <Link to={`${j.path}/`} className="font-display text-xl hover:text-ochre">
                      {j.title}
                    </Link>
                  </td>
                  <td className="py-4 pr-4 text-ink/75">{j.duration}</td>
                  <td className="py-4 pr-4 text-ink/75">{j.parks.join(', ')}</td>
                  <td className="py-4 text-ink/75">{j.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="wrap mt-10">
          <Link to="/plan-your-safari/" className="link-line text-ochre">
            Prefer a custom private journey? <Icon name="arrowR" className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
      <Ready />
    </>
  )
}

export function JourneyDetail() {
  const { slug } = useParams()
  const { openEnquiry } = useSite()
  const journey = getJourney(slug)
  if (!journey) return <Navigate to="/tours/" replace />
  if (journey.slug === 'custom-private-journey') return <Navigate to="/plan-your-safari/" replace />

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Tours', path: '/tours/' },
    { name: journey.title, path: journey.path },
  ]

  return (
    <>
      <Seo title={journey.metaTitle} description={journey.description} path={journey.path} jsonLd={[breadcrumbLd(crumbs)]} />
      <PageHero crumbs={crumbs} eyebrow={journey.duration} title={journey.title} lede={journey.summary} />
      <section className="bg-stone py-20 lg:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <Img src={journey.image} alt={journey.title} className="aspect-[16/10] w-full" label={journey.title} sizes="(min-width: 1024px) 55vw, 100vw" />
            <h2 className="mt-12 font-display text-4xl">Day by day</h2>
            <ol className="mt-8 space-y-4">
              {journey.days.map((d, i) => (
                <li key={d} className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-ink/10 pb-4">
                  <span className="font-display text-xl text-ochre">{String(i + 1).padStart(2, '0')}</span>
                  <p className="text-[15px] leading-relaxed text-ink/80">{d}</p>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="border border-ink/10 bg-sand p-8">
              <p className="text-[11px] uppercase tracking-eyebrow text-ink/50">At a glance</p>
              <dl className="mt-6 space-y-4 text-[15px]">
                <div>
                  <dt className="text-ink/50">Duration</dt>
                  <dd className="mt-1 font-display text-2xl">{journey.duration}</dd>
                </div>
                <div>
                  <dt className="text-ink/50">Best for</dt>
                  <dd className="mt-1">{journey.bestFor}</dd>
                </div>
                <div>
                  <dt className="text-ink/50">Best months</dt>
                  <dd className="mt-1">{journey.bestMonths}</dd>
                </div>
                <div>
                  <dt className="text-ink/50">Pricing</dt>
                  <dd className="mt-1">{journey.pricing}</dd>
                </div>
              </dl>
              <h3 className="mt-8 font-display text-2xl">Parks on this journey</h3>
              <ul className="mt-4 space-y-2">
                {journey.parkSlugs.map((s) => {
                  const p = getPark(s)
                  return p ? (
                    <li key={s}>
                      <Link to={`${p.path}/`} className="link-line">
                        {p.name} <Icon name="arrowR" className="h-3.5 w-3.5" />
                      </Link>
                    </li>
                  ) : null
                })}
              </ul>
              <button onClick={() => openEnquiry()} className="btn-solid mt-8 w-full">
                Enquire about this journey
              </button>
            </div>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-2xl">Inclusions</h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-[14px] text-ink/75">
                  {journey.inclusions.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-2xl">Exclusions</h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-[14px] text-ink/75">
                  {journey.exclusions.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <Ready />
    </>
  )
}
