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
  Bot,
  Coins
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
    <section id="staking-matrix" className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 font-sans">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between text-left"
      >
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-[#356df1]/10 px-3.5 py-1 text-xs font-semibold text-[#356df1]">
            <Bot size={13} />
            <span>INSTITUTIONAL AI TRADING BOTS</span>
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
            High-Yield Automated Trading Bots
          </h2>
          <p className="text-xs sm:text-sm text-[#8f9ca9] max-w-2xl mt-1 leading-relaxed">
            Automated algorithmic execution strategies with continuous compounding and 100% principal insurance coverage.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono text-[#8f9ca9]">
          <ShieldCheck size={16} className="text-emerald-400" />
          <span>$125M SAFU Insured</span>
        </div>
      </motion.div>

      {/* Grid of 4 Cyber Cat Trading Bot Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {investmentPlans.map((plan, index) => {
          const isSelected = selectedPlan.id === plan.id
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => {
                setSelectedPlan(plan)
                if (depositAmount < plan.minDeposit) setDepositAmount(plan.minDeposit)
              }}
              className={`relative rounded-3xl border p-5 transition-all cursor-pointer backdrop-blur-xl group overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'border-[#356df1] bg-[#151726] shadow-[0_0_30px_rgba(53,109,241,0.25)] scale-[1.02]'
                  : 'border-white/[0.08] bg-[#151726]/80 hover:border-white/20 hover:bg-[#151726]'
              }`}
            >
              {plan.popular && (
                <span className="absolute top-3 right-3 z-10 rounded-full bg-[#356df1] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow">
                  TOP YIELD
                </span>
              )}

              {/* Bot Avatar & Name */}
              <div>
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 rounded-2xl overflow-hidden border border-white/10 shrink-0 shadow-md bg-[#0c0d14]">
                    <img
                      src={plan.avatar}
                      alt={plan.name}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="font-bold text-white text-sm truncate">{plan.name}</div>
                    <div className="text-[11px] font-medium text-[#356df1] truncate">{plan.botRole}</div>
                  </div>
                </div>

                <div className="mt-4 space-y-0.5 text-left">
                  <div className="text-[10px] font-semibold text-[#8f9ca9] uppercase tracking-wider">Daily Guaranteed ROI</div>
                  <div className="font-mono text-2xl font-bold text-white">{plan.dailyReturn}</div>
                </div>
              </div>

              <div>
                <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/[0.08] pt-3 text-[11px] font-mono text-[#8f9ca9] text-left">
                  <div>
                    <span className="text-[#8f9ca9] block text-[10px]">Duration</span>
                    <span className="font-semibold text-white">{plan.durationDisplay}</span>
                  </div>
                  <div>
                    <span className="text-[#8f9ca9] block text-[10px]">Min Deposit</span>
                    <span className="font-semibold text-white">${plan.minDeposit.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-[#356df1] font-semibold">
                  <span>{isSelected ? '✓ Active Simulator' : 'Select Bot'}</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Interactive Staking Calculator Workbench */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-3xl border border-white/[0.08] bg-[#151726] p-6 sm:p-8 backdrop-blur-2xl shadow-xl text-left"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls (7 Cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl overflow-hidden border border-[#356df1]/40 shrink-0 shadow bg-[#0c0d14]">
                  <img src={selectedPlan.avatar} alt={selectedPlan.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm flex items-center gap-1.5">
                    <span>Selected Bot: <strong className="text-[#356df1]">{selectedPlan.name}</strong></span>
                  </div>
                  <div className="text-[11px] text-[#8f9ca9]">{selectedPlan.botRole}</div>
                </div>
              </div>
              <span className="font-mono text-xs text-[#8f9ca9]">
                Daily Rate: <strong className="text-emerald-400">{selectedPlan.dailyReturn}</strong>
              </span>
            </div>

            {/* Deposit Slider & Input */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-[#8f9ca9]">
                <span>Deposit Capital (USD):</span>
                <span className="font-mono text-white">${depositAmount.toLocaleString()}</span>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-base font-bold text-[#8f9ca9]">
                  $
                </span>
                <input
                  type="number"
                  min={selectedPlan.minDeposit}
                  max={selectedPlan.maxDeposit || 500000}
                  step={100}
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full rounded-2xl border border-white/10 bg-[#0c0d14] pl-9 pr-4 py-3 font-mono text-lg font-bold text-white focus:border-[#356df1] focus:outline-none"
                />
              </div>
              <input
                type="range"
                min={selectedPlan.minDeposit}
                max={selectedPlan.maxDeposit || 50000}
                step={250}
                value={depositAmount}
                onChange={(e) => setDepositAmount(parseFloat(e.target.value))}
                className="w-full h-2 bg-[#0c0d14] rounded-lg appearance-none cursor-pointer accent-[#356df1]"
              />
            </div>

            {/* Lock Duration Info */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0c0d14] p-3.5 flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-[#8f9ca9] block text-[10px]">Algorithm Term</span>
                <span className="text-white font-bold">{selectedPlan.durationDisplay} Cycle</span>
              </div>
              <div>
                <span className="text-[#8f9ca9] block text-[10px]">Capital Security</span>
                <span className="text-emerald-400 font-bold">100% Principal Guaranteed</span>
              </div>
              <div>
                <span className="text-[#8f9ca9] block text-[10px]">Settlement</span>
                <span className="text-white font-bold">Daily 00:00 UTC</span>
              </div>
            </div>

            {/* Auto Compound Switch */}
            <div className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-[#0c0d14] p-3">
              <div className="flex items-center gap-2.5">
                <Sparkles size={16} className="text-[#356df1]" />
                <div>
                  <div className="text-xs font-bold text-white">Daily Auto-Compounding</div>
                  <div className="text-[10px] text-[#8f9ca9]">Automatically reinvests daily earnings for maximum yield</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={autoCompound}
                onChange={(e) => setAutoCompound(e.target.checked)}
                className="h-4 w-4 rounded accent-[#356df1] cursor-pointer"
              />
            </div>
          </div>

          {/* Result Output Card (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-[#0c0d14] p-6 shadow-xl space-y-4 font-mono">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 font-sans">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8f9ca9]">Projected Returns</span>
                <span className="rounded-full bg-[#356df1]/20 px-3 py-0.5 text-xs font-bold text-[#356df1]">
                  {selectedPlan.durationDisplay} Term
                </span>
              </div>

              <div>
                <div className="text-[11px] text-[#8f9ca9] font-sans">Daily Projected Return:</div>
                <div className="text-xl font-bold text-white">
                  ${dailyReturnUsd.toFixed(2)} <span className="text-xs text-emerald-400 font-normal">/ day</span>
                </div>
              </div>

              <div>
                <div className="text-[11px] text-[#8f9ca9] font-sans">Total Net Earnings:</div>
                <div className="text-3xl font-black text-emerald-400">
                  +${totalEstimatedProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-[#151726] p-3 space-y-1.5 text-xs text-[#8f9ca9]">
                <div className="flex justify-between">
                  <span>Initial Capital:</span>
                  <span className="text-white">${depositAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-white pt-1.5 border-t border-white/[0.08]">
                  <span>Total at Maturity:</span>
                  <span className="text-emerald-400 font-mono">${totalPayout.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>

              <Link
                to="/signup"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#356df1] hover:bg-[#2d5cd0] py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(53,109,241,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Deploy {selectedPlan.name}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
