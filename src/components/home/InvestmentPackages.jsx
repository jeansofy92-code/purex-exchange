import { useState } from 'react'
import { Check, ShieldCheck, ArrowRight } from 'lucide-react'
import ScrollReveal from '../common/ScrollReveal'

export const PACKAGES = [
  {
    id: 'starter',
    name: 'Starter Arbitrage',
    badge: 'Novice Friendly',
    description: 'Perfect for beginners looking for consistent automated daily returns with zero technical experience.',
    minDeposit: 100,
    maxDeposit: 999,
    dailyRoi: '1.5% Daily',
    roiMultiplier: 0.015,
    monthlyRoi: '45.0% / month',
    profitLimit: 'Up to $15.00 / day',
    minWithdrawal: '$10',
    maxWithdrawal: '$500 / day',
    tradingTeam: 'Level-1 AI Algorithmic Bot',
    duration: '15 Days (Capital Return)',
    isPopular: false,
    highlight: false,
    features: [
      '1.5% Daily Guaranteed Profit',
      'Min Deposit: $100 — Max: $999',
      '100% Principal Insurance SAFU',
      'Daily Automatic Payouts',
      'Standard 2-Exchange Arbitrage (Binance / OKX)',
      'Withdrawal Limit: $500 / day',
      '24/7 Community Support'
    ]
  },
  {
    id: 'pro',
    name: 'Pro Quant Bot',
    badge: 'Most Popular',
    description: 'Advanced multi-exchange cross-arbitrage with enhanced bot speed and higher daily yield.',
    minDeposit: 1000,
    maxDeposit: 4999,
    dailyRoi: '2.4% Daily',
    roiMultiplier: 0.024,
    monthlyRoi: '72.0% / month',
    profitLimit: 'Up to $120.00 / day',
    minWithdrawal: '$20',
    maxWithdrawal: '$2,500 / day',
    tradingTeam: 'Pro Quant Algorithmic Cluster',
    duration: '30 Days (Capital Return)',
    isPopular: true,
    highlight: true,
    features: [
      '2.4% Daily Guaranteed Profit',
      'Min Deposit: $1,000 — Max: $4,999',
      '100% Capital Insurance Protection',
      'Instant Daily Payout Compounding',
      'Triangular Arbitrage (6 Major Exchanges)',
      'Sub-25ms High Speed Execution',
      'Withdrawal Limit: $2,500 / day',
      'Priority 24/7 Dedicated Support'
    ]
  },
  {
    id: 'elite',
    name: 'Elite Desk',
    badge: 'High Yield',
    description: 'Institutional-grade arbitrage execution managed by senior quantitative traders and AI neural bots.',
    minDeposit: 5000,
    maxDeposit: 24999,
    dailyRoi: '3.5% Daily',
    roiMultiplier: 0.035,
    monthlyRoi: '105.0% / month',
    profitLimit: 'Up to $875.00 / day',
    minWithdrawal: '$50',
    maxWithdrawal: '$15,000 / day',
    tradingTeam: 'Dedicated Senior Quant Trading Desk',
    duration: '45 Days (Capital Return)',
    isPopular: false,
    highlight: false,
    features: [
      '3.5% Daily Guaranteed Profit',
      'Min Deposit: $5,000 — Max: $24,999',
      '100% Full Tier-1 Insurance Policy',
      'Instant Auto Payout Direct to Wallet',
      'Global 12-Exchange Cross-Liquidity Routing',
      'Flash-Loan Zero Capital Arbitrage Tools',
      'Withdrawal Limit: $15,000 / day',
      'VIP Personal Account Manager'
    ]
  },
  {
    id: 'vip',
    name: 'VIP Syndicate',
    badge: 'Institutional Master',
    description: 'Bespoke high-volume quant syndicate trading with co-located exchange servers and highest tier profit allocation.',
    minDeposit: 25000,
    maxDeposit: 100000,
    dailyRoi: '4.8% Daily',
    roiMultiplier: 0.048,
    monthlyRoi: '144.0% / month',
    profitLimit: 'Unlimited / Custom',
    minWithdrawal: '$100',
    maxWithdrawal: 'Unlimited / Instant',
    tradingTeam: 'Chief Quant Officers & Dedicated Bot Swarm',
    duration: '60 Days (Capital Return)',
    isPopular: false,
    highlight: false,
    features: [
      '4.8% Daily Guaranteed Profit',
      'Min Deposit: $25,000 — Max: $100,000+',
      '100% Principal Full Coverage Reserve',
      'Institutional Flash Liquidity Desk',
      'Unlimited Instant Withdrawals (0% Fee)',
      'Sub-5ms Co-located Server Arbitrage',
      'Custom Multi-Asset Strategy Balancing',
      'Direct Private Telegram with Chief Traders'
    ]
  }
]

export default function InvestmentPackages() {
  const [selectedPlan, setSelectedPlan] = useState('pro')

  return (
    <section id="packages" className="section-spacing" style={{ backgroundColor: '#060606' }}>
      <div className="container-max">
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="pill-badge" style={{ marginBottom: '1.25rem' }}>
              <span className="pill-dot" />
              Transparent Investment Tiers
            </div>
            <h2 className="display-2" style={{ marginBottom: '1rem' }}>
              Choose your <span className="color-accent-1">investment package.</span>
            </h2>
            <p style={{ color: '#939393', maxWidth: '640px', margin: '0 auto', fontSize: '1.05rem' }}>
              Every package is backed by our 100% Capital Insurance Guarantee. Higher packages unlock more advanced quant trading desks, multi-exchange triangular bots, and higher daily profit limits.
            </p>
          </div>
        </ScrollReveal>

        {/* Packages Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.75rem',
          alignItems: 'stretch'
        }}>
          {PACKAGES.map((pkg, idx) => {
            const isSelected = selectedPlan === pkg.id

            return (
              <ScrollReveal key={pkg.id} delay={0.1 * idx}>
                <div
                  onClick={() => setSelectedPlan(pkg.id)}
                  className={`finantech-card ${pkg.highlight ? 'finantech-card-highlight' : ''}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '2.25rem 1.75rem',
                    cursor: 'pointer',
                    height: '100%',
                    borderColor: isSelected ? '#B0F127' : pkg.highlight ? 'rgba(176, 241, 39, 0.4)' : '#232323'
                  }}
                >
                  <div>
                    {/* Top Header Badge */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1.25rem'
                    }}>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        backgroundColor: pkg.highlight ? '#B0F127' : '#1e1e1e',
                        color: pkg.highlight ? '#060606' : '#e7e7e7',
                        padding: '0.3rem 0.75rem',
                        borderRadius: '999px'
                      }}>
                        {pkg.badge}
                      </span>

                      <span style={{
                        fontSize: '0.75rem',
                        color: '#B0F127',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontWeight: 600
                      }}>
                        <ShieldCheck size={14} color="#B0F127" /> 100% Insured
                      </span>
                    </div>

                    {/* Plan Name */}
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
                      {pkg.name}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#939393', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                      {pkg.description}
                    </p>

                    {/* Daily ROI Box */}
                    <div style={{
                      backgroundColor: '#0c0c0c',
                      border: '1px solid #232323',
                      borderRadius: '14px',
                      padding: '1.25rem',
                      marginBottom: '1.5rem'
                    }}>
                      <div style={{ fontSize: '0.75rem', color: '#717172', fontWeight: 600, textTransform: 'uppercase' }}>
                        DAILY RETURN RATE
                      </div>
                      <div style={{
                        fontSize: '2.1rem',
                        fontWeight: 800,
                        color: '#B0F127',
                        lineHeight: 1.1,
                        marginTop: '0.2rem'
                      }}>
                        {pkg.dailyRoi}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#e7e7e7', marginTop: '0.35rem', fontWeight: 600 }}>
                        Yield: {pkg.monthlyRoi}
                      </div>
                    </div>

                    {/* Limits Summary Box */}
                    <div style={{
                      backgroundColor: '#181818',
                      borderRadius: '12px',
                      padding: '1rem',
                      marginBottom: '1.5rem',
                      fontSize: '0.8rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      border: '1px solid #232323'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#717172' }}>Deposit Range:</span>
                        <strong style={{ color: '#fff' }}>${pkg.minDeposit.toLocaleString()} – ${pkg.maxDeposit.toLocaleString()}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#717172' }}>Daily Withdrawal:</span>
                        <strong style={{ color: '#B0F127' }}>{pkg.maxWithdrawal}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#717172' }}>Trading Desk:</span>
                        <strong style={{ color: '#e7e7e7', textAlign: 'right' }}>{pkg.tradingTeam}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#717172' }}>Contract Cycle:</span>
                        <strong style={{ color: '#fff' }}>{pkg.duration}</strong>
                      </div>
                    </div>

                    {/* Features List */}
                    <div style={{ marginBottom: '2rem' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#e7e7e7', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Included Privileges:
                      </div>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                        {pkg.features.map((feat, fIdx) => (
                          <li key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.825rem', color: '#c5c5c5' }}>
                            <Check size={16} color="#B0F127" style={{ flexShrink: 0, marginTop: '2px' }} strokeWidth={2.5} />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Select Button */}
                  <a
                    href="#calculator"
                    className={pkg.highlight ? 'btn-primary' : 'btn-secondary'}
                    style={{
                      width: '100%',
                      padding: '0.85rem',
                      textAlign: 'center',
                      fontSize: '0.9rem',
                      fontWeight: 700
                    }}
                  >
                    Select {pkg.name}
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </a>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
