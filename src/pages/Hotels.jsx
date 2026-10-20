import { Link, Navigate, useParams } from 'react-router-dom'
import { parks, hotelPages, getHotelPage, pageMeta } from '../data/site'
import Seo, { breadcrumbLd, faqLd } from '../components/Seo'
import PageHero from '../components/PageHero'
import Img from '../components/Img'
import Reveal from '../components/Reveal'
import FaqSection from '../components/FaqSection'
import Ready from '../components/Ready'
import { Icon } from '../components/Icons'

export function HotelsHub() {
  const meta = pageMeta.hotels
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Hotels', path: '/hotels/' },
  ]

  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} jsonLd={[breadcrumbLd(crumbs)]} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Hotels"
        title="Stays by safari gate"
        lede="We match lodges to park gates, zone strategy and travel style — then quote on enquiry. Park hotel hubs list stay bands; individual hotel pages publish only after our indexation gate."
      />
      <section className="bg-stone py-20 lg:py-28">
        <div className="wrap grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {parks.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <Link to={`${p.path}/hotels/`} className="group block">
                <Img src={p.image} alt={`Hotels near ${p.name}`} className="aspect-[4/3] w-full" label={p.name} sizes="(min-width: 1024px) 30vw, 50vw" />
                <h2 className="mt-5 font-display text-2xl group-hover:text-ochre">Hotels near {p.name}</h2>
                <p className="mt-2 text-[14px] text-ink/55">{p.state}</p>
              </Link>
            </Reveal>
          ))}
          {hotelPages.map((h, i) => (
            <Reveal key={h.slug} delay={(parks.length + i) * 0.05}>
              <Link to={`${h.path}/`} className="group block">
                <Img src={h.image} alt={h.title} className="aspect-[4/3] w-full" label={h.title} sizes="(min-width: 1024px) 30vw, 50vw" />
                <h2 className="mt-5 font-display text-2xl group-hover:text-ochre">{h.title}</h2>
                <p className="mt-2 text-[14px] text-ink/55">{h.where}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <Ready />
    </>
  )
}

export function HotelPageDetail() {
  const { slug } = useParams()
  const page = getHotelPage(slug)
  if (!page) return <Navigate to="/hotels/" replace />

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Hotels', path: '/hotels/' },
    { name: page.title, path: page.path },
  ]

  return (
    <>
      <Seo
        title={page.metaTitle}
        description={page.description}
        path={page.path}
        jsonLd={[breadcrumbLd(crumbs), ...(page.faq ? [faqLd(page.faq)] : [])]}
      />
      <PageHero crumbs={crumbs} eyebrow="Hotels" title={page.title} lede={page.short} />
      <section className="bg-stone py-20 lg:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <Img src={page.image} alt={page.title} className="aspect-[4/3] w-full" sizes="(min-width: 1024px) 55vw, 100vw" />
            <p className="mt-8 text-[16px] leading-[1.85] text-ink/80">{page.body}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-[11px] uppercase tracking-eyebrow text-ink/50">Where</p>
            <p className="mt-2 font-display text-2xl">{page.where}</p>
            <p className="mt-6 text-[11px] uppercase tracking-eyebrow text-ink/50">Who it suits</p>
            <p className="mt-2 text-[15px] text-ink/75">{page.who}</p>
            <Link to="/plan-your-safari/" className="btn-solid mt-10 inline-flex">
              Plan stays with safaris
            </Link>
            <ul className="mt-10 space-y-3">
              {parks.map((p) => (
                <li key={p.slug}>
                  <Link to={`${p.path}/hotels/`} className="link-line text-ink">
                    Hotels near {p.name} <Icon name="arrowR" className="h-3.5 w-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
      {page.faq?.length > 0 && <FaqSection title={`${page.title} FAQ`} faqs={page.faq} />}
      <Ready />
    </>
  )
}
