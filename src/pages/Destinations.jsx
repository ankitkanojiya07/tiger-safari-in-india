import { Link } from 'react-router-dom'
import { parks, pageMeta } from '../data/site'
import Seo, { breadcrumbLd } from '../components/Seo'
import PageHero from '../components/PageHero'
import Img from '../components/Img'
import Reveal from '../components/Reveal'
import Ready from '../components/Ready'
import { Icon } from '../components/Icons'

export default function Destinations() {
  const meta = pageMeta.destinations
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Tiger reserves', path: '/tiger-reserves/' },
  ]

  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} jsonLd={[breadcrumbLd(crumbs)]} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Tiger reserves"
        title="Five parks, five different kinds of wild"
        lede="Each tiger reserve offers something different — from Ranthambore’s fort lakes to Satpura’s walking trails. Compare landscapes, seasons and safari styles, then plan the mix that fits your trip."
      />
      <section className="bg-stone py-20 lg:py-28">
        <div className="wrap grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {parks.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link to={`${p.path}/`} className="group block">
                <Img
                  src={p.image}
                  alt={`${p.name} tiger safari`}
                  className="aspect-[4/5] w-full"
                  imgClassName="transition-transform duration-700 group-hover:scale-105"
                  label={p.name}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                />
                <p className="mt-5 text-[10px] uppercase tracking-eyebrow text-ink/50">{p.state}</p>
                <h2 className="mt-2 font-display text-3xl group-hover:text-ochre">{p.name}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{p.hook}</p>
                <span className="link-line mt-5">
                  Explore {p.name} <Icon name="arrowR" className="h-3.5 w-3.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <Ready />
    </>
  )
}
