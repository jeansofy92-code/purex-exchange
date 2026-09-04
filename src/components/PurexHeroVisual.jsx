import { motion } from 'framer-motion'
import { Sparkles, Shield, TrendingUp } from 'lucide-react'

function PurexHeroVisual() {
  return (
    <div className="relative flex w-full max-w-[620px] items-center justify-center p-2">
      {/* Background ambient luxury gold aura */}
      <div
        className="pointer-events-none absolute -inset-6 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(212, 175, 55, 0.28) 0%, rgba(140, 109, 35, 0.12) 45%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* Floating 3D Gold Vault Centerpiece */}
      <motion.div
        animate={{
          y: [0, -12, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative z-10 w-full overflow-hidden rounded-3xl border border-[rgba(212,175,55,0.35)] shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(212,175,55,0.2)]"
      >
        <img
          src="/purex-gold-vault.jpg"
          alt="PUREX 3D Gold Vault Emblem"
          className="h-auto w-full select-none object-cover transition-transform duration-700 hover:scale-105"
          loading="eager"
        />

        {/* Subtle glass reflection overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
      </motion.div>

      {/* Floating Institutional Badge: Top Right */}
      <motion.div
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
        className="absolute -right-2 top-6 z-20 hidden rounded-2xl border border-[rgba(212,175,55,0.4)] bg-[rgba(12,15,20,0.85)] p-3 shadow-2xl backdrop-blur-xl sm:flex items-center gap-3"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00e676]/15 text-[#00e676] border border-[#00e676]/30">
          <TrendingUp size={18} />
        </div>
        <div>
          <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
            Portfolio Alpha
          </div>
          <div className="font-mono text-sm font-black text-[#00e676]">+2.74%</div>
        </div>
      </motion.div>

      {/* Floating Institutional Badge: Bottom Left */}
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute -left-2 bottom-8 z-20 hidden rounded-2xl border border-[rgba(212,175,55,0.4)] bg-[rgba(12,15,20,0.85)] p-3 shadow-2xl backdrop-blur-xl sm:flex items-center gap-3"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#d4af37]/15 text-[#f7e09e] border border-[#d4af37]/30">
          <Shield size={18} />
        </div>
        <div>
          <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
            Institutional SAFU
          </div>
          <div className="font-mono text-sm font-black text-white">$1.2B Backed</div>
        </div>
      </motion.div>
    </div>
  )
}

export default PurexHeroVisual
