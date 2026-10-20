import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, m } from 'framer-motion'
import { experiences } from '../data/site'
import Img from './Img'
import Reveal from './Reveal'
import { Icon } from './Icons'

export default function Experiences() {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const n = experiences.length
  const go = (d) => {
    setDir(d)
    setI((v) => (v + d + n) % n)
  }
  const cur = experiences[i]
  const next = experiences[(i + 1) % n]

  return (
    <section id="experiences" className="scroll-mt-20 bg-bark py-24 text-stone lg:py-32">
      <div className="wrap grid gap-14 lg:grid-cols-[0.85fr_1.4fr] lg:gap-20">
        <Reveal className="flex flex-col justify-between">
          <div>
            <p className="eyebrow">Our experiences</p>
            <h2 className="h-section mt-5">Experience real, raw nature</h2>
            <p className="mt-7 text-[15px] leading-[1.85] text-stone/75 sm:text-base">
              A safari here is more than a game drive. Walk the forest with a tracker, paddle a backwater at dawn,
              watch elephants cross a river, then sit out under a sky with no city light in it.
            </p>
            <Link to="/safaris/" className="link-line mt-9 text-mist">
              Explore safari types <Icon name="arrowR" className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-6">
            <p className="font-display text-xl tabular-nums text-stone/60">
              <span className="text-stone">{String(i + 1).padStart(2, '0')}</span>
              <span className="mx-2">/</span>
              {String(n).padStart(2, '0')}
            </p>
            <div className="relative h-px flex-1 bg-stone/20">
              <m.span
                className="absolute inset-y-0 left-0 bg-mist"
                animate={{ width: `${((i + 1) / n) * 100}%` }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <div className="flex gap-2">
              <button onClick={() => go(-1)} aria-label="Previous experience" className="flex h-12 w-12 items-center justify-center rounded-full border border-stone/30 transition-colors hover:bg-stone hover:text-ink">
                <Icon name="arrowL" className="h-4 w-4" />
              </button>
              <button onClick={() => go(1)} aria-label="Next experience" className="flex h-12 w-12 items-center justify-center rounded-full border border-stone/30 transition-colors hover:bg-stone hover:text-ink">
                <Icon name="arrowR" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Reveal>

        <div className="grid min-w-0 gap-5 sm:grid-cols-[1fr_0.42fr]">
          <div className="relative min-w-0 overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false} custom={dir}>
              <m.article
                key={cur.title}
                custom={dir}
                initial={{ opacity: 0, x: dir * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -60 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Img src={cur.image} alt={cur.title} className="aspect-[4/3] w-full sm:aspect-[5/4]" label={cur.title} sizes="(min-width: 1024px) 42vw, (min-width: 640px) 60vw, 100vw" />
                <h3 className="mt-7 font-display text-3xl sm:text-4xl">
                  {cur.path ? (
                    <Link to={`${cur.path}/`} className="hover:text-mist">
                      {cur.title}
                    </Link>
                  ) : (
                    cur.title
                  )}
                </h3>
                <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-stone/75">{cur.text}</p>
                <p className="mt-5 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-mist">
                  <Icon name="pin" className="h-4 w-4" /> {cur.where}
                </p>
              </m.article>
            </AnimatePresence>
          </div>
          <button onClick={() => go(1)} className="group relative hidden self-start text-left sm:block" aria-label={`Next: ${next.title}`}>
            <Img src={next.image} alt="" className="aspect-[3/4] w-full opacity-50 transition-opacity duration-500 group-hover:opacity-80" label="Next" sizes="(min-width: 1024px) 18vw, 30vw" />
            <p className="mt-4 text-[10px] uppercase tracking-eyebrow text-stone/50">Next</p>
            <p className="mt-1 font-display text-xl text-stone/80">{next.title}</p>
          </button>
        </div>
      </div>
    </section>
  )
}
