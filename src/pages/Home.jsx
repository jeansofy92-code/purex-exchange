import Hero from '../components/Hero'
import CryptoTicker from '../components/CryptoTicker'
import HomeMarketGainers from '../components/home/HomeMarketGainers'
import MarketOverview from '../components/MarketOverview'
import RoiCalculator from '../components/about/RoiCalculator'
import HowItWorks from '../components/about/HowItWorks'
import Features from '../components/Features'
import Stats from '../components/Stats'
import Security from '../components/Security'
import HomeTestimonials from '../components/home/HomeTestimonials'
import HomeAppDownload from '../components/home/HomeAppDownload'
import AboutFaq from '../components/about/AboutFaq'
import CTA from '../components/CTA'

function Home() {
  return (
    <main className="home-page-shell">
      {/* 1. Hero Section with Quick Onboarding & Trust Ribbon */}
      <Hero />

      {/* 2. Live Top Ticker Strip */}
      <CryptoTicker />

      {/* 3. Market Momentum & Spotlight Gainers */}
      <HomeMarketGainers />

      {/* 4. Complete Market Discovery & Trading Table */}
      <MarketOverview />

      {/* 5. Interactive High-Yield Staking & ROI Calculator */}
      <RoiCalculator />

      {/* 6. Human Onboarding: 3-Step Guide */}
      <HowItWorks />

      {/* 7. Platform Strengths & Institutional Infrastructure */}
      <Features />

      {/* 8. Global Platform Statistics */}
      <Stats />

      {/* 9. Security Fortress & $125M SAFU Reserve Fund */}
      <Security />

      {/* 10. Verified Trader Testimonials & Social Proof */}
      <HomeTestimonials />

      {/* 11. Multi-Platform Mobile App & Desktop Terminal */}
      <HomeAppDownload />

      {/* 12. Frequently Asked Questions */}
      <AboutFaq />

      {/* 13. High-Conversion Final Call To Action */}
      <CTA />
    </main>
  )
}

export default Home
