import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, m } from 'framer-motion'
import { brand, nav, parks, experiencePages, journeys, publishedGuides } from '../data/site'
import { useSite } from '../App'
import { Icon } from './Icons'
import Logo from './Logo'
import Img from './Img'

export default function Header() {
  const { openEnquiry } = useSite()
  const [scrolled, setScrolled] = useState(false)
  const [mega, setMega] = useState(null)
  const [drawer, setDrawer] = useState(false)
  const [hoverPark, setHoverPark] = useState(parks[0].slug)
  const location = useLocation()
  const wa = `https://wa.me/${brand.whatsapp}`

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMega(null)
    setDrawer(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : ''
  }, [drawer])

  const solid = scrolled || !!mega
  const tone = solid ? 'text-ink' : 'text-white'
  const active = parks.find((p) => p.slug === hoverPark)
  const journeyList = journeys.filter((j) => j.slug !== 'custom-private-journey')
  const guideList = publishedGuides().slice(0, 5)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? 'bg-stone/95 shadow-[0_1px_0_rgba(18,52,56,0.1)] backdrop-blur' : 'bg-gradient-to-b from-black/45 to-transparent'
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      onMouseLeave={() => setMega(null)}
    >
      <div className={`wrap flex items-center justify-between gap-6 transition-all duration-500 ${solid ? 'h-[72px]' : 'h-[88px]'}`}>
        <Link to="/" className={tone} aria-label={`${brand.full} home`}>
          <Logo />
        </Link>

        <nav className={`hidden items-center gap-6 xl:flex ${tone}`} aria-label="Main">
          {nav.map((item) =>
            item.mega ? (
              <button
                key={item.label}
                onMouseEnter={() => setMega(item.mega)}
                onFocus={() => setMega(item.mega)}
                onClick={() => setMega((m) => (m === item.mega ? null : item.mega))}
                aria-expanded={mega === item.mega}
                className="flex items-center gap-1.5 py-2 text-[11.5px] uppercase tracking-[0.2em] opacity-90 hover:opacity-100"
              >
                {item.label}
                <Icon name="chevronD" className={`h-3.5 w-3.5 transition-transform ${mega === item.mega ? 'rotate-180' : ''}`} />
              </button>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                onMouseEnter={() => setMega(null)}
                className="py-2 text-[11.5px] uppercase tracking-[0.2em] opacity-90 hover:opacity-100"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className={`flex items-center gap-3 ${tone}`}>
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="hidden p-1 opacity-90 hover:opacity-100 sm:inline-flex"
          >
            <Icon name="whatsapp" className="h-5 w-5" />
          </a>
          <Link to="/plan-your-safari/" className={`hidden sm:inline-flex ${solid ? 'btn-solid' : 'btn-ghost-light'} !px-5 !py-3`}>
            Plan My Safari
          </Link>
          <button onClick={() => setDrawer(true)} className="p-1 xl:hidden" aria-label="Open menu">
            <Icon name="menu" className="h-7 w-7" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mega === 'parks' && (
          <MegaPanel>
            <div className="wrap grid grid-cols-[280px_1fr] gap-12 py-10">
              <div>
                <p className="eyebrow mb-5">Tiger reserves</p>
                <ul className="space-y-1">
                  {parks.map((p) => (
                    <li key={p.slug}>
                      <Link
                        to={`${p.path}/`}
                        onMouseEnter={() => setHoverPark(p.slug)}
                        onFocus={() => setHoverPark(p.slug)}
                        className={`flex flex-col border-b border-line py-3 transition-colors ${
                          hoverPark === p.slug ? 'text-ochre' : 'text-ink'
                        }`}
                      >
                        <span className="font-display text-2xl">{p.name}</span>
                        <span className="mt-1 font-sans text-[12px] normal-case tracking-normal text-ink/55">{p.hook}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link to="/tiger-reserves/" className="link-line mt-6 text-ochre">
                  Compare all parks <Icon name="arrowR" className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {parks.map((p) => (
                  <Link
                    key={p.slug}
                    to={`${p.path}/`}
                    onMouseEnter={() => setHoverPark(p.slug)}
                    className={`group relative block overflow-hidden transition-opacity duration-300 ${hoverPark === p.slug ? 'opacity-100' : 'opacity-60'}`}
                  >
                    <Img
                      src={p.image}
                      alt={`${p.name} tiger safari`}
                      className="aspect-[3/4] w-full"
                      sizes="200px"
                      imgClassName="transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-3 pb-3.5 pt-14 font-display text-lg leading-tight text-white sm:text-xl">
                      {p.name}
                    </span>
                  </Link>
                ))}
                {active && <p className="col-span-5 mt-3 max-w-2xl text-sm leading-relaxed text-ink/70">{active.short}</p>}
              </div>
            </div>
          </MegaPanel>
        )}

        {mega === 'safaris' && (
          <MegaPanel>
            <div className="wrap py-10">
              <p className="eyebrow mb-6">Safaris</p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {experiencePages.map((e) => (
                  <Link key={e.slug} to={`${e.path}/`} className="group flex gap-4 border-b border-line pb-4">
                    <Img src={e.image} alt="" className="h-16 w-16 shrink-0" sizes="64px" />
                    <span>
                      <span className="block font-display text-xl group-hover:text-ochre">{e.title}</span>
                      <span className="mt-1 block text-[13px] text-ink/60">{e.where}</span>
                    </span>
                  </Link>
                ))}
              </div>
              <Link to="/safaris/" className="link-line mt-8 text-ochre">
                All safari types <Icon name="arrowR" className="h-3.5 w-3.5" />
              </Link>
            </div>
          </MegaPanel>
        )}

        {mega === 'tours' && (
          <MegaPanel>
            <div className="wrap py-10">
              <p className="eyebrow mb-6">Tours</p>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {journeyList.map((j) => (
                  <li key={j.slug}>
                    <Link to={`${j.path}/`} className="group block border-b border-line py-3">
                      <span className="font-display text-2xl group-hover:text-ochre">{j.title}</span>
                      <span className="mt-1 block text-[13px] text-ink/60">
                        {j.duration} · {j.bestFor}
                      </span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/plan-your-safari/" className="group block border-b border-line py-3">
                    <span className="font-display text-2xl group-hover:text-ochre">Custom Private Tour</span>
                    <span className="mt-1 block text-[13px] text-ink/60">Built around your dates</span>
                  </Link>
                </li>
              </ul>
            </div>
          </MegaPanel>
        )}

        {mega === 'guides' && (
          <MegaPanel>
            <div className="wrap py-10">
              <p className="eyebrow mb-6">Guides</p>
              <ul className="grid gap-4 sm:grid-cols-2">
                {guideList.map((s) => (
                  <li key={s.slug}>
                    <Link to={`${s.path}/`} className="group block border-b border-line py-3">
                      <span className="text-[10px] uppercase tracking-eyebrow text-ink/50">{s.category}</span>
                      <span className="mt-1 block font-display text-xl group-hover:text-ochre">{s.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link to="/guides/" className="link-line mt-8 text-ochre">
                All guides <Icon name="arrowR" className="h-3.5 w-3.5" />
              </Link>
              <Link to="/faq/" className="link-line ml-8 mt-8 text-ink">
                FAQs <Icon name="arrowR" className="h-3.5 w-3.5" />
              </Link>
            </div>
          </MegaPanel>
        )}
      </AnimatePresence>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {drawer && (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] overflow-y-auto bg-bark text-stone xl:hidden"
                style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
              >
                <div className="wrap flex h-[88px] items-center justify-between">
                  <Logo />
                  <button onClick={() => setDrawer(false)} aria-label="Close menu" className="p-1">
                    <Icon name="close" className="h-7 w-7" />
                  </button>
                </div>
                <div className="wrap pb-16">
                  <p className="eyebrow mb-4 mt-4">Parks</p>
                  <ul>
                    {parks.map((p) => (
                      <li key={p.slug}>
                        <Link to={`${p.path}/`} className="flex flex-col border-b border-white/10 py-4">
                          <span className="font-display text-3xl">{p.name}</span>
                          <span className="mt-1 text-[12px] text-stone/55">{p.hook}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <p className="eyebrow mb-4 mt-10">Safaris</p>
                  <ul className="space-y-3">
                    {experiencePages.map((e) => (
                      <li key={e.slug}>
                        <Link to={`${e.path}/`} className="text-[12px] uppercase tracking-[0.18em] text-stone/85">
                          {e.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <p className="eyebrow mb-4 mt-10">Tours</p>
                  <ul className="space-y-3">
                    {journeyList.map((j) => (
                      <li key={j.slug}>
                        <Link to={`${j.path}/`} className="text-[12px] uppercase tracking-[0.18em] text-stone/85">
                          {j.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-10 space-y-5">
                    <li>
                      <Link to="/hotels/" className="text-[12px] uppercase tracking-[0.22em] text-stone/85">
                        Hotels
                      </Link>
                    </li>
                    <li>
                      <Link to="/guides/" className="text-[12px] uppercase tracking-[0.22em] text-stone/85">
                        Guides
                      </Link>
                    </li>
                    <li>
                      <Link to="/about/" className="text-[12px] uppercase tracking-[0.22em] text-stone/85">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link to="/impact/" className="text-[12px] uppercase tracking-[0.22em] text-stone/85">
                        Impact
                      </Link>
                    </li>
                    <li>
                      <Link to="/faq/" className="text-[12px] uppercase tracking-[0.22em] text-stone/85">
                        FAQs
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact/" className="text-[12px] uppercase tracking-[0.22em] text-stone/85">
                        Contact
                      </Link>
                    </li>
                  </ul>
                  <Link to="/plan-your-safari/" className="btn-solid mt-12 block w-full text-center">
                    Plan My Safari
                  </Link>
                  <a href={wa} target="_blank" rel="noreferrer" className="btn-ghost-light mt-4 block w-full text-center">
                    WhatsApp
                  </a>
                  <button onClick={() => { setDrawer(false); openEnquiry() }} className="mt-4 w-full text-center text-[12px] uppercase tracking-[0.2em] text-stone/60">
                    Quick enquiry
                  </button>
                </div>
              </m.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </header>
  )
}

function MegaPanel({ children }) {
  return (
    <m.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-x-0 top-full hidden border-t border-line bg-stone xl:block"
    >
      {children}
    </m.div>
  )
}
