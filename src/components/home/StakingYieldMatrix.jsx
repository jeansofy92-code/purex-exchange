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
  Percent,
  Coins,
  CheckCircle2
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
    dailyRate: 0.068, // ~24.8% APY
    minDeposit: 500,
    lockDays: 'Flexible / 30D',
    tvl: '$48.5M',
    risk: 'Protected Principal',
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
  const [selectedDuration, setSelectedDuration] = useState(30) // days
  const [autoCompound, setAutoCompound] = useState(true)

  // Calculations
  const dailyReturnUsd = (depositAmount * (selectedVault.dailyRate / 100))
  let totalEstimatedProfit = 0
  if (autoCompound) {
    totalEstimatedProfit = depositAmount * Math.pow(1 + selectedVault.dailyRate / 100, selectedDuration) - depositAmount
  } else {
    totalEstimatedProfit = dailyReturnUsd * selectedDuration
  }
  const totalPayout = depositAmount + totalEstimatedProfit

  return (
    <section id="staking-matrix" className="relative mx-auto max-w-[1440px] px-3.5 py-12 sm:px-6 lg:px-10">
      {/* Section Title */}
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-xs font-semibold text-emerald-400">
            <Coins size={13} />
            <span>INSTITUTIONAL DEFI VAULTS & PASSIVE YIELD</span>
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            High-Yield Staking & Algorithmic Vaults
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-2xl">
            Automated compounding strategies managed across top liquidity pools with 100% principal insurance coverage.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <ShieldCheck size={16} className="text-emerald-400" />
          <span>$125M SAFU Reserve Backed</span>
        </div>
      </div>

      {/* Grid of 4 Vault Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stakingVaults.map((vault) => {
          const isSelected = selectedVault.id === vault.id
          return (
            <div
              key={vault.id}
              onClick={() => {
                setSelectedVault(vault)
                if (depositAmount < vault.minDeposit) setDepositAmount(vault.minDeposit)
              }}
              className={`relative rounded-2xl border p-5 transition-all cursor-pointer backdrop-blur-xl ${
                isSelected
                  ? 'border-emerald-500/80 bg-gradient-to-b from-emerald-950/40 via-slate-900/90 to-[#070b12] shadow-[0_0_30px_rgba(52,211,153,0.15)] scale-[1.01]'
                  : 'border-slate-800 bg-[#090d14]/80 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              {vault.highlight && (
                <span className="absolute -top-2.5 right-4 rounded-full bg-emerald-400 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-slate-950 shadow-md">
                  TOP YIELD
                </span>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CoinLogo symbol={vault.symbol} size={28} />
                  <div>
                    <div className="font-bold text-white text-sm">{vault.name}</div>
                    <div className="text-[11px] font-mono text-slate-400">{vault.coin}</div>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-1">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Estimated APY</div>
                <div className="font-mono text-3xl font-black text-emerald-400">{vault.apy}</div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-800/80 pt-3 text-[11px] font-mono text-slate-400">
                <div>
                  <span className="text-[10px] text-slate-500 block">TVL Locked</span>
                  <span className="font-bold text-slate-200">{vault.tvl}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Min Deposit</span>
                  <span className="font-bold text-slate-200">${vault.minDeposit}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-[11px] text-emerald-400 font-semibold pt-1">
                <span>{isSelected ? '✓ Configured Below' : 'Click to Estimate'}</span>
                <ArrowRight size={13} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Interactive Live Staking Workbench / Calculator Bar */}
      <div className="rounded-2xl border border-slate-800 bg-[#070b12]/95 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Calculator size={18} className="text-emerald-400" />
                <span className="font-bold text-white text-sm">
                  Simulate Yield: <span className="text-emerald-400 font-mono">{selectedVault.name}</span>
                </span>
              </div>
              <span className="font-mono text-xs text-slate-400">
                APY: <strong className="text-emerald-400">{selectedVault.apy}</strong>
              </span>
            </div>

            {/* Deposit Slider & Number Input */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-400">
                <span>Enter Staking Capital:</span>
                <span className="font-mono text-white">${depositAmount.toLocaleString()} USD</span>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-lg font-bold text-emerald-400">
                  $
                </span>
                <input
                  type="number"
                  min={selectedVault.minDeposit}
                  max={250000}
                  step={100}
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-9 pr-4 py-3 font-mono text-xl font-bold text-white focus:border-emerald-400 focus:outline-none"
                />
              </div>
              <input
                type="range"
                min={selectedVault.minDeposit}
                max={50000}
                step={250}
                value={depositAmount}
                onChange={(e) => setDepositAmount(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            {/* Lock Duration Pills */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400">Lockup Term:</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: 'Flexible (7D)', days: 7 },
                  { label: '30 Days', days: 30 },
                  { label: '90 Days (+2% Bonus)', days: 90 },
                  { label: '180 Days (+5% Bonus)', days: 180 },
                ].map((term) => (
                  <button
                    key={term.days}
                    type="button"
                    onClick={() => setSelectedDuration(term.days)}
                    className={`py-2 px-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer text-center ${
                      selectedDuration === term.days
                        ? 'bg-emerald-400 text-slate-950 shadow-[0_0_12px_rgba(52,211,153,0.3)]'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {term.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Auto Compound Switch */}
            <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-3">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-emerald-400" />
                <div>
                  <div className="text-xs font-bold text-white">Daily Auto-Compounding Yield</div>
                  <div className="text-[11px] text-slate-400">Automatically reinvests daily earnings for maximum ROI</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={autoCompound}
                onChange={(e) => setAutoCompound(e.target.checked)}
                className="h-4 w-4 rounded accent-emerald-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Result Output Card (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-b from-emerald-950/30 via-slate-950 to-[#070b12] p-6 shadow-2xl space-y-5 font-mono">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-sans">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Estimated Returns</span>
                <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-400">
                  {selectedDuration} Days Term
                </span>
              </div>

              <div>
                <div className="text-xs text-slate-400 font-sans">Daily Projected Profit:</div>
                <div className="text-2xl font-bold text-white">
                  ${dailyReturnUsd.toFixed(2)} <span className="text-xs text-emerald-400 font-normal">/ day</span>
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-400 font-sans">Total Net Earnings:</div>
                <div className="text-3xl font-black text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                  +${totalEstimatedProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 space-y-1.5 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Initial Capital:</span>
                  <span className="text-white">${depositAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-white pt-1 border-t border-slate-800">
                  <span>Total at Maturity:</span>
                  <span className="text-emerald-400 font-mono text-sm">${totalPayout.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>

              <Link
                to="/signup"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-slate-950 shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:bg-emerald-300 transition-all cursor-pointer"
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
