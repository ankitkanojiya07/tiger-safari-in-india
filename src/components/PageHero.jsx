import Breadcrumbs from './Breadcrumbs'

export default function PageHero({ crumbs, eyebrow, title, lede }) {
  return (
    <section className="bg-bark pb-16 pt-32 text-stone lg:pb-20 lg:pt-40">
      <div className="wrap">
        {crumbs && <Breadcrumbs items={crumbs} light />}
        {eyebrow && <p className="mt-8 text-[11px] uppercase tracking-eyebrow text-mist">{eyebrow}</p>}
        <h1 className="mt-4 max-w-4xl font-display text-4xl leading-[1.05] sm:text-6xl lg:text-7xl">{title}</h1>
        {lede && <p className="mt-6 max-w-2xl text-[15px] leading-[1.8] text-stone/80 sm:text-[17px]">{lede}</p>}
      </div>
    </section>
  )
}
