import { pageMeta } from '../data/site'
import Seo, { breadcrumbLd } from '../components/Seo'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Ready from '../components/Ready'

export default function ImpactPage() {
  const meta = pageMeta.impact
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Impact', path: '/impact/' },
  ]

  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} jsonLd={[breadcrumbLd(crumbs)]} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Impact"
        title="Travel That Gives Back to Tigers and Communities"
        lede="Responsible tiger tourism supports the people who live beside the forest and the systems that protect habitat."
      />
      <section className="bg-stone py-20 lg:py-28">
        <div className="wrap max-w-3xl space-y-14">
          <Reveal>
            <h2 className="h-section">How tourism supports conservation</h2>
            <p className="lede mt-6">
              Well-run safaris create demand for intact habitat, fund park fees, and give local communities reasons to protect wildlife rather than convert forest edge land. We book ethically, brief guests on behaviour, and avoid practices that stress animals.
            </p>
          </Reveal>
          <Reveal>
            <h2 className="h-section">Local employment</h2>
            <p className="lede mt-6">
              Guides, drivers, lodge staff and craftspeople around each reserve are part of every journey we plan. Where we can, we prefer lodges that hire from nearby villages and train naturalists from forest-edge communities.
            </p>
          </Reveal>
          <Reveal>
            <h2 className="h-section">Wildlife-friendly standards</h2>
            <ul className="mt-6 list-disc space-y-3 pl-5 text-[15px] leading-relaxed text-ink/75">
              <li>No feeding or baiting of wildlife</li>
              <li>No crowding or off-road driving outside park rules</li>
              <li>Plastic reduction at lodges we recommend</li>
              <li>Quiet viewing and guide-led distances</li>
            </ul>
          </Reveal>
          <Reveal>
            <h2 className="h-section">Community projects</h2>
            <p className="lede mt-6">
              We only list specific projects and numbers once they are verified. Until then, we describe our practices honestly: a share of bookings is directed toward conservation and community partners we work with around the parks.
            </p>
          </Reveal>
        </div>
      </section>
      <Ready />
    </>
  )
}
