import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useSupportChat } from '../hooks/useSupportChat'
import ModeratorOverview from '../components/moderator/ModeratorOverview'
import ModeratorSupportDesk from '../components/moderator/ModeratorSupportDesk'
import ModeratorKycVerifier from '../components/moderator/ModeratorKycVerifier'
import ModeratorApprovals from '../components/moderator/ModeratorApprovals'
import ModeratorYieldManager from '../components/moderator/ModeratorYieldManager'
import ModeratorAuditLogs from '../components/moderator/ModeratorAuditLogs'
import {
  LayoutDashboard,
  MessageSquare,
  FileCheck2,
  CheckCircle2,
  TrendingUp,
  FileText,
  ShieldCheck,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  Activity,
  Headphones
} from 'lucide-react'

const MODERATOR_NAV = [
  { id: 'overview', label: 'Moderator Overview', icon: LayoutDashboard },
  { id: 'support', label: 'Live Support Chat', icon: MessageSquare, badge: 'Realtime' },
  { id: 'kyc', label: 'KYC & Compliance', icon: FileCheck2 },
  { id: 'approvals', label: 'Transaction Approvals', icon: CheckCircle2 },
  { id: 'yield', label: 'Yield & Investments', icon: TrendingUp },
  { id: 'audit', label: 'Operations Audit Log', icon: FileText }
]

export default function ModeratorDashboard() {
  const { user, logout } = useAuth()
  const { conversations } = useSupportChat()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('overview')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const pendingChatCount = conversations.filter((c) => c.status === 'pending_admin').length

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <ModeratorOverview onNavigateTab={(tab) => setActiveTab(tab)} />
      case 'support':
        return <ModeratorSupportDesk />
      case 'kyc':
        return <ModeratorKycVerifier />
      case 'approvals':
        return <ModeratorApprovals />
      case 'yield':
        return <ModeratorYieldManager />
      case 'audit':
        return <ModeratorAuditLogs />
      default:
        return <ModeratorOverview onNavigateTab={(tab) => setActiveTab(tab)} />
    }
  }

  return (
    <div className="min-h-screen bg-[#060606] text-white flex flex-col font-sans selection:bg-[#B0F127] selection:text-black antialiased">
      <div className="flex-1 flex flex-col lg:flex-row min-h-screen">
        {/* Desktop Sidebar (Left) */}
        <aside className="hidden lg:flex w-64 xl:w-72 bg-[#0c0c0c] border-r border-white/10 flex-col justify-between shrink-0 p-5 sticky top-0 h-screen overflow-y-auto">
          <div className="space-y-6">
            {/* Logo */}
            <div className="px-2 pt-1">
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-[#B0F127] flex items-center justify-center text-black font-black text-lg tracking-wider shadow-[0_0_20px_rgba(176,241,39,0.3)]">
                  PX
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-black tracking-tight text-white group-hover:text-[#B0F127] transition-colors">
                    PUREX OPS
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-[#B0F127] font-mono -mt-1">
                    MODERATOR DESK
                  </span>
                </div>
              </Link>
            </div>

            {/* Moderator Active Badge */}
            <div className="p-3 bg-[#141414] border border-[#B0F127]/30 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-[#B0F127] animate-ping" />
                <span className="text-xs font-bold text-[#B0F127] font-mono">Operations Active</span>
              </div>
              {pendingChatCount > 0 && (
                <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold">
                  {pendingChatCount} Waiting
                </span>
              )}
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1.5">
              <span className="px-3 text-[10px] font-semibold uppercase tracking-wider text-white/40 font-mono">
                Operations Menu
              </span>

              {MODERATOR_NAV.map((item) => {
                const isActive = activeTab === item.id
                const Icon = item.icon

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#B0F127] text-black shadow-[0_0_20px_rgba(176,241,39,0.2)] font-bold'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-[#B0F127]'}`} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && !isActive && (
                      <span className="text-[9px] font-mono uppercase bg-[#B0F127]/10 text-[#B0F127] px-2 py-0.5 rounded-md">
                        {item.badge}
                      </span>
                    )}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Sidebar Footer Controls */}
          <div className="space-y-2 pt-4 border-t border-white/10">
            <Link
              to="/admin"
              className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-white/60 hover:text-white hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-white/40" />
                <span>Executive Admin</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 opacity-50" />
            </Link>

            <Link
              to="/dashboard"
              className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-white/60 hover:text-white hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <ExternalLink className="w-4 h-4 text-white/40" />
                <span>Trader Dashboard</span>
              </div>
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 transition-all font-semibold"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#060606]">
          {/* Top Mobile/Tablet Header */}
          <header className="h-16 lg:hidden bg-[#0c0c0c] border-b border-white/10 px-4 flex items-center justify-between sticky top-0 z-40">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#B0F127] flex items-center justify-center text-black font-black text-sm">
                PX
              </div>
              <span className="text-sm font-black text-white tracking-tight">MODERATOR OPS</span>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white/70 hover:text-white rounded-lg bg-white/5"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </header>

          {/* Mobile Drawer Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/90 backdrop-blur-md pt-20 px-6 pb-6 flex flex-col justify-between overflow-y-auto animate-fade-in">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-sm font-black text-white">MODERATOR MENU</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 text-white/50 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav className="space-y-1.5">
                  {MODERATOR_NAV.map((item) => {
                    const isActive = activeTab === item.id
                    const Icon = item.icon

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id)
                          setMobileMenuOpen(false)
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold ${
                          isActive
                            ? 'bg-[#B0F127] text-black font-bold'
                            : 'text-white/70 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-[#B0F127]'}`} />
                          <span>{item.label}</span>
                        </div>
                      </button>
                    )
                  })}
                </nav>
              </div>

              <div className="space-y-2 pt-6 border-t border-white/10">
                <Link
                  to="/admin"
                  className="w-full flex items-center justify-center py-3 bg-white/5 rounded-xl text-xs font-semibold text-white"
                >
                  Switch to Admin Suite
                </Link>
                <Link
                  to="/dashboard"
                  className="w-full flex items-center justify-center py-3 bg-white/5 rounded-xl text-xs font-semibold text-white"
                >
                  Return to Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full py-3 text-center text-xs font-bold text-rose-400 bg-rose-500/10 rounded-xl"
                >
                  Log Out
                </button>
              </div>
            </div>
          )}

          {/* Desktop Top Header Bar */}
          <div className="hidden lg:flex h-16 border-b border-white/10 px-8 items-center justify-between bg-[#080808]/80 backdrop-blur-md sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-white/40 uppercase">Current Workspace:</span>
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                {MODERATOR_NAV.find((n) => n.id === activeTab)?.label || 'Moderator Console'}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-[#121212] border border-white/10 px-3 py-1.5 rounded-xl text-xs font-mono">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white/60">Node:</span>
                <span className="text-[#B0F127] font-bold">Purex London Operations 01</span>
              </div>

              <div className="flex items-center gap-2 pl-3 border-l border-white/10">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-[#B0F127]">
                  {user?.fullName?.slice(0, 2).toUpperCase() || 'MO'}
                </div>
                <div className="text-xs">
                  <div className="font-bold text-white">{user?.fullName || 'Staff Moderator'}</div>
                  <div className="text-[10px] text-white/40 font-mono">Security Tier 2</div>
                </div>
              </div>
            </div>
          </div>

          {/* Page Body Container */}
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">{renderActiveTab()}</div>
        </main>
      </div>
    </div>
  )
}
