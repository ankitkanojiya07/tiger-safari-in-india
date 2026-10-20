import { Link } from 'react-router-dom'
import { media } from '../data/media'
import Img from './Img'
import Reveal from './Reveal'

export default function Ready({ image = media.ready }) {
  return (
    <section className="relative overflow-hidden text-white">
      <Img src={image} alt="A tiger on a forest road" className="absolute inset-0 h-full w-full" label="Ready" />
      <div className="absolute inset-0 bg-black/55" />
      <div className="wrap relative flex flex-col items-center py-32 text-center lg:py-44">
        <Reveal className="flex flex-col items-center">
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl">Ready to see a wild tiger?</h2>
          <p className="mt-7 max-w-2xl text-[15px] leading-[1.85] text-white/85 sm:text-base">
            From the first call to the last transfer, we&apos;re with you. We book the safari zones the day they open,
            choose the lodges, arrange every train, flight and road journey, and stay on call while you travel.
          </p>
          <Link to="/plan-your-safari/" className="btn-solid mt-10">
            Plan My Safari
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
