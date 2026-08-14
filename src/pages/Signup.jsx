import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  LockKeyhole,
  Check,
  Zap,
  Globe,
  TrendingUp
} from 'lucide-react'
import CoinLogo from '../components/CoinLogo'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const navigate = useNavigate()
  const { signup, isLoading } = useAuth()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // Password strength calculation
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, label: 'None', color: 'bg-white/10' }
    let score = 0
    if (pwd.length >= 8) score += 1
    if (/[A-Z]/.test(pwd)) score += 1
    if (/[0-9]/.test(pwd)) score += 1
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1

    switch (score) {
      case 1:
        return { score: 25, label: 'Weak', color: 'bg-[#ff5555]' }
      case 2:
        return { score: 50, label: 'Fair', color: 'bg-[#f59e0b]' }
      case 3:
        return { score: 75, label: 'Strong', color: 'bg-[#3b82f6]' }
      case 4:
        return { score: 100, label: 'Military-Grade', color: 'bg-[#58e65b]' }
      default:
        return { score: 0, label: 'Weak', color: 'bg-white/10' }
    }
  }

  const pwdStrength = getPasswordStrength(password)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name or entity name.')
      return
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Please enter a valid email address.')
      return
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.')
      return
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.')
      return
    }

    if (!agreeTerms) {
      setErrorMessage('Please accept the Institutional Terms and Disclosures.')
      return
    }

    const res = await signup(fullName, email, password)
    if (res.success) {
      setSuccessMessage('Account created successfully! Redirecting...')
      setTimeout(() => {
        navigate('/trade')
      }, 1000)
    } else {
      setErrorMessage(res.error || 'Failed to create account. Please try again.')
    }
  }

  // Quick Demo Prefill
  const handleQuickPrefill = () => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000)
    setFullName(`Trader ${randomSuffix}`)
    setEmail(`trader${randomSuffix}@purex.exchange`)
    setPassword('Password123!')
    setConfirmPassword('Password123!')
    setErrorMessage('')
  }

  return (
    <main className="home-page-shell min-h-[calc(100vh-80px)] flex flex-col justify-start lg:justify-center items-center px-4 pt-2 pb-5 sm:px-6 lg:px-8 text-white relative">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-gradient-to-tr from-[#58e65b]/12 via-[#183a1d]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Main Centered Wrapper Raised Up Above the Fold */}
      <div className="w-full max-w-5xl z-10 mx-auto flex flex-col justify-center">
        
        {/* Compact Centered Brand Header */}
        <div className="text-center mb-2.5">
          <Link to="/" className="inline-flex items-center gap-2.5 group justify-center" aria-label="PUREX Exchange home">
            <div className="brand-mark-wrap !w-8 !h-8 !rounded-lg transition-transform duration-300 group-hover:scale-105 shadow-[0_0_15px_rgba(88,230,91,0.25)]">
              <CoinLogo symbol="PUREX" size={28} className="brand-mark-svg" />
            </div>
            <div className="text-left leading-none">
              <div className="text-xl font-black tracking-[0.16em] text-white">PUREX</div>
              <div className="text-[0.6rem] font-bold tracking-[0.28em] text-[#8d9691]">EXCHANGE</div>
            </div>
          </Link>
          <p className="mt-1 text-[11px] text-[#8d9691] font-medium tracking-wide">
            Open an Institutional Crypto Account in Under 60 Seconds
          </p>
        </div>

        {/* 2-Column Symmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch justify-center">
          
          {/* ================= LEFT CARD: CREATE ACCOUNT FORM ================= */}
          <div className="lg:col-span-7 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="h-full rounded-2xl border border-white/15 bg-[#080d0e]/95 p-4 sm:p-5 backdrop-blur-2xl shadow-[0_18px_60px_rgba(0,0,0,0.85)] relative overflow-hidden flex flex-col justify-between"
            >
              {/* Top neon border accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#58e65b] to-transparent opacity-90" />

              <div>
                <div className="mb-2.5 flex items-center justify-between">
                  <div>
                    <h1 className="text-lg font-bold text-white tracking-tight">Create Account</h1>
                    <p className="text-[11px] text-[#8d9691]">Institutional deep liquidity access</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleQuickPrefill}
                    className="rounded-lg border border-[#58e65b]/30 bg-[#183a1d]/60 px-2.5 py-1 text-[11px] font-bold text-[#58e65b] hover:bg-[#58e65b] hover:text-black transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles size={11} />
                    <span>Quick Prefill</span>
                  </button>
                </div>

                {/* Feedback diagnostic messages */}
                <AnimatePresence>
                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="mb-2.5 flex items-start gap-2 rounded-lg border border-[#ff5555]/30 bg-[#ff5555]/10 p-2 text-[11px] text-[#ff8080]"
                    >
                      <AlertCircle size={13} className="shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </motion.div>
                  )}

                  {successMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="mb-2.5 flex items-start gap-2 rounded-lg border border-[#58e65b]/30 bg-[#183a1d]/60 p-2 text-[11px] text-[#58e65b]"
                    >
                      <CheckCircle2 size={13} className="shrink-0 mt-0.5" />
                      <span>{successMessage}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-2">
                  <div>
                    <label htmlFor="signup-name" className="block text-[11px] font-semibold text-[#dfe9e2] mb-0.5">
                      Full Name / Entity
                    </label>
                    <div className="relative">
                      <input
                        id="signup-name"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Alex Vance"
                        required
                        className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-1.5 pl-9 text-xs sm:text-sm text-white placeholder-[#5a6560] transition-all focus:border-[#58e65b] focus:bg-black/80 focus:outline-none focus:ring-1 focus:ring-[#58e65b]"
                      />
                      <User size={14} className="absolute left-3 top-2.5 text-[#8d9691]" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="signup-email" className="block text-[11px] font-semibold text-[#dfe9e2] mb-0.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        id="signup-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="trader@purex.exchange"
                        required
                        className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-1.5 pl-9 text-xs sm:text-sm text-white placeholder-[#5a6560] transition-all focus:border-[#58e65b] focus:bg-black/80 focus:outline-none focus:ring-1 focus:ring-[#58e65b]"
                      />
                      <Mail size={14} className="absolute left-3 top-2.5 text-[#8d9691]" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="signup-password" className="block text-[11px] font-semibold text-[#dfe9e2] mb-0.5">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="signup-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Min. 8 characters"
                        required
                        className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-1.5 pl-9 pr-9 text-xs sm:text-sm text-white placeholder-[#5a6560] transition-all focus:border-[#58e65b] focus:bg-black/80 focus:outline-none focus:ring-1 focus:ring-[#58e65b]"
                      />
                      <Lock size={14} className="absolute left-3 top-2.5 text-[#8d9691]" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-[#8d9691] hover:text-white transition-colors cursor-pointer"
                      >
                        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>

                    {password && (
                      <div className="mt-1 space-y-0.5">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-[#8d9691]">Strength:</span>
                          <span className="font-bold text-white">{pwdStrength.label}</span>
                        </div>
                        <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                          <div
                            className={`h-full transition-all duration-300 ${pwdStrength.color}`}
                            style={{ width: `${pwdStrength.score}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="signup-confirm-password" className="block text-[11px] font-semibold text-[#dfe9e2] mb-0.5">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        id="signup-confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter password"
                        required
                        className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-1.5 pl-9 pr-9 text-xs sm:text-sm text-white placeholder-[#5a6560] transition-all focus:border-[#58e65b] focus:bg-black/80 focus:outline-none focus:ring-1 focus:ring-[#58e65b]"
                      />
                      <Lock size={14} className="absolute left-3 top-2.5 text-[#8d9691]" />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-2.5 text-[#8d9691] hover:text-white transition-colors cursor-pointer"
                      >
                        {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>

                    {confirmPassword && password !== confirmPassword && (
                      <p className="mt-0.5 text-[10px] text-[#ff5555]">Passwords do not match.</p>
                    )}
                  </div>

                  <div className="pt-0.5">
                    <label className="flex items-start gap-1.5 cursor-pointer select-none text-[11px] text-[#8d9691] hover:text-[#dfe9e2]">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="mt-0.5 h-3.5 w-3.5 rounded border-white/20 bg-black/50 text-[#58e65b] focus:ring-0 focus:ring-offset-0 accent-[#58e65b]"
                      />
                      <span className="leading-snug">
                        I agree to PUREX Exchange's{' '}
                        <span className="text-[#58e65b] hover:underline">Terms</span> &{' '}
                        <span className="text-[#58e65b] hover:underline">Privacy Policy</span>.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !agreeTerms}
                    className="w-full rounded-xl bg-[#58e65b] py-2.5 text-xs font-bold text-black uppercase tracking-wider shadow-[0_0_20px_rgba(88,230,91,0.3)] transition-all hover:bg-[#48db50] hover:shadow-[0_0_30px_rgba(88,230,91,0.45)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                  >
                    {isLoading ? (
                      <span>Creating Portfolio...</span>
                    ) : (
                      <>
                        <span>Create Free Account</span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Bottom Login Link */}
              <div className="mt-2.5 border-t border-white/10 pt-2 text-center text-[11px] text-[#8d9691]">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-bold text-[#58e65b] hover:text-[#78f17b] hover:underline transition-colors"
                >
                  Log In Instead
                </Link>
              </div>
            </motion.div>
          </div>

          {/* ================= RIGHT CARD: INSTITUTIONAL PERKS SHOWCASE ================= */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            
            {/* VIP Trader Advantages Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              className="rounded-2xl border border-white/15 bg-[#080d0e]/90 p-3.5 backdrop-blur-xl shadow-[0_16px_50px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
                <div className="flex items-center gap-1.5">
                  <Zap size={13} className="text-[#58e65b]" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white">Institutional Benefits</span>
                </div>
                <span className="text-[9px] font-mono text-[#58e65b] bg-[#183a1d] px-1.5 py-0.5 rounded-full border border-[#58e65b]/30">
                  Instant Access
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2.5 rounded-lg bg-white/[0.02] p-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#183a1d] text-[#58e65b]">
                    <TrendingUp size={12} />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-white">0.01% Maker Fee Tier</div>
                    <div className="text-[9px] text-[#8d9691] mt-0.5">Industry-lowest execution costs with deep orderbook liquidity.</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 rounded-lg bg-white/[0.02] p-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#183a1d] text-[#58e65b]">
                    <Shield size={12} />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-white">$500M SAFU Insurance</div>
                    <div className="text-[9px] text-[#8d9691] mt-0.5">Cold storage security backed by Multi-Party Computation (MPC).</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 rounded-lg bg-white/[0.02] p-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#183a1d] text-[#58e65b]">
                    <Globe size={12} />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-white">Global Gateway Clearing</div>
                    <div className="text-[9px] text-[#8d9691] mt-0.5">Instant SEPA, SWIFT, and crypto on-ramps in 150+ countries.</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Security Guarantee Box */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.15 }}
              className="rounded-2xl border border-white/15 bg-[#080d0e]/90 p-3 backdrop-blur-xl shadow-[0_16px_50px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center gap-2 text-xs text-[#dfe9e2]">
                <div className="flex h-5 w-5 items-center justify-center rounded bg-[#183a1d] text-[#58e65b]">
                  <Check size={12} />
                </div>
                <div>
                  <span className="font-bold text-white text-[11px]">100% Proof of Reserves Verified</span>
                  <p className="text-[9px] text-[#8d9691]">User assets backed 1:1 with real-time on-chain audits.</p>
                </div>
              </div>
            </motion.div>

            {/* Active Network Status */}
            <div className="rounded-xl border border-[#58e65b]/20 bg-[#183a1d]/30 p-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <span className="flex h-1.5 w-1.5 rounded-full bg-[#58e65b] animate-ping" />
                <span className="font-semibold text-[#dfe9e2] text-[11px]">Network Health: Optimal</span>
              </div>
              <span className="text-[9px] font-mono text-[#58e65b]">&lt; 4.2ms NY4</span>
            </div>

          </div>
        </div>

        {/* Compact Centered Security Compliance Bar */}
        <div className="mt-3 flex items-center justify-center gap-5 text-[10px] text-[#8d9691]">
          <div className="flex items-center gap-1">
            <LockKeyhole size={11} className="text-[#58e65b]" />
            <span>256-Bit TLS Encryption</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield size={11} className="text-[#58e65b]" />
            <span>Multi-Sig Cold Storage</span>
          </div>
          <div className="flex items-center gap-1">
            <Globe size={11} className="text-[#58e65b]" />
            <span>99.99% Uptime</span>
          </div>
        </div>

      </div>
    </main>
  )
}
