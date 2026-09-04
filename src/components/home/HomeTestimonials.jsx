import { motion } from 'framer-motion'
import { Star, ShieldCheck, CheckCircle2, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Marcus Vance',
    role: 'Quantitative Day Trader',
    location: 'United Kingdom',
    rating: 5,
    text: 'The 0.01s order execution and ultra-deep BTC liquidity make Purex my go-to platform. Withdrawals to cold storage are instant and zero-fuss.',
    badge: 'Verified VIP Trader',
    volume: '$2.8M 30d Vol',
    avatar: 'M',
    avatarBg: 'bg-[#58e65b]/20 text-[#58e65b] border-[#58e65b]/40',
  },
  {
    id: 2,
    name: 'Elena Rostova',
    role: 'DeFi Portfolio Manager',
    location: 'Switzerland',
    rating: 5,
    text: 'We stake over $250k across the Purex Elite vaults. Transparent daily yield payouts directly into our account balance with audited SAFU proof of reserves.',
    badge: 'Institutional Partner',
    volume: '$4.1M Staked',
    avatar: 'E',
    avatarBg: 'bg-[#627eea]/20 text-[#627eea] border-[#627eea]/40',
  },
  {
    id: 3,
    name: 'David K. Chen',
    role: 'Retail Crypto Investor',
    location: 'Singapore',
    rating: 5,
    text: 'Customer support answered my wire verification within 4 minutes on a Sunday night. Cleanest UI in crypto, no spam or gimmicks.',
    badge: 'Verified Member',
    volume: '3+ Years Active',
    avatar: 'D',
    avatarBg: 'bg-[#f7931a]/20 text-[#f7931a] border-[#f7931a]/40',
  },
]

export default function HomeTestimonials() {
  return (
    <section className="relative mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-10">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="green-badge">
            <CheckCircle2 size={12} className="text-[#58e65b]" />
            TRUSTED WORLDWIDE
          </span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Built for Serious Traders & Institutions
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#8d9691]">
          Join over 250,000+ active traders and funds executing billions in daily volume with complete peace of mind.
        </p>

        {/* Global Rating Score Pill */}
        <div className="mt-5 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-md">
          <div className="flex text-[#58e65b]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={15} fill="#58e65b" stroke="#58e65b" />
            ))}
          </div>
          <span className="text-xs font-bold text-white">4.9 / 5.0 Rating</span>
          <span className="text-xs text-[#8d9691] border-l border-white/15 pl-3">
            Based on 12,400+ Verified Reviews
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            className="exchange-card relative p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-[#58e65b]">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#58e65b" stroke="#58e65b" />
                  ))}
                </div>
                <Quote size={20} className="text-white/10" />
              </div>

              <p className="text-sm leading-relaxed text-[#dfe9e2] italic">
                "{item.text}"
              </p>
            </div>

            <div className="mt-6 border-t border-white/10 pt-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border font-bold text-sm ${item.avatarBg}`}
                >
                  {item.avatar}
                </div>
                <div>
                  <div className="font-bold text-white text-sm flex items-center gap-1.5">
                    {item.name}
                    <ShieldCheck size={14} className="text-[#58e65b]" />
                  </div>
                  <div className="text-[11px] text-[#8d9691]">{item.role} • {item.location}</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
