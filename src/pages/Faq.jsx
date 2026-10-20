import { pageMeta, siteFaq } from '../data/site'
import Seo, { breadcrumbLd, faqLd } from '../components/Seo'
import PageHero from '../components/PageHero'
import FaqSection from '../components/FaqSection'
import Ready from '../components/Ready'

export default function Faq() {
  const meta = pageMeta.faq
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'FAQ', path: '/faq/' },
  ]

  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} jsonLd={[breadcrumbLd(crumbs), faqLd(siteFaq)]} />
      <PageHero crumbs={crumbs} eyebrow="FAQ" title="Tiger safari questions, answered" lede="Sightings, seasons, costs, ID rules and how long to stay — the questions we hear most often." />
      <FaqSection title="Site-wide FAQ" faqs={siteFaq} />
      <Ready />
    </>
  )
}
