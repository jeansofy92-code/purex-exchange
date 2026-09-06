import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { UserPlus, Wallet, TrendingUp, Play } from 'lucide-react'
import heroMockup from '../../assets/brand/purex-hero-scene.png'

export default function GetStartedPreview() {
  const steps = [
    {
      num: '1',
      icon: <UserPlus size={18} className="text-[#356df1]" />,
      title: 'Create a free account',
      desc: 'Register in under 60 seconds with your email and phone number. No lengthy verification delays.',
    },
    {
      num: '2',
      icon: <Wallet size={18} className="text-emerald-400" />,
      title: 'Deposit crypto funds',
      desc: 'Deposit USDT, BTC, ETH, or SOL into your institutional wallet with 0% platform deposit fees.',
    },
    {
      num: '3',
      icon: <TrendingUp size={18} className="text-[#ff7a00]" />,
      title: 'Deploy bots & start trading',
      desc: 'Activate high-yield autonomous AI trading bots or trade live on the spot exchange.',
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-[#0d0f22] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <motion.h2
              initial={{ opacity: 0, y: 35, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]"
            >
              Get started today in 3 simple steps
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-slate-400 text-sm sm:text-base leading-relaxed"
            >
              Start building your crypto wealth with automated daily settlements and bank-grade digital asset custody.
            </motion.p>

            {/* 3 Step Cards */}
            <div className="space-y-4 pt-2">
              {steps.map((st, idx) => (
                <motion.div
                  key={st.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: 0.15 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-4 rounded-2xl border border-white/5 bg-[#141731] p-4 hover:border-white/15 transition-colors"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1e2348] border border-white/5 font-mono font-black text-white">
                    {st.num}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base flex items-center gap-2">
                      <span>{st.title}</span>
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm mt-0.5">{st.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="pt-2"
            >
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-full bg-[#356df1] hover:bg-[#2b5bd4] px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
              >
                <span>Create Free Account</span>
              </Link>
            </motion.div>
          </div>

          {/* Right Preview Card */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-3xl border border-white/10 bg-[#141733] p-4 shadow-2xl overflow-hidden group">
              <img
                src={heroMockup}
                alt="Platform Preview"
                className="w-full h-auto rounded-2xl object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-3xl backdrop-blur-[2px]">
                <Link
                  to="/trade"
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-[#356df1] text-white shadow-[0_0_25px_rgba(53,109,241,0.5)] hover:scale-110 transition-transform"
                >
                  <Play size={24} className="ml-1 fill-white" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
