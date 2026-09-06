import { useState, useId } from 'react'
import { PACKAGES } from './InvestmentPackages'
import { ShieldCheck, ArrowRight } from 'lucide-react'
import ScrollReveal from '../common/ScrollReveal'

export default function RoiCalculator() {
  const [selectedPlanId, setSelectedPlanId] = useState('pro')
  const [depositAmount, setDepositAmount] = useState(2500)
  const sliderId = useId()

  const currentPlan = PACKAGES.find(p => p.id === selectedPlanId) || PACKAGES[1]

  const handlePlanChange = (planId) => {
    setSelectedPlanId(planId)
    const plan = PACKAGES.find(p => p.id === planId)
    if (plan) {
      const mid = Math.round((plan.minDeposit + plan.maxDeposit) / 2)
      setDepositAmount(mid)
    }
  }

  const dailyProfit = depositAmount * currentPlan.roiMultiplier
  const weeklyProfit = dailyProfit * 7
  const monthlyProfit = dailyProfit * 30
  const contractDays = parseInt(currentPlan.duration) || 30
  const totalCycleProfit = dailyProfit * contractDays
  const totalReturn = depositAmount + totalCycleProfit

  return (
    <section id="calculator" className="section-spacing" style={{ backgroundColor: '#060606' }}>
      <div className="container-max">
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="pill-badge" style={{ marginBottom: '1.25rem' }}>
              <span className="pill-dot" />
              Interactive Yield Estimator
            </div>
            <h2 className="display-2" style={{ marginBottom: '1rem' }}>
              Calculate your <span className="color-accent-1">daily earnings.</span>
            </h2>
            <p style={{ color: '#939393', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>
              Select your preferred arbitrage package and slide your deposit amount to see guaranteed daily, monthly, and total cycle profits.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="finantech-card-white" style={{
            padding: '3rem 2.5rem',
            maxWidth: '1080px',
            margin: '0 auto',
            border: '1px solid #e7e7e7'
          }}>
            {/* Plan Selector Tabs with High Contrast */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '0.75rem',
              marginBottom: '2.5rem'
            }}>
              {PACKAGES.map((pkg) => {
                const isSelected = selectedPlanId === pkg.id
                return (
                  <button
                    key={pkg.id}
                    onClick={() => handlePlanChange(pkg.id)}
                    style={{
                      backgroundColor: isSelected ? '#060606' : '#f5f5f5',
                      color: isSelected ? '#ffffff' : '#060606',
                      border: '1px solid',
                      borderColor: isSelected ? '#060606' : '#e2e2e2',
                      borderRadius: '12px',
                      padding: '0.85rem 1rem',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.2rem',
                      boxShadow: isSelected ? '0 6px 16px rgba(0,0,0,0.15)' : 'none'
                    }}
                  >
                    <span>{pkg.name}</span>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      color: isSelected ? '#B0F127' : '#717172'
                    }}>
                      {pkg.dailyRoi}
                    </span>
                  </button>
                )
              })}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3rem',
              alignItems: 'center'
            }}>
              {/* Left Side: Deposit Slider & Plan Specs */}
              <div>
                <div style={{ marginBottom: '1.75rem' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.75rem'
                  }}>
                    <label htmlFor={sliderId} style={{ fontSize: '0.9rem', color: '#555555', fontWeight: 700 }}>
                      Select Investment Capital:
                    </label>
                    <span style={{
                      fontSize: '1.75rem',
                      fontWeight: 800,
                      color: '#060606',
                      fontFamily: 'var(--font-mono)'
                    }}>
                      ${depositAmount.toLocaleString()}
                    </span>
                  </div>

                  <input
                    id={sliderId}
                    type="range"
                    min={currentPlan.minDeposit}
                    max={currentPlan.maxDeposit}
                    step={currentPlan.minDeposit >= 1000 ? 100 : 25}
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(Number(e.target.value))}
                    style={{
                      width: '100%',
                      height: '8px',
                      borderRadius: '4px',
                      background: '#e0e0e0',
                      accentColor: '#060606',
                      cursor: 'pointer'
                    }}
                  />

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.75rem',
                    color: '#717172',
                    marginTop: '0.5rem',
                    fontWeight: 600
                  }}>
                    <span>Min: ${currentPlan.minDeposit.toLocaleString()}</span>
                    <span>Max: ${currentPlan.maxDeposit.toLocaleString()}</span>
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#f8f8f8',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: '1px solid #e8e8e8',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: '#666666' }}>Selected Tier:</span>
                    <strong style={{ color: '#060606' }}>{currentPlan.name}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: '#666666' }}>Assigned Trading Engine:</span>
                    <strong style={{ color: '#060606', backgroundColor: '#e2f7b8', padding: '0.15rem 0.5rem', borderRadius: '6px' }}>{currentPlan.tradingTeam}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: '#666666' }}>Capital Protection:</span>
                    <strong style={{ color: '#060606', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <ShieldCheck size={16} color="#05C168" /> 100% Insured SAFU
                    </strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: '#666666' }}>Contract Duration:</span>
                    <strong style={{ color: '#060606' }}>{currentPlan.duration}</strong>
                  </div>
                </div>
              </div>

              {/* Right Side: Calculation Results Display */}
              <div style={{
                backgroundColor: '#0c0c0c',
                border: '1px solid #282828',
                borderRadius: '20px',
                padding: '2rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #1f1f1f',
                  paddingBottom: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <span style={{ fontSize: '0.85rem', color: '#939393', fontWeight: 600 }}>PROFIT BREAKDOWN</span>
                  <span style={{
                    fontSize: '0.75rem',
                    backgroundColor: '#181818',
                    color: '#B0F127',
                    border: '1px solid #282828',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '999px',
                    fontWeight: 700
                  }}>
                    {currentPlan.dailyRoi}
                  </span>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.8rem', color: '#717172', fontWeight: 600 }}>DAILY NET PROFIT (PAID EVERY 24H)</div>
                  <div style={{
                    fontSize: '2.5rem',
                    fontWeight: 800,
                    color: '#B0F127',
                    fontFamily: 'var(--font-mono)',
                    lineHeight: 1.1,
                    marginTop: '0.2rem'
                  }}>
                    +${dailyProfit.toFixed(2)}
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1rem',
                  marginBottom: '1.75rem'
                }}>
                  <div style={{ backgroundColor: '#141414', padding: '1rem', borderRadius: '12px', border: '1px solid #232323' }}>
                    <div style={{ fontSize: '0.7rem', color: '#717172' }}>WEEKLY PROFIT</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)', marginTop: '0.15rem' }}>
                      +${weeklyProfit.toFixed(2)}
                    </div>
                  </div>

                  <div style={{ backgroundColor: '#141414', padding: '1rem', borderRadius: '12px', border: '1px solid #232323' }}>
                    <div style={{ fontSize: '0.7rem', color: '#717172' }}>30-DAY PROFIT</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)', marginTop: '0.15rem' }}>
                      +${monthlyProfit.toFixed(2)}
                    </div>
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#141414',
                  padding: '1.25rem',
                  borderRadius: '14px',
                  border: '1px solid #232323',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.85rem' }}>
                    <span style={{ color: '#939393' }}>Initial Capital Backing:</span>
                    <span style={{ color: '#fff', fontWeight: 700 }}>${depositAmount.toLocaleString()} (100% Insured)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.85rem' }}>
                    <span style={{ color: '#939393' }}>Total Net Profit ({currentPlan.duration}):</span>
                    <span style={{ color: '#B0F127', fontWeight: 700 }}>+${totalCycleProfit.toFixed(2)}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '0.6rem',
                    borderTop: '1px solid #232323',
                    fontSize: '0.95rem'
                  }}>
                    <strong style={{ color: '#fff' }}>Total Capital & Return:</strong>
                    <strong style={{ color: '#B0F127', fontSize: '1.1rem' }}>${totalReturn.toFixed(2)}</strong>
                  </div>
                </div>

                <a
                  href="#packages"
                  className="btn-primary"
                  style={{ width: '100%', padding: '0.9rem', fontSize: '0.95rem' }}
                >
                  Invest ${depositAmount.toLocaleString()} in {currentPlan.name}
                  <ArrowRight size={18} strokeWidth={2.5} />
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
