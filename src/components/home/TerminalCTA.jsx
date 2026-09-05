import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Sparkles, CheckCircle2, Zap } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'

export default function TerminalCTA() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleStart = (e) => {
    e.preventDefault()
    if (email.trim()) {
      navigate(`/signup?email=${encodeURIComponent(email.trim())}`)
    } else {
      navigate('/signup')
    }
  }

  return (
    <section className="relative mx-auto max-w-[1440px] px-3.5 py-4 sm:px-6 lg:px-10">
      <div className="relative rounded-3xl border border-[#ff7a00]/30 bg-gradient-to-b from-[#1b204c] via-[#141838] to-[#0f1228] p-6 sm:p-9 lg:p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Glow ambient background element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[550px] h-[260px] bg-[#ff7a00]/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#ff7a00]/40 bg-[#ff7a00]/20 px-3.5 py-1 text-xs font-bold text-white backdrop-blur-md">
            <Sparkles size={13} className="text-[#ff7a00]" />
            <span>EXCLUSIVE NEW TRADER INCENTIVE</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
            Start Trading with 0% Fees & <br />
            <span className="bg-gradient-to-r from-[#ff7a00] via-[#ff9500] to-amber-300 bg-clip-text text-transparent">
              Earn Daily Automated Yield
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            Create an account in less than 60 seconds. Claim your $100 fee credit and unlock deep institutional crypto liquidity.
          </p>

          {/* Quick Onboarding Form with Orange Pill Button */}
          <form
            onSubmit={handleStart}
            className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto pt-1"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email to sign up"
              className="w-full sm:flex-1 rounded-full border border-white/15 bg-[#0f1228] px-5 py-3 text-xs sm:text-sm font-mono text-white placeholder-slate-400 focus:border-[#ff7a00] focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff7a00] to-[#ff9500] px-7 py-3 text-xs sm:text-sm font-black text-white shadow-[0_0_24px_rgba(255,122,0,0.6)] hover:shadow-[0_0_32px_rgba(255,122,0,0.8)] hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap uppercase tracking-wider"
            >
              <span>Get Started Free</span>
              <ArrowRight size={15} />
            </button>
          </form>

          {/* Trust Highlights Strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 pt-3 text-[11px] text-slate-300 border-t border-white/10 max-w-2xl mx-auto">
            <div className="flex items-center gap-1">
              <CheckCircle2 size={13} className="text-[#ff7a00]" />
              <span>0% Deposit Fees</span>
            </div>
            <div className="flex items-center gap-1">
              <ShieldCheck size={13} className="text-[#ff7a00]" />
              <span>$125M SAFU Protected</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap size={13} className="text-[#ff7a00]" />
              <span>Instant Settlements</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 size={13} className="text-[#ff7a00]" />
              <span>24/7 Live Desk</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
