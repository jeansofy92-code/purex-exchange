import { motion } from 'framer-motion'
import { Star, MessageSquare, ShieldCheck, Headphones, CheckCircle2 } from 'lucide-react'
import sarahImg from '../../assets/testimonials/user-sarah.jpg'
import davidImg from '../../assets/testimonials/user-david.jpg'
import marcusImg from '../../assets/testimonials/user-marcus.jpg'
import supportAgentImg from '../../assets/testimonials/support-agent.jpg'

const testimonials = [
  {
    quote:
      "I work in healthcare and don't have 8 hours a day to watch crypto charts. Purex's automated bots have given me consistent, transparent returns with zero stress. Principal was released exactly on time.",
    author: 'Sarah Jenkins',
    location: 'Austin, Texas',
    role: 'Verified Investor since 2024',
    avatar: sarahImg,
    badge: 'Starter & Panther Bot User'
  },
  {
    quote:
      'As an engineer, I was skeptical of automated trading claims. After verifying Purex on-chain reserve audits and testing sub-second crypto withdrawals, it is by far the most reliable platform I have used.',
    author: 'David Vance',
    location: 'London, UK',
    role: 'Quantitative Trader',
    avatar: davidImg,
    badge: 'Quantum Tiger Bot User'
  },
  {
    quote:
      'The speed of customer support is what blew me away. I had a question about a network transfer at 2:00 AM, and an actual human specialist answered in 40 seconds and solved it immediately.',
    author: 'Marcus Adebayo',
    location: 'Toronto, Canada',
    role: 'DeFi Portfolio Manager',
    avatar: marcusImg,
    badge: 'VIP Sovereign Member'
  },
]

export default function TestimonialsWebflow() {
  return (
    <section className="py-20 md:py-28 bg-[#0c0d14] font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#151726] px-3.5 py-1 text-xs font-medium text-[#8f9ca9]"
          >
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Real Stories from Verified Traders</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight"
          >
            Built for real people. Loved by 140,000+ traders.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#8f9ca9] text-sm sm:text-base leading-relaxed"
          >
            Hear how everyday investors, engineers, and portfolio managers grow their crypto safely with PureX.
          </motion.p>
        </div>

        {/* 3 Real Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl border border-white/[0.08] bg-[#151726] p-7 flex flex-col justify-between space-y-6 hover:border-white/20 transition-all text-left"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} className="fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    {t.badge}
                  </span>
                </div>
                <p className="text-slate-200 text-sm sm:text-[15px] leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-5 border-t border-white/[0.08]">
                <div className="relative h-12 w-12 rounded-full overflow-hidden border border-white/10 shrink-0 shadow-md bg-[#0c0d14]">
                  <img src={t.avatar} alt={t.author} className="h-full w-full object-cover" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm flex items-center gap-1.5">
                    <span>{t.author}</span>
                    <CheckCircle2 size={13} className="text-[#356df1]" />
                  </div>
                  <div className="text-[#8f9ca9] text-xs">{t.role} • {t.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 24/7 Real Human Customer Support Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-white/[0.08] bg-[#151726] p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 text-left"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-2xl overflow-hidden border-2 border-[#356df1] shrink-0 shadow-lg bg-[#0c0d14]">
              <img src={supportAgentImg} alt="PureX Customer Support Team" className="h-full w-full object-cover" />
              <div className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full bg-emerald-400 border-2 border-[#151726]" title="Online Now" />
            </div>
            <div className="space-y-1.5 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>24/7 Dedicated Human Support Team</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                No automated bot loops. Talk to real humans.
              </h3>
              <p className="text-xs sm:text-sm text-[#8f9ca9] max-w-xl">
                Have questions about deposits, trading bot yields, or withdrawals? Our specialized account managers and crypto experts respond in under 2 minutes, 24 hours a day, 365 days a year.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="mailto:support@purex.com"
              className="rounded-full bg-[#356df1] hover:bg-[#2d5cd0] px-6 py-3 text-xs font-bold text-white transition-all shadow-[0_0_20px_rgba(53,109,241,0.3)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap"
            >
              Contact Live Support
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
