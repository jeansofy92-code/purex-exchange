import { useAuth } from '../../context/AuthContext'
import {
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  ShieldCheck,
  Zap,
  ArrowDownLeft,
  ArrowUpRight,
  RefreshCw,
  AlertTriangle
} from 'lucide-react'

export default function AdminOverview({ onNavigateTab }) {
  const { getAllRegisteredUsers } = useAuth()
  const users = getAllRegisteredUsers()

  const totalCapital = users.reduce((acc, u) => acc + (Number(u.capital) || 0), 0)
  const totalProfit = users.reduce((acc, u) => acc + (Number(u.profit) || 0), 0)
  const totalAvailable = users.reduce((acc, u) => acc + (Number(u.availableBalance) || 0), 0)
  const totalSystemAssets = totalCapital + totalProfit + totalAvailable

  // Find all pending transactions across all users
  const allTransactions = users.flatMap((u) =>
    (u.transactions || []).map((t) => ({ ...t, userName: u.fullName, userEmail: u.email, userId: u.id }))
  )

  const pendingWithdrawals = allTransactions.filter(
    (t) => t.type === 'WITHDRAWAL' && (t.status?.includes('Pending') || t.status === 'Pending')
  )
  const pendingConversions = allTransactions.filter(
    (t) => t.type === 'CONVERT' && (t.status?.includes('Pending') || t.status === 'Pending')
  )
  const pendingDeposits = allTransactions.filter(
    (t) => t.type === 'DEPOSIT' && (t.status?.includes('Pending') || t.status === 'Pending')
  )
  const pendingKycUsers = users.filter((u) => u.kycStatus?.includes('Pending'))

  const totalPendingQueueCount =
    pendingWithdrawals.length + pendingConversions.length + pendingDeposits.length + pendingKycUsers.length

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#B0F127]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-2 max-w-xl z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B0F127]/10 border border-[#B0F127]/20 text-[#B0F127] text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            Executive Admin Control Center
          </div>
          <h2 className="text-2xl lg:text-3xl font-black tracking-tight text-white">
            Purex Exchange Management Console
          </h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Manage user accounts, adjust balances, approve pending withdrawals and conversions, and configure fee deposit wallets in real time.
          </p>
        </div>

        <div className="bg-black/50 border border-white/10 rounded-xl p-4 flex flex-col gap-2 min-w-[220px]">
          <span className="text-[10px] text-white/40 uppercase tracking-wider font-mono">Pending Approvals</span>
          <div className="text-2xl font-bold text-[#B0F127] font-mono flex items-center gap-2">
            <span>{totalPendingQueueCount}</span>
            <span className="text-xs text-white/50 font-normal">Requests awaiting review</span>
          </div>
          <button
            onClick={() => onNavigateTab('approvals')}
            className="w-full mt-1 px-3 py-2 bg-[#B0F127] hover:bg-[#9ee016] text-black font-semibold text-xs rounded-lg transition-all"
          >
            Open Approvals Queue →
          </button>
        </div>
      </div>

      {/* Metrics Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Platform Capital */}
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-white/50">
            <span>Total Capital Backing</span>
            <DollarSign className="w-4 h-4 text-[#B0F127]" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">
            ${totalCapital.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">100% SAFU Reserve Active</span>
        </div>

        {/* Total User Net Profit */}
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-white/50">
            <span>User Realized Profits</span>
            <TrendingUp className="w-4 h-4 text-[#B0F127]" />
          </div>
          <div className="text-2xl font-bold text-[#B0F127] font-mono">
            ${totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[10px] text-white/40 font-mono">Algorithmic Bot Yields</span>
        </div>

        {/* Registered Users */}
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-white/50">
            <span>Registered Traders</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">
            {users.length} Active Accounts
          </div>
          <span className="text-[10px] text-purple-400 font-mono">Institutional & Retail</span>
        </div>

        {/* Total Platform Balance (Signature White Card) */}
        <div className="bg-white text-black rounded-2xl p-5 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-xs text-black/60 font-semibold">
            <span>Total System Valuation</span>
            <ShieldCheck className="w-4 h-4 text-black" />
          </div>
          <div className="text-2xl font-black text-black font-mono">
            ${totalSystemAssets.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[10px] text-black/70 font-mono">Capital + Profits + Available</span>
        </div>
      </div>

      {/* Pending Queues Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pending Withdrawals */}
        <div
          onClick={() => onNavigateTab('approvals')}
          className="bg-[#141414] border border-white/10 hover:border-[#B0F127]/50 rounded-2xl p-6 space-y-3 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <ArrowUpRight className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2.5 py-1 rounded-full">
              {pendingWithdrawals.length} Pending
            </span>
          </div>
          <h3 className="text-base font-bold text-white">Pending Withdrawals</h3>
          <p className="text-xs text-white/50">
            Crypto gas and bank tax clearance payments awaiting admin confirmation.
          </p>
        </div>

        {/* Pending Conversion Fees */}
        <div
          onClick={() => onNavigateTab('approvals')}
          className="bg-[#141414] border border-white/10 hover:border-[#B0F127]/50 rounded-2xl p-6 space-y-3 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <RefreshCw className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-2.5 py-1 rounded-full">
              {pendingConversions.length} Pending
            </span>
          </div>
          <h3 className="text-base font-bold text-white">20% Conversion Fees</h3>
          <p className="text-xs text-white/50">
            External 20% conversion fee payments awaiting verification and swap clearance.
          </p>
        </div>

        {/* Pending KYC Submissions */}
        <div
          onClick={() => onNavigateTab('approvals')}
          className="bg-[#141414] border border-white/10 hover:border-[#B0F127]/50 rounded-2xl p-6 space-y-3 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#B0F127]/10 border border-[#B0F127]/20 flex items-center justify-center text-[#B0F127]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold font-mono bg-[#B0F127]/10 text-[#B0F127] border border-[#B0F127]/20 px-2.5 py-1 rounded-full">
              {pendingKycUsers.length} Pending
            </span>
          </div>
          <h3 className="text-base font-bold text-white">KYC Verifications</h3>
          <p className="text-xs text-white/50">
            Submitted identity documentation for Tier 1 and Tier 2 level upgrades.
          </p>
        </div>
      </div>
    </div>
  )
}
