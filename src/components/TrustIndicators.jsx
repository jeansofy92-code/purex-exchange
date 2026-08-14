import { motion } from 'framer-motion'
import { Shield, Zap, Users } from 'lucide-react'

const items = [
  {
    title: 'Secure',
    text: 'Bank-level security for your assets',
    icon: Shield,
  },
  {
    title: 'Fast',
    text: 'Lightning-fast transactions',
    icon: Zap,
  },
  {
    title: 'Trusted',
    text: 'Trusted by thousands of traders worldwide',
    icon: Users,
  },
]

function TrustIndicators() {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-6 sm:gap-8 lg:gap-10">
      {items.map((item, index) => {
        const Icon = item.icon
        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.1 }}
            className="flex items-start gap-3"
          >
            <div className="mt-0.5 text-[#58E65B]">
              <Icon size={20} strokeWidth={2.2} />
            </div>
            <div>
              <div className="text-sm font-semibold text-white tracking-wide">{item.title}</div>
              <p className="mt-0.5 max-w-[140px] text-xs leading-relaxed text-[#8d9691]">{item.text}</p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default TrustIndicators

