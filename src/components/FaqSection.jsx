import Reveal from './Reveal'

export default function FaqSection({ title = 'Frequently asked questions', faqs, id = 'faq' }) {
  if (!faqs?.length) return null
  return (
    <section id={id} className="scroll-mt-24 bg-sand py-24 lg:py-28">
      <div className="wrap max-w-3xl">
        <Reveal>
          <p className="eyebrow">FAQ</p>
          <h2 className="h-section mt-5">{title}</h2>
        </Reveal>
        <dl className="mt-12 divide-y divide-ink/15 border-t border-ink/15">
          {faqs.map((f) => (
            <div key={f.q} className="py-6">
              <dt className="font-display text-2xl text-ink">{f.q}</dt>
              <dd className="mt-3 text-[15px] leading-relaxed text-ink/70">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
