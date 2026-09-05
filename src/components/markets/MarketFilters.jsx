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
                className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#ff7a00] text-white shadow-[0_0_16px_rgba(255,122,0,0.4)]'
                    : 'bg-[#15193b]/90 text-slate-400 border border-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                <span>{cat.label}</span>
                {isWatchlist && watchlistCount > 0 && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[0.65rem] font-bold ${
                      isActive ? 'bg-black/40 text-white' : 'bg-[#ff7a00]/20 text-[#ff7a00]'
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
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search coin or symbol..."
              className="w-full bg-[#15193b]/90 border border-white/10 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#ff7a00] focus:ring-1 focus:ring-[#ff7a00] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Quote Currency Buttons */}
          <div className="flex items-center bg-[#15193b]/90 border border-white/10 rounded-xl p-1">
            {['USDT', 'USD', 'BTC'].map((currency) => (
              <button
                key={currency}
                type="button"
                onClick={() => setQuoteCurrency(currency)}
                className={`px-2.5 py-1 rounded-lg text-[0.7rem] font-bold transition-all cursor-pointer ${
                  quoteCurrency === currency
                    ? 'bg-[#ff7a00] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {currency}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Info & Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <div className="flex items-center gap-2">
          <span>Showing <strong className="text-white">{totalResults}</strong> digital assets</span>
          {selectedCategory !== 'all' && (
            <span className="inline-flex items-center gap-1 bg-[#ff7a00]/15 border border-[#ff7a00]/30 px-2 py-0.5 rounded-md text-[#ff7a00] text-[0.7rem] font-bold">
              <Sparkles size={10} />
              {marketCategories.find((c) => c.id === selectedCategory)?.label}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-[0.7rem]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-emerald-400 font-medium">Real-time price feed active</span>
        </div>
      </div>
    </div>
  )
}

export default MarketFilters
