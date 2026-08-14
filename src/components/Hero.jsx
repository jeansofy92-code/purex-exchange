import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import PurexHeroVisual from './PurexHeroVisual'
import TrustIndicators from './TrustIndicators'

function Hero() {
  return (
    <section className="relative mx-auto max-w-[1440px] px-4 pt-6 pb-12 sm:px-6 lg:px-10 lg:pt-10 lg:pb-16">
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-[620px]"
        >
          <h1 className="hero-heading">
            Trade. Invest.
            <br />
            Grow with
            <br />
            <span className="hero-heading-accent">PUREX Exchange</span>
          </h1>
          <p className="mt-6 max-w-[500px] text-base sm:text-lg leading-relaxed text-[#8d9691]">
            A secure and advanced platform for trading cryptocurrencies with confidence.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              className="primary-btn"
            >
              Start Trading
              <ArrowRight size={18} />
            </button>
            <button
              type="button"
              className="secondary-btn"
            >
              View Markets
            </button>
          </div>

          <TrustIndicators />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
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

