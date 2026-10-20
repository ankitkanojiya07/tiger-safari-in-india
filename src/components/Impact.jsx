import { media } from '../data/media'
import { useSite } from '../App'
import Img from './Img'
import Reveal from './Reveal'
import { Icon } from './Icons'

export default function Impact() {
  const { openEnquiry } = useSite()
  return (
    <section id="impact" className="scroll-mt-20 bg-stone py-24 lg:py-36">
      <div className="wrap grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <Reveal className="relative pb-16 pr-10 sm:pb-24 sm:pr-24">
          <Img src={media.impactA} alt="A forest path through sal trees" className="aspect-[4/5] w-full" label="Forest path" sizes="(min-width: 1024px) 38vw, 85vw" />
          <Img
            src={media.impactB}
            alt="Spotted deer in the forest"
            className="absolute bottom-0 right-0 aspect-square w-1/2 border-[10px] border-stone"
            label="Spotted deer"
            sizes="(min-width: 1024px) 20vw, 45vw"
          />
        </Reveal>
        <Reveal delay={0.12}>
          <p className="eyebrow">Our impact ethos</p>
          <h2 className="h-section mt-5">Journeys that leave the forest stronger</h2>
          <p className="lede mt-7">
            Tiger reserves only survive when the people around them benefit from them. We hire naturalists, drivers and
            lodge teams from villages on the forest edge, buy from local kitchens and craftspeople, and direct part of
            every booking to conservation work.
          </p>
          <ul className="mt-9 grid gap-6 sm:grid-cols-3">
            {[
              ['Protect', 'Support for patrols and dry-season water holes'],
              ['Educate', 'Nature clubs in schools near the reserves'],
              ['Empower', 'Local hiring and village-run experiences'],
            ].map(([t, d]) => (
              <li key={t} className="border-t border-ochre/50 pt-4">
                <p className="font-display text-2xl">{t}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/65">{d}</p>
              </li>
            ))}
          </ul>
          <button onClick={() => openEnquiry()} className="link-line mt-10 text-ink">
            Travel with impact <Icon name="arrowR" className="h-3.5 w-3.5" />
          </button>
        </Reveal>
      </div>
    </section>
  )
}
