import { createContext, lazy, Suspense, useCallback, useContext, useEffect, useState } from 'react'
import { Routes, Route, useLocation, useParams, Navigate } from 'react-router-dom'
import { SolarProvider } from '@solar-icons/react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import { getPark, getJourney, getStory, getExperience } from './data/site'

const Park = lazy(() => import('./pages/Park'))
const Destinations = lazy(() => import('./pages/Destinations'))
const Experiences = lazy(() => import('./pages/Experiences').then((m) => ({ default: m.ExperiencesHub })))
const ExperienceDetail = lazy(() => import('./pages/Experiences').then((m) => ({ default: m.ExperienceDetail })))
const JourneysHub = lazy(() => import('./pages/Journeys').then((m) => ({ default: m.JourneysHub })))
const JourneyDetail = lazy(() => import('./pages/Journeys').then((m) => ({ default: m.JourneyDetail })))
const HotelsHub = lazy(() => import('./pages/Hotels').then((m) => ({ default: m.HotelsHub })))
const HotelPageDetail = lazy(() => import('./pages/Hotels').then((m) => ({ default: m.HotelPageDetail })))
const ParkSafariBooking = lazy(() => import('./pages/ParkSafariBooking'))
const ParkHotels = lazy(() => import('./pages/ParkHotels'))
const ParkZones = lazy(() => import('./pages/ParkZones'))
const ParkTourPackages = lazy(() => import('./pages/ParkTourPackages'))
const ParkPlanning = lazy(() => import('./pages/ParkPlanning'))
const ParkHotelList = lazy(() => import('./pages/ParkHotelList'))
const Dhikala = lazy(() => import('./pages/Dhikala'))
const Journal = lazy(() => import('./pages/Journal'))
const WhyUs = lazy(() => import('./pages/WhyUs'))
const ImpactPage = lazy(() => import('./pages/ImpactPage'))
const StoriesHub = lazy(() => import('./pages/Stories').then((m) => ({ default: m.StoriesHub })))
const StoryDetail = lazy(() => import('./pages/Stories').then((m) => ({ default: m.StoryDetail })))
const PlanSafari = lazy(() => import('./pages/PlanSafari'))
const Faq = lazy(() => import('./pages/Faq'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))
const EnquiryModal = lazy(() => import('./components/EnquiryModal'))

const BestTime = () => <ParkPlanning kind="best-time" />
const HowToReach = () => <ParkPlanning kind="how-to-reach" />
const SafariCost = () => <ParkPlanning kind="safari-cost" />
const LuxuryList = () => <ParkHotelList listSlug="luxury-resorts" />
const BudgetList = () => <ParkHotelList listSlug="budget-hotels" />
const RiversideList = () => <ParkHotelList listSlug="riverside-resorts" />

const SiteCtx = createContext(null)
export const useSite = () => useContext(SiteCtx)

const Fallback = () => <div className="h-[40vh] bg-bark" aria-hidden="true" />

export default function App() {
  const [enquiry, setEnquiry] = useState({ open: false, park: null })
  const location = useLocation()

  const openEnquiry = useCallback((park = null) => setEnquiry({ open: true, park, loaded: true }), [])
  const closeEnquiry = useCallback(() => setEnquiry((e) => ({ ...e, open: false })), [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <SolarProvider color="currentColor" strokeWidth={1.25}>
      <SiteCtx.Provider value={{ openEnquiry }}>
        <Header />
        <main>
          <Suspense fallback={<Fallback />}>
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/tiger-reserves" element={<Destinations />} />
              <Route path="/tiger-reserves/" element={<Destinations />} />

              {/* Static pillars first so they outrank /:parkSlug */}
              <Route path="/safaris" element={<Experiences />} />
              <Route path="/safaris/" element={<Experiences />} />
              <Route path="/safaris/:slug" element={<ExperienceDetail />} />

              <Route path="/hotels" element={<HotelsHub />} />
              <Route path="/hotels/" element={<HotelsHub />} />
              <Route path="/hotels/:slug" element={<HotelPageDetail />} />

              <Route path="/tours" element={<JourneysHub />} />
              <Route path="/tours/" element={<JourneysHub />} />
              <Route path="/tours/:slug" element={<JourneyDetail />} />

              <Route path="/guides" element={<StoriesHub />} />
              <Route path="/guides/" element={<StoriesHub />} />
              <Route path="/guides/:slug" element={<StoryDetail />} />

              <Route path="/journal" element={<Journal />} />
              <Route path="/journal/" element={<Journal />} />

              <Route path="/about" element={<WhyUs />} />
              <Route path="/about/" element={<WhyUs />} />
              <Route path="/impact" element={<ImpactPage />} />
              <Route path="/impact/" element={<ImpactPage />} />
              <Route path="/plan-your-safari" element={<PlanSafari />} />
              <Route path="/plan-your-safari/" element={<PlanSafari />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/faq/" element={<Faq />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/contact/" element={<Contact />} />

              <Route path="/jim-corbett/zones/dhikala" element={<Dhikala />} />
              <Route path="/jim-corbett/zones/dhikala/" element={<Dhikala />} />

              <Route path="/destinations" element={<Navigate to="/tiger-reserves/" replace />} />
              <Route path="/destinations/" element={<Navigate to="/tiger-reserves/" replace />} />
              <Route path="/destinations/:slug" element={<OldDestinationRedirect />} />
              <Route path="/experiences" element={<Navigate to="/safaris/" replace />} />
              <Route path="/experiences/" element={<Navigate to="/safaris/" replace />} />
              <Route path="/experiences/:slug" element={<OldExperienceRedirect />} />
              <Route path="/journeys" element={<Navigate to="/tours/" replace />} />
              <Route path="/journeys/" element={<Navigate to="/tours/" replace />} />
              <Route path="/journeys/:slug" element={<OldJourneyRedirect />} />
              <Route path="/why-us" element={<Navigate to="/about/" replace />} />
              <Route path="/why-us/" element={<Navigate to="/about/" replace />} />
              <Route path="/stories" element={<Navigate to="/journal/" replace />} />
              <Route path="/stories/" element={<Navigate to="/journal/" replace />} />
              <Route path="/stories/:slug" element={<OldStoryRedirect />} />
              <Route path="/parks/:slug" element={<LegacyParkRedirect />} />

              {/* Park hubs + children (short slugs) — specific paths before hub */}
              <Route path="/:parkSlug/safari-booking" element={<ParkSafariBooking />} />
              <Route path="/:parkSlug/safari-booking/" element={<ParkSafariBooking />} />
              <Route path="/:parkSlug/hotels/luxury-resorts" element={<LuxuryList />} />
              <Route path="/:parkSlug/hotels/luxury-resorts/" element={<LuxuryList />} />
              <Route path="/:parkSlug/hotels/budget-hotels" element={<BudgetList />} />
              <Route path="/:parkSlug/hotels/budget-hotels/" element={<BudgetList />} />
              <Route path="/:parkSlug/hotels/riverside-resorts" element={<RiversideList />} />
              <Route path="/:parkSlug/hotels/riverside-resorts/" element={<RiversideList />} />
              <Route path="/:parkSlug/hotels" element={<ParkHotels />} />
              <Route path="/:parkSlug/hotels/" element={<ParkHotels />} />
              <Route path="/:parkSlug/zones" element={<ParkZones />} />
              <Route path="/:parkSlug/zones/" element={<ParkZones />} />
              <Route path="/:parkSlug/tour-packages" element={<ParkTourPackages />} />
              <Route path="/:parkSlug/tour-packages/" element={<ParkTourPackages />} />
              <Route path="/:parkSlug/best-time" element={<BestTime />} />
              <Route path="/:parkSlug/best-time/" element={<BestTime />} />
              <Route path="/:parkSlug/how-to-reach" element={<HowToReach />} />
              <Route path="/:parkSlug/how-to-reach/" element={<HowToReach />} />
              <Route path="/:parkSlug/safari-cost" element={<SafariCost />} />
              <Route path="/:parkSlug/safari-cost/" element={<SafariCost />} />
              <Route path="/:parkSlug" element={<Park />} />
              <Route path="/:parkSlug/" element={<Park />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        {(enquiry.open || enquiry.loaded) && (
          <Suspense fallback={null}>
            <EnquiryModal open={enquiry.open} park={enquiry.park} onClose={closeEnquiry} />
          </Suspense>
        )}
      </SiteCtx.Provider>
    </SolarProvider>
  )
}

function OldDestinationRedirect() {
  const { slug } = useParams()
  const park = getPark(slug)
  return <Navigate to={park ? `${park.path}/` : '/tiger-reserves/'} replace />
}

function OldExperienceRedirect() {
  const { slug } = useParams()
  if (slug === 'luxury-jungle-lodges') return <Navigate to="/hotels/luxury-jungle-lodges/" replace />
  const exp = getExperience(slug)
  return <Navigate to={exp ? `${exp.path}/` : '/safaris/'} replace />
}

function OldJourneyRedirect() {
  const { slug } = useParams()
  if (slug === 'central-india-wild-circuit') return <Navigate to="/tours/central-india-tiger-circuit/" replace />
  const journey = getJourney(slug)
  return <Navigate to={journey ? `${journey.path}/` : '/tours/'} replace />
}

function OldStoryRedirect() {
  const { slug } = useParams()
  const story = getStory(slug)
  if (!story) return <Navigate to="/guides/" replace />
  if (story.pillar === 'park' && story.parkSlug) {
    return <Navigate to={`/${story.parkSlug}/zones/`} replace />
  }
  return <Navigate to={`${story.path}/`} replace />
}

function LegacyParkRedirect() {
  const { slug } = useParams()
  const map = {
    ranthambhore: '/ranthambore/',
    corbett: '/jim-corbett/',
    panna: '/panna/',
    satpura: '/satpura/',
    sariska: '/sariska/',
  }
  return <Navigate to={map[slug] || '/tiger-reserves/'} replace />
}
