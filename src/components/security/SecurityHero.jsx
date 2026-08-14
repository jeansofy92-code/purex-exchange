import { motion } from 'framer-motion'
import { Shield, Lock, Activity, CheckCircle2, ArrowRight } from 'lucide-react'
import { NavLink } from 'react-router-dom'

function SecurityHero() {
  return (
    <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#58e65b]/10 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-80 h-80 bg-[#38bdf8]/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & System Status */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Live Security Status Pill */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#58e65b]/40 bg-[#183a1d]/70 px-4 py-1.5 text-xs font-bold text-[#58e65b] backdrop-blur-md shadow-[0_0_20px_rgba(88,230,91,0.25)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#58e65b] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#58e65b]" />
              </span>
              <span>All Security Systems 100% Operational • Zero Breaches</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
              Institutional-Grade{' '}
              <span className="bg-gradient-to-r from-[#58e65b] via-[#a3f7a5] to-[#38bdf8] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(88,230,91,0.35)]">
                Defense Architecture
              </span>
              . Zero Compromises.
            </h1>

            {/* Subheading narrative */}
            <p className="text-sm sm:text-lg text-[#8d9691] leading-relaxed max-w-2xl font-normal">
              At PUREX, security isn’t just a feature — it’s the foundational pillar of everything we engineer. From multi-party computation (MPC) cold storage and automated anomaly circuit breakers to a dedicated $100M SAFU insurance fund, your assets are shielded around the clock.
            </p>

            {/* Quick Live Security Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 backdrop-blur-sm">
                <div className="text-[0.68rem] font-bold uppercase tracking-wider text-[#8d9691]">
                  Cold Storage Ratio
                </div>
                <div className="mt-1 text-xl sm:text-2xl font-black font-mono text-white flex items-baseline gap-1">
                  <span>98.4%</span>
                  <span className="text-xs text-[#58e65b] font-bold">Air-Gapped</span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 backdrop-blur-sm">
                <div className="text-[0.68rem] font-bold uppercase tracking-wider text-[#8d9691]">
                  Emergency Reserve
                </div>
                <div className="mt-1 text-xl sm:text-2xl font-black font-mono text-[#58e65b]">
                  $100,000,000
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 backdrop-blur-sm col-span-2 sm:col-span-1">
                <div className="text-[0.68rem] font-bold uppercase tracking-wider text-[#8d9691]">
                  Proof of Reserves
                </div>
                <div className="mt-1 text-xl sm:text-2xl font-black font-mono text-white flex items-center gap-1.5">
                  <span>1:1</span>
                  <CheckCircle2 size={16} className="text-[#58e65b]" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#security-layers"
                className="inline-flex items-center gap-2 rounded-xl bg-[#58e65b] px-6 py-3.5 text-sm font-extrabold text-black shadow-[0_0_25px_rgba(88,230,91,0.4)] hover:bg-[#48db50] hover:scale-105 transition-all"
              >
                <span>Explore Defense Layers</span>
                <ArrowRight size={16} />
              </a>

              <NavLink
                to="/signup"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/10 hover:border-white/30 transition-all"
              >
                <span>Create Protected Account</span>
              </NavLink>
            </div>
          </motion.div>

          {/* Right Column: Holographic Shield Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl border border-white/15 bg-[#080d0e]/95 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_24px_70px_rgba(0,0,0,0.9)] overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#58e65b]/20 rounded-full blur-3xl pointer-events-none" />

              {/* Shield Core Visual Container */}
              <div className="relative py-8 flex flex-col items-center justify-center">
                <div className="relative flex items-center justify-center">
                  {/* Concentric glowing pulse rings */}
                  <div className="absolute h-52 w-52 rounded-full border border-[#58e65b]/20 animate-ping opacity-25" />
                  <div className="absolute h-44 w-44 rounded-full border border-[#58e65b]/40 shadow-[0_0_30px_rgba(88,230,91,0.2)]" />
                  <div className="absolute h-36 w-36 rounded-full border border-[#38bdf8]/40" />

                  {/* Center Shield Icon */}
                  <div className="relative z-10 h-28 w-28 rounded-3xl bg-gradient-to-tr from-[#183a1d] to-[#0c1f10] border-2 border-[#58e65b] flex items-center justify-center text-[#58e65b] shadow-[0_0_40px_rgba(88,230,91,0.5)]">
                    <Shield size={60} strokeWidth={1.75} />
                  </div>
                </div>

                <div className="mt-8 text-center space-y-1">
                  <div className="text-base font-black text-white">PUREX SENTRY ACTIVE</div>
                  <div className="text-xs text-[#8d9691]">End-to-End Cryptographic Isolation</div>
                </div>

                {/* Sub-cards inside visual */}
                <div className="mt-6 w-full space-y-2.5">
                  <div className="flex items-center justify-between p-2.5 rounded-xl border border-white/10 bg-black/40 text-xs">
                    <span className="flex items-center gap-2 text-[#dfe9e2]">
                      <Lock size={14} className="text-[#58e65b]" />
                      Multi-Party Computation (MPC)
                    </span>
                    <span className="text-[#58e65b] font-bold">Enforced</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl border border-white/10 bg-black/40 text-xs">
                    <span className="flex items-center gap-2 text-[#dfe9e2]">
                      <Activity size={14} className="text-[#38bdf8]" />
                      AI Threat Interceptor
                    </span>
                    <span className="text-[#38bdf8] font-bold">&lt; 1ms Latency</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default SecurityHero
