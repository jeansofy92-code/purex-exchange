import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, ShieldCheck, ArrowRight, Zap, Sparkles } from 'lucide-react'
import ScrollReveal from '../common/ScrollReveal'

export const PACKAGES = [
  {
    id: 'starter',
    name: 'Starter Arbitrage',
    badge: 'Novice Friendly',
    description: 'Automated daily returns for beginner crypto investors.',
    minDeposit: 100,
    maxDeposit: 999,
    dailyRoi: '1.5% Daily',
    monthlyRoi: '45.0% / mo',
    maxWithdrawal: '$500 / day',
    tradingTeam: 'Level-1 AI Bot',
    duration: '15 Days',
    isPopular: false,
    isWhiteCard: false,
    features: [
      '1.5% Daily Guaranteed Profit',
      'Min: $100 — Max: $999 deposit',
      '100% Principal SAFU Insurance',
      'Instant Daily Auto Payouts'
    ]
  },
  {
    id: 'pro',
    name: 'Pro Quant Bot',
    badge: 'Most Popular',
    description: 'Multi-exchange triangular arbitrage with high daily yield.',
    minDeposit: 1000,
    maxDeposit: 4999,
    dailyRoi: '2.4% Daily',
    monthlyRoi: '72.0% / mo',
    maxWithdrawal: '$2,500 / day',
    tradingTeam: 'Quant Bot Cluster',
    duration: '30 Days',
    isPopular: true,
    isWhiteCard: true, // Signature White Card
    features: [
      '2.4% Daily Guaranteed Profit',
      'Min: $1,000 — Max: $4,999 deposit',
      '6-Exchange Triangular Routing',
      'Sub-25ms High-Speed Arbitrage'
    ]
  },
  {
    id: 'elite',
    name: 'Elite Desk',
    badge: 'High Yield',
    description: 'Managed by senior quant traders and neural AI desks.',
    minDeposit: 5000,
    maxDeposit: 24999,
    dailyRoi: '3.5% Daily',
    monthlyRoi: '105.0% / mo',
    maxWithdrawal: '$15,000 / day',
    tradingTeam: 'Senior Quant Desk',
    duration: '45 Days',
    isPopular: false,
    isWhiteCard: false,
    features: [
      '3.5% Daily Guaranteed Profit',
      'Min: $5,000 — Max: $24,999 deposit',
      '12-Exchange Cross-Liquidity',
      'Dedicated Quant Account Manager'
    ]
  },
  {
    id: 'vip',
    name: 'VIP Syndicate',
    badge: 'Institutional Master',
    description: 'High-volume syndicate with co-located exchange servers.',
    minDeposit: 25000,
    maxDeposit: 100000,
    dailyRoi: '4.8% Daily',
    monthlyRoi: '144.0% / mo',
    maxWithdrawal: 'Unlimited',
    tradingTeam: 'Chief Quant Officers',
    duration: '60 Days',
    isPopular: false,
    isWhiteCard: false,
    features: [
      '4.8% Daily Guaranteed Profit',
      'Min: $25,000 — Max: $100k+ deposit',
      'Unlimited Instant 0% Fee Withdrawals',
      'Sub-5ms Co-located Server Trading'
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
            const isWhite = pkg.isWhiteCard

            return (
              <ScrollReveal key={pkg.id} delay={0.1 * idx}>
                <div
                  onClick={() => setSelectedPlan(pkg.id)}
                  className={isWhite ? 'finantech-card-white' : 'finantech-card'}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '1.5rem 1.35rem',
                    cursor: 'pointer',
                    height: '100%',
                    borderColor: isSelected && !isWhite ? '#B0F127' : isWhite ? '#e7e7e7' : '#232323'
                  }}
                >
                  <div>
                    {/* Top Header Badge */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.85rem'
                    }}>
                      <span style={{
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        backgroundColor: isWhite ? '#060606' : '#1e1e1e',
                        color: isWhite ? '#B0F127' : '#e7e7e7',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '999px'
                      }}>
                        {pkg.badge}
                      </span>

                      <span style={{
                        fontSize: '0.72rem',
                        color: isWhite ? '#060606' : '#B0F127',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontWeight: 700
                      }}>
                        <ShieldCheck size={14} color={isWhite ? '#060606' : '#B0F127'} /> 100% SAFU
                      </span>
                    </div>

                    {/* Plan Name */}
                    <h3 style={{
                      fontSize: '1.2rem',
                      fontWeight: 800,
                      color: isWhite ? '#060606' : '#fff',
                      marginBottom: '0.25rem'
                    }}>
                      {pkg.name}
                    </h3>
                    <p style={{
                      fontSize: '0.8rem',
                      color: isWhite ? '#555555' : '#939393',
                      lineHeight: 1.4,
                      marginBottom: '0.9rem'
                    }}>
                      {pkg.description}
                    </p>

                    {/* Daily ROI Compact Box */}
                    <div style={{
                      backgroundColor: isWhite ? '#f4f4f4' : '#0c0c0c',
                      border: '1px solid',
                      borderColor: isWhite ? '#e5e5e5' : '#232323',
                      borderRadius: '12px',
                      padding: '0.75rem 0.9rem',
                      marginBottom: '0.85rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div>
                        <div style={{
                          fontSize: '0.68rem',
                          color: '#717172',
                          fontWeight: 700,
                          textTransform: 'uppercase'
                        }}>
                          Daily Return
                        </div>
                        <div style={{
                          fontSize: '1.6rem',
                          fontWeight: 800,
                          color: isWhite ? '#060606' : '#B0F127',
                          lineHeight: 1.1,
                          marginTop: '0.1rem'
                        }}>
                          {pkg.dailyRoi}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{
                          fontSize: '0.75rem',
                          color: isWhite ? '#060606' : '#e7e7e7',
                          fontWeight: 700,
                          backgroundColor: isWhite ? '#e5e5e5' : '#181818',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '6px'
                        }}>
                          {pkg.monthlyRoi}
                        </span>
                      </div>
                    </div>

                    {/* Compact Specs Box */}
                    <div style={{
                      backgroundColor: isWhite ? '#f9f9f9' : '#141414',
                      borderRadius: '10px',
                      padding: '0.65rem 0.85rem',
                      marginBottom: '1rem',
                      fontSize: '0.78rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem',
                      border: '1px solid',
                      borderColor: isWhite ? '#eeeeee' : '#202020'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#717172' }}>Deposit:</span>
                        <strong style={{ color: isWhite ? '#060606' : '#fff' }}>${pkg.minDeposit.toLocaleString()} – ${pkg.maxDeposit.toLocaleString()}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#717172' }}>Duration:</span>
                        <strong style={{ color: isWhite ? '#060606' : '#B0F127' }}>{pkg.duration}</strong>
                      </div>
                    </div>

                    {/* Compact Features List */}
                    <div style={{ marginBottom: '1.25rem' }}>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                        {pkg.features.map((feat, fIdx) => (
                          <li key={fIdx} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            fontSize: '0.8rem',
                            color: isWhite ? '#333333' : '#c5c5c5'
                          }}>
                            <Check size={14} color={isWhite ? '#060606' : '#B0F127'} style={{ flexShrink: 0 }} strokeWidth={2.5} />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Button */}
                  <Link
                    to="/register"
                    className={isWhite ? 'btn-black' : 'btn-secondary'}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      textAlign: 'center',
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem',
                      textDecoration: 'none'
                    }}
                  >
                    Select {pkg.name}
                    <ArrowRight size={15} strokeWidth={2.5} />
                  </Link>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
