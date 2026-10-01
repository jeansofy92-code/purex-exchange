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
  ExternalLink,
  UserPlus,
  Trash2,
  Lock,
  PlusCircle,
  Zap,
  Briefcase
} from 'lucide-react'

export default function AdminUsersTable() {
  const {
    getAllRegisteredUsers,
    adminCreateUser,
    adminDeleteUser,
    adminUpdateUserDetails,
    adminUpdateUserBalance,
    adminApproveKyc,
    adminCreditYield,
    adminCreateInvestment
  } = useAuth()

  const [users, setUsers] = useState(getAllRegisteredUsers())
  const [searchQuery, setSearchQuery] = useState('')

  // Show/Hide Passwords Set
  const [revealedPasswords, setRevealedPasswords] = useState({})
  const [copiedKey, setCopiedKey] = useState(null)

  // Modals state
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
  const [newUserForm, setNewUserForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: 'Password123!',
    role: 'user',
    capital: 10000,
    profit: 2500,
    availableBalance: 5000,
    tier: 'Pro Quant Desk',
    kycStatus: 'Verified Level 2'
  })

  // Edit User Modal State
  const [selectedUser, setSelectedUser] = useState(null)
  const [editFullName, setEditFullName] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [editPassword, setEditPassword] = useState('')
  const [editRole, setEditRole] = useState('user')
  const [capitalInput, setCapitalInput] = useState('')
  const [profitInput, setProfitInput] = useState('')
  const [availableInput, setAvailableInput] = useState('')
  const [tierInput, setTierInput] = useState('Pro Quant Desk')
  const [kycInput, setKycInput] = useState('Verified Level 2')
  const [editSuccess, setEditSuccess] = useState(false)

  // Credit Yield Modal State
  const [yieldUser, setYieldUser] = useState(null)
  const [yieldAmount, setYieldAmount] = useState('500')
  const [yieldNote, setYieldNote] = useState('Daily Arbitrage Yield')
  const [yieldSuccess, setYieldSuccess] = useState(false)

  // Create Investment Modal State
  const [investUser, setInvestUser] = useState(null)
  const [investPackage, setInvestPackage] = useState('Institutional Growth')
  const [investAmount, setInvestAmount] = useState('5000')
  const [investRoi, setInvestRoi] = useState('2.8')
  const [investDuration, setInvestDuration] = useState('30')
  const [investSuccess, setInvestSuccess] = useState(false)

  // Delete User Confirm State
  const [deleteConfirmUser, setDeleteConfirmUser] = useState(null)

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
      u.tier?.toLowerCase().includes(q) ||
      u.role?.toLowerCase().includes(q) ||
      u.kycStatus?.toLowerCase().includes(q)
    )
  })

  // Open Edit User
  const handleOpenEdit = (user) => {
    setSelectedUser(user)
    setEditFullName(user.fullName || '')
    setEditEmail(user.email || '')
    setEditPhone(user.phone || '')
    setEditPassword(user.rawPassword || user.password || '')
    setEditRole(user.role || 'user')
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

    const res = adminUpdateUserDetails(selectedUser.id, {
      fullName: editFullName,
      email: editEmail,
      phone: editPhone,
      password: editPassword,
      role: editRole,
      capital: Number(capitalInput),
      profit: Number(profitInput),
      availableBalance: Number(availableInput),
      totalBalance: Number(capitalInput) + Number(profitInput) + Number(availableInput),
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

  // Handle Add New User
  const handleCreateNewUser = (e) => {
    e.preventDefault()
    const res = adminCreateUser(newUserForm)
    if (res.success) {
      handleRefreshUsers()
      setIsAddUserModalOpen(false)
      setNewUserForm({
        fullName: '',
        email: '',
        phone: '',
        password: 'Password123!',
        role: 'user',
        capital: 10000,
        profit: 2500,
        availableBalance: 5000,
        tier: 'Pro Quant Desk',
        kycStatus: 'Verified Level 2'
      })
    } else {
      alert(res.error || 'Failed to create user')
    }
  }

  // Handle Delete User
  const handleDeleteUser = () => {
    if (!deleteConfirmUser) return
    adminDeleteUser(deleteConfirmUser.id)
    setDeleteConfirmUser(null)
    handleRefreshUsers()
  }

  // Handle Credit Yield
  const handleCreditYieldSubmit = (e) => {
    e.preventDefault()
    if (!yieldUser) return
    const res = adminCreditYield(yieldUser.id, Number(yieldAmount), yieldNote)
    if (res.success) {
      setYieldSuccess(true)
      handleRefreshUsers()
      setTimeout(() => {
        setYieldUser(null)
        setYieldSuccess(false)
      }, 1200)
    }
  }

  // Handle Create Investment
  const handleCreateInvestmentSubmit = (e) => {
    e.preventDefault()
    if (!investUser) return
    const res = adminCreateInvestment(investUser.id, {
      packageName: investPackage,
      amount: Number(investAmount),
      dailyRoi: Number(investRoi),
      durationDays: Number(investDuration)
    })
    if (res.success) {
      setInvestSuccess(true)
      handleRefreshUsers()
      setTimeout(() => {
        setInvestUser(null)
        setInvestSuccess(false)
      }, 1200)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">User Account Manager</h2>
          <p className="text-xs text-white/50">
            Full administrative control over all trader accounts, balances, passwords, yields, investments, and KYC verification.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddUserModalOpen(true)}
            className="px-4 py-2 bg-[#B0F127] hover:bg-[#9ee016] text-black font-bold text-xs rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            Provision New Trader Account
          </button>
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
            placeholder="Search by name, email, phone number, role, or KYC status..."
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
                <th className="py-4 px-6 text-center">Admin Actions</th>
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
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-xs font-bold text-white truncate">{u.fullName || 'Trader'}</h4>
                            {u.role === 'admin' && (
                              <span className="text-[9px] bg-red-500/20 text-red-400 border border-red-500/30 px-1.5 py-0.2 rounded font-mono">ADMIN</span>
                            )}
                          </div>
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
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(u)}
                          className="px-2.5 py-1.5 bg-[#B0F127] hover:bg-[#9ee016] text-black font-bold text-xs rounded-lg transition-all shadow-md inline-flex items-center gap-1 cursor-pointer"
                          title="Edit User & Balances"
                        >
                          <Edit className="w-3 h-3" />
                          Edit
                        </button>
                        <button
                          onClick={() => setYieldUser(u)}
                          className="px-2 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 font-bold text-xs rounded-lg transition-all inline-flex items-center gap-1 cursor-pointer"
                          title="Credit Direct Yield / Bonus"
                        >
                          <TrendingUp className="w-3 h-3" />
                          Yield
                        </button>
                        <button
                          onClick={() => setInvestUser(u)}
                          className="px-2 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30 font-bold text-xs rounded-lg transition-all inline-flex items-center gap-1 cursor-pointer"
                          title="Assign Investment Cluster"
                        >
                          <Briefcase className="w-3 h-3" />
                          Plan
                        </button>
                        <button
                          onClick={() => setDeleteConfirmUser(u)}
                          className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg transition-all cursor-pointer"
                          title="Delete User"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 1. Provision New Trader Account Modal */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-[#111111] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddUserModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-white/50 hover:text-white rounded-full bg-white/5 hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs text-[#B0F127] font-mono font-semibold uppercase">Executive Provisioning</span>
              <h3 className="text-xl font-bold text-white mt-1">
                Provision New Trader Account
              </h3>
              <p className="text-xs text-white/50">Instantly create and seed a verified platform trader account.</p>
            </div>

            <form onSubmit={handleCreateNewUser} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-white/60">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Trader Name"
                    value={newUserForm.fullName}
                    onChange={(e) => setNewUserForm({ ...newUserForm, fullName: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-white/60">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="trader@domain.com"
                    value={newUserForm.email}
                    onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-white/60">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+1 555 0199"
                    value={newUserForm.phone}
                    onChange={(e) => setNewUserForm({ ...newUserForm, phone: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-white/60">Password</label>
                  <input
                    type="text"
                    required
                    value={newUserForm.password}
                    onChange={(e) => setNewUserForm({ ...newUserForm, password: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-3 py-2 text-xs text-white font-mono outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-white/60">Capital ($)</label>
                  <input
                    type="number"
                    value={newUserForm.capital}
                    onChange={(e) => setNewUserForm({ ...newUserForm, capital: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-3 py-2 text-xs text-white font-mono outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-white/60">Profit ($)</label>
                  <input
                    type="number"
                    value={newUserForm.profit}
                    onChange={(e) => setNewUserForm({ ...newUserForm, profit: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-3 py-2 text-xs text-[#B0F127] font-mono outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-white/60">Available ($)</label>
                  <input
                    type="number"
                    value={newUserForm.availableBalance}
                    onChange={(e) => setNewUserForm({ ...newUserForm, availableBalance: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-3 py-2 text-xs text-white font-mono outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-white/60">Desk Tier</label>
                  <select
                    value={newUserForm.tier}
                    onChange={(e) => setNewUserForm({ ...newUserForm, tier: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-3 py-2 text-xs text-white outline-none"
                  >
                    <option value="Pro Quant Desk">Pro Quant Desk</option>
                    <option value="Institutional Growth">Institutional Growth</option>
                    <option value="Purex Prime VIP">Purex Prime VIP</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-white/60">KYC Clearance</label>
                  <select
                    value={newUserForm.kycStatus}
                    onChange={(e) => setNewUserForm({ ...newUserForm, kycStatus: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-3 py-2 text-xs text-white outline-none"
                  >
                    <option value="Verified Level 2">Verified Level 2 (Full)</option>
                    <option value="Verified Level 1">Verified Level 1</option>
                    <option value="Unverified">Unverified</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#B0F127] hover:bg-[#9ee016] text-black font-bold text-xs rounded-xl transition-all shadow-lg cursor-pointer"
              >
                Create & Activate Account
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. Edit User Details & Balance Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-[#111111] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-5 right-5 p-2 text-white/50 hover:text-white rounded-full bg-white/5 hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs text-[#B0F127] font-mono font-semibold uppercase">Account Full Control</span>
              <h3 className="text-xl font-bold text-white mt-1">
                Edit Trader: {selectedUser.fullName}
              </h3>
              <p className="text-xs text-white/50">{selectedUser.email} • ID: {selectedUser.id}</p>
            </div>

            <form onSubmit={handleSaveUser} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-white/60">Full Name</label>
                  <input
                    type="text"
                    required
                    value={editFullName}
                    onChange={(e) => setEditFullName(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-white/60">Phone</label>
                  <input
                    type="text"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-white/60">Email</label>
                  <input
                    type="email"
                    required
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-white/60">Password (Reset/Change)</label>
                  <input
                    type="text"
                    required
                    value={editPassword}
                    onChange={(e) => setEditPassword(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-3 py-2 text-xs text-white font-mono outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div className="space-y-1">
                  <label className="text-xs text-white/60">Capital ($)</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={capitalInput}
                    onChange={(e) => setCapitalInput(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-3 py-2 text-xs text-white font-mono outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-white/60">Profit ($)</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={profitInput}
                    onChange={(e) => setProfitInput(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-3 py-2 text-xs text-[#B0F127] font-mono outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-white/60">Available ($)</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={availableInput}
                    onChange={(e) => setAvailableInput(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-3 py-2 text-xs text-white font-mono outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-white/60">Investment Tier</label>
                  <select
                    value={tierInput}
                    onChange={(e) => setTierInput(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-3 py-2 text-xs text-white outline-none"
                  >
                    <option value="Pro Quant Desk">Pro Quant Desk</option>
                    <option value="Institutional Growth">Institutional Growth</option>
                    <option value="Purex Prime VIP">Purex Prime VIP</option>
                    <option value="Executive Board">Executive Board</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-white/60">KYC Clearance</label>
                  <select
                    value={kycInput}
                    onChange={(e) => setKycInput(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-3 py-2 text-xs text-white outline-none"
                  >
                    <option value="Verified Level 2">Verified Level 2 (Full)</option>
                    <option value="Verified Level 1">Verified Level 1</option>
                    <option value="Pending Review">Pending Review</option>
                    <option value="Unverified">Unverified</option>
                  </select>
                </div>
              </div>

              {editSuccess && (
                <div className="p-3 bg-[#B0F127]/10 border border-[#B0F127]/30 rounded-xl text-xs text-[#B0F127] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>User account and balances updated successfully!</span>
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

      {/* 3. Direct Profit Yield Credit Modal */}
      {yieldUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md bg-[#111111] border border-white/15 rounded-3xl p-6 shadow-2xl space-y-5">
            <button
              onClick={() => setYieldUser(null)}
              className="absolute top-5 right-5 p-2 text-white/50 hover:text-white rounded-full bg-white/5 hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs text-emerald-400 font-mono font-semibold uppercase">Instant Yield Dispatch</span>
              <h3 className="text-xl font-bold text-white mt-1">
                Credit Yield to {yieldUser.fullName}
              </h3>
              <p className="text-xs text-white/50">Dispatches profit directly to trader's balance with an instant ledger entry.</p>
            </div>

            <form onSubmit={handleCreditYieldSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-white/60">Profit Amount ($)</label>
                <input
                  type="number"
                  step="any"
                  required
                  value={yieldAmount}
                  onChange={(e) => setYieldAmount(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 focus:border-emerald-400 rounded-xl px-4 py-2.5 text-xs text-emerald-400 font-mono font-bold outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-white/60">Transaction Title / Reason</label>
                <input
                  type="text"
                  required
                  value={yieldNote}
                  onChange={(e) => setYieldNote(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                />
              </div>

              {yieldSuccess && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Yield credited successfully to account!</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl transition-all shadow-lg cursor-pointer"
              >
                Credit ${Number(yieldAmount).toLocaleString()} Profit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 4. Assign Investment Package Modal */}
      {investUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md bg-[#111111] border border-white/15 rounded-3xl p-6 shadow-2xl space-y-5">
            <button
              onClick={() => setInvestUser(null)}
              className="absolute top-5 right-5 p-2 text-white/50 hover:text-white rounded-full bg-white/5 hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs text-cyan-400 font-mono font-semibold uppercase">Cluster Provisioning</span>
              <h3 className="text-xl font-bold text-white mt-1">
                Assign Plan to {investUser.fullName}
              </h3>
              <p className="text-xs text-white/50">Creates an active bot/arbitrage investment desk on behalf of trader.</p>
            </div>

            <form onSubmit={handleCreateInvestmentSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-white/60">Plan Name</label>
                <input
                  type="text"
                  required
                  value={investPackage}
                  onChange={(e) => setInvestPackage(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 focus:border-cyan-400 rounded-xl px-4 py-2 text-xs text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="text-xs text-white/60">Amount ($)</label>
                  <input
                    type="number"
                    required
                    value={investAmount}
                    onChange={(e) => setInvestAmount(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs text-white font-mono outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-white/60">Daily ROI %</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={investRoi}
                    onChange={(e) => setInvestRoi(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs text-cyan-400 font-mono outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-white/60">Days</label>
                  <input
                    type="number"
                    required
                    value={investDuration}
                    onChange={(e) => setInvestDuration(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs text-white font-mono outline-none"
                  />
                </div>
              </div>

              {investSuccess && (
                <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-xs text-cyan-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Investment plan assigned successfully!</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-xl transition-all shadow-lg cursor-pointer"
              >
                Provision Investment Cluster
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 5. Delete User Confirmation Modal */}
      {deleteConfirmUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-sm bg-[#111111] border border-red-500/30 rounded-3xl p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Delete User Account?</h3>
            <p className="text-xs text-white/60">
              Are you sure you want to delete <strong className="text-white">{deleteConfirmUser.fullName}</strong> ({deleteConfirmUser.email})? This action cannot be undone.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleDeleteUser}
                className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteConfirmUser(null)}
                className="flex-1 py-2.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. KYC Inspection Preview Modal */}
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
