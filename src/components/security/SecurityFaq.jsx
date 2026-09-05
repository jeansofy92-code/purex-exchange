import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle, ShieldAlert } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { securityFaqs } from '../../data/securityData'

function SecurityFaq() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <section id="security-faq" className="relative py-16 sm:py-24 bg-[#0c0e22] border-t border-white/10">
      <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#ff7a00]/30 bg-[#ff7a00]/10 px-4 py-1.5 text-xs font-bold text-[#ff7a00]">
            <HelpCircle size={14} />
            <span>Security FAQs</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Security & Custody Questions
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            Clear answers on how we protect your capital, manage private keys, and respond to threats.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {securityFaqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#ff7a00]/40 bg-[#15193b] shadow-[0_0_20px_rgba(255,122,0,0.1)]'
                    : 'border-white/10 bg-[#11142c]/70 hover:border-white/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
                >
                  <span className="text-sm sm:text-base font-bold text-white pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`p-1.5 rounded-lg border transition-transform duration-200 shrink-0 ${
                      isOpen
                        ? 'rotate-180 bg-[#ff7a00]/15 text-[#ff7a00] border-[#ff7a00]/40'
                        : 'bg-white/5 text-slate-400 border-white/10'
                    }`}
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/10 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* Emergency Kill-Switch Callout */}
        <div className="mt-12 p-6 rounded-2xl border border-rose-500/30 bg-[#15193b] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="h-10 w-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
              <ShieldAlert size={20} />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Suspect unauthorized activity?</div>
              <div className="text-xs text-slate-400">Trigger an instant 1-click self-freeze or reach our emergency Red Team SOC.</div>
            </div>
          </div>
          <NavLink
            to="/support"
            className="px-5 py-2.5 rounded-xl border border-rose-500/40 bg-rose-500/20 text-xs font-bold text-rose-300 hover:bg-rose-500/30 transition-colors shrink-0"
          >
            Emergency SOC Support
          </NavLink>
        </div>
      </div>
    </section>
  )
}

export default SecurityFaq
