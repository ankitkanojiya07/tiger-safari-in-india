// Static, reliable image — paints immediately (no fade-from-invisible).
// `src` can be a plain URL or { src, srcSet } from data/media.js.
// Lazy-loads below the fold; pass `priority` for above-the-fold images.
export default function Img({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  label,
  sizes = '100vw',
  priority = false,
}) {
  const data = typeof src === 'string' ? { src } : src || {}
  const positioned = /\b(absolute|fixed)\b/.test(className)

  if (!data.src) {
    return (
      <div
        className={`${positioned ? '' : 'relative'} overflow-hidden bg-bark ${className}`}
        role="img"
        aria-label={alt || label || undefined}
      />
    )
  }

  return (
    <div className={`${positioned ? '' : 'relative'} overflow-hidden bg-bark ${className}`}>
      <img
        src={data.src}
        srcSet={data.srcSet}
        sizes={data.srcSet ? sizes : undefined}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchpriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  )
}
