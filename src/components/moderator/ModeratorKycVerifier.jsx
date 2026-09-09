import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import {
  FileCheck2,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search,
  Filter,
  Eye,
  User,
  Clock,
  Sparkles,
  FileText,
  Camera,
  Check,
  X,
  ExternalLink
} from 'lucide-react'

export default function ModeratorKycVerifier() {
  const { getAllRegisteredUsers, adminUpdateKyc } = useAuth()
  const users = getAllRegisteredUsers()

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL') // 'ALL', 'PENDING', 'UNVERIFIED', 'VERIFIED'
  const [selectedUser, setSelectedUser] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [rejectReason, setRejectReason] = useState('')
  const [showRejectModal, setShowRejectModal] = useState(false)

  // Filter users
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.id.toLowerCase().includes(searchTerm.toLowerCase())

    if (!matchesSearch) return false

    const statusLower = (u.kycStatus || 'unverified').toLowerCase()
    if (statusFilter === 'PENDING') return statusLower.includes('pending')
    if (statusFilter === 'UNVERIFIED') return statusLower === 'unverified'
    if (statusFilter === 'VERIFIED') return statusLower.includes('verified')
    return true
  })

  const handleApproveLevel1 = (userId) => {
    const res = adminUpdateKyc(userId, 'Verified Level 1')
    if (res.success) {
      setFeedback({ type: 'success', message: 'User approved for KYC Level 1 (Basic Identity Clearance).' })
      if (selectedUser?.id === userId) {
        setSelectedUser((prev) => ({ ...prev, kycStatus: 'Verified Level 1' }))
      }
      setTimeout(() => setFeedback(null), 4000)
    }
  }

  const handleApproveLevel2 = (userId) => {
    const res = adminUpdateKyc(userId, 'Verified Level 2')
    if (res.success) {
      setFeedback({ type: 'success', message: 'User approved for KYC Level 2 (Full Institutional Clearance).' })
      if (selectedUser?.id === userId) {
        setSelectedUser((prev) => ({ ...prev, kycStatus: 'Verified Level 2' }))
      }
      setTimeout(() => setFeedback(null), 4000)
    }
  }

  const handleRejectKyc = (userId) => {
    const note = rejectReason.trim() ? `Rejected: ${rejectReason.trim()}` : 'Rejected: Document Unclear'
    const res = adminUpdateKyc(userId, note)
    if (res.success) {
      setFeedback({ type: 'warning', message: `KYC rejected for user. Note: ${note}` })
      if (selectedUser?.id === userId) {
        setSelectedUser((prev) => ({ ...prev, kycStatus: note }))
      }
      setShowRejectModal(false)
      setRejectReason('')
      setTimeout(() => setFeedback(null), 4000)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-[#121212] border border-white/10 p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">KYC & Compliance Verification Desk</h2>
            <p className="text-xs text-white/50">
              Audit submitted passports, national IDs, and face verification checks for institutional compliance.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-white/60 font-mono">
            Total Traders: <strong className="text-[#B0F127]">{users.length}</strong>
          </span>
        </div>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-2xl text-xs flex items-center gap-2.5 animate-fade-in ${
            feedback.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
              : 'bg-amber-500/10 border border-amber-500/30 text-amber-300'
          }`}
        >
          {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          <span className="font-semibold">{feedback.message}</span>
        </div>
      )}

      {/* Main Grid: User Table (Left) + Document Inspector (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Users Table (7 Cols) */}
        <div className="lg:col-span-7 bg-[#121212] border border-white/10 rounded-2xl overflow-hidden flex flex-col">
          {/* Controls Bar */}
          <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search by name, email, user ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/60 border border-white/10 focus:border-[#B0F127] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-white/30 outline-none"
              />
            </div>

            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5 text-[11px]">
              {[
                { id: 'ALL', label: 'All' },
                { id: 'PENDING', label: 'Pending' },
                { id: 'UNVERIFIED', label: 'Unverified' },
                { id: 'VERIFIED', label: 'Verified' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setStatusFilter(f.id)}
                  className={`px-3 py-1 rounded-lg font-medium transition-all ${
                    statusFilter === f.id
                      ? 'bg-[#B0F127] text-black font-bold'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto flex-1 max-h-[550px]">
            <table className="w-full text-left text-xs">
              <thead className="bg-black/60 border-b border-white/10 text-white/40 font-mono text-[10px] uppercase">
                <tr>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Balance</th>
                  <th className="py-3 px-4">KYC Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-white/40">
                      No users found matching the selected filter.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => {
                    const isSelected = selectedUser?.id === u.id
                    const isVerified = u.kycStatus?.toLowerCase().includes('verified')

                    return (
                      <tr
                        key={u.id}
                        className={`hover:bg-white/[0.02] cursor-pointer transition-colors ${
                          isSelected ? 'bg-[#B0F127]/5' : ''
                        }`}
                        onClick={() => setSelectedUser(u)}
                      >
                        <td className="py-3 px-4">
                          <div className="font-bold text-white">{u.fullName}</div>
                          <div className="text-[10px] font-mono text-white/40">{u.email}</div>
                        </td>
                        <td className="py-3 px-4 font-mono">
                          <div className="text-white font-semibold">
                            ${(u.totalBalance || 0).toLocaleString()}
                          </div>
                          <div className="text-[10px] text-white/40">
                            Cap: ${(u.capital || 0).toLocaleString()}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                              isVerified
                                ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                                : u.kycStatus?.toLowerCase().includes('pending')
                                ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                                : 'bg-white/10 text-white/60 border border-white/10'
                            }`}
                          >
                            {u.kycStatus || 'Unverified'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => handleApproveLevel2(u.id)}
                              title="1-Click Approve Level 2"
                              className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/20 transition-all"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedUser(u)
                                setShowRejectModal(true)
                              }}
                              title="Reject KYC"
                              className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg border border-rose-500/20 transition-all"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setSelectedUser(u)}
                              title="Inspect Documents"
                              className="p-1.5 bg-white/5 hover:bg-white/10 text-white/70 rounded-lg border border-white/10 transition-all"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Document Inspector Card (5 Cols) */}
        <div className="lg:col-span-5 bg-[#121212] border border-white/10 rounded-2xl p-5 flex flex-col space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#B0F127]" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Document & Compliance Audit
              </h3>
            </div>
            {selectedUser && (
              <span className="text-[10px] font-mono text-white/50">ID: {selectedUser.id}</span>
            )}
          </div>

          {selectedUser ? (
            <div className="space-y-4 text-xs">
              {/* User Dossier */}
              <div className="space-y-1">
                <h4 className="text-base font-black text-white">{selectedUser.fullName}</h4>
                <p className="text-xs font-mono text-white/50">{selectedUser.email}</p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/60">
                    Phone: {selectedUser.phone || '+1 (555) 019-2834'}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#B0F127]/10 text-[#B0F127]">
                    Tier: {selectedUser.tier || 'Pro Trader'}
                  </span>
                </div>
              </div>

              {/* Document Mock Viewer */}
              <div className="p-4 bg-black/60 border border-white/10 rounded-xl space-y-3">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-white/60 font-semibold flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#B0F127]" />
                    Government ID Document (Front & Back)
                  </span>
                  <span className="text-emerald-400 font-mono text-[10px] font-bold">SHA-256 Verified</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="h-28 bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 rounded-lg p-3 flex flex-col justify-between text-[10px] text-white/60 font-mono relative overflow-hidden">
                    <div className="flex justify-between items-center text-white/40">
                      <span>PASSPORT / ID</span>
                      <Camera className="w-3 h-3 text-[#B0F127]" />
                    </div>
                    <div>
                      <div className="font-bold text-white">{selectedUser.fullName}</div>
                      <div className="text-[9px] text-white/40">DOC: #PX-{Math.abs(selectedUser.email.charCodeAt(0) * 8921).toString().slice(0, 8)}</div>
                    </div>
                  </div>

                  <div className="h-28 bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 rounded-lg p-3 flex flex-col justify-between text-[10px] text-white/60 font-mono">
                    <div className="flex justify-between items-center text-white/40">
                      <span>BIOMETRIC SCAN</span>
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-emerald-400 font-bold">Liveness 99.4%</div>
                      <div className="text-[9px] text-white/40">Anti-Spoof Passed</div>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-white/40 flex justify-between pt-1">
                  <span>Risk Rating: <strong className="text-emerald-400">LOW (0.02)</strong></span>
                  <span>AML Sanctions: <strong className="text-emerald-400">CLEARED</strong></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleApproveLevel1(selectedUser.id)}
                    className="py-2.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 font-bold text-xs rounded-xl border border-blue-500/30 transition-all flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve Level 1</span>
                  </button>

                  <button
                    onClick={() => handleApproveLevel2(selectedUser.id)}
                    className="py-2.5 bg-[#B0F127] hover:bg-[#9ee016] text-black font-black text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Approve Level 2</span>
                  </button>
                </div>

                <button
                  onClick={() => setShowRejectModal(true)}
                  className="w-full py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-semibold text-xs rounded-xl border border-rose-500/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Reject & Request Re-upload</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
              <FileCheck2 className="w-10 h-10 text-white/20" />
              <p className="text-xs text-white/40">Select a trader from the table to inspect KYC proofs.</p>
            </div>
          )}
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#141414] border border-white/15 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                Reject KYC for {selectedUser.fullName}
              </h3>
              <button
                onClick={() => setShowRejectModal(false)}
                className="p-1 rounded-lg text-white/40 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-white/60">
              Please specify the reason for rejection. This notification will be displayed on the trader’s dashboard.
            </p>

            <div className="space-y-1.5">
              <label className="text-xs text-white/60 font-medium">Rejection Reason</label>
              <textarea
                rows="3"
                placeholder="e.g. Photo of document is blurry / Missing back side / Name mismatch"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full bg-black/60 border border-white/15 focus:border-rose-400 rounded-xl p-3 text-xs text-white outline-none"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowRejectModal(false)}
                className="w-1/2 py-2.5 bg-white/5 hover:bg-white/10 text-white text-xs rounded-xl font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRejectKyc(selectedUser.id)}
                className="w-1/2 py-2.5 bg-rose-500 hover:bg-rose-600 text-white text-xs rounded-xl font-bold transition-all shadow-lg"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
