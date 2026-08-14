import { useState } from 'react'
import { useMarketsList } from '../hooks/useMarketsList'
import MarketHeader from '../components/markets/MarketHeader'
import MarketFilters from '../components/markets/MarketFilters'
import MarketTable from '../components/markets/MarketTable'
import MarketQuickModal from '../components/markets/MarketQuickModal'
import CTA from '../components/CTA'

function Markets() {
  const {
    coins,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    quoteCurrency,
    setQuoteCurrency,
    sortField,
    sortOrder,
    handleSort,
    watchlist,
    toggleWatchlist,
    spotlights,
    stats,
  } = useMarketsList()

  const [selectedCoin, setSelectedCoin] = useState(null)

  return (
    <main className="home-page-shell min-h-screen">
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <MarketHeader spotlights={spotlights} stats={stats} />

        <MarketFilters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          quoteCurrency={quoteCurrency}
          setQuoteCurrency={setQuoteCurrency}
          watchlistCount={watchlist.length}
          totalResults={coins.length}
        />

        <MarketTable
          coins={coins}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
          watchlist={watchlist}
          onToggleWatchlist={toggleWatchlist}
          onSelectCoin={(coin) => setSelectedCoin(coin)}
        />
      </div>

      <CTA />

      {selectedCoin && (
        <MarketQuickModal
          coin={selectedCoin}
          onClose={() => setSelectedCoin(null)}
          isSaved={watchlist.includes(selectedCoin.id)}
          onToggleWatchlist={toggleWatchlist}
        />
      )}
    </main>
  )
}

export default Markets
