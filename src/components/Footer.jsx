import { Link } from 'react-router-dom'
import { brand, parks, experiencePages, journeys } from '../data/site'
import { Icon } from './Icons'
import Logo from './Logo'

export default function Footer() {
  const year = new Date().getFullYear()
  const col = 'text-[14px] text-stone/70 transition-colors hover:text-stone'
  const head = 'mb-5 text-[11px] uppercase tracking-eyebrow text-mist'
  const journeyList = journeys.filter((j) => j.slug !== 'custom-private-journey').slice(0, 5)
  const wa = `https://wa.me/${brand.whatsapp}`

  return (
    <footer className="bg-bark text-stone" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <div className="wrap py-20">
        <div className="flex flex-col justify-between gap-10 border-b border-white/10 pb-14 lg:flex-row lg:items-end">
          <Logo size="lg" className="text-stone" />
          <p className="max-w-md font-display text-2xl italic leading-snug text-stone/80">{brand.tagline}.</p>
          <div className="flex gap-3">
            {['instagram', 'facebook', 'youtube', 'linkedin'].map((s) => (
              <a key={s} href="#" onClick={(e) => e.preventDefault()} aria-label={s} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-stone/75 transition-colors hover:border-mist hover:text-mist">
                <Icon name={s} className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 pt-14 md:grid-cols-3 lg:grid-cols-6">
          <div>
            <p className={head}>Parks</p>
            <ul className="space-y-3">
              {parks.map((p) => (
                <li key={p.slug}>
                  <Link to={`${p.path}/`} className={col}>{p.name}</Link>
                </li>
              ))}
              <li><Link to="/tiger-reserves/" className={col}>All reserves</Link></li>
            </ul>
          </div>
          <div>
            <p className={head}>Safari booking</p>
            <ul className="space-y-3">
              {parks.map((p) => (
                <li key={p.slug}>
                  <Link to={`${p.path}/safari-booking/`} className={col}>{p.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={head}>Hotels</p>
            <ul className="space-y-3">
              {parks.map((p) => (
                <li key={p.slug}>
                  <Link to={`${p.path}/hotels/`} className={col}>{p.name}</Link>
                </li>
              ))}
              <li><Link to="/hotels/luxury-jungle-lodges/" className={col}>Luxury lodges</Link></li>
            </ul>
          </div>
          <div>
            <p className={head}>Safaris & tours</p>
            <ul className="space-y-3">
              {experiencePages.slice(0, 4).map((e) => (
                <li key={e.slug}>
                  <Link to={`${e.path}/`} className={col}>{e.title}</Link>
                </li>
              ))}
              {journeyList.slice(0, 2).map((j) => (
                <li key={j.slug}>
                  <Link to={`${j.path}/`} className={col}>{j.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={head}>Company</p>
            <ul className="space-y-3">
              <li><Link to="/about/" className={col}>About</Link></li>
              <li><Link to="/impact/" className={col}>Impact</Link></li>
              <li><Link to="/guides/" className={col}>Guides</Link></li>
              <li><Link to="/journal/" className={col}>Journal</Link></li>
              <li><Link to="/contact/" className={col}>Contact</Link></li>
              <li><Link to="/faq/" className={col}>FAQ</Link></li>
            </ul>
          </div>
          <div>
            <p className={head}>Contact</p>
            <ul className="space-y-3 text-[14px] text-stone/70">
              <li className="select-all break-all">{brand.email}</li>
              <li className="select-all">{brand.phone}</li>
              <li>
                <a href={wa} target="_blank" rel="noreferrer" className={`${col} inline-flex items-center gap-2`}>
                  WhatsApp <Icon name="whatsapp" className="h-4 w-4" />
                </a>
              </li>
              <li>
                <Link to="/plan-your-safari/" className="link-line mt-3 text-mist">
                  Plan My Safari <Icon name="arrowR" className="h-3.5 w-3.5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-3 py-6 text-[12px] text-stone/50 sm:flex-row sm:justify-between">
          <p>© 2006–{year} {brand.full}. All rights reserved.</p>
          <p>Managed by <a href="https://services.nxtround.in/" target="_blank" rel="noreferrer" className="text-mist">NXTround</a></p>
        </div>
      </div>
    </footer>
  )
}
