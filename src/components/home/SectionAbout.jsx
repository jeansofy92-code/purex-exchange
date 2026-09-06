import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Send,
  BarChart2,
  ShieldCheck,
  Zap,
  Bot,
  ArrowRight,
  Flame
} from 'lucide-react'
import pantherImg from '../../assets/brand/bot-growth-panther.jpg'

export default function SectionAbout() {
  return (
    <section className="py-16 md:py-24 bg-[#0a0c1a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight"
          >
            More than a typical crypto exchange
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-400 text-sm sm:text-base leading-relaxed"
          >
            Engineered for traders and passive investors seeking institutional-grade security, lightning-fast order execution, and automated daily yields.
          </motion.p>
        </div>

        {/* 5-Card Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {/* Card 1: Send & Receive */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl border border-white/10 bg-[#141733] p-7 space-y-4 hover:border-white/20 transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#20254b] text-[#356df1] border border-white/5">
                <Send size={22} />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">Send & Receive</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Deposit and withdraw instantly across Bitcoin, Ethereum, Solana, TRON, and USDT with zero added platform fees.
              </p>
            </div>
          </motion.div>

          {/* Card 2 (Featured): Cyber Cat Trading Bots */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-1 rounded-3xl border border-[#ff7a00]/30 bg-[#161a3b] p-7 space-y-4 hover:border-[#ff7a00]/60 transition-all flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ff7a00]/15 text-[#ff7a00] border border-[#ff7a00]/30">
                  <Flame size={22} className="fill-current" />
                </div>
                <span className="rounded-full bg-[#ff7a00]/15 text-[#ff7a00] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-[#ff7a00]/30">
                  Up to 4.2%/day
                </span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">AI Trading Bots</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Automate your trading with 4 specialized quantitative cat bots executing arbitrage and grid scalping 24/7.
              </p>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-3 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl overflow-hidden shrink-0 border border-white/15">
                  <img src={pantherImg} alt="Alpha Panther" className="h-full w-full object-cover" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-white">Alpha Panther Bot</div>
                  <div className="text-emerald-400 font-mono font-bold">+2.40% Daily ROI</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Trading Charts */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl border border-white/10 bg-[#141733] p-7 space-y-4 hover:border-white/20 transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#20254b] text-[#356df1] border border-white/5">
                <BarChart2 size={22} />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">Trading Charts</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Sub-millisecond candlestick charts with customizable timeframes, live order book depth, and technical indicators.
              </p>
            </div>
          </motion.div>

          {/* Card 4: 100% Secure Wallet */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl border border-white/10 bg-[#141733] p-7 space-y-4 hover:border-white/20 transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#20254b] text-emerald-400 border border-white/5">
                <ShieldCheck size={22} />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">100% Secure Wallet</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                98% of user digital assets are held in isolated air-gapped cold storage vaults backed by our $125M SAFU Insurance fund.
              </p>
            </div>
          </motion.div>

          {/* Card 5: Real Time Trading */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-2 lg:col-span-2 rounded-3xl border border-white/10 bg-[#141733] p-7 space-y-4 hover:border-white/20 transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#20254b] text-amber-400 border border-white/5">
                <Zap size={22} />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">Real-Time High Frequency Trading</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Low-latency WebSocket price feeds and instantaneous limit/market order execution with deep liquidity across major pairs.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Centered Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 text-center"
        >
          <Link
            to="/trade"
            className="inline-flex items-center gap-2 rounded-full bg-[#356df1] hover:bg-[#2b5bd4] px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
          >
            <span>Launch Live Trading</span>
            <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
