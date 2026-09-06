import HomeHero from '../components/home/HomeHero'
import PartnersStrip from '../components/home/PartnersStrip'
import HowItWorks from '../components/home/HowItWorks'
import InvestmentPackages from '../components/home/InvestmentPackages'
import RoiCalculator from '../components/home/RoiCalculator'
import LiveArbitrageFeed from '../components/home/LiveArbitrageFeed'
import SecurityInsurance from '../components/home/SecurityInsurance'
import Testimonials from '../components/home/Testimonials'
import FaqAccordion from '../components/home/FaqAccordion'
import CtaBanner from '../components/home/CtaBanner'

export default function Home() {
  return (
    <main className="main-content">
      <HomeHero />
      <PartnersStrip />
      <HowItWorks />
      <InvestmentPackages />
      <RoiCalculator />
      <LiveArbitrageFeed />
      <SecurityInsurance />
      <Testimonials />
      <FaqAccordion />
      <CtaBanner />
    </main>
  )
}
