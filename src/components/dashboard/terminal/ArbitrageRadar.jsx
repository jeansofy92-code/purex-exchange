import { useState, useEffect } from 'react'
import { 
  Zap, 
  RefreshCw, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  Flame, 
  AlertCircle,
  ExternalLink,
  Coins
} from 'lucide-react'
import { useAuth } from '../../../context/AuthContext'

const EXCHANGES = ['PureX Pool', 'Binance', 'Coinbase Pro', 'Kraken', 'OKX', 'Bybit']

export default function ArbitrageRadar({ 
  currentPrice = 96420, 
  selectedPair = 'BTC/USDT' 
}) {
  const { user, executeTrade } = useAuth()
  const [tradeAmount, setTradeAmount] = useState(2500)
  const [isExecuting, setIsExecuting] = useState(false)
  const [lastExecutedResult, setLastExecutedResult] = useState(null)
  const [spreadRows, setSpreadRows] = useState([])
  const [refreshInterval, setRefreshInterval] = useState(2000)

  // Real-time dynamic cross-exchange price simulation
  useEffect(() => {
    const updateSpreads = () => {
      const base = currentPrice
      const rows = [
        {
          id: 'arb-1',
          buyExchange: 'Binance',
          buyPrice: base * (1 - 0.0035 + (Math.random() * 0.001 - 0.0005)),
          sellExchange: 'PureX Pool',
          sellPrice: base * (1 + 0.0042 + (Math.random() * 0.001 - 0.0005)),
          latencyMs: 9,
          confidence: '99.8%',
          dexRoute: 'MEV Protected Flash Route'
        },
        {
          id: 'arb-2',
          buyExchange: 'Kraken',
          buyPrice: base * (1 - 0.0028 + (Math.random() * 0.001 - 0.0005)),
          sellExchange: 'Coinbase Pro',
          sellPrice: base * (1 + 0.0031 + (Math.random() * 0.001 - 0.0005)),
          latencyMs: 14,
          confidence: '99.4%',
          dexRoute: 'Cross-CEX Atomic Bridge'
        },
        {
          id: 'arb-3',
          buyExchange: 'OKX',
          buyPrice: base * (1 - 0.004 + (Math.random() * 0.001 - 0.0005)),
          sellExchange: 'Bybit',
          sellPrice: base * (1 + 0.0025 + (Math.random() * 0.001 - 0.0005)),
          latencyMs: 11,
          confidence: '99.1%',
          dexRoute: 'HFT Triangular Router'
        },
        {
          id: 'arb-4',
          buyExchange: 'Bybit',
          buyPrice: base * (1 - 0.002 + (Math.random() * 0.001 - 0.0005)),
          sellExchange: 'PureX Pool',
          sellPrice: base * (1 + 0.0055 + (Math.random() * 0.001 - 0.0005)),
          latencyMs: 7,
          confidence: '99.9%',
          dexRoute: 'Direct L2 Arbitrage Desk'
        }
      ]

      const formatted = rows.map((r) => {
        const spreadPct = ((r.sellPrice - r.buyPrice) / r.buyPrice) * 100
        const estProfit = (tradeAmount * (spreadPct / 100)) - (tradeAmount * 0.0005) // Net of gas
        return {
          ...r,
          spreadPct: Math.max(0.12, spreadPct),
          estProfit: Math.max(1.5, estProfit)
        }
      })

      // Sort by highest spread
      formatted.sort((a, b) => b.spreadPct - a.spreadPct)
      setSpreadRows(formatted)
    }

    updateSpreads()
    const timer = setInterval(updateSpreads, refreshInterval)
    return () => clearInterval(timer)
  }, [currentPrice, tradeAmount, refreshInterval])

  // Execute flash arbitrage trade
  const handleExecuteArbitrage = async (row) => {
    if (isExecuting) return
    setIsExecuting(true)
    setLastExecutedResult(null)

    // Simulate 600ms network execution
    setTimeout(() => {
      const netProfit = Number(row.estProfit.toFixed(2))
      const res = executeTrade({
        pair: selectedPair,
        side: 'BUY/SELL ARBITRAGE',
        amount: tradeAmount,
        price: row.sellPrice,
        type: 'ARBITRAGE',
        profit: netProfit,
        status: 'Completed'
      })

      setIsExecuting(false)
      if (res.success) {
        setLastExecutedResult({
          success: true,
          profit: netProfit,
          route: `${row.buyExchange} ➔ ${row.sellExchange}`,
          spread: row.spreadPct.toFixed(2),
          time: new Date().toLocaleTimeString()
        })
      } else {
        setLastExecutedResult({
          success: false,
          error: res.error || 'Failed to complete execution'
        })
      }
    }, 650)
  }

  const topOpportunity = spreadRows[0] || null

  return (
    <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#B0F127]/10 border border-[#B0F127]/30 flex items-center justify-center text-[#B0F127]">
            <Zap size={18} />
          </div>
          <div>
            <h3 className="text-sm font-black text-white tracking-tight flex items-center gap-2">
              Cross-Exchange Arbitrage Radar
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                0-SLIPPAGE
              </span>
            </h3>
            <p className="text-[11px] text-white/50 font-mono">
              Live multi-DEX price discrepancies detected in real-time
            </p>
          </div>
        </div>

        {/* Refresh & Quick Amount presets */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#141414] p-1 rounded-lg border border-white/10">
            {[1000, 2500, 5000, 10000].map((amt) => (
              <button
                key={amt}
                onClick={() => setTradeAmount(amt)}
                className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded transition-all ${
                  tradeAmount === amt
                    ? 'bg-[#B0F127] text-black'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                ${amt >= 1000 ? `${amt / 1000}k` : amt}
              </button>
            ))}
          </div>

          <button
            onClick={() => setRefreshInterval(p => (p === 1000 ? 3000 : 1000))}
            className="p-1.5 text-white/60 hover:text-white bg-white/5 rounded-lg border border-white/10 transition-all text-xs flex items-center gap-1"
            title="Toggle Scan Speed"
          >
            <RefreshCw size={12} className={refreshInterval === 1000 ? 'animate-spin text-[#B0F127]' : ''} />
            <span className="text-[10px] font-mono">{refreshInterval / 1000}s</span>
          </button>
        </div>
      </div>

      {/* Hero 1-Click Flash Execution Card */}
      {topOpportunity && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-[#161616] via-[#1a1f14] to-[#161616] border border-[#B0F127]/30 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg shadow-black/40">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="w-10 h-10 rounded-xl bg-[#B0F127] flex items-center justify-center text-black font-black shrink-0 shadow-[0_0_15px_rgba(176,241,39,0.3)]">
              <Flame size={22} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Top Flash Arbitrage Route</span>
                <span className="text-[10px] font-mono font-bold text-[#B0F127] bg-[#B0F127]/10 px-1.5 py-0.5 rounded">
                  +{topOpportunity.spreadPct.toFixed(2)}% Spread
                </span>
              </div>

              <div className="flex items-center gap-2 mt-1 text-xs font-mono">
                <span className="text-white/70">{topOpportunity.buyExchange} (${topOpportunity.buyPrice.toFixed(1)})</span>
                <ArrowRight size={13} className="text-[#B0F127]" />
                <span className="text-emerald-400 font-bold">{topOpportunity.sellExchange} (${topOpportunity.sellPrice.toFixed(1)})</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-white/10">
            <div className="text-left md:text-right font-mono">
              <span className="text-[10px] text-white/50 block">Est. Net Profit</span>
              <span className="text-sm font-black text-[#B0F127]">
                +${topOpportunity.estProfit.toFixed(2)} USD
              </span>
            </div>

            <button
              onClick={() => handleExecuteArbitrage(topOpportunity)}
              disabled={isExecuting}
              className="px-4 py-2.5 bg-[#B0F127] hover:bg-[#9fe01c] disabled:opacity-50 text-black font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 shrink-0"
            >
              {isExecuting ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  Routing...
                </>
              ) : (
                <>
                  <Zap size={14} />
                  Flash Execute (${tradeAmount.toLocaleString()})
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Execution Feedback Notification Toast */}
      {lastExecutedResult && (
        <div className={`p-3 rounded-xl border flex items-center justify-between text-xs font-mono transition-all ${
          lastExecutedResult.success
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
            : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
        }`}>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>
              <strong>Arbitrage Confirmed:</strong> Successfully settled <strong>+${lastExecutedResult.profit} USD</strong> via {lastExecutedResult.route} (+{lastExecutedResult.spread}%)!
            </span>
          </div>
          <span className="text-[10px] text-white/40">{lastExecutedResult.time}</span>
        </div>
      )}

      {/* Live Discrepancy Matrix Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-white/10 text-white/40 text-[10px] uppercase">
              <th className="pb-2">Route Path</th>
              <th className="pb-2">Buy Exchange</th>
              <th className="pb-2">Sell Exchange</th>
              <th className="pb-2 text-right">Spread Delta</th>
              <th className="pb-2 text-right">Est. Net Profit</th>
              <th className="pb-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {spreadRows.map((row) => (
              <tr key={row.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="py-2.5">
                  <div className="flex items-center gap-1.5 font-bold text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B0F127]" />
                    {row.dexRoute}
                  </div>
                  <span className="text-[10px] text-white/40">{row.latencyMs}ms latency • {row.confidence}</span>
                </td>

                <td className="py-2.5 text-white/80">
                  <div className="text-white">{row.buyExchange}</div>
                  <div className="text-[10px] text-white/40">${row.buyPrice.toFixed(2)}</div>
                </td>

                <td className="py-2.5 text-white/80">
                  <div className="text-white">{row.sellExchange}</div>
                  <div className="text-[10px] text-emerald-400">${row.sellPrice.toFixed(2)}</div>
                </td>

                <td className="py-2.5 text-right font-bold text-emerald-400">
                  +{row.spreadPct.toFixed(2)}%
                </td>

                <td className="py-2.5 text-right font-bold text-[#B0F127]">
                  +${row.estProfit.toFixed(2)}
                </td>

                <td className="py-2.5 text-right">
                  <button
                    onClick={() => handleExecuteArbitrage(row)}
                    disabled={isExecuting}
                    className="px-2.5 py-1 bg-white/10 hover:bg-[#B0F127] hover:text-black text-white font-bold text-[11px] rounded-lg border border-white/10 transition-all inline-flex items-center gap-1"
                  >
                    <Zap size={11} />
                    Flash
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
