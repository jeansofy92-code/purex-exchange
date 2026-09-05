import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Star, Sparkles, ShieldCheck, Zap } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import mascotImg from '../../assets/brand/purex-mascot.jpg'

const heroSlides = [
  {
    id: 1,
    badge: 'NEW',
    title: 'AI Trading Bot 360',
    rating: '9.8',
    stars: 5,
    subtitle: 'Automated 24/7 algorithmic execution with 24.8% APY yield.',
    cta: 'Explore Vaults',
    link: '#staking-matrix',
  },
  {
    id: 2,
    badge: 'PRO ENGINE',
    title: 'Purex Terminal v2.4',
    rating: '9.9',
    stars: 5,
    subtitle: 'Sub-millisecond FIX & WebSocket order routing engine.',
    cta: 'Launch Terminal',
    link: '/trade',
  },
  {
    id: 3,
    badge: 'AUDITED',
    title: 'SAFU Reserve $125M',
    rating: '10.0',
    stars: 5,
    subtitle: '108.4% cryptographic Merkle proof of solvency backing.',
    cta: 'Verify Reserves',
    link: '/security',
  },
]

export default function HeroCommandCenter() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const navigate = useNavigate()

  const slide = heroSlides[currentSlide]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <section className="relative mx-auto max-w-[1440px] px-4 pt-4 pb-8 sm:px-6 lg:px-12 lg:pt-6 lg:pb-12 overflow-hidden">
      {/* ================= BACKGROUND ORBITAL CONCENTRIC RINGS & SPARKLES ================= */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center" aria-hidden="true">
        {/* Deep Cosmic Radial Glow */}
        <div className="absolute w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] rounded-full bg-[radial-gradient(circle,rgba(40,53,147,0.45)_0%,rgba(21,25,56,0.15)_50%,transparent_75%)] blur-2xl" />

        {/* Concentric Orbital Rings */}
        <div className="absolute w-[320px] sm:w-[460px] lg:w-[560px] h-[320px] sm:h-[460px] lg:h-[560px] rounded-full border border-white/10 opacity-70" />
        <div className="absolute w-[440px] sm:w-[620px] lg:w-[740px] h-[440px] sm:h-[620px] lg:h-[740px] rounded-full border border-white/[0.06] opacity-50" />
        <div className="absolute w-[580px] sm:w-[820px] lg:w-[960px] h-[580px] sm:h-[820px] lg:h-[960px] rounded-full border border-white/[0.03]" />

        {/* Diagonal Cross Ring Orbit */}
        <div className="absolute w-[480px] sm:w-[680px] h-[260px] sm:h-[340px] rounded-[100%] border border-[#ff7a00]/20 -rotate-12 opacity-60" />

        {/* 4-Point Diamond Sparkles */}
        <span className="absolute top-[12%] left-[10%] text-white/30 text-xl font-mono select-none animate-pulse">✦</span>
        <span className="absolute top-[28%] left-[22%] text-white/20 text-sm font-mono select-none">✧</span>
        <span className="absolute top-[15%] right-[14%] text-white/30 text-2xl font-mono select-none animate-pulse" style={{ animationDelay: '1s' }}>✦</span>
        <span className="absolute bottom-[20%] left-[8%] text-white/25 text-lg font-mono select-none">✦</span>
        <span className="absolute bottom-[25%] right-[12%] text-white/30 text-xl font-mono select-none">✧</span>
        <span className="absolute top-[8%] left-[48%] text-white/20 text-base font-mono select-none">✦</span>
      </div>

      {/* ================= 3-COLUMN HERO CONTENT ================= */}
      <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1.1fr_1fr] lg:gap-4 xl:gap-8 min-h-[460px] sm:min-h-[500px]">
        {/* ---------- LEFT WING: "Think Forward" Style Headline & Pill Button ---------- */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-4"
        >
          {/* Main Headline */}
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[3.75rem] leading-[1.06]">
            Think <br />
            <span className="text-white">Forward.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base leading-relaxed text-slate-300 max-w-xs font-normal">
            Institutional intelligence and 0% fee liquidity to future-proof your crypto wealth.
          </p>

          {/* Vibrant Orange Rounded-Full Pill CTA Button with Arrow */}
          <div className="pt-2">
            <Link
              to="/signup"
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#ff7a00] to-[#ff9500] px-7 py-3.5 text-sm font-bold text-white shadow-[0_0_25px_rgba(255,122,0,0.55)] hover:shadow-[0_0_35px_rgba(255,122,0,0.8)] hover:scale-[1.04] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Start trading now!</span>
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                <ArrowRight size={12} className="text-white" />
              </div>
            </Link>
          </div>

          {/* Micro Trust Indicators */}
          <div className="pt-2 flex items-center gap-3 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              <span>0% Deposit Fees</span>
            </span>
            <span>•</span>
            <span>$125M SAFU Protected</span>
          </div>
        </motion.div>

        {/* ---------- CENTER: FLOATING 3D CYBER MASCOT IN ORBITAL CIRCLE ---------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="relative flex items-center justify-center my-4 lg:my-0"
        >
          {/* Circular Glowing Glass Portal Frame */}
          <div className="relative flex h-[280px] w-[280px] sm:h-[340px] sm:w-[340px] lg:h-[380px] lg:w-[380px] items-center justify-center rounded-full border border-white/20 bg-gradient-to-b from-white/[0.08] to-transparent p-3 backdrop-blur-sm shadow-[0_0_50px_rgba(40,53,147,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)]">
            {/* Mascot Image with Gentle Levitation Animation */}
            <motion.div
              animate={{
                y: [0, -12, 0],
                rotate: [0, 1.2, 0, -1.2, 0],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative z-10 w-full h-full flex items-center justify-center"
            >
              <img
                src={mascotImg}
                alt="Purex 3D Crypto Mascot"
                className="h-[90%] w-[90%] select-none object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)] rounded-full"
                loading="eager"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* ---------- RIGHT WING: FEATURE CARD & PAGINATION SWITCHER ---------- */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.15 }}
          className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-4"
        >
          {/* Animated Feature Box */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-2 max-w-xs"
            >
              {/* Badge */}
              <div className="text-[11px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                {slide.badge}
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                {slide.title}
              </h3>

              {/* Rating & Stars */}
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <span className="text-2xl font-black text-white font-mono">{slide.rating}</span>
                <div className="flex text-[#ff7a00]">
                  {[...Array(slide.stars)].map((_, i) => (
                    <Star key={i} size={14} fill="#ff7a00" stroke="#ff7a00" />
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed">
                {slide.subtitle}
              </p>

              {/* Link */}
              <div className="pt-1">
                <a
                  href={slide.link}
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-300 hover:text-white transition-colors"
                >
                  <span>{slide.cta}</span>
                  <span className="text-[#ff7a00]">›</span>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Pagination Circle Buttons (< and >) */}
          <div className="flex items-center gap-3 pt-3">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous feature"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1b2149] border border-white/15 text-white hover:bg-white/10 transition-all cursor-pointer shadow"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next feature"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff7a00] text-white shadow-[0_0_15px_rgba(255,122,0,0.5)] hover:bg-[#ff9500] hover:scale-105 transition-all cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* ================= COMPACT TICKER BAR RIBBON ================= */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#161a3c]/90 px-4 py-2.5 backdrop-blur-xl shadow-xl font-mono text-xs">
        <div className="flex flex-wrap items-center gap-4 sm:gap-8">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-sans font-bold text-[11px]">BTC/USDT</span>
            <span className="font-bold text-white">$68,573.40</span>
            <span className="text-emerald-400 font-semibold">+3.42%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-sans font-bold text-[11px]">ETH/USDT</span>
            <span className="font-bold text-white">$3,742.15</span>
            <span className="text-emerald-400 font-semibold">+4.81%</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-slate-400 font-sans font-bold text-[11px]">SOL/USDT</span>
            <span className="font-bold text-white">$172.80</span>
            <span className="text-emerald-400 font-semibold">+6.35%</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="text-slate-400 font-sans font-bold text-[11px]">PUREX/USDT</span>
            <span className="font-bold text-white">$4.85</span>
            <span className="text-[#ff7a00] font-semibold">+14.20%</span>
          </div>
        </div>

        <Link
          to="/markets"
          className="ml-auto inline-flex items-center gap-1 font-sans text-xs font-bold text-white hover:text-[#ff7a00] transition-colors"
        >
          <span>All 150+ Markets</span>
          <ChevronRight size={13} />
        </Link>
      </div>
    </section>
  )
}
