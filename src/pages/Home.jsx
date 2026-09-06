import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LiveNetworkBackground from '../components/home/LiveNetworkBackground'
import HeroCommandCenter from '../components/home/HeroCommandCenter'
import LiveActivityFeed from '../components/home/LiveActivityFeed'
import MarketDiscoveryHub from '../components/home/MarketDiscoveryHub'
import StakingYieldMatrix from '../components/home/StakingYieldMatrix'
import CopyTradingLeaderboard from '../components/home/CopyTradingLeaderboard'
import ProofOfReservesSecurity from '../components/home/ProofOfReservesSecurity'
import HomeTestimonials from '../components/home/HomeTestimonials'
import HomeFaqSection from '../components/home/HomeFaqSection'
import TerminalCTA from '../components/home/TerminalCTA'

function Home() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <main className="relative min-h-screen bg-[#11142c] text-slate-100 overflow-x-hidden">
      {/* 1. Interactive Ambient Cosmic Canvas & Starry Diamond Background */}
      <LiveNetworkBackground />

      {/* Foreground Content Shell - Tight, dense spacing */}
      <div className="relative z-10 space-y-3 sm:space-y-4 pb-8">
        {/* 2. Institutional Hero Command Center with Live Interactive Terminal */}
        <HeroCommandCenter />

        {/* 3. Live Payouts & Settlement Stream */}
        <LiveActivityFeed />

        {/* 4. Complete Market Discovery Hub, Fear/Greed Sentiment & Network Gas Pulse */}
        <MarketDiscoveryHub />

        {/* 5. Interactive High-Yield Staking & Algorithmic Wealth Matrix */}
        <StakingYieldMatrix />

        {/* 6. Algorithmic Copy Trading & Hedge Fund Masters Leaderboard */}
        <CopyTradingLeaderboard />

        {/* 7. 100% Cryptographic Merkle Proof of Reserves & $125M SAFU Fortress */}
        <ProofOfReservesSecurity />

        {/* 8. Verified Trader Testimonials & Quantitative Social Proof */}
        <HomeTestimonials />

        {/* 9. Frequently Asked Questions & 24/7 Human Help Desk */}
        <HomeFaqSection />

        {/* 10. High-Conversion Terminal Call To Action */}
        <TerminalCTA />
      </div>
    </main>
  )
}

export default Home
