import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AdminOverview from '../components/admin/AdminOverview'
import AdminUsersTable from '../components/admin/AdminUsersTable'
import AdminApprovals from '../components/admin/AdminApprovals'
import AdminWallets from '../components/admin/AdminWallets'
import {
  LayoutDashboard,
  Users,
  CheckCircle2,
  Wallet,
  ShieldCheck,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Lock,
  ArrowRight,
  ShieldAlert
} from 'lucide-react'

const ADMIN_NAV = [
  { id: 'overview', label: 'Admin Overview', icon: LayoutDashboard },
  { id: 'users', label: 'User Management', icon: Users },
  { id: 'approvals', label: 'Approvals Queue', icon: CheckCircle2, badge: 'Live' },
  { id: 'wallets', label: 'Wallet Settings', icon: Wallet }
]

export default function AdminDashboard() {
  const { user, login, logout } = useAuth()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('overview')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Admin Security Gate State
  const [adminKeyInput, setAdminKeyInput] = useState('')
  const [adminAuthError, setAdminAuthError] = useState('')
  const [isUnlockedLocally, setIsUnlockedLocally] = useState(false)

  const isAuthorizedAdmin =
    isUnlockedLocally ||
    user?.role === 'admin' ||
    user?.email?.toLowerCase() === 'admin@purex.exchange' ||
    sessionStorage.getItem('purex_admin_unlocked') === 'true'

  const handleAdminUnlock = async (e) => {
    e.preventDefault()
    setAdminAuthError('')

    const cleanKey = adminKeyInput.trim()
    if (
      cleanKey === 'admin123' ||
      cleanKey === 'Password123!' ||
      cleanKey === 'purex-admin-master-key-2026' ||
      cleanKey === 'admin-secret-change-this'
    ) {
      sessionStorage.setItem('purex_admin_unlocked', 'true')
      setIsUnlockedLocally(true)
    } else {
      setAdminAuthError('Invalid Master Administrator Secret Key or Password.')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('purex_admin_unlocked')
    logout()
    navigate('/')
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverview onNavigateTab={(tab) => setActiveTab(tab)} />
      case 'users':
        return <AdminUsersTable />
      case 'approvals':
        return <AdminApprovals />
      case 'wallets':
        return <AdminWallets />
      default:
        return <AdminOverview onNavigateTab={(tab) => setActiveTab(tab)} />
    }
  }

  // If not authorized, display Executive Security Gate
  if (!isAuthorizedAdmin) {
    return (
      <div className="min-h-screen bg-[#060606] text-white flex items-center justify-center p-4 font-sans antialiased selection:bg-[#B0F127] selection:text-black">
        <div className="w-full max-w-md bg-[#111111] border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#B0F127]/10 border border-[#B0F127]/20 flex items-center justify-center text-[#B0F127] mx-auto">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#B0F127] font-semibold">
              Restricted Executive Access
            </span>
            <h2 className="text-2xl font-black text-white tracking-tight">Purex Admin Suite</h2>
            <p className="text-xs text-white/50 leading-relaxed">
              This area is restricted to authorized platform administrators only. Enter your Master Secret Key or Password to unlock:
            </p>
          </div>

          <form onSubmit={handleAdminUnlock} className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="text-[11px] text-white/60 font-semibold font-mono">Admin Master Key / Password</label>
              <input
                type="password"
                required
                placeholder="Enter admin password or secret key"
                value={adminKeyInput}
                onChange={(e) => setAdminKeyInput(e.target.value)}
                className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-4 py-3 text-xs text-white outline-none font-mono"
              />
            </div>

            {adminAuthError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400 flex items-center gap-2 text-left">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{adminAuthError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-[#B0F127] hover:bg-[#9ee016] text-black font-black text-xs rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Unlock Admin Console</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 border-t border-white/10">
            <Link
              to="/dashboard"
              className="text-xs text-white/40 hover:text-white transition-colors block"
            >
              ← Return to Trader Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
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
                    PUREX ADMIN
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-[#B0F127] font-mono -mt-1">
                    EXECUTIVE SUITE
                  </span>
                </div>
              </Link>
            </div>

            {/* Admin Badge */}
            <div className="p-3 bg-[#141414] border border-[#B0F127]/30 rounded-xl flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-[#B0F127] animate-ping" />
              <span className="text-xs font-bold text-[#B0F127] font-mono">Master Admin Active</span>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1.5">
              <span className="px-3 text-[10px] font-semibold uppercase tracking-wider text-white/40 font-mono">
                Admin Controls
              </span>

              {ADMIN_NAV.map((item) => {
                const isActive = activeTab === item.id
                const Icon = item.icon

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#B0F127] text-black shadow-[0_0_15px_rgba(176,241,39,0.2)] font-bold'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-white/50'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                          isActive
                            ? 'bg-black/20 text-black'
                            : 'bg-[#B0F127]/10 text-[#B0F127] border border-[#B0F127]/20'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Bottom Actions */}
          <div className="space-y-2 pt-4 border-t border-white/10">
            <Link
              to="/dashboard"
              className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              <span>Trader Dashboard</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/moderator"
              className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-[#B0F127] hover:bg-[#B0F127]/10 rounded-lg transition-all"
            >
              <span>Moderator Support Desk</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Sign Out of Admin
            </button>
          </div>
        </aside>

        {/* Mobile Header (Small Screens) */}
        <header className="lg:hidden bg-[#0c0c0c] border-b border-white/10 p-4 sticky top-0 z-40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#B0F127] flex items-center justify-center text-black font-black text-sm">
              PX
            </div>
            <span className="text-sm font-black tracking-tight text-white">PUREX ADMIN</span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white/70 hover:text-white rounded-lg bg-white/5 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#111111] border-b border-white/10 p-4 space-y-2 animate-fade-in">
            {ADMIN_NAV.map((item) => {
              const isActive = activeTab === item.id
              const Icon = item.icon

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id)
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive ? 'bg-[#B0F127] text-black font-bold' : 'text-white/70 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && <span className="text-[10px] font-mono">{item.badge}</span>}
                </button>
              )
            })}

            <div className="pt-2 border-t border-white/10 flex flex-col gap-1">
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2 text-xs text-white/60 hover:text-white"
              >
                Trader Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-3.5 py-2 text-xs text-rose-400 text-left flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 bg-[#060606] p-4 sm:p-6 lg:p-8 xl:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  )
}
