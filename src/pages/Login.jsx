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
  Activity,
  TrendingUp,
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

  // Live Simulated Market Prices for Showcase
  const [marketPrices, setMarketPrices] = useState([
    { symbol: 'BTC/USDT', name: 'Bitcoin', price: 96850.00, change: '+4.82%', up: true },
    { symbol: 'ETH/USDT', name: 'Ethereum', price: 3480.20, change: '+3.15%', up: true },
    { symbol: 'SOL/USDT', name: 'Solana', price: 198.40, change: '+8.64%', up: true },
    { symbol: 'PUREX/USDT', name: 'Purex Token', price: 4.85, change: '+15.20%', up: true }
  ])

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

  // Subtle real-time price tick simulation
  useEffect(() => {
    const tickInterval = setInterval(() => {
      setMarketPrices((prev) =>
        prev.map((item) => {
          const delta = (Math.random() - 0.48) * (item.price * 0.001)
          const newPrice = Math.max(0.01, item.price + delta)
          return {
            ...item,
            price: Number(newPrice.toFixed(item.price > 100 ? 2 : 4))
          }
        })
      )
    }, 2800)
    return () => clearInterval(tickInterval)
  }, [])

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
      setSuccessMessage(`Welcome back, ${res.user?.fullName || 'Trader'}! Redirecting...`)
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
        setSuccessMessage('FIDO2 biometric verified! Redirecting...')
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
        setSuccessMessage('Authorized via Purex Mobile App! Redirecting...')
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
            Institutional-Grade Crypto Liquidity & Asset Gateway
          </p>
        </div>

        {/* 2-Column Symmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch justify-center">
          
          {/* ================= LEFT CARD: AUTHENTICATION CONTAINER ================= */}
          <div className="lg:col-span-7 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="h-full rounded-2xl border border-white/15 bg-[#080d0e]/95 p-4 sm:p-5 backdrop-blur-2xl shadow-[0_18px_60px_rgba(0,0,0,0.85)] relative overflow-hidden flex flex-col justify-between"
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
                <div>
                  {/* Compact Top Navigation Tabs */}
                  <div className="grid grid-cols-4 gap-1 rounded-xl bg-black/60 p-0.5 mb-3 border border-white/10">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('login')
                        setErrorMessage('')
                      }}
                      className={`rounded-lg py-1.5 text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${
                        activeTab === 'login'
                          ? 'bg-[#183a1d] text-[#58e65b] shadow-[0_0_12px_rgba(88,230,91,0.2)] border border-[#58e65b]/30'
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
                      className={`rounded-lg py-1.5 text-[10px] sm:text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                        activeTab === 'qrcode'
                          ? 'bg-[#183a1d] text-[#58e65b] shadow-[0_0_12px_rgba(88,230,91,0.2)] border border-[#58e65b]/30'
                          : 'text-[#8d9691] hover:text-white'
                      }`}
                    >
                      <QrCode size={12} />
                      <span>QR Code</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('web3')
                        setErrorMessage('')
                      }}
                      className={`rounded-lg py-1.5 text-[10px] sm:text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                        activeTab === 'web3'
                          ? 'bg-[#183a1d] text-[#58e65b] shadow-[0_0_12px_rgba(88,230,91,0.2)] border border-[#58e65b]/30'
                          : 'text-[#8d9691] hover:text-white'
                      }`}
                    >
                      <Wallet size={12} />
                      <span>Web3</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('passkey')
                        setErrorMessage('')
                      }}
                      className={`rounded-lg py-1.5 text-[10px] sm:text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                        activeTab === 'passkey'
                          ? 'bg-[#183a1d] text-[#58e65b] shadow-[0_0_12px_rgba(88,230,91,0.2)] border border-[#58e65b]/30'
                          : 'text-[#8d9691] hover:text-white'
                      }`}
                    >
                      <Fingerprint size={12} />
                      <span>Passkey</span>
                    </button>
                  </div>

                  {/* Feedback Diagnostic Messages */}
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

                  {/* TAB 1: STANDARD EMAIL & PASSWORD */}
                  {activeTab === 'login' && (
                    <form onSubmit={handleSubmit} className="space-y-2.5">
                      <div>
                        <label htmlFor="login-email" className="block text-[11px] font-semibold text-[#dfe9e2] mb-0.5">
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
                            className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2 pl-9 text-xs sm:text-sm text-white placeholder-[#5a6560] transition-all focus:border-[#58e65b] focus:bg-black/80 focus:outline-none focus:ring-1 focus:ring-[#58e65b]"
                          />
                          <Mail size={14} className="absolute left-3 top-2.5 text-[#8d9691]" />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-0.5">
                          <label htmlFor="login-password" className="text-[11px] font-semibold text-[#dfe9e2]">
                            Password
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveTab('forgot_password')
                              setErrorMessage('')
                            }}
                            className="text-[11px] font-semibold text-[#58e65b] hover:text-[#78f17b] hover:underline transition-colors cursor-pointer"
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
                            className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2 pl-9 pr-9 text-xs sm:text-sm text-white placeholder-[#5a6560] transition-all focus:border-[#58e65b] focus:bg-black/80 focus:outline-none focus:ring-1 focus:ring-[#58e65b]"
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
                      </div>

                      <div className="flex items-center justify-between text-[11px] pt-0.5">
                        <label className="flex items-center gap-1.5 cursor-pointer select-none text-[#8d9691] hover:text-[#dfe9e2]">
                          <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="h-3.5 w-3.5 rounded border-white/20 bg-black/50 text-[#58e65b] focus:ring-0 focus:ring-offset-0 accent-[#58e65b]"
                          />
                          <span>Keep me signed in for 30 days</span>
                        </label>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-xl bg-[#58e65b] py-2.5 text-xs font-bold text-black uppercase tracking-wider shadow-[0_0_20px_rgba(88,230,91,0.3)] transition-all hover:bg-[#48db50] hover:shadow-[0_0_30px_rgba(88,230,91,0.45)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                      >
                        {isLoading ? (
                          <span>Authenticating...</span>
                        ) : (
                          <>
                            <span>Log In to Purex</span>
                            <ArrowRight size={14} />
                          </>
                        )}
                      </button>

                      {/* 1-Click Instant Demo Presets */}
                      <div className="pt-2 border-t border-white/10 mt-2">
                        <div className="flex items-center gap-1 text-[10px] font-semibold text-[#8d9691] uppercase tracking-wider mb-1.5">
                          <Sparkles size={11} className="text-[#58e65b]" />
                          <span>1-Click Quick Fill Accounts:</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleQuickDemoLogin('trader@purex.exchange', 'Password123!')}
                            className="rounded-lg border border-white/10 bg-white/[0.03] p-1.5 text-left hover:border-[#58e65b]/40 hover:bg-[#183a1d]/30 transition-all cursor-pointer group"
                          >
                            <div className="text-[11px] font-bold text-white group-hover:text-[#58e65b] flex items-center justify-between">
                              <span>Alpha Trader</span>
                              <Zap size={10} className="text-[#58e65b]" />
                            </div>
                            <div className="text-[9px] text-[#8d9691] truncate font-mono">
                              trader@purex.exchange
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleQuickDemoLogin('investor@purex.exchange', 'Password123!')}
                            className="rounded-lg border border-white/10 bg-white/[0.03] p-1.5 text-left hover:border-[#58e65b]/40 hover:bg-[#183a1d]/30 transition-all cursor-pointer group"
                          >
                            <div className="text-[11px] font-bold text-white group-hover:text-[#58e65b] flex items-center justify-between">
                              <span>Institutional</span>
                              <Shield size={10} className="text-[#58e65b]" />
                            </div>
                            <div className="text-[9px] text-[#8d9691] truncate font-mono">
                              investor@purex.exchange
                            </div>
                          </button>
                        </div>
                      </div>
                    </form>
                  )}

                  {/* TAB 2: QR CODE INSTANT AUTH */}
                  {activeTab === 'qrcode' && (
                    <div className="text-center py-1 space-y-2.5">
                      <p className="text-[11px] text-[#8d9691]">
                        Scan with <span className="font-semibold text-white">Purex Mobile App</span> to authorize.
                      </p>

                      <div className="relative mx-auto w-32 h-32 rounded-xl bg-black border-2 border-[#58e65b]/40 p-2 shadow-[0_0_20px_rgba(88,230,91,0.2)] flex items-center justify-center overflow-hidden">
                        <div className="grid grid-cols-6 gap-1 w-full h-full p-1 bg-white rounded-lg">
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

                        {!qrCodeExpired && (
                          <motion.div
                            animate={{ y: [-50, 50, -50] }}
                            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                            className="absolute left-0 right-0 h-[2px] bg-[#58e65b] shadow-[0_0_10px_#58e65b]"
                          />
                        )}

                        {qrCodeExpired && (
                          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-2">
                            <span className="text-[11px] font-bold text-[#ff8080] mb-1">Expired</span>
                            <button
                              type="button"
                              onClick={handleRefreshQr}
                              className="rounded-md bg-[#58e65b] px-2 py-0.5 text-[10px] font-bold text-black flex items-center gap-1 hover:bg-[#48db50] transition-all cursor-pointer"
                            >
                              <RefreshCw size={10} />
                              <span>Refresh</span>
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-center gap-1 text-[11px] text-[#8d9691]">
                        <span>Expires:</span>
                        <span className="font-mono font-bold text-[#58e65b]">
                          {Math.floor(qrTimer / 60)}:{(qrTimer % 60).toString().padStart(2, '0')}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={handleSimulateQrScan}
                        disabled={isProcessing || qrCodeExpired}
                        className="w-full rounded-xl border border-[#58e65b]/40 bg-[#183a1d]/60 py-2 text-[11px] font-bold text-[#58e65b] hover:bg-[#58e65b] hover:text-black transition-all flex items-center justify-center gap-1 cursor-pointer shadow-[0_0_15px_rgba(88,230,91,0.15)]"
                      >
                        {isProcessing ? <RefreshCw size={12} className="animate-spin" /> : <Sparkles size={12} />}
                        <span>Simulate Mobile App QR Login</span>
                      </button>
                    </div>
                  )}

                  {/* TAB 3: WEB3 WALLET CONNECT */}
                  {activeTab === 'web3' && (
                    <div className="space-y-2 py-1">
                      <p className="text-[11px] text-[#8d9691] text-center mb-1.5">
                        Select Web3 wallet to sign cryptographic login.
                      </p>

                      <button
                        type="button"
                        onClick={() => handleWeb3Login('MetaMask')}
                        disabled={isProcessing}
                        className="w-full flex items-center justify-between rounded-xl border border-white/15 bg-black/60 p-2.5 text-xs font-bold text-white hover:border-[#58e65b] hover:bg-[#183a1d]/30 transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">🦊</span>
                          <span>MetaMask</span>
                        </div>
                        <span className="text-[11px] font-semibold text-[#58e65b]">Connect →</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleWeb3Login('WalletConnect')}
                        disabled={isProcessing}
                        className="w-full flex items-center justify-between rounded-xl border border-white/15 bg-black/60 p-2.5 text-xs font-bold text-white hover:border-[#58e65b] hover:bg-[#183a1d]/30 transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">🌐</span>
                          <span>WalletConnect</span>
                        </div>
                        <span className="text-[11px] font-semibold text-[#58e65b]">Connect →</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleWeb3Login('Phantom Wallet')}
                        disabled={isProcessing}
                        className="w-full flex items-center justify-between rounded-xl border border-white/15 bg-black/60 p-2.5 text-xs font-bold text-white hover:border-[#58e65b] hover:bg-[#183a1d]/30 transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">👻</span>
                          <span>Phantom (Solana & EVM)</span>
                        </div>
                        <span className="text-[11px] font-semibold text-[#58e65b]">Connect →</span>
                      </button>
                    </div>
                  )}

                  {/* TAB 4: PASSKEY / HARDWARE KEY */}
                  {activeTab === 'passkey' && (
                    <div className="text-center py-1 space-y-2.5">
                      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[#183a1d] border border-[#58e65b] text-[#58e65b] shadow-[0_0_20px_rgba(88,230,91,0.35)]">
                        <Fingerprint size={22} />
                      </div>

                      <div>
                        <h3 className="text-xs font-bold text-white">Biometric Passkey / YubiKey</h3>
                        <p className="text-[10px] text-[#8d9691] mt-0.5 max-w-xs mx-auto">
                          Touch ID, Windows Hello, Face ID, or FIDO2 key.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handlePasskeyLogin}
                        disabled={isProcessing}
                        className="w-full rounded-xl bg-[#58e65b] py-2.5 text-[11px] font-bold text-black uppercase tracking-wider shadow-[0_0_20px_rgba(88,230,91,0.3)] transition-all hover:bg-[#48db50] hover:shadow-[0_0_30px_rgba(88,230,91,0.45)] flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        {isProcessing ? (
                          <>
                            <RefreshCw size={13} className="animate-spin" />
                            <span>Reading Sensor...</span>
                          </>
                        ) : (
                          <>
                            <Fingerprint size={13} />
                            <span>Authenticate Passkey</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Bottom Sign-Up Link */}
                  <div className="mt-2.5 border-t border-white/10 pt-2 text-center text-[11px] text-[#8d9691]">
                    Don't have an institutional account?{' '}
                    <Link
                      to="/signup"
                      className="font-bold text-[#58e65b] hover:text-[#78f17b] hover:underline transition-colors"
                    >
                      Create Purex Account
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* ================= RIGHT CARD: INSTITUTIONAL SHOWCASE ================= */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            
            {/* Real-time Crypto Market Rates Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              className="rounded-2xl border border-white/15 bg-[#080d0e]/90 p-3.5 backdrop-blur-xl shadow-[0_16px_50px_rgba(0,0,0,0.5)] relative"
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
                <div className="flex items-center gap-1.5">
                  <Activity size={13} className="text-[#58e65b]" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white">Live Market Liquidity</span>
                </div>
                <span className="text-[9px] font-mono text-[#58e65b] bg-[#183a1d] px-1.5 py-0.5 rounded-full border border-[#58e65b]/30">
                  Real-Time
                </span>
              </div>

              <div className="space-y-1.5">
                {marketPrices.map((item) => (
                  <div
                    key={item.symbol}
                    className="flex items-center justify-between rounded-lg bg-white/[0.02] p-1.5 hover:bg-white/[0.05] transition-colors"
                  >
                    <div>
                      <div className="text-[11px] font-bold text-white">{item.symbol}</div>
                      <div className="text-[9px] text-[#8d9691]">{item.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-[11px] font-bold text-white">
                        ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-[9px] font-bold text-[#58e65b] flex items-center justify-end gap-0.5">
                        <TrendingUp size={9} />
                        <span>{item.change}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Institutional Security & Execution Metrics Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.15 }}
              className="rounded-2xl border border-white/15 bg-[#080d0e]/90 p-3.5 backdrop-blur-xl shadow-[0_16px_50px_rgba(0,0,0,0.5)]"
            >
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-white mb-2 flex items-center gap-1.5">
                <Shield size={13} className="text-[#58e65b]" />
                <span>Institutional Architecture</span>
              </h4>

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-white/10 bg-black/40 p-2">
                  <div className="text-[9px] text-[#8d9691]">Execution Latency</div>
                  <div className="font-mono text-sm font-black text-[#58e65b] mt-0.5">&lt; 4.2ms</div>
                  <div className="text-[8px] text-[#8d9691]">Equinix NY4 / LD4</div>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/40 p-2">
                  <div className="text-[9px] text-[#8d9691]">SAFU Insurance</div>
                  <div className="font-mono text-sm font-black text-white mt-0.5">$500M+</div>
                  <div className="text-[8px] text-[#8d9691]">Multi-Sig Cold Vault</div>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/40 p-2">
                  <div className="text-[9px] text-[#8d9691]">24h Volume</div>
                  <div className="font-mono text-sm font-black text-white mt-0.5">$2.48B</div>
                  <div className="text-[8px] text-[#8d9691]">Tier 1 Deep Book</div>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/40 p-2">
                  <div className="text-[9px] text-[#8d9691]">Proof of Reserves</div>
                  <div className="font-mono text-sm font-black text-[#58e65b] mt-0.5">100% Verified</div>
                  <div className="text-[8px] text-[#8d9691]">Merkle Tree Audited</div>
                </div>
              </div>
            </motion.div>

            {/* Gateway Nodes Health Status */}
            <div className="rounded-xl border border-[#58e65b]/20 bg-[#183a1d]/30 p-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <span className="flex h-1.5 w-1.5 rounded-full bg-[#58e65b] animate-ping" />
                <span className="font-semibold text-[#dfe9e2] text-[11px]">Nodes: 100% Operational</span>
              </div>
              <span className="text-[9px] font-mono text-[#8d9691]">0.8ms jitter</span>
            </div>

          </div>
        </div>

        {/* Compact Centered Security Compliance Bar */}
        <div className="mt-3 flex items-center justify-center gap-5 text-[10px] text-[#8d9691]">
          <div className="flex items-center gap-1">
            <LockKeyhole size={11} className="text-[#58e65b]" />
            <span>256-Bit TLS</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield size={11} className="text-[#58e65b]" />
            <span>SOC2 & ISO 27001</span>
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
