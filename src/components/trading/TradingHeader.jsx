import {
  ChevronDown,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  ArrowDownLeft,
  Flame,
  Repeat,
  Gift
} from 'lucide-react'
import CoinLogo from '../CoinLogo'

function TradingHeader({
  activeCoin = {},
  activeSymbol = 'BTC',
  currentPrice = 96000,
  priceFlash,
  tradeMode = 'spot',
  setTradeMode = () => {},
  balances = { USDT: 10000 },
  onOpenPairSelector = () => {},
  onOpenStaking = () => {},
  onOpenDeposit = () => {},
  onOpenWithdraw = () => {},
  onOpenConvert = () => {},
  onOpenReferral = () => {},
}) {
  const isPositive = (activeCoin?.rawChange24h ?? 0) >= 0
  const numPrice = typeof currentPrice === 'number' ? currentPrice : parseFloat(currentPrice) || 0
  const formattedPrice = numPrice.toLocaleString('en-US', {
    minimumFractionDigits: numPrice < 1 ? 4 : 2,
    maximumFractionDigits: numPrice < 1 ? 4 : 2,
  })

  return (
    <header className="border-b border-white/10 bg-[#0f132e]/95 backdrop-blur-xl px-4 py-2.5 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Pair Picker & Mode Switcher */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          {/* Pair Picker Button */}
          <button
            type="button"
            onClick={onOpenPairSelector}
            className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-1.5 hover:border-[#ff7a00]/50 hover:bg-white/[0.08] transition-all group cursor-pointer"
          >
            <CoinLogo symbol={activeSymbol || 'BTC'} size={24} />
            <div className="text-left">
              <div className="flex items-center gap-1.5 font-bold text-white text-sm">
                <span>{activeSymbol || 'BTC'}/USDT</span>
                <ChevronDown size={14} className="text-slate-400 group-hover:text-white transition-colors" />
              </div>
              <div className="text-[0.65rem] text-slate-400 font-semibold uppercase tracking-wider">
                {activeCoin?.name || activeSymbol || 'Bitcoin'}
              </div>
            </div>
          </button>

          {/* Spot / Futures Mode Pill */}
          <div className="flex items-center rounded-lg bg-black/40 border border-white/10 p-0.5 text-xs font-bold">
            <button
              type="button"
              onClick={() => setTradeMode('spot')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                tradeMode === 'spot'
                  ? 'bg-[#ff7a00] text-white shadow-[0_0_12px_rgba(255,122,0,0.35)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Spot
            </button>
            <button
              type="button"
              onClick={() => setTradeMode('futures')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                tradeMode === 'futures'
                  ? 'bg-[#ff7a00] text-white shadow-[0_0_12px_rgba(255,122,0,0.35)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Perp 50x
            </button>
          </div>

          {/* Live Large Price Display */}
          <div className="flex items-baseline gap-2">
            <div
              className={`text-xl sm:text-2xl font-black tracking-tight transition-colors duration-300 ${
                priceFlash === 'up'
                  ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]'
                  : priceFlash === 'down'
                  ? 'text-rose-400 drop-shadow-[0_0_8px_rgba(251,113,133,0.6)]'
                  : isPositive
                  ? 'text-emerald-400'
                  : 'text-rose-400'
              }`}
            >
              ${formattedPrice}
            </div>
            <div
              className={`inline-flex items-center text-xs font-bold ${
                isPositive ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {activeCoin?.change24h || '+0.00%'}
            </div>
          </div>
        </div>

        {/* Center: 24h Stats Feed */}
        <div className="hidden 2xl:flex items-center gap-5 text-xs text-slate-400">
          <div>
            <div className="text-[0.65rem] uppercase font-bold text-slate-400/80">24h High</div>
            <div className="text-white font-semibold">${activeCoin?.high24h || 'N/A'}</div>
          </div>
          <div className="h-5 w-[1px] bg-white/10" />
          <div>
            <div className="text-[0.65rem] uppercase font-bold text-slate-400/80">24h Low</div>
            <div className="text-white font-semibold">${activeCoin?.low24h || 'N/A'}</div>
          </div>
          <div className="h-5 w-[1px] bg-white/10" />
          <div>
            <div className="text-[0.65rem] uppercase font-bold text-slate-400/80">24h Vol</div>
            <div className="text-white font-semibold">{activeCoin?.volume24h || 'N/A'}</div>
          </div>
        </div>

        {/* Right Action Bar: Stake Now + Deposit + Withdraw + Convert + Referrals + Balance */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Stake Now Button (Glowing Orange) */}
          <button
            type="button"
            onClick={onOpenStaking}
            className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#ff7a00] to-amber-500 px-3.5 py-1.5 text-xs font-black text-white shadow-[0_0_18px_rgba(255,122,0,0.5)] hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer uppercase tracking-wider"
            title="View high-yield investment plans & stake daily returns"
          >
            <Flame size={14} className="fill-white" />
            <span>Stake Now</span>
          </button>

          {/* Deposit Button */}
          <button
            type="button"
            onClick={onOpenDeposit}
            className="flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3 py-1.5 text-xs font-bold text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer"
            title="Deposit funds into your wallet"
          >
            <ArrowDownLeft size={13} />
            <span>Deposit</span>
          </button>

          {/* Withdraw Button */}
          <button
            type="button"
            onClick={onOpenWithdraw}
            className="flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1.5 text-xs font-bold text-slate-200 hover:border-white/30 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
            title="Withdraw crypto to external wallet"
          >
            <ArrowUpRight size={13} />
            <span>Withdraw</span>
          </button>

          {/* Convert Button */}
          <button
            type="button"
            onClick={onOpenConvert}
            className="flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1.5 text-xs font-bold text-slate-200 hover:border-[#ff7a00]/40 hover:text-[#ff7a00] transition-all cursor-pointer"
            title="Instant 0% fee crypto swap"
          >
            <Repeat size={13} />
            <span>Convert</span>
          </button>

          {/* Referral Button */}
          <button
            type="button"
            onClick={onOpenReferral}
            className="flex items-center gap-1 rounded-full border border-purple-500/40 bg-purple-500/15 px-3 py-1.5 text-xs font-bold text-purple-300 hover:bg-purple-500 hover:text-white transition-all cursor-pointer"
            title="Referral link & partner commissions"
          >
            <Gift size={13} />
            <span className="hidden sm:inline">Referral</span>
          </button>

          {/* Balance Pill */}
          <div className="flex items-center gap-1.5 rounded-xl bg-white/[0.04] border border-white/10 px-3 py-1.5 text-xs">
            <Wallet size={13} className="text-[#ff7a00]" />
            <span className="text-slate-400 hidden sm:inline">Avail:</span>
            <span className="font-bold text-white font-mono">
              ${(balances?.USDT ?? 10000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default TradingHeader
