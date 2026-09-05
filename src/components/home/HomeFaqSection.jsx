import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'

const homeFaqItems = [
  {
    q: 'How does Purex guarantee the safety and proof of reserves of my funds?',
    a: 'Purex enforces a strict 1:1 or greater reserve policy. Over 98.5% of all digital assets are kept in geographically distributed, air-gapped cold storage protected by Multi-Party Computation (MPC). Furthermore, our cryptographic Merkle Tree Proof of Reserves is audited and refreshed continuously, allowing anyone to verify their balances on-chain. Additionally, our $125M SAFU Insurance Fund protects against extreme market anomalies.',
  },
  {
    q: 'How are the daily staking and algorithmic yields calculated and distributed?',
    a: 'Yields are generated through automated algorithmic market-making, liquidity provisioning, and staking verification nodes. Profits accrue every 24 hours and are credited directly to your available balance. You can enable automatic compounding to maximize annualized returns or withdraw your accrued interest at any time with zero penalty on flexible plans.',
  },
  {
    q: 'What are the platform trading fees and deposit conditions?',
    a: 'Purex charges 0% fees on all cryptocurrency deposits and wire transfers. Spot trading fees start at an industry-low 0.05% maker fee and scale down to 0.01% as your 30-day trading volume increases or by holding Purex VIP status.',
  },
  {
    q: 'How fast are withdrawals processed to personal cold wallets?',
    a: 'Withdrawals are processed automatically through our secure automated clearing infrastructure. Over 99% of withdrawals are broadcasted to the blockchain within 60 seconds, subject only to standard network confirmation times.',
  },
  {
    q: 'Can I copy trade experienced algorithmic quants and hedge funds?',
    a: 'Yes. Our Copy Trading engine enables you to mirror top-performing strategy masters with 1 click. You retain 100% control of your principal, can set stop-loss limits, and may disconnect or withdraw funds at any time with zero lockup penalty.',
  },
]

export default function HomeFaqSection() {
  const [openIdx, setOpenIdx] = useState(0)

  const toggle = (i) => {
    setOpenIdx(openIdx === i ? -1 : i)
  }

  return (
    <section className="relative mx-auto max-w-[1000px] px-3.5 py-4 sm:px-6 lg:px-10">
      <div className="text-center mb-5 space-y-1.5">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-950/40 px-3 py-0.5 text-xs font-semibold text-amber-400">
          <HelpCircle size={12} />
          <span>FREQUENTLY ASKED QUESTIONS</span>
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white">
          Everything You Need to Know
        </h2>
        <p className="text-xs text-slate-400">
          Clear answers regarding platform security, yield mechanics, and instant settlements.
        </p>
      </div>

      <div className="space-y-2">
        {homeFaqItems.map((item, idx) => {
          const isOpen = openIdx === idx
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'border-amber-500/40 bg-[#090b10] shadow-[0_0_18px_rgba(245,158,11,0.1)]'
                  : 'border-slate-800 bg-slate-950/80 hover:border-slate-700'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left cursor-pointer"
              >
                <span className="text-xs sm:text-sm font-bold text-white pr-3">
                  {item.q}
                </span>
                <div
                  className={`p-1 rounded-lg border transition-transform duration-200 shrink-0 ${
                    isOpen
                      ? 'rotate-180 bg-amber-950 text-amber-400 border-amber-500/40'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  <ChevronDown size={14} />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 text-xs sm:text-[13px] text-slate-300 leading-relaxed border-t border-slate-800/60 pt-2.5">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* 24/7 Human Help Desk Ribbon */}
      <div className="mt-4 rounded-2xl border border-amber-500/20 bg-slate-950/90 p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 text-left">
          <div className="h-9 w-9 rounded-xl bg-amber-950/50 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <MessageSquare size={16} />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-white">Need personal assistance or custom VIP limits?</div>
            <div className="text-[10px] text-slate-400">Our 24/7 institutional desk responds in under 4 minutes.</div>
          </div>
        </div>
        <Link
          to="/support"
          className="rounded-xl border border-amber-500/30 bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-white hover:border-amber-400 hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
        >
          Contact Support Desk
        </Link>
      </div>
    </section>
  )
}
