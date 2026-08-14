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
    <div className="border-t border-white/10 bg-[#06090a]/95 backdrop-blur-xl text-xs select-none">
      {/* Tabs Bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 overflow-x-auto scrollbar-none bg-[#070c0d]">
        <button
          type="button"
          onClick={() => setActiveTab('positions')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold transition-all ${
            activeTab === 'positions'
              ? 'bg-[#58e65b] text-black shadow-[0_0_12px_rgba(88,230,91,0.3)]'
              : 'text-[#8d9691] hover:text-white'
          }`}
        >
          <span>Positions</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[0.65rem] ${activeTab === 'positions' ? 'bg-black text-[#58e65b]' : 'bg-white/10 text-white'}`}>
            {positions.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold transition-all ${
            activeTab === 'orders'
              ? 'bg-[#58e65b] text-black shadow-[0_0_12px_rgba(88,230,91,0.3)]'
              : 'text-[#8d9691] hover:text-white'
          }`}
        >
          <span>Open Orders</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[0.65rem] ${activeTab === 'orders' ? 'bg-black text-[#58e65b]' : 'bg-white/10 text-white'}`}>
            {openOrders.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
            activeTab === 'history'
              ? 'bg-[#58e65b] text-black shadow-[0_0_12px_rgba(88,230,91,0.3)]'
              : 'text-[#8d9691] hover:text-white'
          }`}
        >
          Trade History
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('assets')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold transition-all ${
            activeTab === 'assets'
              ? 'bg-[#58e65b] text-black shadow-[0_0_12px_rgba(88,230,91,0.3)]'
              : 'text-[#8d9691] hover:text-white'
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
                  <tr className="text-[0.68rem] uppercase font-bold text-[#8d9691] border-b border-white/5 pb-2">
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
                                ? 'bg-[#183a1d] text-[#58e65b] border border-[#58e65b]/30'
                                : 'bg-[#3a1818] text-[#ff6b6b] border border-[#ff6b6b]/30'
                            }`}
                          >
                            {pos.side} {pos.leverage}x
                          </span>
                        </div>
                      </td>
                      <td className="py-2.5 text-white">{pos.size}</td>
                      <td className="py-2.5 text-[#dfe9e2]">${pos.entryPrice}</td>
                      <td className="py-2.5 text-white font-bold">${pos.markPrice}</td>
                      <td className="py-2.5 text-[#ff6b6b]">${pos.liqPrice}</td>
                      <td className="py-2.5 text-[#dfe9e2]">{pos.margin}</td>
                      <td className="py-2.5">
                        <span
                          className={`font-bold ${
                            pos.positive ? 'text-[#58e65b]' : 'text-[#ff6b6b]'
                          }`}
                        >
                          {pos.pnl} ({pos.pnlPercent})
                        </span>
                      </td>
                      <td className="py-2.5 text-right">
                        <button
                          type="button"
                          onClick={() => onClosePosition(pos.id)}
                          className="px-2.5 py-1 rounded-md border border-white/20 bg-white/5 hover:bg-white/15 text-white font-bold text-[0.7rem] transition-colors"
                        >
                          Market Close
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-8 text-center text-[#8d9691]">
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
                  <tr className="text-[0.68rem] uppercase font-bold text-[#8d9691] border-b border-white/5 pb-2">
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
                      <td className="py-2.5 text-[#8d9691]">{ord.time}</td>
                      <td className="py-2.5 font-bold text-white">{ord.pair}</td>
                      <td className="py-2.5 text-[#dfe9e2]">{ord.type}</td>
                      <td className="py-2.5">
                        <span
                          className={`font-bold ${
                            ord.side === 'Buy' ? 'text-[#58e65b]' : 'text-[#ff6b6b]'
                          }`}
                        >
                          {ord.side}
                        </span>
                      </td>
                      <td className="py-2.5 text-white">${ord.price}</td>
                      <td className="py-2.5 text-[#dfe9e2]">{ord.amount}</td>
                      <td className="py-2.5 text-white font-bold">{ord.total}</td>
                      <td className="py-2.5">
                        <span className="px-1.5 py-0.5 rounded bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 text-[0.65rem] font-bold">
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-2.5 text-right">
                        <button
                          type="button"
                          onClick={() => onCancelOrder(ord.id)}
                          className="px-2.5 py-1 rounded-md border border-[#ff6b6b]/30 bg-[#3a1818]/50 hover:bg-[#ff6b6b]/20 text-[#ff6b6b] font-bold text-[0.7rem] transition-colors"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-8 text-center text-[#8d9691]">No open limit orders.</div>
            )}
          </div>
        )}

        {/* 3. TRADE HISTORY TAB */}
        {activeTab === 'history' && (
          <div>
            {tradeHistory.length > 0 ? (
              <table className="w-full text-left font-mono">
                <thead>
                  <tr className="text-[0.68rem] uppercase font-bold text-[#8d9691] border-b border-white/5 pb-2">
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
                      <td className="py-2.5 text-[#8d9691]">{th.time}</td>
                      <td className="py-2.5 font-bold text-white">{th.pair}</td>
                      <td className="py-2.5 text-[#dfe9e2]">{th.type}</td>
                      <td className="py-2.5">
                        <span
                          className={`font-bold ${
                            th.side === 'Buy' ? 'text-[#58e65b]' : 'text-[#ff6b6b]'
                          }`}
                        >
                          {th.side}
                        </span>
                      </td>
                      <td className="py-2.5 text-white">${th.price}</td>
                      <td className="py-2.5 text-[#dfe9e2]">{th.amount}</td>
                      <td className="py-2.5 text-[#8d9691]">{th.fee}</td>
                      <td className="py-2.5 text-right font-bold text-white">{th.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-8 text-center text-[#8d9691]">No trade history recorded yet.</div>
            )}
          </div>
        )}

        {/* 4. WALLET ASSETS TAB */}
        {activeTab === 'assets' && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {Object.entries(balances).map(([coinSymbol, amount]) => (
              <div
                key={coinSymbol}
                className="rounded-xl border border-white/10 bg-[#080d0e] p-3 hover:border-[#58e65b]/40 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <CoinLogo symbol={coinSymbol} size={20} />
                  <span className="font-bold text-white">{coinSymbol}</span>
                </div>
                <div className="font-mono text-sm font-bold text-white">
                  {amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-[0.65rem] text-[#8d9691] mt-0.5">Available Balance</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TradingBottomTabs
