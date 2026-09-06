import HomeHero from '../components/home/HomeHero'
import PartnersStrip from '../components/home/PartnersStrip'
import InteractiveSteps from '../components/home/InteractiveSteps'
import FeatureGrid from '../components/home/FeatureGrid'
import SecurityInsurance from '../components/home/SecurityInsurance'
import InvestmentPackages from '../components/home/InvestmentPackages'
import RoiCalculator from '../components/home/RoiCalculator'
import LiveArbitrageFeed from '../components/home/LiveArbitrageFeed'
import Testimonials from '../components/home/Testimonials'
import FaqAccordion from '../components/home/FaqAccordion'
import CtaBanner from '../components/home/CtaBanner'

export default function Home() {
  return (
    <main className="main-content">
      <HomeHero />
      <PartnersStrip />
      <InteractiveSteps />
      <FeatureGrid />
      <SecurityInsurance />
      <InvestmentPackages />
      <RoiCalculator />
      <LiveArbitrageFeed />
      <Testimonials />
      <FaqAccordion />
      <CtaBanner />
    </main>
  )
}
