import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import {
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  Search,
  Filter,
  Copy,
  Check,
  AlertCircle,
  Coins,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  Landmark,
  ShieldCheck,
  Zap
} from 'lucide-react'

export default function ModeratorApprovals() {
  const { getAllRegisteredUsers, adminApproveTransaction, adminRejectTransaction } = useAuth()
  const users = getAllRegisteredUsers()

  const [typeFilter, setTypeFilter] = useState('ALL') // 'ALL', 'WITHDRAWAL', 'DEPOSIT', 'CONVERT'
  const [searchTerm, setSearchTerm] = useState('')
  const [copiedHash, setCopiedHash] = useState(null)
  const [feedback, setFeedback] = useState(null)

  // Extract all pending and recent transactions across all users
  const allTransactions = users.flatMap((u) =>
    (u.transactions || []).map((t) => ({
      ...t,
      userId: u.id,
      userName: u.fullName,
      userEmail: u.email,
      userCapital: u.capital,
      userProfit: u.profit,
      userAvailable: u.availableBalance
    }))
  )

  const pendingList = allTransactions.filter((t) => {
    const isPending = t.status?.toLowerCase().includes('pending')
    if (!isPending) return false

    if (typeFilter !== 'ALL' && t.type !== typeFilter) return false

    const matchesSearch =
      t.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.hash && t.hash.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesSearch
  })

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopiedHash(id)
    setTimeout(() => setCopiedHash(null), 2000)
  }

  const handleApprove = (userId, txId, title) => {
    const res = adminApproveTransaction(userId, txId)
    if (res.success) {
      setFeedback({ type: 'success', message: `Approved transaction "${title}". Funds credited/dispatched.` })
      setTimeout(() => setFeedback(null), 4000)
    } else {
      setFeedback({ type: 'error', message: res.error || 'Failed to approve.' })
    }
  }

  const handleReject = (userId, txId, title) => {
    const res = adminRejectTransaction(userId, txId)
    if (res.success) {
      setFeedback({ type: 'warning', message: `Rejected transaction "${title}". Reason logged.` })
      setTimeout(() => setFeedback(null), 4000)
    } else {
      setFeedback({ type: 'error', message: res.error || 'Failed to reject.' })
    }
  }

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-[#121212] border border-white/10 p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#B0F127]/10 border border-[#B0F127]/30 flex items-center justify-center text-[#B0F127]">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">Transaction Approvals & Fee Verifier</h2>
            <p className="text-xs text-white/50">
              Audit external gas fees, tax clearance receipts, deposits, and 20% conversion fee hashes.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-white/60 font-mono">
            Pending Queue: <strong className="text-[#B0F127]">{pendingList.length}</strong>
          </span>
        </div>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-2xl text-xs flex items-center gap-2.5 animate-fade-in ${
            feedback.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
              : feedback.type === 'warning'
              ? 'bg-amber-500/10 border border-amber-500/30 text-amber-300'
              : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span className="font-semibold">{feedback.message}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-[#121212] border border-white/10 p-4 rounded-2xl">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search by user, email, tx title or txHash..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/60 border border-white/10 focus:border-[#B0F127] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-white/30 outline-none"
          />
        </div>

        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5 text-[11px]">
          {[
            { id: 'ALL', label: 'All Pending' },
            { id: 'WITHDRAWAL', label: 'Withdrawals' },
            { id: 'CONVERT', label: '20% Conversions' },
            { id: 'DEPOSIT', label: 'Deposits' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setTypeFilter(f.id)}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                typeFilter === f.id
                  ? 'bg-[#B0F127] text-black font-bold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Transaction Cards List */}
      <div className="space-y-3">
        {pendingList.length === 0 ? (
          <div className="bg-[#121212] border border-white/10 rounded-2xl p-12 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#B0F127]/30 mx-auto" />
            <h3 className="text-base font-bold text-white">Approvals Queue is Clear!</h3>
            <p className="text-xs text-white/40 max-w-sm mx-auto">
              There are no pending withdrawal, deposit, or conversion requests awaiting moderator verification.
            </p>
          </div>
        ) : (
          pendingList.map((tx) => {
            const isWithdrawal = tx.type === 'WITHDRAWAL'
            const isConvert = tx.type === 'CONVERT'
            const isDeposit = tx.type === 'DEPOSIT'

            return (
              <div
                key={tx.id}
                className="bg-[#121212] border border-white/10 hover:border-white/20 rounded-2xl p-5 space-y-4 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                        isWithdrawal
                          ? 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
                          : isConvert
                          ? 'bg-purple-500/10 border border-purple-500/20 text-purple-400'
                          : 'bg-[#B0F127]/10 border border-[#B0F127]/20 text-[#B0F127]'
                      }`}
                    >
                      {isWithdrawal ? (
                        <ArrowUpRight className="w-6 h-6" />
                      ) : isConvert ? (
                        <RefreshCw className="w-5 h-5" />
                      ) : (
                        <ArrowDownLeft className="w-6 h-6" />
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-white">{tx.title}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold">
                          Pending Audit
                        </span>
                      </div>
                      <div className="text-xs text-white/60">
                        Trader: <strong className="text-white">{tx.userName}</strong> ({tx.userEmail}) • {tx.date}
                      </div>
                    </div>
                  </div>

                  {/* Financial Amount */}
                  <div className="text-left md:text-right space-y-0.5 font-mono">
                    <div className="text-xl font-black text-white">
                      ${Number(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })} {tx.asset}
                    </div>
                    {tx.feeAmount && (
                      <div className="text-[11px] text-[#B0F127]">
                        External Fee: ${Number(tx.feeAmount).toLocaleString()} USDT
                      </div>
                    )}
                  </div>
                </div>

                {/* Meta details strip */}
                <div className="p-3 bg-black/60 border border-white/5 rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs font-mono">
                  {tx.hash && (
                    <div className="flex items-center justify-between gap-2 col-span-1 sm:col-span-2">
                      <span className="text-white/40">TxHash:</span>
                      <div className="flex items-center gap-1.5 text-white/90">
                        <span className="truncate max-w-[240px]">{tx.hash}</span>
                        <button
                          onClick={() => handleCopy(tx.hash, tx.id)}
                          className="p-1 text-white/40 hover:text-white"
                        >
                          {copiedHash === tx.id ? <Check className="w-3.5 h-3.5 text-[#B0F127]" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  )}

                  {tx.cryptoAddress && (
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-white/40">Destination:</span>
                      <span className="text-white truncate">{tx.cryptoAddress}</span>
                    </div>
                  )}

                  {tx.bankName && (
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-white/40">Bank Wire:</span>
                      <span className="text-white truncate">
                        {tx.bankName} ({tx.accountNumber})
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-white/40">Trader Bal:</span>
                    <span className="text-white font-semibold">
                      ${(tx.userTotal || tx.userAvailable || 0).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    onClick={() => handleReject(tx.userId, tx.id, tx.title)}
                    className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-bold text-xs rounded-xl border border-rose-500/20 transition-all flex items-center gap-1.5"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                  <button
                    onClick={() => handleApprove(tx.userId, tx.id, tx.title)}
                    className="px-5 py-2 bg-[#B0F127] hover:bg-[#9ee016] text-black font-black text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve & Finalize</span>
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
