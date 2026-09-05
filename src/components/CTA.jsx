import { ArrowRight, Sparkles } from 'lucide-react'
import { NavLink } from 'react-router-dom'

function CTA() {
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-10">
      <div className="relative overflow-hidden rounded-3xl border border-[#ff7a00]/30 bg-gradient-to-br from-[#15193b] via-[#1c2146] to-[#0e122b] p-8 sm:p-12 lg:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        {/* Glow ambient circle */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-[#ff7a00]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-96 h-96 bg-[#252c60]/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff7a00]/15 border border-[#ff7a00]/35 text-[#ff7a00] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={13} />
            <span>START YOUR TRADING JOURNEY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Institutional-Grade Crypto Trading. Built for the Next Billion.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Join over 2.4 million traders utilizing ultra-low latency execution, verified proof of reserves, and up to 18.5% automated staking yield.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <NavLink
              to="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff7a00] to-[#ff9500] px-8 py-3.5 text-sm font-bold text-white shadow-[0_0_25px_rgba(255,122,0,0.4)] hover:from-[#ff9500] hover:to-[#ffaa33] transition-all hover:scale-105"
            >
              Create Free Account
              <ArrowRight size={16} />
            </NavLink>
            <NavLink
              to="/markets"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold text-white hover:bg-white/10 hover:border-white/35 transition-all"
            >
              Explore 150+ Markets
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA
