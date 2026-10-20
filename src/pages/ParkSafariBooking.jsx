import { Link, useParams } from 'react-router-dom'
import { getPark, siteUrl } from '../data/site'
import { useSite } from '../App'
import Seo, { breadcrumbLd, faqLd } from '../components/Seo'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import FaqSection from '../components/FaqSection'
import AuthorByline from '../components/AuthorByline'
import Ready from '../components/Ready'
import { Icon } from '../components/Icons'
import { disclaimerOfficial } from '../data/eeat'
import NotFound from './NotFound'

export default function ParkSafariBooking() {
  const { parkSlug } = useParams()
  const { openEnquiry } = useSite()
  const park = getPark(parkSlug)
  if (!park) return <NotFound />

  const path = `${park.path}/safari-booking`
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: park.name, path: park.path },
    { name: 'Safari booking', path },
  ]
  const title = `${park.name} Safari Booking 2026–27: Zones, Jeep & Canter | Tiger Safaris in India`
  const description = `Book a ${park.name} tiger safari with zone strategy, jeep or canter options, document guidance and an enquiry-led quote. We arrange permits through official forest systems.`
  const faqs = [
    {
      q: `How does ${park.name} safari booking work?`,
      a: 'Safari permits are issued through the official forest department systems. We handle zone strategy, vehicle type, documents and lodge proximity, then send you a tailored quote.',
    },
    {
      q: 'Are you the official booking portal?',
      a: 'No. We are a private safari operator. Permits are booked on the official systems on your behalf. We are not the forest department.',
    },
    {
      q: 'What documents do I need?',
      a: 'Every guest needs valid government photo ID (Indian nationals) or a passport (foreign nationals). Fee structures differ by nationality — ask us for current park rules.',
    },
    ...(park.faq || []).slice(0, 3),
  ]

  return (
    <>
      <Seo
        title={title}
        description={description}
        path={path}
        image={`${siteUrl}/images/og/${park.slug}.jpg`}
        jsonLd={[
          breadcrumbLd(crumbs),
          faqLd(faqs),
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: `${park.name} tiger safari booking`,
            serviceType: 'Tiger safari booking',
            provider: { '@type': 'TravelAgency', name: 'Tiger Safaris in India', url: siteUrl },
            areaServed: park.name,
            url: `${siteUrl}${path}/`,
          },
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow={`${park.name} · Safari booking`}
        title={`${park.name} Safari Booking 2026–27`}
        lede={`Zone strategy, jeep or canter options, documents and timings — then an enquiry so we can quote a complete ${park.name} safari with stays and transfers.`}
      />

      <section className="bg-stone py-20 lg:py-28">
        <div className="wrap grid gap-16 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <h2 className="h-section">How booking works</h2>
            <ol className="mt-8 space-y-5 text-[15px] leading-relaxed text-ink/80">
              <li>
                <strong className="text-ink">1. Share dates and group.</strong> Tell us start date, nights, guests and whether you prefer jeep or canter where both are offered.
              </li>
              <li>
                <strong className="text-ink">2. Zone strategy.</strong> We recommend a mix of zones based on season and your goals (tigers, photography, quieter drives).
              </li>
              <li>
                <strong className="text-ink">3. Official permits.</strong> Permits are booked through the official forest department systems. We are a private operator, not the government portal.
              </li>
              <li>
                <strong className="text-ink">4. Stays and transfers.</strong> We match lodges by distance to the gate and arrange road transfers.
              </li>
            </ol>
            {park.booking && (
              <div className="mt-10 space-y-5 border-t border-ink/10 pt-8 text-[15px] leading-relaxed text-ink/80">
                <p>
                  <strong className="text-ink">Vehicles:</strong> {park.booking.vehicles}
                </p>
                <p>
                  <strong className="text-ink">Season:</strong> {park.booking.season}
                </p>
                <p>
                  <strong className="text-ink">Timings:</strong> {park.booking.timings}
                </p>
                <p>
                  <strong className="text-ink">Documents:</strong> {park.booking.documents}
                </p>
                <p>
                  <strong className="text-ink">Fees:</strong> {park.booking.feeNote}
                </p>
                <ul className="space-y-3">
                  {park.booking.portals.map((p) => (
                    <li key={p.url}>
                      <strong className="text-ink">Official source:</strong>{' '}
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-ochre underline-offset-2 hover:underline">
                        {p.name}
                      </a>
                      <span className="block text-[14px] text-ink/60">{p.note}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[13px] text-ink/50">As of {park.booking.asOf}. {disclaimerOfficial}</p>
              </div>
            )}
            {!park.booking && (
              <p className="mt-8 text-[14px] text-ink/60">
                Fees and timings change each season. We state figures with an “as of” date and link the official source when quoting.
              </p>
            )}
          </Reveal>
          <Reveal delay={0.08}>
            <div className="border border-ink/15 bg-sand p-8">
              <p className="eyebrow">Next step</p>
              <h2 className="mt-4 font-display text-3xl">Request a {park.name} quote</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink/70">
                Enquiry-led booking — no live prices on the page. You receive a tailored quote for safaris, stays and transfers.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <button type="button" onClick={() => openEnquiry(park.slug)} className="btn-solid w-full text-center">
                  Send enquiry
                </button>
                <Link to="/plan-your-safari/" className="btn-ghost-dark w-full text-center">
                  Full trip planner
                </Link>
                <Link to={`${park.path}/hotels/`} className="link-line mt-2 text-ochre">
                  Hotels near {park.name} <Icon name="arrowR" className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-sand py-20 lg:py-24">
        <div className="wrap">
          <Reveal>
            <h2 className="h-section">Zones and vehicles</h2>
            <p className="lede mt-6 max-w-3xl">{park.zonesIntro}</p>
          </Reveal>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[640px] border-t border-ink/15 text-left text-[14px]">
              <thead>
                <tr className="border-b border-ink/15 text-[11px] uppercase tracking-[0.16em] text-ink/50">
                  <th className="py-4 pr-4 font-medium">Zone / style</th>
                  <th className="py-4 pr-4 font-medium">Terrain</th>
                  <th className="py-4 pr-4 font-medium">Highlights</th>
                  <th className="py-4 font-medium">Suits</th>
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

      <FaqSection title={`${park.name} booking FAQ`} faqs={faqs} />
      <section className="bg-stone pb-6">
        <div className="wrap">
          <AuthorByline />
        </div>
      </section>
      <Ready image={park.imageAlt} />
    </>
  )
}
