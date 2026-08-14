import { motion } from 'framer-motion'
import { ShieldCheck, FileCheck, CheckCircle2, Lock, ExternalLink } from 'lucide-react'
import { safuAllocations } from '../../data/securityData'

function SafuFundSection() {
  return (
    <section className="relative py-16 sm:py-24 bg-[#050708]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#58e65b]/30 bg-[#183a1d]/60 px-4 py-1.5 text-xs font-bold text-[#58e65b]">
            <ShieldCheck size={14} />
            <span>Guaranteed Capital Backing</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            $100M SAFU Emergency Reserve &{' '}
            <span className="bg-gradient-to-r from-[#58e65b] via-[#85f487] to-[#38bdf8] bg-clip-text text-transparent">
              1:1 Proof of Reserves
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#8d9691] leading-relaxed">
            We hold all customer deposits 1:1 on-chain. In addition, our $100 Million Secure Asset Fund for Users (SAFU) provides a liquid capital buffer to protect our community in all market conditions.
          </p>
        </div>

        {/* 2-Column Split: SAFU Allocation vs Proof of Reserves */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: SAFU Portfolio Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 rounded-3xl border border-white/15 bg-[#080d0e]/95 p-7 sm:p-9 backdrop-blur-xl shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#8d9691]">
                    SAFU Reserve Value
                  </div>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-white mt-1">
                    $100,000,000 USD
                  </div>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-[#183a1d] flex items-center justify-center text-[#58e65b] border border-[#58e65b]/30">
                  <ShieldCheck size={24} />
                </div>
              </div>

              {/* Asset Allocation Bars */}
              <div className="space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-[#8d9691]">
                  Emergency Vault Allocations:
                </div>

                {safuAllocations.map((item) => (
                  <div key={item.asset} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-white font-bold">{item.asset}</span>
                      <span className="font-mono text-[#dfe9e2]">{item.value} ({item.share})</span>
                    </div>
                    <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${item.barPct}%`,
                          backgroundColor: item.color,
                          boxShadow: `0 0 10px ${item.color}60`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#8d9691]">
              <span className="flex items-center gap-1.5 text-[#58e65b] font-semibold">
                <CheckCircle2 size={14} />
                Audited & Stored in Multi-Sig Cold Vaults
              </span>
              <span className="font-mono text-white">Live On-Chain</span>
            </div>
          </motion.div>

          {/* Right Column: Merkle Tree Proof of Reserves */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 rounded-3xl border border-white/15 bg-[#080d0e]/95 p-7 sm:p-9 backdrop-blur-xl shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#8d9691]">
                    Solvency Standard
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white mt-1">
                    100% Merkle Tree Reserves
                  </div>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-[#183a1d] flex items-center justify-center text-[#58e65b] border border-[#58e65b]/30">
                  <FileCheck size={24} />
                </div>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm text-[#8d9691] leading-relaxed">
                <p>
                  Every single satoshi and cent deposited with PUREX is verifiable through our cryptographic Merkle tree architecture. You can mathematically verify that your assets are safely in custody.
                </p>

                <div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <Lock size={14} className="text-[#58e65b]" />
                    <span>Zero Fractional Reserve Policy</span>
                  </div>
                  <p className="text-[0.72rem] text-[#8d9691]">
                    PUREX does not engage in unbacked lending, collateral re-hypothecation, or off-balance sheet investments. Customer funds remain 100% yours.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[#8d9691]">Independent Monthly Audits</span>
              <a
                href="#security-faq"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#58e65b] hover:underline"
              >
                <span>Learn How To Verify</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default SafuFundSection
