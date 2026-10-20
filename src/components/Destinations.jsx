import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { brand, parks } from '../data/site'
import Img from './Img'
import Reveal from './Reveal'
import { Icon } from './Icons'

export default function Destinations() {
  const track = useRef(null)
  const [index, setIndex] = useState(0)

  // Track which card is nearest the left edge, for the counter.
  useEffect(() => {
    const el = track.current
    if (!el) return
    const onScroll = () => {
      const card = el.firstElementChild
      if (!card) return
      const step = card.getBoundingClientRect().width + 20
      setIndex(Math.min(parks.length - 1, Math.round(el.scrollLeft / step)))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const scrollBy = (dir) => {
    const el = track.current
    const card = el?.firstElementChild
    if (!el || !card) return
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 20), behavior: 'smooth' })
  }

  return (
    <section id="destinations" className="scroll-mt-20 overflow-hidden bg-sand py-24 lg:py-32">
      <div className="wrap">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">#{brand.hashtag}</p>
          <h2 className="h-section mt-5">Five parks, five different kinds of wild</h2>
          <p className="lede mx-auto mt-6 max-w-2xl">
            Each tiger reserve offers something different. Ranthambore puts tigers against a backdrop of ruins and lakes.
            Jim Corbett offers river valleys and elephants. Panna tells one of conservation&apos;s great recovery stories.
            Satpura lets you explore on foot and by canoe. Sariska gives you Aravalli wilderness within a few hours of Delhi.
          </p>
        </Reveal>

        <div className="mt-14 flex items-center justify-between">
          <p className="font-display text-xl tabular-nums text-ink/70">
            <span className="text-ink">{String(index + 1).padStart(2, '0')}</span>
            <span className="mx-2">/</span>
            {String(parks.length).padStart(2, '0')}
          </p>
          <div className="flex gap-2">
            <button onClick={() => scrollBy(-1)} aria-label="Previous destination" className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/30 transition-colors hover:bg-ink hover:text-stone">
              <Icon name="arrowL" className="h-4 w-4" />
            </button>
            <button onClick={() => scrollBy(1)} aria-label="Next destination" className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/30 transition-colors hover:bg-ink hover:text-stone">
              <Icon name="arrowR" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={track}
        className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 sm:px-8 lg:px-[max(3rem,calc((100vw-1320px)/2+3rem))]"
      >
        {parks.map((p, i) => (
          <Link
            key={p.slug}
            to={`${p.path}/`}
            className="group relative block w-[82vw] shrink-0 snap-start sm:w-[420px]"
          >
            <Img
              src={p.image}
              alt={`${p.name} tiger safari, ${p.state}`}
              className="aspect-[4/5] w-full"
              imgClassName="transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]"
              label={p.state}
              sizes="(min-width: 640px) 420px, 82vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-white">
              <p className="text-[10px] uppercase tracking-eyebrow text-white/70">
                {String(i + 1).padStart(2, '0')} · {p.state}
              </p>
              <h3 className="mt-2 font-display text-4xl">{p.name}</h3>
              <p className="mt-3 max-h-40 overflow-hidden text-sm leading-relaxed text-white/85 transition-all duration-500 lg:max-h-0 lg:opacity-0 lg:group-hover:max-h-40 lg:group-hover:opacity-100 lg:group-focus-visible:max-h-40 lg:group-focus-visible:opacity-100">
                {p.short}
              </p>
              <span className="link-line mt-5 text-white">
                Discover {p.name} <Icon name="arrowR" className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        ))}
        <div className="w-1 shrink-0" aria-hidden="true" />
      </div>
    </section>
  )
}
