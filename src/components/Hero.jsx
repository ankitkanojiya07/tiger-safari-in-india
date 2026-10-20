import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { parks } from '../data/site'
import { media } from '../data/media'
import { Icon } from './Icons'
import Img from './Img'

const ease = [0.22, 1, 0.36, 1]

// Pick the right hero clip for this visitor, or none.
// Skip only for reduced-motion, Data Saver, or truly slow 2G.
// Phones get a small H.264 MP4 (~1MB) so autoplay works on iOS/Android.
function chooseVideo(reduce) {
  if (typeof window === 'undefined' || reduce) return null
  const c = navigator.connection
  if (c && (c.saveData || /^(slow-)?2g$/.test(c.effectiveType || ''))) return null
  const phone = window.matchMedia('(max-width: 767px)').matches
  return phone ? media.hero.videoMobile || media.hero.video : media.hero.video
}

export default function Hero() {
  const videoRef = useRef(null)
  const sectionRef = useRef(null)
  const reduce = useReducedMotion()
  const [videoSrc, setVideoSrc] = useState(null)
  const [videoReady, setVideoReady] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [phone, setPhone] = useState(false)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const lightMotion = reduce || phone

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const sync = () => setPhone(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  // Start the clip ASAP so phones don't wait on a late window "load".
  useEffect(() => {
    const src = chooseVideo(reduce)
    if (!src) return
    // Next frame: poster paints first, then video begins fetching.
    const id = requestAnimationFrame(() => setVideoSrc(src))
    return () => cancelAnimationFrame(id)
  }, [reduce])

  useEffect(() => {
    const v = videoRef.current
    if (!v || !videoSrc) return
    v.muted = true
    v.defaultMuted = true
    v.setAttribute('muted', '')
    v.playsInline = true
    v.setAttribute('playsinline', '')
    v.setAttribute('webkit-playsinline', '')
    const markPlaying = () => {
      setPlaying(true)
      if (v.readyState >= 2) setVideoReady(true)
    }
    const tryPlay = () => {
      const p = v.play()
      if (p && p.then) p.then(markPlaying).catch(() => setPlaying(false))
      else if (!v.paused) markPlaying()
    }
    tryPlay()
    // iOS sometimes needs a second attempt after canplay.
    v.addEventListener('canplay', tryPlay, { once: true })
    return () => v.removeEventListener('canplay', tryPlay)
  }, [videoSrc])

  // Pause the loop when the hero is off screen (saves battery and CPU).
  useEffect(() => {
    const v = videoRef.current
    if (!v || !videoSrc || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.15 },
    )
    io.observe(sectionRef.current)
    return () => io.disconnect()
  }, [videoSrc])

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) v.play().catch(() => {})
    else v.pause()
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[520px] w-full overflow-hidden bg-bark text-white sm:min-h-[620px]"
    >
      {/* Media layer */}
      <m.div className="absolute inset-0" style={lightMotion ? undefined : { scale: mediaScale }}>
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(90% 70% at 70% 40%, #2a5a60 0%, #123438 50%, #071a1c 100%)' }}
        />
        {/* Poster: always visible underneath; video fades in when playing. */}
        <Img
          src={media.hero.poster}
          alt=""
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full"
          imgClassName={!videoReady && !reduce ? 'animate-[kenburns_24s_ease-out_forwards]' : ''}
        />
        {videoSrc && (
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={media.hero.poster.src}
            disablePictureInPicture
            disableRemotePlayback
            onPlaying={() => {
              setVideoReady(true)
              setPlaying(true)
            }}
            onPause={() => setPlaying(false)}
            onError={() => {
              setVideoSrc(null)
              setVideoReady(false)
            }}
            aria-hidden="true"
          >
            {media.hero.videoWebm && videoSrc === media.hero.video && (
              <source src={media.hero.videoWebm} type="video/webm" />
            )}
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent sm:h-48" />
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/80 via-black/35 to-transparent sm:h-[60%]" />
        <div className="grain absolute inset-0 overflow-hidden" />
      </m.div>

      {/* Copy — leave room for the bottom play control on short phones */}
      <m.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-5 pb-20 pt-24 text-center sm:pb-20 sm:pt-24"
        style={lightMotion ? undefined : { y: copyY, opacity: copyOpacity }}
      >
        <m.div
          className="mb-4 flex items-center gap-3 sm:mb-5 sm:gap-4"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
        >
          <span className="h-px w-6 bg-white/60 sm:w-10" />
          <span className="text-[10px] uppercase tracking-[0.36em] text-white/90 sm:text-[11px] sm:tracking-[0.42em]">
            Welcome to
          </span>
          <span className="h-px w-6 bg-white/60 sm:w-10" />
        </m.div>

        <h1 className="mx-auto max-w-4xl font-display font-normal text-[clamp(1.75rem,7.2vw,3.75rem)] leading-[1.08] tracking-[0.01em]">
          <span className="block overflow-hidden pb-[0.08em]">
            <m.span
              className="block"
              initial={reduce ? false : { y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, delay: 0.25, ease }}
            >
              Private Tiger Safaris in India, Planned End to End
            </m.span>
          </span>
        </h1>

        <m.p
          className="mt-4 max-w-xl text-[14px] leading-[1.7] text-white/85 sm:mt-5 sm:text-[17px] sm:leading-[1.75]"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease }}
        >
          Track wild tigers across five of India&apos;s finest national parks. We handle permits, safari zones, naturalist guides, jungle stays and transfers, so you only have to look for stripes.
        </m.p>

        <m.div
          className="mt-7 flex w-full flex-col gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:gap-4"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease }}
        >
          <Link to="/plan-your-safari/" className="btn-solid">
            Plan My Safari
          </Link>
          <a href="#destinations" className="btn-ghost-light">
            Explore the Parks
          </a>
        </m.div>
      </m.div>

      {/* Bottom rail */}
      <div className="absolute inset-x-0 bottom-0 z-10" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        <div className="wrap flex items-end justify-between gap-6 pb-5 sm:pb-7">
          <ul className="hidden flex-wrap gap-x-7 gap-y-2 md:flex">
            {parks.map((p) => (
              <li key={p.slug}>
                <Link to={`${p.path}/`} className="text-[11px] uppercase tracking-[0.24em] text-white/70 transition-colors hover:text-white">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>

          <a
            href="#destinations"
            className="absolute left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-white/75 xl:flex"
            aria-label="Scroll to content"
          >
            Scroll
            <span className="relative block h-12 w-px overflow-hidden bg-white/25">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.2s_ease-in-out_infinite] bg-white" />
            </span>
          </a>

          {videoSrc && (
            <button
              type="button"
              onClick={toggle}
              className="ml-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white/85 transition-colors hover:bg-white hover:text-ink"
              aria-label={playing ? 'Pause background video' : 'Play background video'}
            >
              <Icon name={playing ? 'pause' : 'play'} className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
