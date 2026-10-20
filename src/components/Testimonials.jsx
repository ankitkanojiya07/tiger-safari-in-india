import { testimonials } from '../data/site'
import { Icon } from './Icons'
import Reveal from './Reveal'

// Cards are placeholders. Replace with real, attributable guest reviews before launch.
export default function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-20 border-t border-line bg-stone py-24 lg:py-32">
      <div className="wrap">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Guest experiences</p>
          <h2 className="h-section mt-5">Words from fellow travellers</h2>
          <p className="lede mx-auto mt-6 max-w-xl">
            Real reviews from your guests go here. Link to your Google or TripAdvisor profile so readers can see more.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.1} className="flex flex-col border border-line bg-white/50 p-8 lg:p-10">
              <Icon name="quote" className="h-8 w-8 text-ochre" />
              <h3 className="mt-6 font-display text-2xl">{t.title}</h3>
              <p className="mt-4 flex-1 text-[15px] leading-[1.8] text-ink/70">{t.quote}</p>
              <div className="mt-8 border-t border-line pt-5">
                <p className="text-[12px] uppercase tracking-[0.2em]">{t.name}</p>
                <p className="mt-1 text-sm text-ink/55">{t.place}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
