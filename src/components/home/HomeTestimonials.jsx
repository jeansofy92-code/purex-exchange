import { motion } from 'framer-motion'
import { Star, ShieldCheck, CheckCircle2, Award } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Marcus Vance',
    role: 'Quantitative Lead Trader',
    location: 'London, UK',
    rating: 5,
    text: 'The 0.85ms order execution speed and ultra-deep BTC/ETH book liquidity are on par with Tier-1 institutional brokers. Automated daily staking payouts process like clockwork.',
    badge: 'VIP Level 4',
    volume: '$3.4M 30D Volume',
    avatar: 'M',
    pnl: '+28.4% 30D PnL',
  },
  {
    id: 2,
    name: 'Elena Rostova',
    role: 'DeFi Portfolio Director',
    location: 'Zurich, Switzerland',
    rating: 5,
    text: 'We allocate over $450k across the Purex Diamond and Liquid ETH Yield vaults. Having cryptographically verifiable Merkle proof of reserves gives our fund full compliance confidence.',
    badge: 'Institutional Partner',
    volume: '$5.2M Capital Staked',
    avatar: 'E',
    pnl: '+24.8% APY Compounded',
  },
  {
    id: 3,
    name: 'David K. Chen',
    role: 'Active Derivatives Trader',
    location: 'Singapore',
    rating: 5,
    text: 'Zero-fee deposits via SEPA and Apple Pay made funding instant. Support desk answered my institutional sub-account setup in 3 minutes on a Sunday night.',
    badge: 'Verified Pro Trader',
    volume: '3+ Years on Purex',
    avatar: 'D',
    pnl: '94.2% Execution Fill',
  },
]

export default function HomeTestimonials() {
  return (
    <section className="relative mx-auto max-w-[1440px] px-3.5 py-4 sm:px-6 lg:px-10">
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-950/40 px-3 py-0.5 text-xs font-semibold text-amber-400">
            <Award size={12} />
            <span>VERIFIED INSTITUTIONAL REVIEWS</span>
          </div>
          <h2 className="mt-1.5 text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white">
            Trusted by 250,000+ Active Traders & Funds
          </h2>
          <p className="text-xs text-slate-400 max-w-xl">
            Real feedback from verified quant funds, high-frequency traders, and DeFi wealth managers.
          </p>
        </div>

        {/* Global Rating Score Pill */}
        <div className="inline-flex items-center gap-2 rounded-2xl border border-amber-500/30 bg-slate-950/90 px-3.5 py-1.5 text-xs font-mono">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} fill="#fbbf24" stroke="#fbbf24" />
            ))}
          </div>
          <span className="font-bold text-white">4.92 / 5.0</span>
          <span className="text-slate-500 border-l border-slate-800 pl-2 text-[11px]">14,200+ Audited Reviews</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
        {testimonials.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.06 }}
            className="rounded-2xl border border-slate-800 bg-[#090b10]/95 p-4 backdrop-blur-xl shadow-xl flex flex-col justify-between hover:border-amber-500/40 transition-all group"
          >
            <div>
              {/* Header: Stars & Quote */}
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={12} fill="#fbbf24" stroke="#fbbf24" />
                  ))}
                </div>
                <span className="rounded bg-slate-900 border border-slate-800 px-2 py-0.5 text-[9px] font-mono font-bold text-amber-400">
                  {item.badge}
                </span>
              </div>

              <p className="text-xs sm:text-[13px] leading-relaxed text-slate-300 italic">
                "{item.text}"
              </p>
            </div>

            <div className="mt-4 border-t border-slate-800/80 pt-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 border border-amber-500/30 font-mono font-bold text-xs text-amber-400 shadow">
                  {item.avatar}
                </div>
                <div>
                  <div className="font-bold text-white text-xs flex items-center gap-1">
                    <span>{item.name}</span>
                    <ShieldCheck size={12} className="text-amber-400" />
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">{item.role} • {item.location}</div>
                </div>
              </div>

              <div className="text-right font-mono text-[9px] text-slate-400 hidden sm:block">
                <div className="text-amber-400 font-bold">{item.pnl}</div>
                <div>{item.volume}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
