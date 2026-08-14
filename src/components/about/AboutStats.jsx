import { motion } from 'framer-motion'
import { aboutStats } from '../../data/investmentPlans'

function AboutStats() {
  return (
    <section className="relative py-12 sm:py-16 bg-[#050708] border-t border-white/10">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {aboutStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-3xl border border-white/10 bg-[#080d0e]/60 p-6 text-center backdrop-blur-xl hover:border-[#58e65b]/40 transition-colors"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono text-white tracking-tight">
                <span className="bg-gradient-to-r from-white via-[#dfe9e2] to-[#58e65b] bg-clip-text text-transparent">
                  {stat.value}
                </span>
              </div>
              <div className="mt-2 text-xs sm:text-sm font-semibold text-[#8d9691]">
                {stat.label}
              </div>
              {stat.suffix && (
                <div className="mt-1 text-[0.68rem] text-[#58e65b] font-bold">
                  {stat.suffix}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutStats
