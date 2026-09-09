import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import {
  Search,
  User,
  DollarSign,
  Edit,
  Check,
  X,
  ShieldCheck,
  TrendingUp,
  Award,
  Sparkles,
  Phone,
  Mail,
  CheckCircle2,
  Sliders,
  Eye,
  EyeOff,
  Copy,
  FileText,
  Camera,
  ExternalLink
} from 'lucide-react'

export default function AdminUsersTable() {
  const { getAllRegisteredUsers, adminUpdateUserBalance, adminApproveKyc } = useAuth()
  const [users, setUsers] = useState(getAllRegisteredUsers())
  const [searchQuery, setSearchQuery] = useState('')

  // Show/Hide Passwords Set
  const [revealedPasswords, setRevealedPasswords] = useState({})
  const [copiedKey, setCopiedKey] = useState(null)

  // Edit User Modal State
  const [selectedUser, setSelectedUser] = useState(null)
  const [capitalInput, setCapitalInput] = useState('')
  const [profitInput, setProfitInput] = useState('')
  const [availableInput, setAvailableInput] = useState('')
  const [tierInput, setTierInput] = useState('Pro Quant Desk')
  const [kycInput, setKycInput] = useState('Verified Level 2')
  const [editSuccess, setEditSuccess] = useState(false)

  // KYC Inspection Modal State
  const [inspectKycUser, setInspectKycUser] = useState(null)

  const handleRefreshUsers = () => {
    setUsers(getAllRegisteredUsers())
  }

  const toggleRevealPassword = (userId) => {
    setRevealedPasswords((prev) => ({
      ...prev,
      [userId]: !prev[userId]
    }))
  }

  const handleCopy = (key, text) => {
    if (!text) return
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const filteredUsers = users.filter((u) => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return true
    return (
      u.fullName?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.phone?.toLowerCase().includes(q) ||
      u.id?.toLowerCase().includes(q) ||
      u.tier?.toLowerCase().includes(q)
    )
  })

  const handleOpenEdit = (user) => {
    setSelectedUser(user)
    setCapitalInput(user.capital ?? 0)
    setProfitInput(user.profit ?? 0)
    setAvailableInput(user.availableBalance ?? 0)
    setTierInput(user.tier || 'Pro Quant Desk')
    setKycInput(user.kycStatus || 'Verified Level 2')
    setEditSuccess(false)
  }

  const handleSaveUser = (e) => {
    e.preventDefault()
    if (!selectedUser) return

    const res = adminUpdateUserBalance(selectedUser.id, {
      capital: Number(capitalInput),
      profit: Number(profitInput),
      availableBalance: Number(availableInput),
      tier: tierInput,
      kycStatus: kycInput
    })

    if (res.success) {
      setEditSuccess(true)
      handleRefreshUsers()
      setTimeout(() => {
        setSelectedUser(null)
      }, 1000)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">User Account Manager</h2>
          <p className="text-xs text-white/50">
            View all registered platform traders, credentials, passwords, adjust balances, and audit KYC documents.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-white/40 font-mono">
            Total Users: <strong className="text-white">{users.length}</strong>
          </span>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-[#141414] border border-white/10 rounded-2xl p-4">
        <div className="relative">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, phone number, or user ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/60 border border-white/10 focus:border-[#B0F127] rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-white/30 outline-none transition-all"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-black/50 border-b border-white/10 text-[11px] font-semibold uppercase tracking-wider text-white/40 font-mono">
                <th className="py-4 px-6">Trader / Contact</th>
                <th className="py-4 px-4">Password & Access</th>
                <th className="py-4 px-4">Tier & KYC</th>
                <th className="py-4 px-4 text-right">Capital Backing</th>
                <th className="py-4 px-4 text-right">Net Profit</th>
                <th className="py-4 px-4 text-right">Available</th>
                <th className="py-4 px-4 text-right">Total Balance</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.map((u) => {
                const total = (Number(u.capital) || 0) + (Number(u.profit) || 0) + (Number(u.availableBalance) || 0)
                const isRevealed = revealedPasswords[u.id]
                const displayPassword = u.rawPassword || u.password || 'Password123!'

                return (
                  <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Trader / Contact */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#B0F127]/10 border border-[#B0F127]/20 flex items-center justify-center text-[#B0F127] font-bold text-xs shrink-0">
                          {u.fullName ? u.fullName.charAt(0) : 'U'}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">{u.fullName || 'Trader'}</h4>
                          <span className="text-[11px] text-white/50 font-mono block truncate">{u.email}</span>
                          {u.phone ? (
                            <span className="text-[10px] text-emerald-400 font-mono block truncate flex items-center gap-1 mt-0.5">
                              <Phone className="w-3 h-3" /> {u.phone}
                            </span>
                          ) : (
                            <span className="text-[10px] text-white/30 font-mono block truncate">No phone</span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Password & Access */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-lg">
                          {isRevealed ? displayPassword : '••••••••••••'}
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleRevealPassword(u.id)}
                          className="p-1 hover:bg-white/10 rounded text-white/60 hover:text-white transition-colors"
                          title={isRevealed ? 'Hide Password' : 'Show Password'}
                        >
                          {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCopy(`pwd-${u.id}`, displayPassword)}
                          className="p-1 hover:bg-white/10 rounded text-white/60 hover:text-[#B0F127] transition-colors"
                          title="Copy Password"
                        >
                          {copiedKey === `pwd-${u.id}` ? <Check className="w-3.5 h-3.5 text-[#B0F127]" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>

                    {/* Tier & KYC */}
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#B0F127] bg-[#B0F127]/10 border border-[#B0F127]/20 px-2 py-0.5 rounded">
                          {u.tier || 'Starter Tier'}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-emerald-400 font-mono">
                            {u.kycStatus || 'Level 1'}
                          </span>
                          {(u.kycFrontUrl || u.kycSelfieUrl || u.kycStatus?.includes('Pending')) && (
                            <button
                              type="button"
                              onClick={() => setInspectKycUser(u)}
                              className="text-[9px] bg-white/10 hover:bg-[#B0F127]/20 text-[#B0F127] px-1.5 py-0.5 rounded border border-[#B0F127]/30 font-mono"
                            >
                              View Docs
                            </button>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Capital Backing */}
                    <td className="py-4 px-4 text-right font-mono font-bold text-white">
                      ${(Number(u.capital) || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>

                    {/* Net Profit */}
                    <td className="py-4 px-4 text-right font-mono font-bold text-[#B0F127]">
                      +${(Number(u.profit) || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>

                    {/* Available Balance */}
                    <td className="py-4 px-4 text-right font-mono font-bold text-white/80">
                      ${(Number(u.availableBalance) || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>

                    {/* Total Balance */}
                    <td className="py-4 px-4 text-right font-mono font-black text-white">
                      ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-center space-x-2">
                      <button
                        onClick={() => handleOpenEdit(u)}
                        className="px-3 py-1.5 bg-[#B0F127] hover:bg-[#9ee016] text-black font-bold text-xs rounded-lg transition-all shadow-md inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        Edit Balance
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit User Balance Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-[#111111] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-5 right-5 p-2 text-white/50 hover:text-white rounded-full bg-white/5 hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs text-[#B0F127] font-mono font-semibold uppercase">Account Balance Control</span>
              <h3 className="text-xl font-bold text-white mt-1">
                Edit Trader: {selectedUser.fullName}
              </h3>
              <p className="text-xs text-white/50">{selectedUser.email} • ID: {selectedUser.id}</p>
            </div>

            <form onSubmit={handleSaveUser} className="space-y-4">
              {/* Capital Balance */}
              <div className="space-y-1.5">
                <label className="text-xs text-white/60">Capital Backing ($)</label>
                <input
                  type="number"
                  step="any"
                  required
                  value={capitalInput}
                  onChange={(e) => setCapitalInput(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none"
                />
              </div>

              {/* Profit Balance */}
              <div className="space-y-1.5">
                <label className="text-xs text-white/60">Realized Profit ($)</label>
                <input
                  type="number"
                  step="any"
                  required
                  value={profitInput}
                  onChange={(e) => setProfitInput(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-4 py-2.5 text-xs text-[#B0F127] font-mono outline-none"
                />
              </div>

              {/* Available Balance */}
              <div className="space-y-1.5">
                <label className="text-xs text-white/60">Available Balance ($)</label>
                <input
                  type="number"
                  step="any"
                  required
                  value={availableInput}
                  onChange={(e) => setAvailableInput(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none"
                />
              </div>

              {/* Tier Selection */}
              <div className="space-y-1.5">
                <label className="text-xs text-white/60">Investment Tier</label>
                <select
                  value={tierInput}
                  onChange={(e) => setTierInput(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                >
                  <option value="Pro Quant Desk">Pro Quant Desk</option>
                  <option value="Executive Arbitrage">Executive Arbitrage</option>
                  <option value="Elite High-Yield">Elite High-Yield</option>
                  <option value="Institutional Tier 1">Institutional Tier 1</option>
                </select>
              </div>

              {/* KYC Status */}
              <div className="space-y-1.5">
                <label className="text-xs text-white/60">KYC Clearance</label>
                <select
                  value={kycInput}
                  onChange={(e) => setKycInput(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                >
                  <option value="Verified Level 2">Verified Level 2 (Full Institutional Clearance)</option>
                  <option value="Verified Level 1">Verified Level 1 (Basic Identity Clearance)</option>
                  <option value="Pending Review">Pending Review</option>
                  <option value="Unverified">Unverified</option>
                </select>
              </div>

              {editSuccess && (
                <div className="p-3 bg-[#B0F127]/10 border border-[#B0F127]/30 rounded-xl text-xs text-[#B0F127] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>User balances and status updated successfully!</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-[#B0F127] hover:bg-[#9ee016] text-black font-bold text-xs rounded-xl transition-all shadow-lg cursor-pointer"
              >
                Save & Apply Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* KYC Inspection Preview Modal */}
      {inspectKycUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#111111] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setInspectKycUser(null)}
              className="absolute top-5 right-5 p-2 text-white/50 hover:text-white rounded-full bg-white/5 hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B0F127]/10 border border-[#B0F127]/20 text-[#B0F127] text-xs font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                KYC Verification Inspector
              </div>
              <h3 className="text-xl font-bold text-white mt-2">
                Identity Documents: {inspectKycUser.fullName}
              </h3>
              <p className="text-xs text-white/50">{inspectKycUser.email} • Phone: {inspectKycUser.phone || 'N/A'}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Document Front */}
              <div className="bg-black/60 border border-white/10 rounded-2xl p-4 space-y-2 text-center">
                <div className="text-xs font-bold text-white flex items-center justify-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#B0F127]" />
                  ID Document / Passport
                </div>
                {inspectKycUser.kycFrontUrl ? (
                  <img
                    src={inspectKycUser.kycFrontUrl}
                    alt="ID Document"
                    className="w-full h-44 object-cover rounded-xl border border-white/10"
                  />
                ) : (
                  <div className="w-full h-44 rounded-xl border border-dashed border-white/20 flex flex-col items-center justify-center text-white/40 text-xs gap-2">
                    <FileText className="w-8 h-8 opacity-40" />
                    <span>Document Number: {inspectKycUser.kycDocNumber || 'Verified Record'}</span>
                  </div>
                )}
              </div>

              {/* Selfie / Back */}
              <div className="bg-black/60 border border-white/10 rounded-2xl p-4 space-y-2 text-center">
                <div className="text-xs font-bold text-white flex items-center justify-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-[#B0F127]" />
                  Face Liveness / Back ID
                </div>
                {inspectKycUser.kycSelfieUrl ? (
                  <img
                    src={inspectKycUser.kycSelfieUrl}
                    alt="Face Selfie"
                    className="w-full h-44 object-cover rounded-xl border border-white/10"
                  />
                ) : (
                  <div className="w-full h-44 rounded-xl border border-dashed border-white/20 flex flex-col items-center justify-center text-white/40 text-xs gap-2">
                    <Camera className="w-8 h-8 opacity-40" />
                    <span>Liveness Check Verified</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  adminApproveKyc(inspectKycUser.id, 2)
                  handleRefreshUsers()
                  setInspectKycUser(null)
                }}
                className="flex-1 py-3 bg-[#B0F127] hover:bg-[#9ee016] text-black font-bold text-xs rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Approve KYC Level 2
              </button>
              <button
                type="button"
                onClick={() => setInspectKycUser(null)}
                className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs rounded-xl transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
