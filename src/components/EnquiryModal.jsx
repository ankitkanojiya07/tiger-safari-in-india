import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { brand, parks } from '../data/site'
import { trackEnquiryStart, trackEnquirySubmit } from '../utils/analytics'
import { submitEnquiry } from '../utils/submitEnquiry'
import { Icon } from './Icons'
import DateField from './DateField'

export default function EnquiryModal({ open, park, onClose }) {
  const [picked, setPicked] = useState([])
  const [status, setStatus] = useState('idle') // idle | sending | error | sent
  const [error, setError] = useState('')
  const firstField = useRef(null)

  useEffect(() => {
    if (open) {
      setPicked(park ? [park] : [])
      setStatus('idle')
      setError('')
      trackEnquiryStart(park, 'enquiry_modal')
      document.body.style.overflow = 'hidden'
      setTimeout(() => firstField.current?.focus(), 250)
    } else {
      document.body.style.overflow = ''
    }
  }, [open, park])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const toggle = (slug) => setPicked((p) => (p.includes(slug) ? p.filter((s) => s !== slug) : [...p, slug]))

  const submit = async (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    if (!data.startDate?.trim()) return fail('Please choose a start date.')
    if (!data.days?.trim()) return fail('Please enter the number of days.')
    if (!data.guests?.trim()) return fail('Please enter the number of guests.')
    if (!data.name?.trim()) return fail('Please enter your full name.')
    if (!/^\S+@\S+\.\S+$/.test(data.email || '')) return fail('Enter a valid email address.')
    if (!data.phone?.trim()) return fail('Please enter your phone number.')

    setStatus('sending')
    setError('')
    const result = await submitEnquiry({ ...data, parks: picked, source: 'enquiry_modal' })
    if (!result.ok) return fail(result.error)
    trackEnquirySubmit(picked[0] || park, 'enquiry_modal')
    setStatus('sent')
  }
  const fail = (msg) => {
    setError(msg)
    setStatus('error')
  }

  return (
    <AnimatePresence>
      {open && (
        <m.div
          className="fixed inset-0 z-[70] flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button className="absolute inset-0 bg-black/55 backdrop-blur-sm" onClick={onClose} aria-label="Close enquiry form" />
          <m.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="enq-title"
            className="relative h-full w-full max-w-[560px] overflow-y-auto bg-stone"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ paddingTop: 'env(safe-area-inset-top, 0px)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
          >
            <div className="px-6 py-8 sm:px-10">
              <div className="flex items-start justify-between">
                <p className="eyebrow">Enquire</p>
                <button onClick={onClose} aria-label="Close" className="-mr-1 -mt-1 p-1 text-ink/70 hover:text-ink">
                  <Icon name="close" className="h-6 w-6" />
                </button>
              </div>

              {status === 'sent' ? (
                <div className="py-16" role="status">
                  <h2 id="enq-title" className="font-display text-5xl">
                    Thank you.
                  </h2>
                  <p className="lede mt-5">
                    Your enquiry is with our safari team. A specialist will reply within one working day with ideas for
                    dates, zones and lodges.
                  </p>
                  <button onClick={onClose} className="btn-ghost-dark mt-10">
                    Back to the site
                  </button>
                </div>
              ) : (
                <>
                  <h2 id="enq-title" className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
                    Plan your tiger safari
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink/70">
                    Tell us a little about your trip. A specialist will reply within one working day.
                  </p>

                  <form onSubmit={submit} noValidate className="mt-8 space-y-7">
                    <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
                      <label className="block">
                        <span className="text-[11px] uppercase tracking-eyebrow text-ink/50">
                          Start Date <span className="text-ochre">*</span>
                        </span>
                        <DateField ref={firstField} id="enq-start" name="startDate" required />
                      </label>
                      <label className="block">
                        <span className="text-[11px] uppercase tracking-eyebrow text-ink/50">
                          Number of Days <span className="text-ochre">*</span>
                        </span>
                        <input
                          id="enq-days"
                          name="days"
                          type="number"
                          min="1"
                          className="field mt-1"
                          required
                          placeholder="Enter Number of Days"
                        />
                      </label>
                      <label className="block sm:col-span-2">
                        <span className="text-[11px] uppercase tracking-eyebrow text-ink/50">
                          Guests <span className="text-ochre">*</span>
                        </span>
                        <input
                          id="enq-guests"
                          name="guests"
                          type="number"
                          min="1"
                          className="field mt-1"
                          required
                          placeholder="Enter number of guests"
                        />
                      </label>
                      <label className="block">
                        <span className="text-[11px] uppercase tracking-eyebrow text-ink/50">
                          Full Name <span className="text-ochre">*</span>
                        </span>
                        <input
                          id="enq-name"
                          name="name"
                          className="field mt-1"
                          required
                          autoComplete="name"
                          placeholder="Enter your full name"
                        />
                      </label>
                      <label className="block">
                        <span className="text-[11px] uppercase tracking-eyebrow text-ink/50">
                          Email Address <span className="text-ochre">*</span>
                        </span>
                        <input
                          id="enq-email"
                          name="email"
                          type="email"
                          className="field mt-1"
                          required
                          autoComplete="email"
                          placeholder="Enter your email"
                        />
                      </label>
                      <label className="block sm:col-span-2">
                        <span className="text-[11px] uppercase tracking-eyebrow text-ink/50">
                          Phone Number <span className="text-ochre">*</span>
                        </span>
                        <input
                          id="enq-phone"
                          name="phone"
                          type="tel"
                          className="field mt-1"
                          required
                          autoComplete="tel"
                          placeholder="Enter your phone number"
                        />
                      </label>
                    </div>

                    <fieldset>
                      <legend className="mb-3 text-[11px] uppercase tracking-[0.2em] text-ink/60">Parks of interest</legend>
                      <div className="flex flex-wrap gap-2">
                        {parks.map((p) => {
                          const on = picked.includes(p.slug)
                          return (
                            <button
                              type="button"
                              key={p.slug}
                              onClick={() => toggle(p.slug)}
                              aria-pressed={on}
                              className={`border px-4 py-2 text-[13px] transition-colors ${
                                on ? 'border-ochre bg-ochre text-white' : 'border-ink/25 text-ink/80 hover:border-ink'
                              }`}
                            >
                              {p.name}
                            </button>
                          )
                        })}
                      </div>
                    </fieldset>

                    <label className="block">
                      <span className="text-[11px] uppercase tracking-eyebrow text-ink/50">Special Requests</span>
                      <textarea
                        id="enq-msg"
                        name="requests"
                        rows="3"
                        className="field mt-1 resize-none"
                        placeholder="Here Enter which Tour do you want to enquire about?"
                      />
                    </label>

                    {status === 'error' && (
                      <p className="text-sm text-danger" role="alert">
                        {error}
                      </p>
                    )}

                    <button type="submit" className="btn-solid w-full" disabled={status === 'sending'}>
                      {status === 'sending' ? 'Sending…' : 'Send enquiry'}
                    </button>
                    <p className="text-center text-[13px] text-ink/55">
                      Prefer to talk? Call <span className="select-all text-ink/80">{brand.phone}</span>
                    </p>
                  </form>
                </>
              )}
            </div>
          </m.aside>
        </m.div>
      )}
    </AnimatePresence>
  )
}
