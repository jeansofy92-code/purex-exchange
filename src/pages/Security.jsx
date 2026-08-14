import SecurityHero from '../components/security/SecurityHero'
import SecurityArchitecture from '../components/security/SecurityArchitecture'
import SecurityScoreSimulator from '../components/security/SecurityScoreSimulator'
import SafuFundSection from '../components/security/SafuFundSection'
import ComplianceBounty from '../components/security/ComplianceBounty'
import SecurityFaq from '../components/security/SecurityFaq'
import CTA from '../components/CTA'

function SecurityPage() {
  return (
    <main className="home-page-shell min-h-screen text-white">
      {/* 1. Hero with live system health & holographic shield */}
      <SecurityHero />

      {/* 2. Four-Layer Defense in Depth Architecture */}
      <SecurityArchitecture />

      {/* 3. Interactive Account Security Health Score Simulator */}
      <SecurityScoreSimulator />

      {/* 4. $100M SAFU Emergency Reserve & Proof of Reserves */}
      <SafuFundSection />

      {/* 5. Compliance Certifications & $2.5M Bug Bounty Program */}
      <ComplianceBounty />

      {/* 6. Security FAQs & Emergency Self-Lockdown Guide */}
      <SecurityFaq />

      {/* 7. Final Call to Action */}
      <CTA />
    </main>
  )
}

export default SecurityPage
