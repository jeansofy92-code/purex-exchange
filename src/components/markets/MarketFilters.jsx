import { Search, X, Sparkles } from 'lucide-react'
import { marketCategories } from '../../data/marketsData'

function MarketFilters({
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  quoteCurrency,
  setQuoteCurrency,
  watchlistCount,
  totalResults,
}) {
  return (
    <div className="mb-6 space-y-4">
      {/* Category Tabs & Search Bar Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Horizontal Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {marketCategories.map((cat) => {
            const isActive = selectedCategory === cat.id
            const isWatchlist = cat.id === 'watchlist'

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#58e65b] text-black shadow-[0_0_16px_rgba(88,230,91,0.35)]'
                    : 'bg-[#080d0e]/90 text-[#8d9691] border border-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                <span>{cat.label}</span>
                {isWatchlist && watchlistCount > 0 && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[0.65rem] font-bold ${
                      isActive ? 'bg-black text-[#58e65b]' : 'bg-[#58e65b]/20 text-[#58e65b]'
                    }`}
                  >
                    {watchlistCount}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Search Bar & Quote Selector */}
        <div className="flex items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8d9691] pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search coin or symbol..."
              className="w-full bg-[#080d0e]/90 border border-white/10 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-[#8d9691] focus:outline-none focus:border-[#58e65b]/50 focus:ring-1 focus:ring-[#58e65b]/50 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8d9691] hover:text-white"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Quote Currency Buttons */}
          <div className="flex items-center bg-[#080d0e]/90 border border-white/10 rounded-xl p-1">
            {['USDT', 'USD', 'BTC'].map((currency) => (
              <button
                key={currency}
                type="button"
                onClick={() => setQuoteCurrency(currency)}
                className={`px-2.5 py-1 rounded-lg text-[0.7rem] font-bold transition-all ${
                  quoteCurrency === currency
                    ? 'bg-[#183a1d] text-[#58e65b] border border-[#58e65b]/30'
                    : 'text-[#8d9691] hover:text-white'
                }`}
              >
                {currency}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Info & Results Count */}
      <div className="flex items-center justify-between text-xs text-[#8d9691] px-1">
        <div className="flex items-center gap-2">
          <span>Showing <strong className="text-white">{totalResults}</strong> digital assets</span>
          {selectedCategory !== 'all' && (
            <span className="inline-flex items-center gap-1 bg-[#183a1d]/60 border border-[#58e65b]/20 px-2 py-0.5 rounded-md text-[#58e65b] text-[0.7rem] font-semibold">
              <Sparkles size={10} />
              {marketCategories.find((c) => c.id === selectedCategory)?.label}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-[0.7rem]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#58e65b] animate-ping" />
          <span>Real-time price feed active</span>
        </div>
      </div>
    </div>
  )
}

export default MarketFilters
