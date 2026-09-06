import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    quote:
      'Purex has completely transformed our crypto yield operations. The Alpha Panther trading bot consistently produces reliable daily returns without market exposure.',
    author: 'John Carter',
    role: 'Quantitative Trader, Former VP of Finance',
    avatar: 'JC',
  },
  {
    quote:
      'The speed of execution on Purex is unmatched. Instant deposits, seamless crypto conversions, and full proof of reserves gave our team complete confidence.',
    author: 'Sophie Moore',
    role: 'DeFi Portfolio Manager',
    avatar: 'SM',
  },
  {
    quote:
      'The clean interface and high-frequency trading tools make this the best crypto platform I have used. Withdrawals are instant and customer support is 24/7.',
    author: 'Lily Woods',
    role: 'Angel Investor & Fund Advisor',
    avatar: 'LW',
  },
]

export default function TestimonialsWebflow() {
  return (
    <section className="py-16 md:py-24 bg-[#0a0c1a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight"
          >
            What our users say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-400 text-sm sm:text-base leading-relaxed"
          >
            Trusted by over 140,000+ active traders and institutional digital asset managers worldwide.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl border border-white/10 bg-[#141733] p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:border-white/20 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#356df1] text-white font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold text-white text-sm">{t.author}</div>
                  <div className="text-slate-400 text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
