import { motion } from 'framer-motion'
import { EyeOff, Activity, Headphones, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import lionImg from '../../assets/brand/bot-vip-lion.jpg'

export default function SpecsTwo() {
  const specs = [
    {
      icon: <EyeOff size={20} className="text-[#356df1]" />,
      title: '100% Private data',
      desc: 'Zero user tracking, encrypted transaction records, and institutional privacy protocols.',
    },
    {
      icon: <Activity size={20} className="text-emerald-400" />,
      title: '99.99% Uptime guarantee',
      desc: 'Multi-datacenter redundant servers ensuring uninterrupted trading and automated bot execution.',
    },
    {
      icon: <Headphones size={20} className="text-amber-400" />,
      title: '24/7 Dedicated VIP support',
      desc: 'Instant multilingual live support and priority account manager assistance around the clock.',
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-[#0a0c1a] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <motion.h2
              initial={{ opacity: 0, y: 35, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]"
            >
              Built on a robust and powerful platform
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-slate-400 text-sm sm:text-base leading-relaxed"
            >
              Engineered with institutional fault tolerance, low latency FIX APIs, and automated risk management safeguards.
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
                to="/trade"
                className="inline-flex items-center gap-2 rounded-full bg-[#356df1] hover:bg-[#2b5bd4] px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
              >
                <span>Launch Exchange</span>
                <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>

          {/* Right Image/Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="rounded-3xl border border-white/10 bg-[#141733] p-6 shadow-2xl space-y-4">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <div className="h-14 w-14 rounded-2xl overflow-hidden border border-amber-500/40 shrink-0">
                  <img src={lionImg} alt="Sovereign Lion" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-base font-black text-white">Sovereign Lion VIP Bot</div>
                  <div className="text-xs text-amber-400 font-mono font-bold">+4.20% Daily Guaranteed Yield (60 Days)</div>
                  <div className="text-[11px] text-slate-400">Institutional Algorithmic High-Net-Worth Vault</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="bg-black/30 p-3 rounded-xl border border-white/5">
                  <div className="text-slate-400 text-[10px]">Active Volume Backing</div>
                  <div className="text-white font-bold text-sm">$48.2M TVL</div>
                </div>
                <div className="bg-black/30 p-3 rounded-xl border border-white/5">
                  <div className="text-slate-400 text-[10px]">Historical Win Rate</div>
                  <div className="text-emerald-400 font-bold text-sm">99.82%</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
