import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageSquare,
  TrendingUp,
  ArrowDownLeft,
  ArrowUpRight,
  Users,
  ShieldCheck,
  Lock,
  PlusCircle,
  Play,
  CheckCircle2,
  XCircle,
  DollarSign,
  AlertCircle,
  LogOut,
  Sparkles,
} from 'lucide-react'

import { useSupportChat } from '../hooks/useSupportChat'
import { useModeratorData } from '../hooks/useModeratorData'
import AdminSupportDesk from '../components/support/AdminSupportDesk'
import { investmentPlans } from '../data/investmentPlans'

function Admin() {
  // Authentication PIN state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pinInput, setPinInput] = useState('')
  const [pinError, setPinError] = useState(false)

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState('chat') // 'chat' | 'investments' | 'transactions' | 'users'

  // Modal for creating new investment
  const [isNewInvModalOpen, setIsNewInvModalOpen] = useState(false)
  const [newInvForm, setNewInvForm] = useState({
    userEmail: '',
    planId: 'growth',
    depositAmount: 1000,
    durationDays: 14,
    dailyRoi: 2.4,
  })

  // Modal for editing user balance
  const [editingUser, setEditingUser] = useState(null)
  const [balanceForm, setBalanceForm] = useState({
    available: 0,
    invested: 0,
  })

  // Support Chat hook
  const {
    conversations,
    adminActiveConvId,
    setAdminActiveConvId,
    sendAdminMessage,
    setTicketStatus,
  } = useSupportChat()

  // Moderator Data hook
  const {
    users,
    investments,
    deposits,
    withdrawals,
    toast,
    approveDeposit,
    rejectDeposit,
    approveWithdrawal,
    rejectWithdrawal,
    createInvestment,
    creditYield,
    closeInvestment,
    updateUserBalance,
  } = useModeratorData()

  // Authenticate Admin
  const handleLogin = (e) => {
    e?.preventDefault()
    // Accept master passkey or instant developer access
    if (pinInput === 'purex-admin-2026' || pinInput === 'admin' || pinInput === '1234') {
      setIsAuthenticated(true)
      setPinError(false)
    } else {
      setPinError(true)
    }
  }

  const handleQuickUnlock = () => {
    setIsAuthenticated(true)
  }

  // Handle create investment submit
  const handleCreateInvestmentSubmit = (e) => {
    e.preventDefault()
    const selectedPlan = investmentPlans.find((p) => p.id === newInvForm.planId) || investmentPlans[1]
    createInvestment({
      userEmail: newInvForm.userEmail,
      planId: newInvForm.planId,
      planName: selectedPlan.name,
      depositAmount: newInvForm.depositAmount,
      durationDays: selectedPlan.durationDays,
      dailyRoi: (selectedPlan.dailyMin + selectedPlan.dailyMax) / 2,
    })
    setIsNewInvModalOpen(false)
  }

  // Handle balance edit submit
  const handleBalanceEditSubmit = (e) => {
    e.preventDefault()
    if (!editingUser) return
    updateUserBalance(editingUser.id, balanceForm.available, balanceForm.invested)
    setEditingUser(null)
  }

  const pendingTicketsCount = conversations.filter((c) => c.status === 'pending_admin').length
  const pendingDepositsCount = deposits.filter((d) => d.status === 'pending_approval').length
  const pendingWithdrawalsCount = withdrawals.filter((w) => w.status === 'pending').length
  const totalInvestedCapital = investments
    .filter((i) => i.status === 'active')
    .reduce((sum, i) => sum + i.depositAmount, 0)

  // ==================== 1. PIN GATE / LOGIN SCREEN ====================
  if (!isAuthenticated) {
    return (
      <main className="home-page-shell min-h-screen flex items-center justify-center p-4 text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-md rounded-3xl border border-white/15 bg-[#11142c]/95 p-8 backdrop-blur-2xl shadow-[0_24px_70px_rgba(0,0,0,0.9)] text-center space-y-6"
        >
          <div className="mx-auto h-16 w-16 rounded-3xl bg-[#ff7a00]/15 border-2 border-[#ff7a00] flex items-center justify-center text-[#ff7a00] shadow-[0_0_30px_rgba(255,122,0,0.4)]">
            <Lock size={30} />
          </div>

          <div>
            <h1 className="text-2xl font-black text-white">Moderator & Admin Portal</h1>
            <p className="text-xs text-slate-400 mt-1">
              Restricted executive console for support chat & investment management.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter Master Security Key..."
                className="w-full rounded-2xl border border-white/15 bg-[#0c0e22] px-4 py-3.5 text-center text-sm font-mono text-white placeholder-slate-500 focus:border-[#ff7a00] focus:outline-none"
              />
            </div>

            {pinError && (
              <div className="text-xs text-rose-400 font-bold flex items-center justify-center gap-1.5">
                <AlertCircle size={14} />
                <span>Invalid Security Key. Default: purex-admin-2026</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#ff7a00] to-[#ff9500] text-black font-extrabold text-sm uppercase tracking-wider hover:brightness-110 shadow-[0_0_20px_rgba(255,122,0,0.4)] transition-all cursor-pointer"
            >
              Authenticate & Enter
            </button>

            <button
              type="button"
              onClick={handleQuickUnlock}
              className="w-full py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs font-semibold text-slate-300 hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles size={14} className="text-[#ff7a00]" />
              <span>Instant Quick Moderator Unlock (One-Click)</span>
            </button>
          </form>
        </motion.div>
      </main>
    )
  }

  // ==================== 2. AUTHENTICATED ADMIN CONSOLE ====================
  return (
    <main className="home-page-shell min-h-screen text-white pb-20">
      {/* Top Header Bar */}
      <header className="border-b border-white/10 bg-[#0c0e22]/95 backdrop-blur-xl px-4 py-4 sm:px-8">
        <div className="mx-auto max-w-[1500px] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-[#ff7a00]/15 border border-[#ff7a00] flex items-center justify-center text-[#ff7a00] shadow-[0_0_15px_rgba(255,122,0,0.3)]">
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black text-white">PUREX Moderator Control Hub</h1>
                <span className="text-[0.65rem] bg-[#ff7a00] text-black font-black px-2 py-0.2 rounded-full uppercase">
                  Live Operations
                </span>
              </div>
              <p className="text-[0.7rem] text-slate-400">
                Real-Time User Support Chat, Investment Allocation & Fund Settlements
              </p>
            </div>
          </div>

          {/* Right Header Status & Logout */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-4 text-xs font-mono">
              <div className="text-slate-400">
                Active Yield: <strong className="text-emerald-400">${totalInvestedCapital.toLocaleString()}</strong>
              </div>
              <div className="h-4 w-[1px] bg-white/10" />
              <div className="text-slate-400">
                Users: <strong className="text-white">{users.length}</strong>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsAuthenticated(false)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-xs font-bold text-rose-400 hover:bg-rose-500/20 transition-all cursor-pointer"
            >
              <LogOut size={14} />
              <span>Lock Console</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Navigation Tabs */}
      <div className="border-b border-white/10 bg-[#0e1124]">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-8">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-3">
            {[
              {
                id: 'chat',
                label: 'Support Chat Desk',
                icon: MessageSquare,
                badge: pendingTicketsCount > 0 ? `${pendingTicketsCount} New` : null,
                badgeColor: 'bg-rose-500 text-white',
              },
              {
                id: 'investments',
                label: 'User Investments',
                icon: TrendingUp,
                badge: `${investments.filter((i) => i.status === 'active').length} Active`,
                badgeColor: 'bg-emerald-500 text-black',
              },
              {
                id: 'transactions',
                label: 'Deposits & Withdrawals',
                icon: DollarSign,
                badge: pendingDepositsCount + pendingWithdrawalsCount > 0 ? `${pendingDepositsCount + pendingWithdrawalsCount} Pending` : null,
                badgeColor: 'bg-[#ff7a00] text-black',
              },
              {
                id: 'users',
                label: 'User Accounts & Balances',
                icon: Users,
                badge: `${users.length} Users`,
                badgeColor: 'bg-white/10 text-white',
              },
            ].map((tab) => {
              const Icon = tab.icon
              const isSelected = activeTab === tab.id

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#ff7a00] to-[#ff9500] text-black shadow-[0_0_20px_rgba(255,122,0,0.35)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[0.65rem] font-black ${tab.badgeColor || 'bg-black text-white'}`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Tab Workspace */}
      <div className="mx-auto max-w-[1500px] px-4 sm:px-8 py-8">
        {/* ==================== TAB 1: SUPPORT CHAT DESK ==================== */}
        {activeTab === 'chat' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-white">Live Client Support Queue</h2>
                <p className="text-xs text-[#8d9691]">
                  Chat live with users, respond as Support Specialist, and resolve pending issues in real time.
                </p>
              </div>
            </div>

            <AdminSupportDesk
              conversations={conversations}
              activeConvId={adminActiveConvId}
              onSelectConv={(id) => setAdminActiveConvId(id)}
              onSendAdminReply={sendAdminMessage}
              onSetStatus={setTicketStatus}
            />
          </div>
        )}

        {/* ==================== TAB 2: USER INVESTMENTS ==================== */}
        {activeTab === 'investments' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white">User Investment Portfolios</h2>
                <p className="text-xs text-[#8d9691]">
                  Manage active contracts, manually credit daily ROI payouts, or create custom investment allocations.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsNewInvModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#58e65b] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#48db50] shadow-[0_0_20px_rgba(88,230,91,0.35)] transition-all hover:scale-105"
              >
                <PlusCircle size={16} />
                <span>Assign New Investment Plan</span>
              </button>
            </div>

            {/* Investments Table */}
            <div className="rounded-3xl border border-white/15 bg-[#080d0e]/95 backdrop-blur-xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-white/10 bg-[#060a0b] text-[0.68rem] uppercase font-bold text-[#8d9691]">
                      <th className="py-4 px-5">User</th>
                      <th className="py-4 px-4">Plan Name</th>
                      <th className="py-4 px-4">Deposit Amount</th>
                      <th className="py-4 px-4">Daily ROI</th>
                      <th className="py-4 px-4">Daily Profit</th>
                      <th className="py-4 px-4">Total Earned</th>
                      <th className="py-4 px-4">Progress / Term</th>
                      <th className="py-4 px-4">Status</th>
                      <th className="py-4 px-5 text-right">Moderator Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-white/5 font-medium">
                    {investments.map((inv) => (
                      <tr key={inv.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-5">
                          <div className="font-bold text-white font-sans">{inv.userName}</div>
                          <div className="text-[0.65rem] text-[#8d9691]">{inv.userEmail}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-[#dfe9e2] font-sans">{inv.planName}</span>
                          <div className="text-[0.65rem] text-[#8d9691]">ID: {inv.id}</div>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-white">
                          ${inv.depositAmount.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4 text-[#58e65b] font-bold">{inv.dailyRoi}</td>
                        <td className="py-3.5 px-4 text-white">+${inv.dailyProfit.toFixed(2)}/day</td>
                        <td className="py-3.5 px-4 text-[#58e65b] font-bold">
                          +${inv.totalEarned.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-[#dfe9e2]">
                              {inv.daysElapsed}/{inv.durationDays} Days
                            </span>
                          </div>
                          <div className="h-1.5 w-24 bg-white/10 rounded-full overflow-hidden mt-1">
                            <div
                              className="h-full bg-[#58e65b] rounded-full"
                              style={{ width: `${Math.min(100, (inv.daysElapsed / inv.durationDays) * 100)}%` }}
                            />
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold border ${
                              inv.status === 'active'
                                ? 'bg-[#183a1d] text-[#58e65b] border-[#58e65b]/40'
                                : inv.status === 'matured'
                                ? 'bg-white/10 text-[#38bdf8] border-[#38bdf8]/30'
                                : 'bg-[#3a1818] text-[#ff6b6b] border-[#ff6b6b]/40'
                            }`}
                          >
                            {inv.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-right space-x-2">
                          {inv.status === 'active' && (
                            <>
                              <button
                                type="button"
                                onClick={() => creditYield(inv.id)}
                                className="px-2.5 py-1 rounded-lg border border-[#58e65b]/40 bg-[#183a1d] text-[0.68rem] font-bold text-[#58e65b] hover:bg-[#58e65b] hover:text-black transition-all inline-flex items-center gap-1"
                                title="Credit 1 Day of Yield Now"
                              >
                                <Play size={10} />
                                <span>Credit +${inv.dailyProfit.toFixed(2)}</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => closeInvestment(inv.id)}
                                className="px-2.5 py-1 rounded-lg border border-white/20 bg-white/5 text-[0.68rem] font-bold text-white hover:bg-white/15 transition-colors"
                              >
                                Mature & Return Capital
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 3: DEPOSITS & WITHDRAWALS ==================== */}
        {activeTab === 'transactions' && (
          <div className="space-y-8">
            {/* Deposits Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-white flex items-center gap-2">
                    <ArrowDownLeft size={20} className="text-[#58e65b]" />
                    <span>Pending & Recent Deposits</span>
                  </h2>
                  <p className="text-xs text-[#8d9691]">
                    Verify on-chain transaction hash and approve user wallet balance credits.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-white/15 bg-[#080d0e]/95 backdrop-blur-xl overflow-hidden shadow-2xl">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-white/10 bg-[#060a0b] text-[0.68rem] uppercase font-bold text-[#8d9691]">
                      <th className="py-4 px-5">User</th>
                      <th className="py-4 px-4">Amount</th>
                      <th className="py-4 px-4">Asset / Network</th>
                      <th className="py-4 px-4">Transaction Hash</th>
                      <th className="py-4 px-4">Created Date</th>
                      <th className="py-4 px-4">Status</th>
                      <th className="py-4 px-5 text-right">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-white/5 font-medium">
                    {deposits.map((dep) => (
                      <tr key={dep.id} className="hover:bg-white/[0.02]">
                        <td className="py-3.5 px-5">
                          <div className="font-bold text-white font-sans">{dep.userName}</div>
                          <div className="text-[0.65rem] text-[#8d9691]">{dep.userEmail}</div>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-white">
                          ${dep.amount.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4 text-[#dfe9e2]">{dep.coin}</td>
                        <td className="py-3.5 px-4 text-[#38bdf8] truncate max-w-[150px]">
                          {dep.txHash}
                        </td>
                        <td className="py-3.5 px-4 text-[#8d9691]">{dep.createdAt}</td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold border ${
                              dep.status === 'pending_approval'
                                ? 'bg-[#291f0d] text-yellow-400 border-yellow-500/40 animate-pulse'
                                : dep.status === 'approved'
                                ? 'bg-[#183a1d] text-[#58e65b] border-[#58e65b]/40'
                                : 'bg-[#3a1818] text-[#ff6b6b] border-[#ff6b6b]/40'
                            }`}
                          >
                            {dep.status === 'pending_approval' ? 'Pending Approval' : dep.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-right space-x-2">
                          {dep.status === 'pending_approval' && (
                            <>
                              <button
                                type="button"
                                onClick={() => approveDeposit(dep.id)}
                                className="px-3 py-1 rounded-lg bg-[#58e65b] text-black font-extrabold text-[0.7rem] hover:bg-[#48db50] transition-colors"
                              >
                                Approve & Credit
                              </button>
                              <button
                                type="button"
                                onClick={() => rejectDeposit(dep.id)}
                                className="px-3 py-1 rounded-lg border border-red-500/40 bg-red-950/40 text-[#ff6b6b] font-bold text-[0.7rem] hover:bg-red-900 transition-colors"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Withdrawals Section */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-white flex items-center gap-2">
                    <ArrowUpRight size={20} className="text-[#38bdf8]" />
                    <span>Pending & Recent Withdrawals</span>
                  </h2>
                  <p className="text-xs text-[#8d9691]">
                    Review client payout requests and approve on-chain dispatch.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-white/15 bg-[#080d0e]/95 backdrop-blur-xl overflow-hidden shadow-2xl">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-white/10 bg-[#060a0b] text-[0.68rem] uppercase font-bold text-[#8d9691]">
                      <th className="py-4 px-5">User</th>
                      <th className="py-4 px-4">Amount</th>
                      <th className="py-4 px-4">Asset</th>
                      <th className="py-4 px-4">Destination Wallet Address</th>
                      <th className="py-4 px-4">Created Date</th>
                      <th className="py-4 px-4">Status</th>
                      <th className="py-4 px-5 text-right">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-white/5 font-medium">
                    {withdrawals.map((wth) => (
                      <tr key={wth.id} className="hover:bg-white/[0.02]">
                        <td className="py-3.5 px-5">
                          <div className="font-bold text-white font-sans">{wth.userName}</div>
                          <div className="text-[0.65rem] text-[#8d9691]">{wth.userEmail}</div>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-white">
                          ${wth.amount.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4 text-[#dfe9e2]">{wth.asset}</td>
                        <td className="py-3.5 px-4 text-[#38bdf8] truncate max-w-[150px]">
                          {wth.walletAddress}
                        </td>
                        <td className="py-3.5 px-4 text-[#8d9691]">{wth.createdAt}</td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold border ${
                              wth.status === 'pending'
                                ? 'bg-[#291f0d] text-yellow-400 border-yellow-500/40 animate-pulse'
                                : wth.status === 'approved'
                                ? 'bg-[#183a1d] text-[#58e65b] border-[#58e65b]/40'
                                : 'bg-[#3a1818] text-[#ff6b6b] border-[#ff6b6b]/40'
                            }`}
                          >
                            {wth.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-right space-x-2">
                          {wth.status === 'pending' && (
                            <>
                              <button
                                type="button"
                                onClick={() => approveWithdrawal(wth.id)}
                                className="px-3 py-1 rounded-lg bg-[#58e65b] text-black font-extrabold text-[0.7rem] hover:bg-[#48db50] transition-colors"
                              >
                                Approve Payout
                              </button>
                              <button
                                type="button"
                                onClick={() => rejectWithdrawal(wth.id)}
                                className="px-3 py-1 rounded-lg border border-red-500/40 bg-red-950/40 text-[#ff6b6b] font-bold text-[0.7rem] hover:bg-red-900 transition-colors"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 4: USER ACCOUNTS & BALANCES ==================== */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-white">Registered User Accounts & Balances</h2>
              <p className="text-xs text-[#8d9691]">
                Modify available/invested balances, inspect KYC status, and oversee active portfolio tiers.
              </p>
            </div>

            <div className="rounded-3xl border border-white/15 bg-[#080d0e]/95 backdrop-blur-xl overflow-hidden shadow-2xl">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 bg-[#060a0b] text-[0.68rem] uppercase font-bold text-[#8d9691]">
                    <th className="py-4 px-5">User</th>
                    <th className="py-4 px-4">Available Balance</th>
                    <th className="py-4 px-4">Invested Balance</th>
                    <th className="py-4 px-4">Total Net Worth</th>
                    <th className="py-4 px-4">Active Plan</th>
                    <th className="py-4 px-4">KYC Status</th>
                    <th className="py-4 px-4">Joined Date</th>
                    <th className="py-4 px-5 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/5 font-medium">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-white/[0.02]">
                      <td className="py-3.5 px-5">
                        <div className="font-bold text-white font-sans">{u.name}</div>
                        <div className="text-[0.65rem] text-[#8d9691]">{u.email}</div>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#58e65b]">
                        ${u.availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3.5 px-4 text-[#38bdf8]">
                        ${u.investedBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-white">
                        ${u.totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3.5 px-4 font-sans text-[#dfe9e2]">{u.activePlan}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[0.65rem] bg-[#183a1d] text-[#58e65b] border border-[#58e65b]/30">
                          {u.kycStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[#8d9691]">{u.joinedDate}</td>
                      <td className="py-3.5 px-5 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingUser(u)
                            setBalanceForm({
                              available: u.availableBalance,
                              invested: u.investedBalance,
                            })
                          }}
                          className="px-3 py-1 rounded-lg border border-white/20 bg-white/5 text-white font-bold text-[0.7rem] hover:bg-[#58e65b] hover:text-black transition-colors"
                        >
                          Modify Balance
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ==================== MODAL 1: ASSIGN NEW INVESTMENT ==================== */}
      <AnimatePresence>
        {isNewInvModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNewInvModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative z-10 w-full max-w-lg rounded-3xl border border-white/15 bg-[#080d0e] p-6 sm:p-8 shadow-[0_24px_70px_rgba(0,0,0,0.9)] text-xs text-white"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <h3 className="text-lg font-black text-white">Assign User Investment Plan</h3>
                  <p className="text-[#8d9691]">Allocate active yield contract to an investor</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsNewInvModalOpen(false)}
                  className="p-1 rounded-lg text-[#8d9691] hover:text-white"
                >
                  <XCircle size={18} />
                </button>
              </div>

              <form onSubmit={handleCreateInvestmentSubmit} className="space-y-4">
                <div>
                  <label className="text-[0.7rem] uppercase font-bold text-[#8d9691] block mb-1">
                    Investor Email:
                  </label>
                  <input
                    type="email"
                    required
                    value={newInvForm.userEmail}
                    onChange={(e) => setNewInvForm({ ...newInvForm, userEmail: e.target.value })}
                    placeholder="e.g. alex.chen@example.com"
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white focus:border-[#58e65b] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[0.7rem] uppercase font-bold text-[#8d9691] block mb-1">
                    Select Plan:
                  </label>
                  <select
                    value={newInvForm.planId}
                    onChange={(e) => {
                      const p = investmentPlans.find((pl) => pl.id === e.target.value)
                      setNewInvForm({
                        ...newInvForm,
                        planId: e.target.value,
                        depositAmount: p ? p.minDeposit : 1000,
                      })
                    }}
                    className="w-full rounded-xl border border-white/10 bg-[#070b0c] px-3.5 py-2.5 text-xs text-white focus:border-[#58e65b] focus:outline-none"
                  >
                    {investmentPlans.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.dailyReturn} Daily / {p.durationDisplay})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[0.7rem] uppercase font-bold text-[#8d9691] block mb-1">
                    Deposit Amount (USD):
                  </label>
                  <input
                    type="number"
                    required
                    min={100}
                    value={newInvForm.depositAmount}
                    onChange={(e) => setNewInvForm({ ...newInvForm, depositAmount: parseFloat(e.target.value) || 0 })}
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white font-mono focus:border-[#58e65b] focus:outline-none"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsNewInvModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs font-bold text-white hover:bg-white/10"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#58e65b] text-black font-black text-xs uppercase tracking-wider hover:bg-[#48db50] shadow-[0_0_15px_rgba(88,230,91,0.4)]"
                  >
                    Create & Activate Plan
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================== MODAL 2: EDIT USER BALANCE ==================== */}
      <AnimatePresence>
        {editingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingUser(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative z-10 w-full max-w-md rounded-3xl border border-white/15 bg-[#080d0e] p-6 sm:p-8 shadow-[0_24px_70px_rgba(0,0,0,0.9)] text-xs text-white"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <h3 className="text-lg font-black text-white">Adjust User Balance</h3>
                  <p className="text-[#8d9691]">{editingUser.name} ({editingUser.email})</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="p-1 rounded-lg text-[#8d9691] hover:text-white"
                >
                  <XCircle size={18} />
                </button>
              </div>

              <form onSubmit={handleBalanceEditSubmit} className="space-y-4">
                <div>
                  <label className="text-[0.7rem] uppercase font-bold text-[#8d9691] block mb-1">
                    Available Balance (USD):
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={balanceForm.available}
                    onChange={(e) => setBalanceForm({ ...balanceForm, available: parseFloat(e.target.value) || 0 })}
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white font-mono focus:border-[#58e65b] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[0.7rem] uppercase font-bold text-[#8d9691] block mb-1">
                    Invested Balance (USD):
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={balanceForm.invested}
                    onChange={(e) => setBalanceForm({ ...balanceForm, invested: parseFloat(e.target.value) || 0 })}
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white font-mono focus:border-[#58e65b] focus:outline-none"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingUser(null)}
                    className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs font-bold text-white hover:bg-white/10"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#58e65b] text-black font-black text-xs uppercase tracking-wider hover:bg-[#48db50] shadow-[0_0_15px_rgba(88,230,91,0.4)]"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Real-time Moderator Notification Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border px-5 py-3.5 shadow-[0_16px_36px_rgba(0,0,0,0.8)] backdrop-blur-xl ${
              toast.type === 'error'
                ? 'border-[#ff6b6b]/40 bg-[#250d0d]/95 text-[#ff6b6b]'
                : toast.type === 'warning'
                ? 'border-yellow-500/40 bg-[#251f0d]/95 text-yellow-400'
                : 'border-[#58e65b]/40 bg-[#0d2512]/95 text-[#58e65b]'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertCircle size={18} />
            ) : (
              <CheckCircle2 size={18} />
            )}
            <div className="text-xs font-bold tracking-wide text-white">
              {toast.msg}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default Admin
