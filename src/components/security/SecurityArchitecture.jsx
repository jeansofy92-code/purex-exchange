import { motion } from 'framer-motion'
import { Fingerprint, Cpu, Lock, ShieldCheck, Check } from 'lucide-react'
import { securityPillars } from '../../data/securityData'

const layerIcons = {
  Fingerprint: Fingerprint,
  Cpu: Cpu,
  Lock: Lock,
  ShieldCheck: ShieldCheck,
}

function SecurityArchitecture() {
  return (
    <section id="security-layers" className="relative py-16 sm:py-24 bg-[#0e1124] border-t border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#ff7a00]/5 blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#ff7a00]/30 bg-[#ff7a00]/10 px-4 py-1.5 text-xs font-bold text-[#ff7a00] backdrop-blur-md">
            <Lock size={14} />
            <span>Layered Defense in Depth</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            The Four Pillars of{' '}
            <span className="bg-gradient-to-r from-[#ff7a00] via-[#ffaa33] to-[#38bdf8] bg-clip-text text-transparent">
              PUREX Security Architecture
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Every transaction, account login, and smart contract interaction is fortified by overlapping, redundant layers of cryptographic and physical defense.
          </p>
        </div>

        {/* 4 Layer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {securityPillars.map((pillar, index) => {
            const Icon = layerIcons[pillar.icon] || ShieldCheck

            return (
              <motion.div
                key={pillar.layer}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className={`relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#15193b]/90 p-7 sm:p-9 backdrop-blur-xl transition-all duration-300 group ${pillar.borderGlow}`}
              >
                <div>
                  {/* Layer Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border"
                      style={{
                        borderColor: `${pillar.accent}40`,
                        backgroundColor: `${pillar.accent}15`,
                        color: pillar.accent,
                      }}
                    >
                      {pillar.layer}
                    </span>

                    <div
                      className="h-12 w-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg"
                      style={{
                        backgroundColor: `${pillar.accent}20`,
                        color: pillar.accent,
                        boxShadow: `0 0 20px ${pillar.accent}30`,
                      }}
                    >
                      <Icon size={24} />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-1.5 group-hover:text-[#ff7a00] transition-colors">
                    {pillar.name}
                  </h3>
                  <p className="text-xs text-slate-400 mb-6 font-medium">
                    {pillar.subtitle}
                  </p>

                  {/* Bullet Points */}
                  <div className="space-y-3">
                    {pillar.points.map((point, pIndex) => (
                      <div key={pIndex} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                        <div
                          className="mt-0.5 rounded-full p-0.5 shrink-0"
                          style={{
                            backgroundColor: `${pillar.accent}25`,
                            color: pillar.accent,
                          }}
                        >
                          <Check size={12} strokeWidth={3} />
                        </div>
                        <span className="leading-snug">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Assurance */}
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Zero Single-Point of Failure</span>
                  <span style={{ color: pillar.accent }}>Strictly Active</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default SecurityArchitecture
