import { useState } from 'react'
import AboutHero from '../components/about/AboutHero'
import AboutStats from '../components/about/AboutStats'
import InvestmentPlans from '../components/about/InvestmentPlans'
import RoiCalculator from '../components/about/RoiCalculator'
import HowItWorks from '../components/about/HowItWorks'
import WhyChoosePurex from '../components/about/WhyChoosePurex'
import AboutFaq from '../components/about/AboutFaq'
import CTA from '../components/CTA'

function About() {
  const [selectedPlanId, setSelectedPlanId] = useState('growth')

  const handleSelectPlan = (plan) => {
    setSelectedPlanId(plan.id)
  }

  return (
    <main className="home-page-shell min-h-screen text-white">
      {/* 1. Hero & Mission Narrative */}
      <AboutHero />

      {/* 2. Global Key Stats */}
      <AboutStats />

      {/* 3. Four Glowing Investment Plans */}
      <InvestmentPlans
        onSelectPlan={handleSelectPlan}
        selectedPlanId={selectedPlanId}
      />

      {/* 4. Interactive ROI Profit Calculator */}
      <RoiCalculator preselectedPlanId={selectedPlanId} />

      {/* 5. 4-Step How It Works Flow */}
      <HowItWorks />

      {/* 6. Why Choose Purex & Security Architecture */}
      <WhyChoosePurex />

      {/* 7. Frequently Asked Questions */}
      <AboutFaq />

      {/* 8. Final Call to Action */}
      <CTA />
    </main>
  )
}

export default About
