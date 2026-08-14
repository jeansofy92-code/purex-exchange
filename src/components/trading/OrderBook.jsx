import { useState } from 'react'
import { ArrowUp, ArrowDown } from 'lucide-react'


function OrderBook({ orderBook, recentTrades, currentPrice, priceFlash, activeSymbol, onSelectPrice }) {
  const [activeTab, setActiveTab] = useState('book') // 'book' | 'trades'

  const maxAskTotal = orderBook.asks.length > 0 ? orderBook.asks[0].total : 1
  const maxBidTotal = orderBook.bids.length > 0 ? orderBook.bids[orderBook.bids.length - 1].total : 1
  const maxDepth = Math.max(maxAskTotal, maxBidTotal) || 1

  return (
    <div className="flex flex-col h-full bg-[#060a0b] border-r border-b border-white/10 select-none text-xs">
      {/* Header Tabs */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-[#080d0e]">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('book')}
            className={`px-2.5 py-1 rounded-md font-bold transition-all ${
              activeTab === 'book'
                ? 'bg-white/10 text-white'
                : 'text-[#8d9691] hover:text-white'
            }`}
          >
            Order Book
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('trades')}
            className={`px-2.5 py-1 rounded-md font-bold transition-all ${
              activeTab === 'trades'
                ? 'bg-white/10 text-white'
                : 'text-[#8d9691] hover:text-white'
            }`}
          >
            Market Trades
          </button>
        </div>

        <div className="text-[0.65rem] text-[#8d9691] font-semibold uppercase">
          0.01
        </div>
      </div>

      {activeTab === 'book' ? (
        <div className="flex-1 flex flex-col justify-between overflow-hidden p-2">
          {/* Asks (Sell orders in red) */}
          <div className="space-y-0.5">
            <div className="grid grid-cols-3 text-[0.65rem] font-bold uppercase tracking-wider text-[#8d9691] pb-1 border-b border-white/5 px-1">
              <div>Price (USDT)</div>
              <div className="text-right">Size ({activeSymbol})</div>
              <div className="text-right">Total</div>
            </div>

            <div className="space-y-0.5">
              {orderBook.asks.slice(-7).map((ask, index) => {
                const depthPct = (ask.total / maxDepth) * 100
                return (
                  <div
                    key={`ask-${index}`}
                    onClick={() => onSelectPrice && onSelectPrice(ask.price.toFixed(ask.price < 1 ? 4 : 2))}
                    className="relative grid grid-cols-3 px-1 py-0.5 font-mono cursor-pointer hover:bg-white/5 transition-colors group"
                  >
                    {/* Red Depth Bar */}
                    <div
                      className="absolute right-0 top-0 bottom-0 bg-[#ff6b6b]/15 pointer-events-none transition-all"
                      style={{ width: `${depthPct}%` }}
                    />
                    <div className="text-[#ff6b6b] font-semibold z-10">
                      ${ask.price.toFixed(ask.price < 1 ? 4 : 2)}
                    </div>
                    <div className="text-right text-[#dfe9e2] z-10">{ask.size}</div>
                    <div className="text-right text-[#8d9691] z-10">{ask.total}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Current Mid Price Banner */}
          <div className="py-2 my-1 px-2 rounded-lg bg-black/40 border-y border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span
                className={`text-base font-black font-mono ${
                  priceFlash === 'up' ? 'text-[#58e65b]' : priceFlash === 'down' ? 'text-[#ff6b6b]' : 'text-white'
                }`}
              >
                ${currentPrice.toLocaleString('en-US', { minimumFractionDigits: currentPrice < 1 ? 4 : 2 })}
              </span>
              {priceFlash === 'up' ? (
                <ArrowUp size={14} className="text-[#58e65b]" />
              ) : priceFlash === 'down' ? (
                <ArrowDown size={14} className="text-[#ff6b6b]" />
              ) : null}
            </div>

            <div className="text-[0.65rem] text-[#8d9691]">
              Spread: <span className="text-white">${orderBook.spread || '0.01'}</span>
            </div>
          </div>

          {/* Bids (Buy orders in green) */}
          <div className="space-y-0.5">
            {orderBook.bids.slice(0, 7).map((bid, index) => {
              const depthPct = (bid.total / maxDepth) * 100
              return (
                <div
                  key={`bid-${index}`}
                  onClick={() => onSelectPrice && onSelectPrice(bid.price.toFixed(bid.price < 1 ? 4 : 2))}
                  className="relative grid grid-cols-3 px-1 py-0.5 font-mono cursor-pointer hover:bg-white/5 transition-colors group"
                >
                  {/* Green Depth Bar */}
                  <div
                    className="absolute right-0 top-0 bottom-0 bg-[#58e65b]/15 pointer-events-none transition-all"
                    style={{ width: `${depthPct}%` }}
                  />
                  <div className="text-[#58e65b] font-semibold z-10">
                    ${bid.price.toFixed(bid.price < 1 ? 4 : 2)}
                  </div>
                  <div className="text-right text-[#dfe9e2] z-10">{bid.size}</div>
                  <div className="text-right text-[#8d9691] z-10">{bid.total}</div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        /* Market Trades List */
        <div className="flex-1 overflow-y-auto p-2 scrollbar-thin">
          <div className="grid grid-cols-3 text-[0.65rem] font-bold uppercase tracking-wider text-[#8d9691] pb-1.5 border-b border-white/5 px-1">
            <div>Price (USDT)</div>
            <div className="text-right">Amount</div>
            <div className="text-right">Time</div>
          </div>

          <div className="space-y-1 mt-1 font-mono">
            {recentTrades.map((t) => (
              <div
                key={t.id}
                onClick={() => onSelectPrice && onSelectPrice(t.price)}
                className="grid grid-cols-3 px-1 py-0.5 hover:bg-white/5 cursor-pointer rounded"
              >
                <div className={`font-semibold ${t.isBuy ? 'text-[#58e65b]' : 'text-[#ff6b6b]'}`}>
                  ${t.price}
                </div>
                <div className="text-right text-[#dfe9e2]">{t.amount}</div>
                <div className="text-right text-[#8d9691] text-[0.68rem]">{t.time}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderBook
