import { brand } from '../data/site'
import { Mark } from './Icons'

// Circle-and-stripes mark with the two-line wordmark beside it.
export default function Logo({ size = 'md', className = '' }) {
  const big = size === 'lg'
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <Mark className={big ? 'h-12 w-12 shrink-0' : 'h-9 w-9 shrink-0'} />
      <span className="leading-none">
        <span className={`block whitespace-nowrap font-display tracking-[0.14em] ${big ? 'text-[30px]' : 'text-[19px] sm:text-[21px]'}`}>
          {brand.wordmark[0]}
        </span>
        <span className={`mt-1.5 block whitespace-nowrap uppercase opacity-75 ${big ? 'text-[11px] tracking-[0.55em]' : 'text-[9px] tracking-[0.5em]'}`}>
          {brand.wordmark[1]}
        </span>
      </span>
    </span>
  )
}
