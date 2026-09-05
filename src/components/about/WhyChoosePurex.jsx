import { motion } from 'framer-motion'
import { Globe2, Lock, FileCheck, Zap, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { companyValues } from '../../data/investmentPlans'

const valueIcons = {
  Globe2: Globe2,
  Lock: Lock,
  FileCheck: FileCheck,
  Zap: Zap,
}

function WhyChoosePurex() {
  return (
    <section className="relative py-16 sm:py-24 bg-[#0e1124] border-t border-white/10">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#ff7a00]/30 bg-[#ff7a00]/10 px-4 py-1.5 text-xs font-bold text-[#ff7a00]">
            <ShieldCheck size={14} />
            <span>Why 140,000+ Investors Trust Purex</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Built on Institutional Security,{' '}
            <span className="bg-gradient-to-r from-[#ff7a00] via-[#ff9500] to-[#38bdf8] bg-clip-text text-transparent">
              Speed & Radical Transparency
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            We bridge high-end quantitative finance with accessible user interfaces, backed by battle-tested custody protocols.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {companyValues.map((val, index) => {
            const Icon = valueIcons[val.icon] || Globe2

            return (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-5 rounded-3xl border border-white/10 bg-[#15193b]/90 p-7 sm:p-8 backdrop-blur-xl hover:border-[#ff7a00]/40 hover:shadow-[0_0_35px_rgba(255,122,0,0.15)] transition-all group"
              >
                <div className="h-14 w-14 rounded-2xl bg-[#ff7a00]/15 border border-[#ff7a00]/30 flex items-center justify-center text-[#ff7a00] shrink-0 shadow-[0_0_20px_rgba(255,122,0,0.2)] group-hover:scale-110 transition-transform">
                  <Icon size={26} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#ff7a00] transition-colors">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Security & Proof of Reserves Banner */}
        <div className="rounded-3xl border border-white/15 bg-gradient-to-r from-[#1c2146] via-[#15193b] to-[#11142c] p-6 sm:p-10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#ff7a00] uppercase tracking-wider">
                <CheckCircle2 size={15} />
                <span>$100,000,000 SAFU Insurance Reserve</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Your Principal Is Backed By Verified On-Chain Assets
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In addition to 1:1 asset backing, we maintain an emergency Secure Asset Fund for Users (SAFU) holding $100M+ in liquid reserves, ensuring absolute capital safety in any market event.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-wrap lg:flex-col gap-3 justify-center">
              <div className="flex items-center gap-2 rounded-xl bg-[#0c0e22]/80 border border-white/10 px-4 py-3 text-xs text-white">
                <div className="h-2 w-2 rounded-full bg-[#10b981] animate-ping" />
                <span className="font-bold">1:1 Proof of Reserves Verified</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-[#0c0e22]/80 border border-white/10 px-4 py-3 text-xs text-white">
                <div className="h-2 w-2 rounded-full bg-[#38bdf8]" />
                <span className="font-bold">Multi-Sig Cold Storage Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChoosePurex
