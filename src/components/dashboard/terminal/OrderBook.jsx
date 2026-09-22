import { useState, useEffect } from 'react'
import { ArrowUp, ArrowDown, Activity, Clock, Layers } from 'lucide-react'

// Generator for orderbook levels
function generateBookLevels(basePrice, isAsk = true, count = 7) {
  const levels = []
  let cumTotal = 0
  for (let i = 0; i < count; i++) {
    const step = (i + 1) * (basePrice * 0.0004)
    const price = isAsk ? basePrice + step : basePrice - step
    const size = Number((Math.random() * 1.8 + 0.15).toFixed(4))
    cumTotal += size
    levels.push({
      price: Number(price.toFixed(2)),
      size,
      total: Number(cumTotal.toFixed(4))
    })
  }
  return levels
}

export default function OrderBook({ currentPrice = 96420.50, selectedPair = 'BTC/USDT' }) {
  const [tab, setTab] = useState('book') // 'book' | 'trades'
  const [asks, setAsks] = useState(() => generateBookLevels(currentPrice, true, 8))
  const [bids, setBids] = useState(() => generateBookLevels(currentPrice, false, 8))
  const [trades, setTrades] = useState([])
  const [spread, setSpread] = useState('2.40')
  const [spreadPct, setSpreadPct] = useState('0.002%')

  // Generate initial recent trades
  useEffect(() => {
    const initTrades = []
    const now = Date.now()
    for (let i = 0; i < 15; i++) {
      const isBuy = Math.random() > 0.48
      const priceOffset = (Math.random() - 0.5) * 8
      initTrades.push({
        id: `tr-${i}`,
        time: new Date(now - i * 3200).toLocaleTimeString(),
        price: (currentPrice + priceOffset).toFixed(2),
        size: (Math.random() * 1.5 + 0.05).toFixed(4),
        side: isBuy ? 'BUY' : 'SELL'
      })
    }
    setTrades(initTrades)
  }, [currentPrice])

  // Real-time dynamic order book updates & streaming market trades
  useEffect(() => {
    const interval = setInterval(() => {
      // Jitter asks and bids slightly
      setAsks(prevAsks => {
        return prevAsks.map(a => ({
          ...a,
          size: Number(Math.max(0.05, a.size + (Math.random() - 0.5) * 0.2).toFixed(4))
        }))
      })

      setBids(prevBids => {
        return prevBids.map(b => ({
          ...b,
          size: Number(Math.max(0.05, b.size + (Math.random() - 0.5) * 0.2).toFixed(4))
        }))
      })

      // Add a live stream trade
      const isBuy = Math.random() > 0.47
      const priceJitter = (Math.random() - 0.5) * 5
      const newTrade = {
        id: `tr-${Date.now()}`,
        time: new Date().toLocaleTimeString(),
        price: (currentPrice + priceJitter).toFixed(2),
        size: (Math.random() * 1.8 + 0.04).toFixed(4),
        side: isBuy ? 'BUY' : 'SELL'
      }

      setTrades(prev => [newTrade, ...prev.slice(0, 19)])
    }, 1200)

    return () => clearInterval(interval)
  }, [currentPrice])

  const maxAskTotal = asks.length > 0 ? asks[asks.length - 1].total : 1
  const maxBidTotal = bids.length > 0 ? bids[bids.length - 1].total : 1
  const maxVolume = Math.max(maxAskTotal, maxBidTotal, 1)

  return (
    <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl flex flex-col overflow-hidden h-full">
      {/* Header Tabs */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#121212]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTab('book')}
            className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all ${
              tab === 'book'
                ? 'bg-[#B0F127] text-black shadow-sm'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            Order Book
          </button>
          <button
            onClick={() => setTab('trades')}
            className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              tab === 'trades'
                ? 'bg-[#B0F127] text-black shadow-sm'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Activity size={12} />
            Recent Trades
          </button>
        </div>

        <span className="text-[10px] font-mono text-white/40">
          {selectedPair}
        </span>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-3 px-4 py-2 text-[10px] font-mono text-white/40 uppercase border-b border-white/5 bg-[#0a0a0a]">
        <span>Price (USDT)</span>
        <span className="text-right">Size ({selectedPair.split('/')[0]})</span>
        <span className="text-right">{tab === 'book' ? 'Total' : 'Time'}</span>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto min-h-[320px] max-h-[460px] p-2 flex flex-col justify-between font-mono text-xs">
        {tab === 'book' ? (
          <>
            {/* Asks (Sell Orders - Top, Red) */}
            <div className="space-y-1">
              {asks.slice().reverse().map((ask, idx) => {
                const depthPct = Math.min(100, (ask.total / maxVolume) * 100)
                return (
                  <div
                    key={`ask-${idx}`}
                    className="relative grid grid-cols-3 px-2 py-0.5 rounded text-[11px] items-center hover:bg-rose-500/10 cursor-pointer"
                  >
                    {/* Depth Bar Indicator */}
                    <div
                      className="absolute right-0 top-0 bottom-0 bg-rose-500/15 pointer-events-none rounded-r transition-all duration-300"
                      style={{ width: `${depthPct}%` }}
                    />
                    <span className="text-rose-400 font-bold z-10">{ask.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    <span className="text-right text-white/80 z-10">{ask.size.toFixed(4)}</span>
                    <span className="text-right text-white/40 z-10">{ask.total.toFixed(4)}</span>
                  </div>
                )
              })}
            </div>

            {/* Mid Market Spread Ticker */}
            <div className="my-2 py-2 px-3 bg-[#161616] border-y border-white/10 flex items-center justify-between rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-white">
                  ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
                <ArrowUp size={14} className="text-emerald-400 animate-bounce" />
              </div>

              <div className="text-[10px] text-white/50">
                Spread: <span className="text-white font-semibold">${spread}</span> ({spreadPct})
              </div>
            </div>

            {/* Bids (Buy Orders - Bottom, Green) */}
            <div className="space-y-1">
              {bids.map((bid, idx) => {
                const depthPct = Math.min(100, (bid.total / maxVolume) * 100)
                return (
                  <div
                    key={`bid-${idx}`}
                    className="relative grid grid-cols-3 px-2 py-0.5 rounded text-[11px] items-center hover:bg-emerald-500/10 cursor-pointer"
                  >
                    {/* Depth Bar Indicator */}
                    <div
                      className="absolute right-0 top-0 bottom-0 bg-emerald-500/15 pointer-events-none rounded-r transition-all duration-300"
                      style={{ width: `${depthPct}%` }}
                    />
                    <span className="text-emerald-400 font-bold z-10">{bid.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    <span className="text-right text-white/80 z-10">{bid.size.toFixed(4)}</span>
                    <span className="text-right text-white/40 z-10">{bid.total.toFixed(4)}</span>
                  </div>
                )
              })}
            </div>
          </>
        ) : (
          /* Recent Trades Stream */
          <div className="space-y-1.5 divide-y divide-white/5">
            {trades.map((t) => (
              <div
                key={t.id}
                className="grid grid-cols-3 px-2 py-1 text-[11px] items-center hover:bg-white/5 transition-colors"
              >
                <span className={t.side === 'BUY' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                  ${t.price}
                </span>
                <span className="text-right text-white/80">{t.size}</span>
                <span className="text-right text-white/40 text-[10px]">{t.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
