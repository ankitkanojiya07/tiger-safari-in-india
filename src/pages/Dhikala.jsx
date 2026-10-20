import { Link } from 'react-router-dom'
import { getPark, siteUrl } from '../data/site'
import { useSite } from '../App'
import Seo, { breadcrumbLd, faqLd } from '../components/Seo'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import AuthorByline from '../components/AuthorByline'
import FaqSection from '../components/FaqSection'
import Ready from '../components/Ready'
import { Icon } from '../components/Icons'

const faqs = [
  {
    q: 'How does Dhikala booking work?',
    a: 'Dhikala forest rest houses and overnight access are controlled by the forest department and sell out early. We explain the official process, timelines and realistic alternatives if Dhikala is full.',
  },
  {
    q: 'Can I do Dhikala as a day safari?',
    a: 'Access rules change by season. Day visitation and overnight stays are different products — we confirm current options for your dates.',
  },
  {
    q: 'What if Dhikala is unavailable?',
    a: 'Bijrani, Jhirna, Dhela and other zones still make a strong Corbett trip. We rebuild the plan around open zones and riverside lodges near Ramnagar.',
  },
]

export default function Dhikala() {
  const park = getPark('jim-corbett')
  const { openEnquiry } = useSite()
  const path = '/jim-corbett/zones/dhikala'
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Jim Corbett', path: '/jim-corbett/' },
    { name: 'Zones', path: '/jim-corbett/zones/' },
    { name: 'Dhikala', path },
  ]

  return (
    <>
      <Seo
        title="Dhikala Zone Booking & Forest Lodge | Jim Corbett"
        description="How Dhikala zone stays and safaris work in Jim Corbett: official booking windows, overnight rest houses, alternatives and enquiry-led planning."
        path={path}
        type="article"
        image={`${siteUrl}/images/og/jim-corbett.jpg`}
        jsonLd={[breadcrumbLd(crumbs), faqLd(faqs)]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="Jim Corbett · Dhikala"
        title="Dhikala zone booking"
        lede="Overnight forest rest houses on the Ramganga reservoir — the classic Corbett immersion. Official inventory is limited; we plan early and keep alternatives ready."
      />
      <section className="bg-stone py-20 lg:py-28">
        <div className="wrap max-w-3xl space-y-6">
          <Reveal>
            <p className="text-[16px] leading-[1.85] text-ink/80">
              Dhikala is the emotional heart of Jim Corbett for many travellers: grassland chaurs, reservoir views and
              overnight stays inside the tourism zone. Entry and rest-house beds are allocated through official forest
              systems, not private OTAs. We are a private operator that plans zone strategy, documents and connecting
              lodges — we do not replace the forest department portal.
            </p>
            <h2 className="mt-10 font-display text-3xl">What we handle</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] text-ink/80">
              <li>Booking-window timing for your travel dates</li>
              <li>Realistic odds and backup zones if Dhikala is closed or full</li>
              <li>Riverside lodge nights near Ramnagar when overnight forest stays are unavailable</li>
              <li>Jeep / canter mix across Bijrani, Jhirna, Dhela and other open zones</li>
            </ul>
            <div className="mt-10 flex flex-wrap gap-4">
              <button type="button" onClick={() => openEnquiry(park.slug)} className="btn-solid">
                Enquire for Dhikala dates
              </button>
              <Link to="/jim-corbett/safari-booking/" className="btn-ghost-dark">
                Corbett safari booking
              </Link>
              <Link to="/jim-corbett/zones/" className="link-line text-ochre">
                All Corbett zones <Icon name="arrowR" className="h-3.5 w-3.5" />
              </Link>
            </div>
            <AuthorByline />
          </Reveal>
        </div>
      </section>
      <FaqSection title="Dhikala FAQ" faqs={faqs} />
      <Ready image={park.image} />
    </>
  )
}
