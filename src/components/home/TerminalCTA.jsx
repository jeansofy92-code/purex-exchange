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
    <section className="relative mx-auto max-w-[1440px] px-3.5 py-12 sm:px-6 lg:px-10">
      <div className="relative rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-[#0e1b15] via-[#090e14] to-[#050709] p-8 sm:p-12 lg:p-16 text-center shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Glow ambient background element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/60 px-4 py-1.5 text-xs font-bold text-emerald-400 backdrop-blur-md">
            <Sparkles size={14} />
            <span>EXCLUSIVE NEW TRADER INCENTIVE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Start Trading with Zero Fees & <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Earn Daily Automated Yield
            </span>
          </h2>

          <p className="text-xs sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto">
            Create an account in less than 60 seconds. Claim your $100 fee credit and unlock deep institutional crypto liquidity.
          </p>

          {/* Quick Onboarding Form */}
          <form
            onSubmit={handleStart}
            className="flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-md mx-auto pt-2"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full sm:flex-1 rounded-xl border border-slate-700 bg-slate-950/90 px-4 py-3.5 text-sm font-mono text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-[0_0_20px_rgba(52,211,153,0.35)] hover:bg-emerald-300 transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
            >
              <span>Get Started</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Trust Highlights Strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4 text-xs text-slate-400 border-t border-slate-800/80 max-w-2xl mx-auto">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-400" />
              <span>0% Deposit Fees</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>$125M SAFU Protected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap size={14} className="text-emerald-400" />
              <span>Instant Settlements</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-400" />
              <span>24/7 Live Desk</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
