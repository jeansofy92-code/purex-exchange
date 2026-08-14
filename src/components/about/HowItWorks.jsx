import { motion } from 'framer-motion'
import { UserCheck, ShieldCheck, Cpu, WalletCards } from 'lucide-react'
import { howItWorksSteps } from '../../data/investmentPlans'

const iconsMap = {
  UserCheck: UserCheck,
  ShieldCheck: ShieldCheck,
  Cpu: Cpu,
  WalletCards: WalletCards,
}

function HowItWorks() {
  return (
    <section className="relative py-16 sm:py-24 bg-[#050708]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#58e65b]/30 bg-[#183a1d]/60 px-4 py-1.5 text-xs font-bold text-[#58e65b]">
            <span>Seamless 4-Step Process</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            How It Works:{' '}
            <span className="bg-gradient-to-r from-[#58e65b] via-[#85f487] to-[#38bdf8] bg-clip-text text-transparent">
              From Zero to Daily Passive Returns
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#8d9691]">
            We took the complexity out of crypto finance. Follow four straightforward steps to start earning daily automated trading returns.
          </p>
        </div>

        {/* 4 Step Cards with Connecting Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {howItWorksSteps.map((stepItem, index) => {
            const IconComponent = iconsMap[stepItem.icon] || Cpu

            return (
              <motion.div
                key={stepItem.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#080d0e]/80 p-7 backdrop-blur-xl hover:border-[#58e65b]/40 hover:shadow-[0_0_30px_rgba(88,230,91,0.15)] transition-all group"
              >
                {/* Step Top Header with Glow Pill & Step Number */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-[#183a1d] border border-[#58e65b]/30 flex items-center justify-center text-[#58e65b] shadow-[0_0_15px_rgba(88,230,91,0.2)] group-hover:scale-110 group-hover:bg-[#58e65b] group-hover:text-black transition-all">
                      <IconComponent size={22} />
                    </div>
                    <span className="font-mono text-3xl font-black text-white/20 group-hover:text-[#58e65b]/40 transition-colors">
                      {stepItem.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white mb-3 group-hover:text-[#58e65b] transition-colors">
                    {stepItem.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#8d9691] leading-relaxed">
                    {stepItem.description}
                  </p>
                </div>

                {/* Bottom step tag */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[0.7rem] text-[#dfe9e2]/60">
                  <span>Phase {stepItem.step}</span>
                  <span className="text-[#58e65b] font-semibold">100% Automated</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
