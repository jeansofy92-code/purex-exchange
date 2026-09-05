import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import {
  Star,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Flame,
  Sparkles,
} from 'lucide-react'
import CoinLogo from '../CoinLogo'
import RealisticChart from '../RealisticChart'


function MarketTable({
  coins,
  sortField,
  sortOrder,
  onSort,
  watchlist,
  onToggleWatchlist,
  onSelectCoin,
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const totalPages = Math.ceil(coins.length / pageSize) || 1
  const startIndex = (currentPage - 1) * pageSize
  const paginatedCoins = coins.slice(startIndex, startIndex + pageSize)

  const renderSortIcon = (field) => {
    if (sortField !== field) {
      return <ArrowUpDown size={12} className="opacity-40" />
    }
    return sortOrder === 'asc' ? (
      <ArrowUp size={12} className="text-[#ff7a00]" />
    ) : (
      <ArrowDown size={12} className="text-[#ff7a00]" />
    )
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#15193b]/90 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] overflow-hidden">
      {/* Table Container */}
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-white/10 bg-[#1a1f46] text-[0.72rem] font-bold uppercase tracking-[0.1em] text-slate-300 select-none">
              <th className="py-4 pl-5 pr-2 w-10 text-center">⭐</th>
              <th
                onClick={() => onSort('rank')}
                className="py-4 px-3 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1">
                  # {renderSortIcon('rank')}
                </div>
              </th>
              <th
                onClick={() => onSort('name')}
                className="py-4 px-4 cursor-pointer hover:text-white transition-colors min-w-[180px]"
              >
                <div className="flex items-center gap-1">
                  Asset {renderSortIcon('name')}
                </div>
              </th>
              <th
                onClick={() => onSort('price')}
                className="py-4 px-4 cursor-pointer hover:text-white transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-1">
                  Price {renderSortIcon('price')}
                </div>
              </th>
              <th className="py-4 px-3 text-right hidden sm:table-cell">1h %</th>
              <th
                onClick={() => onSort('change24h')}
                className="py-4 px-4 cursor-pointer hover:text-white transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-1">
                  24h % {renderSortIcon('change24h')}
                </div>
              </th>
              <th className="py-4 px-3 text-right hidden lg:table-cell">7d %</th>
              <th className="py-4 px-4 text-center hidden xl:table-cell min-w-[140px]">
                24h Range (L / H)
              </th>
              <th className="py-4 px-4 text-right hidden md:table-cell">24h Volume</th>
              <th className="py-4 px-4 text-right hidden lg:table-cell">Market Cap</th>
              <th className="py-4 px-4 text-center min-w-[120px] hidden md:table-cell">
                Last 7 Days
              </th>
              <th className="py-4 pr-5 pl-3 text-right">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-white/5 text-xs font-medium">
            <AnimatePresence mode="popLayout">
              {paginatedCoins.map((coin, index) => {
                const isSaved = watchlist.includes(coin.id)
                const numericHigh = parseFloat(coin.high24h?.replace(/,/g, '')) || coin.rawPrice * 1.05
                const numericLow = parseFloat(coin.low24h?.replace(/,/g, '')) || coin.rawPrice * 0.95
                const current = coin.rawPrice
                const rangePct = Math.max(
                  5,
                  Math.min(95, ((current - numericLow) / (numericHigh - numericLow || 1)) * 100)
                )

                return (
                  <motion.tr
                    key={coin.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.02 }}
                    onClick={() => onSelectCoin && onSelectCoin(coin)}
                    className="hover:bg-white/[0.04] transition-colors group cursor-pointer"
                  >
                    {/* Watchlist Star */}
                    <td
                      className="py-4 pl-5 pr-2 text-center"
                      onClick={(e) => {
                        e.stopPropagation()
                        onToggleWatchlist(coin.id)
                      }}
                    >
                      <button
                        type="button"
                        aria-label="Toggle watchlist"
                        className="p-1 rounded-md text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                      >
                        <Star
                          size={15}
                          className={isSaved ? 'fill-amber-400 text-amber-400 filter drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]' : ''}
                        />
                      </button>
                    </td>

                    {/* Rank */}
                    <td className="py-4 px-3 text-slate-400 font-semibold">{coin.rank}</td>

                    {/* Asset Name + Symbol + Badges */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative shrink-0">
                          <CoinLogo symbol={coin.symbol} size={28} />
                          {coin.isFeatured && (
                            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#ff7a00] text-[0.55rem] font-black text-white shadow-sm">
                              ★
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 font-bold text-white text-[0.88rem]">
                            <span>{coin.name}</span>
                            {coin.isHot && (
                              <Flame size={12} className="text-[#ff7a00] fill-[#ff7a00]" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[0.7rem] uppercase tracking-wider text-slate-400 font-semibold">
                              {coin.symbol}
                            </span>
                            <span className="text-[0.65rem] text-slate-400 bg-white/5 border border-white/10 px-1.5 py-0.2 rounded font-medium">
                              {coin.pair}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-4 text-right">
                      <div className="text-[0.92rem] font-bold text-white tracking-tight">
                        ${coin.price}
                      </div>
                      <div className="text-[0.68rem] text-slate-400 mt-0.5">
                        ≈ ${coin.price} USD
                      </div>
                    </td>

                    {/* 1h Change */}
                    <td className="py-4 px-3 text-right hidden sm:table-cell font-semibold text-slate-300">
                      {coin.change1h || '0.00%'}
                    </td>

                    {/* 24h Change Badge */}
                    <td className="py-4 px-4 text-right">
                      <span
                        className={`inline-flex items-center justify-end rounded-lg px-2.5 py-1 text-xs font-bold ${
                          coin.positive
                            ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.15)]'
                            : 'bg-rose-500/15 border border-rose-500/30 text-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.15)]'
                        }`}
                      >
                        {coin.change24h}
                      </span>
                    </td>

                    {/* 7d Change */}
                    <td
                      className={`py-4 px-3 text-right hidden lg:table-cell font-semibold ${
                        coin.change7d?.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {coin.change7d || coin.change24h}
                    </td>

                    {/* 24h Range Meter */}
                    <td className="py-4 px-4 text-center hidden xl:table-cell">
                      <div className="w-full max-w-[130px] mx-auto">
                        <div className="flex justify-between text-[0.65rem] text-slate-400 mb-1">
                          <span>${coin.low24h || '0.00'}</span>
                          <span>${coin.high24h || '0.00'}</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden relative">
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full"
                            style={{ width: `${rangePct}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* 24h Volume */}
                    <td className="py-4 px-4 text-right hidden md:table-cell font-semibold text-slate-300">
                      {coin.volume24h}
                    </td>

                    {/* Market Cap */}
                    <td className="py-4 px-4 text-right hidden lg:table-cell font-semibold text-slate-300">
                      {coin.marketCap}
                    </td>

                    {/* Last 7 Days Sparkline */}
                    <td className="py-4 px-4 text-center hidden md:table-cell">
                      <div className="w-24 mx-auto">
                        <RealisticChart values={coin.trend} positive={coin.positive} height={32} />
                      </div>
                    </td>

                    {/* Action / Trade */}
                    <td className="py-4 pr-5 pl-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <NavLink
                          to={`/trade?pair=${coin.symbol}_USDT`}
                          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#ff7a00] to-[#ff9500] px-3.5 py-1.5 text-xs font-bold text-white shadow-[0_0_12px_rgba(255,122,0,0.35)] hover:from-[#ff9500] hover:to-[#ffaa33] hover:shadow-[0_0_18px_rgba(255,122,0,0.5)] transition-all hover:scale-105 cursor-pointer"
                        >
                          Trade
                          <ArrowRight size={12} />
                        </NavLink>
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Empty Search Result State */}
      {paginatedCoins.length === 0 && (
        <div className="py-16 px-4 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 mb-3">
            <Sparkles size={20} />
          </div>
          <h3 className="text-base font-bold text-white">No digital assets found</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search query or switching to another category tab to view available pairs.
          </p>
        </div>
      )}

      {/* Pagination Footer */}
      <div className="border-t border-white/10 bg-[#1a1f46] px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
              setCurrentPage(1)
            }}
            className="bg-[#121639] border border-white/15 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:border-[#ff7a00]"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span className="ml-2">
            Showing <strong>{startIndex + 1}</strong> to{' '}
            <strong>{Math.min(startIndex + pageSize, coins.length)}</strong> of{' '}
            <strong>{coins.length}</strong> assets
          </span>
        </div>

        {/* Page Nav */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1.5 rounded-lg border border-white/10 bg-[#121639] text-white disabled:opacity-40 disabled:pointer-events-none hover:border-white/25 transition-colors font-semibold cursor-pointer"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => setCurrentPage(pageNum)}
              className={`h-8 w-8 rounded-lg font-bold transition-all cursor-pointer ${
                currentPage === pageNum
                  ? 'bg-[#ff7a00] text-white shadow-[0_0_12px_rgba(255,122,0,0.35)]'
                  : 'border border-white/10 bg-[#121639] text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-1.5 rounded-lg border border-white/10 bg-[#121639] text-white disabled:opacity-40 disabled:pointer-events-none hover:border-white/25 transition-colors font-semibold cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default MarketTable
