import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { why } from '../data/site'
import { useSite } from '../App'
import Img from './Img'
import Reveal from './Reveal'
import { Icon } from './Icons'

export default function Why() {
  const { openEnquiry } = useSite()
  const [active, setActive] = useState(0)
  const item = why[active]

  return (
    <section id="why" className="scroll-mt-20 bg-stone py-24 lg:py-32">
      <div className="wrap">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Travel with purpose</p>
          <h2 className="h-section mt-5">Why travel with us?</h2>
          <p className="lede mx-auto mt-6 max-w-2xl">
            Small lodges, private vehicles and naturalists who know each territory mean fewer crowds and more time with
            the forest. Everything else, from permits to trains, is taken care of.
          </p>
        </Reveal>

        <div role="tablist" aria-label="Why travel with us" className="no-scrollbar mt-14 flex gap-8 overflow-x-auto border-b border-line sm:justify-center">
          {why.map((w, i) => (
            <button
              key={w.tab}
              role="tab"
              aria-selected={i === active}
              id={`why-tab-${i}`}
              aria-controls="why-panel"
              onClick={() => setActive(i)}
              className={`relative shrink-0 pb-4 text-[11px] uppercase tracking-[0.22em] transition-colors ${
                i === active ? 'text-ink' : 'text-ink/45 hover:text-ink/80'
              }`}
            >
              {w.tab}
              <span
                className={`absolute inset-x-0 -bottom-px h-[2px] origin-left bg-ochre transition-transform duration-500 ${
                  i === active ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </button>
          ))}
        </div>

        <div id="why-panel" role="tabpanel" aria-labelledby={`why-tab-${active}`} className="mt-14">
          <AnimatePresence mode="wait">
            <m.div
              key={item.tab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-20"
            >
              <Img src={item.image} alt={item.title} className="aspect-[16/11] w-full" label={item.tab} sizes="(min-width: 1024px) 55vw, 100vw" />
              <div>
                <p className="eyebrow">{item.tab}</p>
                <h3 className="mt-4 font-display text-4xl leading-tight lg:text-5xl">{item.title}</h3>
                <p className="lede mt-6">{item.text}</p>
                <button onClick={() => openEnquiry()} className="link-line mt-9 text-ink">
                  Talk to a safari specialist <Icon name="arrowR" className="h-3.5 w-3.5" />
                </button>
              </div>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
