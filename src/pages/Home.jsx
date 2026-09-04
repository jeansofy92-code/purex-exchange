import Hero from '../components/Hero'
import EliteDashboardHub from '../components/home/EliteDashboardHub'
import Features from '../components/Features'
import Security from '../components/Security'
import CTA from '../components/CTA'

function Home() {
  return (
    <main className="home-page-shell">
      {/* Luxury Hero with 3D Vault Centerpiece */}
      <Hero />

      {/* Elite Live Interactive Trading Hub & Market Matrix */}
      <EliteDashboardHub />

      {/* Platform Strengths & Institutional Features */}
      <Features />

      {/* Security Fortress & SAFU Fund */}
      <Security />

      {/* High-Conversion VIP Invitation Call to Action */}
      <CTA />
    </main>
  )
}

export default Home
