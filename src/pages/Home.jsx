import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Intro from '../components/Intro'
import Destinations from '../components/Destinations'
import Stats from '../components/Stats'
import Experiences from '../components/Experiences'
import Why from '../components/Why'
import Impact from '../components/Impact'
import Ready from '../components/Ready'
import Newsletter from '../components/Newsletter'
import FaqSection from '../components/FaqSection'
import Seo, { organizationLd, websiteLd, faqLd } from '../components/Seo'
import Reveal from '../components/Reveal'
import Img from '../components/Img'
import { Icon } from '../components/Icons'
import {
  pageMeta,
  whyUsPoints,
  howItWorks,
  featuredJourneys,
  latestStories,
  siteFaq,
} from '../data/site'

export default function Home() {
  const meta = pageMeta.home
  const journeys = featuredJourneys()
  const stories = latestStories()

  return (
    <>
      <Seo title={meta.title} description={meta.description} path="/" jsonLd={[organizationLd(), websiteLd(), faqLd(siteFaq)]} />
      <Hero />
      <Intro />
      <Destinations />
      <Stats />

      {/* Why travellers choose us */}
      <section id="why" className="scroll-mt-20 bg-stone py-24 lg:py-28">
        <div className="wrap">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Why us</p>
            <h2 className="h-section mt-5">Why travellers choose us</h2>
          </Reveal>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {whyUsPoints.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <h3 className="font-display text-2xl">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{p.text}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/about/" className="link-line text-ochre">
              Learn more about how we work <Icon name="arrowR" className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-sand py-24 lg:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-2 lg:items-end">
          <Reveal>
            <p className="eyebrow">Process</p>
            <h2 className="h-section mt-5">How it works</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <ol className="space-y-5">
              {howItWorks.map((step, i) => (
                <li key={step} className="grid grid-cols-[3rem_1fr] gap-3 border-b border-ink/10 pb-5">
                  <span className="font-display text-2xl text-ochre">{String(i + 1).padStart(2, '0')}</span>
                  <p className="text-[15px] leading-relaxed text-ink/80">{step}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* When to go */}
      <section className="bg-stone py-20 lg:py-24">
        <div className="wrap max-w-3xl">
          <Reveal>
            <p className="eyebrow">Season</p>
            <h2 className="h-section mt-5">When to go</h2>
            <p className="lede mt-6">
              Most Indian tiger reserves open from October to June and close or restrict access during the monsoon. October to March is cooler and comfortable; April to June is hot but is traditionally when tigers visit waterholes more often.
            </p>
            <Link to="/guides/best-time-for-tiger-safari-in-india/" className="link-line mt-8 text-ochre">
              Read the full best-time guide <Icon name="arrowR" className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Featured journeys */}
      <section id="journeys" className="scroll-mt-20 bg-sand py-24 lg:py-28">
        <div className="wrap">
          <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Tours</p>
              <h2 className="h-section mt-5">Featured tours</h2>
            </div>
            <Link to="/tours/" className="link-line text-ochre">
              All tours <Icon name="arrowR" className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {journeys.map((j, i) => (
              <Reveal key={j.slug} delay={i * 0.06}>
                <Link to={`${j.path}/`} className="group block">
                  <Img src={j.image} alt={j.title} className="aspect-[4/3] w-full" label={j.title} sizes="(min-width: 768px) 30vw, 100vw" />
                  <p className="mt-4 text-[10px] uppercase tracking-eyebrow text-ink/50">{j.duration}</p>
                  <h3 className="mt-2 font-display text-2xl group-hover:text-ochre">{j.title}</h3>
                  <p className="mt-2 text-[14px] text-ink/65">{j.bestFor}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Experiences />
      <Why />
      <Impact />

      {/* Stories */}
      <section id="stories" className="scroll-mt-20 bg-stone py-24 lg:py-28">
        <div className="wrap">
          <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Guides</p>
              <h2 className="h-section mt-5">Planning guides</h2>
            </div>
            <Link to="/guides/" className="link-line text-ochre">
              All guides <Icon name="arrowR" className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {stories.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.05}>
                <Link to={`${s.path}/`} className="group block border-t border-ink/15 pt-6">
                  <p className="text-[10px] uppercase tracking-eyebrow text-ink/50">{s.category}</p>
                  <h3 className="mt-3 font-display text-2xl group-hover:text-ochre">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{s.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FaqSection title="Tiger safari FAQ" faqs={siteFaq} />
      <Ready />
      <Newsletter />
    </>
  )
}
