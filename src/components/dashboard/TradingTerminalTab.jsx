import { useState } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  ChevronDown, 
  Zap, 
  ShieldCheck, 
  Activity, 
  Sliders, 
  RefreshCw, 
  ArrowDownLeft, 
  ArrowUpRight,
  Sparkles,
  Bot
} from 'lucide-react'
import TradingChart from './terminal/TradingChart'
import ArbitrageRadar from './terminal/ArbitrageRadar'
import OrderBook from './terminal/OrderBook'
import OrderDesk from './terminal/OrderDesk'
import AutomatedBotEngine from './terminal/AutomatedBotEngine'
import PositionsLedger from './terminal/PositionsLedger'
import PairSelectorModal, { PAIRS_DATABASE } from './terminal/PairSelectorModal'

export default function TradingTerminalTab({ onOpenDeposit, onOpenWithdraw, onOpenConvert }) {
  const [selectedPairObj, setSelectedPairObj] = useState(PAIRS_DATABASE[0]) // BTC/USDT default
  const [currentLivePrice, setCurrentLivePrice] = useState(96420.50)
  const [pairModalOpen, setPairModalOpen] = useState(false)
  const [activeSubTab, setActiveSubTab] = useState('ALL') // 'ALL' | 'CHART_ONLY' | 'ARBITRAGE_ONLY' | 'BOT_ONLY'

  const selectedPair = selectedPairObj.id
  const isPositive = selectedPairObj.change24h >= 0

  const handlePriceTick = (newPrice) => {
    setCurrentLivePrice(newPrice)
  }

  const handleSelectPair = (pair) => {
    setSelectedPairObj(pair)
    setCurrentLivePrice(pair.price)
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Pair Selector Modal */}
      <PairSelectorModal
        isOpen={pairModalOpen}
        onClose={() => setPairModalOpen(false)}
        onSelectPair={handleSelectPair}
        currentPair={selectedPair}
      />

      {/* Top Real-Time Ticker & Market Stats Bar */}
      <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        {/* Pair Selector Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setPairModalOpen(true)}
            className="flex items-center gap-2.5 px-3 py-2 bg-[#161616] hover:bg-white/10 border border-white/10 rounded-xl transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#B0F127] text-black font-black text-xs flex items-center justify-center">
              {selectedPairObj.symbol.slice(0, 3)}
            </div>
            <div className="text-left font-mono">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black text-white group-hover:text-[#B0F127] transition-colors">
                  {selectedPair}
                </span>
                <ChevronDown size={14} className="text-white/60 group-hover:text-white" />
              </div>
              <span className="text-[10px] text-white/40 block -mt-0.5">{selectedPairObj.name}</span>
            </div>
          </button>

          {/* Current Live Price & Change */}
          <div className="font-mono">
            <div className="text-lg sm:text-xl font-black text-white tracking-tight">
              ${currentLivePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className={`text-xs font-bold flex items-center gap-1 ${
              isPositive ? 'text-emerald-400' : 'text-rose-400'
            }`}>
              {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {isPositive ? '+' : ''}{selectedPairObj.change24h}% (24h)
            </div>
          </div>
        </div>

        {/* 24h Statistics HUD */}
        <div className="flex items-center gap-4 sm:gap-6 font-mono text-xs divide-x divide-white/10 overflow-x-auto py-1">
          <div className="pl-3 sm:pl-4">
            <span className="text-white/40 text-[10px] uppercase block">24h High</span>
            <span className="text-white font-bold">${(currentLivePrice * 1.032).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          </div>

          <div className="pl-3 sm:pl-4">
            <span className="text-white/40 text-[10px] uppercase block">24h Low</span>
            <span className="text-white font-bold">${(currentLivePrice * 0.978).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          </div>

          <div className="pl-3 sm:pl-4">
            <span className="text-white/40 text-[10px] uppercase block">24h Turnover</span>
            <span className="text-[#B0F127] font-bold">{selectedPairObj.volume24h}</span>
          </div>

          <div className="pl-3 sm:pl-4 hidden md:block">
            <span className="text-white/40 text-[10px] uppercase block">Funding / Countdown</span>
            <span className="text-cyan-400 font-bold">+0.0100% / 03:42:15</span>
          </div>
        </div>

        {/* Quick Deposit / Withdraw Trigger */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenDeposit}
            className="px-3.5 py-1.5 bg-[#B0F127] hover:bg-[#9fe01c] text-black font-bold text-xs rounded-xl transition-all shadow flex items-center gap-1"
          >
            <ArrowDownLeft size={14} />
            Deposit
          </button>
          <button
            onClick={onOpenWithdraw}
            className="px-3.5 py-1.5 bg-white/10 hover:bg-white/15 text-white font-bold text-xs rounded-xl border border-white/10 transition-all flex items-center gap-1"
          >
            <ArrowUpRight size={14} className="text-amber-400" />
            Withdraw
          </button>
        </div>
      </div>

      {/* Main Terminal Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left / Center Major Panel: Chart, Radar, Bots & Positions (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          {/* Interactive Candlestick Chart */}
          <TradingChart
            pair={selectedPair}
            currentPrice={currentLivePrice}
            priceChange24h={selectedPairObj.change24h}
            onPriceTick={handlePriceTick}
          />

          {/* Multi-Exchange Arbitrage Radar */}
          <ArbitrageRadar
            currentPrice={currentLivePrice}
            selectedPair={selectedPair}
          />

          {/* Automated AI Bot Engine */}
          <AutomatedBotEngine
            selectedPair={selectedPair}
          />

          {/* Active Positions & Ledger */}
          <PositionsLedger
            currentPrice={currentLivePrice}
            selectedPair={selectedPair}
          />
        </div>

        {/* Right Panel: Order Placement Desk & Live Order Book (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-5 sticky top-24">
          {/* Spot & Arbitrage Order Desk */}
          <OrderDesk
            currentPrice={currentLivePrice}
            selectedPair={selectedPair}
            onOpenDeposit={onOpenDeposit}
          />

          {/* Real-time Order Book & Market Trades */}
          <OrderBook
            currentPrice={currentLivePrice}
            selectedPair={selectedPair}
          />
        </div>
      </div>
    </div>
  )
}
