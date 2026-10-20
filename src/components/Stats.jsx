import { stats } from '../data/site'
import { useSite } from '../App'
import { Icon } from './Icons'
import Reveal from './Reveal'

export default function Stats() {
  const { openEnquiry } = useSite()
  return (
    <section className="border-y border-line bg-stone py-20 lg:py-24">
      <div className="wrap">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {stats.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} className="flex flex-col items-center text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-ochre/40 text-ochre">
                <Icon name={s.icon} className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-display text-2xl">{s.title}</h3>
              <p className="mt-2 max-w-[15rem] text-sm leading-relaxed text-ink/65">{s.text}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-14 flex justify-center">
          <button onClick={() => openEnquiry()} className="btn-solid">
            Plan your safari
          </button>
        </div>
      </div>
    </section>
  )
}
