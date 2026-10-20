import { useState } from 'react'
import { parks, pageMeta, brand } from '../data/site'
import Seo, { breadcrumbLd } from '../components/Seo'
import PageHero from '../components/PageHero'
import { submitEnquiry } from '../utils/submitEnquiry'
import DateField from '../components/DateField'

export default function PlanSafari() {
  const meta = pageMeta.plan
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Plan My Safari', path: '/plan-your-safari/' },
  ]
  const [picked, setPicked] = useState([])
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

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
    const result = await submitEnquiry({ ...data, parks: picked, source: 'plan_your_safari' })
    if (!result.ok) return fail(result.error)
    setStatus('sent')
  }
  const fail = (msg) => {
    setError(msg)
    setStatus('error')
  }

  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} jsonLd={[breadcrumbLd(crumbs)]} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Enquiry"
        title="Plan Your Tiger Safari"
        lede="Tell us your dates, group size and interests. We’ll design a private itinerary across India’s best tiger reserves."
      />
      <section className="bg-stone py-16 lg:py-24">
        <div className="wrap max-w-2xl">
          {status === 'sent' ? (
            <div role="status">
              <h2 className="font-display text-4xl">Thank you.</h2>
              <p className="lede mt-5">We’ve received your enquiry and will reply within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-8" noValidate>
              <p className="text-[14px] text-ink/60">Reply within 24 hours · Or WhatsApp {brand.phone}</p>
              {status === 'error' && (
                <p className="text-[14px] text-danger" role="alert">
                  {error}
                </p>
              )}
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[11px] uppercase tracking-eyebrow text-ink/50">
                    Start Date <span className="text-ochre">*</span>
                  </span>
                  <DateField name="startDate" required />
                </label>
                <label className="block">
                  <span className="text-[11px] uppercase tracking-eyebrow text-ink/50">
                    Number of Days <span className="text-ochre">*</span>
                  </span>
                  <input
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
                <legend className="text-[11px] uppercase tracking-eyebrow text-ink/50">Parks of interest</legend>
                <div className="mt-4 flex flex-wrap gap-3">
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
                  name="requests"
                  rows={4}
                  className="field mt-1 resize-none"
                  placeholder="Here Enter which Tour do you want to enquire about?"
                />
              </label>
              <button type="submit" className="btn-solid" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send enquiry'}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
