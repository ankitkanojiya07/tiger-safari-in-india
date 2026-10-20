import { useState } from 'react'

const countries = ['India', 'United Kingdom', 'United States', 'Germany', 'France', 'Australia', 'Canada', 'Singapore', 'United Arab Emirates', 'Other']

// Front-end only. Connect `onSubmit` to Mailchimp, Brevo, Formspree or a webhook.
export default function Newsletter() {
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const email = String(data.get('email') || '')
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Enter a valid email address, like name@example.com.')
      return
    }
    setError('')
    // TODO: send `Object.fromEntries(data)` to your email provider here.
    setDone(true)
  }

  return (
    <section className="bg-sand py-20 lg:py-24">
      <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
        <div>
          <h2 className="font-display text-4xl leading-tight lg:text-5xl">Need some inspiration?</h2>
          <p className="lede mt-4">Seasonal sightings, new lodges and journey ideas, a few times a year.</p>
        </div>
        {done ? (
          <p className="self-center font-display text-3xl text-moss" role="status">
            You’re subscribed. Look out for our next letter from the forest.
          </p>
        ) : (
          <form onSubmit={onSubmit} noValidate className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
            <label className="sr-only" htmlFor="nl-first">First name</label>
            <input id="nl-first" name="first" className="field" placeholder="First name" autoComplete="given-name" />
            <label className="sr-only" htmlFor="nl-last">Surname</label>
            <input id="nl-last" name="last" className="field" placeholder="Surname" autoComplete="family-name" />
            <label className="sr-only" htmlFor="nl-email">Email address</label>
            <input id="nl-email" name="email" type="email" className="field" placeholder="Email address" autoComplete="email" aria-invalid={!!error} aria-describedby={error ? 'nl-error' : undefined} />
            <label className="sr-only" htmlFor="nl-country">Country of residence</label>
            <select id="nl-country" name="country" className="field" defaultValue="">
              <option value="" disabled>Country of residence</option>
              {countries.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <div className="mt-6 flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p id="nl-error" className="text-sm text-danger" role="alert">{error}</p>
              <button type="submit" className="btn-solid">Subscribe</button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
