import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Zap, Headphones, Sparkles, CheckCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PurexHeroVisual from './PurexHeroVisual'

function Hero() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleQuickStart = (e) => {
    e.preventDefault()
    if (email.trim()) {
      navigate(`/signup?email=${encodeURIComponent(email.trim())}`)
    } else {
      navigate('/signup')
    }
  }

  return (
    <section className="relative mx-auto max-w-[1440px] px-4 pt-6 pb-12 sm:px-6 lg:px-10 lg:pt-10 lg:pb-16">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        {/* Left Column: Serious Humanistic Typography & Quick Start */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-[640px]"
        >
          {/* Trust Badge */}
          <div className="mb-5 flex items-center gap-2">
            <span className="green-badge">
              <Sparkles size={12} className="text-[#58e65b]" />
              INSTITUTIONAL GRADE CRYPTO EXCHANGE
            </span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[4rem] leading-[1.08]">
            Trade. Invest.
            <br />
            <span className="text-[#58e65b]">Grow with Purex.</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#8d9691] font-normal">
            Join over 250,000+ traders and funds accessing deep digital asset liquidity, 0.05% lowest trading fees, and automated daily staking yields.
          </p>

          {/* Quick Onboarding Form */}
          <form
            onSubmit={handleQuickStart}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center max-w-lg"
          >
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full rounded-xl border border-white/15 bg-[#0c1214]/90 py-3.5 px-4 text-sm text-white placeholder-[#8d9691] focus:border-[#58e65b] focus:outline-none focus:ring-1 focus:ring-[#58e65b] transition-all"
              />
            </div>
            <button
              type="submit"
              className="primary-btn !py-3.5 !px-6 text-sm font-bold shadow-xl cursor-pointer"
            >
              Get Started Free
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Trust Ribbon */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-[#dfe9e2] border-t border-white/10 pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-[#58e65b]" />
              <span>0% Deposit Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={15} className="text-[#58e65b]" />
              <span>$125M SAFU Reserve</span>
            </div>
            <div className="flex items-center gap-2">
              <Headphones size={15} className="text-[#58e65b]" />
              <span>24/7 Human Live Support</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: 3D Platform Scene Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="relative flex w-full items-center justify-center lg:justify-end"
        >
          <PurexHeroVisual />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
