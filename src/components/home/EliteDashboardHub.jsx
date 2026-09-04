import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  ArrowUpRight, 
  ShieldCheck, 
  Zap, 
  Headphones, 
  Building2, 
  QrCode, 
  Crown, 
  ChevronRight,
  Eye,
  EyeOff,
  Sparkles
} from 'lucide-react'
import { Link } from 'react-router-dom'

// Timeframe sample data for interactive trading chart
const chartDataByTimeframe = {
  '1H': [
    { time: '10:00', price: 68120 },
    { time: '10:15', price: 68250 },
    { time: '10:30', price: 68180 },
    { time: '10:45', price: 68420 },
    { time: '11:00', price: 68573 },
  ],
  '1D': [
    { time: '00:00', price: 66400 },
    { time: '04:00', price: 67100 },
    { time: '08:00', price: 66850 },
    { time: '12:00', price: 67900 },
    { time: '16:00', price: 68200 },
    { time: '20:00', price: 68573.61 },
  ],
  '1W': [
    { time: 'Mon', price: 64200 },
    { time: 'Tue', price: 65100 },
    { time: 'Wed', price: 66300 },
    { time: 'Thu', price: 65800 },
    { time: 'Fri', price: 67400 },
    { time: 'Sat', price: 68100 },
    { time: 'Sun', price: 68573 },
  ],
  '1M': [
    { time: 'Week 1', price: 61000 },
    { time: 'Week 2', price: 63500 },
    { time: 'Week 3', price: 66200 },
    { time: 'Week 4', price: 68573 },
  ],
  '1Y': [
    { time: 'Q1', price: 42000 },
    { time: 'Q2', price: 58000 },
    { time: 'Q3', price: 63000 },
    { time: 'Q4', price: 68573 },
  ],
}

const recentTransactions = [
  {
    id: 1,
    type: 'Deposit',
    asset: 'USDT',
    amount: '+$2,500.00',
    time: 'Today, 10:24 AM',
    isPositive: true,
    iconBg: 'bg-[#00e676]/10 text-[#00e676] border-[#00e676]/30',
  },
  {
    id: 2,
    type: 'Buy',
    asset: 'BTC',
    amount: '-0.0254 BTC',
    time: 'Today, 09:15 AM',
    isPositive: false,
    iconBg: 'bg-[#f7931a]/10 text-[#f7931a] border-[#f7931a]/30',
  },
  {
    id: 3,
    type: 'Investment',
    asset: 'PUREX Elite Plan',
    amount: '-$10,000.00',
    time: 'Today, 08:45 AM',
    isPositive: false,
    iconBg: 'bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/30',
  },
  {
    id: 4,
    type: 'Profit',
    asset: 'Trading Yield',
    amount: '+$1,250.75',
    time: 'Today, 07:30 AM',
    isPositive: true,
    iconBg: 'bg-[#00e676]/10 text-[#00e676] border-[#00e676]/30',
  },
]

const tickerItems = [
  { pair: 'BTC/USDT', price: '68,573.61', change: '+3.29%', isUp: true, icon: '₿' },
  { pair: 'ETH/USDT', price: '3,742.21', change: '+4.71%', isUp: true, icon: 'Ξ' },
  { pair: 'SOL/USDT', price: '171.35', change: '+6.19%', isUp: true, icon: '◎' },
  { pair: 'XRP/USDT', price: '0.5832', change: '-1.12%', isUp: false, icon: '✕' },
]

export default function EliteDashboardHub() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D')
  const [showBalance, setShowBalance] = useState(true)

  const activePoints = chartDataByTimeframe[selectedTimeframe] || chartDataByTimeframe['1D']
  const minPrice = Math.min(...activePoints.map((p) => p.price))
  const maxPrice = Math.max(...activePoints.map((p) => p.price))

  // Generate SVG points for chart line
  const svgWidth = 600
  const svgHeight = 180
  const pointsString = activePoints
    .map((p, idx) => {
      const x = (idx / (activePoints.length - 1)) * (svgWidth - 40) + 20
      const y = svgHeight - 20 - ((p.price - minPrice) / (maxPrice - minPrice || 1)) * (svgHeight - 40)
      return `${x},${y}`
    })
    .join(' ')

  const areaString = `${pointsString} ${svgWidth - 20},${svgHeight} 20,${svgHeight}`

  return (
    <section className="relative mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10">
      {/* Top Ticker Marquee / Control Strip */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[rgba(212,175,55,0.22)] bg-[rgba(10,13,18,0.75)] p-3 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 overflow-x-auto py-1">
          {tickerItems.map((item) => (
            <div
              key={item.pair}
              className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-1.5 transition-all hover:border-[#d4af37]/40 hover:bg-[#d4af37]/5"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d4af37]/15 text-xs font-bold text-[#f7e09e]">
                {item.icon}
              </span>
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-white">{item.pair}</span>
                <span className="font-mono text-zinc-300">${item.price}</span>
                <span
                  className={`font-mono text-[11px] font-bold ${
                    item.isUp ? 'text-[#00e676]' : 'text-[#ff5252]'
                  }`}
                >
                  {item.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search markets..."
              className="w-48 rounded-xl border border-white/10 bg-black/40 py-1.5 pl-8 pr-3 text-xs text-white placeholder-zinc-500 focus:border-[#d4af37] focus:outline-none"
            />
          </div>

          <Link
            to="/trade"
            className="gold-btn !py-1.5 !px-4 !text-xs font-bold shadow-lg"
          >
            <Sparkles size={13} />
            Quick Trade
          </Link>
        </div>
      </div>

      {/* Main Grid: 2 Column Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* LEFT COLUMN: Charts & Portfolio (8 Cols) */}
        <div className="space-y-6 lg:col-span-8">
          {/* Main Interactive Trading Chart Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="luxury-card p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#f7931a]/30 bg-[#f7931a]/10 text-lg font-bold text-[#f7931a]">
                  ₿
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">BTC / USDT</h3>
                    <span className="rounded-md bg-[#00e676]/15 px-2 py-0.5 text-[11px] font-bold text-[#00e676]">
                      +3.29%
                    </span>
                  </div>
                  <div className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                    $68,573.61{' '}
                    <span className="text-xs font-normal text-zinc-400">24h High: $69,120</span>
                  </div>
                </div>
              </div>

              {/* Timeframe Selector Tabs */}
              <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-black/40 p-1">
                {['1H', '1D', '1W', '1M', '1Y'].map((tf) => (
                  <button
                    key={tf}
                    type="button"
                    onClick={() => setSelectedTimeframe(tf)}
                    className={`rounded-lg px-3 py-1 text-xs font-bold transition-all cursor-pointer ${
                      selectedTimeframe === tf
                        ? 'bg-gradient-to-r from-[#fae098] to-[#d4af37] text-black shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Glowing Chart Canvas */}
            <div className="relative mt-6 h-56 w-full sm:h-64">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="h-full w-full overflow-visible">
                <defs>
                  <linearGradient id="goldAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d4af37" stopOpacity="0.35" />
                    <stop offset="70%" stopColor="#d4af37" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
                  </linearGradient>
                  <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="glow" />
                    <feComposite in="SourceGraphic" in2="glow" operator="over" />
                  </filter>
                </defs>

                {/* Subtle horizontal grid lines */}
                {[30, 80, 130].map((yVal) => (
                  <line
                    key={yVal}
                    x1="20"
                    y1={yVal}
                    x2={svgWidth - 20}
                    y2={yVal}
                    stroke="rgba(255,255,255,0.05)"
                    strokeDasharray="4 4"
                  />
                ))}

                {/* Area Fill */}
                <polygon points={areaString} fill="url(#goldAreaGrad)" />

                {/* Main Curve */}
                <polyline
                  fill="none"
                  stroke="#fae098"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#goldGlow)"
                  points={pointsString}
                />

                {/* Floating Price Tag on last point */}
                {activePoints.length > 0 && (
                  <g transform={`translate(${svgWidth - 95}, 20)`}>
                    <rect width="85" height="26" rx="6" fill="#d4af37" />
                    <text
                      x="42"
                      y="17"
                      fill="#07080a"
                      fontSize="11"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      ${activePoints[activePoints.length - 1].price.toLocaleString()}
                    </text>
                  </g>
                )}
              </svg>

              {/* Time axis indicators */}
              <div className="mt-2 flex justify-between px-4 text-[11px] font-mono text-zinc-500">
                {activePoints.map((p) => (
                  <span key={p.time}>{p.time}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bottom Split: Portfolio Breakdown & Recent Transactions */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* My Portfolio Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="luxury-card p-5"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">My Portfolio</h4>
                  <button
                    type="button"
                    onClick={() => setShowBalance(!showBalance)}
                    className="text-zinc-400 hover:text-white"
                  >
                    {showBalance ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                </div>
                <span className="rounded-md bg-[#00e676]/10 px-2 py-0.5 text-[10px] font-bold text-[#00e676]">
                  +8.29% (24h)
                </span>
              </div>

              <div className="my-4">
                <div className="text-xs text-zinc-400">Total Estimated Balance</div>
                <div className="text-2xl font-extrabold tracking-tight text-white">
                  {showBalance ? '$124,250.68' : '••••••••••'}
                </div>
              </div>

              {/* Asset Allocation Donut Visual & Stats */}
              <div className="grid grid-cols-2 items-center gap-3 pt-2">
                {/* SVG Donut */}
                <div className="relative flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90">
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#222730" strokeWidth="12" />
                    {/* Bitcoin 45% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#d4af37"
                      strokeWidth="12"
                      strokeDasharray="238.7"
                      strokeDashoffset="131.28"
                    />
                    {/* Ethereum 25% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#627eea"
                      strokeWidth="12"
                      strokeDasharray="238.7"
                      strokeDashoffset="179.0"
                      className="origin-center rotate-[162deg]"
                    />
                    {/* Solana 15% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#14f195"
                      strokeWidth="12"
                      strokeDasharray="238.7"
                      strokeDashoffset="202.9"
                      className="origin-center rotate-[252deg]"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <div className="text-[10px] uppercase tracking-wider text-zinc-400">Holdings</div>
                    <div className="text-xs font-bold text-white">4 Assets</div>
                  </div>
                </div>

                {/* Legend list */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-zinc-300">
                      <span className="h-2 w-2 rounded-full bg-[#d4af37]" /> Bitcoin
                    </span>
                    <span className="font-mono font-semibold text-white">45%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-zinc-300">
                      <span className="h-2 w-2 rounded-full bg-[#627eea]" /> Ethereum
                    </span>
                    <span className="font-mono font-semibold text-white">25%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-zinc-300">
                      <span className="h-2 w-2 rounded-full bg-[#14f195]" /> Solana
                    </span>
                    <span className="font-mono font-semibold text-white">15%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-zinc-400">
                      <span className="h-2 w-2 rounded-full bg-zinc-600" /> Others
                    </span>
                    <span className="font-mono font-semibold text-zinc-300">15%</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recent Transactions Feed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="luxury-card p-5"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h4 className="text-sm font-bold text-white">Recent Transactions</h4>
                <Link to="/trade" className="text-xs font-semibold text-[#f5df9a] hover:underline">
                  View All
                </Link>
              </div>

              <div className="mt-3 divide-y divide-white/5">
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between py-2.5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-xl border text-xs font-bold ${tx.iconBg}`}
                      >
                        {tx.type[0]}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{tx.type} {tx.asset}</div>
                        <div className="text-[10px] text-zinc-400">{tx.time}</div>
                      </div>
                    </div>
                    <div
                      className={`text-right font-mono text-xs font-bold ${
                        tx.isPositive ? 'text-[#00e676]' : 'text-zinc-200'
                      }`}
                    >
                      {tx.amount}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* RIGHT COLUMN: Market Sentiment, VIP & Mobile App (4 Cols) */}
        <div className="space-y-6 lg:col-span-4">
          {/* Market Overview & Fear & Greed Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="luxury-card p-5 sm:p-6"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 className="text-sm font-bold text-white">Market Overview</h4>
              <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-bold text-zinc-300">
                24H ▾
              </span>
            </div>

            <div className="mt-4">
              <div className="text-xs text-zinc-400">Total Crypto Market Cap</div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-white">$2.68 Trillion</span>
                <span className="text-xs font-bold text-[#00e676]">+2.91%</span>
              </div>
            </div>

            {/* Fear & Greed Gauge */}
            <div className="mt-6 rounded-2xl border border-white/5 bg-black/40 p-4 text-center">
              <div className="text-xs font-semibold text-zinc-400">Fear & Greed Index</div>

              {/* Speedometer Arc Visual */}
              <div className="relative mx-auto my-3 flex h-24 w-40 items-end justify-center overflow-hidden">
                <svg viewBox="0 0 160 90" className="h-full w-full">
                  <path
                    d="M 15 85 A 65 65 0 0 1 145 85"
                    fill="none"
                    stroke="#222730"
                    strokeWidth="14"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 15 85 A 65 65 0 0 1 145 85"
                    fill="none"
                    stroke="url(#greedGradient)"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeDasharray="204.2"
                    strokeDashoffset="57"
                  />
                  <defs>
                    <linearGradient id="greedGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#ff5252" />
                      <stop offset="50%" stopColor="#d4af37" />
                      <stop offset="100%" stopColor="#00e676" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute bottom-1 text-center">
                  <div className="text-2xl font-black text-[#00e676]">72</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-300">
                    Greed
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-zinc-400">
                Market sentiment is bullish. Strong institutional accumulation.
              </p>
            </div>
          </motion.div>

          {/* PUREX VIP & ELITE TIER Showcase Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-[#d4af37]/40 bg-gradient-to-br from-[#1b170c] via-[#0d1015] to-[#07080a] p-5 shadow-2xl"
          >
            <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-[#d4af37]/15 blur-2xl" />

            <div className="flex items-center justify-between">
              <div className="gold-badge">
                <Crown size={12} />
                PUREX VIP
              </div>
              <span className="text-[11px] font-mono text-[#fae098]">Tier 1 - 5</span>
            </div>

            <h3 className="mt-3 text-lg font-extrabold text-white">
              Institutional & VIP Program
            </h3>
            <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
              Unlock 0.02% maker fees, dedicated account managers, and priority liquidity allocations.
            </p>

            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
              <div>
                <div className="text-[10px] uppercase text-zinc-500">Maker Fee Discount</div>
                <div className="text-sm font-bold text-[#00e676]">Up to -75%</div>
              </div>
              <Link
                to="/about"
                className="gold-btn !py-1.5 !px-3 !text-xs"
              >
                Explore Benefits
                <ChevronRight size={14} />
              </Link>
            </div>
          </motion.div>

          {/* Purex Mobile App Card with QR */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="luxury-card p-5 text-left"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#fae098]">
                  PUREX MOBILE
                </div>
                <h4 className="mt-1 text-base font-bold text-white">Trade Anywhere</h4>
                <p className="text-xs text-zinc-400">Scan to download iOS & Android app.</p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/15 bg-white p-1 shadow-md">
                <QrCode size={46} className="text-black" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Trust & Security Ribbon */}
      <div className="mt-12 grid grid-cols-2 gap-4 rounded-2xl border border-[rgba(212,175,55,0.2)] bg-[rgba(10,13,18,0.7)] p-6 backdrop-blur-xl md:grid-cols-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d4af37]/10 text-[#fae098] border border-[#d4af37]/30">
            <ShieldCheck size={20} />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Bank-Level Security</div>
            <div className="text-[11px] text-zinc-400">256-Bit Cold Storage</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00e676]/10 text-[#00e676] border border-[#00e676]/30">
            <Zap size={20} />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Lightning Fast</div>
            <div className="text-[11px] text-zinc-400">0.01s Order Execution</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d4af37]/10 text-[#fae098] border border-[#d4af37]/30">
            <Headphones size={20} />
          </div>
          <div>
            <div className="text-xs font-bold text-white">24/7 VIP Support</div>
            <div className="text-[11px] text-zinc-400">Real Human Specialists</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#627eea]/10 text-[#627eea] border border-[#627eea]/30">
            <Building2 size={20} />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Institutional Grade</div>
            <div className="text-[11px] text-zinc-400">Audited Proof of Reserves</div>
          </div>
        </div>
      </div>
    </section>
  )
}
