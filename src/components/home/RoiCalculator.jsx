import { useState, useId } from 'react'
import { PACKAGES } from './InvestmentPackages'
import { Calculator, ShieldCheck, ArrowRight, Zap, CheckCircle2, TrendingUp, DollarSign } from 'lucide-react'

export default function RoiCalculator() {
  const [selectedPlanId, setSelectedPlanId] = useState('pro')
  const [depositAmount, setDepositAmount] = useState(2500)
  const sliderId = useId()

  const currentPlan = PACKAGES.find(p => p.id === selectedPlanId) || PACKAGES[1]

  // Handlers for plan switch
  const handlePlanChange = (planId) => {
    setSelectedPlanId(planId)
    const plan = PACKAGES.find(p => p.id === planId)
    if (plan) {
      // Set to middle of range or min
      const mid = Math.round((plan.minDeposit + plan.maxDeposit) / 2)
      setDepositAmount(mid)
    }
  }

  // Calculations
  const dailyProfit = depositAmount * currentPlan.roiMultiplier
  const weeklyProfit = dailyProfit * 7
  const monthlyProfit = dailyProfit * 30
  const contractDays = parseInt(currentPlan.duration) || 30
  const totalCycleProfit = dailyProfit * contractDays
  const totalReturn = depositAmount + totalCycleProfit

  return (
    <section id="calculator" className="section-spacing" style={{ backgroundColor: '#060606' }}>
      <div className="container-max">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="pill-badge" style={{ marginBottom: '1.25rem' }}>
            <span className="pill-dot" />
            Interactive Yield Estimator
          </div>
          <h2 className="display-2" style={{ marginBottom: '1rem' }}>
            Calculate your <span className="color-accent-1">daily earnings.</span>
          </h2>
          <p style={{ color: '#c5c5c5', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>
            Select your preferred arbitrage package and slide your deposit amount to see guaranteed daily, monthly, and total cycle profits.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="finantech-card" style={{
          backgroundColor: '#111111',
          padding: '3rem 2.5rem',
          maxWidth: '1080px',
          margin: '0 auto',
          border: '1px solid #282828'
        }}>
          {/* Plan Selector Tabs */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '0.75rem',
            marginBottom: '2.5rem'
          }}>
            {PACKAGES.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => handlePlanChange(pkg.id)}
                style={{
                  backgroundColor: selectedPlanId === pkg.id ? '#B0F127' : '#181818',
                  color: selectedPlanId === pkg.id ? '#060606' : '#e7e7e7',
                  border: '1px solid',
                  borderColor: selectedPlanId === pkg.id ? '#B0F127' : '#282828',
                  borderRadius: '12px',
                  padding: '0.85rem 1rem',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.2rem'
                }}
              >
                <span>{pkg.name}</span>
                <span style={{
                  fontSize: '0.75rem',
                  opacity: selectedPlanId === pkg.id ? 0.9 : 0.6
                }}>
                  {pkg.dailyRoi}
                </span>
              </button>
            ))}
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
                  <label htmlFor={sliderId} style={{ fontSize: '0.9rem', color: '#939393', fontWeight: 600 }}>
                    Select Investment Capital:
                  </label>
                  <span style={{
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    color: '#B0F127',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    ${depositAmount.toLocaleString()}
                  </span>
                </div>

                {/* Range Slider */}
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
                    background: '#282828',
                    accentColor: '#B0F127',
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

              {/* Package Details Overview */}
              <div style={{
                backgroundColor: '#181818',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid #282828',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: '#939393' }}>Selected Tier:</span>
                  <strong style={{ color: '#fff' }}>{currentPlan.name}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: '#939393' }}>Assigned Trading Engine:</span>
                  <strong style={{ color: '#B0F127' }}>{currentPlan.tradingTeam}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: '#939393' }}>Capital Protection:</span>
                  <strong style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <ShieldCheck size={14} color="#B0F127" /> 100% Insured SAFU
                  </strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: '#939393' }}>Contract Duration:</span>
                  <strong style={{ color: '#fff' }}>{currentPlan.duration}</strong>
                </div>
              </div>
            </div>

            {/* Right Side: Calculation Results Display */}
            <div style={{
              backgroundColor: '#0c0c0c',
              border: '1px solid rgba(176, 241, 39, 0.35)',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 0 30px rgba(176, 241, 39, 0.08)'
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
                  backgroundColor: 'rgba(176, 241, 39, 0.1)',
                  color: '#B0F127',
                  padding: '0.25rem 0.6rem',
                  borderRadius: '999px',
                  fontWeight: 700
                }}>
                  {currentPlan.dailyRoi}
                </span>
              </div>

              {/* Daily Earnings Highlight */}
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

              {/* Multi-Period Metrics */}
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

              {/* Total Payout Summary */}
              <div style={{
                backgroundColor: '#141414',
                padding: '1.25rem',
                borderRadius: '14px',
                border: '1px solid #282828',
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
                  borderTop: '1px solid #282828',
                  fontSize: '0.95rem'
                }}>
                  <strong style={{ color: '#fff' }}>Total Capital & Return:</strong>
                  <strong style={{ color: '#B0F127', fontSize: '1.1rem' }}>${totalReturn.toFixed(2)}</strong>
                </div>
              </div>

              {/* CTA Button */}
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
      </div>
    </section>
  )
}
