import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Flame,
  Check,
  ShieldCheck,
  TrendingUp,
  Clock,
  DollarSign,
  Zap,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { investmentPlans } from '../../data/investmentPlans'
import { useAuth } from '../../context/AuthContext'

export default function StakingModal({ isOpen, onClose, onStakeSuccess, availableBalance = 10000 }) {
  const { user } = useAuth()
  const [selectedPlanId, setSelectedPlanId] = useState('growth')
  const [amount, setAmount] = useState('1000')
  const [autoCompound, setAutoCompound] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  if (!isOpen) return null

  const selectedPlan = investmentPlans.find((p) => p.id === selectedPlanId) || investmentPlans[1]
  const parsedAmount = parseFloat(amount) || 0

  const dailyReturnRate = (selectedPlan.dailyMin + selectedPlan.dailyMax) / 2
  const dailyRoiDecimal = dailyReturnRate / 100
  const estimatedDailyReturn = parsedAmount * dailyRoiDecimal
  const estimatedTotalReturn = estimatedDailyReturn * selectedPlan.durationDays
  const estimatedTotalPayout = parsedAmount + estimatedTotalReturn

  const handleSelectPlan = (plan) => {
    setSelectedPlanId(plan.id)
    if (parsedAmount < plan.minDeposit) {
      setAmount(plan.minDeposit.toString())
    }
    setErrorMessage('')
  }

  const handleStake = (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (parsedAmount < selectedPlan.minDeposit) {
      setErrorMessage(`Minimum deposit for ${selectedPlan.name} is $${selectedPlan.minDeposit.toLocaleString()}`)
      return
    }

    if (selectedPlan.maxDeposit && parsedAmount > selectedPlan.maxDeposit) {
      setErrorMessage(`Maximum deposit for ${selectedPlan.name} is $${selectedPlan.maxDeposit.toLocaleString()}`)
      return
    }

    setIsSubmitting(true)

    // Save investment to localStorage for real-time moderator & user dashboard sync
    try {
      const storageKey = 'purex_admin_user_investments'
      const existingRaw = localStorage.getItem(storageKey)
      const investments = existingRaw ? JSON.parse(existingRaw) : []

      const newInvestment = {
        id: `inv-${Date.now().toString().slice(-6)}`,
        userId: user?.id || 'usr-active-01',
        userName: user?.fullName || 'Active Trader',
        userEmail: user?.email || 'trader@purex.exchange',
        planName: selectedPlan.name,
        planId: selectedPlan.id,
        depositAmount: parsedAmount,
        dailyRoi: selectedPlan.dailyReturn,
        dailyProfit: Number(estimatedDailyReturn.toFixed(2)),
        totalEarned: 0,
        durationDays: selectedPlan.durationDays,
        daysElapsed: 0,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + selectedPlan.durationDays * 86400000).toISOString().split('T')[0],
        status: 'active',
        autoCompound,
      }

      investments.unshift(newInvestment)
      localStorage.setItem(storageKey, JSON.stringify(investments))

      setSuccessMessage(`Successfully staked $${parsedAmount.toLocaleString()} in ${selectedPlan.name}! Returns accrue daily at 00:00 UTC.`)
      if (onStakeSuccess) {
        onStakeSuccess(newInvestment)
      }

      setTimeout(() => {
        setIsSubmitting(false)
        onClose()
      }, 1500)
    } catch {
      setIsSubmitting(false)
      setErrorMessage('Failed to initiate staking. Please try again.')
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl rounded-3xl border border-white/15 bg-[#141838] p-5 sm:p-7 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden text-white my-auto max-h-[92vh] flex flex-col"
        >
          {/* Top ambient orange glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-28 bg-[#ff7a00]/15 blur-3xl pointer-events-none" />

          {/* Modal Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff7a00] to-amber-500 shadow-[0_0_15px_rgba(255,122,0,0.4)]">
                <Flame size={18} className="text-white fill-white" />
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                  <span>Stake Now & Earn Daily Guaranteed Yield</span>
                </h2>
                <p className="text-[11px] text-slate-400">
                  Select an institutional high-frequency trading plan with automated daily settlements
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Feedback messages */}
          <div className="pt-2 shrink-0">
            {errorMessage && (
              <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-2.5 text-xs text-rose-400 mb-2">
                <AlertCircle size={14} className="shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
            {successMessage && (
              <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2.5 text-xs text-emerald-400 mb-2">
                <CheckCircle2 size={14} className="shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}
          </div>

          {/* Main Content Area */}
          <div className="overflow-y-auto flex-1 pr-1 space-y-4 py-2">
            {/* 4 Investment Cyber Cat Trading Bots Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {investmentPlans.map((plan) => {
                const isSelected = selectedPlanId === plan.id
                return (
                  <div
                    key={plan.id}
                    onClick={() => handleSelectPlan(plan)}
                    className={`relative cursor-pointer rounded-2xl p-4 transition-all duration-200 flex flex-col justify-between overflow-hidden group ${
                      isSelected
                        ? 'border-2 border-[#ff7a00] bg-gradient-to-b from-[#222858] to-[#171b3c] shadow-[0_0_25px_rgba(255,122,0,0.4)] scale-[1.02]'
                        : 'border border-white/10 bg-[#0f1228] hover:border-white/20 hover:bg-[#121634]'
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-1.5 right-3 z-10 rounded-full bg-gradient-to-r from-[#ff7a00] to-[#ff9500] px-2.5 py-0.5 text-[9px] font-black uppercase text-white shadow-[0_0_10px_rgba(255,122,0,0.5)]">
                        Popular 🔥
                      </span>
                    )}

                    <div>
                      {/* Bot Avatar & Header */}
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <div className="relative h-12 w-12 rounded-xl overflow-hidden border border-white/20 shrink-0 shadow-md">
                          <img
                            src={plan.avatar}
                            alt={plan.name}
                            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-black text-white truncate">{plan.name}</span>
                            {isSelected && (
                              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#ff7a00] text-white shrink-0">
                                <Check size={10} />
                              </div>
                            )}
                          </div>
                          <div className="text-[10px] text-[#ff7a00] font-bold truncate">
                            {plan.botRole || 'AI Trading Bot'}
                          </div>
                        </div>
                      </div>

                      <div className="text-[10px] text-slate-400 mb-2.5 line-clamp-2">
                        {plan.subtitle}
                      </div>

                      <div className="rounded-xl border border-white/10 bg-black/40 p-2 mb-2.5 text-center">
                        <div className="text-[9px] uppercase font-bold text-slate-400">Daily Return</div>
                        <div className="text-xl font-black text-[#ff7a00] font-mono">{plan.dailyReturn}</div>
                        <div className="text-[10px] text-slate-400">Avg Net: {plan.totalReturnAvg}</div>
                      </div>

                      <div className="space-y-1.5 text-[11px] text-slate-300 border-t border-white/10 pt-2">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Min Deposit:</span>
                          <span className="font-bold text-white">${plan.minDeposit.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Duration:</span>
                          <span className="font-bold text-white">{plan.durationDisplay}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Capital Release:</span>
                          <span className="font-bold text-emerald-400">100% at End</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Staking Execution & Yield Calculator Card */}
            <div className="rounded-2xl border border-white/15 bg-[#0f1228] p-4 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl overflow-hidden border border-[#ff7a00]/40 shrink-0 shadow-[0_0_12px_rgba(255,122,0,0.3)]">
                    <img
                      src={selectedPlan.avatar}
                      alt={selectedPlan.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Zap size={14} className="text-[#ff7a00]" />
                      <span>Deploying Bot: <strong className="text-[#ff7a00]">{selectedPlan.name}</strong></span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {selectedPlan.botRole} • Deposit range: ${selectedPlan.minDeposit.toLocaleString()} - {selectedPlan.maxDeposit ? `$${selectedPlan.maxDeposit.toLocaleString()}` : 'Unlimited'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400 text-[11px]">Available Balance:</span>
                  <span className="font-bold font-mono text-white">${availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT</span>
                </div>
              </div>

              {/* Deposit Amount Input */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                <div className="sm:col-span-6">
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Stake Amount (USD / USDT)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min={selectedPlan.minDeposit}
                      max={selectedPlan.maxDeposit || 500000}
                      step="50"
                      className="w-full rounded-xl border border-white/15 bg-[#15193b] px-4 py-2.5 pl-8 text-sm font-mono font-bold text-white placeholder-slate-400 focus:border-[#ff7a00] focus:outline-none"
                    />
                    <span className="absolute left-3 top-2.5 text-slate-400 font-bold">$</span>
                    <button
                      type="button"
                      onClick={() => setAmount(selectedPlan.minDeposit.toString())}
                      className="absolute right-2 top-2 rounded-lg bg-white/10 px-2 py-1 text-[10px] font-bold text-slate-300 hover:text-white hover:bg-white/20"
                    >
                      MIN
                    </button>
                  </div>
                </div>

                {/* Return Forecast Matrix */}
                <div className="sm:col-span-6 grid grid-cols-2 gap-2">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-center">
                    <div className="text-[10px] text-slate-400 font-semibold">Daily Yield</div>
                    <div className="text-sm font-black text-emerald-400 font-mono">
                      +${estimatedDailyReturn.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-center">
                    <div className="text-[10px] text-slate-400 font-semibold">Total Payout ({selectedPlan.durationDays}d)</div>
                    <div className="text-sm font-black text-[#ff7a00] font-mono">
                      ${estimatedTotalPayout.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Auto-Compound Option */}
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#15193b]/70 p-3">
                <div className="flex items-center gap-2">
                  <Zap size={15} className="text-[#ff7a00]" />
                  <div>
                    <div className="text-xs font-bold text-white">Enable Automated Daily Reinvestment</div>
                    <div className="text-[10px] text-slate-400">Automatically compounds daily yield to maximize annualized APY.</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={autoCompound}
                  onChange={(e) => setAutoCompound(e.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-black text-[#ff7a00] accent-[#ff7a00]"
                />
              </div>
            </div>
          </div>

          {/* Modal Footer / Action */}
          <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck size={14} className="text-[#ff7a00]" />
              <span>100% Capital preservation guarantee backed by PUREX SAFU Reserve</span>
            </div>

            <button
              type="button"
              onClick={handleStake}
              disabled={isSubmitting || parsedAmount < selectedPlan.minDeposit}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff7a00] to-[#ff9500] px-8 py-2.5 text-xs font-black text-white shadow-[0_0_20px_rgba(255,122,0,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider cursor-pointer"
            >
              {isSubmitting ? (
                <span>Locking & Activating...</span>
              ) : (
                <>
                  <span>Stake ${parsedAmount.toLocaleString()} in {selectedPlan.name}</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
