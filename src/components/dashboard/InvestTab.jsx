import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import {
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Zap,
  ArrowRight,
  Sparkles,
  Lock,
  Clock,
  DollarSign,
  AlertCircle,
  Plus
} from 'lucide-react'

const PACKAGES = [
  {
    id: 'starter',
    name: 'Starter Arbitrage',
    tier: 'Tier 1 Bot Cluster',
    dailyRoi: '1.5%',
    dailyRoiNum: 1.5,
    durationDays: 15,
    minDeposit: 100,
    maxDeposit: 4999,
    features: [
      'Automated DEX/CEX arbitrage bot',
      'Daily profit settlement at 00:00 UTC',
      'Principal capital returned at maturity',
      '100% Capital SAFU Insurance guarantee',
      'Standard email & ticket support'
    ],
    popular: false,
    cardTheme: 'dark'
  },
  {
    id: 'pro',
    name: 'Pro Quant Desk',
    tier: 'Tier 2 High-Frequency Bot',
    dailyRoi: '2.4%',
    dailyRoiNum: 2.4,
    durationDays: 30,
    minDeposit: 5000,
    maxDeposit: 24999,
    features: [
      'Multi-exchange cross-latency execution',
      'Instant daily profit withdrawal anytime',
      'Principal capital returned at maturity',
      '100% Capital SAFU Insurance guarantee',
      'Dedicated Account Manager & Telegram VIP'
    ],
    popular: true,
    cardTheme: 'white' // Finantech signature white contrast card
  },
  {
    id: 'elite',
    name: 'Elite Desk',
    tier: 'Tier 3 Institutional Algorithmic',
    dailyRoi: '3.5%',
    dailyRoiNum: 3.5,
    durationDays: 45,
    minDeposit: 25000,
    maxDeposit: 99999,
    features: [
      'Flash-loan & triangular arbitrage routing',
      'Sub-millisecond MEV protected execution',
      'Real-time automated profit auto-compounding',
      '100% Capital SAFU Insurance guarantee',
      'Priority VIP Private Desk & Custom API'
    ],
    popular: false,
    cardTheme: 'dark'
  },
  {
    id: 'vip',
    name: 'VIP Syndicate',
    tier: 'Tier 4 Bespoke Private Pool',
    dailyRoi: '4.8%',
    dailyRoiNum: 4.8,
    durationDays: 60,
    minDeposit: 100000,
    maxDeposit: 1000000,
    features: [
      'Direct liquidity pool arbitrage syndication',
      'Zero slippage order execution via OTC',
      'Personal Quantitative Portfolio Strategist',
      '100% Capital SAFU Insurance guarantee',
      'Unlimited instant withdrawals with 0% fee'
    ],
    popular: false,
    cardTheme: 'dark'
  }
]

export default function InvestTab({ onOpenDeposit }) {
  const { user, activateInvestmentPlan } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState(PACKAGES[1])
  const [investAmount, setInvestAmount] = useState(selectedPlan.minDeposit)
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState(null)

  const availableBalance = user?.availableBalance || 0

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan)
    if (investAmount < plan.minDeposit || investAmount > plan.maxDeposit) {
      setInvestAmount(plan.minDeposit)
    }
    setFeedback(null)
  }

  const dailyReturn = (Number(investAmount) || 0) * (selectedPlan.dailyRoiNum / 100)
  const totalReturn = dailyReturn * selectedPlan.durationDays
  const netRoiPercent = (selectedPlan.dailyRoiNum * selectedPlan.durationDays).toFixed(1)

  const handleActivate = (e) => {
    e.preventDefault()
    setFeedback(null)
    const amountNum = Number(investAmount)

    if (!amountNum || amountNum < selectedPlan.minDeposit) {
      setFeedback({
        type: 'error',
        message: `Minimum deposit for ${selectedPlan.name} is $${selectedPlan.minDeposit.toLocaleString()}`
      })
      return
    }

    if (amountNum > selectedPlan.maxDeposit) {
      setFeedback({
        type: 'error',
        message: `Maximum deposit for ${selectedPlan.name} is $${selectedPlan.maxDeposit.toLocaleString()}`
      })
      return
    }

    if (availableBalance < amountNum) {
      setFeedback({
        type: 'insufficient',
        message: `Insufficient available balance ($${availableBalance.toLocaleString()}). You need $${(amountNum - availableBalance).toLocaleString()} more.`
      })
      return
    }

    setLoading(true)
    setTimeout(() => {
      const res = activateInvestmentPlan(
        selectedPlan.id,
        selectedPlan.name,
        amountNum,
        selectedPlan.dailyRoiNum,
        selectedPlan.durationDays
      )

      setLoading(false)
      if (res.success) {
        setFeedback({
          type: 'success',
          message: `Successfully activated ${selectedPlan.name} with $${amountNum.toLocaleString()}! Daily arbitrage rewards are now active.`
        })
      } else {
        setFeedback({
          type: 'error',
          message: res.error || 'Failed to activate plan.'
        })
      }
    }, 800)
  }

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#B0F127]/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="space-y-2 max-w-xl z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B0F127]/10 border border-[#B0F127]/20 text-[#B0F127] text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            Institutional Arbitrage Engine
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
            Start Investing & Grow Daily Profit
          </h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Select a quantitative arbitrage strategy. Your capital is 100% protected by the Purex SAFU Reserve Fund while our algorithmic bots capture cross-market spreads 24/7.
          </p>
        </div>

        <div className="bg-black/40 border border-white/10 rounded-xl p-4 w-full md:w-auto flex flex-col gap-2 min-w-[220px]">
          <span className="text-xs text-white/50 uppercase tracking-wider font-mono">Your Available Balance</span>
          <div className="text-2xl font-bold text-white font-mono">
            ${availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <button
            onClick={onOpenDeposit}
            className="w-full mt-1 px-3 py-2 bg-[#B0F127] hover:bg-[#9ee016] text-black font-semibold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Deposit Funds to Invest
          </button>
        </div>
      </div>

      {/* Active Investments Tracker */}
      {user?.activeInvestments && user.activeInvestments.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#B0F127]" />
              Your Active Investment Clusters ({user.activeInvestments.length})
            </h3>
            <span className="text-xs text-[#B0F127] font-mono bg-[#B0F127]/10 px-2.5 py-1 rounded-md border border-[#B0F127]/20">
              Live & Generating Yield
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.activeInvestments.map((inv) => (
              <div
                key={inv.id}
                className="bg-[#141414] border border-white/10 hover:border-[#B0F127]/40 rounded-xl p-5 space-y-4 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs text-[#B0F127] font-semibold uppercase tracking-wider">
                      {inv.packageId.toUpperCase()} STRATEGY
                    </span>
                    <h4 className="text-lg font-bold text-white mt-0.5">{inv.packageName}</h4>
                    <p className="text-xs text-white/50">Started: {inv.startDate} • {inv.duration}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#B0F127] bg-[#B0F127]/10 border border-[#B0F127]/20 px-2.5 py-1 rounded-full">
                    <ShieldCheck className="w-3 h-3" />
                    100% SAFU Insured
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 p-3 bg-black/40 rounded-lg border border-white/5 font-mono text-center">
                  <div>
                    <span className="text-[10px] text-white/40 block">CAPITAL</span>
                    <span className="text-sm font-bold text-white">${Number(inv.amount).toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/40 block">DAILY ROI</span>
                    <span className="text-sm font-bold text-[#B0F127]">{inv.dailyRoi}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/40 block">EARNED TO DATE</span>
                    <span className="text-sm font-bold text-white">${(Number(inv.totalEarned) || 0).toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <div className="flex items-center gap-1.5 text-white/60">
                    <Clock className="w-3.5 h-3.5 text-white/40" />
                    <span>Next Payout: 00:00 UTC</span>
                  </div>
                  <span className="text-[#B0F127] font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#B0F127] animate-ping" />
                    Active Trading
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Package Selection Cards */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-white">Choose an Investment Plan</h3>
            <p className="text-xs text-white/50">Select your capital bracket and calculate guaranteed daily returns.</p>
          </div>
          <span className="text-xs text-white/40 font-mono">All plans include 100% Capital Backing</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PACKAGES.map((pkg) => {
            const isSelected = selectedPlan.id === pkg.id
            const isWhiteCard = pkg.cardTheme === 'white'

            return (
              <div
                key={pkg.id}
                onClick={() => handleSelectPlan(pkg)}
                className={`relative rounded-2xl p-6 cursor-pointer transition-all duration-300 flex flex-col justify-between border ${
                  isSelected
                    ? 'ring-2 ring-[#B0F127] shadow-[0_0_25px_rgba(176,241,39,0.15)] scale-[1.01]'
                    : 'hover:border-white/30'
                } ${
                  isWhiteCard
                    ? 'bg-white text-black border-transparent'
                    : 'bg-[#141414] text-white border-white/10'
                }`}
              >
                {/* Popular Tag */}
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#B0F127] text-black font-bold text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md">
                    Most Popular
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className={`text-[10px] uppercase tracking-wider font-semibold ${isWhiteCard ? 'text-black/60' : 'text-[#B0F127]'}`}>
                        {pkg.tier}
                      </span>
                      <h4 className="text-lg font-bold mt-0.5">{pkg.name}</h4>
                    </div>
                  </div>

                  {/* Daily Rate Callout */}
                  <div className={`p-4 rounded-xl ${isWhiteCard ? 'bg-black/5' : 'bg-black/40 border border-white/5'}`}>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-3xl font-black font-mono ${isWhiteCard ? 'text-black' : 'text-[#B0F127]'}`}>
                        {pkg.dailyRoi}
                      </span>
                      <span className={`text-xs font-semibold ${isWhiteCard ? 'text-black/60' : 'text-white/60'}`}>
                        / Daily
                      </span>
                    </div>
                    <span className={`text-xs block mt-1 ${isWhiteCard ? 'text-black/50' : 'text-white/40'}`}>
                      Maturity Lock: {pkg.durationDays} Days
                    </span>
                  </div>

                  {/* Limits */}
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className={isWhiteCard ? 'text-black/50' : 'text-white/50'}>Min Capital:</span>
                      <span className="font-bold font-mono">${pkg.minDeposit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isWhiteCard ? 'text-black/50' : 'text-white/50'}>Max Capital:</span>
                      <span className="font-bold font-mono">${pkg.maxDeposit.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className={`space-y-2 pt-3 border-t text-xs ${isWhiteCard ? 'border-black/10' : 'border-white/10'}`}>
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isWhiteCard ? 'text-black' : 'text-[#B0F127]'}`} />
                        <span className={isWhiteCard ? 'text-black/80' : 'text-white/70'}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? isWhiteCard
                          ? 'bg-black text-white'
                          : 'bg-[#B0F127] text-black shadow-md'
                        : isWhiteCard
                        ? 'bg-black/10 text-black hover:bg-black/20'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {isSelected ? 'Selected Strategy' : 'Select Plan'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Interactive Investment Calculator & Activation Box */}
      <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 lg:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#B0F127]" />
              Configure & Activate: {selectedPlan.name}
            </h3>
            <p className="text-xs text-white/50">
              Input the amount you wish to invest from your Available Balance.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/60 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
            <Lock className="w-3.5 h-3.5 text-[#B0F127]" />
            100% Capital Returned at Day {selectedPlan.durationDays}
          </div>
        </div>

        <form onSubmit={handleActivate} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Side */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-white/60 mb-2">
                  <span>Investment Amount (USD)</span>
                  <span>Range: ${selectedPlan.minDeposit.toLocaleString()} - ${selectedPlan.maxDeposit.toLocaleString()}</span>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 font-mono text-lg">$</span>
                  <input
                    type="number"
                    min={selectedPlan.minDeposit}
                    max={selectedPlan.maxDeposit}
                    step="100"
                    value={investAmount}
                    onChange={(e) => setInvestAmount(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl py-3 pl-8 pr-24 text-white font-mono text-lg outline-none transition-all"
                    placeholder="0.00"
                  />
                  <button
                    type="button"
                    onClick={() => setInvestAmount(Math.min(availableBalance, selectedPlan.maxDeposit))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#B0F127] bg-[#B0F127]/10 hover:bg-[#B0F127]/20 px-2.5 py-1 rounded-md transition-all"
                  >
                    MAX
                  </button>
                </div>
              </div>

              {/* Quick Quick Preset Buttons */}
              <div className="flex flex-wrap gap-2">
                {[selectedPlan.minDeposit, selectedPlan.minDeposit * 2, Math.floor((selectedPlan.minDeposit + selectedPlan.maxDeposit) / 2), selectedPlan.maxDeposit].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setInvestAmount(val)}
                    className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 border border-white/5 transition-all"
                  >
                    ${val.toLocaleString()}
                  </button>
                ))}
              </div>

              <div className="p-4 bg-black/30 rounded-xl border border-white/5 space-y-2 text-xs text-white/60">
                <div className="flex items-center gap-2 text-white font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#B0F127]" />
                  SAFU Insurance Guarantee
                </div>
                <p className="leading-relaxed">
                  Every dollar deployed into {selectedPlan.name} is insured 1:1 by cold-storage multi-sig reserves. If algorithmic arbitrage spread falls below projections, the reserve fills the difference automatically.
                </p>
              </div>
            </div>

            {/* Projected Returns Side */}
            <div className="bg-black/50 border border-white/10 rounded-xl p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-wider text-white/40 font-mono block">
                  Projected Yield Summary
                </span>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                    <span className="text-[11px] text-white/50 block">Daily Profit ({selectedPlan.dailyRoi})</span>
                    <span className="text-xl font-black text-[#B0F127] font-mono">
                      +${dailyReturn.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                    <span className="text-[11px] text-white/50 block">Total Profit ({selectedPlan.durationDays}d)</span>
                    <span className="text-xl font-black text-white font-mono">
                      +${totalReturn.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs pt-2 border-t border-white/5">
                  <div className="flex justify-between text-white/70">
                    <span>Net ROI Percentage:</span>
                    <span className="text-[#B0F127] font-mono font-bold">+{netRoiPercent}%</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Capital Release:</span>
                    <span className="text-white font-mono font-bold">${Number(investAmount || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-white font-semibold text-sm pt-2 border-t border-white/10">
                    <span>Total Estimated Return:</span>
                    <span className="text-[#B0F127] font-mono font-bold">
                      ${((Number(investAmount) || 0) + totalReturn).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button & Feedback */}
              <div className="pt-4 space-y-3">
                {feedback && (
                  <div
                    className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                      feedback.type === 'success'
                        ? 'bg-[#B0F127]/10 text-[#B0F127] border border-[#B0F127]/30'
                        : feedback.type === 'insufficient'
                        ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                        : 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {feedback.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <span>{feedback.message}</span>
                      {feedback.type === 'insufficient' && (
                        <button
                          type="button"
                          onClick={onOpenDeposit}
                          className="block mt-2 font-bold underline hover:opacity-80"
                        >
                          Click here to deposit funds now →
                        </button>
                      )}
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#B0F127] hover:bg-[#9ee016] text-black font-bold text-sm rounded-xl transition-all shadow-lg hover:shadow-[#B0F127]/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Deploying Bot Strategy...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      Confirm & Start Strategy (${Number(investAmount || 0).toLocaleString()})
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
