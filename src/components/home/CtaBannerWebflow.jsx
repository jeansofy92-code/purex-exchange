import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react'

export default function CtaBannerWebflow() {
  return (
    <section className="py-16 md:py-24 bg-[#0d0f22]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#171b3e] to-[#121530] p-8 sm:p-12 lg:p-16 text-center space-y-6 shadow-2xl relative overflow-hidden"
        >
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Try the future, today.<br />Join Purex Exchange
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Create a free account in under 60 seconds and experience ultra-low latency trading with automated daily crypto yields.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-[#356df1] hover:bg-[#2b5bd4] px-9 py-4 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
            >
              <span>Create Free Account</span>
              <ArrowRight size={15} />
            </Link>
            <Link
              to="/trade"
              className="rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 px-9 py-4 text-sm font-bold text-white transition-all"
            >
              Launch Live Terminal
            </Link>
          </div>

          <div className="pt-6 flex items-center justify-center gap-6 text-xs text-slate-400 font-semibold border-t border-white/5 max-w-md mx-auto">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>SAFU Insurance Protected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap size={14} className="text-amber-400" />
              <span>Instant Settlements</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
