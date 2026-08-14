import Hero from '../components/Hero'
import CryptoTicker from '../components/CryptoTicker'
import Features from '../components/Features'
import MarketOverview from '../components/MarketOverview'
import Stats from '../components/Stats'
import Security from '../components/Security'
import CTA from '../components/CTA'

function Home() {
  return (
    <main className="home-page-shell home-page-shell--world-map">
      <div className="home-page-world-map" aria-hidden="true" />
      <Hero />
      <CryptoTicker />
      <Features />
      <MarketOverview />
      <Stats />
      <Security />
      <CTA />
    </main>
  )
}

export default Home
