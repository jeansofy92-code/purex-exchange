import { useState, useEffect, useMemo, useCallback } from 'react'
import { initialCoinsList, marketStatsOverview } from '../data/marketsData'

const WATCHLIST_STORAGE_KEY = 'purex_markets_watchlist'

export function useMarketsList() {
  const [coins, setCoins] = useState(initialCoinsList)
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [quoteCurrency, setQuoteCurrency] = useState('USDT')
  const [sortField, setSortField] = useState('rank') // 'rank' | 'price' | 'change24h' | 'volume24h' | 'marketCap'
  const [sortOrder, setSortOrder] = useState('asc') // 'asc' | 'desc'
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem(WATCHLIST_STORAGE_KEY)
      return saved ? JSON.parse(saved) : ['bitcoin', 'ethereum', 'purex', 'solana']
    } catch {
      return ['bitcoin', 'ethereum', 'purex', 'solana']
    }
  })

  // Toggle watchlist
  const toggleWatchlist = useCallback((coinId) => {
    setWatchlist((prev) => {
      const next = prev.includes(coinId)
        ? prev.filter((id) => id !== coinId)
        : [...prev, coinId]
      try {
        localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(next))
      } catch (e) {
        console.error('Failed to save watchlist to localStorage', e)
      }
      return next
    })
  }, [])

  // Fetch live market prices from CoinGecko
  useEffect(() => {
    let isMounted = true

    const fetchLiveCoinGecko = async () => {
      try {
        setLoading(true)
        const ids = 'bitcoin,ethereum,binancecoin,solana,ripple,cardano,avalanche-2,dogecoin,chainlink,near,polkadot,uniswap,the-open-network,arbitrum,optimism'
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`
        )
        if (!res.ok) throw new Error('CoinGecko fetch failed')
        const priceMap = await res.json()

        if (isMounted) {
          setCoins((prev) =>
            prev.map((coin) => {
              const live = priceMap[coin.id]
              if (!live) return coin

              const price = live.usd
              const change24h = live.usd_24h_change ?? coin.rawChange24h
              const volume = live.usd_24h_vol
              const cap = live.usd_market_cap

              const formatVol = (val) => {
                if (!val) return coin.volume24h
                if (val >= 1e9) return `$${(val / 1e9).toFixed(2)}B`
                return `$${(val / 1e6).toFixed(2)}M`
              }

              const formatCap = (val) => {
                if (!val) return coin.marketCap
                if (val >= 1e12) return `$${(val / 1e12).toFixed(2)}T`
                if (val >= 1e9) return `$${(val / 1e9).toFixed(2)}B`
                return `$${(val / 1e6).toFixed(2)}M`
              }

              return {
                ...coin,
                price: price.toLocaleString('en-US', {
                  minimumFractionDigits: price < 1 ? 4 : 2,
                  maximumFractionDigits: price < 1 ? 6 : 2,
                }),
                rawPrice: price,
                change24h: `${change24h > 0 ? '+' : ''}${change24h.toFixed(2)}%`,
                rawChange24h: change24h,
                volume24h: formatVol(volume),
                marketCap: formatCap(cap),
                positive: change24h >= 0,
              }
            })
          )
        }
      } catch (err) {
        console.warn('Using simulated/cached market prices:', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchLiveCoinGecko()
    const interval = setInterval(fetchLiveCoinGecko, 45000)

    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [])

  // Filter & Sort logic
  const filteredAndSortedCoins = useMemo(() => {
    let result = [...coins]

    // Category filter
    if (selectedCategory === 'watchlist') {
      result = result.filter((c) => watchlist.includes(c.id))
    } else if (selectedCategory === 'gainers') {
      result = result.filter((c) => c.rawChange24h > 0).sort((a, b) => b.rawChange24h - a.rawChange24h)
    } else if (selectedCategory === 'losers') {
      result = result.filter((c) => c.rawChange24h < 0).sort((a, b) => a.rawChange24h - b.rawChange24h)
    } else if (selectedCategory !== 'all') {
      result = result.filter((c) => c.category && c.category.includes(selectedCategory))
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.symbol.toLowerCase().includes(q) ||
          c.pair.toLowerCase().includes(q)
      )
    }

    // Sorting
    result.sort((a, b) => {
      let comparison = 0
      if (sortField === 'rank') {
        comparison = a.rank - b.rank
      } else if (sortField === 'price') {
        comparison = a.rawPrice - b.rawPrice
      } else if (sortField === 'change24h') {
        comparison = a.rawChange24h - b.rawChange24h
      } else if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name)
      }

      return sortOrder === 'asc' ? comparison : -comparison
    })

    return result
  }, [coins, selectedCategory, searchQuery, sortField, sortOrder, watchlist])

  // Top gainers, top volume, hot coins for spotlight header
  const spotlights = useMemo(() => {
    const sortedGainers = [...coins].sort((a, b) => b.rawChange24h - a.rawChange24h)
    const sortedVolume = [...coins].sort((a, b) => b.rawPrice * 10 - a.rawPrice * 10)
    const hotCoins = coins.filter((c) => c.isHot || c.isTrending).slice(0, 4)

    return {
      topGainer: sortedGainers[0] || coins[0],
      topVolume: sortedVolume[0] || coins[0],
      trending: hotCoins,
    }
  }, [coins])

  // Sorting handler
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortOrder(field === 'rank' || field === 'name' ? 'asc' : 'desc')
    }
  }

  return {
    coins: filteredAndSortedCoins,
    rawCoins: coins,
    loading,
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
    stats: marketStatsOverview,
  }
}
