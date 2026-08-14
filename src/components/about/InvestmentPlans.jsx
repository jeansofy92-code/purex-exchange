import { motion } from 'framer-motion'
import { Check, Flame, ArrowRight, ShieldCheck, Clock, DollarSign, Zap } from 'lucide-react'
import { investmentPlans } from '../../data/investmentPlans'

function InvestmentPlans({ onSelectPlan, selectedPlanId }) {
  return (
    <section id="investment-plans" className="relative py-16 sm:py-24 bg-[#050708]">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#58e65b]/5 blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#58e65b]/30 bg-[#183a1d]/60 px-4 py-1.5 text-xs font-bold text-[#58e65b] backdrop-blur-md">
            <Zap size={14} />
            <span>High-Yield Automated Portfolios</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Tailored Investment Plans With{' '}
            <span className="bg-gradient-to-r from-[#58e65b] via-[#a3f7a5] to-[#38bdf8] bg-clip-text text-transparent">
              Guaranteed Daily Returns
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#8d9691] leading-relaxed">
            Choose the investment tier that matches your financial goals. Every plan features automated quantitative trading execution, daily profit payouts, and 100% principal capital release upon maturity.
          </p>
        </div>

        {/* 4 Glowing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
          {investmentPlans.map((plan, index) => {
            const isSelected = selectedPlanId === plan.id
            const isPopular = plan.popular

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 transition-all duration-300 group ${
                  isPopular
                    ? 'border-2 border-[#58e65b] bg-gradient-to-b from-[#0e1a11] via-[#090e0f] to-[#06090a] shadow-[0_0_40px_rgba(88,230,91,0.25)] hover:shadow-[0_0_55px_rgba(88,230,91,0.4)] scale-100 lg:scale-[1.03] z-10'
                    : isSelected
                    ? 'border-2 border-[#38bdf8] bg-[#090f12] shadow-[0_0_35px_rgba(56,189,248,0.3)]'
                    : 'border border-white/10 bg-[#080d0e]/90 hover:border-[#58e65b]/50 hover:shadow-[0_0_30px_rgba(88,230,91,0.18)] hover:-translate-y-1.5'
                }`}
              >
                {/* Glowing Popular / VIP Tag */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                    <span className="flex items-center gap-1 rounded-full bg-[#58e65b] px-4 py-1 text-xs font-black text-black uppercase tracking-wider shadow-[0_0_15px_rgba(88,230,91,0.6)]">
                      <Flame size={13} className="fill-black" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Card Top Information */}
                <div>
                  {/* Plan Name & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl font-black text-white">{plan.name}</h3>
                    {!isPopular && (
                      <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[0.68rem] font-bold text-[#dfe9e2]">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#8d9691] min-h-[32px] mb-5 leading-snug">
                    {plan.subtitle}
                  </p>

                  {/* Daily Return Main Metric Box */}
                  <div className="rounded-2xl border border-white/10 bg-black/40 p-4 mb-6 relative overflow-hidden group-hover:border-white/20 transition-colors">
                    <div className="text-[0.68rem] font-bold uppercase tracking-wider text-[#8d9691] mb-1">
                      Expected Daily Return
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black font-mono text-white group-hover:text-[#58e65b] transition-colors">
                        {plan.dailyReturn}
                      </span>
                      <span className="text-xs font-bold text-[#58e65b]">/ Day</span>
                    </div>
                    <div className="mt-1 text-[0.7rem] text-[#8d9691]">
                      Avg Total Net: <strong className="text-white">{plan.totalReturnAvg}</strong>
                    </div>
                  </div>

                  {/* Key Parameters: Min Deposit & Duration */}
                  <div className="space-y-3 py-3 border-y border-white/10 text-xs mb-6 font-medium">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[#8d9691]">
                        <DollarSign size={14} className="text-[#58e65b]" />
                        Minimum Deposit:
                      </span>
                      <span className="font-bold text-white font-mono">{plan.minDepositDisplay}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[#8d9691]">
                        <DollarSign size={14} className="text-[#8d9691]" />
                        Maximum Deposit:
                      </span>
                      <span className="font-bold text-white font-mono">{plan.maxDepositDisplay}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[#8d9691]">
                        <Clock size={14} className="text-[#58e65b]" />
                        Investment Period:
                      </span>
                      <span className="font-bold text-[#58e65b] bg-[#183a1d] px-2.5 py-0.5 rounded-full border border-[#58e65b]/30">
                        {plan.durationDisplay}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[#8d9691]">
                        <ShieldCheck size={14} className="text-[#58e65b]" />
                        Capital Return:
                      </span>
                      <span className="font-bold text-white">100% Back</span>
                    </div>
                  </div>

                  {/* Features Bullet List */}
                  <div className="space-y-2.5 mb-8">
                    <div className="text-[0.7rem] uppercase font-bold text-[#8d9691] tracking-wider mb-2">
                      Plan Inclusions:
                    </div>
                    {plan.features.map((feat, fIndex) => (
                      <div key={fIndex} className="flex items-start gap-2 text-xs text-[#dfe9e2]">
                        <div className="mt-0.5 rounded-full bg-[#183a1d] p-0.5 text-[#58e65b] shrink-0">
                          <Check size={11} strokeWidth={3} />
                        </div>
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectPlan) onSelectPlan(plan)
                      const calcElem = document.getElementById('roi-calculator')
                      if (calcElem) calcElem.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all duration-200 ${
                      isPopular
                        ? 'bg-[#58e65b] text-black hover:bg-[#48db50] shadow-[0_0_20px_rgba(88,230,91,0.4)] hover:scale-[1.02]'
                        : 'bg-white/10 text-white hover:bg-[#58e65b] hover:text-black border border-white/10 hover:border-[#58e65b]'
                    }`}
                  >
                    <span>Calculate & Invest</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default InvestmentPlans
