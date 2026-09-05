import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  ChevronRight,
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
    vol24: '$1.42B',
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
    vol24: '$840.4M',
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
    vol24: '$492.1M',
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
    vol24: '$88.4M',
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
  const [activeTerminalTab, setActiveTerminalTab] = useState('orderbook')
  const [swapAmount, setSwapAmount] = useState('1000')
  const [showPromo, setShowPromo] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const navigate = useNavigate()

  const handleQuickStart = (e) => {
    e.preventDefault()
    const query = new URLSearchParams()
    if (email.trim()) query.set('email', email.trim())
    if (promoCode.trim()) query.set('ref', promoCode.trim())
    navigate(`/signup?${query.toString()}`)
  }

  const calculatedCrypto = (parseFloat(swapAmount) || 0) / selectedPair.rawPrice

  return (
    <section className="relative mx-auto max-w-[1440px] px-3.5 pt-2 pb-4 sm:px-6 lg:px-10 lg:pt-4 lg:pb-6">
      <div className="grid items-start gap-5 lg:grid-cols-[1.1fr_0.95fr] lg:gap-6 xl:gap-8">
        {/* ================= LEFT WING: COMMAND & VALUE HEADLINE ================= */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="flex flex-col justify-center"
        >
          {/* Status & Latency Badge Ribbon */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/40 px-3 py-1 text-xs font-semibold text-amber-400 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
              </span>
              <span>ENGINE ONLINE • 1.2ms LATENCY</span>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-xs text-slate-300">
              <ShieldCheck size={13} className="text-amber-400" />
              <span>100% Cryptographic Proof of Reserves</span>
            </div>
          </div>

          {/* Core Gold & White Headline */}
          <h1 className="text-[2.2rem] font-black tracking-tight text-white sm:text-[3.1rem] lg:text-[3.5rem] leading-[1.06]">
            Trade & Grow Crypto with <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300 bg-clip-text text-transparent">
              Institutional Gold Precision
            </span>
          </h1>

          <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-300 max-w-xl font-normal">
            Direct high-frequency liquidity, <strong className="text-white">0.05% lowest trading fees</strong>, and automated algorithmic daily yields. Built for pro traders and long-term asset growth.
          </p>

          {/* Quick Onboarding Box with High Visibility Sign Up Button */}
          <div className="mt-4 rounded-2xl border border-amber-500/25 bg-[#0a0c10]/95 p-4 backdrop-blur-xl shadow-2xl">
            <form onSubmit={handleQuickStart} className="space-y-2.5">
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email to trade with $100 fee credit"
                    className="w-full rounded-xl border border-slate-700/90 bg-slate-950 px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 font-mono transition-all"
                    required
                  />
                </div>
                {/* Ultra Obvious Sign Up Button */}
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 px-6 py-3 text-xs sm:text-sm font-black text-slate-950 shadow-[0_0_24px_rgba(245,158,11,0.55)] hover:shadow-[0_0_32px_rgba(245,158,11,0.8)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap uppercase tracking-wider"
                >
                  <span>Sign Up & Claim $100</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Referral Toggle */}
              <div className="flex items-center justify-between text-xs pt-0.5">
                <button
                  type="button"
                  onClick={() => setShowPromo(!showPromo)}
                  className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer text-[11px]"
                >
                  <span>{showPromo ? '− Hide VIP Referral Code' : '+ Have a VIP Referral Code?'}</span>
                </button>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                  <CheckCircle2 size={12} className="text-amber-400" />
                  <span>Instant KYC &lt;60s</span>
                </div>
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
                      placeholder="ENTER VIP INVITATION CODE (OPTIONAL)"
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-mono uppercase text-amber-400 placeholder-slate-600 focus:border-amber-400 focus:outline-none"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            {/* Fast Deposit Channels Strip */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-1.5 border-t border-slate-800/80 pt-2.5 text-[11px] text-slate-400">
              <span className="font-semibold text-slate-300">Accepted Onramps:</span>
              <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
                <span className="rounded bg-slate-900 px-2 py-0.5 border border-slate-800 text-slate-200">VISA / MC</span>
                <span className="rounded bg-slate-900 px-2 py-0.5 border border-slate-800 text-slate-200">Apple Pay</span>
                <span className="rounded bg-slate-900 px-2 py-0.5 border border-slate-800 text-slate-200">SEPA Instant</span>
                <span className="rounded bg-slate-900 px-2 py-0.5 border border-amber-500/40 text-amber-400 font-bold">USDT (0% Fee)</span>
              </div>
            </div>
          </div>

          {/* High-Density Key Metrics Bar - Compact */}
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-2.5 backdrop-blur-md">
              <div className="text-[10px] font-semibold text-slate-400 uppercase">24h Volume</div>
              <div className="mt-0.5 font-mono text-base sm:text-lg font-black text-white">$2.48B</div>
              <div className="text-[10px] text-amber-400 font-mono">+12.4% vs 7d</div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-2.5 backdrop-blur-md">
              <div className="text-[10px] font-semibold text-slate-400 uppercase">Active Traders</div>
              <div className="mt-0.5 font-mono text-base sm:text-lg font-black text-white">254,890</div>
              <div className="text-[10px] text-amber-400 font-mono">140+ Countries</div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-2.5 backdrop-blur-md">
              <div className="text-[10px] font-semibold text-slate-400 uppercase">SAFU Reserve</div>
              <div className="mt-0.5 font-mono text-base sm:text-lg font-black text-white">$125.0M</div>
              <div className="text-[10px] text-amber-400 font-mono">108.4% Backing</div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-2.5 backdrop-blur-md">
              <div className="text-[10px] font-semibold text-slate-400 uppercase">Yield Payouts</div>
              <div className="mt-0.5 font-mono text-base sm:text-lg font-black text-white">$42.8M</div>
              <div className="text-[10px] text-amber-400 font-mono">Automated Daily</div>
            </div>
          </div>
        </motion.div>

        {/* ================= RIGHT WING: LIVE INTERACTIVE TERMINAL PREVIEW ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.08 }}
          className="relative rounded-2xl border border-amber-500/20 bg-[#080a0f] p-3.5 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
        >
          {/* Ambient Terminal Gold Glow */}
          <div className="absolute -top-8 -right-8 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          {/* Terminal Window Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-rose-500/80"></span>
                <span className="h-2 w-2 rounded-full bg-amber-500/80"></span>
                <span className="h-2 w-2 rounded-full bg-emerald-500/80"></span>
              </div>
              <span className="font-mono text-xs font-bold text-amber-400 ml-1">PUREX PRO TERMINAL</span>
            </div>

            {/* Terminal Switcher Tabs */}
            <div className="flex rounded-lg border border-slate-800 bg-slate-950 p-0.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTerminalTab('orderbook')}
                className={`rounded px-2.5 py-1 transition-all cursor-pointer ${
                  activeTerminalTab === 'orderbook'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Order Book
              </button>
              <button
                type="button"
                onClick={() => setActiveTerminalTab('quickswap')}
                className={`rounded px-2.5 py-1 transition-all cursor-pointer ${
                  activeTerminalTab === 'quickswap'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Instant Swap
              </button>
            </div>
          </div>

          {/* Pair Selector Ticker Bar */}
          <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {sampleTerminalPairs.map((p) => {
              const isSelected = p.symbol === selectedPair.symbol
              return (
                <button
                  key={p.symbol}
                  type="button"
                  onClick={() => setSelectedPair(p)}
                  className={`flex items-center gap-2 rounded-xl border px-2.5 py-1.5 text-left transition-all cursor-pointer shrink-0 ${
                    isSelected
                      ? 'border-amber-500/60 bg-amber-950/40 text-white shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                      : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <CoinLogo symbol={p.symbol} size={18} />
                  <div>
                    <div className="text-[10px] font-bold leading-none">{p.pair}</div>
                    <div className="mt-0.5 flex items-center gap-1 text-[9px] font-mono">
                      <span className="font-semibold text-white">${p.price}</span>
                      <span className="text-amber-400">{p.change}</span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Live Price & Metric Bar */}
          <div className="mt-2.5 flex flex-wrap items-center justify-between rounded-xl border border-slate-800 bg-slate-950/80 px-3.5 py-2">
            <div>
              <div className="text-[9px] font-mono uppercase text-slate-400">Current Spot Price</div>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xl sm:text-2xl font-black text-white">${selectedPair.price}</span>
                <span className="rounded bg-amber-500/15 border border-amber-500/30 px-1.5 py-0.5 font-mono text-[11px] font-bold text-amber-400">
                  {selectedPair.change}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-right font-mono text-[11px]">
              <div>
                <div className="text-[9px] text-slate-500">24h High</div>
                <div className="font-semibold text-slate-200">${selectedPair.high24}</div>
              </div>
              <div>
                <div className="text-[9px] text-slate-500">24h Low</div>
                <div className="font-semibold text-slate-200">${selectedPair.low24}</div>
              </div>
              <div className="hidden sm:block">
                <div className="text-[9px] text-slate-500">24h Vol</div>
                <div className="font-semibold text-amber-400">{selectedPair.vol24}</div>
              </div>
            </div>
          </div>

          {/* Interactive Sparkline Chart */}
          <div className="mt-2.5 rounded-xl border border-slate-800/80 bg-slate-950/50 p-2">
            <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5 px-1">
              <span className="flex items-center gap-1">
                <TrendingUp size={11} className="text-amber-400" />
                <span>Live Depth Flow</span>
              </span>
              <div className="flex gap-2 font-mono text-[9px]">
                <span className="text-amber-400 font-bold">1H</span>
                <span className="text-slate-500 hover:text-slate-300 cursor-pointer">24H</span>
                <span className="text-slate-500 hover:text-slate-300 cursor-pointer">7D</span>
              </div>
            </div>
            <div className="h-12 w-full">
              <RealisticChart values={selectedPair.trend} positive={selectedPair.isPositive} height={46} />
            </div>
          </div>

          {/* Dynamic Tab Body: Orderbook vs Instant Swap */}
          {activeTerminalTab === 'orderbook' ? (
            <div className="mt-2.5 space-y-1.5">
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                {/* Bids Column (Gold Buy Depth) */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-2 font-mono">
                  <div className="flex justify-between text-[9px] text-slate-500 pb-1 border-b border-slate-800 font-sans font-bold">
                    <span>BUY BIDS</span>
                    <span>AMOUNT</span>
                  </div>
                  <div className="space-y-1 mt-1">
                    {selectedPair.depthBids.map((bid, i) => (
                      <div key={i} className="relative flex items-center justify-between text-[10px] overflow-hidden py-0.5">
                        <div
                          className="absolute right-0 top-0 bottom-0 bg-amber-500/10 pointer-events-none"
                          style={{ width: bid.width }}
                        />
                        <span className="font-bold text-amber-400 z-10">{bid.price}</span>
                        <span className="text-slate-300 z-10">{bid.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Asks Column (Sell Depth) */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-2 font-mono">
                  <div className="flex justify-between text-[9px] text-slate-500 pb-1 border-b border-slate-800 font-sans font-bold">
                    <span>SELL ASKS</span>
                    <span>AMOUNT</span>
                  </div>
                  <div className="space-y-1 mt-1">
                    {selectedPair.depthAsks.map((ask, i) => (
                      <div key={i} className="relative flex items-center justify-between text-[10px] overflow-hidden py-0.5">
                        <div
                          className="absolute left-0 top-0 bottom-0 bg-rose-500/10 pointer-events-none"
                          style={{ width: ask.width }}
                        />
                        <span className="font-bold text-rose-400 z-10">{ask.price}</span>
                        <span className="text-slate-300 z-10">{ask.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Quick Launch */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-slate-400 font-mono">
                  Spread: <strong className="text-amber-400">0.01 USDT</strong>
                </span>
                <Link
                  to={`/trade?pair=${selectedPair.symbol}_USDT`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <span>Open Full Pro Chart</span>
                  <ChevronRight size={13} />
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-2.5 rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-2.5">
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                  <span>You Pay:</span>
                  <span className="font-mono">Balance: 5,000.00 USDT</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5">
                  <input
                    type="number"
                    value={swapAmount}
                    onChange={(e) => setSwapAmount(e.target.value)}
                    className="w-2/3 bg-transparent font-mono text-base font-bold text-white focus:outline-none"
                  />
                  <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-xs font-bold text-amber-400">
                    USDT
                  </span>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="rounded-full border border-slate-800 bg-slate-900 p-1 text-slate-400">
                  <ArrowDownUp size={12} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                  <span>You Receive (Estimated):</span>
                  <span className="text-amber-400 font-mono text-[10px]">0% Slippage</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5">
                  <span className="font-mono text-base font-bold text-amber-400">
                    {calculatedCrypto > 0 ? calculatedCrypto.toFixed(6) : '0.000000'}
                  </span>
                  <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-xs font-bold text-white">
                    {selectedPair.symbol}
                  </span>
                </div>
              </div>

              <Link
                to={`/trade?pair=${selectedPair.symbol}_USDT`}
                className="w-full mt-1.5 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 py-2.5 text-xs font-black uppercase tracking-wider text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.4)] hover:scale-[1.02] transition-all"
              >
                <span>Swap to {selectedPair.symbol}</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
