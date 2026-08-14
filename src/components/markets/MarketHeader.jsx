import { motion } from 'framer-motion'
import { Flame, TrendingUp, BarChart3, Globe, ArrowUpRight } from 'lucide-react'
import CoinLogo from '../CoinLogo'
import RealisticChart from '../RealisticChart'


function MarketHeader({ spotlights, stats }) {
  const { topGainer, topVolume, trending } = spotlights

  return (
    <div className="mb-8">
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[#58e65b] animate-pulse" />
            <span className="text-xs font-semibold tracking-[0.16em] uppercase text-[#58e65b]">
              PUREX LIVE MARKETS
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Cryptocurrency Market Overview
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#8d9691] max-w-2xl">
            Real-time streaming prices, 24h trading volume, top gainers, and institutional-grade market depth across 150+ digital assets.
          </p>
        </div>

        {/* Global Market Overview Summary Bar */}
        <div className="flex flex-wrap items-center gap-4 bg-[#0a0f10]/80 border border-white/10 rounded-xl px-4 py-2.5 backdrop-blur-md">
          <div className="text-xs">
            <span className="text-[#8d9691]">Market Cap: </span>
            <span className="font-semibold text-white">{stats.totalMarketCap}</span>
            <span className="ml-1 text-[#58e65b] font-medium">{stats.totalMarketCapChange}</span>
          </div>
          <div className="h-3 w-[1px] bg-white/10 hidden sm:block" />
          <div className="text-xs">
            <span className="text-[#8d9691]">24h Vol: </span>
            <span className="font-semibold text-white">{stats.total24hVolume}</span>
          </div>
          <div className="h-3 w-[1px] bg-white/10 hidden sm:block" />
          <div className="text-xs">
            <span className="text-[#8d9691]">BTC Dominance: </span>
            <span className="font-semibold text-[#58e65b]">{stats.btcDominance}</span>
          </div>
        </div>
      </div>

      {/* 4 Spotlight Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Trending / Hot */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#070c0d]/80 p-4.5 backdrop-blur-xl hover:border-[#58e65b]/30 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#58e65b]/10 text-[#58e65b] border border-[#58e65b]/20">
                <Flame size={15} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8d9691]">Trending</span>
            </div>
            <span className="text-[0.7rem] text-[#58e65b] bg-[#183a1d]/60 border border-[#58e65b]/30 px-2 py-0.5 rounded-full font-medium">
              Hot
            </span>
          </div>

          <div className="space-y-2.5">
            {trending.slice(0, 3).map((coin) => (
              <div key={coin.symbol} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CoinLogo symbol={coin.symbol} size={20} />
                  <span className="text-xs font-semibold text-white">{coin.symbol}</span>
                  <span className="text-[0.7rem] text-[#8d9691] uppercase">{coin.pair.split('/')[1]}</span>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-white">${coin.price}</div>
                  <div className={`text-[0.68rem] font-semibold ${coin.positive ? 'text-[#58e65b]' : 'text-[#ff6b6b]'}`}>
                    {coin.change24h}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Card 2: Top Gainer */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#070c0d]/80 p-4.5 backdrop-blur-xl hover:border-[#58e65b]/30 transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#58e65b]/10 text-[#58e65b] border border-[#58e65b]/20">
                <TrendingUp size={15} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8d9691]">Top Gainer (24h)</span>
            </div>
            <span className="text-[0.7rem] text-[#58e65b] font-bold">24h Surge</span>
          </div>

          {topGainer && (
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CoinLogo symbol={topGainer.symbol} size={28} />
                  <div>
                    <div className="text-sm font-bold text-white">{topGainer.name}</div>
                    <div className="text-xs text-[#8d9691]">{topGainer.pair}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-white">${topGainer.price}</div>
                  <span className="inline-flex items-center gap-0.5 text-xs font-bold text-[#58e65b] bg-[#183a1d]/60 border border-[#58e65b]/30 px-2 py-0.5 rounded-md">
                    <ArrowUpRight size={12} />
                    {topGainer.change24h}
                  </span>
                </div>
              </div>

              <div className="mt-3 w-full">
                <RealisticChart values={topGainer.trend} positive={true} height={28} />
              </div>
            </div>
          )}
        </motion.div>

        {/* Card 3: Top Volume Leader */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#070c0d]/80 p-4.5 backdrop-blur-xl hover:border-[#58e65b]/30 transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#58e65b]/10 text-[#58e65b] border border-[#58e65b]/20">
                <BarChart3 size={15} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8d9691]">24h Volume Leader</span>
            </div>
            <span className="text-[0.7rem] text-white font-medium">{topVolume.volume24h}</span>
          </div>

          {topVolume && (
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CoinLogo symbol={topVolume.symbol} size={28} />
                  <div>
                    <div className="text-sm font-bold text-white">{topVolume.name}</div>
                    <div className="text-xs text-[#8d9691]">{topVolume.pair}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-white">${topVolume.price}</div>
                  <div className={`text-xs font-semibold ${topVolume.positive ? 'text-[#58e65b]' : 'text-[#ff6b6b]'}`}>
                    {topVolume.change24h}
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex justify-between text-[0.7rem] text-[#8d9691] mb-1">
                  <span>Market Dominance</span>
                  <span className="text-white font-semibold">{stats.btcDominance}</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#58e65b] to-[#38bdf8] rounded-full" style={{ width: stats.btcDominance }} />
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Card 4: Market Sentiment / Fear & Greed */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#070c0d]/80 p-4.5 backdrop-blur-xl hover:border-[#58e65b]/30 transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#58e65b]/10 text-[#58e65b] border border-[#58e65b]/20">
                <Globe size={15} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8d9691]">Sentiment Index</span>
            </div>
            <span className="text-[0.7rem] text-[#58e65b] font-bold">Bullish</span>
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-1">
              <div className="text-2xl font-extrabold text-white">
                {stats.fearGreedIndex.value}
                <span className="text-xs font-semibold text-[#8d9691] ml-1">/ 100</span>
              </div>
              <span className="text-xs font-bold text-[#58e65b] bg-[#183a1d]/60 border border-[#58e65b]/30 px-2 py-0.5 rounded-full">
                {stats.fearGreedIndex.status}
              </span>
            </div>

            <div className="mt-3">
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-yellow-500 via-[#58e65b] to-[#48db50] rounded-full shadow-[0_0_12px_rgba(88,230,91,0.5)]"
                  style={{ width: `${stats.fearGreedIndex.value}%` }}
                />
              </div>
              <div className="flex justify-between text-[0.65rem] text-[#8d9691] mt-1.5">
                <span>0 (Fear)</span>
                <span>50 (Neutral)</span>
                <span>100 (Greed)</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default MarketHeader
