import { useRef } from 'react'
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { media } from '../data/media'
import { useSite } from '../App'
import Img from './Img'
import Reveal from './Reveal'

export default function Journeys() {
  const { openEnquiry } = useSite()
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="journeys" ref={ref} className="relative scroll-mt-20 overflow-hidden text-white">
      <m.div className="absolute inset-[-10%_0]" style={reduce ? undefined : { y }}>
        <Img src={media.journeys} alt="A tiger walking down a forest track" className="h-full w-full" label="Tiger on the forest track" />
      </m.div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />
      <div className="wrap relative py-32 lg:py-44">
        <Reveal className="max-w-xl">
          <p className="text-[11px] uppercase tracking-eyebrow text-white/80">Our custom-designed journeys</p>
          <h2 className="h-section mt-5">Tailor-made itineraries for every traveller</h2>
          <p className="mt-7 text-[15px] leading-[1.85] text-white/85 sm:text-base">
            Combine Ranthambhore with the forts of Rajasthan, pair Panna with the temples of Khajuraho, or spend ten
            slow days moving between Satpura’s hills and Corbett’s grasslands. Tell us how you like to travel and we
            will shape the route, the lodges and the pace around you.
          </p>
          <button onClick={() => openEnquiry()} className="btn-ghost-light mt-10">
            Start planning your journey
          </button>
        </Reveal>
      </div>
    </section>
  )
}
