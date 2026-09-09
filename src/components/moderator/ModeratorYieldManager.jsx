import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import {
  TrendingUp,
  Zap,
  CheckCircle2,
  DollarSign,
  Plus,
  Clock,
  ShieldCheck,
  Search,
  Filter,
  User,
  X,
  Sparkles,
  AlertCircle
} from 'lucide-react'

export default function ModeratorYieldManager() {
  const { getAllRegisteredUsers, adminCreditYield, adminCreateInvestment } = useAuth()
  const users = getAllRegisteredUsers()

  const [searchTerm, setSearchTerm] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  // Custom Investment Form State
  const [targetUserId, setTargetUserId] = useState(users[0]?.id || '')
  const [packageName, setPackageName] = useState('Growth Alpha')
  const [depositAmount, setDepositAmount] = useState('5000')
  const [dailyRoi, setDailyRoi] = useState('2.4')
  const [durationDays, setDurationDays] = useState('30')

  // Collect all investments across all users
  const allInvestments = users.flatMap((u) =>
    (u.activeInvestments || []).map((inv) => ({
      ...inv,
      userId: u.id,
      userName: u.fullName,
      userEmail: u.email
    }))
  )

  const filteredInvestments = allInvestments.filter((inv) => {
    return (
      inv.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.packageName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const handleAccrueSingleYield = (userId, inv) => {
    const dailyAmt = Number(inv.dailyEarnings) || (Number(inv.amount) * (parseFloat(inv.dailyRoi) / 100))
    const res = adminCreditYield(userId, dailyAmt, `Daily Yield (${inv.packageName} ROI)`)

    if (res.success) {
      setFeedback({
        type: 'success',
        message: `Credited +$${dailyAmt.toFixed(2)} to ${inv.userName} for ${inv.packageName}!`
      })
      setTimeout(() => setFeedback(null), 4000)
    } else {
      setFeedback({ type: 'error', message: res.error || 'Failed to credit yield.' })
    }
  }

  const handleCreateNewInvestment = (e) => {
    e.preventDefault()
    if (!targetUserId || !depositAmount) return

    const res = adminCreateInvestment(targetUserId, {
      packageName,
      amount: depositAmount,
      dailyRoi,
      durationDays
    })

    if (res.success) {
      setFeedback({
        type: 'success',
        message: `Successfully generated new ${packageName} portfolio of $${Number(depositAmount).toLocaleString()}!`
      })
      setShowCreateModal(false)
      setTimeout(() => setFeedback(null), 4000)
    } else {
      setFeedback({ type: 'error', message: res.error || 'Failed to create investment.' })
    }
  }

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-[#121212] border border-white/10 p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">Investment Portfolios & Yield Engine</h2>
            <p className="text-xs text-white/50">
              Control automated arbitrage yield distribution and issue custom institutional investment contracts.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 bg-[#B0F127] hover:bg-[#9ee016] text-black font-black text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Create Investment Contract</span>
        </button>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-2xl text-xs flex items-center gap-2.5 animate-fade-in ${
            feedback.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span className="font-semibold">{feedback.message}</span>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-[#121212] border border-white/10 p-4 rounded-2xl">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search by investor name, email, or package name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/60 border border-white/10 focus:border-[#B0F127] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-white/30 outline-none"
          />
        </div>
      </div>

      {/* Investments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredInvestments.length === 0 ? (
          <div className="col-span-full bg-[#121212] border border-white/10 rounded-2xl p-12 text-center text-white/40 text-xs">
            No active investments found matching your query.
          </div>
        ) : (
          filteredInvestments.map((inv) => (
            <div
              key={inv.id}
              className="bg-[#121212] border border-white/10 hover:border-white/20 rounded-2xl p-5 space-y-4 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono text-[#B0F127] font-semibold block">
                      {inv.packageName}
                    </span>
                    <h4 className="text-sm font-bold text-white">{inv.userName}</h4>
                    <span className="text-[10px] font-mono text-white/40">{inv.userEmail}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold">
                    {inv.status || 'ACTIVE'}
                  </span>
                </div>

                <div className="p-3 bg-black/60 border border-white/5 rounded-xl space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-white/60">
                    <span>Invested Capital:</span>
                    <span className="text-white font-bold">${Number(inv.amount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Daily ROI Yield:</span>
                    <span className="text-[#B0F127] font-bold">{inv.dailyRoi} (~${Number(inv.dailyEarnings || 0).toFixed(2)})</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Duration:</span>
                    <span className="text-white">{inv.duration || '30 Days'}</span>
                  </div>
                  <div className="flex justify-between text-white/60 pt-1 border-t border-white/5">
                    <span>Total Earned:</span>
                    <span className="text-emerald-400 font-bold">${Number(inv.totalEarned || 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Quick Accrue Button */}
              <button
                onClick={() => handleAccrueSingleYield(inv.userId, inv)}
                className="w-full py-2.5 bg-white/5 hover:bg-[#B0F127] hover:text-black text-white font-bold text-xs rounded-xl border border-white/10 hover:border-[#B0F127] transition-all flex items-center justify-center gap-1.5 group"
              >
                <Zap className="w-3.5 h-3.5 text-[#B0F127] group-hover:text-black" />
                <span>Accrue 24H ROI Yield Now</span>
              </button>
            </div>
          ))
        )}
      </div>

      {/* Create Investment Contract Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#141414] border border-white/15 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B0F127]" />
                Generate Custom Investment Contract
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg text-white/40 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateNewInvestment} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs text-white/60">Select Target Trader</label>
                <select
                  value={targetUserId}
                  onChange={(e) => setTargetUserId(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-3 py-2.5 text-xs text-white outline-none"
                >
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.fullName} ({u.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs text-white/60">Plan Name</label>
                  <input
                    type="text"
                    required
                    value={packageName}
                    onChange={(e) => setPackageName(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-white/60">Amount ($ USD)</label>
                  <input
                    type="number"
                    required
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-3 py-2 text-xs text-white outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs text-white/60">Daily ROI (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={dailyRoi}
                    onChange={(e) => setDailyRoi(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-3 py-2 text-xs text-white outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-white/60">Duration (Days)</label>
                  <input
                    type="number"
                    required
                    value={durationDays}
                    onChange={(e) => setDurationDays(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-3 py-2 text-xs text-white outline-none font-mono"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="w-1/2 py-2.5 bg-white/5 hover:bg-white/10 text-white text-xs rounded-xl font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-[#B0F127] hover:bg-[#9ee016] text-black text-xs rounded-xl font-bold transition-all shadow-md"
                >
                  Generate Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
