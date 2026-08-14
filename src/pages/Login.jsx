import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Wallet,
  Zap,
  Globe,
  LockKeyhole,
  QrCode,
  Fingerprint,
  RefreshCw
} from 'lucide-react'
import CoinLogo from '../components/CoinLogo'
import { useAuth } from '../context/AuthContext'
import ForgotPasswordFlow from '../components/auth/ForgotPasswordFlow'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isLoading } = useAuth()

  // Views: 'login' | 'forgot_password' | 'web3' | 'qrcode' | 'passkey'
  const [activeTab, setActiveTab] = useState('login')
  
  // Form State
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)

  // Status State
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  // QR Code Simulator State
  const [qrCodeExpired, setQrCodeExpired] = useState(false)
  const [qrTimer, setQrTimer] = useState(120)

  // Redirect destination after login
  const redirectPath = location.state?.from || '/trade'

  // QR Timer Countdown
  useEffect(() => {
    let interval
    if (activeTab === 'qrcode' && qrTimer > 0 && !qrCodeExpired) {
      interval = setInterval(() => {
        setQrTimer((prev) => {
          if (prev <= 1) {
            setQrCodeExpired(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [activeTab, qrTimer, qrCodeExpired])

  // Submit email/password login
  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (!email.trim() || !password) {
      setErrorMessage('Please enter your email address and password.')
      return
    }

    const res = await login(email, password)
    if (res.success) {
      setSuccessMessage(`Welcome back, ${res.user?.fullName || 'Trader'}! Redirecting to Terminal...`)
      setTimeout(() => {
        navigate(redirectPath)
      }, 900)
    } else {
      setErrorMessage(res.error || 'Invalid credentials. Please verify your details or click Forgot Password.')
    }
  }

  // Quick Demo Account Auto-Fill
  const handleQuickDemoLogin = (demoEmail, demoPass) => {
    setEmail(demoEmail)
    setPassword(demoPass)
    setErrorMessage('')
  }

  // Web3 Wallet Login simulation
  const handleWeb3Login = async (walletName) => {
    setIsProcessing(true)
    setErrorMessage('')

    setTimeout(async () => {
      setIsProcessing(false)
      const res = await login('trader@purex.exchange', 'Password123!')
      if (res.success) {
        setSuccessMessage(`Connected via ${walletName}! Authenticated as Institutional Trader.`)
        setTimeout(() => {
          navigate(redirectPath)
        }, 900)
      }
    }, 1100)
  }

  // Passkey / Hardware Key Simulation
  const handlePasskeyLogin = async () => {
    setIsProcessing(true)
    setErrorMessage('')

    setTimeout(async () => {
      setIsProcessing(false)
      const res = await login('investor@purex.exchange', 'Password123!')
      if (res.success) {
        setSuccessMessage('FIDO2 / YubiKey WebAuthn biometric verified! Redirecting...')
        setTimeout(() => {
          navigate(redirectPath)
        }, 900)
      }
    }, 1200)
  }

  // QR Code Simulator Scan
  const handleSimulateQrScan = async () => {
    setIsProcessing(true)
    setTimeout(async () => {
      setIsProcessing(false)
      const res = await login('trader@purex.exchange', 'Password123!')
      if (res.success) {
        setSuccessMessage('Authorized via Purex Mobile Authenticator App! Redirecting...')
        setTimeout(() => {
          navigate(redirectPath)
        }, 900)
      }
    }, 1000)
  }

  const handleRefreshQr = () => {
    setQrCodeExpired(false)
    setQrTimer(120)
  }

  return (
    <main className="home-page-shell min-h-screen relative flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 text-white">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-gradient-to-tr from-[#58e65b]/12 via-[#183a1d]/18 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Centered Main Container */}
      <div className="w-full max-w-[500px] z-10 mx-auto flex flex-col items-center">
        
        {/* Centered Brand Header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-3 group justify-center" aria-label="PUREX Exchange home">
            <div className="brand-mark-wrap transition-transform duration-300 group-hover:scale-105 shadow-[0_0_20px_rgba(88,230,91,0.3)]">
              <CoinLogo symbol="PUREX" size={38} className="brand-mark-svg" />
            </div>
            <div className="text-left leading-none">
              <div className="text-2xl font-black tracking-[0.18em] text-white">PUREX</div>
              <div className="text-[0.65rem] font-bold tracking-[0.3em] text-[#8d9691]">EXCHANGE</div>
            </div>
          </Link>
          <p className="mt-3 text-xs text-[#8d9691] font-medium tracking-wide">
            Institutional-Grade Crypto Liquidity & Asset Gateway
          </p>
        </div>

        {/* Centered Glassmorphic Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full rounded-3xl border border-white/15 bg-[#080d0e]/95 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.9)] relative overflow-hidden"
        >
          {/* Top neon border accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#58e65b] to-transparent opacity-90" />

          {/* View: Forgot Password Multi-Step Flow */}
          {activeTab === 'forgot_password' ? (
            <ForgotPasswordFlow
              defaultEmail={email}
              onBackToLogin={() => {
                setActiveTab('login')
                setErrorMessage('')
              }}
            />
          ) : (
            <>
              {/* Top Navigation Tabs */}
              <div className="grid grid-cols-4 gap-1 rounded-2xl bg-black/60 p-1 mb-6 border border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('login')
                    setErrorMessage('')
                  }}
                  className={`rounded-xl py-2 text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'login'
                      ? 'bg-[#183a1d] text-[#58e65b] shadow-[0_0_15px_rgba(88,230,91,0.2)] border border-[#58e65b]/30'
                      : 'text-[#8d9691] hover:text-white'
                  }`}
                >
                  Password
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('qrcode')
                    setErrorMessage('')
                  }}
                  className={`rounded-xl py-2 text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    activeTab === 'qrcode'
                      ? 'bg-[#183a1d] text-[#58e65b] shadow-[0_0_15px_rgba(88,230,91,0.2)] border border-[#58e65b]/30'
                      : 'text-[#8d9691] hover:text-white'
                  }`}
                >
                  <QrCode size={13} />
                  <span>QR Code</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('web3')
                    setErrorMessage('')
                  }}
                  className={`rounded-xl py-2 text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    activeTab === 'web3'
                      ? 'bg-[#183a1d] text-[#58e65b] shadow-[0_0_15px_rgba(88,230,91,0.2)] border border-[#58e65b]/30'
                      : 'text-[#8d9691] hover:text-white'
                  }`}
                >
                  <Wallet size={13} />
                  <span>Web3</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('passkey')
                    setErrorMessage('')
                  }}
                  className={`rounded-xl py-2 text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    activeTab === 'passkey'
                      ? 'bg-[#183a1d] text-[#58e65b] shadow-[0_0_15px_rgba(88,230,91,0.2)] border border-[#58e65b]/30'
                      : 'text-[#8d9691] hover:text-white'
                  }`}
                >
                  <Fingerprint size={13} />
                  <span>Passkey</span>
                </button>
              </div>

              {/* Feedback Diagnostic Messages */}
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

              {/* TAB 1: STANDARD EMAIL & PASSWORD */}
              {activeTab === 'login' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="login-email" className="block text-xs font-semibold text-[#dfe9e2] mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        id="login-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="trader@purex.exchange"
                        required
                        autoComplete="email"
                        className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 pl-10 text-sm text-white placeholder-[#5a6560] transition-all focus:border-[#58e65b] focus:bg-black/80 focus:outline-none focus:ring-1 focus:ring-[#58e65b]"
                      />
                      <Mail size={16} className="absolute left-3.5 top-3.5 text-[#8d9691]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="login-password" className="text-xs font-semibold text-[#dfe9e2]">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('forgot_password')
                          setErrorMessage('')
                        }}
                        className="text-xs font-semibold text-[#58e65b] hover:text-[#78f17b] hover:underline transition-colors cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        required
                        autoComplete="current-password"
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
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none text-[#8d9691] hover:text-[#dfe9e2]">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 rounded border-white/20 bg-black/50 text-[#58e65b] focus:ring-0 focus:ring-offset-0 accent-[#58e65b]"
                      />
                      <span>Keep me signed in for 30 days</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-xl bg-[#58e65b] py-3.5 text-sm font-bold text-black uppercase tracking-wider shadow-[0_0_25px_rgba(88,230,91,0.35)] transition-all hover:bg-[#48db50] hover:shadow-[0_0_35px_rgba(88,230,91,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    {isLoading ? (
                      <span>Authenticating Terminal...</span>
                    ) : (
                      <>
                        <span>Log In to Purex</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  {/* 1-Click Instant Demo Presets */}
                  <div className="pt-3 border-t border-white/10 mt-4">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#8d9691] uppercase tracking-wider mb-2">
                      <Sparkles size={13} className="text-[#58e65b]" />
                      <span>1-Click Quick Fill Accounts:</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleQuickDemoLogin('trader@purex.exchange', 'Password123!')}
                        className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-left hover:border-[#58e65b]/40 hover:bg-[#183a1d]/30 transition-all cursor-pointer group"
                      >
                        <div className="text-xs font-bold text-white group-hover:text-[#58e65b] flex items-center justify-between">
                          <span>Alpha Trader</span>
                          <Zap size={12} className="text-[#58e65b]" />
                        </div>
                        <div className="text-[10px] text-[#8d9691] truncate font-mono mt-0.5">
                          trader@purex.exchange
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleQuickDemoLogin('investor@purex.exchange', 'Password123!')}
                        className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-left hover:border-[#58e65b]/40 hover:bg-[#183a1d]/30 transition-all cursor-pointer group"
                      >
                        <div className="text-xs font-bold text-white group-hover:text-[#58e65b] flex items-center justify-between">
                          <span>Institutional</span>
                          <Shield size={12} className="text-[#58e65b]" />
                        </div>
                        <div className="text-[10px] text-[#8d9691] truncate font-mono mt-0.5">
                          investor@purex.exchange
                        </div>
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* TAB 2: QR CODE INSTANT AUTH */}
              {activeTab === 'qrcode' && (
                <div className="text-center py-2 space-y-4">
                  <p className="text-xs text-[#8d9691]">
                    Scan this QR code with the <span className="font-semibold text-white">Purex Mobile App</span> to instantly authorize your trading terminal session.
                  </p>

                  <div className="relative mx-auto w-44 h-44 rounded-2xl bg-black border-2 border-[#58e65b]/40 p-3 shadow-[0_0_30px_rgba(88,230,91,0.25)] flex items-center justify-center overflow-hidden">
                    {/* QR Code graphic representation */}
                    <div className="grid grid-cols-6 gap-1 w-full h-full p-2 bg-white rounded-xl">
                      {Array.from({ length: 36 }).map((_, i) => (
                        <div
                          key={i}
                          className={`rounded-sm ${
                            (i % 2 === 0 && i % 3 === 0) || i < 8 || i > 28 || i === 14 || i === 21
                              ? 'bg-black'
                              : 'bg-black/10'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Scanner Laser Bar Animation */}
                    {!qrCodeExpired && (
                      <motion.div
                        animate={{ y: [-70, 70, -70] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                        className="absolute left-0 right-0 h-[3px] bg-[#58e65b] shadow-[0_0_15px_#58e65b]"
                      />
                    )}

                    {/* Expired Overlay */}
                    {qrCodeExpired && (
                      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-3">
                        <span className="text-xs font-bold text-[#ff8080] mb-2">QR Code Expired</span>
                        <button
                          type="button"
                          onClick={handleRefreshQr}
                          className="rounded-xl bg-[#58e65b] px-3 py-1.5 text-xs font-bold text-black flex items-center gap-1 hover:bg-[#48db50] transition-all cursor-pointer"
                        >
                          <RefreshCw size={12} />
                          <span>Refresh</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs text-[#8d9691]">
                    <span>Code expires in:</span>
                    <span className="font-mono font-bold text-[#58e65b]">
                      {Math.floor(qrTimer / 60)}:{(qrTimer % 60).toString().padStart(2, '0')}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleSimulateQrScan}
                    disabled={isProcessing || qrCodeExpired}
                    className="w-full rounded-xl border border-[#58e65b]/40 bg-[#183a1d]/60 py-3 text-xs font-bold text-[#58e65b] hover:bg-[#58e65b] hover:text-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(88,230,91,0.2)]"
                  >
                    {isProcessing ? <RefreshCw size={14} className="animate-spin" /> : <Sparkles size={14} />}
                    <span>Simulate Mobile App QR Scan & Login</span>
                  </button>
                </div>
              )}

              {/* TAB 3: WEB3 WALLET CONNECT */}
              {activeTab === 'web3' && (
                <div className="space-y-3 py-2">
                  <p className="text-xs text-[#8d9691] text-center mb-3">
                    Select your Web3 self-custody wallet to authenticate via cryptographic signature.
                  </p>

                  <button
                    type="button"
                    onClick={() => handleWeb3Login('MetaMask')}
                    disabled={isProcessing}
                    className="w-full flex items-center justify-between rounded-2xl border border-white/15 bg-black/60 p-3.5 text-sm font-bold text-white hover:border-[#58e65b] hover:bg-[#183a1d]/30 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center text-base">
                        🦊
                      </div>
                      <span>MetaMask</span>
                    </div>
                    <span className="text-xs font-semibold text-[#58e65b]">Connect →</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleWeb3Login('WalletConnect')}
                    disabled={isProcessing}
                    className="w-full flex items-center justify-between rounded-2xl border border-white/15 bg-black/60 p-3.5 text-sm font-bold text-white hover:border-[#58e65b] hover:bg-[#183a1d]/30 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-base">
                        🌐
                      </div>
                      <span>WalletConnect</span>
                    </div>
                    <span className="text-xs font-semibold text-[#58e65b]">Connect →</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleWeb3Login('Phantom Wallet')}
                    disabled={isProcessing}
                    className="w-full flex items-center justify-between rounded-2xl border border-white/15 bg-black/60 p-3.5 text-sm font-bold text-white hover:border-[#58e65b] hover:bg-[#183a1d]/30 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-base">
                        👻
                      </div>
                      <span>Phantom (Solana & EVM)</span>
                    </div>
                    <span className="text-xs font-semibold text-[#58e65b]">Connect →</span>
                  </button>
                </div>
              )}

              {/* TAB 4: PASSKEY / HARDWARE KEY */}
              {activeTab === 'passkey' && (
                <div className="text-center py-4 space-y-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#183a1d] border-2 border-[#58e65b] text-[#58e65b] shadow-[0_0_30px_rgba(88,230,91,0.4)]">
                    <Fingerprint size={32} />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white">Biometric Passkey / YubiKey</h3>
                    <p className="text-xs text-[#8d9691] mt-1 max-w-xs mx-auto">
                      Authenticate with Touch ID, Windows Hello, Face ID, or a FIDO2 hardware security key.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handlePasskeyLogin}
                    disabled={isProcessing}
                    className="w-full rounded-xl bg-[#58e65b] py-3.5 text-sm font-bold text-black uppercase tracking-wider shadow-[0_0_25px_rgba(88,230,91,0.35)] transition-all hover:bg-[#48db50] hover:shadow-[0_0_35px_rgba(88,230,91,0.5)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" />
                        <span>Reading Security Sensor...</span>
                      </>
                    ) : (
                      <>
                        <Fingerprint size={16} />
                        <span>Authenticate Passkey</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Bottom Sign-Up Link */}
              <div className="mt-6 border-t border-white/10 pt-5 text-center text-xs text-[#8d9691]">
                Don't have an institutional account?{' '}
                <Link
                  to="/signup"
                  className="font-bold text-[#58e65b] hover:text-[#78f17b] hover:underline transition-colors"
                >
                  Create Purex Account
                </Link>
              </div>
            </>
          )}
        </motion.div>

        {/* Centered Security Compliance Bar */}
        <div className="mt-6 flex items-center justify-center gap-6 text-[11px] text-[#8d9691]">
          <div className="flex items-center gap-1.5">
            <LockKeyhole size={13} className="text-[#58e65b]" />
            <span>256-Bit TLS</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield size={13} className="text-[#58e65b]" />
            <span>SOC2 & ISO 27001</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Globe size={13} className="text-[#58e65b]" />
            <span>99.99% Uptime</span>
          </div>
        </div>
      </div>
    </main>
  )
}
