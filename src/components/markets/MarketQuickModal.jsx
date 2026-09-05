import { motion, AnimatePresence } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { X, Star, ArrowRight, ArrowUpRight } from 'lucide-react'
import CoinLogo from '../CoinLogo'
import RealisticChart from '../RealisticChart'


function MarketQuickModal({ coin, onClose, isSaved, onToggleWatchlist }) {
  if (!coin) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl border border-white/15 bg-[#15193b] p-6 text-white shadow-[0_24px_60px_rgba(0,0,0,0.9)]"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-5 border-b border-white/10">
            <div className="flex items-center gap-3.5">
              <CoinLogo symbol={coin.symbol} size={42} />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-extrabold text-white">{coin.name}</h2>
                  <span className="text-xs uppercase font-bold text-[#ff7a00] bg-[#ff7a00]/15 border border-[#ff7a00]/30 px-2 py-0.5 rounded-full">
                    {coin.symbol}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">Rank #{coin.rank} • {coin.pair}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onToggleWatchlist(coin.id)}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  isSaved
                    ? 'border-amber-400/40 bg-amber-400/10 text-amber-400'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                }`}
                aria-label="Add to watchlist"
              >
                <Star size={18} className={isSaved ? 'fill-amber-400' : ''} />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Price & 24h Change Banner */}
          <div className="py-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Live Spot Price</div>
              <div className="text-3xl font-black text-white mt-1 tracking-tight">
                ${coin.price}
                <span className="text-xs text-slate-400 font-normal ml-1">USDT</span>
              </div>
            </div>

            <div className="text-right">
              <span
                className={`inline-flex items-center gap-1 text-sm font-bold px-3 py-1 rounded-xl ${
                  coin.positive
                    ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
                    : 'bg-rose-500/15 border border-rose-500/30 text-rose-400'
                }`}
              >
                <ArrowUpRight size={16} />
                {coin.change24h} (24h)
              </span>
            </div>
          </div>

          {/* 7-Day Sparkline Chart */}
          <div className="mb-5 rounded-2xl border border-white/10 bg-[#0e122b] p-4">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
              <span>7-Day Price Trajectory</span>
              <span className={coin.positive ? 'text-emerald-400' : 'text-rose-400'}>
                {coin.change7d || coin.change24h}
              </span>
            </div>
            <div className="w-full">
              <RealisticChart values={coin.trend} positive={coin.positive} height={70} />
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center">
              <div className="text-[0.68rem] uppercase font-bold text-slate-400">24h High</div>
              <div className="text-xs font-bold text-white mt-1">${coin.high24h || 'N/A'}</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center">
              <div className="text-[0.68rem] uppercase font-bold text-slate-400">24h Low</div>
              <div className="text-xs font-bold text-white mt-1">${coin.low24h || 'N/A'}</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center">
              <div className="text-[0.68rem] uppercase font-bold text-slate-400">24h Volume</div>
              <div className="text-xs font-bold text-white mt-1">{coin.volume24h}</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center">
              <div className="text-[0.68rem] uppercase font-bold text-slate-400">Market Cap</div>
              <div className="text-xs font-bold text-white mt-1">{coin.marketCap}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <NavLink
              to={`/trade?pair=${coin.symbol}_USDT`}
              className="w-full flex-1 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff7a00] to-[#ff9500] py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(255,122,0,0.35)] hover:from-[#ff9500] hover:to-[#ffaa33] transition-all cursor-pointer"
            >
              Trade {coin.symbol}/USDT
              <ArrowRight size={16} />
            </NavLink>
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 rounded-full border border-white/15 bg-white/5 text-xs font-semibold text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default MarketQuickModal
