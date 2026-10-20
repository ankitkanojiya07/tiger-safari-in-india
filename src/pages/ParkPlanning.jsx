import { Link, useParams } from 'react-router-dom'
import { getPark, siteUrl, parks } from '../data/site'
import { useSite } from '../App'
import { disclaimerOfficial } from '../data/eeat'
import Seo, { breadcrumbLd, faqLd } from '../components/Seo'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import AuthorByline from '../components/AuthorByline'
import FaqSection from '../components/FaqSection'
import Ready from '../components/Ready'
import { Icon } from '../components/Icons'
import NotFound from './NotFound'

const KINDS = {
  'best-time': {
    crumb: 'Best time',
    title: (p) => `Best Time to Visit ${p.name} (${new Date().getFullYear()}) | Tiger Safaris in India`,
    h1: (p) => `Best time to visit ${p.name}`,
    description: (p) =>
      `Month-by-month guide to ${p.name} tiger safari season, closures, weather and sighting conditions. Updated with dated forest-department notes.`,
    lede: (p) =>
      `When to plan a ${p.name} safari: comfort months versus waterhole season, monsoon closures, and how zone openings shift.`,
  },
  'how-to-reach': {
    crumb: 'How to reach',
    title: (p) => `How to Reach ${p.name} | Rail, Road & Air`,
    h1: (p) => `How to reach ${p.name}`,
    description: (p) =>
      `Getting to ${p.name}: nearest airport, railhead, road times from Delhi, Jaipur and other cities, plus transfer planning.`,
    lede: (p) => `Air, rail and road options for ${p.name}, with typical transfer times to the park gates.`,
  },
  'safari-cost': {
    crumb: 'Safari cost',
    title: (p) => `${p.name} Safari Price & Cost Guide | Tiger Safaris in India`,
    h1: (p) => `${p.name} safari cost`,
    description: (p) =>
      `${p.name} safari price components: permit, vehicle, guide, stay and transfers. Indian vs foreign national notes — quoted on enquiry with dated sources.`,
    lede: (p) =>
      `What goes into a ${p.name} safari budget. We do not publish live Offer prices; you receive a tailored quote. Fee structures change — verify “as of” dates.`,
  },
}

export default function ParkPlanning({ kind }) {
  const { parkSlug } = useParams()
  const { openEnquiry } = useSite()
  const park = getPark(parkSlug)
  const meta = KINDS[kind]
  if (!park || !meta) return <NotFound />

  const path = `${park.path}/${kind}`
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: park.name, path: park.path },
    { name: meta.crumb, path },
  ]

  const faqs =
    kind === 'safari-cost'
      ? [
          {
            q: `How much does a ${park.name} safari cost?`,
            a: 'Cost depends on nationality, vehicle type (jeep vs canter), number of drives, lodge band and transfers. We send a range quote after your enquiry — we do not list live prices here.',
          },
          {
            q: 'Do foreign nationals pay more?',
            a: 'Yes, most parks charge higher entry fees for foreign nationals. Document rules also differ (passport). Ask us for the current structure for your dates.',
          },
          {
            q: 'Are estimates a booking quote?',
            a: 'No. Any cost estimator or guide figure is an estimate only. Your enquiry produces a real quote.',
          },
        ]
      : kind === 'best-time'
        ? [
            {
              q: `Is ${park.name} open in monsoon?`,
              a: 'Core tourism zones typically close or restrict access in the monsoon. Some buffer areas may differ — verify each season with the forest department.',
            },
            {
              q: 'Best months for photography?',
              a: 'Many photographers prefer late season (often April–June) when forests open and animals use waterholes, despite the heat. Winter is more comfortable for longer drives.',
            },
          ]
        : [
            {
              q: `How long from Delhi to ${park.name}?`,
              a: park.gettingThere.map(([k, v]) => `${k}: ${v}`).join(' '),
            },
          ]

  return (
    <>
      <Seo
        title={meta.title(park)}
        description={meta.description(park)}
        path={path}
        type={kind === 'best-time' ? 'article' : 'website'}
        image={`${siteUrl}/images/og/${park.slug}.jpg`}
        jsonLd={[breadcrumbLd(crumbs), faqLd(faqs)]}
      />
      <PageHero crumbs={crumbs} eyebrow={`${park.name} · ${meta.crumb}`} title={meta.h1(park)} lede={meta.lede(park)} />

      <section className="bg-stone py-20 lg:py-28">
        <div className="wrap max-w-3xl">
          <Reveal>
            {kind === 'best-time' && (
              <>
                <p className="text-[16px] leading-[1.85] text-ink/80">
                  {park.overview.slice(0, 220)}… Season calendars are set by the forest department and can shift year to year.
                </p>
                <h2 className="mt-12 font-display text-3xl">{park.bestTimeTitle}</h2>
                <div className="mt-8 overflow-x-auto">
                  <table className="w-full min-w-[480px] border-t border-ink/15 text-left text-[14px]">
                    <thead>
                      <tr className="border-b border-ink/15 text-[11px] uppercase tracking-[0.16em] text-ink/50">
                        <th className="py-4 pr-4 font-medium">Period</th>
                        <th className="py-4 font-medium">What to expect</th>
                      </tr>
                    </thead>
                    <tbody>
                      {park.bestTime.map(([t, d]) => (
                        <tr key={t} className="border-b border-ink/10">
                          <td className="py-4 pr-4 font-display text-xl">{t}</td>
                          <td className="py-4 text-ink/75">{d}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Link to="/guides/best-time-for-tiger-safari-in-india/" className="link-line mt-8 text-ochre">
                  India-wide best-time guide <Icon name="arrowR" className="h-3.5 w-3.5" />
                </Link>
              </>
            )}

            {kind === 'how-to-reach' && (
              <>
                <h2 className="font-display text-3xl">Getting there</h2>
                <dl className="mt-8 border-t border-ink/15">
                  {park.gettingThere.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-ink/15 py-4">
                      <dt className="text-[11px] uppercase tracking-[0.18em] text-ink/50">{k}</dt>
                      <dd className="text-[15px] text-ink/85">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-8 text-[15px] leading-relaxed text-ink/70">
                  Nearby landmarks: {park.nearby.join(', ')}. We arrange private transfers timed to safari gates.
                </p>
              </>
            )}

            {kind === 'safari-cost' && (
              <>
                <p className="text-[16px] leading-[1.85] text-ink/80">{disclaimerOfficial}</p>
                <h2 className="mt-12 font-display text-3xl">Cost components</h2>
                <ul className="mt-6 list-disc space-y-3 pl-5 text-[15px] leading-relaxed text-ink/80">
                  <li>Park entry / permit (Indian vs foreign national rates differ)</li>
                  <li>Vehicle: private Gypsy / jeep or shared canter where offered</li>
                  <li>Naturalist / guide fees</li>
                  <li>Lodge nights (price band ₹ / ₹₹ / ₹₹₹ — no live prices on this site)</li>
                  <li>Road transfers and any internal flights</li>
                </ul>
                <div className="mt-10 border border-ink/15 bg-sand p-6">
                  <h3 className="font-display text-2xl">Safari cost estimator (default view)</h3>
                  <p className="mt-3 text-[14px] text-ink/70">
                    Example planning range for {park.name}: 3 nights · 4 jeep safaris · mid-range lodge — enquire for a
                    dated quote. Estimates are not bookings.
                  </p>
                  <p className="mt-4 text-[12px] text-ink/50">As of 2026-10-17 · official fee tables change each season</p>
                </div>
              </>
            )}

            <div className="mt-12 flex flex-wrap gap-4">
              <button type="button" onClick={() => openEnquiry(park.slug)} className="btn-solid">
                Request a quote
              </button>
              <Link to={`${park.path}/safari-booking/`} className="btn-ghost-dark">
                Safari booking
              </Link>
              <Link to={`${park.path}/`} className="link-line text-ochre">
                {park.name} hub <Icon name="arrowR" className="h-3.5 w-3.5" />
              </Link>
            </div>
            <AuthorByline />
          </Reveal>
        </div>
      </section>

      <section className="bg-sand py-14">
        <div className="wrap">
          <p className="eyebrow">Other parks</p>
          <ul className="mt-4 flex flex-wrap gap-4">
            {parks
              .filter((p) => p.slug !== park.slug)
              .map((p) => (
                <li key={p.slug}>
                  <Link to={`${p.path}/${kind}/`} className="link-line text-ink">
                    {p.name} {meta.crumb.toLowerCase()}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>

      <FaqSection title={`${park.name} — ${meta.crumb} FAQ`} faqs={faqs} />
      <Ready image={park.image} />
    </>
  )
}
