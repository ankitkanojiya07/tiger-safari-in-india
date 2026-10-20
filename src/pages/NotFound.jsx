import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found | Tiger Safaris in India" description="This page does not exist." path="/404/" />
      <section className="bg-stone py-32 lg:py-40">
        <div className="wrap max-w-xl text-center">
          <p className="eyebrow">404</p>
          <h1 className="mt-4 font-display text-5xl">Page not found</h1>
          <p className="mt-6 text-[15px] leading-relaxed text-ink/70">
            The link may be outdated. Try a park hub, safari booking page or the trip planner.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/" className="btn-solid">
              Home
            </Link>
            <Link to="/tiger-reserves/" className="btn-ghost-dark">
              Tiger reserves
            </Link>
            <Link to="/plan-your-safari/" className="btn-ghost-dark">
              Plan your safari
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
