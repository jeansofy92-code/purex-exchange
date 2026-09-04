import { motion } from 'framer-motion'
import { ArrowRight, Play, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import PurexHeroVisual from './PurexHeroVisual'

function Hero() {
  return (
    <section className="relative mx-auto max-w-[1440px] px-4 pt-6 pb-10 sm:px-6 lg:px-10 lg:pt-10 lg:pb-14">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        {/* Left Column: Typography & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-[660px]"
        >
          {/* Institutional Badge */}
          <div className="mb-6 flex items-center gap-2">
            <span className="gold-badge">
              <Sparkles size={12} className="text-[#d4af37]" />
              PUREX CAPITAL GROUP • PRIVATE WEALTH
            </span>
          </div>

          <h1 className="text-4xl font-extrabold uppercase tracking-tight text-white sm:text-6xl lg:text-[4.2rem] leading-[1.05]">
            Trade.
            <br />
            Invest.
            <br />
            <span className="gold-text-gradient">Elevate.</span>
          </h1>

          <p className="mt-6 max-w-[540px] text-base sm:text-lg font-medium leading-relaxed text-zinc-300">
            Next generation trading and institutional investment platform engineered for elite visionaries.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/signup"
              className="gold-btn shadow-2xl"
            >
              Start Trading
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/trade"
              className="gold-glass-btn"
            >
              <Play size={16} className="text-[#f7e09e]" />
              Explore Platform
            </Link>
          </div>

          {/* Key Metric Indicators Strip */}
          <div className="mt-12 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 sm:grid-cols-4">
            <div>
              <div className="font-mono text-xl font-extrabold text-white sm:text-2xl">10M+</div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
                Users Worldwide
              </div>
            </div>
            <div>
              <div className="font-mono text-xl font-extrabold text-[#fae098] sm:text-2xl">$2.4B+</div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
                24h Trading Volume
              </div>
            </div>
            <div>
              <div className="font-mono text-xl font-extrabold text-white sm:text-2xl">150+</div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
                Countries
              </div>
            </div>
            <div>
              <div className="font-mono text-xl font-extrabold text-[#00e676] sm:text-2xl">99.98%</div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
                Platform Uptime
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: 3D Golden Centerpiece Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="relative flex w-full items-center justify-center lg:justify-end"
        >
          <PurexHeroVisual />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
