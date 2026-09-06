import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import HomeHeroWebflow from '../components/home/HomeHeroWebflow'
import CompaniesTicker from '../components/home/CompaniesTicker'
import SectionAbout from '../components/home/SectionAbout'
import SpecsOne from '../components/home/SpecsOne'
import SpecsTwo from '../components/home/SpecsTwo'
import StakingYieldMatrix from '../components/home/StakingYieldMatrix'
import GetStartedPreview from '../components/home/GetStartedPreview'
import TestimonialsWebflow from '../components/home/TestimonialsWebflow'
import CtaBannerWebflow from '../components/home/CtaBannerWebflow'

function Home() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <main className="min-h-screen bg-[#0a0c1a] text-slate-100 overflow-x-hidden selection:bg-[#356df1] selection:text-white">
      {/* 1. Hero Section matching cryptotemplate.webflow.io */}
      <HomeHeroWebflow />

      {/* 2. Companies Featured On */}
      <CompaniesTicker />

      {/* 3. More Than a Typical Crypto Exchange (5-Card Bento Grid) */}
      <SectionAbout />

      {/* 4. Specs 1: A Crypto Platform from the Future */}
      <SpecsOne />

      {/* 5. Specs 2: Built on a Robust and Powerful Platform */}
      <SpecsTwo />

      {/* 6. Autonomous Cyber Cat Trading Bots & Staking Yield Matrix */}
      <StakingYieldMatrix />

      {/* 7. Get Started Today (3-Step Roadmap & Preview) */}
      <GetStartedPreview />

      {/* 8. User Testimonials & Social Proof */}
      <TestimonialsWebflow />

      {/* 9. High-Impact CTA Banner */}
      <CtaBannerWebflow />
    </main>
  )
}

export default Home
