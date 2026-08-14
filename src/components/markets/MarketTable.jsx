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
      <ArrowUp size={12} className="text-[#58e65b]" />
    ) : (
      <ArrowDown size={12} className="text-[#58e65b]" />
    )
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#060a0b]/90 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] overflow-hidden">
      {/* Table Container */}
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-white/10 bg-[#080e0f] text-[0.72rem] font-bold uppercase tracking-[0.1em] text-[#8d9691] select-none">
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
                    className="hover:bg-white/[0.03] transition-colors group cursor-pointer"
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
                        className="p-1 rounded-md text-[#8d9691] hover:text-yellow-400 transition-colors"
                      >
                        <Star
                          size={15}
                          className={isSaved ? 'fill-yellow-400 text-yellow-400 filter drop-shadow-[0_0_6px_rgba(250,204,21,0.5)]' : ''}
                        />
                      </button>
                    </td>

                    {/* Rank */}
                    <td className="py-4 px-3 text-[#8d9691] font-semibold">{coin.rank}</td>

                    {/* Asset Name + Symbol + Badges */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative shrink-0">
                          <CoinLogo symbol={coin.symbol} size={28} />
                          {coin.isFeatured && (
                            <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-[#58e65b] text-[0.55rem] font-black text-black">
                              ★
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 font-bold text-white text-[0.88rem]">
                            <span>{coin.name}</span>
                            {coin.isHot && (
                              <Flame size={12} className="text-orange-500 fill-orange-500" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[0.7rem] uppercase tracking-wider text-[#8d9691] font-semibold">
                              {coin.symbol}
                            </span>
                            <span className="text-[0.65rem] text-[#8d9691]/70 bg-white/5 border border-white/10 px-1.5 py-0.2 rounded font-medium">
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
                      <div className="text-[0.68rem] text-[#8d9691] mt-0.5">
                        ≈ ${coin.price} USD
                      </div>
                    </td>

                    {/* 1h Change */}
                    <td className="py-4 px-3 text-right hidden sm:table-cell font-semibold text-[#dfe9e2]">
                      {coin.change1h || '0.00%'}
                    </td>

                    {/* 24h Change Badge */}
                    <td className="py-4 px-4 text-right">
                      <span
                        className={`inline-flex items-center justify-end rounded-lg px-2.5 py-1 text-xs font-bold ${
                          coin.positive
                            ? 'bg-[#183a1d]/60 border border-[#58e65b]/30 text-[#58e65b] shadow-[0_0_10px_rgba(88,230,91,0.15)]'
                            : 'bg-[#3a1818]/60 border border-[#ff6b6b]/30 text-[#ff6b6b] shadow-[0_0_10px_rgba(255,107,107,0.15)]'
                        }`}
                      >
                        {coin.change24h}
                      </span>
                    </td>

                    {/* 7d Change */}
                    <td
                      className={`py-4 px-3 text-right hidden lg:table-cell font-semibold ${
                        coin.change7d?.startsWith('+') ? 'text-[#58e65b]' : 'text-[#ff6b6b]'
                      }`}
                    >
                      {coin.change7d || coin.change24h}
                    </td>

                    {/* 24h Range Meter */}
                    <td className="py-4 px-4 text-center hidden xl:table-cell">
                      <div className="w-full max-w-[130px] mx-auto">
                        <div className="flex justify-between text-[0.65rem] text-[#8d9691] mb-1">
                          <span>${coin.low24h || '0.00'}</span>
                          <span>${coin.high24h || '0.00'}</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden relative">
                          <div
                            className="h-full bg-gradient-to-r from-yellow-500 to-[#58e65b] rounded-full"
                            style={{ width: `${rangePct}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* 24h Volume */}
                    <td className="py-4 px-4 text-right hidden md:table-cell font-semibold text-[#dfe9e2]">
                      {coin.volume24h}
                    </td>

                    {/* Market Cap */}
                    <td className="py-4 px-4 text-right hidden lg:table-cell font-semibold text-[#dfe9e2]">
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
                          className="inline-flex items-center gap-1 bg-[#58e65b] hover:bg-[#48db50] text-black px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-[0_0_12px_rgba(88,230,91,0.25)] hover:shadow-[0_0_20px_rgba(88,230,91,0.45)] transition-all hover:scale-105"
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
          <div className="mx-auto w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#8d9691] mb-3">
            <Sparkles size={20} />
          </div>
          <h3 className="text-base font-bold text-white">No digital assets found</h3>
          <p className="text-xs text-[#8d9691] mt-1 max-w-sm mx-auto">
            Try adjusting your search query or switching to another category tab to view available pairs.
          </p>
        </div>
      )}

      {/* Pagination Footer */}
      <div className="border-t border-white/10 bg-[#080e0f] px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8d9691]">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
              setCurrentPage(1)
            }}
            className="bg-[#0a0f10] border border-white/15 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:border-[#58e65b]"
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
            className="px-3 py-1.5 rounded-lg border border-white/10 bg-[#0a0f10] text-white disabled:opacity-40 disabled:pointer-events-none hover:border-white/25 transition-colors font-semibold"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => setCurrentPage(pageNum)}
              className={`h-8 w-8 rounded-lg font-bold transition-all ${
                currentPage === pageNum
                  ? 'bg-[#58e65b] text-black shadow-[0_0_12px_rgba(88,230,91,0.3)]'
                  : 'border border-white/10 bg-[#0a0f10] text-[#8d9691] hover:text-white hover:border-white/20'
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-1.5 rounded-lg border border-white/10 bg-[#0a0f10] text-white disabled:opacity-40 disabled:pointer-events-none hover:border-white/25 transition-colors font-semibold"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default MarketTable
