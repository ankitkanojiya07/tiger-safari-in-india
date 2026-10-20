import { brand } from '../data/site'
import { media } from '../data/media'
import Img from './Img'
import Reveal from './Reveal'

export default function Intro() {
  return (
    <section id="intro" className="scroll-mt-20 bg-stone py-24 lg:py-36">
      <div className="wrap grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-24">
        <Reveal>
          <p className="eyebrow">We are {brand.name}</p>
          <h2 className="h-section mt-5">Discover India’s wild and storied tiger forests</h2>
          <div className="mt-8 space-y-5">
            <p className="lede">
              We are a safari company built around five tiger reserves in north and central India. We know
              these forests by season, by zone and by the individual tigers that hold them, and we plan every journey
              around the best of what each one has to offer.
            </p>
            <p className="lede">
              Days start before sunrise in an open gypsy and end by a fire at a small forest lodge. In between, there
              are forts, river gorges, village kitchens and the quiet that comes from being far from the city.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.15} className="relative">
          <Img src={media.intro} alt="A guest scanning the forest from the back of a safari vehicle" className="aspect-[4/5] w-full" label="Forest drive" sizes="(min-width: 1024px) 45vw, 100vw" />
          <div className="absolute -bottom-6 -left-6 hidden h-40 w-40 border border-ochre/50 lg:block" aria-hidden="true" />
        </Reveal>
      </div>
    </section>
  )
}
