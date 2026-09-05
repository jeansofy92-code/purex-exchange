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
    <section id="roi-calculator" className="relative py-16 sm:py-24 bg-[#0c0e22] border-y border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[350px] bg-[#ff7a00]/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#ff7a00]/30 bg-[#ff7a00]/15 px-4 py-1.5 text-xs font-bold text-[#ff7a00]">
            <Calculator size={14} />
            <span>Interactive Yield Estimator</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Calculate Your{' '}
            <span className="bg-gradient-to-r from-[#ff7a00] via-[#ff9500] to-[#ffaa33] bg-clip-text text-transparent">
              Daily & Total Profit
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-400">
            Slide to customize your investment deposit and forecast your estimated returns with precision.
          </p>
        </div>

        {/* Main Calculator Box */}
        <div className="max-w-5xl mx-auto rounded-3xl border border-white/15 bg-[#15193b]/95 p-6 sm:p-10 backdrop-blur-2xl shadow-[0_24px_70px_rgba(0,0,0,0.85)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            {/* Left Column: Controls & Inputs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Step 1: Select Plan Pills */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 block">
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
                        className={`py-3 px-2 rounded-2xl text-xs font-bold border transition-all text-center cursor-pointer ${
                          isCurrent
                            ? 'bg-[#ff7a00] text-white border-[#ff7a00] shadow-[0_0_15px_rgba(255,122,0,0.35)]'
                            : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                        }`}
                      >
                        <div className="font-extrabold">{plan.name}</div>
                        <div className="text-[0.65rem] opacity-90 mt-0.5">{plan.dailyReturn} / {plan.durationDisplay}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Step 2: Deposit Amount Input & Slider */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    2. Investment Capital (USD):
                  </label>
                  <span className="text-xs font-semibold text-[#ff7a00]">
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
                    className="w-full rounded-2xl border border-white/15 bg-black/50 pl-9 pr-4 py-3.5 text-xl sm:text-2xl font-mono font-black text-white focus:border-[#ff7a00] focus:outline-none"
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
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#ff7a00]"
                  />
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[0.7rem] text-slate-400 mr-1">Quick Add:</span>
                  {quickPresets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setDepositAmount(preset.val)}
                      className="px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 text-[0.7rem] font-bold text-slate-300 hover:border-[#ff7a00] hover:text-[#ff7a00] transition-colors cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Compounding Reinvest Toggle */}
              <div className="pt-2">
                <label className="flex items-center justify-between p-3 rounded-2xl border border-white/10 bg-white/[0.02] cursor-pointer hover:bg-white/[0.04] transition-colors">
                  <div className="flex items-center gap-2.5">
                    <Sparkles size={16} className="text-[#ff7a00]" />
                    <div>
                      <div className="text-xs font-bold text-white">Automated Daily Compounding (Reinvest)</div>
                      <div className="text-[0.68rem] text-slate-400">Compound daily profits back into strategy pool</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={compounding}
                    onChange={(e) => setCompounding(e.target.checked)}
                    className="w-4 h-4 rounded accent-[#ff7a00] cursor-pointer"
                  />
                </label>
              </div>
            </div>

            {/* Right Column: Dynamic Output Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border-2 border-[#ff7a00]/60 bg-gradient-to-b from-[#1c2146] via-[#15193b] to-[#0e122b] p-6 sm:p-7 shadow-[0_0_40px_rgba(255,122,0,0.25)] space-y-6 relative overflow-hidden">
                {/* Glow pill */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Projected Summary
                  </span>
                  <span className="rounded-full bg-[#ff7a00]/20 px-2.5 py-0.5 text-[0.68rem] font-black text-[#ff7a00] border border-[#ff7a00]/40">
                    {selectedPlan.name} • {selectedPlan.durationDisplay}
                  </span>
                </div>

                {/* Daily Profit */}
                <div className="space-y-1">
                  <div className="text-xs text-slate-300 flex items-center gap-1.5">
                    <TrendingUp size={13} className="text-emerald-400" />
                    <span>Estimated Daily Profit:</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-white">
                    ${dailyProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{' '}
                    <span className="text-xs font-semibold text-emerald-400">
                      (+{((dailyRate) * 100).toFixed(2)}%)
                    </span>
                  </div>
                </div>

                {/* Total Net Profit */}
                <div className="space-y-1">
                  <div className="text-xs text-slate-300">Total Net Earnings ({days} Days):</div>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-[#ff7a00] drop-shadow-[0_0_12px_rgba(255,122,0,0.4)]">
                    +${totalNetProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>

                {/* Total Return at Maturity (Capital + Profit) */}
                <div className="rounded-2xl border border-white/10 bg-black/60 p-4 space-y-2">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Initial Capital:</span>
                    <span className="font-mono text-white">${depositAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Total ROI:</span>
                    <span className="font-mono font-bold text-[#ff7a00]">+{roiPercentage}%</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                    <span>Total Payout:</span>
                    <span className="font-mono text-emerald-400 text-base">
                      ${totalReturn.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                {/* Instant CTA Button */}
                <NavLink
                  to="/signup"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#ff7a00] to-[#ff9500] text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:from-[#ff9500] hover:to-[#ffaa33] shadow-[0_0_25px_rgba(255,122,0,0.4)] transition-all hover:scale-[1.02]"
                >
                  <span>Start With {selectedPlan.name}</span>
                  <ArrowRight size={16} />
                </NavLink>

                <div className="text-center text-[0.68rem] text-slate-400 flex items-center justify-center gap-1.5">
                  <Shield size={12} className="text-emerald-400" />
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
