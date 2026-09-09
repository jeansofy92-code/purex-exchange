import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import {
  ArrowUpRight,
  RefreshCw,
  ArrowDownLeft,
  ShieldCheck,
  Check,
  X,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  DollarSign,
  Copy
} from 'lucide-react'

export default function AdminApprovals() {
  const {
    getAllRegisteredUsers,
    adminApproveTransaction,
    adminRejectTransaction,
    adminApproveKyc
  } = useAuth()

  const [activeTab, setActiveTab] = useState('withdrawals')
  const [users, setUsers] = useState(getAllRegisteredUsers())
  const [copiedHash, setCopiedHash] = useState(null)
  const [actionNotice, setActionNotice] = useState(null)

  const handleRefresh = () => {
    setUsers(getAllRegisteredUsers())
  }

  const handleCopy = (hash) => {
    navigator.clipboard.writeText(hash)
    setCopiedHash(hash)
    setTimeout(() => setCopiedHash(null), 2000)
  }

  // Extract all pending transactions
  const allTxs = users.flatMap((u) =>
    (u.transactions || []).map((t) => ({ ...t, userName: u.fullName, userEmail: u.email, userId: u.id }))
  )

  const pendingWithdrawals = allTxs.filter(
    (t) => t.type === 'WITHDRAWAL' && (t.status?.includes('Pending') || t.status === 'Pending')
  )

  const pendingConversions = allTxs.filter(
    (t) => t.type === 'CONVERT' && (t.status?.includes('Pending') || t.status === 'Pending')
  )

  const pendingDeposits = allTxs.filter(
    (t) => t.type === 'DEPOSIT' && (t.status?.includes('Pending') || t.status === 'Pending')
  )

  const pendingKycUsers = users.filter((u) => u.kycStatus?.includes('Pending'))

  const handleApprove = (userId, txId, customTitle = 'Transaction') => {
    const res = adminApproveTransaction(userId, txId)
    if (res.success) {
      setActionNotice({ type: 'success', message: `${customTitle} approved and completed successfully!` })
      handleRefresh()
      setTimeout(() => setActionNotice(null), 3000)
    }
  }

  const handleReject = (userId, txId, customTitle = 'Transaction') => {
    const res = adminRejectTransaction(userId, txId, 'Admin Verification Failed')
    if (res.success) {
      setActionNotice({ type: 'error', message: `${customTitle} rejected and refunded.` })
      handleRefresh()
      setTimeout(() => setActionNotice(null), 3000)
    }
  }

  const handleApproveUserKyc = (userId, userName) => {
    const res = adminApproveKyc(userId, 2)
    if (res.success) {
      setActionNotice({ type: 'success', message: `KYC Level 2 approved for ${userName}!` })
      handleRefresh()
      setTimeout(() => setActionNotice(null), 3000)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Approvals & Clearing Queue</h2>
          <p className="text-xs text-white/50">
            Verify external fee payments, tax clearances, and identity documents to release transactions.
          </p>
        </div>
      </div>

      {actionNotice && (
        <div
          className={`p-3.5 rounded-2xl text-xs flex items-center gap-2 ${
            actionNotice.type === 'success'
              ? 'bg-[#B0F127]/10 text-[#B0F127] border border-[#B0F127]/30'
              : 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
          }`}
        >
          {actionNotice.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{actionNotice.message}</span>
        </div>
      )}

      {/* Navigation Subtabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'withdrawals', label: `Pending Withdrawals (${pendingWithdrawals.length})`, icon: ArrowUpRight },
          { id: 'conversions', label: `20% Conversion Fees (${pendingConversions.length})`, icon: RefreshCw },
          { id: 'deposits', label: `Pending Deposits (${pendingDeposits.length})`, icon: ArrowDownLeft },
          { id: 'kyc', label: `KYC Reviews (${pendingKycUsers.length})`, icon: ShieldCheck }
        ].map((tab) => {
          const isSelected = activeTab === tab.id
          const Icon = tab.icon

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 border ${
                isSelected
                  ? 'bg-[#B0F127] text-black border-[#B0F127]'
                  : 'bg-[#141414] text-white/70 border-white/10 hover:border-white/25 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* TAB 1: PENDING WITHDRAWALS */}
      {activeTab === 'withdrawals' && (
        <div className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          {pendingWithdrawals.length === 0 ? (
            <div className="py-16 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-[#B0F127] mx-auto opacity-60" />
              <h4 className="text-base font-bold text-white">No Pending Withdrawals</h4>
              <p className="text-xs text-white/40">All withdrawal requests are cleared and completed.</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {pendingWithdrawals.map((tx) => (
                <div key={tx.id} className="p-6 space-y-4 hover:bg-white/[0.01] transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          {tx.withdrawalMethod === 'LOCAL_BANK' ? 'BANK TRANSFER' : 'CRYPTO PAYOUT'}
                        </span>
                        <span className="text-xs text-white/40 font-mono">ID: {tx.id}</span>
                      </div>
                      <h4 className="text-base font-bold text-white mt-1">{tx.title}</h4>
                      <p className="text-xs text-white/60">
                        Requested by: <strong>{tx.userName}</strong> ({tx.userEmail})
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-white/40 uppercase font-mono block">Withdrawal Amount</span>
                      <span className="text-2xl font-black text-white font-mono">
                        ${Number(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  {/* Details Card */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-black/50 rounded-xl border border-white/5 text-xs font-mono">
                    <div className="space-y-1.5">
                      {tx.withdrawalMethod === 'LOCAL_BANK' ? (
                        <>
                          <div className="text-white/60">Bank: <strong className="text-white">{tx.bankName}</strong></div>
                          <div className="text-white/60">Account Number: <strong className="text-white">{tx.accountNumber}</strong></div>
                          <div className="text-white/60">Account Name: <strong className="text-white">{tx.accountName}</strong></div>
                          {tx.swiftCode && <div className="text-white/60">Swift: <strong className="text-white">{tx.swiftCode}</strong></div>}
                        </>
                      ) : (
                        <>
                          <div className="text-white/60">Crypto Address: <strong className="text-white">{tx.cryptoAddress}</strong></div>
                          <div className="text-white/60">Network: <strong className="text-white">{tx.cryptoNetwork}</strong></div>
                        </>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-white/60">
                        {tx.withdrawalMethod === 'LOCAL_BANK' ? 'Tax Clearance Fee:' : 'Gas Clearing Fee:'}
                        <strong className="text-[#B0F127] ml-1">
                          ${(tx.taxFeeAmount || tx.gasFeeAmount || 0).toLocaleString()} USDT
                        </strong>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white/60">Fee TxHash:</span>
                        <span className="text-white truncate max-w-[150px]">{tx.feeTxHash || 'Submitted'}</span>
                        {tx.feeTxHash && (
                          <button
                            onClick={() => handleCopy(tx.feeTxHash)}
                            className="p-1 hover:text-[#B0F127] transition-colors"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <div className="text-white/60">Status: <span className="text-amber-400 font-bold">{tx.status}</span></div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => handleReject(tx.userId, tx.id, 'Withdrawal')}
                      className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
                    >
                      <X className="w-3.5 h-3.5" />
                      Reject & Refund Balance
                    </button>
                    <button
                      onClick={() => handleApprove(tx.userId, tx.id, 'Withdrawal')}
                      className="px-5 py-2 bg-[#B0F127] hover:bg-[#9ee016] text-black font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Approve & Complete Payout
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PENDING CONVERSIONS (20% Fee) */}
      {activeTab === 'conversions' && (
        <div className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          {pendingConversions.length === 0 ? (
            <div className="py-16 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-[#B0F127] mx-auto opacity-60" />
              <h4 className="text-base font-bold text-white">No Pending Conversions</h4>
              <p className="text-xs text-white/40">All 20% conversion fee payments are cleared.</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {pendingConversions.map((tx) => (
                <div key={tx.id} className="p-6 space-y-4 hover:bg-white/[0.01] transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        20% CONVERSION FEE
                      </span>
                      <h4 className="text-base font-bold text-white mt-1">{tx.title}</h4>
                      <p className="text-xs text-white/60">
                        User: <strong>{tx.userName}</strong> ({tx.userEmail})
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-white/40 uppercase font-mono block">Swap Amount</span>
                      <span className="text-2xl font-black text-cyan-300 font-mono">
                        {tx.amount} {tx.asset} → {tx.toAmount} {tx.toAsset}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-black/50 rounded-xl border border-white/5 text-xs font-mono">
                    <div className="space-y-1.5">
                      <div className="text-white/60">
                        20% Conversion Fee Paid:
                        <strong className="text-[#B0F127] ml-1">
                          ${(tx.conversionFeeAmount || 0).toLocaleString()} USDT
                        </strong>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white/60">Fee TxHash:</span>
                        <span className="text-white truncate max-w-[150px]">{tx.feeTxHash || 'Submitted'}</span>
                        {tx.feeTxHash && (
                          <button
                            onClick={() => handleCopy(tx.feeTxHash)}
                            className="p-1 hover:text-[#B0F127] transition-colors"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-white/60">Date: <span className="text-white">{tx.date}</span></div>
                      <div className="text-white/60">Status: <span className="text-amber-400 font-bold">{tx.status}</span></div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => handleReject(tx.userId, tx.id, 'Conversion')}
                      className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold text-xs rounded-xl"
                    >
                      <X className="w-3.5 h-3.5" />
                      Reject Conversion
                    </button>
                    <button
                      onClick={() => handleApprove(tx.userId, tx.id, 'Conversion')}
                      className="px-5 py-2 bg-[#B0F127] hover:bg-[#9ee016] text-black font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Approve & Credit Converted Asset
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PENDING DEPOSITS */}
      {activeTab === 'deposits' && (
        <div className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          {pendingDeposits.length === 0 ? (
            <div className="py-16 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-[#B0F127] mx-auto opacity-60" />
              <h4 className="text-base font-bold text-white">No Pending Deposits</h4>
              <p className="text-xs text-white/40">All capital deposits are credited.</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {pendingDeposits.map((tx) => (
                <div key={tx.id} className="p-6 space-y-4 hover:bg-white/[0.01] transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                        CAPITAL INFLOW
                      </span>
                      <h4 className="text-base font-bold text-white mt-1">{tx.title}</h4>
                      <p className="text-xs text-white/60">
                        Trader: <strong>{tx.userName}</strong> ({tx.userEmail})
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-white/40 uppercase font-mono block">Deposit Inflow</span>
                      <span className="text-2xl font-black text-emerald-400 font-mono">
                        +${Number(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-black/50 rounded-xl border border-white/5 text-xs font-mono flex items-center justify-between">
                    <div>TxHash: <span className="text-white ml-2">{tx.hash}</span></div>
                    <div className="text-amber-400 font-bold">{tx.status}</div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => handleReject(tx.userId, tx.id, 'Deposit')}
                      className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold text-xs rounded-xl"
                    >
                      <X className="w-3.5 h-3.5" />
                      Reject Deposit
                    </button>
                    <button
                      onClick={() => handleApprove(tx.userId, tx.id, 'Deposit')}
                      className="px-5 py-2 bg-[#B0F127] hover:bg-[#9ee016] text-black font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Approve & Credit Balance
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: PENDING KYC REVIEWS */}
      {activeTab === 'kyc' && (
        <div className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          {pendingKycUsers.length === 0 ? (
            <div className="py-16 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-[#B0F127] mx-auto opacity-60" />
              <h4 className="text-base font-bold text-white">No Pending KYC Submissions</h4>
              <p className="text-xs text-white/40">All registered users are verified.</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {pendingKycUsers.map((u) => (
                <div key={u.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#B0F127]/10 text-[#B0F127] border border-[#B0F127]/20">
                        {u.kycStatus}
                      </span>
                      <span className="text-xs text-white/40 font-mono">ID: {u.id}</span>
                    </div>
                    <h4 className="text-base font-bold text-white">{u.fullName}</h4>
                    <p className="text-xs text-white/60">{u.email} • {u.phone}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleApproveUserKyc(u.id, u.fullName)}
                      className="px-5 py-2.5 bg-[#B0F127] hover:bg-[#9ee016] text-black font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      Approve Level 2 KYC
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
