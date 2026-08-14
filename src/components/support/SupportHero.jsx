import { motion } from 'framer-motion'
import { Headphones, ShieldCheck, Clock, MessageSquare, Zap } from 'lucide-react'

function SupportHero() {
  return (
    <section className="relative pt-10 pb-8 sm:pt-14 sm:pb-12 overflow-hidden border-b border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#58e65b]/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Title & Status */}
          <div className="space-y-4 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#58e65b]/40 bg-[#183a1d]/70 px-4 py-1.5 text-xs font-bold text-[#58e65b] backdrop-blur-md shadow-[0_0_20px_rgba(88,230,91,0.2)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#58e65b] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#58e65b]" />
              </span>
              <span>24/7 Live Intelligence Support & Specialist Desk Online</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              PUREX Client Support &{' '}
              <span className="bg-gradient-to-r from-[#58e65b] via-[#a3f7a5] to-[#38bdf8] bg-clip-text text-transparent">
                Live Resolution Center
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#8d9691] leading-relaxed">
              Get instant automated answers from our AI assistant or connect directly in real-time with PUREX Support Specialists to resolve deposits, investment plans, and security inquiries.
            </p>

            {/* Micro SLA Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs text-[#dfe9e2]/80 font-medium">
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-[#58e65b]" />
                <span>Avg Response: <strong className="text-white">&lt; 2 Minutes</strong></span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#58e65b]" />
                <span>Satisfaction Score: <strong className="text-white">99.4%</strong></span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Headphones size={14} className="text-[#58e65b]" />
                <span>Coverage: <strong className="text-white">24/7/365 Global</strong></span>
              </div>
            </div>
          </div>

          {/* Right Live Help Indicator Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-4 p-5 rounded-3xl bg-[#080d0e]/90 border border-white/15 backdrop-blur-xl shadow-2xl shrink-0"
          >
            <div className="h-14 w-14 rounded-2xl bg-[#183a1d] border border-[#58e65b]/40 flex items-center justify-center text-[#58e65b] shadow-[0_0_20px_rgba(88,230,91,0.3)]">
              <MessageSquare size={26} />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#8d9691]">Live Assistance</div>
              <div className="text-sm sm:text-base font-black text-white">Instant Chat Queue Active</div>
              <div className="text-[0.72rem] text-[#58e65b] font-medium flex items-center gap-1 mt-0.5">
                <Zap size={12} />
                <span>AI Bot + Human Specialists Standing By</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default SupportHero
