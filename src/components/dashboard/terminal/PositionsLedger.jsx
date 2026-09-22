import { useState } from 'react'
import { 
  History, 
  Layers, 
  CheckCircle2, 
  XCircle, 
  ArrowUpRight, 
  ArrowDownLeft, 
  TrendingUp, 
  RefreshCw,
  ExternalLink,
  ShieldCheck
} from 'lucide-react'
import { useAuth } from '../../../context/AuthContext'

export default function PositionsLedger({ currentPrice = 96420.50, selectedPair = 'BTC/USDT' }) {
  const { user, executeTrade } = useAuth()
  const [tab, setTab] = useState('positions') // 'positions' | 'orders' | 'history'
  const [positions, setPositions] = useState([
    {
      id: 'pos-1',
      pair: 'BTC/USDT',
      side: 'LONG',
      size: 0.85,
      entryPrice: 94850.00,
      markPrice: currentPrice,
      leverage: 10,
      liqPrice: 85900.00,
      margin: 8062.25,
      tp: 102000.00,
      sl: 92000.00
    },
    {
      id: 'pos-2',
      pair: 'ETH/USDT',
      side: 'LONG',
      size: 12.0,
      entryPrice: 3420.00,
      markPrice: 3510.50,
      leverage: 5,
      liqPrice: 2840.00,
      margin: 8208.00,
      tp: 3800.00,
      sl: 3200.00
    }
  ])

  const [openOrders, setOpenOrders] = useState([
    {
      id: 'ord-101',
      pair: 'SOL/USDT',
      type: 'LIMIT BUY',
      amount: 45.0,
      price: 182.50,
      filled: '0%',
      time: '15:40:12'
    }
  ])

  // Close active position
  const handleClosePosition = (pos) => {
    const pnl = (pos.markPrice - pos.entryPrice) * pos.size * (pos.side === 'LONG' ? 1 : -1)
    executeTrade({
      pair: pos.pair,
      side: `CLOSE ${pos.side}`,
      amount: pos.size,
      price: pos.markPrice,
      type: 'POSITION_CLOSE',
      profit: pnl,
      status: 'Completed'
    })

    setPositions(prev => prev.filter(p => p.id !== pos.id))
  }

  const handleCancelOrder = (ordId) => {
    setOpenOrders(prev => prev.filter(o => o.id !== ordId))
  }

  const transactions = user?.transactions || []

  return (
    <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl flex flex-col overflow-hidden">
      {/* Header Navigation Tabs */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#121212]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTab('positions')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              tab === 'positions'
                ? 'bg-[#B0F127] text-black shadow-sm'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers size={13} />
            Active Positions ({positions.length})
          </button>

          <button
            onClick={() => setTab('orders')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              tab === 'orders'
                ? 'bg-[#B0F127] text-black shadow-sm'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            Open Orders ({openOrders.length})
          </button>

          <button
            onClick={() => setTab('history')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              tab === 'history'
                ? 'bg-[#B0F127] text-black shadow-sm'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <History size={13} />
            Execution Ledger
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
          <ShieldCheck size={13} />
          <span>PureX Risk Safeguard Active</span>
        </div>
      </div>

      {/* Table Body */}
      <div className="overflow-x-auto p-4">
        {tab === 'positions' && (
          positions.length === 0 ? (
            <div className="text-center py-10 text-white/40 font-mono text-xs">
              No active open positions. Submit a trade or trigger an arbitrage bot to open a position.
            </div>
          ) : (
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-white/40 text-[10px] uppercase">
                  <th className="pb-2">Contract</th>
                  <th className="pb-2">Size</th>
                  <th className="pb-2">Entry Price</th>
                  <th className="pb-2">Mark Price</th>
                  <th className="pb-2">Liq Price</th>
                  <th className="pb-2">Margin</th>
                  <th className="pb-2 text-right">Unrealized PnL</th>
                  <th className="pb-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {positions.map((pos) => {
                  const mark = pos.pair === 'BTC/USDT' ? currentPrice : pos.markPrice
                  const pnl = (mark - pos.entryPrice) * pos.size * (pos.side === 'LONG' ? 1 : -1)
                  const pnlPct = ((mark - pos.entryPrice) / pos.entryPrice) * 100 * pos.leverage * (pos.side === 'LONG' ? 1 : -1)
                  const isProfit = pnl >= 0

                  return (
                    <tr key={pos.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-white">{pos.pair}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                            pos.side === 'LONG'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-rose-500/20 text-rose-400'
                          }`}>
                            {pos.side} {pos.leverage}x
                          </span>
                        </div>
                      </td>

                      <td className="py-3 text-white">{pos.size} {pos.pair.split('/')[0]}</td>
                      <td className="py-3 text-white/80">${pos.entryPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                      <td className="py-3 text-white font-bold">${mark.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                      <td className="py-3 text-rose-400/80">${pos.liqPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                      <td className="py-3 text-white/70">${pos.margin.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>

                      <td className="py-3 text-right">
                        <div className={`font-black ${isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {isProfit ? '+' : ''}${pnl.toFixed(2)}
                        </div>
                        <div className={`text-[10px] ${isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
                          ({isProfit ? '+' : ''}{pnlPct.toFixed(2)}%)
                        </div>
                      </td>

                      <td className="py-3 text-right">
                        <button
                          onClick={() => handleClosePosition(pos)}
                          className="px-3 py-1 bg-white/10 hover:bg-rose-500 hover:text-white text-white/80 font-bold rounded-lg border border-white/10 text-[11px] transition-all"
                        >
                          Market Close
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )
        )}

        {tab === 'orders' && (
          openOrders.length === 0 ? (
            <div className="text-center py-10 text-white/40 font-mono text-xs">
              No active pending limit orders.
            </div>
          ) : (
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-white/40 text-[10px] uppercase">
                  <th className="pb-2">Order ID</th>
                  <th className="pb-2">Pair</th>
                  <th className="pb-2">Type</th>
                  <th className="pb-2">Amount</th>
                  <th className="pb-2">Trigger Price</th>
                  <th className="pb-2">Filled</th>
                  <th className="pb-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {openOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-white/[0.02]">
                    <td className="py-3 text-white/50">{ord.id}</td>
                    <td className="py-3 font-bold text-white">{ord.pair}</td>
                    <td className="py-3 text-emerald-400 font-bold">{ord.type}</td>
                    <td className="py-3 text-white">{ord.amount}</td>
                    <td className="py-3 text-white">${ord.price.toFixed(2)}</td>
                    <td className="py-3 text-white/50">{ord.filled}</td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => handleCancelOrder(ord.id)}
                        className="px-2.5 py-1 text-rose-400 hover:bg-rose-500/10 rounded-lg text-xs"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}

        {tab === 'history' && (
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 text-white/40 text-[10px] uppercase">
                <th className="pb-2">Transaction / Action</th>
                <th className="pb-2">Asset</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Date / Time</th>
                <th className="pb-2 text-right">Amount / Profit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {transactions.slice(0, 10).map((tx) => (
                <tr key={tx.id} className="hover:bg-white/[0.02]">
                  <td className="py-3 font-bold text-white">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B0F127]" />
                      {tx.title}
                    </div>
                    {tx.hash && <span className="text-[10px] text-white/30 block">{tx.hash}</span>}
                  </td>
                  <td className="py-3 text-white/80">{tx.asset || 'USDT'}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {tx.status || 'Completed'}
                    </span>
                  </td>
                  <td className="py-3 text-white/50">{tx.date || 'Today'}</td>
                  <td className="py-3 text-right font-bold text-[#B0F127]">
                    +${Number(tx.amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
