import { motion } from 'framer-motion'
import { Shield, Lock, Fingerprint, KeyRound, BellRing, ShieldCheck } from 'lucide-react'
import { securityFeatures } from '../data/marketData'

const featureIcons = [
  { icon: Lock, label: 'Two-factor authentication' },
  { icon: Shield, label: 'Cold storage' },
  { icon: ShieldCheck, label: 'Account protection' },
  { icon: Fingerprint, label: 'Encryption' },
  { icon: BellRing, label: 'Login alerts' },
  { icon: KeyRound, label: 'Withdrawal protection' },
]

function Security() {
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-10">
      <div className="security-panel">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="eyebrow mb-4">SECURITY FIRST</p>
            <h2 className="section-heading text-[2.4rem] leading-[1.05] md:text-[3.3rem]">
              Your Assets.<br />Our Priority.
            </h2>
            <p className="mt-5 max-w-[560px] text-lg leading-8 text-[#8d9691]">
              Built to keep your funds protected with layered security, real-time alerts, and institutional-grade safeguards.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {securityFeatures.map((feature, index) => {
                const Icon = featureIcons[index].icon
                return (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                    className="security-item"
                  >
                    <div className="security-bullet"><Icon size={15} /></div>
                    <span>{feature}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="security-visual"
          >
            <div className="shield-core">
              <Shield size={110} strokeWidth={1.5} />
            </div>
            <div className="shield-ring shield-ring-one" />
            <div className="shield-ring shield-ring-two" />
            <div className="shield-ring shield-ring-three" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Security
