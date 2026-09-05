import { motion } from 'framer-motion'
import { aboutStats } from '../../data/investmentPlans'

function AboutStats() {
  return (
    <section className="relative py-12 sm:py-16 bg-[#0c0e22] border-t border-white/10">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {aboutStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-3xl border border-white/10 bg-[#15193b]/80 p-6 text-center backdrop-blur-xl hover:border-[#ff7a00]/40 transition-colors shadow-lg"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono text-white tracking-tight">
                <span className="bg-gradient-to-r from-white via-slate-100 to-[#ff7a00] bg-clip-text text-transparent">
                  {stat.value}
                </span>
              </div>
              <div className="mt-2 text-xs sm:text-sm font-semibold text-slate-300">
                {stat.label}
              </div>
              {stat.suffix && (
                <div className="mt-1 text-[0.68rem] text-[#ff7a00] font-bold">
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
