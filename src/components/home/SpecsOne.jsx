import { motion } from 'framer-motion'
import { Percent, ShieldCheck, Lock, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import tigerImg from '../../assets/brand/bot-pro-tiger.jpg'
import scoutImg from '../../assets/brand/bot-starter-scout.jpg'

export default function SpecsOne() {
  const specs = [
    {
      icon: <Percent size={20} className="text-[#356df1]" />,
      title: 'Lowest fees in market',
      desc: 'Trade with industry-leading 0.01% maker/taker rates and 0% deposit fees.',
    },
    {
      icon: <ShieldCheck size={20} className="text-emerald-400" />,
      title: 'Fast and secure transactions',
      desc: 'Sub-millisecond trade confirmations and automatic blockchain broadcast.',
    },
    {
      icon: <Lock size={20} className="text-amber-400" />,
      title: '256-bit secure encryption',
      desc: 'Military-grade end-to-end encryption guarding user credentials and API keys.',
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-[#0d0f22] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Mockup Images */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 grid grid-cols-2 gap-4"
          >
            <div className="rounded-3xl border border-white/10 bg-[#151833] p-4 shadow-xl space-y-3">
              <div className="aspect-square rounded-2xl overflow-hidden border border-white/10">
                <img src={tigerImg} alt="Quantum Tiger" className="w-full h-full object-cover" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-white">Quantum Tiger Bot</div>
                <div className="text-emerald-400 font-mono font-bold">+3.25% Daily ROI</div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#151833] p-4 shadow-xl space-y-3 mt-8">
              <div className="aspect-square rounded-2xl overflow-hidden border border-white/10">
                <img src={scoutImg} alt="Scout Bot" className="w-full h-full object-cover" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-white">Scout v1.4 Bot</div>
                <div className="text-[#356df1] font-mono font-bold">+1.65% Daily ROI</div>
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <motion.h2
              initial={{ opacity: 0, y: 35, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]"
            >
              A crypto platform from the future
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-slate-400 text-sm sm:text-base leading-relaxed"
            >
              Purex combines ultra-low latency infrastructure, decentralized liquidity routing, and autonomous algorithmic quantitative trading pools.
            </motion.p>

            {/* 3 Specs Items */}
            <div className="space-y-4 pt-2">
              {specs.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: 0.15 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-4 rounded-2xl border border-white/5 bg-[#141731] p-4 hover:border-white/15 transition-colors"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1e2348] border border-white/5">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">{item.title}</h3>
                    <p className="text-slate-400 text-xs sm:text-sm mt-0.5">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="pt-2"
            >
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-full bg-[#356df1] hover:bg-[#2b5bd4] px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
              >
                <span>Get Started Now</span>
                <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
