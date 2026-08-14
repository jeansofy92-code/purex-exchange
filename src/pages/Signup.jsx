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
  LockKeyhole
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
      setErrorMessage('Please accept the Institutional Terms of Service and Risk Disclosures.')
      return
    }

    const res = await signup(fullName, email, password)
    if (res.success) {
      setSuccessMessage('Account created successfully! Redirecting to trading terminal...')
      setTimeout(() => {
        navigate('/trade')
      }, 1200)
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
    <main className="home-page-shell min-h-screen relative flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 text-white">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#58e65b]/15 via-[#183a1d]/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[520px] z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group" aria-label="PUREX Exchange home">
            <div className="brand-mark-wrap transition-transform duration-300 group-hover:scale-105 shadow-[0_0_20px_rgba(88,230,91,0.3)]">
              <CoinLogo symbol="PUREX" size={38} className="brand-mark-svg" />
            </div>
            <div className="text-left leading-none">
              <div className="text-2xl font-black tracking-[0.18em] text-white">PUREX</div>
              <div className="text-[0.65rem] font-bold tracking-[0.3em] text-[#8d9691]">EXCHANGE</div>
            </div>
          </Link>
          <p className="mt-3 text-xs text-[#8d9691] font-medium tracking-wide">
            Open an Institutional Crypto Account in Under 60 Seconds
          </p>
        </div>

        {/* Main Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl border border-white/15 bg-[#080d0e]/95 p-6 sm:p-9 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.9)] relative overflow-hidden"
        >
          {/* Subtle top neon border line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#58e65b] to-transparent opacity-80" />

          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Create Account</h1>
              <p className="text-xs text-[#8d9691] mt-0.5">Start trading with institutional deep liquidity</p>
            </div>
            <button
              type="button"
              onClick={handleQuickPrefill}
              className="rounded-xl border border-[#58e65b]/30 bg-[#183a1d]/60 px-3 py-1.5 text-xs font-bold text-[#58e65b] hover:bg-[#58e65b] hover:text-black transition-all flex items-center gap-1 cursor-pointer"
            >
              <Sparkles size={13} />
              <span>Quick Prefill</span>
            </button>
          </div>

          {/* Feedback messages */}
          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="mb-5 flex items-start gap-2.5 rounded-xl border border-[#ff5555]/30 bg-[#ff5555]/10 p-3 text-xs text-[#ff8080]"
              >
                <AlertCircle size={15} className="shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="mb-5 flex items-start gap-2.5 rounded-xl border border-[#58e65b]/30 bg-[#183a1d]/60 p-3 text-xs text-[#58e65b]"
              >
                <CheckCircle2 size={15} className="shrink-0 mt-0.5" />
                <span>{successMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="signup-name" className="block text-xs font-semibold text-[#dfe9e2] mb-1.5">
                Full Name / Institutional Entity
              </label>
              <div className="relative">
                <input
                  id="signup-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Alex Vance"
                  required
                  className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 pl-10 text-sm text-white placeholder-[#5a6560] transition-all focus:border-[#58e65b] focus:bg-black/80 focus:outline-none focus:ring-1 focus:ring-[#58e65b]"
                />
                <User size={16} className="absolute left-3.5 top-3.5 text-[#8d9691]" />
              </div>
            </div>

            <div>
              <label htmlFor="signup-email" className="block text-xs font-semibold text-[#dfe9e2] mb-1.5">
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
                  className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 pl-10 text-sm text-white placeholder-[#5a6560] transition-all focus:border-[#58e65b] focus:bg-black/80 focus:outline-none focus:ring-1 focus:ring-[#58e65b]"
                />
                <Mail size={16} className="absolute left-3.5 top-3.5 text-[#8d9691]" />
              </div>
            </div>

            <div>
              <label htmlFor="signup-password" className="block text-xs font-semibold text-[#dfe9e2] mb-1.5">
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
                  className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 pl-10 pr-10 text-sm text-white placeholder-[#5a6560] transition-all focus:border-[#58e65b] focus:bg-black/80 focus:outline-none focus:ring-1 focus:ring-[#58e65b]"
                />
                <Lock size={16} className="absolute left-3.5 top-3.5 text-[#8d9691]" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-[#8d9691] hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-2 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#8d9691]">Strength:</span>
                    <span className="font-bold text-white">{pwdStrength.label}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full transition-all duration-300 ${pwdStrength.color}`}
                      style={{ width: `${pwdStrength.score}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="signup-confirm-password" className="block text-xs font-semibold text-[#dfe9e2] mb-1.5">
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
                  className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 pl-10 pr-10 text-sm text-white placeholder-[#5a6560] transition-all focus:border-[#58e65b] focus:bg-black/80 focus:outline-none focus:ring-1 focus:ring-[#58e65b]"
                />
                <Lock size={16} className="absolute left-3.5 top-3.5 text-[#8d9691]" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-3.5 text-[#8d9691] hover:text-white transition-colors cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-[11px] text-[#ff5555]">Passwords do not match.</p>
              )}
            </div>

            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer select-none text-xs text-[#8d9691] hover:text-[#dfe9e2]">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-white/20 bg-black/50 text-[#58e65b] focus:ring-0 focus:ring-offset-0 accent-[#58e65b]"
                />
                <span className="leading-snug">
                  I agree to PUREX Exchange's{' '}
                  <span className="text-[#58e65b] hover:underline">Terms of Service</span>,{' '}
                  <span className="text-[#58e65b] hover:underline">Privacy Policy</span>, and Risk Disclosure statements.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading || !agreeTerms}
              className="w-full rounded-xl bg-[#58e65b] py-3.5 text-sm font-bold text-black uppercase tracking-wider shadow-[0_0_25px_rgba(88,230,91,0.35)] transition-all hover:bg-[#48db50] hover:shadow-[0_0_35px_rgba(88,230,91,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer mt-3"
            >
              {isLoading ? (
                <span>Creating Institutional Portfolio...</span>
              ) : (
                <>
                  <span>Create Free Account</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Bottom Login Link */}
          <div className="mt-6 border-t border-white/10 pt-5 text-center text-xs text-[#8d9691]">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-bold text-[#58e65b] hover:text-[#78f17b] hover:underline transition-colors"
            >
              Log In Instead
            </Link>
          </div>
        </motion.div>

        {/* Security Trust Badges */}
        <div className="mt-6 flex items-center justify-center gap-6 text-[11px] text-[#8d9691]">
          <div className="flex items-center gap-1.5">
            <LockKeyhole size={13} className="text-[#58e65b]" />
            <span>256-Bit TLS Encryption</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield size={13} className="text-[#58e65b]" />
            <span>Multi-Sig Cold Storage</span>
          </div>
        </div>
      </div>
    </main>
  )
}
