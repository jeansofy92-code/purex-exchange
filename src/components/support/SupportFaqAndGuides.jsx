import { motion } from 'framer-motion'
import {
  TrendingUp,
  Wallet,
  ShieldCheck,
  CandlestickChart,
  HelpCircle,
  Mail,
  Send,
} from 'lucide-react'
import { supportCategories } from '../../data/supportData'

const categoryIcons = {
  TrendingUp: TrendingUp,
  Wallet: Wallet,
  ShieldCheck: ShieldCheck,
  CandlestickChart: CandlestickChart,
}

function SupportFaqAndGuides({ onSelectQuestion }) {
  return (
    <section className="relative py-16 sm:py-24 bg-[#050708] border-t border-white/10">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#58e65b]/30 bg-[#183a1d]/60 px-4 py-1.5 text-xs font-bold text-[#58e65b]">
            <HelpCircle size={14} />
            <span>Knowledge Base & Quick Answers</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Explore Popular Help Topics
          </h2>

          <p className="text-sm sm:text-base text-[#8d9691]">
            Click any question to automatically ask the PUREX Live AI assistant or browse common platform guides.
          </p>
        </div>

        {/* 4 Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {supportCategories.map((cat, index) => {
            const Icon = categoryIcons[cat.icon] || HelpCircle

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="rounded-3xl border border-white/10 bg-[#080d0e]/90 p-6 flex flex-col justify-between hover:border-[#58e65b]/40 hover:shadow-[0_0_25px_rgba(88,230,91,0.15)] transition-all group"
              >
                <div>
                  <div className="h-12 w-12 rounded-2xl bg-[#183a1d] border border-[#58e65b]/30 flex items-center justify-center text-[#58e65b] mb-4 group-hover:scale-110 transition-transform">
                    <Icon size={22} />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#58e65b] transition-colors">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-[#8d9691] leading-relaxed mb-4">
                    {cat.description}
                  </p>

                  {/* Popular Questions List */}
                  <div className="space-y-2 border-t border-white/5 pt-3">
                    <div className="text-[0.65rem] font-bold uppercase tracking-wider text-[#8d9691]">
                      Common Inquiries:
                    </div>
                    {cat.popularQuestions.map((q, qIdx) => (
                      <button
                        key={qIdx}
                        type="button"
                        onClick={() => onSelectQuestion && onSelectQuestion(q)}
                        className="text-left w-full text-xs text-[#dfe9e2] hover:text-[#58e65b] py-1 transition-colors flex items-center gap-1.5 group/btn"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#58e65b]/60 group-hover/btn:scale-150 transition-transform shrink-0" />
                        <span className="line-clamp-1">{q}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Alternate Emergency Channels Banner */}
        <div className="rounded-3xl border border-white/15 bg-gradient-to-r from-[#0d2212] via-[#08120d] to-[#0a1820] p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                Need Official Verification or Dedicated Account Rep?
              </h3>
              <p className="text-xs sm:text-sm text-[#8d9691] leading-relaxed">
                For corporate accounts, high-net-worth VIPs, or legal inquiries, reach our global executive dispatch team directly.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
              <a
                href="mailto:support@purex.exchange"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs font-bold text-white hover:bg-white/10 transition-colors"
              >
                <Mail size={16} className="text-[#58e65b]" />
                <span>support@purex.exchange</span>
              </a>

              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#58e65b] px-5 py-3.5 text-xs font-extrabold text-black hover:bg-[#48db50] shadow-[0_0_20px_rgba(88,230,91,0.4)] transition-all hover:scale-105"
              >
                <Send size={16} />
                <span>Join Official Telegram VIP</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SupportFaqAndGuides
