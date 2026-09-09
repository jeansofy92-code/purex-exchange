import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useSupportChat } from '../../hooks/useSupportChat'
import {
  ShieldCheck,
  MessageSquare,
  FileCheck2,
  CheckCircle2,
  TrendingUp,
  Clock,
  Zap,
  Users,
  AlertTriangle,
  ArrowRight,
  Activity,
  Bot,
  Sparkles
} from 'lucide-react'

export default function ModeratorOverview({ onNavigateTab }) {
  const { getAllRegisteredUsers, adminCreditYield } = useAuth()
  const { conversations } = useSupportChat()
  const users = getAllRegisteredUsers()

  const [batchAccruing, setBatchAccruing] = useState(false)
  const [batchSuccessMsg, setBatchSuccessMsg] = useState('')

  // Compute metrics
  const activeUsersCount = users.length
  const totalActiveInvestments = users.reduce(
    (acc, u) => acc + (u.activeInvestments?.length || 0),
    0
  )

  const pendingKycUsers = users.filter((u) => u.kycStatus?.toLowerCase().includes('pending') || u.kycStatus === 'Unverified')
  
  const allTransactions = users.flatMap((u) =>
    (u.transactions || []).map((t) => ({ ...t, userName: u.fullName, userEmail: u.email, userId: u.id }))
  )

  const pendingTransactions = allTransactions.filter(
    (t) => t.status?.toLowerCase().includes('pending')
  )

  const openTickets = conversations.filter(
    (c) => c.status === 'pending_admin' || c.status === 'active_admin'
  )

  const handleBatchAccrueYield = () => {
    setBatchAccruing(true)
    let totalCredited = 0
    let usersUpdated = 0

    setTimeout(() => {
      users.forEach((u) => {
        if (u.activeInvestments && u.activeInvestments.length > 0) {
          u.activeInvestments.forEach((inv) => {
            const dailyAmt = Number(inv.dailyEarnings) || (Number(inv.amount) * 0.024)
            adminCreditYield(u.id, dailyAmt, `Auto 24H Yield Accrual (${inv.packageName})`)
            totalCredited += dailyAmt
          })
          usersUpdated++
        }
      })

      setBatchAccruing(false)
      setBatchSuccessMsg(`Successfully credited $${totalCredited.toLocaleString('en-US', { minimumFractionDigits: 2 })} across ${usersUpdated} active trader portfolios!`)
      setTimeout(() => setBatchSuccessMsg(''), 5000)
    }, 1000)
  }

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-[#121212] border border-white/10 rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#B0F127]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 max-w-xl z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B0F127]/10 border border-[#B0F127]/20 text-[#B0F127] text-xs font-semibold font-mono">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            Moderator Operations Suite
          </div>
          <h2 className="text-2xl lg:text-3xl font-black tracking-tight text-white">
            Live Support & Compliance Desk
          </h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Monitor real-time omnichannel customer support chats, verify KYC documents, audit pending deposits & withdrawals, and trigger algorithmic daily yield accruals.
          </p>
        </div>

        {/* Rapid Batch Run Action */}
        <div className="z-10 flex flex-col gap-2 w-full md:w-auto">
          <button
            onClick={handleBatchAccrueYield}
            disabled={batchAccruing}
            className="px-6 py-3.5 bg-[#B0F127] hover:bg-[#9ee016] text-black font-black text-xs rounded-2xl transition-all shadow-[0_0_25px_rgba(176,241,39,0.25)] flex items-center justify-center gap-2.5 disabled:opacity-50"
          >
            <Zap className={`w-4 h-4 ${batchAccruing ? 'animate-spin' : ''}`} />
            <span>{batchAccruing ? 'Executing Global Yield Run...' : 'Run Global 24H Yield Accrual'}</span>
          </button>
          <span className="text-[11px] text-white/40 text-center font-mono">
            Applies active package ROI to all investor balances
          </span>
        </div>
      </div>

      {batchSuccessMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-xs text-emerald-300 flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span className="font-semibold">{batchSuccessMsg}</span>
        </div>
      )}

      {/* Operational Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Open Support Tickets */}
        <div
          onClick={() => onNavigateTab('support')}
          className="bg-[#121212] border border-white/10 hover:border-[#B0F127]/50 rounded-2xl p-5 space-y-3 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white/50">Live Support Queue</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-black text-white tracking-tight flex items-baseline gap-2">
              <span>{openTickets.length}</span>
              <span className="text-xs text-blue-400 font-mono font-medium">Active Chats</span>
            </div>
            <p className="text-[11px] text-white/40">
              Users waiting for specialist assistance
            </p>
          </div>
        </div>

        {/* Pending KYC Queue */}
        <div
          onClick={() => onNavigateTab('kyc')}
          className="bg-[#121212] border border-white/10 hover:border-[#B0F127]/50 rounded-2xl p-5 space-y-3 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white/50">KYC Verification Queue</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-black text-white tracking-tight flex items-baseline gap-2">
              <span>{pendingKycUsers.length}</span>
              <span className="text-xs text-amber-400 font-mono font-medium">Awaiting Audit</span>
            </div>
            <p className="text-[11px] text-white/40">
              Passports, IDs and selfie proofs
            </p>
          </div>
        </div>

        {/* Pending Approvals */}
        <div
          onClick={() => onNavigateTab('approvals')}
          className="bg-[#121212] border border-white/10 hover:border-[#B0F127]/50 rounded-2xl p-5 space-y-3 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white/50">Pending Transactions</span>
            <div className="w-9 h-9 rounded-xl bg-[#B0F127]/10 border border-[#B0F127]/20 flex items-center justify-center text-[#B0F127] group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-black text-white tracking-tight flex items-baseline gap-2">
              <span>{pendingTransactions.length}</span>
              <span className="text-xs text-[#B0F127] font-mono font-medium">Requests</span>
            </div>
            <p className="text-[11px] text-white/40">
              Deposits, withdrawals & 20% conversion fees
            </p>
          </div>
        </div>

        {/* Active Investment Portfolios */}
        <div
          onClick={() => onNavigateTab('yield')}
          className="bg-[#121212] border border-white/10 hover:border-[#B0F127]/50 rounded-2xl p-5 space-y-3 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white/50">Active Investment Plans</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-black text-white tracking-tight flex items-baseline gap-2">
              <span>{totalActiveInvestments}</span>
              <span className="text-xs text-purple-400 font-mono font-medium">Running Bots</span>
            </div>
            <p className="text-[11px] text-white/40">
              Generating daily arbitrage returns
            </p>
          </div>
        </div>
      </div>

      {/* Quick Action Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Support Chat Queue Snapshot */}
        <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">Live Customer Chat Stream</h3>
            </div>
            <button
              onClick={() => onNavigateTab('support')}
              className="text-xs text-[#B0F127] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Open Workstation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {conversations.slice(0, 3).map((conv) => (
              <div
                key={conv.id}
                onClick={() => onNavigateTab('support')}
                className="p-3.5 bg-black/50 hover:bg-black/80 border border-white/5 hover:border-white/15 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-3"
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white truncate">{conv.userName}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/60">
                      {conv.plan}
                    </span>
                  </div>
                  <p className="text-xs text-white/50 truncate">
                    {conv.messages[conv.messages.length - 1]?.text || 'No messages yet'}
                  </p>
                </div>

                <div className="shrink-0 text-right space-y-1">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold block ${
                      conv.status === 'pending_admin'
                        ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                        : conv.status === 'active_admin'
                        ? 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                        : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                    }`}
                  >
                    {conv.status === 'pending_admin' ? 'Needs Agent' : conv.status === 'active_admin' ? 'Active Chat' : 'Resolved'}
                  </span>
                  <span className="text-[10px] text-white/40 block font-mono">
                    {conv.messages[conv.messages.length - 1]?.time || 'Recent'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* KYC Compliance Fast Review */}
        <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">KYC Verification Stream</h3>
            </div>
            <button
              onClick={() => onNavigateTab('kyc')}
              className="text-xs text-[#B0F127] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Manage All KYC</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {users.slice(0, 3).map((u) => (
              <div
                key={u.id}
                onClick={() => onNavigateTab('kyc')}
                className="p-3.5 bg-black/50 hover:bg-black/80 border border-white/5 hover:border-white/15 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{u.fullName}</span>
                    <span className="text-[10px] font-mono text-white/40">{u.email}</span>
                  </div>
                  <div className="text-[11px] text-white/50 font-mono">
                    Capital: <span className="text-white">${(u.capital || 0).toLocaleString()}</span> • Profit: <span className="text-[#B0F127]">${(u.profit || 0).toLocaleString()}</span>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold block ${
                      u.kycStatus?.toLowerCase().includes('verified')
                        ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                    }`}
                  >
                    {u.kycStatus || 'Unverified'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
