import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Sparkles, TrendingUp, Users, Zap } from 'lucide-react'
import { NavLink } from 'react-router-dom'

function AboutHero() {
  return (
    <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
      {/* Background radial glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#ff7a00]/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#38bdf8]/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission Write-up */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Top Mission Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ff7a00]/30 bg-[#ff7a00]/15 px-4 py-1.5 text-xs font-bold text-[#ff7a00] backdrop-blur-md shadow-[0_0_15px_rgba(255,122,0,0.2)]">
              <Sparkles size={14} className="animate-pulse" />
              <span>Democratizing Crypto Wealth For Everyone</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
              Making Crypto Investing{' '}
              <span className="bg-gradient-to-r from-[#ff7a00] via-[#ff9500] to-[#ffaa33] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,122,0,0.3)]">
                Effortless, Profitable & Accessible
              </span>
            </h1>

            {/* Mission & Vision Narrative Write-up */}
            <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              <p>
                At <span className="text-white font-bold">PUREX Exchange</span>, our core mission is simple yet revolutionary: to dismantle the barriers of traditional finance and high-volatility crypto trading, making smart, automated digital asset investments accessible to everyday individuals worldwide.
              </p>
              <p className="text-sm sm:text-base text-slate-400">
                You shouldn’t need a Wall Street hedge fund pedigree or years of technical chart analysis to grow your wealth. We leverage state-of-the-art quantitative AI trading models, cross-exchange arbitrage, and institutional cold-storage security to deliver steady, predictable daily returns — while you retain full control over your capital.
              </p>
            </div>

            {/* Quick Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#15193b]/80 p-3 backdrop-blur-sm">
                <div className="rounded-xl bg-[#ff7a00]/15 p-2 text-[#ff7a00]">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Daily ROI</div>
                  <div className="text-[0.7rem] text-slate-400">Up to 4.5% Daily</div>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#15193b]/80 p-3 backdrop-blur-sm">
                <div className="rounded-xl bg-[#ff7a00]/15 p-2 text-[#ff7a00]">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">100% Safe</div>
                  <div className="text-[0.7rem] text-slate-400">Principal Guarantee</div>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#15193b]/80 p-3 backdrop-blur-sm col-span-2 sm:col-span-1">
                <div className="rounded-xl bg-[#ff7a00]/15 p-2 text-[#ff7a00]">
                  <Zap size={18} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Instant Payout</div>
                  <div className="text-[0.7rem] text-slate-400">24/7 Withdrawals</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#investment-plans"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff7a00] to-[#ff9500] px-7 py-3.5 text-sm font-bold text-white shadow-[0_0_25px_rgba(255,122,0,0.4)] hover:from-[#ff9500] hover:to-[#ffaa33] hover:scale-105 transition-all"
              >
                <span>Explore Investment Plans</span>
                <ArrowRight size={16} />
              </a>

              <NavLink
                to="/signup"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-bold text-white hover:bg-white/10 hover:border-white/30 transition-all"
              >
                <span>Get Started Now</span>
              </NavLink>
            </div>
          </motion.div>

          {/* Right Column: Visual Card Cluster / Stats Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Glowing Backdrop Canvas */}
            <div className="relative rounded-3xl border border-white/15 bg-[#15193b]/90 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#ff7a00]/15 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Our Core Philosophy</div>
                    <div className="text-lg font-bold text-white">Financial Freedom Without Complexity</div>
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-[#ff7a00]/15 flex items-center justify-center text-[#ff7a00]">
                    <Users size={20} />
                  </div>
                </div>

                {/* Narrative bullet points */}
                <div className="space-y-3.5">
                  <div className="flex gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-[#ff7a00] shadow-[0_0_8px_#ff7a00] shrink-0" />
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-white">Zero Technical Barrier:</strong> You don't need complex bot coding or manual order monitoring. Our algorithms handle execution 24/7.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8] shrink-0" />
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-white">Predictable Daily Returns:</strong> Fixed daily percentage brackets guarantee you know exactly what returns to expect each day.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] shrink-0" />
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-white">Full Liquidity Freedom:</strong> Earn daily, withdraw daily, or compound. Your initial deposit is completely returned upon plan completion.
                    </p>
                  </div>
                </div>

                {/* Floating Metric Preview Box */}
                <div className="rounded-2xl border border-[#ff7a00]/30 bg-gradient-to-br from-[#1c2146] to-[#121639] p-4 shadow-[0_0_25px_rgba(255,122,0,0.15)]">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Average Client Daily Yield</span>
                    <span className="text-emerald-400 font-bold">100% On Time</span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <div className="text-2xl sm:text-3xl font-black text-white font-mono">+2.85%</div>
                    <div className="text-xs font-semibold text-[#ff7a00]">Daily Avg Across Plans</div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[0.7rem] text-slate-400 pt-2 border-t border-white/10">
                    <span>Active Contracts: 48,290+</span>
                    <span>Total Paid Out: $38.4M+</span>
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

export default AboutHero
