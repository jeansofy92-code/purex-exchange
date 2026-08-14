import { useState, useEffect } from 'react'
import { Calculator, ArrowRight, TrendingUp, Sparkles, Shield } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { investmentPlans } from '../../data/investmentPlans'

function RoiCalculator({ preselectedPlanId }) {
  const [selectedPlan, setSelectedPlan] = useState(investmentPlans[1]) // Default to Growth Alpha
  const [depositAmount, setDepositAmount] = useState(2500)
  const [compounding, setCompounding] = useState(false)

  // Sync when parent selects plan
  useEffect(() => {
    if (preselectedPlanId) {
      const found = investmentPlans.find((p) => p.id === preselectedPlanId)
      if (found) {
        setSelectedPlan(found)
        setDepositAmount((prev) => (prev < found.minDeposit ? found.minDeposit : prev))
      }
    }
  }, [preselectedPlanId])

  // Calculation metrics
  const dailyRate = (selectedPlan.dailyMin + selectedPlan.dailyMax) / 2 / 100
  const days = selectedPlan.durationDays
  const dailyProfit = depositAmount * dailyRate

  // Simple vs compound profit calculation
  let totalNetProfit = 0
  let totalReturn = 0

  if (compounding) {
    totalReturn = depositAmount * Math.pow(1 + dailyRate, days)
    totalNetProfit = totalReturn - depositAmount
  } else {
    totalNetProfit = dailyProfit * days
    totalReturn = depositAmount + totalNetProfit
  }

  const roiPercentage = ((totalNetProfit / depositAmount) * 100).toFixed(1)

  const quickPresets = [
    { label: '$250', val: 250 },
    { label: '$1,000', val: 1000 },
    { label: '$2,500', val: 2500 },
    { label: '$5,000', val: 5000 },
    { label: '$10,000', val: 10000 },
    { label: '$25,000', val: 25000 },
  ]

  return (
    <section id="roi-calculator" className="relative py-16 sm:py-24 bg-[#060a0b] border-y border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[350px] bg-[#58e65b]/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#58e65b]/30 bg-[#183a1d]/60 px-4 py-1.5 text-xs font-bold text-[#58e65b]">
            <Calculator size={14} />
            <span>Interactive Yield Estimator</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Calculate Your{' '}
            <span className="bg-gradient-to-r from-[#58e65b] via-[#85f487] to-[#38bdf8] bg-clip-text text-transparent">
              Daily & Total Profit
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#8d9691]">
            Slide to customize your investment deposit and forecast your estimated returns with precision.
          </p>
        </div>

        {/* Main Calculator Box */}
        <div className="max-w-5xl mx-auto rounded-3xl border border-white/15 bg-[#080d0e]/95 p-6 sm:p-10 backdrop-blur-2xl shadow-[0_24px_70px_rgba(0,0,0,0.85)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            {/* Left Column: Controls & Inputs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Step 1: Select Plan Pills */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#8d9691] mb-2.5 block">
                  1. Select Investment Tier:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {investmentPlans.map((plan) => {
                    const isCurrent = selectedPlan.id === plan.id
                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => {
                          setSelectedPlan(plan)
                          if (depositAmount < plan.minDeposit) {
                            setDepositAmount(plan.minDeposit)
                          }
                        }}
                        className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                          isCurrent
                            ? 'bg-[#183a1d] text-[#58e65b] border-[#58e65b] shadow-[0_0_15px_rgba(88,230,91,0.3)]'
                            : 'bg-white/5 border-white/10 text-[#8d9691] hover:text-white hover:border-white/20'
                        }`}
                      >
                        <div className="font-extrabold">{plan.name}</div>
                        <div className="text-[0.65rem] opacity-80 mt-0.5">{plan.dailyReturn} / {plan.durationDisplay}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Step 2: Deposit Amount Input & Slider */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#8d9691]">
                    2. Investment Capital (USD):
                  </label>
                  <span className="text-xs font-semibold text-[#58e65b]">
                    Min: ${selectedPlan.minDeposit.toLocaleString()}
                  </span>
                </div>

                {/* Direct Number Input */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white font-mono font-bold text-lg">
                    $
                  </span>
                  <input
                    type="number"
                    min={selectedPlan.minDeposit}
                    max={100000}
                    step={50}
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full rounded-2xl border border-white/15 bg-black/60 pl-9 pr-4 py-3.5 text-xl sm:text-2xl font-mono font-black text-white focus:border-[#58e65b] focus:outline-none"
                  />
                </div>

                {/* Range Slider */}
                <div className="pt-2">
                  <input
                    type="range"
                    min={selectedPlan.minDeposit}
                    max={Math.max(selectedPlan.minDeposit * 10, 50000)}
                    step={100}
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(parseFloat(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#58e65b]"
                  />
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[0.7rem] text-[#8d9691] mr-1">Quick Add:</span>
                  {quickPresets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setDepositAmount(preset.val)}
                      className="px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 text-[0.7rem] font-bold text-[#dfe9e2] hover:border-[#58e65b] hover:text-[#58e65b] transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Compounding Reinvest Toggle */}
              <div className="pt-2">
                <label className="flex items-center justify-between p-3 rounded-xl border border-white/10 bg-white/[0.02] cursor-pointer hover:bg-white/[0.04] transition-colors">
                  <div className="flex items-center gap-2.5">
                    <Sparkles size={16} className="text-[#58e65b]" />
                    <div>
                      <div className="text-xs font-bold text-white">Automated Daily Compounding (Reinvest)</div>
                      <div className="text-[0.68rem] text-[#8d9691]">Compound daily profits back into strategy pool</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={compounding}
                    onChange={(e) => setCompounding(e.target.checked)}
                    className="w-4 h-4 rounded accent-[#58e65b] cursor-pointer"
                  />
                </label>
              </div>
            </div>

            {/* Right Column: Dynamic Output Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border-2 border-[#58e65b]/50 bg-gradient-to-b from-[#112415] via-[#09150d] to-[#070b0d] p-6 sm:p-7 shadow-[0_0_40px_rgba(88,230,91,0.25)] space-y-6 relative overflow-hidden">
                {/* Glow pill */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8d9691]">
                    Projected Summary
                  </span>
                  <span className="rounded-full bg-[#58e65b]/20 px-2.5 py-0.5 text-[0.68rem] font-black text-[#58e65b] border border-[#58e65b]/40">
                    {selectedPlan.name} • {selectedPlan.durationDisplay}
                  </span>
                </div>

                {/* Daily Profit */}
                <div className="space-y-1">
                  <div className="text-xs text-[#8d9691] flex items-center gap-1.5">
                    <TrendingUp size={13} className="text-[#58e65b]" />
                    <span>Estimated Daily Profit:</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-white">
                    ${dailyProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{' '}
                    <span className="text-xs font-semibold text-[#58e65b]">
                      (+{((dailyRate) * 100).toFixed(2)}%)
                    </span>
                  </div>
                </div>

                {/* Total Net Profit */}
                <div className="space-y-1">
                  <div className="text-xs text-[#8d9691]">Total Net Earnings ({days} Days):</div>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-[#58e65b] drop-shadow-[0_0_12px_rgba(88,230,91,0.4)]">
                    +${totalNetProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>

                {/* Total Return at Maturity (Capital + Profit) */}
                <div className="rounded-2xl border border-white/10 bg-black/60 p-4 space-y-2">
                  <div className="flex justify-between text-xs text-[#8d9691]">
                    <span>Initial Capital:</span>
                    <span className="font-mono text-white">${depositAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#8d9691]">
                    <span>Total ROI:</span>
                    <span className="font-mono font-bold text-[#58e65b]">+{roiPercentage}%</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                    <span>Total Payout:</span>
                    <span className="font-mono text-[#58e65b] text-base">
                      ${totalReturn.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                {/* Instant CTA Button */}
                <NavLink
                  to="/signup"
                  className="w-full py-4 rounded-2xl bg-[#58e65b] text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#48db50] shadow-[0_0_25px_rgba(88,230,91,0.5)] transition-all hover:scale-[1.02]"
                >
                  <span>Start With {selectedPlan.name}</span>
                  <ArrowRight size={16} />
                </NavLink>

                <div className="text-center text-[0.68rem] text-[#8d9691] flex items-center justify-center gap-1.5">
                  <Shield size={12} className="text-[#58e65b]" />
                  <span>100% Principal Protected by PUREX SAFU Reserve</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RoiCalculator
