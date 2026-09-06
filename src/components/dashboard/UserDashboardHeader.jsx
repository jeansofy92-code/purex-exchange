import { useState, useEffect } from 'react'
import {
  Wallet,
  Clock,
  Flame,
  ArrowDownLeft,
  ArrowUpRight,
  Repeat,
  Gift,
  TrendingUp,
  ShieldCheck,
  Plus,
  ChevronRight,
  Sparkles,
  Zap
} from 'lucide-react'
import CoinLogo from '../CoinLogo'
import { useAuth } from '../../context/AuthContext'
import { investmentPlans } from '../../data/investmentPlans'

export default function UserDashboardHeader({
  balances = {},
  onOpenDeposit = () => {},
  onOpenWithdraw = () => {},
  onOpenConvert = () => {},
  onOpenStaking = () => {},
  onOpenReferral = () => {},
  onOpenHistory = () => {},
}) {
  const { user } = useAuth()
  const [userInvestments, setUserInvestments] = useState([])

  // Load user investments from localStorage
  useEffect(() => {
    try {
      const storageKey = 'purex_admin_user_investments'
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        setUserInvestments(JSON.parse(stored))
      } else {
        // Default active sample plan so user sees their active staking yield immediately
        const defaultSample = [
          {
            id: 'inv-sample-01',
            userId: user?.id || 'usr-active-01',
            userName: user?.fullName || 'Active Investor',
            planName: 'Growth Alpha',
            planId: 'growth',
            depositAmount: 2500,
            dailyRoi: '2.40%',
            dailyProfit: 60.00,
            totalEarned: 180.00,
            durationDays: 14,
            daysElapsed: 3,
            startDate: '2026-09-03',
            endDate: '2026-09-17',
            status: 'active',
            autoCompound: true,
          }
        ]
        localStorage.setItem(storageKey, JSON.stringify(defaultSample))
        setUserInvestments(defaultSample)
      }
    } catch (_e) {}
  }, [user])

  // Calculate total portfolio value in USD
  const usdtVal = balances?.USDT ?? 28450.00
  const btcVal = (balances?.BTC ?? 0.485) * 66500
  const ethVal = (balances?.ETH ?? 4.25) * 3500
  const solVal = (balances?.SOL ?? 32.4) * 165
  const purexVal = (balances?.PUREX ?? 2500) * 1.25
  const totalPortfolioUSD = usdtVal + btcVal + ethVal + solVal + purexVal

  // Total active staked amount and daily earnings
  const totalStakedUSD = userInvestments.reduce((acc, inv) => acc + (Number(inv.depositAmount) || 0), 0)
  const totalDailyEarnings = userInvestments.reduce((acc, inv) => acc + (Number(inv.dailyProfit) || 0), 0)

  return (
    <div className="space-y-4 px-4 py-4 sm:px-6 bg-gradient-to-b from-[#0e122d] to-[#0a0c20] border-b border-white/10">
      {/* 1. TOP HERO ROW: Portfolio Balance & Quick Action Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Main Balance Card (7 Cols on desktop) */}
        <div className="lg:col-span-7 rounded-3xl border border-white/15 bg-gradient-to-br from-[#141940] via-[#101436] to-[#0c0f2b] p-5 sm:p-6 shadow-[0_15px_40px_rgba(0,0,0,0.6)] relative overflow-hidden flex flex-col justify-between">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#ff7a00]/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            {/* Top row with label & time/history button */}
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#ff7a00]/20 text-[#ff7a00] border border-[#ff7a00]/30">
                  <Wallet size={15} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Total Estimated Balance
                </span>
                <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-black text-emerald-400">
                  +3.84% 24h
                </span>
              </div>

              {/* Transaction History Button with Clock Icon */}
              <button
                type="button"
                onClick={onOpenHistory}
                className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold text-slate-300 hover:border-[#ff7a00]/50 hover:bg-[#ff7a00]/10 hover:text-white transition-all cursor-pointer group shadow-sm"
                title="View your full transaction and settlement history"
              >
                <Clock size={14} className="text-[#ff7a00] group-hover:rotate-45 transition-transform" />
                <span>Transaction History</span>
              </button>
            </div>

            {/* Big Total Balance Figures */}
            <div className="flex items-baseline gap-3 my-2 flex-wrap">
              <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
                ${totalPortfolioUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                ≈ {(balances?.USDT ?? 28450).toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT Available
              </span>
            </div>

            {/* Asset Breakdown Badges */}
            <div className="flex items-center gap-2 overflow-x-auto py-2">
              <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs shrink-0">
                <CoinLogo symbol="USDT" size={16} />
                <span className="font-bold text-white">${(balances?.USDT ?? 28450).toLocaleString()}</span>
                <span className="text-[10px] text-slate-400 font-semibold">USDT</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs shrink-0">
                <CoinLogo symbol="BTC" size={16} />
                <span className="font-bold text-white">{balances?.BTC ?? 0.485}</span>
                <span className="text-[10px] text-slate-400 font-semibold">BTC</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs shrink-0">
                <CoinLogo symbol="ETH" size={16} />
                <span className="font-bold text-white">{balances?.ETH ?? 4.25}</span>
                <span className="text-[10px] text-slate-400 font-semibold">ETH</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs shrink-0">
                <CoinLogo symbol="SOL" size={16} />
                <span className="font-bold text-white">{balances?.SOL ?? 32.4}</span>
                <span className="text-[10px] text-slate-400 font-semibold">SOL</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs shrink-0">
                <CoinLogo symbol="PUREX" size={16} />
                <span className="font-bold text-[#ff7a00]">{balances?.PUREX ?? 2500}</span>
                <span className="text-[10px] text-[#ff7a00] font-semibold">PUREX</span>
              </div>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-white/10 mt-3">
            {/* 1. Deposit Button */}
            <button
              type="button"
              onClick={onOpenDeposit}
              className="flex items-center justify-center gap-1.5 rounded-2xl border border-emerald-500/40 bg-emerald-500/15 py-2.5 text-xs font-black text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            >
              <ArrowDownLeft size={15} />
              <span>Deposit</span>
            </button>

            {/* 2. Withdraw Button */}
            <button
              type="button"
              onClick={onOpenWithdraw}
              className="flex items-center justify-center gap-1.5 rounded-2xl border border-white/15 bg-white/5 py-2.5 text-xs font-bold text-slate-200 hover:border-white/30 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
            >
              <ArrowUpRight size={15} />
              <span>Withdraw</span>
            </button>

            {/* 3. Convert Button */}
            <button
              type="button"
              onClick={onOpenConvert}
              className="flex items-center justify-center gap-1.5 rounded-2xl border border-[#ff7a00]/40 bg-[#ff7a00]/10 py-2.5 text-xs font-bold text-[#ff7a00] hover:bg-[#ff7a00] hover:text-white transition-all cursor-pointer"
            >
              <Repeat size={14} />
              <span>Convert</span>
            </button>

            {/* 4. Referral Button */}
            <button
              type="button"
              onClick={onOpenReferral}
              className="flex items-center justify-center gap-1.5 rounded-2xl border border-purple-500/40 bg-purple-500/15 py-2.5 text-xs font-bold text-purple-300 hover:bg-purple-500 hover:text-white transition-all cursor-pointer"
            >
              <Gift size={14} />
              <span>Referrals</span>
            </button>
          </div>
        </div>

        {/* Stake Now & Yield Highlights Banner (5 Cols on desktop) */}
        <div className="lg:col-span-5 rounded-3xl border border-[#ff7a00]/40 bg-gradient-to-br from-[#22183c] via-[#1a1538] to-[#12112e] p-5 sm:p-6 shadow-[0_0_30px_rgba(255,122,0,0.2)] relative overflow-hidden flex flex-col justify-between">
          {/* Fiery Accent Decor */}
          <div className="absolute top-0 right-0 w-52 h-52 bg-[#ff7a00]/20 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff7a00] to-amber-500 shadow-[0_0_15px_rgba(255,122,0,0.5)]">
                  <Flame size={17} className="text-white fill-white" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white flex items-center gap-1.5">
                    <span>High-Yield Crypto Staking</span>
                    <Sparkles size={13} className="text-amber-400" />
                  </h3>
                  <div className="text-[10px] text-slate-400">Institutional AI Arbitrage & Liquidity Pools</div>
                </div>
              </div>

              <span className="rounded-full bg-[#ff7a00]/20 border border-[#ff7a00]/40 px-2.5 py-0.5 text-[10px] font-black text-[#ff7a00] uppercase">
                Up to 4.2%/day
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 my-3">
              <div className="rounded-2xl border border-white/10 bg-black/40 p-3">
                <div className="text-[10px] text-slate-400 font-semibold">Total Staked Principal</div>
                <div className="text-lg font-black font-mono text-white mt-0.5">
                  ${totalStakedUSD.toLocaleString()}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/40 p-3">
                <div className="text-[10px] text-slate-400 font-semibold">Daily Accruing Yield</div>
                <div className="text-lg font-black font-mono text-emerald-400 mt-0.5">
                  +${totalDailyEarnings.toFixed(2)}/day
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={onOpenStaking}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#ff7a00] to-amber-500 py-3 text-xs font-black text-white shadow-[0_0_20px_rgba(255,122,0,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer uppercase tracking-wider"
            >
              <Flame size={15} className="fill-white" />
              <span>Stake Now • Explore All 4 Investment Plans</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. ACTIVE INVESTMENT PLANS SECTION (PROMINENTLY DISPLAYED) */}
      <div className="rounded-3xl border border-white/15 bg-[#101438] p-5 sm:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <TrendingUp size={15} />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                <span>Active Staking & Investment Portfolios</span>
                <span className="rounded-full bg-[#ff7a00]/20 border border-[#ff7a00]/40 px-2 py-0.2 text-[10px] font-bold text-[#ff7a00]">
                  {userInvestments.length} Active
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Daily returns are settled automatically to your wallet at 00:00 UTC
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenStaking}
            className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#ff7a00] to-amber-500 px-4 py-1.5 text-xs font-black text-white shadow-[0_0_12px_rgba(255,122,0,0.4)] hover:brightness-110 transition-all cursor-pointer"
          >
            <Plus size={14} />
            <span>+ Stake New Plan</span>
          </button>
        </div>

        {/* Active Plans Cards List */}
        {userInvestments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {userInvestments.map((inv) => {
              const daysLeft = Math.max(0, (inv.durationDays || 14) - (inv.daysElapsed || 1))
              const progressPct = Math.min(100, Math.round(((inv.daysElapsed || 1) / (inv.durationDays || 14)) * 100))

              return (
                <div
                  key={inv.id}
                  className="rounded-2xl border border-white/10 bg-[#151945] p-4 space-y-3 hover:border-[#ff7a00]/50 transition-all relative overflow-hidden group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Flame size={18} className="text-[#ff7a00] fill-[#ff7a00]" />
                      <div>
                        <div className="font-bold text-white text-sm">{inv.planName}</div>
                        <div className="text-[10px] text-slate-400">ID: {inv.id}</div>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[9px] font-black text-emerald-400 uppercase tracking-wider">
                      {inv.status || 'ACTIVE'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-black/40 p-3 rounded-xl border border-white/5 font-mono">
                    <div>
                      <div className="text-[10px] text-slate-400 font-sans">Principal Staked</div>
                      <div className="text-base font-black text-white">
                        ${(Number(inv.depositAmount) || 0).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-sans">Daily Rate (ROI)</div>
                      <div className="text-base font-black text-emerald-400">
                        {inv.dailyRoi || '+2.40%'}
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Maturity Progress: {progressPct}%</span>
                      <span>{daysLeft} Days Remaining</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#ff7a00] to-emerald-400 transition-all duration-500"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-white/5 pt-2 font-sans">
                    <div className="flex items-center gap-1 text-slate-300">
                      <ShieldCheck size={13} className="text-emerald-400" />
                      <span>100% Capital Release</span>
                    </div>
                    <span className="text-slate-300">Ends: {inv.endDate || '2026-09-17'}</span>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="py-8 text-center space-y-3 rounded-2xl bg-black/20 border border-dashed border-white/10 p-6">
            <Flame size={32} className="mx-auto text-[#ff7a00] fill-[#ff7a00]/30" />
            <div className="text-slate-300 font-bold text-sm">No Active Investment Plans Currently Running</div>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Start earning automated daily yields with institutional algorithmic trading models starting from just $100.
            </p>
            <button
              type="button"
              onClick={onOpenStaking}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#ff7a00] to-amber-500 px-6 py-2 text-xs font-black text-white shadow-[0_0_15px_rgba(255,122,0,0.4)] hover:scale-105 transition-all cursor-pointer uppercase tracking-wider"
            >
              <Flame size={14} className="fill-white" />
              <span>Stake Now • Up to 4.2% Daily ROI</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
