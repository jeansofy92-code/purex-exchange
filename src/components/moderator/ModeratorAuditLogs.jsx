import { useState } from 'react'
import {
  FileText,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Clock,
  User,
  Filter,
  Search,
  MessageSquare,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react'

const DEFAULT_AUDIT_LOGS = [
  {
    id: 'log-101',
    event: 'KYC_APPROVED',
    title: 'KYC Level 2 Cleared',
    operator: 'Moderator Marcus',
    target: 'Alex Vance (Alpha Trader)',
    details: 'Verified Passport and Liveness biometrics (SHA-256 hash match)',
    time: '5 minutes ago',
    type: 'COMPLIANCE'
  },
  {
    id: 'log-102',
    event: 'YIELD_ACCRUED',
    title: 'Global 24H Yield Dispatched',
    operator: 'System Cron / Moderator Ops',
    target: 'All Active Trader Portfolios',
    details: 'Accrued $14,250.00 across 9 active arbitrage desk clusters',
    time: '22 minutes ago',
    type: 'YIELD'
  },
  {
    id: 'log-103',
    event: 'DEPOSIT_APPROVED',
    title: 'USDT TRC20 Deposit Approved',
    operator: 'Moderator Sarah',
    target: 'Elena Rostova (Institutional)',
    details: 'TxHash 0x99a1...12ff confirmed on-chain. Credited $25,000.00 available balance',
    time: '1 hour ago',
    type: 'FINANCE'
  },
  {
    id: 'log-104',
    event: 'SUPPORT_RESOLVED',
    title: 'Live Chat Ticket Resolved (#PX-881)',
    operator: 'Senior Operations Officer',
    target: 'Alex Chen',
    details: 'Assisted trader with 20% conversion fee invoice instructions',
    time: '2 hours ago',
    type: 'SUPPORT'
  },
  {
    id: 'log-105',
    event: 'WITHDRAWAL_APPROVED',
    title: 'Local Bank Wire Cleared',
    operator: 'Compliance Officer Davis',
    target: 'David Miller',
    details: '15% Tax clearance verified (TxHash 0x71e9...55cc). Wire dispatched $15,000.00 USD',
    time: '3 hours ago',
    type: 'FINANCE'
  }
]

export default function ModeratorAuditLogs() {
  const [logs] = useState(DEFAULT_AUDIT_LOGS)
  const [filterType, setFilterType] = useState('ALL')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredLogs = logs.filter((l) => {
    if (filterType !== 'ALL' && l.type !== filterType) return false
    const matches =
      l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.operator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.details.toLowerCase().includes(searchTerm.toLowerCase())
    return matches
  })

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-[#121212] border border-white/10 p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">Operations Audit & Security Log</h2>
            <p className="text-xs text-white/50">
              Immutable chronological record of all actions taken by moderators, compliance agents, and yield controllers.
            </p>
          </div>
        </div>

        <div className="text-xs font-mono text-white/50">
          Total Recorded Actions: <strong className="text-[#B0F127]">{logs.length}</strong>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-[#121212] border border-white/10 p-4 rounded-2xl">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search audit trail by operator, target user, or action..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/60 border border-white/10 focus:border-[#B0F127] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-white/30 outline-none"
          />
        </div>

        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5 text-[11px]">
          {[
            { id: 'ALL', label: 'All Events' },
            { id: 'COMPLIANCE', label: 'Compliance' },
            { id: 'FINANCE', label: 'Finance' },
            { id: 'SUPPORT', label: 'Support' },
            { id: 'YIELD', label: 'Yield' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                filterType === f.id
                  ? 'bg-[#B0F127] text-black font-bold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Log Stream */}
      <div className="bg-[#121212] border border-white/10 rounded-2xl divide-y divide-white/5 overflow-hidden">
        {filteredLogs.map((log) => (
          <div key={log.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.01] transition-all">
            <div className="flex items-start gap-3.5">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  log.type === 'COMPLIANCE'
                    ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                    : log.type === 'YIELD'
                    ? 'bg-purple-500/10 border border-purple-500/20 text-purple-400'
                    : log.type === 'SUPPORT'
                    ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                    : 'bg-[#B0F127]/10 border border-[#B0F127]/20 text-[#B0F127]'
                }`}
              >
                {log.type === 'COMPLIANCE' ? (
                  <ShieldCheck className="w-5 h-5" />
                ) : log.type === 'YIELD' ? (
                  <Zap className="w-5 h-5" />
                ) : log.type === 'SUPPORT' ? (
                  <MessageSquare className="w-5 h-5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5" />
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm font-bold text-white">{log.title}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/60 font-semibold">
                    {log.type}
                  </span>
                </div>
                <p className="text-xs text-white/70">{log.details}</p>
                <div className="text-[11px] text-white/40 font-mono flex items-center gap-2">
                  <span>Operator: <strong className="text-white">{log.operator}</strong></span>
                  <span>•</span>
                  <span>Target: <strong className="text-white">{log.target}</strong></span>
                </div>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs font-mono text-white/40 flex items-center gap-1 md:justify-end">
                <Clock className="w-3.5 h-3.5" />
                {log.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
