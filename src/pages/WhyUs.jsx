import { Link } from 'react-router-dom'
import { pageMeta, whyUsPoints, howItWorks, testimonials } from '../data/site'
import Seo, { breadcrumbLd } from '../components/Seo'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Ready from '../components/Ready'

export default function WhyUs() {
  const meta = pageMeta.whyUs
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about/' },
  ]

  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} jsonLd={[breadcrumbLd(crumbs)]} />
      <PageHero
        crumbs={crumbs}
        eyebrow="About"
        title="Why Travel With Us"
        lede="Local naturalists, transparent planning, responsible travel and one point of contact from enquiry to return."
      />
      <section className="bg-stone py-20 lg:py-28">
        <div className="wrap">
          <Reveal>
            <h2 className="h-section">Our approach</h2>
            <p className="lede mt-6 max-w-3xl">
              We design private tiger safaris end to end: permits, zones, lodges, drivers and flights. You travel with a trip lead on call, and naturalists who treat the forest as more than a checklist.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {whyUsPoints.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <h3 className="font-display text-2xl">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-sand py-20 lg:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="h-section">How we plan permits and zones</h2>
            <ol className="mt-8 space-y-5">
              {howItWorks.map((step, i) => (
                <li key={step} className="grid grid-cols-[3rem_1fr] gap-3">
                  <span className="font-display text-2xl text-ochre">{String(i + 1).padStart(2, '0')}</span>
                  <p className="text-[15px] leading-relaxed text-ink/80">{step}</p>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="h-section">Our promises</h2>
            <ul className="mt-8 space-y-4 text-[15px] leading-relaxed text-ink/75">
              <li>No sighting guarantees — wild animals stay wild.</li>
              <li>Transparent pricing before you commit.</li>
              <li>Ethical wildlife viewing: no baiting, no crowding, guide-led behaviour.</li>
              <li>Safety and 24/7 support from arrival to departure.</li>
            </ul>
            <Link to="/plan-your-safari/" className="btn-solid mt-10">
              Plan My Safari
            </Link>
          </Reveal>
        </div>
      </section>
      <section className="bg-stone py-20 lg:py-28">
        <div className="wrap">
          <h2 className="h-section">Traveller notes</h2>
          <p className="mt-4 text-[14px] text-ink/55">Replace these placeholders with real, attributable reviews before launch.</p>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <blockquote key={i} className="border-t border-ink/15 pt-6">
                <p className="font-display text-2xl">{t.title}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-ink/70">{t.quote}</p>
                <footer className="mt-4 text-[12px] uppercase tracking-eyebrow text-ink/50">
                  {t.name} · {t.place}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
      <Ready />
    </>
  )
}
