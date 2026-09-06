import { useState } from 'react'
import { CheckCircle2, ShieldCheck, Zap, ArrowRight, Play, Cpu, TrendingUp } from 'lucide-react'
import ScrollReveal from '../common/ScrollReveal'

export default function InteractiveSteps() {
  const [activeTab, setActiveTab] = useState(0)

  const steps = [
    {
      step: '01',
      title: 'Choose your investment package',
      desc: 'Select from our Starter to VIP Syndicate packages based on your deposit preferences and daily yield targets. Every package is backed by our 100% Capital Insurance policy.',
      tag: 'From $100 entry',
      icon: Zap
    },
    {
      step: '02',
      title: 'AI bots & quant desks trade daily',
      desc: 'Our high-frequency trading algorithm scans price spreads across Binance, Coinbase, Kraken, and OKX 24/7, executing riskless triangular arbitrage within 20 milliseconds.',
      tag: 'Sub-20ms execution',
      icon: Cpu
    },
    {
      step: '03',
      title: 'Collect daily compounded profits',
      desc: 'Daily profits are calculated and deposited into your balance every 24 hours. Withdraw instantly to any wallet or reinvest to compound your yield.',
      tag: 'Instant withdrawals',
      icon: TrendingUp
    }
  ]

  return (
    <section className="section-spacing" style={{ backgroundColor: '#060606' }}>
      <div className="container-max">
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="pill-badge" style={{ marginBottom: '1.25rem' }}>
              <span className="pill-dot" />
              Effortless 3-Step Process
            </div>
            <h2 className="display-2">
              Watch how easy is to use <span className="color-accent-1">Purex platform.</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="finantech-card-white" style={{
            padding: '2.75rem',
            border: '1px solid #e7e7e7'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3rem',
              alignItems: 'center'
            }}>
              {/* Left Side: Interactive Step Visual (Dark Contrast Box) */}
              <div style={{
                backgroundColor: '#060606',
                border: '1px solid #232323',
                borderRadius: '20px',
                padding: '2.25rem',
                minHeight: '360px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 20px 40px rgba(0,0,0,0.12)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontSize: '0.8rem',
                    color: '#B0F127',
                    fontWeight: 700,
                    backgroundColor: '#181818',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #282828'
                  }}>
                    STEP {steps[activeTab].step} PREVIEW
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#939393' }}>
                    {steps[activeTab].tag}
                  </span>
                </div>

                {activeTab === 0 && (
                  <div style={{ padding: '1.5rem 0' }}>
                    <div style={{ fontSize: '0.8rem', color: '#717172', textTransform: 'uppercase' }}>SELECTED PLAN</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginTop: '0.25rem' }}>Pro Quant Bot Tier</div>
                    <div style={{ fontSize: '1rem', color: '#B0F127', fontWeight: 700, marginTop: '0.25rem' }}>2.4% Daily Yield | $1,000 – $4,999</div>
                    <div style={{ marginTop: '1.25rem', padding: '0.85rem', backgroundColor: '#141414', borderRadius: '10px', fontSize: '0.85rem', color: '#e7e7e7', border: '1px solid #232323' }}>
                      ✓ Multi-exchange arbitrage cluster activated
                    </div>
                  </div>
                )}

                {activeTab === 1 && (
                  <div style={{ padding: '1.5rem 0' }}>
                    <div style={{ fontSize: '0.8rem', color: '#717172', textTransform: 'uppercase' }}>LIVE BOT ARBITRAGE STREAM</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#B0F127', marginTop: '0.25rem' }}>14 Trades Executed / Sec</div>
                    <div style={{ fontSize: '0.9rem', color: '#fff', marginTop: '0.25rem' }}>Binance ↔ Coinbase spread: +0.64% profit</div>
                    <div style={{ marginTop: '1.25rem', padding: '0.85rem', backgroundColor: '#141414', borderRadius: '10px', fontSize: '0.85rem', color: '#e7e7e7', border: '1px solid #232323' }}>
                      ✓ 100% Capital Risk-Shield Enabled
                    </div>
                  </div>
                )}

                {activeTab === 2 && (
                  <div style={{ padding: '1.5rem 0' }}>
                    <div style={{ fontSize: '0.8rem', color: '#717172', textTransform: 'uppercase' }}>DAILY ACCRUED BALANCE</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#B0F127', marginTop: '0.25rem' }}>+$240.00 Credited</div>
                    <div style={{ fontSize: '0.9rem', color: '#fff', marginTop: '0.25rem' }}>Next payout in: 06h 42m 18s</div>
                    <div style={{ marginTop: '1.25rem', padding: '0.85rem', backgroundColor: '#141414', borderRadius: '10px', fontSize: '0.85rem', color: '#e7e7e7', border: '1px solid #232323' }}>
                      ✓ Instant withdraw to USDT/BTC/ETH anytime
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#B0F127' }}>
                  <ShieldCheck size={16} /> 100% Capital Guaranteed & Insured
                </div>
              </div>

              {/* Right Side: Step Tabs List with High Contrast */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {steps.map((item, idx) => {
                  const isActive = activeTab === idx
                  const Icon = item.icon

                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveTab(idx)}
                      style={{
                        padding: '1.35rem 1.6rem',
                        borderRadius: '16px',
                        backgroundColor: isActive ? '#060606' : '#f8f8f8',
                        border: '1px solid',
                        borderColor: isActive ? '#060606' : '#e8e8e8',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                        boxShadow: isActive ? '0 8px 20px rgba(0,0,0,0.12)' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{
                            fontSize: '0.95rem',
                            fontWeight: 800,
                            color: isActive ? '#B0F127' : '#939393'
                          }}>
                            {item.step}
                          </span>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: isActive ? '#ffffff' : '#060606' }}>
                            {item.title}
                          </h3>
                        </div>
                        <Icon size={20} color={isActive ? '#B0F127' : '#555555'} />
                      </div>
                      <p style={{
                        fontSize: '0.875rem',
                        color: isActive ? '#c5c5c5' : '#555555',
                        lineHeight: 1.6,
                        paddingLeft: '1.75rem'
                      }}>
                        {item.desc}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
