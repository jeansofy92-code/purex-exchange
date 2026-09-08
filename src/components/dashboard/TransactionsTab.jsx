import { useState, useMemo } from 'react'
import { useAuth } from '../../context/AuthContext'
import {
  Search,
  Filter,
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
  Zap,
  Users,
  Copy,
  Check,
  Download,
  ExternalLink,
  ShieldCheck,
  SlidersHorizontal
} from 'lucide-react'

const FILTER_TYPES = [
  { id: 'ALL', label: 'All Transactions' },
  { id: 'DEPOSIT', label: 'Deposits', icon: ArrowDownLeft },
  { id: 'WITHDRAWAL', label: 'Withdrawals', icon: ArrowUpRight },
  { id: 'PROFIT', label: 'Arbitrage Profits', icon: TrendingUp },
  { id: 'INVESTMENT', label: 'Investments', icon: Zap },
  { id: 'REFERRAL', label: 'Referral Rewards', icon: Users }
]

export default function TransactionsTab({ onOpenDeposit, onOpenWithdraw }) {
  const { user } = useAuth()
  const [activeFilter, setActiveFilter] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedHash, setCopiedHash] = useState(null)
  const [exported, setExported] = useState(false)

  const transactions = user?.transactions || []

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesFilter =
        activeFilter === 'ALL' ||
        tx.type?.toUpperCase() === activeFilter ||
        (activeFilter === 'PROFIT' && tx.type === 'PROFIT')

      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        tx.title?.toLowerCase().includes(q) ||
        tx.asset?.toLowerCase().includes(q) ||
        tx.hash?.toLowerCase().includes(q) ||
        tx.id?.toLowerCase().includes(q)

      return matchesFilter && matchesSearch
    })
  }, [transactions, activeFilter, searchQuery])

  const handleCopy = (hash) => {
    navigator.clipboard.writeText(hash)
    setCopiedHash(hash)
    setTimeout(() => setCopiedHash(null), 2000)
  }

  const handleExportCSV = () => {
    setExported(true)
    setTimeout(() => setExported(false), 2500)
  }

  const getTxTypeBadge = (type) => {
    switch (type) {
      case 'DEPOSIT':
        return {
          icon: ArrowDownLeft,
          color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
          sign: '+',
          amountColor: 'text-emerald-400'
        }
      case 'WITHDRAWAL':
        return {
          icon: ArrowUpRight,
          color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
          sign: '-',
          amountColor: 'text-amber-400'
        }
      case 'PROFIT':
        return {
          icon: TrendingUp,
          color: 'text-[#B0F127] bg-[#B0F127]/10 border-[#B0F127]/20',
          sign: '+',
          amountColor: 'text-[#B0F127]'
        }
      case 'INVESTMENT':
        return {
          icon: Zap,
          color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
          sign: '',
          amountColor: 'text-white'
        }
      case 'REFERRAL':
        return {
          icon: Users,
          color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
          sign: '+',
          amountColor: 'text-purple-400'
        }
      default:
        return {
          icon: ShieldCheck,
          color: 'text-white/60 bg-white/5 border-white/10',
          sign: '',
          amountColor: 'text-white/80'
        }
    }
  }

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Transaction Ledger</h2>
          <p className="text-xs text-white/50">
            Real-time on-chain verifiable audit trail of all deposits, arbitrage yields, swaps, and payouts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-2"
          >
            {exported ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#B0F127]" />
                <span className="text-[#B0F127]">Report Downloaded</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-white/60" />
                Export CSV Ledger
              </>
            )}
          </button>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by transaction description, asset, or transaction hash (0x...)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/50 border border-white/10 focus:border-[#B0F127] rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-white/40 outline-none transition-all"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {FILTER_TYPES.map((f) => {
            const isSelected = activeFilter === f.id
            const Icon = f.icon

            return (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 border ${
                  isSelected
                    ? 'bg-[#B0F127] text-black border-[#B0F127] font-semibold'
                    : 'bg-black/40 text-white/70 border-white/5 hover:border-white/20 hover:text-white'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {f.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Ledger Table / List */}
      <div className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden">
        {filteredTransactions.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-white/40">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <p className="text-sm font-semibold text-white">No transactions found</p>
            <p className="text-xs text-white/40 max-w-sm mx-auto">
              No records match your selected filter or search term. Try adjusting your filter or making a deposit.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {/* Desktop Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-white/40 bg-black/30 font-mono">
              <div className="col-span-4">Transaction / Activity</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Date & Time</div>
              <div className="col-span-2 text-right">Amount</div>
              <div className="col-span-2 text-right">Verification</div>
            </div>

            {/* List Rows */}
            {filteredTransactions.map((tx) => {
              const meta = getTxTypeBadge(tx.type)
              const Icon = meta.icon

              return (
                <div
                  key={tx.id}
                  className="p-4 md:px-6 md:py-4 hover:bg-white/[0.02] transition-all flex flex-col md:grid md:grid-cols-12 md:gap-4 md:items-center gap-3"
                >
                  {/* Title & Icon */}
                  <div className="md:col-span-4 flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${meta.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{tx.title}</h4>
                      <span className="text-[10px] text-white/40 font-mono block truncate">
                        ID: {tx.id}
                      </span>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="hidden md:block md:col-span-2">
                    <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${meta.color}`}>
                      {tx.type}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="hidden md:block md:col-span-2 text-xs text-white/60 font-mono">
                    {tx.date}
                  </div>

                  {/* Amount */}
                  <div className="flex md:block justify-between items-center md:col-span-2 md:text-right">
                    <span className="md:hidden text-xs text-white/50">{tx.date}</span>
                    <div className={`text-sm font-bold font-mono ${meta.amountColor}`}>
                      {tx.amount > 0 ? (
                        <>
                          {meta.sign}${Number(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          <span className="text-[10px] text-white/40 ml-1">{tx.asset || 'USDT'}</span>
                        </>
                      ) : (
                        <span className="text-white/40 text-xs">--</span>
                      )}
                    </div>
                  </div>

                  {/* Hash / Status */}
                  <div className="flex items-center justify-between md:justify-end md:col-span-2 gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {tx.status || 'Confirmed'}
                    </span>

                    {tx.hash && (
                      <button
                        onClick={() => handleCopy(tx.hash)}
                        title="Copy Transaction Hash"
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-white/50 hover:text-white bg-black/40 hover:bg-black/60 px-2 py-1 rounded-md border border-white/5 transition-all"
                      >
                        {copiedHash === tx.hash ? (
                          <Check className="w-3 h-3 text-[#B0F127]" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span className="truncate max-w-[70px]">{tx.hash}</span>
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
