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
  Sparkles,
  ArrowRight
} from 'lucide-react'

const ADMIN_NAV = [
  { id: 'overview', label: 'Admin Overview', icon: LayoutDashboard },
  { id: 'users', label: 'User Management', icon: Users },
  { id: 'approvals', label: 'Approvals Queue', icon: CheckCircle2, badge: 'Live' },
  { id: 'wallets', label: 'Wallet Settings', icon: Wallet }
]

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('overview')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
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
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#B0F127] text-black shadow-md font-bold'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-white/60'}`} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && !isActive && (
                      <span className="text-[9px] font-mono bg-[#B0F127]/10 text-[#B0F127] border border-[#B0F127]/20 px-1.5 py-0.5 rounded">
                        {item.badge}
                      </span>
                    )}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Bottom Actions */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <Link
              to="/dashboard"
              className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-white/70 hover:text-[#B0F127] hover:bg-white/5 rounded-lg transition-all font-semibold"
            >
              <span>Switch to User View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-all"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Mobile Header Topbar */}
        <div className="lg:hidden bg-[#0c0c0c] border-b border-white/10 px-4 py-3.5 flex items-center justify-between sticky top-0 z-40">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#B0F127] flex items-center justify-center text-black font-black text-sm">
              PX
            </div>
            <span className="text-sm font-black text-white tracking-tight">ADMIN SUITE</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-white/80 hover:text-white bg-white/5 rounded-lg border border-white/10"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative w-4/5 max-w-xs bg-[#0c0c0c] border-r border-white/10 h-full p-6 flex flex-col justify-between z-10 overflow-y-auto">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-sm font-black text-white">ADMIN MENU</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 text-white/60 hover:text-white rounded-lg bg-white/5"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1">
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
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                          isActive
                            ? 'bg-[#B0F127] text-black font-bold'
                            : 'text-white/70 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2">
                <Link
                  to="/dashboard"
                  className="w-full flex items-center justify-between px-3 py-2 text-xs text-white/70 hover:text-white"
                >
                  <span>User Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-xl"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area (Right) */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#060606] pb-12">
          {/* Top Bar (Desktop) */}
          <header className="hidden lg:flex items-center justify-between px-8 py-5 border-b border-white/10 bg-[#060606]/80 backdrop-blur-md sticky top-0 z-30">
            <div>
              <h1 className="text-xl font-black text-white tracking-tight capitalize">
                {ADMIN_NAV.find((n) => n.id === activeTab)?.label || 'Admin Console'}
              </h1>
              <span className="text-xs text-white/40 font-mono">
                Executive Root Authorization • Master Liquidity Manager
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs rounded-xl border border-white/10 transition-all flex items-center gap-1.5"
              >
                <span>View User Dashboard</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/50" />
              </Link>
            </div>
          </header>

          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto flex-1">
            {renderActiveTab()}
          </div>
        </main>
      </div>
    </div>
  )
}
