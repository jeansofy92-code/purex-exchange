import { useState } from 'react'
import { Search, X, TrendingUp, TrendingDown, Star, Sparkles } from 'lucide-react'

export const PAIRS_DATABASE = [
  { id: 'BTC/USDT', name: 'Bitcoin', symbol: 'BTC', price: 96420.50, change24h: +2.84, volume24h: '$4.2B', category: 'L1', hot: true },
  { id: 'ETH/USDT', name: 'Ethereum', symbol: 'ETH', price: 3510.20, change24h: +4.12, volume24h: '$2.8B', category: 'L1', hot: true },
  { id: 'SOL/USDT', name: 'Solana', symbol: 'SOL', price: 194.80, change24h: +7.65, volume24h: '$1.4B', category: 'L1', hot: true },
  { id: 'PUREX/USDT', name: 'PureX Native Yield', symbol: 'PUREX', price: 14.85, change24h: +18.40, volume24h: '$840M', category: 'PureX', hot: true },
  { id: 'BNB/USDT', name: 'Binance Coin', symbol: 'BNB', price: 685.40, change24h: +1.20, volume24h: '$620M', category: 'L1', hot: false },
  { id: 'AVAX/USDT', name: 'Avalanche', symbol: 'AVAX', price: 34.20, change24h: -1.15, volume24h: '$340M', category: 'L1', hot: false },
  { id: 'XRP/USDT', name: 'Ripple', symbol: 'XRP', price: 2.45, change24h: +0.95, volume24h: '$950M', category: 'Payment', hot: false },
  { id: 'LINK/USDT', name: 'Chainlink', symbol: 'LINK', price: 21.80, change24h: +5.30, volume24h: '$210M', category: 'DeFi', hot: false }
]

export default function PairSelectorModal({ isOpen, onClose, onSelectPair, currentPair = 'BTC/USDT' }) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('ALL')

  if (!isOpen) return null

  const filteredPairs = PAIRS_DATABASE.filter((p) => {
    const matchesSearch = p.id.toLowerCase().includes(search.toLowerCase()) || p.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'ALL' || (activeCategory === 'HOT' && p.hot) || p.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div 
        className="w-full max-w-lg bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 font-mono text-white relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-[#B0F127]" />
            <h3 className="text-base font-black tracking-tight text-white">Select Trading Pair</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/60 hover:text-white bg-white/5 rounded-lg transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-3 text-white/40" />
          <input
            type="text"
            placeholder="Search coin or pair (e.g. BTC, Solana, PUREX)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#141414] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#B0F127]"
            autoFocus
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {['ALL', 'HOT', 'L1', 'DeFi', 'PureX'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-lg font-bold transition-all shrink-0 ${
                activeCategory === cat
                  ? 'bg-[#B0F127] text-black'
                  : 'bg-white/5 text-white/60 hover:text-white'
              }`}
            >
              {cat === 'PureX' ? 'PureX Ecosystem' : cat}
            </button>
          ))}
        </div>

        {/* Pairs List */}
        <div className="max-h-72 overflow-y-auto divide-y divide-white/5 pr-1 space-y-1">
          {filteredPairs.map((pair) => {
            const isSelected = pair.id === currentPair
            const isPositive = pair.change24h >= 0

            return (
              <div
                key={pair.id}
                onClick={() => {
                  onSelectPair(pair)
                  onClose()
                }}
                className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#B0F127]/15 border border-[#B0F127]/40'
                    : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] border border-white/10 flex items-center justify-center font-black text-xs text-white">
                    {pair.symbol.slice(0, 3)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-white text-xs">
                      <span>{pair.id}</span>
                      {pair.hot && (
                        <span className="px-1 py-0.2 rounded text-[8px] bg-amber-400/20 text-amber-300">HOT</span>
                      )}
                    </div>
                    <span className="text-[10px] text-white/40 block">{pair.name} • Vol: {pair.volume24h}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-white">${pair.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                  <div className={`text-[10px] font-bold flex items-center justify-end gap-0.5 ${
                    isPositive ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                    {isPositive ? '+' : ''}{pair.change24h}%
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
