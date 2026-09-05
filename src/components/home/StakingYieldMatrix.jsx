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
  Coins
} from 'lucide-react'
import { Link } from 'react-router-dom'
import CoinLogo from '../CoinLogo'

const stakingVaults = [
  {
    id: 'purex-diamond',
    name: 'Purex Diamond Tier',
    symbol: 'PUREX',
    coin: 'Purex Token',
    apy: '24.8%',
    dailyRate: 0.068,
    minDeposit: 500,
    lockDays: 'Flexible / 30D',
    tvl: '$48.5M',
    risk: 'Principal Protected',
    highlight: true,
  },
  {
    id: 'eth-liquid',
    name: 'ETH Liquid Yield Vault',
    symbol: 'ETH',
    coin: 'Ethereum',
    apy: '8.9%',
    dailyRate: 0.0244,
    minDeposit: 1000,
    lockDays: 'Instant Unstake',
    tvl: '$184.2M',
    risk: 'Audited Smart Contract',
    highlight: false,
  },
  {
    id: 'btc-yield',
    name: 'BTC Prime Staking Pool',
    symbol: 'BTC',
    coin: 'Bitcoin',
    apy: '7.2%',
    dailyRate: 0.0197,
    minDeposit: 2500,
    lockDays: '30D - 90D',
    tvl: '$310.0M',
    risk: 'Cold Storage Vaults',
    highlight: false,
  },
  {
    id: 'usdt-highyield',
    name: 'USDT Stable Vault',
    symbol: 'USDT',
    coin: 'Tether USD',
    apy: '14.5%',
    dailyRate: 0.0397,
    minDeposit: 250,
    lockDays: 'Flexible Daily Payout',
    tvl: '$126.8M',
    risk: '1:1 Cash Backed',
    highlight: false,
  },
]

export default function StakingYieldMatrix() {
  const [selectedVault, setSelectedVault] = useState(stakingVaults[0])
  const [depositAmount, setDepositAmount] = useState(5000)
  const [selectedDuration, setSelectedDuration] = useState(30)
  const [autoCompound, setAutoCompound] = useState(true)

  const dailyReturnUsd = depositAmount * (selectedVault.dailyRate / 100)
  let totalEstimatedProfit = 0
  if (autoCompound) {
    totalEstimatedProfit = depositAmount * Math.pow(1 + selectedVault.dailyRate / 100, selectedDuration) - depositAmount
  } else {
    totalEstimatedProfit = dailyReturnUsd * selectedDuration
  }
  const totalPayout = depositAmount + totalEstimatedProfit

  return (
    <section id="staking-matrix" className="relative mx-auto max-w-[1440px] px-3.5 py-4 sm:px-6 lg:px-10">
      {/* Section Title */}
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-950/40 px-3 py-0.5 text-xs font-semibold text-amber-400">
            <Coins size={12} />
            <span>INSTITUTIONAL DEFI VAULTS & PASSIVE YIELD</span>
          </div>
          <h2 className="mt-1.5 text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white">
            High-Yield Staking & Algorithmic Vaults
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl">
            Automated compounding strategies managed across top liquidity pools with 100% principal insurance coverage.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300">
          <ShieldCheck size={15} className="text-amber-400" />
          <span>$125M SAFU Protected</span>
        </div>
      </div>

      {/* Grid of 4 Vault Cards - Compact */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-4">
        {stakingVaults.map((vault) => {
          const isSelected = selectedVault.id === vault.id
          return (
            <div
              key={vault.id}
              onClick={() => {
                setSelectedVault(vault)
                if (depositAmount < vault.minDeposit) setDepositAmount(vault.minDeposit)
              }}
              className={`relative rounded-2xl border p-4 transition-all cursor-pointer backdrop-blur-xl ${
                isSelected
                  ? 'border-amber-500/80 bg-gradient-to-b from-amber-950/30 via-slate-900/95 to-[#080a0f] shadow-[0_0_24px_rgba(245,158,11,0.2)] scale-[1.01]'
                  : 'border-slate-800 bg-[#090b10]/90 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              {vault.highlight && (
                <span className="absolute -top-2 right-3 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-slate-950 shadow">
                  TOP YIELD
                </span>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CoinLogo symbol={vault.symbol} size={24} />
                  <div>
                    <div className="font-bold text-white text-xs sm:text-sm">{vault.name}</div>
                    <div className="text-[10px] font-mono text-slate-400">{vault.coin}</div>
                  </div>
                </div>
              </div>

              <div className="mt-3 space-y-0.5">
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Estimated APY</div>
                <div className="font-mono text-2xl font-black text-amber-400">{vault.apy}</div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-800/80 pt-2 text-[10px] font-mono text-slate-400">
                <div>
                  <span className="text-slate-500 block">TVL Locked</span>
                  <span className="font-bold text-slate-200">{vault.tvl}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Min Deposit</span>
                  <span className="font-bold text-slate-200">${vault.minDeposit}</span>
                </div>
              </div>

              <div className="mt-2.5 flex items-center justify-between text-[10px] text-amber-400 font-semibold">
                <span>{isSelected ? '✓ Selected Below' : 'Click to Configure'}</span>
                <ArrowRight size={12} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Interactive Staking Calculator Workbench */}
      <div className="rounded-2xl border border-amber-500/20 bg-[#080a0f]/95 p-4 sm:p-6 backdrop-blur-2xl shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Controls (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <Calculator size={16} className="text-amber-400" />
                <span className="font-bold text-white text-xs sm:text-sm">
                  Simulate Yield: <span className="text-amber-400 font-mono">{selectedVault.name}</span>
                </span>
              </div>
              <span className="font-mono text-xs text-slate-300">
                APY: <strong className="text-amber-400">{selectedVault.apy}</strong>
              </span>
            </div>

            {/* Deposit Slider & Input */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span>Deposit Capital (USD):</span>
                <span className="font-mono text-amber-400">${depositAmount.toLocaleString()}</span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-base font-bold text-amber-400">
                  $
                </span>
                <input
                  type="number"
                  min={selectedVault.minDeposit}
                  max={250000}
                  step={100}
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-8 pr-4 py-2.5 font-mono text-lg font-bold text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
              <input
                type="range"
                min={selectedVault.minDeposit}
                max={50000}
                step={250}
                value={depositAmount}
                onChange={(e) => setDepositAmount(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            {/* Lock Duration Pills */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-300">Lockup Term:</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: 'Flexible (7D)', days: 7 },
                  { label: '30 Days', days: 30 },
                  { label: '90 Days (+2%)', days: 90 },
                  { label: '180 Days (+5%)', days: 180 },
                ].map((term) => (
                  <button
                    key={term.days}
                    type="button"
                    onClick={() => setSelectedDuration(term.days)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer text-center ${
                      selectedDuration === term.days
                        ? 'bg-amber-400 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                        : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    {term.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Auto Compound Switch */}
            <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-2.5">
              <div className="flex items-center gap-2">
                <Sparkles size={15} className="text-amber-400" />
                <div>
                  <div className="text-xs font-bold text-white">Daily Auto-Compounding</div>
                  <div className="text-[10px] text-slate-400">Automatically reinvests daily earnings for maximum APY</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={autoCompound}
                onChange={(e) => setAutoCompound(e.target.checked)}
                className="h-4 w-4 rounded accent-amber-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Result Output Card (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border-2 border-amber-500/40 bg-gradient-to-b from-amber-950/40 via-slate-950 to-[#080a0f] p-5 shadow-2xl space-y-4 font-mono">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 font-sans">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Estimated Returns</span>
                <span className="rounded bg-amber-500/20 px-2 py-0.5 text-xs font-bold text-amber-400">
                  {selectedDuration} Days Term
                </span>
              </div>

              <div>
                <div className="text-[11px] text-slate-400 font-sans">Daily Projected Profit:</div>
                <div className="text-xl font-bold text-white">
                  ${dailyReturnUsd.toFixed(2)} <span className="text-xs text-amber-400 font-normal">/ day</span>
                </div>
              </div>

              <div>
                <div className="text-[11px] text-slate-400 font-sans">Total Net Earnings:</div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                  +${totalEstimatedProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-2.5 space-y-1 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Initial Capital:</span>
                  <span className="text-white">${depositAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-white pt-1 border-t border-slate-800">
                  <span>Total at Maturity:</span>
                  <span className="text-amber-400 font-mono">${totalPayout.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>

              <Link
                to="/signup"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 py-3 font-sans text-xs font-black uppercase tracking-wider text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Deposit & Stake in {selectedVault.name}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
