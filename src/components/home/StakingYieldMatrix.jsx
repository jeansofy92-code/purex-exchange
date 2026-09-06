import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  Calculator,
  ShieldCheck,
  Sparkles,
  Lock,
  ArrowRight,
  Zap,
  Flame,
  Bot
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { investmentPlans } from '../../data/investmentPlans'

export default function StakingYieldMatrix() {
  const [selectedPlan, setSelectedPlan] = useState(investmentPlans[1] || investmentPlans[0])
  const [depositAmount, setDepositAmount] = useState(2500)
  const [autoCompound, setAutoCompound] = useState(true)

  const dailyReturnRate = (selectedPlan.dailyMin + selectedPlan.dailyMax) / 2
  const dailyRoiDecimal = dailyReturnRate / 100
  const dailyReturnUsd = depositAmount * dailyRoiDecimal

  let totalEstimatedProfit = 0
  if (autoCompound) {
    totalEstimatedProfit = depositAmount * Math.pow(1 + dailyRoiDecimal, selectedPlan.durationDays) - depositAmount
  } else {
    totalEstimatedProfit = dailyReturnUsd * selectedPlan.durationDays
  }
  const totalPayout = depositAmount + totalEstimatedProfit

  return (
    <section id="staking-matrix" className="relative mx-auto max-w-[1440px] px-3.5 py-4 sm:px-6 lg:px-10">
      {/* Section Title */}
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#ff7a00]/30 bg-[#ff7a00]/10 px-3 py-0.5 text-xs font-semibold text-[#ff7a00]">
            <Coins size={12} />
            <span>INSTITUTIONAL DEFI VAULTS & PASSIVE YIELD</span>
          </div>
          <h2 className="mt-1.5 text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white">
            High-Yield Staking & Algorithmic Vaults
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl">
            Automated compounding strategies managed across top liquidity pools with 100% principal insurance coverage.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-200">
          <ShieldCheck size={15} className="text-[#ff7a00]" />
          <span>$125M SAFU Protected</span>
        </div>
      </div>

      {/* Grid of 4 Cyber Cat Trading Bot Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-4">
        {investmentPlans.map((plan) => {
          const isSelected = selectedPlan.id === plan.id
          return (
            <div
              key={plan.id}
              onClick={() => {
                setSelectedPlan(plan)
                if (depositAmount < plan.minDeposit) setDepositAmount(plan.minDeposit)
              }}
              className={`relative rounded-2xl border p-4 transition-all cursor-pointer backdrop-blur-xl group overflow-hidden ${
                isSelected
                  ? 'border-[#ff7a00] bg-gradient-to-b from-[#ff7a00]/20 via-[#1a1e42] to-[#121530] shadow-[0_0_24px_rgba(255,122,0,0.3)] scale-[1.01]'
                  : 'border-white/10 bg-[#15193b]/90 hover:border-white/20 hover:bg-[#1a1f48]'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-1.5 right-3 z-10 rounded-full bg-gradient-to-r from-[#ff7a00] to-[#ff9500] px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-white shadow">
                  TOP YIELD 🔥
                </span>
              )}

              {/* Bot Avatar & Name */}
              <div className="flex items-center gap-2.5">
                <div className="relative h-12 w-12 rounded-xl overflow-hidden border border-white/20 shrink-0 shadow-md">
                  <img
                    src={plan.avatar}
                    alt={plan.name}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-black text-white text-xs sm:text-sm truncate">{plan.name}</div>
                  <div className="text-[10px] font-bold text-[#ff7a00] truncate">{plan.botRole}</div>
                </div>
              </div>

              <div className="mt-3 space-y-0.5">
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Daily Guaranteed ROI</div>
                <div className="font-mono text-2xl font-black text-[#ff7a00]">{plan.dailyReturn}</div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-2 text-[10px] font-mono text-slate-300">
                <div>
                  <span className="text-slate-400 block">Duration</span>
                  <span className="font-bold text-white">{plan.durationDisplay}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Min Deposit</span>
                  <span className="font-bold text-white">${plan.minDeposit.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-2.5 flex items-center justify-between text-[10px] text-[#ff7a00] font-semibold">
                <span>{isSelected ? '✓ Active in Simulator' : 'Select Bot Simulator'}</span>
                <ArrowRight size={12} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Interactive Staking Calculator Workbench */}
      <div className="rounded-2xl border border-white/10 bg-[#15193b]/95 p-4 sm:p-6 backdrop-blur-2xl shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Controls (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl overflow-hidden border border-[#ff7a00]/40 shrink-0 shadow-md">
                  <img src={selectedPlan.avatar} alt={selectedPlan.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <div className="font-bold text-white text-xs sm:text-sm flex items-center gap-1.5">
                    <span>Selected Bot: <strong className="text-[#ff7a00] font-mono">{selectedPlan.name}</strong></span>
                  </div>
                  <div className="text-[10px] text-slate-400">{selectedPlan.botRole}</div>
                </div>
              </div>
              <span className="font-mono text-xs text-slate-300">
                Daily Rate: <strong className="text-[#ff7a00]">{selectedPlan.dailyReturn}</strong>
              </span>
            </div>

            {/* Deposit Slider & Input */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span>Deposit Capital (USD):</span>
                <span className="font-mono text-[#ff7a00]">${depositAmount.toLocaleString()}</span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-base font-bold text-[#ff7a00]">
                  $
                </span>
                <input
                  type="number"
                  min={selectedPlan.minDeposit}
                  max={selectedPlan.maxDeposit || 500000}
                  step={100}
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full rounded-xl border border-white/15 bg-[#0f1228] pl-8 pr-4 py-2.5 font-mono text-lg font-bold text-white focus:border-[#ff7a00] focus:outline-none"
                />
              </div>
              <input
                type="range"
                min={selectedPlan.minDeposit}
                max={selectedPlan.maxDeposit || 50000}
                step={250}
                value={depositAmount}
                onChange={(e) => setDepositAmount(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#ff7a00]"
              />
            </div>

            {/* Lock Duration Info */}
            <div className="rounded-xl border border-white/10 bg-black/30 p-3 flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-slate-400 block text-[10px]">Algorithm Term</span>
                <span className="text-white font-bold">{selectedPlan.durationDisplay} Automated Cycle</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Capital Security</span>
                <span className="text-emerald-400 font-bold">100% Principal Release</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Settlement</span>
                <span className="text-[#ff7a00] font-bold">Daily 00:00 UTC</span>
              </div>
            </div>

            {/* Auto Compound Switch */}
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0f1228] p-2.5">
              <div className="flex items-center gap-2">
                <Sparkles size={15} className="text-[#ff7a00]" />
                <div>
                  <div className="text-xs font-bold text-white">Daily Auto-Compounding</div>
                  <div className="text-[10px] text-slate-400">Automatically reinvests daily earnings for maximum APY</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={autoCompound}
                onChange={(e) => setAutoCompound(e.target.checked)}
                className="h-4 w-4 rounded accent-[#ff7a00] cursor-pointer"
              />
            </div>
          </div>

          {/* Result Output Card (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border-2 border-[#ff7a00]/40 bg-gradient-to-b from-[#ff7a00]/20 via-[#171b3e] to-[#0f122c] p-5 shadow-2xl space-y-4 font-mono">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5 font-sans">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Projected Returns</span>
                <span className="rounded-full bg-[#ff7a00]/20 px-2.5 py-0.5 text-xs font-bold text-[#ff7a00]">
                  {selectedPlan.durationDisplay} Cycle
                </span>
              </div>

              <div>
                <div className="text-[11px] text-slate-300 font-sans">Daily Projected Profit:</div>
                <div className="text-xl font-bold text-white">
                  ${dailyReturnUsd.toFixed(2)} <span className="text-xs text-[#ff7a00] font-normal">/ day</span>
                </div>
              </div>

              <div>
                <div className="text-[11px] text-slate-300 font-sans">Total Net Earnings:</div>
                <div className="text-2xl sm:text-3xl font-black text-[#ff7a00] drop-shadow-[0_0_15px_rgba(255,122,0,0.4)]">
                  +${totalEstimatedProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#0c0e22] p-2.5 space-y-1 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Initial Capital:</span>
                  <span className="text-white">${depositAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-white pt-1 border-t border-white/10">
                  <span>Total at Maturity:</span>
                  <span className="text-[#ff7a00] font-mono">${totalPayout.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>

              <Link
                to="/signup"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff7a00] to-[#ff9500] py-3 font-sans text-xs font-black uppercase tracking-wider text-white shadow-[0_0_20px_rgba(255,122,0,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Deploy {selectedPlan.name}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
