import {
  ChevronDown,
  Wallet,
  PlusCircle,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import CoinLogo from '../CoinLogo'


function TradingHeader({
  activeCoin,
  activeSymbol,
  currentPrice,
  priceFlash,
  tradeMode,
  setTradeMode,
  balances,
  onAddDemoFunds,
  onOpenPairSelector,
}) {
  const isPositive = activeCoin.rawChange24h >= 0
  const formattedPrice = currentPrice.toLocaleString('en-US', {
    minimumFractionDigits: currentPrice < 1 ? 4 : 2,
    maximumFractionDigits: currentPrice < 1 ? 4 : 2,
  })

  return (
    <header className="border-b border-white/10 bg-[#0f132e]/95 backdrop-blur-xl px-4 py-2.5 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left: Pair Picker & Mode Switcher */}
        <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
          {/* Pair Picker Button */}
          <button
            type="button"
            onClick={onOpenPairSelector}
            className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-1.5 hover:border-[#ff7a00]/50 hover:bg-white/[0.08] transition-all group"
          >
            <CoinLogo symbol={activeSymbol} size={24} />
            <div className="text-left">
              <div className="flex items-center gap-1.5 font-bold text-white text-sm">
                <span>{activeSymbol}/USDT</span>
                <ChevronDown size={14} className="text-slate-400 group-hover:text-white transition-colors" />
              </div>
              <div className="text-[0.65rem] text-slate-400 font-semibold uppercase tracking-wider">
                {activeCoin.name}
              </div>
            </div>
          </button>

          {/* Spot / Futures Mode Pill */}
          <div className="flex items-center rounded-lg bg-black/40 border border-white/10 p-0.5 text-xs font-bold">
            <button
              type="button"
              onClick={() => setTradeMode('spot')}
              className={`px-3 py-1 rounded-md transition-all ${
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
              className={`px-3 py-1 rounded-md transition-all ${
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
              {activeCoin.change24h}
            </div>
          </div>
        </div>

        {/* Center/Right: 24h Stats Feed */}
        <div className="hidden xl:flex items-center gap-6 text-xs text-slate-400">
          <div>
            <div className="text-[0.65rem] uppercase font-bold text-slate-400/80">24h High</div>
            <div className="text-white font-semibold">${activeCoin.high24h || 'N/A'}</div>
          </div>
          <div className="h-6 w-[1px] bg-white/10" />
          <div>
            <div className="text-[0.65rem] uppercase font-bold text-slate-400/80">24h Low</div>
            <div className="text-white font-semibold">${activeCoin.low24h || 'N/A'}</div>
          </div>
          <div className="h-6 w-[1px] bg-white/10" />
          <div>
            <div className="text-[0.65rem] uppercase font-bold text-slate-400/80">24h Volume ({activeSymbol})</div>
            <div className="text-white font-semibold">{activeCoin.volume24h}</div>
          </div>
          <div className="h-6 w-[1px] bg-white/10" />
          <div>
            <div className="text-[0.65rem] uppercase font-bold text-slate-400/80">Funding / Countdown</div>
            <div className="text-emerald-400 font-semibold">0.0100% <span className="text-slate-400 font-normal">/ 03:42:15</span></div>
          </div>
        </div>

        {/* Right: Wallet Balance & Demo Capital Button */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 rounded-xl bg-white/[0.03] border border-white/10 px-3 py-1.5 text-xs">
            <Wallet size={14} className="text-[#ff7a00]" />
            <span className="text-slate-400">Avail:</span>
            <span className="font-bold text-white">${balances.USDT.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT</span>
          </div>

          <button
            type="button"
            onClick={onAddDemoFunds}
            className="flex items-center gap-1.5 rounded-full border border-[#ff7a00] bg-gradient-to-r from-[#ff7a00] to-[#ff9500] px-3.5 py-1.5 text-xs font-bold text-white shadow-[0_0_15px_rgba(255,122,0,0.35)] hover:from-[#ff9500] hover:to-[#ffaa33] hover:shadow-[0_0_20px_rgba(255,122,0,0.5)] transition-all cursor-pointer"
            title="Add $10,000 demo funds for instant practice trading"
          >
            <PlusCircle size={14} />
            <span>+ $10K Demo Funds</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default TradingHeader
