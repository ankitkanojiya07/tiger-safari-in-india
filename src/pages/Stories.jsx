import { Link, Navigate, useParams } from 'react-router-dom'
import { pageMeta, stories, getStory, publishedGuides } from '../data/site'
import Seo, { breadcrumbLd } from '../components/Seo'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import AuthorByline from '../components/AuthorByline'
import Ready from '../components/Ready'
import { Icon } from '../components/Icons'

export function StoriesHub() {
  const meta = pageMeta.guides
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
  ]
  const live = publishedGuides()
  const upcoming = stories.filter((s) => s.pillar === 'guides' && !s.published)

  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} jsonLd={[breadcrumbLd(crumbs)]} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Guides"
        title="Tiger safari planning guides"
        lede="Best time to visit, how to book, park comparisons and packing — written for travellers choosing between India’s tiger reserves."
      />
      <section className="bg-stone py-20 lg:py-28">
        <div className="wrap grid gap-8 md:grid-cols-2">
          {live.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.05}>
              <Link to={`${s.path}/`} className="group block border-t border-ink/15 pt-6">
                <p className="text-[10px] uppercase tracking-eyebrow text-ink/50">{s.category}</p>
                <h2 className="mt-3 font-display text-3xl group-hover:text-ochre">{s.title}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{s.excerpt}</p>
                <span className="link-line mt-5">
                  Read <Icon name="arrowR" className="h-3.5 w-3.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        {upcoming.length > 0 && (
          <div className="wrap mt-20">
            <h2 className="font-display text-3xl">Coming next</h2>
            <ul className="mt-6 space-y-3 text-[15px] text-ink/60">
              {upcoming.map((s) => (
                <li key={s.slug}>{s.title}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
      <Ready />
    </>
  )
}

export function StoryDetail() {
  const { slug } = useParams()
  const story = getStory(slug)
  if (!story || !story.published || story.pillar !== 'guides') {
    return <Navigate to="/guides/" replace />
  }

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides/' },
    { name: story.title, path: story.path },
  ]

  return (
    <>
      <Seo
        title={`${story.title} | Tiger Safaris in India`}
        description={story.description}
        path={story.path}
        type="article"
        jsonLd={[breadcrumbLd(crumbs)]}
      />
      <PageHero crumbs={crumbs} eyebrow={story.category} title={story.title} lede={story.excerpt} />
      <article className="bg-stone py-20 lg:py-28">
        <div className="wrap max-w-3xl space-y-6">
          {story.body.map((p) => (
            <p key={p.slice(0, 40)} className="text-[16px] leading-[1.85] text-ink/80">
              {p}
            </p>
          ))}
          <AuthorByline updated={story.updated} />
          <Link to="/plan-your-safari/" className="btn-solid mt-10 inline-flex">
            Plan My Safari
          </Link>
        </div>
      </article>
      <Ready />
    </>
  )
}
