import { motion } from 'framer-motion'
import { Award, Bug, CheckCircle2, ShieldCheck } from 'lucide-react'
import { complianceBadges, bountyTiers } from '../../data/securityData'

function ComplianceBounty() {
  return (
    <section className="relative py-16 sm:py-24 bg-[#0c0e22] border-t border-white/10">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Section 1: Certifications Grid */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ff7a00]/30 bg-[#ff7a00]/10 px-4 py-1.5 text-xs font-bold text-[#ff7a00]">
              <Award size={14} />
              <span>Global Compliance & Auditing Standards</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Certified by the World’s Leading Security Auditors
            </h2>

            <p className="text-sm sm:text-base text-slate-300">
              Our systems undergo continuous rigorous scrutiny from top-tier cybersecurity and compliance organizations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceBadges.map((badge, index) => (
              <motion.div
                key={badge.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="rounded-3xl border border-white/10 bg-[#15193b]/90 p-6 flex flex-col justify-between hover:border-[#ff7a00]/40 hover:shadow-[0_0_25px_rgba(255,122,0,0.15)] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-base font-black text-white group-hover:text-[#ff7a00] transition-colors">
                      {badge.name}
                    </span>
                    <span className="rounded-full bg-[#ff7a00]/15 px-2.5 py-0.5 text-[0.65rem] font-bold text-[#ff7a00] border border-[#ff7a00]/30">
                      {badge.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-1.5 text-[0.7rem] text-slate-300 font-semibold">
                  <CheckCircle2 size={13} className="text-[#ff7a00]" />
                  <span>Annual Independent Audit</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 2: $2,500,000 Bug Bounty Program Banner */}
        <div className="rounded-3xl border border-[#ff7a00]/30 bg-gradient-to-r from-[#1c2146] via-[#15193b] to-[#11142c] p-7 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#ff7a00]/20 px-3 py-1 text-xs font-black text-[#ff7a00] border border-[#ff7a00]/40">
                <Bug size={14} />
                <span>$2,500,000 Global Bug Bounty</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                Crowdsourced Defense with Top Ethical Hackers
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In partnership with Immunefi and HackerOne, we incentivize the world’s most elite security researchers to continuously test our infrastructure, smart contracts, and web clients.
              </p>

              <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
                <span className="flex items-center gap-1 text-white font-bold">
                  <ShieldCheck size={15} className="text-[#ff7a00]" />
                  24h Rapid Response SLA
                </span>
                <span>•</span>
                <span>Fast Bounty Payouts</span>
              </div>
            </div>

            {/* Right: Bounty Tiers Grid */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-3">
              {bountyTiers.map((tier) => (
                <div
                  key={tier.severity}
                  className="rounded-2xl border border-white/10 bg-[#0c0e22]/80 p-4 space-y-1 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-white">{tier.severity}</span>
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: tier.color, boxShadow: `0 0 8px ${tier.color}` }}
                    />
                  </div>
                  <div
                    className="text-base sm:text-lg font-black font-mono"
                    style={{ color: tier.color }}
                  >
                    {tier.reward}
                  </div>
                  <div className="text-[0.65rem] text-slate-400">Per Valid Disclosure</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ComplianceBounty
