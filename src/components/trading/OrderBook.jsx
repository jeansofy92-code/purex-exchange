import { useState } from 'react'
import { ArrowUp, ArrowDown } from 'lucide-react'

function OrderBook({
  orderBook = { asks: [], bids: [] },
  recentTrades = [],
  currentPrice = 96000,
  priceFlash,
  activeSymbol = 'BTC',
  onSelectPrice = () => {}
}) {
  const [activeTab, setActiveTab] = useState('book') // 'book' | 'trades'

  const asks = orderBook?.asks || []
  const bids = orderBook?.bids || []
  const trades = recentTrades || []

  const maxAskTotal = asks.length > 0 ? asks[0].total : 1
  const maxBidTotal = bids.length > 0 ? bids[bids.length - 1].total : 1
  const maxDepth = Math.max(maxAskTotal, maxBidTotal) || 1

  const numPrice = typeof currentPrice === 'number' ? currentPrice : parseFloat(currentPrice) || 0
  const formattedMidPrice = numPrice.toLocaleString('en-US', {
    minimumFractionDigits: numPrice < 1 ? 4 : 2,
    maximumFractionDigits: numPrice < 1 ? 4 : 2,
  })

  return (
    <div className="flex flex-col h-full bg-[#0d1029] border-r border-b border-white/10 select-none text-xs">
      {/* Header Tabs */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-[#111535]">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('book')}
            className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
              activeTab === 'book'
                ? 'bg-[#ff7a00] text-white shadow-[0_0_10px_rgba(255,122,0,0.3)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Order Book
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('trades')}
            className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
              activeTab === 'trades'
                ? 'bg-[#ff7a00] text-white shadow-[0_0_10px_rgba(255,122,0,0.3)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Market Trades
          </button>
        </div>

        <div className="text-[0.65rem] text-slate-400 font-semibold uppercase">
          0.01
        </div>
      </div>

      {activeTab === 'book' ? (
        <div className="flex-1 flex flex-col justify-between overflow-hidden p-2">
          {/* Asks (Sell orders in red) */}
          <div className="space-y-0.5">
            <div className="grid grid-cols-3 text-[0.65rem] font-bold uppercase tracking-wider text-slate-400 pb-1 border-b border-white/5 px-1">
              <div>Price (USDT)</div>
              <div className="text-right">Size ({activeSymbol})</div>
              <div className="text-right">Total</div>
            </div>

            <div className="space-y-0.5">
              {asks.slice(-7).map((ask, index) => {
                const depthPct = ((ask.total || 0) / maxDepth) * 100
                return (
                  <div
                    key={`ask-${index}`}
                    onClick={() => onSelectPrice(ask.price)}
                    className="relative grid grid-cols-3 py-0.5 px-1 font-mono text-[0.72rem] hover:bg-white/[0.04] cursor-pointer rounded transition-colors group"
                  >
                    <div
                      className="absolute right-0 top-0 bottom-0 bg-rose-500/10 pointer-events-none rounded-r"
                      style={{ width: `${Math.min(100, depthPct)}%` }}
                    />
                    <div className="text-rose-400 font-bold z-10">
                      {typeof ask.price === 'number' ? ask.price.toLocaleString(undefined, { minimumFractionDigits: ask.price < 1 ? 4 : 2 }) : ask.price}
                    </div>
                    <div className="text-right text-slate-300 z-10">{ask.size}</div>
                    <div className="text-right text-slate-400 z-10">{ask.total}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Spread / Mid Market Price Bar */}
          <div className="my-1.5 py-1.5 px-2.5 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between font-mono">
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-black transition-colors ${
                  priceFlash === 'up'
                    ? 'text-emerald-400'
                    : priceFlash === 'down'
                    ? 'text-rose-400'
                    : 'text-white'
                }`}
              >
                ${formattedMidPrice}
              </span>
              {priceFlash === 'up' ? (
                <ArrowUp size={14} className="text-emerald-400 animate-bounce" />
              ) : priceFlash === 'down' ? (
                <ArrowDown size={14} className="text-rose-400 animate-bounce" />
              ) : null}
            </div>
            <div className="text-[0.65rem] text-slate-400 flex items-center gap-1">
              <span>Spread:</span>
              <span className="text-slate-300 font-bold">0.01 (0.01%)</span>
            </div>
          </div>

          {/* Bids (Buy orders in green) */}
          <div className="space-y-0.5">
            {bids.slice(0, 7).map((bid, index) => {
              const depthPct = ((bid.total || 0) / maxDepth) * 100
              return (
                <div
                  key={`bid-${index}`}
                  onClick={() => onSelectPrice(bid.price)}
                  className="relative grid grid-cols-3 py-0.5 px-1 font-mono text-[0.72rem] hover:bg-white/[0.04] cursor-pointer rounded transition-colors group"
                >
                  <div
                    className="absolute right-0 top-0 bottom-0 bg-emerald-500/10 pointer-events-none rounded-r"
                    style={{ width: `${Math.min(100, depthPct)}%` }}
                  />
                  <div className="text-emerald-400 font-bold z-10">
                    {typeof bid.price === 'number' ? bid.price.toLocaleString(undefined, { minimumFractionDigits: bid.price < 1 ? 4 : 2 }) : bid.price}
                  </div>
                  <div className="text-right text-slate-300 z-10">{bid.size}</div>
                  <div className="text-right text-slate-400 z-10">{bid.total}</div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        /* Market Trades Tab */
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <div className="grid grid-cols-3 text-[0.65rem] font-bold uppercase tracking-wider text-slate-400 pb-1 border-b border-white/5 px-1">
            <div>Price (USDT)</div>
            <div className="text-right">Size</div>
            <div className="text-right">Time</div>
          </div>

          {trades.map((trade) => (
            <div
              key={trade.id}
              className="grid grid-cols-3 py-0.5 px-1 font-mono text-[0.72rem] hover:bg-white/[0.02] rounded"
            >
              <div className={`font-bold ${trade.isBuy ? 'text-emerald-400' : 'text-rose-400'}`}>
                ${trade.price}
              </div>
              <div className="text-right text-slate-300">{trade.amount}</div>
              <div className="text-right text-slate-400 text-[0.68rem]">{trade.time}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrderBook
