import { motion } from 'framer-motion'

const companies = [
  { name: 'TechCrunch', logoText: 'TechCrunch' },
  { name: 'Forbes', logoText: 'Forbes' },
  { name: 'Bloomberg', logoText: 'Bloomberg' },
  { name: 'CoinDesk', logoText: 'CoinDesk' },
  { name: 'CoinMarketCap', logoText: 'CoinMarketCap' },
]

export default function CompaniesTicker() {
  return (
    <section className="py-10 border-y border-white/5 bg-[#0d0f22]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs font-bold uppercase tracking-widest text-slate-400"
        >
          Purex Exchange has been featured on
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center justify-items-center"
        >
          {companies.map((comp) => (
            <div
              key={comp.name}
              className="text-lg sm:text-xl font-black tracking-tight text-slate-500 hover:text-slate-200 transition-colors font-mono cursor-default select-none"
            >
              {comp.logoText}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
