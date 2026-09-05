import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  Flame,
  BarChart2,
  Sparkles,
  Layers,
  ArrowRight,
  Search,
  Activity,
  Gauge,
  Zap,
  Globe,
  CheckCircle2,
  ExternalLink
} from 'lucide-react'
import { Link } from 'react-router-dom'
import CoinLogo from '../CoinLogo'
import RealisticChart from '../RealisticChart'
import { useMarketData } from '../../hooks/useMarketData'

const marketCategories = [
  { id: 'hot', label: 'Spotlight & Hot', icon: Flame },
  { id: 'gainers', label: 'Top Gainers', icon: TrendingUp },
  { id: 'volume', label: 'Highest Volume', icon: BarChart2 },
  { id: 'layer1', label: 'Layer 1 & 2', icon: Layers },
  { id: 'defi', label: 'DeFi & Staking', icon: Sparkles },
]

const enrichedMarketCoins = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    pair: 'BTC/USDT',
    price: '68,573.40',
    change: '+3.42%',
    isPositive: true,
    high24: '69,210.00',
    low24: '66,140.50',
    volume: '$1.42B',
    marketCap: '$1.35T',
    depthRatio: '68% Bids',
    category: ['hot', 'volume', 'layer1'],
    trend: [66200, 66800, 66400, 67100, 67900, 67400, 68573],
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    pair: 'ETH/USDT',
    price: '3,742.15',
    change: '+4.81%',
    isPositive: true,
    high24: '3,780.00',
    low24: '3,550.00',
    volume: '$840.4M',
    marketCap: '$449.8B',
    depthRatio: '62% Bids',
    category: ['hot', 'volume', 'layer1', 'defi'],
    trend: [3550, 3610, 3590, 3680, 3710, 3690, 3742],
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    pair: 'SOL/USDT',
    price: '172.80',
    change: '+6.35%',
    isPositive: true,
    high24: '176.40',
    low24: '161.20',
    volume: '$492.1M',
    marketCap: '$79.4B',
    depthRatio: '74% Bids',
    category: ['hot', 'gainers', 'volume', 'layer1'],
    trend: [161, 164, 163, 168, 170, 169, 172.8],
  },
  {
    symbol: 'BNB',
    name: 'BNB Chain',
    pair: 'BNB/USDT',
    price: '614.90',
    change: '+2.18%',
    isPositive: true,
    high24: '622.00',
    low24: '598.00',
    volume: '$210.8M',
    marketCap: '$89.2B',
    depthRatio: '59% Bids',
    category: ['volume', 'layer1'],
    trend: [598, 604, 601, 609, 612, 610, 614.9],
  },
  {
    symbol: 'PUREX',
    name: 'Purex Token',
    pair: 'PUREX/USDT',
    price: '4.85',
    change: '+14.20%',
    isPositive: true,
    high24: '5.10',
    low24: '4.15',
    volume: '$88.4M',
    marketCap: '$145.5M',
    depthRatio: '84% Bids',
    category: ['hot', 'gainers', 'defi'],
    trend: [4.15, 4.3, 4.25, 4.5, 4.65, 4.72, 4.85],
  },
  {
    symbol: 'AVAX',
    name: 'Avalanche',
    pair: 'AVAX/USDT',
    price: '34.60',
    change: '+5.12%',
    isPositive: true,
    high24: '35.40',
    low24: '32.10',
    volume: '$142.3M',
    marketCap: '$13.9B',
    depthRatio: '55% Bids',
    category: ['gainers', 'layer1'],
    trend: [32.1, 32.8, 33.2, 33.9, 34.1, 34.0, 34.6],
  },
  {
    symbol: 'LINK',
    name: 'Chainlink',
    pair: 'LINK/USDT',
    price: '18.40',
    change: '+3.95%',
    isPositive: true,
    high24: '18.90',
    low24: '17.40',
    volume: '$118.0M',
    marketCap: '$10.8B',
    depthRatio: '61% Bids',
    category: ['defi'],
    trend: [17.4, 17.7, 17.6, 18.0, 18.2, 18.1, 18.4],
  },
  {
    symbol: 'NEAR',
    name: 'NEAR Protocol',
    pair: 'NEAR/USDT',
    price: '6.75',
    change: '+8.45%',
    isPositive: true,
    high24: '6.95',
    low24: '6.10',
    volume: '$195.4M',
    marketCap: '$7.4B',
    depthRatio: '71% Bids',
    category: ['gainers', 'layer1'],
    trend: [6.1, 6.3, 6.25, 6.45, 6.6, 6.55, 6.75],
  },
]

export default function MarketDiscoveryHub() {
  const [activeCategory, setActiveCategory] = useState('hot')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCoins = enrichedMarketCoins.filter((coin) => {
    const matchesCategory =
      activeCategory === 'hot' || coin.category.includes(activeCategory)
    const matchesSearch =
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section className="relative mx-auto max-w-[1440px] px-3.5 py-8 sm:px-6 lg:px-10">
      {/* Section Header & Subtitle */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-xs font-semibold text-emerald-400">
            <Activity size={13} />
            <span>REAL-TIME SPOT & DERIVATIVES TICKER</span>
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Market Discovery & Institutional Order Flow
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            High-frequency liquidity depth across 150+ verified digital asset pairs.
          </p>
        </div>

        {/* Search Bar & Full Market Navigation */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ticker (BTC, SOL...)"
              className="w-48 sm:w-56 rounded-xl border border-slate-800 bg-slate-950/90 pl-8 pr-3 py-2 text-xs font-mono text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none"
            />
          </div>
          <Link
            to="/markets"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2 text-xs font-bold text-white hover:border-emerald-400 hover:text-emerald-400 transition-all"
          >
            <span>All 150+ Markets</span>
            <ExternalLink size={13} />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_340px]">
        {/* ================= LEFT / MAIN: HIGH DENSITY MARKET TABLE ================= */}
        <div className="rounded-2xl border border-slate-800/90 bg-[#090d14]/90 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Category Tabs Strip */}
          <div className="flex items-center gap-1 border-b border-slate-800/80 bg-slate-950/60 p-2 overflow-x-auto scrollbar-none">
            {marketCategories.map((cat) => {
              const Icon = cat.icon
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-slate-800 text-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.15)] border border-slate-700'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-emerald-400' : 'text-slate-500'} />
                  <span>{cat.label}</span>
                </button>
              )
            })}
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800/80 bg-slate-950/40 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="py-3 px-4 sm:px-6">Asset</th>
                  <th className="py-3 px-4">Last Price</th>
                  <th className="py-3 px-4">24h Change</th>
                  <th className="py-3 px-4 hidden md:table-cell">24h Range</th>
                  <th className="py-3 px-4 hidden sm:table-cell">24h Volume</th>
                  <th className="py-3 px-4 hidden lg:table-cell">Depth Flow</th>
                  <th className="py-3 px-4 hidden md:table-cell">7D Chart</th>
                  <th className="py-3 px-4 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredCoins.map((coin) => (
                  <tr
                    key={coin.symbol}
                    className="hover:bg-slate-900/40 transition-colors group cursor-pointer font-mono"
                  >
                    {/* Asset Name & Logo */}
                    <td className="py-3.5 px-4 sm:px-6 font-sans">
                      <div className="flex items-center gap-3">
                        <CoinLogo symbol={coin.symbol} size={28} />
                        <div>
                          <div className="font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                            <span>{coin.name}</span>
                            <span className="text-[10px] font-mono text-slate-500">{coin.symbol}</span>
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono">{coin.pair}</div>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4 font-bold text-white text-sm">
                      ${coin.price}
                    </td>

                    {/* 24h Change */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-400">
                        <TrendingUp size={11} />
                        {coin.change}
                      </span>
                    </td>

                    {/* 24h High/Low */}
                    <td className="py-3.5 px-4 hidden md:table-cell text-slate-400 text-[11px]">
                      <div>H: ${coin.high24}</div>
                      <div className="text-slate-500">L: ${coin.low24}</div>
                    </td>

                    {/* 24h Volume */}
                    <td className="py-3.5 px-4 hidden sm:table-cell font-semibold text-slate-300">
                      {coin.volume}
                    </td>

                    {/* Depth Flow */}
                    <td className="py-3.5 px-4 hidden lg:table-cell">
                      <div className="w-24">
                        <div className="text-[10px] text-slate-400">{coin.depthRatio}</div>
                        <div className="mt-1 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                          <div className="h-full bg-emerald-400 rounded-full" style={{ width: '68%' }} />
                        </div>
                      </div>
                    </td>

                    {/* 7D Mini Sparkline */}
                    <td className="py-3.5 px-4 hidden md:table-cell">
                      <div className="w-20">
                        <RealisticChart values={coin.trend} positive={coin.isPositive} height={28} />
                      </div>
                    </td>

                    {/* Action Button */}
                    <td className="py-3.5 px-4 text-right font-sans">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          to={`/trade?pair=${coin.symbol}_USDT`}
                          className="rounded-lg bg-emerald-400/10 border border-emerald-400/30 px-3 py-1.5 text-xs font-bold text-emerald-400 hover:bg-emerald-400 hover:text-slate-950 transition-all"
                        >
                          Trade
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= RIGHT SIDEBAR: SENTIMENT & GAS NETWORK PULSE ================= */}
        <div className="space-y-4">
          {/* Market Sentiment Gauge (Fear & Greed) */}
          <div className="rounded-2xl border border-slate-800 bg-[#090d14]/90 p-5 backdrop-blur-xl shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <Gauge size={16} className="text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Market Sentiment Index
                </span>
              </div>
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-400">
                LIVE
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-mono text-3xl font-black text-white">76</div>
                <div className="text-xs font-bold text-emerald-400">EXTREME GREED</div>
              </div>
              <div className="text-right text-[11px] font-mono text-slate-400">
                <div>Yesterday: <span className="text-slate-200">72</span></div>
                <div>Last Week: <span className="text-slate-200">68</span></div>
                <div>Last Month: <span className="text-slate-200">54</span></div>
              </div>
            </div>

            {/* Gauge Indicator Bar */}
            <div className="space-y-1">
              <div className="h-2 w-full rounded-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400 p-[1px] relative">
                <div
                  className="absolute -top-1 h-4 w-1.5 rounded bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                  style={{ left: '76%' }}
                />
              </div>
              <div className="flex justify-between text-[9px] font-mono text-slate-500 pt-0.5">
                <span>0 (Extreme Fear)</span>
                <span>50</span>
                <span>100 (Extreme Greed)</span>
              </div>
            </div>
          </div>

          {/* Real-time Network & Gas Monitor */}
          <div className="rounded-2xl border border-slate-800 bg-[#090d14]/90 p-5 backdrop-blur-xl shadow-xl space-y-3 font-mono">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 font-sans">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Global Network Pulse
                </span>
              </div>
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Ethereum Gas</span>
                <span className="font-bold text-emerald-400">12 Gwei ($0.42)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Solana TPS</span>
                <span className="font-bold text-white">2,940 TPS</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Bitcoin Mempool</span>
                <span className="font-bold text-white">14 sat/vB</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-800/60 pt-2 font-sans">
                <span className="text-slate-400">Purex Engine Latency</span>
                <span className="font-mono font-bold text-emerald-400">0.85 ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
