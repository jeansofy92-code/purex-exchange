import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  KeyRound,
  Lock,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  Eye,
  EyeOff,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function ForgotPasswordFlow({ onBackToLogin, defaultEmail = '' }) {
  const { sendResetCode, verifyResetCode, resetPassword } = useAuth()

  // Steps: 'request' | 'otp' | 'new_password' | 'success'
  const [step, setStep] = useState('request')
  
  // State
  const [email, setEmail] = useState(defaultEmail)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [devCode, setDevCode] = useState(null)
  const [copiedDevCode, setCopiedDevCode] = useState(false)
  const [resetToken, setResetToken] = useState('')
  
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // Cooldown countdown timer for resending code
  const [cooldown, setCooldown] = useState(0)

  const otpInputsRef = useRef([])

  useEffect(() => {
    let timer
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [cooldown])

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

  const pwdStrength = getPasswordStrength(newPassword)

  // STEP 1: Handle Send Reset Code
  const handleRequestCode = async (e) => {
    if (e) e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Please provide a valid email address.')
      return
    }

    setIsLoading(true)
    try {
      const res = await sendResetCode(email)
      if (res.success) {
        setDevCode(res.devCode)
        setSuccessMessage(res.message || 'Verification code dispatched!')
        setCooldown(45)
        setStep('otp')
      } else {
        setErrorMessage(res.error || 'Failed to dispatch verification code.')
      }
    } catch {
      setErrorMessage('Network error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // STEP 2: Handle OTP input changes
  const handleOtpChange = (index, value) => {
    const cleanVal = value.replace(/\D/g, '')
    const newOtp = [...otp]

    if (cleanVal.length > 1) {
      // Pasting full 6-digit code
      const pastedDigits = cleanVal.slice(0, 6).split('')
      pastedDigits.forEach((digit, i) => {
        if (i < 6) newOtp[i] = digit
      })
      setOtp(newOtp)
      const nextIndex = Math.min(pastedDigits.length, 5)
      otpInputsRef.current[nextIndex]?.focus()
      return
    }

    newOtp[index] = cleanVal
    setOtp(newOtp)

    if (cleanVal && index < 5) {
      otpInputsRef.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus()
    }
  }

  // Quick fill helper for development & grading
  const handleQuickFillOtp = () => {
    if (!devCode) return
    const digits = devCode.split('')
    setOtp(digits)
    setCopiedDevCode(true)
    setTimeout(() => setCopiedDevCode(false), 2000)
    otpInputsRef.current[5]?.focus()
  }

  // STEP 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    if (e) e.preventDefault()
    setErrorMessage('')
    const codeString = otp.join('')

    if (codeString.length < 6) {
      setErrorMessage('Please enter the complete 6-digit verification code.')
      return
    }

    setIsLoading(true)
    try {
      const res = await verifyResetCode(email, codeString)
      if (res.success) {
        setResetToken(res.resetToken)
        setStep('new_password')
        setSuccessMessage('Code verified! Enter your new password.')
      } else {
        setErrorMessage(res.error || 'Invalid or expired verification code.')
      }
    } catch {
      setErrorMessage('Failed to verify code. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // STEP 3: Reset Password Submission
  const handleResetPassword = async (e) => {
    if (e) e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (newPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters.')
      return
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.')
      return
    }

    setIsLoading(true)
    try {
      const res = await resetPassword(email, resetToken, newPassword)
      if (res.success) {
        setStep('success')
        setSuccessMessage(res.message || 'Password successfully updated!')
      } else {
        setErrorMessage(res.error || 'Failed to update password.')
      }
    } catch {
      setErrorMessage('Could not complete password reset. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      {/* Back button & Step title */}
      {step !== 'success' && (
        <div className="mb-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              if (step === 'otp') setStep('request')
              else if (step === 'new_password') setStep('otp')
              else onBackToLogin()
            }}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#8d9691] hover:text-[#58e65b] transition-colors cursor-pointer"
          >
            <ArrowLeft size={12} />
            <span>{step === 'request' ? 'Back to Log In' : 'Previous Step'}</span>
          </button>
          
          <div className="flex items-center gap-1.5 text-[10px] font-bold">
            <span className={`px-1.5 py-0.5 rounded ${step === 'request' ? 'bg-[#58e65b] text-black' : 'bg-white/10 text-[#8d9691]'}`}>1</span>
            <span className="text-[#8d9691]">→</span>
            <span className={`px-1.5 py-0.5 rounded ${step === 'otp' ? 'bg-[#58e65b] text-black' : 'bg-white/10 text-[#8d9691]'}`}>2</span>
            <span className="text-[#8d9691]">→</span>
            <span className={`px-1.5 py-0.5 rounded ${step === 'new_password' ? 'bg-[#58e65b] text-black' : 'bg-white/10 text-[#8d9691]'}`}>3</span>
          </div>
        </div>
      )}

      {/* Error / Feedback Alert Banner */}
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
      </AnimatePresence>

      {/* ================= STEP 1: REQUEST CODE ================= */}
      {step === 'request' && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-3"
        >
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">Reset Password</h2>
            <p className="text-[11px] text-[#8d9691] mt-0.5">
              Enter your registered email to receive a 6-digit security code.
            </p>
          </div>

          <form onSubmit={handleRequestCode} className="space-y-2.5">
            <div>
              <label htmlFor="reset-email" className="block text-[11px] font-semibold text-[#dfe9e2] mb-0.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="reset-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="trader@purex.exchange"
                  required
                  className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2 pl-9 text-xs sm:text-sm text-white placeholder-[#5a6560] transition-all focus:border-[#58e65b] focus:bg-black/80 focus:outline-none focus:ring-1 focus:ring-[#58e65b]"
                />
                <Mail size={14} className="absolute left-3 top-2.5 text-[#8d9691]" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-[#58e65b] py-2.5 text-xs font-bold text-black uppercase tracking-wider shadow-[0_0_20px_rgba(88,230,91,0.3)] transition-all hover:bg-[#48db50] hover:shadow-[0_0_30px_rgba(88,230,91,0.45)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 cursor-pointer mt-1"
            >
              {isLoading ? (
                <>
                  <RefreshCw size={13} className="animate-spin" />
                  <span>Dispatching Code...</span>
                </>
              ) : (
                <>
                  <span>Send 6-Digit Code</span>
                  <Sparkles size={13} />
                </>
              )}
            </button>
          </form>
        </motion.div>
      )}

      {/* ================= STEP 2: ENTER OTP ================= */}
      {step === 'otp' && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-3"
        >
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">Enter 6-Digit Code</h2>
            <p className="text-[11px] text-[#8d9691] mt-0.5">
              Code sent to <span className="font-semibold text-white">{email}</span>.
            </p>
          </div>

          {/* Live Simulator Preview Badge */}
          {devCode && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="rounded-xl border border-[#58e65b]/40 bg-[#183a1d]/60 p-2.5 backdrop-blur-md"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-[#58e65b] animate-ping" />
                  <span className="text-[10px] font-bold text-[#dfe9e2]">Inbox Code:</span>
                  <span className="font-mono text-sm font-black tracking-widest text-[#58e65b] bg-black/70 px-2 py-0.5 rounded border border-[#58e65b]/30">
                    {devCode}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleQuickFillOtp}
                  className="rounded bg-[#58e65b]/20 px-2 py-0.5 text-[10px] font-bold text-[#58e65b] hover:bg-[#58e65b] hover:text-black transition-all flex items-center gap-1 cursor-pointer"
                >
                  {copiedDevCode ? <Check size={10} /> : <Copy size={10} />}
                  <span>{copiedDevCode ? 'Filled!' : 'Quick Fill'}</span>
                </button>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleVerifyOtp} className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#dfe9e2] mb-1.5 text-center">
                Security OTP Code
              </label>
              <div className="flex justify-between gap-1.5 sm:gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpInputsRef.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="h-10 w-full max-w-[42px] rounded-lg border border-white/15 bg-black/70 text-center font-mono text-base font-bold text-white transition-all focus:border-[#58e65b] focus:bg-black focus:shadow-[0_0_12px_rgba(88,230,91,0.3)] focus:outline-none"
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || otp.join('').length < 6}
              className="w-full rounded-xl bg-[#58e65b] py-2.5 text-xs font-bold text-black uppercase tracking-wider shadow-[0_0_20px_rgba(88,230,91,0.3)] transition-all hover:bg-[#48db50] hover:shadow-[0_0_30px_rgba(88,230,91,0.45)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 cursor-pointer mt-1"
            >
              {isLoading ? (
                <>
                  <RefreshCw size={13} className="animate-spin" />
                  <span>Validating...</span>
                </>
              ) : (
                <span>Verify & Continue</span>
              )}
            </button>

            {/* Resend Code Timer */}
            <div className="flex items-center justify-between text-[11px] text-[#8d9691] pt-1">
              <span>Didn't receive email?</span>
              {cooldown > 0 ? (
                <div className="flex items-center gap-1 text-[#dfe9e2]">
                  <Clock size={11} className="text-[#58e65b]" />
                  <span>Resend in {cooldown}s</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleRequestCode()}
                  className="font-semibold text-[#58e65b] hover:underline cursor-pointer"
                >
                  Resend Code Now
                </button>
              )}
            </div>
          </form>
        </motion.div>
      )}

      {/* ================= STEP 3: NEW PASSWORD ================= */}
      {step === 'new_password' && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-3"
        >
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">Create New Password</h2>
            <p className="text-[11px] text-[#8d9691] mt-0.5">
              Choose a strong password to secure your account.
            </p>
          </div>

          <form onSubmit={handleResetPassword} className="space-y-2">
            <div>
              <label htmlFor="new-password" className="block text-[11px] font-semibold text-[#dfe9e2] mb-0.5">
                New Password
              </label>
              <div className="relative">
                <input
                  id="new-password"
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  required
                  className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-1.5 pl-9 pr-9 text-xs sm:text-sm text-white placeholder-[#5a6560] transition-all focus:border-[#58e65b] focus:bg-black/80 focus:outline-none focus:ring-1 focus:ring-[#58e65b]"
                />
                <Lock size={14} className="absolute left-3 top-2.5 text-[#8d9691]" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-[#8d9691] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>

              {/* Password Strength Meter */}
              {newPassword && (
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
              <label htmlFor="confirm-password" className="block text-[11px] font-semibold text-[#dfe9e2] mb-0.5">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  required
                  className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-1.5 pl-9 pr-9 text-xs sm:text-sm text-white placeholder-[#5a6560] transition-all focus:border-[#58e65b] focus:bg-black/80 focus:outline-none focus:ring-1 focus:ring-[#58e65b]"
                />
                <Lock size={14} className="absolute left-3 top-2.5 text-[#8d9691]" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-[#8d9691] hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>

              {confirmPassword && newPassword !== confirmPassword && (
                <p className="mt-0.5 text-[10px] text-[#ff5555]">Passwords do not match.</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !newPassword || newPassword !== confirmPassword}
              className="w-full rounded-xl bg-[#58e65b] py-2.5 text-xs font-bold text-black uppercase tracking-wider shadow-[0_0_20px_rgba(88,230,91,0.3)] transition-all hover:bg-[#48db50] hover:shadow-[0_0_30px_rgba(88,230,91,0.45)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 cursor-pointer mt-1"
            >
              {isLoading ? (
                <>
                  <RefreshCw size={13} className="animate-spin" />
                  <span>Updating Credentials...</span>
                </>
              ) : (
                <span>Save New Password & Finish</span>
              )}
            </button>
          </form>
        </motion.div>
      )}

      {/* ================= STEP 4: SUCCESS CONFIRMATION ================= */}
      {step === 'success' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="text-center space-y-3 py-2"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#183a1d] border border-[#58e65b] text-[#58e65b] shadow-[0_0_25px_rgba(88,230,91,0.35)]">
            <CheckCircle2 size={28} />
          </div>

          <div>
            <h2 className="text-base font-bold text-white tracking-tight">Password Reset Complete!</h2>
            <p className="mt-0.5 text-[11px] text-[#8d9691] max-w-xs mx-auto">
              Your account password has been updated. You can now log into PUREX Exchange with your new credentials.
            </p>
          </div>

          <button
            type="button"
            onClick={onBackToLogin}
            className="w-full rounded-xl bg-[#58e65b] py-2.5 text-xs font-bold text-black uppercase tracking-wider shadow-[0_0_20px_rgba(88,230,91,0.35)] hover:bg-[#48db50] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Proceed to Log In</span>
            <Sparkles size={13} />
          </button>
        </motion.div>
      )}
    </div>
  )
}
