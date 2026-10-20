import { ArrowLeftIcon } from '@solar-icons/react/linear/arrow-left'
import { ArrowRightIcon } from '@solar-icons/react/linear/arrow-right'
import { AltArrowDownIcon } from '@solar-icons/react/linear/alt-arrow-down'
import { CloseIcon } from '@solar-icons/react/linear/close'
import { HamburgerMenuIcon } from '@solar-icons/react/linear/hamburger-menu'
import { MagnifierIcon } from '@solar-icons/react/linear/magnifier'
import { PlayIcon } from '@solar-icons/react/linear/play'
import { PauseIcon } from '@solar-icons/react/linear/pause'
import { MapPointIcon } from '@solar-icons/react/linear/map-point'
import { QuoteIcon } from '@solar-icons/react/linear/quote'
import { GlobalIcon } from '@solar-icons/react/linear/global'
import { BuildingsIcon } from '@solar-icons/react/linear/buildings'
import { CompassIcon } from '@solar-icons/react/linear/compass'
import { PenNewSquareIcon } from '@solar-icons/react/linear/pen-new-square'
import { UsersGroupRoundedIcon } from '@solar-icons/react/linear/users-group-rounded'
import { MedalRibbonsStarIcon } from '@solar-icons/react/linear/medal-ribbons-star'
import { ChatRoundCallIcon } from '@solar-icons/react/linear/chat-round-call'
import { LeafIcon } from '@solar-icons/react/linear/leaf'
import { CalendarDateIcon } from '@solar-icons/react/linear/calendar-date'

// Thin stroke to match the site’s existing line weight.
const stroke = 1.25

const catalog = {
  parks: GlobalIcon,
  lodge: BuildingsIcon,
  private: CompassIcon,
  bespoke: PenNewSquareIcon,
  community: UsersGroupRoundedIcon,
  arrowR: ArrowRightIcon,
  arrowL: ArrowLeftIcon,
  chevronD: AltArrowDownIcon,
  close: CloseIcon,
  menu: HamburgerMenuIcon,
  search: MagnifierIcon,
  play: PlayIcon,
  pause: PauseIcon,
  pin: MapPointIcon,
  quote: QuoteIcon,
  laurel: MedalRibbonsStarIcon,
  leaf: LeafIcon,
  whatsapp: ChatRoundCallIcon,
  calendar: CalendarDateIcon,
}

// Brand marks are not in Solar Icons (trademarked logos) — keep lightweight SVGs.
const brand = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const brandPaths = {
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r=".6" fill="currentColor" />
    </>
  ),
  facebook: (
    <path d="M14 8h2.5V4.5H14A4 4 0 0 0 10 8.5V11H7.5v3.5H10V21h3.5v-6.5H16l.5-3.5h-3V8.8c0-.5.2-.8.5-.8z" />
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
      <path d="M10 9.2v5.6l4.8-2.8L10 9.2z" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <path d="M8 10.5v6M8 7.6v.1M11.5 16.5v-6M11.5 13c0-1.6 1-2.6 2.4-2.6s2.1 1 2.1 2.6v3.5" />
    </>
  ),
}

export function Icon({ name, className = 'h-6 w-6' }) {
  const Solar = catalog[name]
  if (Solar) {
    return <Solar className={className} strokeWidth={stroke} aria-hidden="true" />
  }

  const path = brandPaths[name]
  if (!path) return null

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...brand}>
      {path}
    </svg>
  )
}

// Wordmark glyph for the logo — custom, not from Solar.
export function Mark({ className = 'h-8 w-8' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <circle cx="20" cy="20" r="18.5" />
      <path d="M9 15c4-2.5 8-2.5 11 0s7 2.5 11 0" />
      <path d="M8 21c4.5-2.5 9-2.5 12 0s7.5 2.5 12 0" />
      <path d="M10 27c3.5-2 7.5-2 10 0s6.5 2 10 0" />
    </svg>
  )
}
