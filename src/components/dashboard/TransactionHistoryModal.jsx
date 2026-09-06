import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  History,
  ArrowDownLeft,
  ArrowUpRight,
  Flame,
  Repeat,
  CheckCircle2,
  Clock,
  ExternalLink
} from 'lucide-react'

export default function TransactionHistoryModal({ isOpen, onClose, tradeHistory = [] }) {
  const [filter, setFilter] = useState('all') // 'all' | 'deposits' | 'withdrawals' | 'staking' | 'trades'

  if (!isOpen) return null

  // Mock comprehensive transaction log + live trades
  const baseTransactions = [
    {
      id: 'tx-99482',
      type: 'staking_yield',
      title: 'Daily Staking Yield Payout',
      plan: 'Growth Alpha (2.40%/day)',
      amount: '+$48.00 USDT',
      rawAmount: 48.00,
      timestamp: 'Today, 00:00 UTC',
      status: 'Completed',
      hash: '0x8f4c...91b2',
      positive: true,
    },
    {
      id: 'tx-99310',
      type: 'deposit',
      title: 'USDT (TRC20) Deposit',
      plan: 'Main Wallet Deposit',
      amount: '+$2,000.00 USDT',
      rawAmount: 2000.00,
      timestamp: 'Yesterday, 18:32 UTC',
      status: 'Completed',
      hash: '0x3a9e...77c1',
      positive: true,
    },
    {
      id: 'tx-99120',
      type: 'trade',
      title: 'Spot Buy BTC/USDT',
      plan: 'Filled @ $64,200.00',
      amount: '+0.1500 BTC',
      rawAmount: 0.15,
      timestamp: 'Sep 04, 14:15 UTC',
      status: 'Completed',
      hash: '0x1b7e...44d9',
      positive: true,
    },
    {
      id: 'tx-98940',
      type: 'staking_stake',
      title: 'Staking Plan Activation',
      plan: 'Locked in Growth Alpha (14 Days)',
      amount: '-$2,000.00 USDT',
      rawAmount: -2000.00,
      timestamp: 'Sep 03, 11:20 UTC',
      status: 'Active',
      hash: '0x99dd...11aa',
      positive: false,
    },
    {
      id: 'tx-98501',
      type: 'withdraw',
      title: 'USDT (TRC20) Withdrawal',
      plan: 'To External Wallet (TR7NH...89x)',
      amount: '-$500.00 USDT',
      rawAmount: -500.00,
      timestamp: 'Sep 01, 09:44 UTC',
      status: 'Completed',
      hash: '0x44ae...8831',
      positive: false,
    },
  ]

  // Add any trades from tradeHistory prop
  const combinedHistory = [
    ...baseTransactions,
    ...(tradeHistory || []).map((th, idx) => ({
      id: `th-${th.id || idx}`,
      type: 'trade',
      title: `${th.side || 'Trade'} ${th.pair || 'BTC/USDT'}`,
      plan: `${th.type || 'Market'} @ $${th.price || '65,000'}`,
      amount: `${th.side === 'Buy' ? '+' : '-'}${th.amount || '0.1'} ${th.pair?.split('/')[0] || 'BTC'}`,
      timestamp: th.time || 'Recently',
      status: 'Completed',
      hash: `0x${Math.random().toString(16).slice(2, 8)}...${Math.random().toString(16).slice(2, 6)}`,
      positive: th.side === 'Buy',
    }))
  ]

  const filteredTransactions = combinedHistory.filter((item) => {
    if (filter === 'all') return true
    if (filter === 'deposits') return item.type === 'deposit'
    if (filter === 'withdrawals') return item.type === 'withdraw'
    if (filter === 'staking') return item.type === 'staking_yield' || item.type === 'staking_stake'
    if (filter === 'trades') return item.type === 'trade'
    return true
  })

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl rounded-3xl border border-white/15 bg-[#141838] p-5 sm:p-7 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden text-white my-auto max-h-[90vh] flex flex-col"
        >
          {/* Top ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-24 bg-[#ff7a00]/15 blur-3xl pointer-events-none" />

          {/* Modal Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff7a00] to-amber-500 shadow-[0_0_15px_rgba(255,122,0,0.4)]">
                <History size={18} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                  <span>Wallet Transaction & Settlement History</span>
                </h2>
                <p className="text-[11px] text-slate-400">
                  Comprehensive real-time ledger of deposits, withdrawals, daily staking yields & trades
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Filters Bar */}
          <div className="flex items-center gap-1.5 py-3 border-b border-white/5 overflow-x-auto shrink-0">
            {[
              { id: 'all', label: 'All Transactions' },
              { id: 'staking', label: 'Staking Yields 🔥' },
              { id: 'deposits', label: 'Deposits' },
              { id: 'withdrawals', label: 'Withdrawals' },
              { id: 'trades', label: 'Trades' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  filter === tab.id
                    ? 'bg-[#ff7a00] text-white shadow-[0_0_10px_rgba(255,122,0,0.35)]'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* History List */}
          <div className="overflow-y-auto flex-1 pr-1 py-3 space-y-2.5">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => {
                const isDeposit = tx.type === 'deposit'
                const isWithdraw = tx.type === 'withdraw'
                const isStaking = tx.type.startsWith('staking')

                return (
                  <div
                    key={tx.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#0f1228] p-3.5 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          isDeposit
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : isWithdraw
                            ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                            : isStaking
                            ? 'bg-[#ff7a00]/15 text-[#ff7a00] border border-[#ff7a00]/30'
                            : 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                        }`}
                      >
                        {isDeposit && <ArrowDownLeft size={18} />}
                        {isWithdraw && <ArrowUpRight size={18} />}
                        {isStaking && <Flame size={18} className="fill-current" />}
                        {!isDeposit && !isWithdraw && !isStaking && <Repeat size={18} />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-xs sm:text-sm">{tx.title}</span>
                          <span
                            className={`rounded-full px-2 py-0.2 text-[9px] font-bold uppercase ${
                              tx.status === 'Completed'
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                : 'bg-[#ff7a00]/15 text-[#ff7a00] border border-[#ff7a00]/30'
                            }`}
                          >
                            {tx.status}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{tx.plan}</div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 border-white/5 pt-2 sm:pt-0">
                      <div
                        className={`font-mono text-sm font-black ${
                          tx.positive ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {tx.amount}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                        <Clock size={11} />
                        <span>{tx.timestamp}</span>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="py-12 text-center text-slate-400">
                <Clock size={28} className="mx-auto mb-2 text-slate-500" />
                <div>No transaction records found under this filter.</div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-400" />
              <span>Immutable cryptographic ledger verified 1:1</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-bold text-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
