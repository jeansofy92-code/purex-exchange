import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  Activity,
  ChevronRight,
  RefreshCw,
  Sparkles,
  Lock,
  Flame,
  Layers,
  ArrowDownUp,
  CheckCircle2
} from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import CoinLogo from '../CoinLogo'
import RealisticChart from '../RealisticChart'

const sampleTerminalPairs = [
  {
    symbol: 'BTC',
    pair: 'BTC/USDT',
    price: '68,573.40',
    rawPrice: 68573.4,
    change: '+3.42%',
    isPositive: true,
    high24: '69,210.00',
    low24: '66,140.50',
    vol24: '$1,420,890,210',
    depthBids: [
      { price: '68,572.50', amount: '1.420 BTC', total: '$97.3K', width: '85%' },
      { price: '68,570.00', amount: '3.810 BTC', total: '$261.2K', width: '70%' },
      { price: '68,565.20', amount: '5.105 BTC', total: '$349.9K', width: '92%' },
      { price: '68,560.00', amount: '8.400 BTC', total: '$575.9K', width: '60%' },
    ],
    depthAsks: [
      { price: '68,575.00', amount: '1.120 BTC', total: '$76.8K', width: '45%' },
      { price: '68,578.50', amount: '2.940 BTC', total: '$201.6K', width: '68%' },
      { price: '68,582.00', amount: '4.750 BTC', total: '$325.7K', width: '88%' },
      { price: '68,590.00', amount: '9.210 BTC', total: '$631.5K', width: '95%' },
    ],
    trend: [66200, 66800, 66400, 67100, 67900, 67400, 68573],
  },
  {
    symbol: 'ETH',
    pair: 'ETH/USDT',
    price: '3,742.15',
    rawPrice: 3742.15,
    change: '+4.81%',
    isPositive: true,
    high24: '3,780.00',
    low24: '3,550.00',
    vol24: '$840,412,900',
    depthBids: [
      { price: '3,741.50', amount: '14.20 ETH', total: '$53.1K', width: '75%' },
      { price: '3,740.00', amount: '28.50 ETH', total: '$106.6K', width: '90%' },
      { price: '3,738.20', amount: '45.10 ETH', total: '$168.6K', width: '65%' },
      { price: '3,735.00', amount: '80.00 ETH', total: '$298.8K', width: '80%' },
    ],
    depthAsks: [
      { price: '3,743.00', amount: '12.00 ETH', total: '$44.9K', width: '50%' },
      { price: '3,745.50', amount: '31.40 ETH', total: '$117.6K', width: '70%' },
      { price: '3,748.00', amount: '52.00 ETH', total: '$194.8K', width: '85%' },
      { price: '3,752.00', amount: '95.00 ETH', total: '$355.5K', width: '92%' },
    ],
    trend: [3550, 3610, 3590, 3680, 3710, 3690, 3742],
  },
  {
    symbol: 'SOL',
    pair: 'SOL/USDT',
    price: '172.80',
    rawPrice: 172.8,
    change: '+6.35%',
    isPositive: true,
    high24: '176.40',
    low24: '161.20',
    vol24: '$492,050,110',
    depthBids: [
      { price: '172.70', amount: '120.5 SOL', total: '$20.8K', width: '65%' },
      { price: '172.40', amount: '340.0 SOL', total: '$58.7K', width: '85%' },
      { price: '172.00', amount: '520.0 SOL', total: '$89.8K', width: '90%' },
      { price: '171.50', amount: '890.0 SOL', total: '$153.5K', width: '70%' },
    ],
    depthAsks: [
      { price: '173.00', amount: '150.0 SOL', total: '$25.9K', width: '55%' },
      { price: '173.50', amount: '410.0 SOL', total: '$71.1K', width: '75%' },
      { price: '174.00', amount: '680.0 SOL', total: '$118.3K', width: '92%' },
      { price: '174.80', amount: '1100 SOL', total: '$192.2K', width: '88%' },
    ],
    trend: [161, 164, 163, 168, 170, 169, 172.8],
  },
  {
    symbol: 'PUREX',
    pair: 'PUREX/USDT',
    price: '4.85',
    rawPrice: 4.85,
    change: '+14.20%',
    isPositive: true,
    high24: '5.10',
    low24: '4.15',
    vol24: '$88,420,000',
    depthBids: [
      { price: '4.84', amount: '5,000 PUREX', total: '$24.2K', width: '90%' },
      { price: '4.82', amount: '12,500 PUREX', total: '$60.2K', width: '85%' },
      { price: '4.80', amount: '25,000 PUREX', total: '$120.0K', width: '95%' },
      { price: '4.75', amount: '50,000 PUREX', total: '$237.5K', width: '70%' },
    ],
    depthAsks: [
      { price: '4.86', amount: '4,200 PUREX', total: '$20.4K', width: '50%' },
      { price: '4.88', amount: '9,800 PUREX', total: '$47.8K', width: '65%' },
      { price: '4.92', amount: '22,000 PUREX', total: '$108.2K', width: '82%' },
      { price: '4.98', amount: '45,000 PUREX', total: '$224.1K', width: '90%' },
    ],
    trend: [4.15, 4.3, 4.25, 4.5, 4.65, 4.72, 4.85],
  },
]

export default function HeroCommandCenter() {
  const [email, setEmail] = useState('')
  const [selectedPair, setSelectedPair] = useState(sampleTerminalPairs[0])
  const [activeTerminalTab, setActiveTerminalTab] = useState('orderbook') // 'orderbook' | 'quickswap'
  const [swapAmount, setSwapAmount] = useState('1000')
  const [showPromo, setShowPromo] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [livePulse, setLivePulse] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      setLivePulse((prev) => !prev)
    }, 2500)
    return () => clearInterval(timer)
  }, [])

  const handleQuickStart = (e) => {
    e.preventDefault()
    const query = new URLSearchParams()
    if (email.trim()) query.set('email', email.trim())
    if (promoCode.trim()) query.set('ref', promoCode.trim())
    navigate(`/signup?${query.toString()}`)
  }

  const calculatedCrypto = (parseFloat(swapAmount) || 0) / selectedPair.rawPrice

  return (
    <section className="relative mx-auto max-w-[1440px] px-3.5 pt-4 pb-8 sm:px-6 lg:px-10 lg:pt-8 lg:pb-12">
      <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.95fr] lg:gap-10 xl:gap-12">
        {/* ================= LEFT WING: COMMAND & VALUE HEADLINE ================= */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col justify-center"
        >
          {/* Status & Latency Badge Ribbon */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-400 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span>MATCHING ENGINE: ONLINE (1.2ms)</span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs text-slate-400">
              <ShieldCheck size={13} className="text-emerald-400" />
              <span>100% Merkle Proof of Reserves</span>
            </div>
          </div>

          {/* Core Institutional Headline */}
          <h1 className="text-[2.25rem] font-extrabold tracking-tight text-white sm:text-[3.25rem] lg:text-[3.75rem] leading-[1.08]">
            Next-Gen Digital Asset <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Trading & Staking Engine
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-300 max-w-xl font-normal">
            Direct institutional liquidity, <strong className="text-white">0.05% ultra-low maker fees</strong>, and automated algorithmic yield pools. Built for professional traders and long-term crypto asset growth.
          </p>

          {/* Quick Onboarding Card */}
          <div className="mt-6 rounded-2xl border border-slate-800/90 bg-[#090d14]/90 p-4 sm:p-5 backdrop-blur-xl shadow-2xl">
            <form onSubmit={handleQuickStart} className="space-y-3">
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email to trade with 0% fee credit"
                    className="w-full rounded-xl border border-slate-700/80 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-all font-mono"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:bg-emerald-300 transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
                >
                  <span>Claim $100 Bonus</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Referral Toggle */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <button
                  type="button"
                  onClick={() => setShowPromo(!showPromo)}
                  className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>{showPromo ? '− Hide Referral / VIP Code' : '+ Have a VIP Invitation Code?'}</span>
                </button>
                <span className="text-[11px] text-slate-500">Instant KYC in &lt;60s</span>
              </div>

              <AnimatePresence>
                {showPromo && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="ENTER PROMO / VIP CODE (OPTIONAL)"
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-mono uppercase text-emerald-400 placeholder-slate-600 focus:border-emerald-400 focus:outline-none"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            {/* Fast Deposit Channels Strip */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/80 pt-3 text-[11px] text-slate-400">
              <span className="font-semibold text-slate-300">Accepted Onramps:</span>
              <div className="flex flex-wrap items-center gap-2 font-mono">
                <span className="rounded bg-slate-900 px-2 py-0.5 border border-slate-800 text-slate-300">VISA / MC</span>
                <span className="rounded bg-slate-900 px-2 py-0.5 border border-slate-800 text-slate-300">Apple Pay</span>
                <span className="rounded bg-slate-900 px-2 py-0.5 border border-slate-800 text-slate-300">SEPA Instant</span>
                <span className="rounded bg-slate-900 px-2 py-0.5 border border-slate-800 text-emerald-400">USDT (0% Fee)</span>
              </div>
            </div>
          </div>

          {/* High-Density Key Metrics Bar */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3 backdrop-blur-md">
              <div className="text-[11px] font-semibold text-slate-400">24h Volume</div>
              <div className="mt-1 font-mono text-lg font-bold text-white">$2.48B</div>
              <div className="text-[10px] text-emerald-400 font-mono">+12.4% vs 7d</div>
            </div>

            <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3 backdrop-blur-md">
              <div className="text-[11px] font-semibold text-slate-400">Active Traders</div>
              <div className="mt-1 font-mono text-lg font-bold text-white">254,890</div>
              <div className="text-[10px] text-emerald-400 font-mono">Global Liquidity</div>
            </div>

            <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3 backdrop-blur-md">
              <div className="text-[11px] font-semibold text-slate-400">SAFU Reserve</div>
              <div className="mt-1 font-mono text-lg font-bold text-white">$125.0M</div>
              <div className="text-[10px] text-emerald-400 font-mono">108.4% Collateral</div>
            </div>

            <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3 backdrop-blur-md">
              <div className="text-[11px] font-semibold text-slate-400">Yield Paid Out</div>
              <div className="mt-1 font-mono text-lg font-bold text-white">$42.8M</div>
              <div className="text-[10px] text-emerald-400 font-mono">Daily Automated</div>
            </div>
          </div>
        </motion.div>

        {/* ================= RIGHT WING: LIVE INTERACTIVE TERMINAL PREVIEW ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
          className="relative rounded-2xl border border-slate-800 bg-[#070b12] p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
        >
          {/* Ambient Terminal Glow */}
          <div className="absolute -top-10 -right-10 h-44 w-44 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

          {/* Terminal Window Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80"></span>
              </div>
              <span className="font-mono text-xs font-bold text-slate-300 ml-1">PUREX PRO TERMINAL</span>
            </div>

            {/* Terminal Switcher Tabs */}
            <div className="flex rounded-lg border border-slate-800 bg-slate-950 p-0.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTerminalTab('orderbook')}
                className={`rounded px-2.5 py-1 transition-all cursor-pointer ${
                  activeTerminalTab === 'orderbook'
                    ? 'bg-slate-800 text-emerald-400 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Order Book & Tape
              </button>
              <button
                type="button"
                onClick={() => setActiveTerminalTab('quickswap')}
                className={`rounded px-2.5 py-1 transition-all cursor-pointer ${
                  activeTerminalTab === 'quickswap'
                    ? 'bg-slate-800 text-emerald-400 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Instant Swap
              </button>
            </div>
          </div>

          {/* Pair Selector Ticker Bar */}
          <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
            {sampleTerminalPairs.map((p) => {
              const isSelected = p.symbol === selectedPair.symbol
              return (
                <button
                  key={p.symbol}
                  type="button"
                  onClick={() => setSelectedPair(p)}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-left transition-all cursor-pointer shrink-0 ${
                    isSelected
                      ? 'border-emerald-500/50 bg-emerald-950/30 text-white shadow-[0_0_12px_rgba(52,211,153,0.15)]'
                      : 'border-slate-800/80 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <CoinLogo symbol={p.symbol} size={20} />
                  <div>
                    <div className="text-[11px] font-bold leading-none">{p.pair}</div>
                    <div className="mt-1 flex items-center gap-1.5 text-[10px] font-mono">
                      <span className="font-semibold text-white">${p.price}</span>
                      <span className="text-emerald-400">{p.change}</span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Live Price & Metric Bar */}
          <div className="mt-3 flex flex-wrap items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/70 px-4 py-2.5">
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400">Current Spot Price</div>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-2xl font-black text-white">${selectedPair.price}</span>
                <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 font-mono text-xs font-bold text-emerald-400">
                  {selectedPair.change}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-right font-mono text-xs">
              <div>
                <div className="text-[10px] text-slate-500">24h High</div>
                <div className="font-semibold text-slate-300">${selectedPair.high24}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500">24h Low</div>
                <div className="font-semibold text-slate-300">${selectedPair.low24}</div>
              </div>
              <div className="hidden sm:block">
                <div className="text-[10px] text-slate-500">24h Vol</div>
                <div className="font-semibold text-emerald-400">{selectedPair.vol24}</div>
              </div>
            </div>
          </div>

          {/* Interactive Sparkline Chart */}
          <div className="mt-3 rounded-xl border border-slate-800/70 bg-slate-950/40 p-2.5">
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 px-1">
              <span className="flex items-center gap-1">
                <TrendingUp size={12} className="text-emerald-400" />
                <span>Live Depth Trend</span>
              </span>
              <div className="flex gap-2 text-[10px] font-mono">
                <span className="text-emerald-400 font-bold">1H</span>
                <span className="text-slate-500 hover:text-slate-300 cursor-pointer">24H</span>
                <span className="text-slate-500 hover:text-slate-300 cursor-pointer">7D</span>
                <span className="text-slate-500 hover:text-slate-300 cursor-pointer">1M</span>
              </div>
            </div>
            <div className="h-14 w-full">
              <RealisticChart values={selectedPair.trend} positive={selectedPair.isPositive} height={52} />
            </div>
          </div>

          {/* Dynamic Tab Body: Orderbook vs Instant Swap */}
          {activeTerminalTab === 'orderbook' ? (
            <div className="mt-3 space-y-2">
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                {/* Bids Column (Green Buy Depth) */}
                <div className="rounded-xl border border-slate-800/80 bg-slate-950/80 p-2.5 font-mono">
                  <div className="flex justify-between text-[10px] text-slate-500 pb-1 border-b border-slate-800/60 font-sans font-bold">
                    <span>BUY BIDS</span>
                    <span>SIZE</span>
                  </div>
                  <div className="space-y-1.5 mt-1.5">
                    {selectedPair.depthBids.map((bid, i) => (
                      <div key={i} className="relative flex items-center justify-between text-[11px] overflow-hidden py-0.5">
                        <div
                          className="absolute right-0 top-0 bottom-0 bg-emerald-500/10 pointer-events-none"
                          style={{ width: bid.width }}
                        />
                        <span className="font-bold text-emerald-400 z-10">{bid.price}</span>
                        <span className="text-slate-400 z-10">{bid.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Asks Column (Red Sell Depth) */}
                <div className="rounded-xl border border-slate-800/80 bg-slate-950/80 p-2.5 font-mono">
                  <div className="flex justify-between text-[10px] text-slate-500 pb-1 border-b border-slate-800/60 font-sans font-bold">
                    <span>SELL ASKS</span>
                    <span>SIZE</span>
                  </div>
                  <div className="space-y-1.5 mt-1.5">
                    {selectedPair.depthAsks.map((ask, i) => (
                      <div key={i} className="relative flex items-center justify-between text-[11px] overflow-hidden py-0.5">
                        <div
                          className="absolute left-0 top-0 bottom-0 bg-rose-500/10 pointer-events-none"
                          style={{ width: ask.width }}
                        />
                        <span className="font-bold text-rose-400 z-10">{ask.price}</span>
                        <span className="text-slate-400 z-10">{ask.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Quick Launch to Full Pro Trading */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-400 font-mono">
                  Spread: <strong className="text-emerald-400">0.01 USDT (0.00%)</strong>
                </span>
                <Link
                  to={`/trade?pair=${selectedPair.symbol}_USDT`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <span>Open Full Pro Chart</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-3 rounded-xl border border-slate-800/80 bg-slate-950/90 p-4 space-y-3">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-400 font-semibold">
                  <span>You Pay:</span>
                  <span>Balance: 5,000.00 USDT</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 px-3 py-2">
                  <input
                    type="number"
                    value={swapAmount}
                    onChange={(e) => setSwapAmount(e.target.value)}
                    className="w-2/3 bg-transparent font-mono text-lg font-bold text-white focus:outline-none"
                  />
                  <span className="rounded bg-slate-800 px-2 py-1 font-mono text-xs font-bold text-emerald-400">
                    USDT
                  </span>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="rounded-full border border-slate-800 bg-slate-900 p-1.5 text-slate-400">
                  <ArrowDownUp size={14} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-400 font-semibold">
                  <span>You Receive (Estimated):</span>
                  <span className="text-emerald-400 font-mono">0% Slippage Guaranteed</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 px-3 py-2">
                  <span className="font-mono text-lg font-bold text-emerald-400">
                    {calculatedCrypto > 0 ? calculatedCrypto.toFixed(6) : '0.000000'}
                  </span>
                  <span className="rounded bg-slate-800 px-2 py-1 font-mono text-xs font-bold text-white">
                    {selectedPair.symbol}
                  </span>
                </div>
              </div>

              <Link
                to={`/trade?pair=${selectedPair.symbol}_USDT`}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:bg-emerald-300 transition-all"
              >
                <span>Swap to {selectedPair.symbol} Instantly</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
