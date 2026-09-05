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
  ExternalLink
} from 'lucide-react'
import { Link } from 'react-router-dom'
import CoinLogo from '../CoinLogo'
import RealisticChart from '../RealisticChart'

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
    <section className="relative mx-auto max-w-[1440px] px-3.5 py-4 sm:px-6 lg:px-10">
      {/* Section Header & Compact Toolbar */}
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#ff7a00]/30 bg-[#ff7a00]/10 px-3 py-0.5 text-xs font-semibold text-[#ff7a00]">
            <Activity size={12} />
            <span>REAL-TIME SPOT & DERIVATIVES TICKER</span>
          </div>
          <h2 className="mt-1.5 text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white">
            Market Discovery & Institutional Order Flow
          </h2>
          <p className="text-xs text-slate-300">
            Deep high-frequency order book liquidity across 150+ verified pairs.
          </p>
        </div>

        {/* Search Bar & Full Market Navigation */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ticker (BTC, SOL...)"
              className="w-44 sm:w-52 rounded-xl border border-white/10 bg-[#161a3c] pl-8 pr-3 py-1.5 text-xs font-mono text-white placeholder-slate-400 focus:border-[#ff7a00] focus:outline-none"
            />
          </div>
          <Link
            to="/markets"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#ff7a00]/40 bg-[#1e2452] px-3.5 py-1.5 text-xs font-bold text-white hover:border-[#ff7a00] hover:text-[#ff7a00] transition-all"
          >
            <span>All 150+ Markets</span>
            <ExternalLink size={12} />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_320px]">
        {/* ================= LEFT / MAIN: HIGH DENSITY MARKET TABLE ================= */}
        <div className="rounded-2xl border border-white/10 bg-[#15193b]/90 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Category Tabs Strip */}
          <div className="flex items-center gap-1 border-b border-white/10 bg-[#131633] p-1.5 overflow-x-auto scrollbar-none">
            {marketCategories.map((cat) => {
              const Icon = cat.icon
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#ff7a00]/20 text-[#ff7a00] shadow-[0_0_12px_rgba(255,122,0,0.25)] border border-[#ff7a00]/40'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={13} className={isActive ? 'text-[#ff7a00]' : 'text-slate-400'} />
                  <span>{cat.label}</span>
                </button>
              )
            })}
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 bg-white/[0.02] text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="py-2.5 px-4 sm:px-5">Asset</th>
                  <th className="py-2.5 px-3">Last Price</th>
                  <th className="py-2.5 px-3">24h Change</th>
                  <th className="py-2.5 px-3 hidden md:table-cell">24h Range</th>
                  <th className="py-2.5 px-3 hidden sm:table-cell">24h Volume</th>
                  <th className="py-2.5 px-3 hidden lg:table-cell">Depth Flow</th>
                  <th className="py-2.5 px-3 hidden md:table-cell">7D Trend</th>
                  <th className="py-2.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {filteredCoins.map((coin) => (
                  <tr
                    key={coin.symbol}
                    className="hover:bg-white/[0.04] transition-colors group cursor-pointer font-mono"
                  >
                    {/* Asset Name & Logo */}
                    <td className="py-2.5 px-4 sm:px-5 font-sans">
                      <div className="flex items-center gap-2.5">
                        <CoinLogo symbol={coin.symbol} size={24} />
                        <div>
                          <div className="font-bold text-white group-hover:text-[#ff7a00] transition-colors flex items-center gap-1">
                            <span>{coin.name}</span>
                            <span className="text-[10px] font-mono text-slate-400">{coin.symbol}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">{coin.pair}</div>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-2.5 px-3 font-bold text-white text-xs sm:text-sm">
                      ${coin.price}
                    </td>

                    {/* 24h Change */}
                    <td className="py-2.5 px-3">
                      <span className="inline-flex items-center gap-1 rounded-md bg-[#ff7a00]/15 border border-[#ff7a00]/30 px-1.5 py-0.5 text-[11px] font-bold text-[#ff7a00]">
                        <TrendingUp size={10} />
                        {coin.change}
                      </span>
                    </td>

                    {/* 24h High/Low */}
                    <td className="py-2.5 px-3 hidden md:table-cell text-slate-300 text-[10px]">
                      <div>H: ${coin.high24}</div>
                      <div className="text-slate-400">L: ${coin.low24}</div>
                    </td>

                    {/* 24h Volume */}
                    <td className="py-2.5 px-3 hidden sm:table-cell font-semibold text-slate-200 text-xs">
                      {coin.volume}
                    </td>

                    {/* Depth Flow */}
                    <td className="py-2.5 px-3 hidden lg:table-cell">
                      <div className="w-20">
                        <div className="text-[9px] text-slate-400">{coin.depthRatio}</div>
                        <div className="mt-0.5 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full bg-[#ff7a00] rounded-full" style={{ width: '68%' }} />
                        </div>
                      </div>
                    </td>

                    {/* 7D Mini Sparkline */}
                    <td className="py-2.5 px-3 hidden md:table-cell">
                      <div className="w-18">
                        <RealisticChart values={coin.trend} positive={coin.isPositive} height={24} />
                      </div>
                    </td>

                    {/* Action Button */}
                    <td className="py-2.5 px-4 text-right font-sans">
                      <Link
                        to={`/trade?pair=${coin.symbol}_USDT`}
                        className="rounded-lg bg-[#ff7a00]/15 border border-[#ff7a00]/40 px-2.5 py-1 text-xs font-bold text-[#ff7a00] hover:bg-[#ff7a00] hover:text-white transition-all"
                      >
                        Trade
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= RIGHT SIDEBAR: SENTIMENT & GAS NETWORK PULSE ================= */}
        <div className="space-y-3">
          {/* Market Sentiment Gauge (Fear & Greed) */}
          <div className="rounded-2xl border border-white/10 bg-[#15193b]/90 p-4 backdrop-blur-xl shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-1.5">
                <Gauge size={14} className="text-[#ff7a00]" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Sentiment Index
                </span>
              </div>
              <span className="rounded bg-[#ff7a00]/20 px-1.5 py-0.5 text-[9px] font-mono font-bold text-[#ff7a00]">
                LIVE
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-black text-white">76</div>
                <div className="text-xs font-bold text-[#ff7a00]">EXTREME GREED</div>
              </div>
              <div className="text-right text-[10px] font-mono text-slate-400">
                <div>Yesterday: <span className="text-slate-200">72</span></div>
                <div>Last Week: <span className="text-slate-200">68</span></div>
                <div>Last Month: <span className="text-slate-200">54</span></div>
              </div>
            </div>

            {/* Gauge Indicator Bar */}
            <div className="space-y-1">
              <div className="h-2 w-full rounded-full bg-gradient-to-r from-rose-500 via-yellow-400 to-[#ff7a00] p-[1px] relative">
                <div
                  className="absolute -top-1 h-4 w-1.5 rounded bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
                  style={{ left: '76%' }}
                />
              </div>
              <div className="flex justify-between text-[9px] font-mono text-slate-400 pt-0.5">
                <span>0 (Fear)</span>
                <span>50</span>
                <span>100 (Greed)</span>
              </div>
            </div>
          </div>

          {/* Real-time Network & Gas Monitor */}
          <div className="rounded-2xl border border-white/10 bg-[#15193b]/90 p-4 backdrop-blur-xl shadow-xl space-y-2.5 font-mono">
            <div className="flex items-center justify-between border-b border-white/10 pb-2 font-sans">
              <div className="flex items-center gap-1.5">
                <Zap size={14} className="text-[#ff7a00]" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Network Pulse
                </span>
              </div>
              <span className="h-2 w-2 rounded-full bg-[#ff7a00] animate-pulse"></span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-sans text-[11px]">Ethereum Gas</span>
                <span className="font-bold text-[#ff7a00]">12 Gwei ($0.42)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-sans text-[11px]">Solana TPS</span>
                <span className="font-bold text-white">2,940 TPS</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-sans text-[11px]">Bitcoin Mempool</span>
                <span className="font-bold text-white">14 sat/vB</span>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 pt-1.5 font-sans">
                <span className="text-slate-300 text-[11px]">Engine Latency</span>
                <span className="font-mono font-bold text-[#ff7a00]">0.85 ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
