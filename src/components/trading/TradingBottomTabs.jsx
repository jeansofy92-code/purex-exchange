import { useState, useEffect } from 'react'
import { Wallet, Flame, Plus, ArrowUpRight, ArrowDownLeft, Gift } from 'lucide-react'
import CoinLogo from '../CoinLogo'
import { useAuth } from '../../context/AuthContext'

function TradingBottomTabs({
  positions = [],
  openOrders = [],
  tradeHistory = [],
  balances = {},
  onCancelOrder = () => {},
  onClosePosition = () => {},
  onOpenStaking = () => {},
  onOpenReferral = () => {},
  onOpenDeposit = () => {},
  onOpenWithdraw = () => {},
  onOpenConvert = () => {},
}) {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('positions') // 'positions' | 'orders' | 'history' | 'assets' | 'staking' | 'referral'
  const [userInvestments, setUserInvestments] = useState([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem('purex_admin_user_investments')
      if (stored) {
        setUserInvestments(JSON.parse(stored))
      }
    } catch (_e) {}
  }, [activeTab])

  const userCode = user?.referralCode || (user?.id ? `PUREX-${user.id.slice(-4).toUpperCase()}` : 'PUREX-VIP88')

  return (
    <div className="border-t border-white/10 bg-[#0d1029]/95 backdrop-blur-xl text-xs select-none">
      {/* Tabs Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#111536] overflow-x-auto">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('positions')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'positions'
                ? 'bg-[#ff7a00] text-white shadow-[0_0_12px_rgba(255,122,0,0.35)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Positions</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[0.65rem] ${activeTab === 'positions' ? 'bg-black/40 text-white' : 'bg-white/10 text-slate-300'}`}>
              {(positions || []).length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-[#ff7a00] text-white shadow-[0_0_12px_rgba(255,122,0,0.35)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Open Orders</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[0.65rem] ${activeTab === 'orders' ? 'bg-black/40 text-white' : 'bg-white/10 text-slate-300'}`}>
              {(openOrders || []).length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
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
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'assets'
                ? 'bg-[#ff7a00] text-white shadow-[0_0_12px_rgba(255,122,0,0.35)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wallet size={13} />
            <span>Wallet Assets</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('staking')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'staking'
                ? 'bg-gradient-to-r from-[#ff7a00] to-amber-500 text-white shadow-[0_0_12px_rgba(255,122,0,0.35)]'
                : 'text-[#ffaa33] hover:text-white hover:bg-white/5'
            }`}
          >
            <Flame size={13} className="fill-current" />
            <span>Staked Plans ({userInvestments.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('referral')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'referral'
                ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.35)]'
                : 'text-purple-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Gift size={13} />
            <span>Referral Program</span>
          </button>
        </div>

        {/* Quick Modal Triggers */}
        <div className="hidden lg:flex items-center gap-2">
          {onOpenDeposit && (
            <button
              type="button"
              onClick={onOpenDeposit}
              className="flex items-center gap-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowDownLeft size={12} />
              <span>Deposit</span>
            </button>
          )}
          {onOpenWithdraw && (
            <button
              type="button"
              onClick={onOpenWithdraw}
              className="flex items-center gap-1 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-bold text-slate-300 hover:border-white/30 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowUpRight size={12} />
              <span>Withdraw</span>
            </button>
          )}
          {onOpenStaking && (
            <button
              type="button"
              onClick={onOpenStaking}
              className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-[#ff7a00] to-amber-500 px-3 py-1 text-[11px] font-bold text-white shadow-[0_0_10px_rgba(255,122,0,0.4)] hover:brightness-110 transition-all cursor-pointer"
            >
              <Flame size={12} className="fill-white" />
              <span>+ Stake New Plan</span>
            </button>
          )}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 min-h-[160px] overflow-x-auto">
        {/* 1. POSITIONS TAB */}
        {activeTab === 'positions' && (
          <div>
            {(positions || []).length > 0 ? (
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
                  {positions.map((pos) => {
                    const isPositive = pos.positive ?? (typeof pos.pnl === 'number' ? pos.pnl >= 0 : !String(pos.pnl || '').startsWith('-'))
                    const marginDisplay = typeof pos.margin === 'string'
                      ? (pos.margin.startsWith('$') ? pos.margin : `$${pos.margin}`)
                      : `$${(pos.margin || 0).toFixed(2)}`
                    const entryPriceDisplay = typeof pos.entryPrice === 'number' ? pos.entryPrice.toLocaleString() : (pos.entryPrice || '0.00')
                    const markPriceDisplay = typeof pos.markPrice === 'number' ? pos.markPrice.toLocaleString() : (pos.markPrice || '0.00')
                    const liqPriceDisplay = typeof pos.liqPrice === 'number' ? pos.liqPrice.toLocaleString() : (pos.liqPrice || '0.00')
                    const pnlDisplay = typeof pos.pnl === 'string'
                      ? `${pos.pnl} (${pos.pnlPercent || '0.00%'})`
                      : `${(pos.pnl || 0) >= 0 ? '+' : ''}$${(pos.pnl || 0).toFixed(2)} (${(pos.pnlPercent || 0) >= 0 ? '+' : ''}${(pos.pnlPercent || 0).toFixed(2)}%)`

                    return (
                      <tr key={pos.id} className="hover:bg-white/[0.02]">
                        <td className="py-2.5">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[0.65rem] font-bold ${
                                pos.side === 'Long'
                                  ? 'bg-emerald-500/20 text-emerald-400'
                                  : 'bg-rose-500/20 text-rose-400'
                              }`}
                            >
                              {pos.side} {pos.leverage}x
                            </span>
                            <span className="font-bold text-white">{pos.symbol ? `${pos.symbol}/USDT` : pos.pair || 'BTC/USDT'}</span>
                          </div>
                        </td>
                        <td className="py-2.5 text-white">{pos.size}</td>
                        <td className="py-2.5 text-slate-300">${entryPriceDisplay}</td>
                        <td className="py-2.5 text-white font-bold">${markPriceDisplay}</td>
                        <td className="py-2.5 text-amber-400">${liqPriceDisplay}</td>
                        <td className="py-2.5 text-slate-300">{marginDisplay}</td>
                        <td className="py-2.5">
                          <span className={`font-bold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {pnlDisplay}
                          </span>
                        </td>
                        <td className="py-2.5 text-right">
                          <button
                            type="button"
                            onClick={() => onClosePosition(pos.id)}
                            className="px-2.5 py-1 rounded-md bg-rose-500/15 border border-rose-500/30 text-rose-400 hover:bg-rose-500/30 text-[0.68rem] font-bold transition-all cursor-pointer"
                          >
                            Market Close
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            ) : (
              <div className="py-8 text-center text-slate-400">
                <div>No open perpetual positions.</div>
                <div className="text-[11px] text-slate-500 mt-1">Execute spot trades or futures orders to view active positions here.</div>
              </div>
            )}
          </div>
        )}

        {/* 2. OPEN ORDERS TAB */}
        {activeTab === 'orders' && (
          <div>
            {(openOrders || []).length > 0 ? (
              <table className="w-full text-left font-mono">
                <thead>
                  <tr className="text-[0.68rem] uppercase font-bold text-slate-400 border-b border-white/5 pb-2">
                    <th className="pb-2">Time</th>
                    <th className="pb-2">Pair</th>
                    <th className="pb-2">Type</th>
                    <th className="pb-2">Side</th>
                    <th className="pb-2">Order Price</th>
                    <th className="pb-2">Amount</th>
                    <th className="pb-2">Filled</th>
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
                      <td className="py-2.5 text-white font-bold">${ord.price}</td>
                      <td className="py-2.5 text-slate-300">{ord.amount}</td>
                      <td className="py-2.5 text-slate-400">{ord.filled || '0%'}</td>
                      <td className="py-2.5 text-right">
                        <button
                          type="button"
                          onClick={() => onCancelOrder(ord.id)}
                          className="px-2 py-0.5 rounded border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 text-[0.65rem] font-bold"
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
            {(tradeHistory || []).length > 0 ? (
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
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {Object.entries(balances || {}).map(([coinSymbol, amount]) => (
                <div
                  key={coinSymbol}
                  className="rounded-xl border border-white/10 bg-[#121639] p-3 hover:border-[#ff7a00]/40 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <CoinLogo symbol={coinSymbol} size={20} />
                    <span className="font-bold text-white">{coinSymbol}</span>
                  </div>
                  <div className="font-mono text-sm font-bold text-white">
                    {(amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-[0.65rem] text-slate-400 mt-0.5">Available Balance</div>
                </div>
              ))}
            </div>

            {/* Quick Actions Ribbon inside assets */}
            <div className="flex items-center gap-2 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={onOpenDeposit}
                className="flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-4 py-2 text-xs font-bold text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer"
              >
                <ArrowDownLeft size={14} />
                <span>Deposit Funds</span>
              </button>
              <button
                type="button"
                onClick={onOpenWithdraw}
                className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold text-slate-200 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
              >
                <ArrowUpRight size={14} />
                <span>Withdraw Funds</span>
              </button>
              <button
                type="button"
                onClick={onOpenConvert}
                className="flex items-center gap-1.5 rounded-xl border border-[#ff7a00]/40 bg-[#ff7a00]/10 px-4 py-2 text-xs font-bold text-[#ff7a00] hover:bg-[#ff7a00] hover:text-white transition-all cursor-pointer"
              >
                <span>Instant Swap</span>
              </button>
            </div>
          </div>
        )}

        {/* 5. STAKING / INVESTMENTS TAB */}
        {activeTab === 'staking' && (
          <div className="space-y-3">
            {(userInvestments || []).length > 0 ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-xs">Active High-Yield Staking Portfolios</span>
                  <button
                    type="button"
                    onClick={onOpenStaking}
                    className="flex items-center gap-1 text-xs font-bold text-[#ff7a00] hover:underline cursor-pointer"
                  >
                    <Plus size={13} />
                    <span>Stake Another Plan</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {userInvestments.map((inv) => (
                    <div
                      key={inv.id}
                      className="rounded-2xl border border-white/15 bg-[#121639] p-4 space-y-2.5 relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Flame size={16} className="text-[#ff7a00] fill-[#ff7a00]" />
                          <span className="font-bold text-white">{inv.planName}</span>
                        </div>
                        <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[9px] font-bold text-emerald-400 uppercase">
                          {inv.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs bg-black/30 p-2.5 rounded-xl border border-white/5">
                        <div>
                          <div className="text-[10px] text-slate-400">Principal Staked</div>
                          <div className="font-bold font-mono text-white">${(inv.depositAmount || 0).toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400">Daily Return</div>
                          <div className="font-bold font-mono text-emerald-400">+{inv.dailyRoi}</div>
                        </div>
                      </div>

                      <div className="flex justify-between text-[11px] text-slate-400 border-t border-white/5 pt-2">
                        <span>Duration: {inv.durationDays} Days</span>
                        <span className="text-slate-300">Ends: {inv.endDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-8 text-center space-y-3">
                <div className="text-slate-400">No active investment plans currently running.</div>
                <button
                  type="button"
                  onClick={onOpenStaking}
                  className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#ff7a00] to-amber-500 px-5 py-2 text-xs font-black text-white shadow-[0_0_15px_rgba(255,122,0,0.4)] hover:scale-105 transition-all cursor-pointer uppercase tracking-wider"
                >
                  <Flame size={14} className="fill-white" />
                  <span>Explore Staking Plans (Up to 4.2%/day)</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* 6. REFERRAL PROGRAM TAB */}
        {activeTab === 'referral' && (
          <div className="rounded-2xl border border-white/10 bg-[#121639] p-4 flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="space-y-1.5 text-left">
              <div className="flex items-center gap-2">
                <Gift size={18} className="text-[#ff7a00]" />
                <span className="font-bold text-white text-sm">Affiliate Partner Program</span>
                <span className="bg-[#ff7a00]/15 text-[#ff7a00] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#ff7a00]/30">
                  10% Tier 1 Rewards
                </span>
              </div>
              <p className="text-xs text-slate-400 max-w-xl">
                Earn daily recurring commissions by inviting colleagues and active traders to PUREX Exchange.
              </p>
              <div className="flex items-center gap-2 pt-1 font-mono text-xs text-slate-300">
                <span>Your Invite Code: <strong className="text-[#ff7a00]">{userCode}</strong></span>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenReferral}
              className="rounded-full bg-gradient-to-r from-[#ff7a00] to-amber-500 px-6 py-2.5 text-xs font-black text-white shadow-[0_0_15px_rgba(255,122,0,0.4)] hover:scale-105 transition-all cursor-pointer uppercase tracking-wider shrink-0"
            >
              Open Referral Partner Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TradingBottomTabs
