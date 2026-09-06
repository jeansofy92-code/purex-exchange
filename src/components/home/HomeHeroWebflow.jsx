import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react'
import heroMockup from '../../assets/brand/purex-hero-scene.png'

export default function HomeHeroWebflow() {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Content Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#161936] px-3.5 py-1 text-xs font-semibold text-slate-300"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Next-Gen Crypto Exchange & Trading Bots</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]"
            >
              Buy and trade cryptos like never before.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed"
            >
              Experience seamless sub-millisecond spot trading, institutional liquidity, automated high-yield AI trading bots, and cold vault multi-sig security.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link
                to="/signup"
                className="rounded-full bg-[#356df1] hover:bg-[#2b5bd4] px-8 py-3.5 text-sm font-bold text-white transition-all shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 cursor-pointer"
              >
                Get Started
              </Link>
              <a
                href="#staking-matrix"
                className="rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 px-8 py-3.5 text-sm font-bold text-white transition-all cursor-pointer"
              >
                View Trading Bots
              </a>
            </motion.div>

            {/* Trust points */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-6 pt-4 text-xs font-semibold text-slate-400 border-t border-white/10"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span>0% Deposit Fees</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#356df1]" />
                <span>$125M SAFU Insured</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">99.99%</span>
                <span>Uptime SLA</span>
              </div>
            </motion.div>
          </div>

          {/* Right Image/Mockup Showcase Column */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl border border-white/10 bg-[#141732] p-3 sm:p-4 shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden">
              <img
                src={heroMockup}
                alt="Purex Exchange Web App"
                className="w-full h-auto rounded-2xl object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
