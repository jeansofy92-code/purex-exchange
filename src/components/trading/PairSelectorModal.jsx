import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ArrowUpRight, ArrowDownRight, Flame } from 'lucide-react'
import CoinLogo from '../CoinLogo'
import RealisticChart from '../RealisticChart'


function PairSelectorModal({ isOpen, onClose, coinsList, activeSymbol, onSelectPair }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all') // 'all' | 'hot' | 'l1' | 'ai' | 'meme'

  if (!isOpen) return null

  const filteredCoins = coinsList.filter((coin) => {
    const matchesSearch =
      coin.symbol.toLowerCase().includes(search.toLowerCase()) ||
      coin.name.toLowerCase().includes(search.toLowerCase())

    if (!matchesSearch) return false

    if (category === 'hot') return coin.isHot || coin.isTrending
    if (category === 'l1') return coin.category?.includes('l1-l2')
    if (category === 'ai') return coin.category?.includes('ai')
    if (category === 'meme') return coin.category?.includes('meme')

    return true
  })

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

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative z-10 w-full max-w-xl max-h-[85vh] flex flex-col rounded-3xl border border-white/15 bg-[#15193b] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.9)] text-xs text-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
            <div>
              <h2 className="text-base font-extrabold text-white">Select Trading Market</h2>
              <p className="text-[0.7rem] text-slate-400">Search across 150+ cryptocurrency spot and futures pairs</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Search Bar */}
          <div className="py-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by coin name or symbol (e.g. BTC, Solana)..."
                className="w-full rounded-xl border border-white/10 bg-[#0e122b] pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:border-[#ff7a00] focus:outline-none"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 pb-3 overflow-x-auto scrollbar-none">
            {[
              { id: 'all', label: 'All Pairs' },
              { id: 'hot', label: '🔥 Hot' },
              { id: 'l1', label: 'Layer 1' },
              { id: 'ai', label: 'AI & Web3' },
              { id: 'meme', label: 'Memes' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`px-3 py-1 rounded-lg text-[0.7rem] font-bold transition-all cursor-pointer ${
                  category === cat.id
                    ? 'bg-[#ff7a00] text-white shadow-[0_0_10px_rgba(255,122,0,0.35)]'
                    : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Pairs List */}
          <div className="flex-1 overflow-y-auto divide-y divide-white/5 pr-1 scrollbar-thin">
            {filteredCoins.map((coin) => {
              const isSelected = coin.symbol === activeSymbol
              return (
                <div
                  key={coin.symbol}
                  onClick={() => {
                    onSelectPair(coin.symbol)
                    onClose()
                  }}
                  className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#ff7a00]/15 border border-[#ff7a00]/40'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CoinLogo symbol={coin.symbol} size={26} />
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-white text-[0.85rem]">
                        <span>{coin.symbol}/USDT</span>
                        {coin.isFeatured && (
                          <span className="text-[0.6rem] bg-[#ff7a00] text-white px-1.5 py-0.2 rounded font-black">
                            PUREX
                          </span>
                        )}
                        {coin.isHot && <Flame size={12} className="text-[#ff7a00] fill-[#ff7a00]" />}
                      </div>
                      <div className="text-[0.68rem] text-slate-400">{coin.name}</div>
                    </div>
                  </div>

                  <div className="w-16 hidden sm:block">
                    <RealisticChart values={coin.trend} positive={coin.positive} height={20} />
                  </div>

                  <div className="text-right">
                    <div className="font-mono font-bold text-white text-[0.85rem]">${coin.price}</div>
                    <div
                      className={`inline-flex items-center gap-0.5 text-[0.68rem] font-bold ${
                        coin.positive ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {coin.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                      {coin.change24h}
                    </div>
                  </div>
                </div>
              )
            })}

            {filteredCoins.length === 0 && (
              <div className="py-8 text-center text-slate-400">No trading pairs match your query.</div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default PairSelectorModal
