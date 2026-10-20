import { Link } from 'react-router-dom'
import { brand, pageMeta } from '../data/site'
import Seo, { breadcrumbLd } from '../components/Seo'
import PageHero from '../components/PageHero'
import Ready from '../components/Ready'
import { Icon } from '../components/Icons'

export default function Contact() {
  const meta = pageMeta.contact
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact/' },
  ]

  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} jsonLd={[breadcrumbLd(crumbs)]} />
      <PageHero crumbs={crumbs} eyebrow="Contact" title="Talk to the safari desk" lede="Email, WhatsApp or the planning form — we reply within 24 hours." />
      <section className="bg-stone py-20 lg:py-28">
        <div className="wrap grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-[11px] uppercase tracking-eyebrow text-ink/50">Email</p>
            <a href={`mailto:${brand.email}`} className="mt-3 block font-display text-2xl hover:text-ochre">
              {brand.email}
            </a>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-eyebrow text-ink/50">Phone / WhatsApp</p>
            <a href={`https://wa.me/${brand.whatsapp}`} className="mt-3 block font-display text-2xl hover:text-ochre" target="_blank" rel="noreferrer">
              {brand.phone}
            </a>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-eyebrow text-ink/50">Plan a trip</p>
            <Link to="/plan-your-safari/" className="link-line mt-4">
              Plan My Safari <Icon name="arrowR" className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
      <Ready />
    </>
  )
}
