import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import OverviewTab from '../components/dashboard/OverviewTab'
import InvestTab from '../components/dashboard/InvestTab'
import TransactionsTab from '../components/dashboard/TransactionsTab'
import KycTab from '../components/dashboard/KycTab'
import ReferralTab from '../components/dashboard/ReferralTab'
import UpgradeTab from '../components/dashboard/UpgradeTab'
import SupportTab from '../components/dashboard/SupportTab'
import SettingsTab from '../components/dashboard/SettingsTab'

import DepositModal from '../components/dashboard/modals/DepositModal'
import WithdrawModal from '../components/dashboard/modals/WithdrawModal'
import ConvertModal from '../components/dashboard/modals/ConvertModal'

import {
  LayoutDashboard,
  Zap,
  History,
  ShieldCheck,
  Gift,
  Sparkles,
  Headphones,
  Settings,
  LogOut,
  ArrowDownLeft,
  ArrowUpRight,
  RefreshCw,
  Menu,
  X,
  ChevronRight,
  TrendingUp,
  User,
  ExternalLink
} from 'lucide-react'

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, badge: 'Live' },
  { id: 'invest', label: 'Start Investing', icon: Zap, highlight: true },
  { id: 'transactions', label: 'Transaction History', icon: History },
  { id: 'kyc', label: 'KYC Verification', icon: ShieldCheck },
  { id: 'referral', label: 'Referral System', icon: Gift },
  { id: 'upgrade', label: 'Upgrade Tier', icon: Sparkles },
  { id: 'support', label: 'Customer Support', icon: Headphones },
  { id: 'settings', label: 'Account Settings', icon: Settings }
]

export default function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('overview')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Modal States
  const [depositOpen, setDepositOpen] = useState(false)
  const [withdrawOpen, setWithdrawOpen] = useState(false)
  const [convertOpen, setConvertOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewTab
            onOpenDeposit={() => setDepositOpen(true)}
            onOpenWithdraw={() => setWithdrawOpen(true)}
            onOpenConvert={() => setConvertOpen(true)}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )
      case 'invest':
        return <InvestTab onOpenDeposit={() => setDepositOpen(true)} />
      case 'transactions':
        return (
          <TransactionsTab
            onOpenDeposit={() => setDepositOpen(true)}
            onOpenWithdraw={() => setWithdrawOpen(true)}
          />
        )
      case 'kyc':
        return <KycTab />
      case 'referral':
        return <ReferralTab />
      case 'upgrade':
        return <UpgradeTab onSelectInvestPlan={() => setActiveTab('invest')} />
      case 'support':
        return <SupportTab />
      case 'settings':
        return <SettingsTab />
      default:
        return (
          <OverviewTab
            onOpenDeposit={() => setDepositOpen(true)}
            onOpenWithdraw={() => setWithdrawOpen(true)}
            onOpenConvert={() => setConvertOpen(true)}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-[#060606] text-white flex flex-col font-sans selection:bg-[#B0F127] selection:text-black antialiased">
      {/* Modals */}
      <DepositModal isOpen={depositOpen} onClose={() => setDepositOpen(false)} />
      <WithdrawModal
        isOpen={withdrawOpen}
        onClose={() => setWithdrawOpen(false)}
        onNavigateKyc={() => {
          setWithdrawOpen(false)
          setActiveTab('kyc')
        }}
      />
      <ConvertModal isOpen={convertOpen} onClose={() => setConvertOpen(false)} />

      <div className="flex-1 flex flex-col lg:flex-row min-h-screen">
        {/* Desktop Sidebar (Left) */}
        <aside className="hidden lg:flex w-64 xl:w-72 bg-[#0d0d0d] border-r border-white/10 flex-col justify-between shrink-0 p-5 sticky top-0 h-screen overflow-y-auto">
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center justify-between px-2 pt-1">
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-[#B0F127] flex items-center justify-center text-black font-black text-lg tracking-wider shadow-[0_0_20px_rgba(176,241,39,0.3)]">
                  PX
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-black tracking-tight text-white group-hover:text-[#B0F127] transition-colors">
                    PUREX
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-[#B0F127] font-mono -mt-1">
                    EXCHANGE
                  </span>
                </div>
              </Link>
            </div>

            {/* User Quick Info Box */}
            <div className="bg-[#141414] border border-white/10 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#B0F127]/10 border border-[#B0F127]/20 flex items-center justify-center text-[#B0F127] font-bold text-xs">
                  {user?.fullName ? user.fullName.charAt(0) : 'U'}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-white truncate">
                    {user?.fullName || 'Active Trader'}
                  </h4>
                  <span className="text-[10px] text-[#B0F127] font-mono block truncate">
                    {user?.tier || 'Pro Quant Desk'}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] pt-1 border-t border-white/5 font-mono">
                <span className="text-white/40">Status:</span>
                <span className="text-emerald-400 font-semibold">{user?.kycStatus || 'Verified Level 1'}</span>
              </div>
            </div>

            {/* Navigation Menu Links */}
            <nav className="space-y-1.5">
              <span className="px-3 text-[10px] font-semibold uppercase tracking-wider text-white/40 font-mono">
                Main Dashboard
              </span>

              {NAV_ITEMS.map((item) => {
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

                    {item.highlight && !isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B0F127] animate-pulse" />
                    )}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Bottom Actions */}
          <div className="space-y-2 pt-4 border-t border-white/10">
            <Link
              to="/admin"
              className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-[#B0F127] hover:bg-[#B0F127]/10 rounded-lg transition-all font-semibold"
            >
              <span>Admin Console</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/"
              className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              <span>Back to Landing Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-all"
            >
              <LogOut className="w-4 h-4" />
              Sign Out Securely
            </button>
          </div>
        </aside>

        {/* Mobile Header Topbar */}
        <div className="lg:hidden bg-[#0d0d0d] border-b border-white/10 px-4 py-3.5 flex items-center justify-between sticky top-0 z-40">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#B0F127] flex items-center justify-center text-black font-black text-sm">
              PX
            </div>
            <span className="text-sm font-black text-white tracking-tight">PUREX</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDepositOpen(true)}
              className="px-2.5 py-1.5 bg-[#B0F127] text-black text-[11px] font-bold rounded-lg flex items-center gap-1"
            >
              <ArrowDownLeft className="w-3.5 h-3.5" />
              Deposit
            </button>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-white/80 hover:text-white bg-white/5 rounded-lg border border-white/10"
              aria-label="Open Navigation Drawer"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer Content */}
            <div className="relative w-4/5 max-w-xs bg-[#0d0d0d] border-r border-white/10 h-full p-6 flex flex-col justify-between z-10 overflow-y-auto">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#B0F127] flex items-center justify-center text-black font-black text-sm">
                      PX
                    </div>
                    <span className="text-sm font-black text-white">PUREX DASHBOARD</span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 text-white/60 hover:text-white rounded-lg bg-white/5"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* User Snapshot */}
                <div className="p-3 bg-[#141414] rounded-xl border border-white/10">
                  <p className="text-xs font-bold text-white truncate">{user?.fullName || 'Active Trader'}</p>
                  <p className="text-[10px] text-[#B0F127] font-mono">{user?.tier || 'Pro Quant Desk'}</p>
                </div>

                {/* Nav list */}
                <nav className="space-y-1">
                  {NAV_ITEMS.map((item) => {
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
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#B0F127] hover:bg-[#B0F127]/10 rounded-xl transition-all"
                >
                  <span>Admin Console</span>
                  <ExternalLink className="w-3.5 h-3.5" />
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
        <main className="flex-1 flex flex-col min-w-0 bg-[#060606] pb-20 lg:pb-8">
          {/* Top Bar (Desktop) */}
          <header className="hidden lg:flex items-center justify-between px-8 py-5 border-b border-white/10 bg-[#060606]/80 backdrop-blur-md sticky top-0 z-30">
            <div>
              <h1 className="text-xl font-black text-white tracking-tight capitalize">
                {NAV_ITEMS.find((n) => n.id === activeTab)?.label || 'Overview'}
              </h1>
              <span className="text-xs text-white/40 font-mono">
                Purex Arbitrage Engine v3.4 • Multi-DEX High Frequency Active
              </span>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDepositOpen(true)}
                className="px-4 py-2 bg-[#B0F127] hover:bg-[#9ee016] text-black font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5"
              >
                <ArrowDownLeft className="w-4 h-4" />
                Deposit
              </button>

              <button
                onClick={() => setWithdrawOpen(true)}
                className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white font-bold text-xs rounded-xl border border-white/10 transition-all flex items-center gap-1.5"
              >
                <ArrowUpRight className="w-4 h-4 text-amber-400" />
                Withdraw
              </button>

              <button
                onClick={() => setConvertOpen(true)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white font-bold text-xs rounded-xl border border-white/10 transition-all flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                Convert
              </button>

              <div className="h-6 w-px bg-white/10 mx-1" />

              <button
                onClick={() => setActiveTab('settings')}
                className="flex items-center gap-2 p-1.5 pr-3 bg-[#141414] hover:bg-white/10 border border-white/10 rounded-xl transition-all text-xs"
              >
                <div className="w-7 h-7 rounded-lg bg-[#B0F127]/10 text-[#B0F127] font-bold flex items-center justify-center text-xs">
                  {user?.fullName ? user.fullName.charAt(0) : 'U'}
                </div>
                <span className="text-white/80 font-medium truncate max-w-[100px]">
                  {user?.fullName?.split(' ')[0] || 'Trader'}
                </span>
              </button>
            </div>
          </header>

          {/* Dynamic Active Tab Content */}
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto flex-1">
            {renderActiveTab()}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Fixed App Bar (Native mobile app experience) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0d0d0d]/95 backdrop-blur-lg border-t border-white/10 px-4 py-2.5 flex items-center justify-around z-40">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition-all ${
            activeTab === 'overview' ? 'text-[#B0F127]' : 'text-white/50 hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveTab('invest')}
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition-all ${
            activeTab === 'invest' ? 'text-[#B0F127]' : 'text-white/50 hover:text-white'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Invest</span>
        </button>

        {/* Floating Quick Action Trigger */}
        <button
          onClick={() => setDepositOpen(true)}
          className="w-10 h-10 -mt-5 rounded-full bg-[#B0F127] text-black flex items-center justify-center shadow-lg shadow-[#B0F127]/25 font-bold"
          aria-label="Deposit Funds"
        >
          <ArrowDownLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => setActiveTab('transactions')}
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition-all ${
            activeTab === 'transactions' ? 'text-[#B0F127]' : 'text-white/50 hover:text-white'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Ledger</span>
        </button>

        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-col items-center gap-1 text-[10px] font-semibold text-white/50 hover:text-white transition-all"
        >
          <Menu className="w-4 h-4" />
          <span>Menu</span>
        </button>
      </div>
    </div>
  )
}
