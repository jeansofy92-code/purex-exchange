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
    <header className="border-b border-white/10 bg-[#060a0b]/95 backdrop-blur-xl px-4 py-2.5 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left: Pair Picker & Mode Switcher */}
        <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
          {/* Pair Picker Button */}
          <button
            type="button"
            onClick={onOpenPairSelector}
            className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-1.5 hover:border-[#58e65b]/50 hover:bg-white/[0.08] transition-all group"
          >
            <CoinLogo symbol={activeSymbol} size={24} />
            <div className="text-left">
              <div className="flex items-center gap-1.5 font-bold text-white text-sm">
                <span>{activeSymbol}/USDT</span>
                <ChevronDown size={14} className="text-[#8d9691] group-hover:text-white transition-colors" />
              </div>
              <div className="text-[0.65rem] text-[#8d9691] font-semibold uppercase tracking-wider">
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
                  ? 'bg-[#183a1d] text-[#58e65b] border border-[#58e65b]/40 shadow-[0_0_10px_rgba(88,230,91,0.2)]'
                  : 'text-[#8d9691] hover:text-white'
              }`}
            >
              Spot
            </button>
            <button
              type="button"
              onClick={() => setTradeMode('futures')}
              className={`px-3 py-1 rounded-md transition-all ${
                tradeMode === 'futures'
                  ? 'bg-[#183a1d] text-[#58e65b] border border-[#58e65b]/40 shadow-[0_0_10px_rgba(88,230,91,0.2)]'
                  : 'text-[#8d9691] hover:text-white'
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
                  ? 'text-[#58e65b] drop-shadow-[0_0_8px_rgba(88,230,91,0.6)]'
                  : priceFlash === 'down'
                  ? 'text-[#ff6b6b] drop-shadow-[0_0_8px_rgba(255,107,107,0.6)]'
                  : isPositive
                  ? 'text-[#58e65b]'
                  : 'text-[#ff6b6b]'
              }`}
            >
              ${formattedPrice}
            </div>
            <div
              className={`inline-flex items-center text-xs font-bold ${
                isPositive ? 'text-[#58e65b]' : 'text-[#ff6b6b]'
              }`}
            >
              {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {activeCoin.change24h}
            </div>
          </div>
        </div>

        {/* Center/Right: 24h Stats Feed */}
        <div className="hidden xl:flex items-center gap-6 text-xs text-[#8d9691]">
          <div>
            <div className="text-[0.65rem] uppercase font-bold text-[#8d9691]/80">24h High</div>
            <div className="text-white font-semibold">${activeCoin.high24h || 'N/A'}</div>
          </div>
          <div className="h-6 w-[1px] bg-white/10" />
          <div>
            <div className="text-[0.65rem] uppercase font-bold text-[#8d9691]/80">24h Low</div>
            <div className="text-white font-semibold">${activeCoin.low24h || 'N/A'}</div>
          </div>
          <div className="h-6 w-[1px] bg-white/10" />
          <div>
            <div className="text-[0.65rem] uppercase font-bold text-[#8d9691]/80">24h Volume ({activeSymbol})</div>
            <div className="text-white font-semibold">{activeCoin.volume24h}</div>
          </div>
          <div className="h-6 w-[1px] bg-white/10" />
          <div>
            <div className="text-[0.65rem] uppercase font-bold text-[#8d9691]/80">Funding / Countdown</div>
            <div className="text-[#58e65b] font-semibold">0.0100% <span className="text-[#8d9691] font-normal">/ 03:42:15</span></div>
          </div>
        </div>

        {/* Right: Wallet Balance & Demo Capital Button */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 rounded-xl bg-white/[0.03] border border-white/10 px-3 py-1.5 text-xs">
            <Wallet size={14} className="text-[#58e65b]" />
            <span className="text-[#8d9691]">Avail:</span>
            <span className="font-bold text-white">${balances.USDT.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT</span>
          </div>

          <button
            type="button"
            onClick={onAddDemoFunds}
            className="flex items-center gap-1.5 rounded-xl border border-[#58e65b]/40 bg-[#183a1d]/60 px-3 py-1.5 text-xs font-bold text-[#58e65b] hover:bg-[#183a1d] hover:shadow-[0_0_14px_rgba(88,230,91,0.3)] transition-all"
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
