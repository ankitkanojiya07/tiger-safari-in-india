import { Link, Navigate, useParams } from 'react-router-dom'
import { experiencePages, getExperience, pageMeta } from '../data/site'
import Seo, { breadcrumbLd, faqLd } from '../components/Seo'
import PageHero from '../components/PageHero'
import Img from '../components/Img'
import Reveal from '../components/Reveal'
import FaqSection from '../components/FaqSection'
import Ready from '../components/Ready'
import { Icon } from '../components/Icons'

export function ExperiencesHub() {
  const meta = pageMeta.experiences
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Safaris', path: '/safaris/' },
  ]

  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} jsonLd={[breadcrumbLd(crumbs)]} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Safaris"
        title="Tiger Safari Types in India"
        lede="A tiger safari can be many things. Pick the way that suits you: fast jeep drives, slow walks with a naturalist, boat rides along a river or a photography-led itinerary."
      />
      <section className="bg-stone py-20 lg:py-28">
        <div className="wrap grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {experiencePages.map((e, i) => (
            <Reveal key={e.slug} delay={i * 0.05}>
              <Link to={`${e.path}/`} className="group block">
                <Img src={e.image} alt={e.title} className="aspect-[4/3] w-full" label={e.title} sizes="(min-width: 1024px) 30vw, 50vw" />
                <h2 className="mt-5 font-display text-2xl group-hover:text-ochre">{e.title}</h2>
                <p className="mt-2 text-[14px] text-ink/55">{e.where}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{e.short}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <Ready />
    </>
  )
}

export function ExperienceDetail() {
  const { slug } = useParams()
  const exp = getExperience(slug)
  if (!exp) return <Navigate to="/safaris/" replace />

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Safaris', path: '/safaris/' },
    { name: exp.title, path: exp.path },
  ]

  return (
    <>
      <Seo
        title={exp.metaTitle}
        description={exp.description}
        path={exp.path}
        jsonLd={[breadcrumbLd(crumbs), ...(exp.faq ? [faqLd(exp.faq)] : [])]}
      />
      <PageHero crumbs={crumbs} eyebrow={exp.where} title={exp.title} lede={exp.short} />
      <section className="bg-stone py-20 lg:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-2">
          <Reveal>
            <Img src={exp.image} alt={exp.title} className="aspect-[4/3] w-full" label={exp.title} sizes="(min-width: 1024px) 45vw, 100vw" />
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="h-section">What it is</h2>
            <p className="lede mt-6">{exp.body}</p>
            <dl className="mt-10 space-y-5 border-t border-ink/15 pt-8">
              <div>
                <dt className="text-[11px] uppercase tracking-eyebrow text-ink/50">Where</dt>
                <dd className="mt-2 text-[15px]">{exp.where}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-eyebrow text-ink/50">Who it suits</dt>
                <dd className="mt-2 text-[15px]">{exp.who}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-eyebrow text-ink/50">What to carry</dt>
                <dd className="mt-2 text-[15px]">{exp.carry.join(' · ')}</dd>
              </div>
            </dl>
            <Link to="/plan-your-safari/" className="btn-solid mt-10">
              Plan My Safari <Icon name="arrowR" className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
        </div>
      </section>
      {exp.faq && <FaqSection faqs={exp.faq} />}
      <Ready />
    </>
  )
}
