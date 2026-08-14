import { motion } from 'framer-motion'
import { statsData } from '../data/marketData'

function Stats() {
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-10">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {statsData.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.07 }}
            className="stats-card"
          >
            <div className="text-4xl font-semibold tracking-[-0.06em] text-white">{stat.value}</div>
            <div className="mt-3 text-base text-[#8d9691]">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Stats
