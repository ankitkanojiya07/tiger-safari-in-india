import { Link, useParams } from 'react-router-dom'
import { getPark, getStory, siteUrl } from '../data/site'
import Seo, { breadcrumbLd } from '../components/Seo'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import AuthorByline from '../components/AuthorByline'
import Ready from '../components/Ready'
import { Icon } from '../components/Icons'
import NotFound from './NotFound'

export default function ParkZones() {
  const { parkSlug } = useParams()
  const park = getPark(parkSlug)
  if (!park) return <NotFound />

  const path = `${park.path}/zones`
  const story = getStory(`${park.slug}-zones`) || getStory(`${park.slug}-zones-guide`)
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: park.name, path: park.path },
    { name: 'Zones', path },
  ]
  const title = story?.title
    ? `${story.title} | Tiger Safaris in India`
    : `${park.name} Safari Zones | Tiger Safaris in India`
  const description =
    story?.description ||
    `Safari zones in ${park.name}: terrain, highlights and who each zone suits. Mix zones across multiple drives for better odds.`

  return (
    <>
      <Seo
        title={title}
        description={description}
        path={path}
        type="article"
        image={`${siteUrl}/images/og/${park.slug}.jpg`}
        jsonLd={[breadcrumbLd(crumbs)]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow={`${park.name} · Zones`}
        title={story?.title || park.zonesTitle}
        lede={story?.excerpt || park.zonesIntro}
      />

      <section className="bg-stone py-20 lg:py-28">
        <div className="wrap">
          {story?.body?.length > 0 && (
            <Reveal>
              <div className="mb-14 max-w-3xl space-y-5">
                {story.body.map((p) => (
                  <p key={p.slice(0, 40)} className="text-[16px] leading-[1.85] text-ink/80">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          )}
          <Reveal>
            <h2 className="h-section">{park.zonesTitle}</h2>
            <p className="lede mt-6 max-w-3xl">{park.zonesIntro}</p>
          </Reveal>
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[640px] border-t border-ink/15 text-left text-[14px]">
              <thead>
                <tr className="border-b border-ink/15 text-[11px] uppercase tracking-[0.16em] text-ink/50">
                  <th className="py-4 pr-4 font-medium">Zone / style</th>
                  <th className="py-4 pr-4 font-medium">Terrain</th>
                  <th className="py-4 pr-4 font-medium">Typical highlights</th>
                  <th className="py-4 font-medium">Who it suits</th>
                </tr>
              </thead>
              <tbody>
                {park.zones.map((z) => (
                  <tr key={z.name} className="border-b border-ink/10">
                    <td className="py-4 pr-4 font-display text-xl">{z.name}</td>
                    <td className="py-4 pr-4 text-ink/75">{z.terrain}</td>
                    <td className="py-4 pr-4 text-ink/75">{z.highlights}</td>
                    <td className="py-4 text-ink/75">{z.suits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to={`${park.path}/safari-booking/`} className="btn-solid">
              Book {park.name} safari
            </Link>
            {park.slug === 'jim-corbett' && (
              <Link to="/jim-corbett/zones/dhikala/" className="btn-ghost-dark">
                Dhikala zone booking
              </Link>
            )}
            <Link to={`${park.path}/`} className="link-line text-ochre">
              Back to {park.name} hub <Icon name="arrowR" className="h-3.5 w-3.5" />
            </Link>
          </div>
          <AuthorByline />
        </div>
      </section>
      <Ready image={park.imageAlt} />
    </>
  )
}
