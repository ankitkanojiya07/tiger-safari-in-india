import { Link } from 'react-router-dom'
import Seo, { breadcrumbLd } from '../components/Seo'
import PageHero from '../components/PageHero'
import Ready from '../components/Ready'

export default function Journal() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Journal', path: '/journal/' },
  ]

  return (
    <>
      <Seo
        title="Tiger Safari Journal | Sightings, Field Notes & Season Updates"
        description="Dated field notes, season reopenings and photo-led stories from Ranthambore, Jim Corbett, Panna, Satpura and Sariska."
        path="/journal/"
        jsonLd={[breadcrumbLd(crumbs)]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="Journal"
        title="Field notes from tiger country"
        lede="Season reopenings, sighting reports and photo stories. Journal pieces publish with named naturalists and photographers — Discover-ready, no clickbait."
      />
      <section className="bg-stone py-20 lg:py-28">
        <div className="wrap max-w-2xl">
          <p className="text-[16px] leading-[1.85] text-ink/80">
            The first seasonal stories land as parks reopen (typically October). Until then, use our planning guides and
            park hubs for zones, booking and stays.
          </p>
          <ul className="mt-10 space-y-4">
            <li>
              <Link to="/guides/" className="link-line text-ochre">
                Planning guides
              </Link>
            </li>
            <li>
              <Link to="/tiger-reserves/" className="link-line text-ink">
                Five park hubs
              </Link>
            </li>
            <li>
              <Link to="/plan-your-safari/" className="link-line text-ink">
                Plan your safari
              </Link>
            </li>
          </ul>
        </div>
      </section>
      <Ready />
    </>
  )
}
