import { useState, useRef, useEffect } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import {
  Menu,
  MoonStar,
  SunMedium,
  X,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  Wallet
} from 'lucide-react'
import CoinLogo from './CoinLogo'
import { navItems } from '../data/marketData'
import { useAuth } from '../context/AuthContext'

function Navbar({ theme, setTheme }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const userMenuRef = useRef(null)

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  // Close user dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    setIsUserMenuOpen(false)
    setIsOpen(false)
    navigate('/login')
  }

  // If authenticated, adapt navigation list so users aren't directed to unauthenticated landing page
  const displayNavItems = isAuthenticated
    ? [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Markets', path: '/markets' },
        { label: 'About Us', path: '/about' },
        { label: 'Security', path: '/security' },
        { label: 'Support', path: '/support' },
      ]
    : navItems

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#141838]/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
        {/* Brand Logo - Navigates to /dashboard if logged in, / if guest */}
        <NavLink
          to={isAuthenticated ? '/dashboard' : '/'}
          className="flex items-center gap-2.5"
          aria-label="PUREX Exchange home"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-[0_0_15px_rgba(255,122,0,0.5)]">
            <span className="font-black text-white text-base">P</span>
          </div>
          <div className="leading-none">
            <div className="text-[1.15rem] font-black tracking-wider text-white flex items-center gap-1">
              <span>PUREX</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff7a00]"></span>
            </div>
            <div className="text-[0.55rem] font-bold tracking-[0.25em] text-slate-400">
              {isAuthenticated ? 'USER DASHBOARD' : 'CRYPTO TERMINAL'}
            </div>
          </div>
        </NavLink>

        <div className="hidden items-center gap-7 lg:flex">
          {displayNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative px-1 py-1.5 text-sm font-semibold transition-colors ${
                  isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#ff7a00]" aria-hidden="true" />}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 lg:flex">
          {isAuthenticated && user ? (
            /* Authenticated User Menu (Clean - No Moderator Panel) */
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] py-1.5 px-3.5 hover:border-[#ff7a00]/50 transition-all cursor-pointer"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-[#ff7a00] to-amber-500 text-white font-bold text-xs">
                  {user.fullName ? user.fullName[0].toUpperCase() : 'U'}
                </div>
                <div className="text-left text-xs leading-tight">
                  <div className="font-bold text-white max-w-[120px] truncate">
                    {user.fullName || user.email.split('@')[0]}
                  </div>
                </div>
                <ChevronDown size={14} className={`text-slate-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-white/15 bg-[#171b3c] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl z-50">
                  <div className="border-b border-white/10 pb-3 mb-2 px-1">
                    <div className="text-xs font-bold text-white">{user.fullName || 'Active Trader'}</div>
                    <div className="text-[11px] text-slate-400 font-mono truncate">{user.email}</div>
                    <div className="mt-1.5 flex items-center justify-between text-[10px] bg-black/40 px-2 py-1 rounded-lg border border-white/5">
                      <span className="text-slate-400">Total Portfolio:</span>
                      <span className="font-bold text-emerald-400 font-mono">${(user.totalBalance ?? 10000).toLocaleString()} USDT</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Link
                      to="/dashboard"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
                    >
                      <LayoutDashboard size={14} className="text-[#ff7a00]" />
                      <span>User Dashboard</span>
                    </Link>
                  </div>

                  <div className="border-t border-white/10 pt-2 mt-2">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    >
                      <LogOut size={14} />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Guest Actions */
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-sm font-semibold text-white hover:text-amber-300 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-full bg-gradient-to-r from-[#ff7a00] to-[#ff9500] px-6 py-2.5 text-xs font-bold text-white shadow-[0_0_20px_rgba(255,122,0,0.5)] hover:shadow-[0_0_30px_rgba(255,122,0,0.75)] hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
              >
                Register
              </Link>
            </div>
          )}

          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <SunMedium size={16} /> : <MoonStar size={16} />}
          </button>
        </div>

        {/* Mobile Header Menu Button */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <SunMedium size={16} /> : <MoonStar size={16} />}
          </button>
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Open menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="border-t border-white/10 bg-[#11142c] lg:hidden shadow-2xl">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-4 py-4 sm:px-6">
            {displayNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                    isActive ? 'bg-[#1c2146] text-[#ff7a00]' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            {isAuthenticated && user ? (
              <div className="mt-2 border-t border-white/10 pt-3 space-y-2">
                <div className="flex items-center justify-between px-2">
                  <div className="text-xs font-bold text-white">{user.fullName || user.email}</div>
                  <div className="text-xs font-mono font-bold text-emerald-400">
                    ${(user.totalBalance ?? 10000).toLocaleString()}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 rounded-xl bg-gradient-to-r from-[#ff7a00] to-[#ff9500] text-center text-xs font-bold py-2.5 text-white shadow-[0_0_15px_rgba(255,122,0,0.4)]"
                  >
                    User Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex-1 rounded-xl border border-rose-500/30 bg-rose-500/10 text-center text-xs font-bold py-2.5 text-rose-400 hover:bg-rose-500/20 transition-all cursor-pointer"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-2 flex gap-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 rounded-xl border border-white/15 bg-[#171b3c] py-3 text-center text-xs font-bold text-white shadow hover:border-[#ff7a00]/50"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 rounded-xl bg-gradient-to-r from-[#ff7a00] to-[#ff9500] py-3 text-center text-xs font-black text-white shadow-[0_0_15px_rgba(255,122,0,0.4)] uppercase tracking-wider"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
