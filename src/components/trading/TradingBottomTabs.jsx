import { useState } from 'react'
import { Wallet } from 'lucide-react'
import CoinLogo from '../CoinLogo'



function TradingBottomTabs({
  positions,
  openOrders,
  tradeHistory,
  balances,
  onCancelOrder,
  onClosePosition,
}) {
  const [activeTab, setActiveTab] = useState('positions') // 'positions' | 'orders' | 'history' | 'assets'

  return (
    <div className="border-t border-white/10 bg-[#0d1029]/95 backdrop-blur-xl text-xs select-none">
      {/* Tabs Bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 overflow-x-auto scrollbar-none bg-[#111536]">
        <button
          type="button"
          onClick={() => setActiveTab('positions')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
            activeTab === 'positions'
              ? 'bg-[#ff7a00] text-white shadow-[0_0_12px_rgba(255,122,0,0.35)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>Positions</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[0.65rem] ${activeTab === 'positions' ? 'bg-black/40 text-white' : 'bg-white/10 text-slate-300'}`}>
            {positions.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-[#ff7a00] text-white shadow-[0_0_12px_rgba(255,122,0,0.35)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>Open Orders</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[0.65rem] ${activeTab === 'orders' ? 'bg-black/40 text-white' : 'bg-white/10 text-slate-300'}`}>
            {openOrders.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
            activeTab === 'history'
              ? 'bg-[#ff7a00] text-white shadow-[0_0_12px_rgba(255,122,0,0.35)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Trade History
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('assets')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
            activeTab === 'assets'
              ? 'bg-[#ff7a00] text-white shadow-[0_0_12px_rgba(255,122,0,0.35)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Wallet size={13} />
          <span>Wallet Assets</span>
        </button>
      </div>

      {/* Content Body */}
      <div className="p-4 min-h-[160px] overflow-x-auto">
        {/* 1. POSITIONS TAB */}
        {activeTab === 'positions' && (
          <div>
            {positions.length > 0 ? (
              <table className="w-full text-left font-mono">
                <thead>
                  <tr className="text-[0.68rem] uppercase font-bold text-slate-400 border-b border-white/5 pb-2">
                    <th className="pb-2">Contract</th>
                    <th className="pb-2">Size</th>
                    <th className="pb-2">Entry Price</th>
                    <th className="pb-2">Mark Price</th>
                    <th className="pb-2">Liq. Price</th>
                    <th className="pb-2">Margin</th>
                    <th className="pb-2">Unrealized PnL</th>
                    <th className="pb-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-medium">
                  {positions.map((pos) => (
                    <tr key={pos.id} className="hover:bg-white/[0.02]">
                      <td className="py-2.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{pos.pair}</span>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[0.65rem] font-bold ${
                              pos.side === 'Long'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            }`}
                          >
                            {pos.side} {pos.leverage}x
                          </span>
                        </div>
                      </td>
                      <td className="py-2.5 text-white">{pos.size}</td>
                      <td className="py-2.5 text-slate-300">${pos.entryPrice}</td>
                      <td className="py-2.5 text-white font-bold">${pos.markPrice}</td>
                      <td className="py-2.5 text-rose-400">${pos.liqPrice}</td>
                      <td className="py-2.5 text-slate-300">{pos.margin}</td>
                      <td className="py-2.5">
                        <span
                          className={`font-bold ${
                            pos.positive ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {pos.pnl} ({pos.pnlPercent})
                        </span>
                      </td>
                      <td className="py-2.5 text-right">
                        <button
                          type="button"
                          onClick={() => onClosePosition(pos.id)}
                          className="px-2.5 py-1 rounded-md border border-white/20 bg-white/5 hover:bg-white/15 text-white font-bold text-[0.7rem] transition-colors cursor-pointer"
                        >
                          Market Close
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-8 text-center text-slate-400">
                No active positions. Open a Spot or Perpetual order above.
              </div>
            )}
          </div>
        )}

        {/* 2. OPEN ORDERS TAB */}
        {activeTab === 'orders' && (
          <div>
            {openOrders.length > 0 ? (
              <table className="w-full text-left font-mono">
                <thead>
                  <tr className="text-[0.68rem] uppercase font-bold text-slate-400 border-b border-white/5 pb-2">
                    <th className="pb-2">Time</th>
                    <th className="pb-2">Pair</th>
                    <th className="pb-2">Type</th>
                    <th className="pb-2">Side</th>
                    <th className="pb-2">Price</th>
                    <th className="pb-2">Amount</th>
                    <th className="pb-2">Total</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-medium">
                  {openOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-white/[0.02]">
                      <td className="py-2.5 text-slate-400">{ord.time}</td>
                      <td className="py-2.5 font-bold text-white">{ord.pair}</td>
                      <td className="py-2.5 text-slate-300">{ord.type}</td>
                      <td className="py-2.5">
                        <span
                          className={`font-bold ${
                            ord.side === 'Buy' ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {ord.side}
                        </span>
                      </td>
                      <td className="py-2.5 text-white">${ord.price}</td>
                      <td className="py-2.5 text-slate-300">{ord.amount}</td>
                      <td className="py-2.5 text-white font-bold">{ord.total}</td>
                      <td className="py-2.5">
                        <span className="px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20 text-[0.65rem] font-bold">
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-2.5 text-right">
                        <button
                          type="button"
                          onClick={() => onCancelOrder(ord.id)}
                          className="px-2.5 py-1 rounded-md border border-rose-500/30 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 font-bold text-[0.7rem] transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-8 text-center text-slate-400">No open limit orders.</div>
            )}
          </div>
        )}

        {/* 3. TRADE HISTORY TAB */}
        {activeTab === 'history' && (
          <div>
            {tradeHistory.length > 0 ? (
              <table className="w-full text-left font-mono">
                <thead>
                  <tr className="text-[0.68rem] uppercase font-bold text-slate-400 border-b border-white/5 pb-2">
                    <th className="pb-2">Time</th>
                    <th className="pb-2">Pair</th>
                    <th className="pb-2">Type</th>
                    <th className="pb-2">Side</th>
                    <th className="pb-2">Execution Price</th>
                    <th className="pb-2">Filled Amount</th>
                    <th className="pb-2">Trading Fee</th>
                    <th className="pb-2 text-right">Total (USDT)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-medium">
                  {tradeHistory.map((th) => (
                    <tr key={th.id} className="hover:bg-white/[0.02]">
                      <td className="py-2.5 text-slate-400">{th.time}</td>
                      <td className="py-2.5 font-bold text-white">{th.pair}</td>
                      <td className="py-2.5 text-slate-300">{th.type}</td>
                      <td className="py-2.5">
                        <span
                          className={`font-bold ${
                            th.side === 'Buy' ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {th.side}
                        </span>
                      </td>
                      <td className="py-2.5 text-white">${th.price}</td>
                      <td className="py-2.5 text-slate-300">{th.amount}</td>
                      <td className="py-2.5 text-slate-400">{th.fee}</td>
                      <td className="py-2.5 text-right font-bold text-white">{th.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-8 text-center text-slate-400">No trade history recorded yet.</div>
            )}
          </div>
        )}

        {/* 4. WALLET ASSETS TAB */}
        {activeTab === 'assets' && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {Object.entries(balances).map(([coinSymbol, amount]) => (
              <div
                key={coinSymbol}
                className="rounded-xl border border-white/10 bg-[#121639] p-3 hover:border-[#ff7a00]/40 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <CoinLogo symbol={coinSymbol} size={20} />
                  <span className="font-bold text-white">{coinSymbol}</span>
                </div>
                <div className="font-mono text-sm font-bold text-white">
                  {amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-[0.65rem] text-slate-400 mt-0.5">Available Balance</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TradingBottomTabs
