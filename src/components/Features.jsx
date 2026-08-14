import { motion } from 'framer-motion'
import { Headphones, ShieldCheck, TrendingUp, Wallet } from 'lucide-react'
import { featureCards } from '../data/marketData'

const iconMap = {
  TrendingUp,
  Wallet,
  ShieldCheck,
  Headphones,
}

function Features() {
  const steps = [
    {
      number: '1',
      title: 'Choose a Plan',
      description: 'Select an investment plan based on your preferred investment amount and strategy.',
    },
    {
      number: '2',
      title: 'Deposit',
      description: 'Fund your PUREX account securely using the available payment options.',
    },
    {
      number: '3',
      title: 'Automated Trading',
      description: "Once your investment is active, PUREX's automated trading system manages trading activity according to the selected strategy.",
    },
    {
      number: '4',
      title: 'Track Your Investment',
      description: 'Monitor your balance and investment performance directly from your dashboard.',
    },
    {
      number: '5',
      title: 'Withdraw When Available',
      description: 'Request withdrawals according to the terms of your selected plan, with clear fees and conditions shown before you invest.',
    },
  ]

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-10">
      <div className="mb-16">
        <h2 className="section-heading mb-6">Trade Smarter.<br />Grow With PUREX.</h2>
        <p className="max-w-[800px] text-lg leading-8 text-[#8d9691]">
          PUREX is a modern digital asset investment platform designed to make cryptocurrency investing simple, accessible, and automated. Choose an investment plan that fits your goals, fund your account, and let our automated trading system put your capital to work across digital-asset markets.
        </p>
      </div>

      <div className="mb-16">
        <h3 className="text-3xl font-semibold text-white mb-8">How it works</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="flex flex-col"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#58e65b] bg-opacity-20 border border-[#58e65b] flex items-center justify-center">
                  <span className="text-lg font-bold text-[#58e65b]">{step.number}</span>
                </div>
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">{step.title}</h4>
              <p className="text-sm leading-6 text-[#8d9691]">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featureCards.map((card, index) => {
          const Icon = iconMap[card.icon]

          return (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="feature-card"
            >
              <div className="feature-icon">
                <Icon size={22} />
              </div>
              <h3 className="mt-5 text-2xl font-semibold text-white">{card.title}</h3>
              <p className="mt-3 text-[0.96rem] leading-7 text-[#8d9691]">{card.description}</p>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}

export default Features
