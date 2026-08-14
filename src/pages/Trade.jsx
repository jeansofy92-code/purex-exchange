import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle } from 'lucide-react'

import { useTradingEngine } from '../hooks/useTradingEngine'
import TradingHeader from '../components/trading/TradingHeader'
import TradingChart from '../components/trading/TradingChart'
import OrderBook from '../components/trading/OrderBook'
import OrderForm from '../components/trading/OrderForm'
import TradingBottomTabs from '../components/trading/TradingBottomTabs'
import PairSelectorModal from '../components/trading/PairSelectorModal'

function Trade() {
  const [searchParams, setSearchParams] = useSearchParams()
  const pairParam = searchParams.get('pair') || 'BTC_USDT'
  const initialSymbol = pairParam.split('_')[0] || 'BTC'

  const [isPairModalOpen, setIsPairModalOpen] = useState(false)
  const [selectedBookPrice, setSelectedBookPrice] = useState(null)

  const {
    activeSymbol,
    setActiveSymbol,
    activeCoin,
    currentPrice,
    priceFlash,
    timeframe,
    setTimeframe,
    chartMode,
    setChartMode,
    tradeMode,
    setTradeMode,
    leverage,
    setLeverage,
    candles,
    orderBook,
    recentTrades,
    balances,
    openOrders,
    positions,
    tradeHistory,
    placeOrder,
    cancelOrder,
    closePosition,
    addDemoFunds,
    toastMessage,
    coinsList,
  } = useTradingEngine(initialSymbol)

  // Sync pair from URL search param if changed
  useEffect(() => {
    if (pairParam) {
      const sym = pairParam.split('_')[0]
      if (sym && sym !== activeSymbol) {
        setActiveSymbol(sym)
      }
    }
  }, [pairParam, activeSymbol, setActiveSymbol])

  const handleSelectPair = (sym) => {
    setActiveSymbol(sym)
    setSearchParams({ pair: `${sym}_USDT` })
  }

  return (
    <main className="flex flex-col min-h-screen bg-[#050708] text-white">
      {/* Top Trading Header Bar */}
      <TradingHeader
        activeCoin={activeCoin}
        activeSymbol={activeSymbol}
        currentPrice={currentPrice}
        priceFlash={priceFlash}
        tradeMode={tradeMode}
        setTradeMode={setTradeMode}
        balances={balances}
        onAddDemoFunds={addDemoFunds}
        onOpenPairSelector={() => setIsPairModalOpen(true)}
      />

      {/* Main Terminal Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_300px_320px] xl:grid-cols-[1fr_320px_340px]">
        {/* Column 1: Main Candlestick Chart Area */}
        <div className="flex flex-col min-h-[460px] lg:min-h-[580px]">
          <TradingChart
            candles={candles}
            currentPrice={currentPrice}
            activeSymbol={activeSymbol}
            timeframe={timeframe}
            setTimeframe={setTimeframe}
            chartMode={chartMode}
            setChartMode={setChartMode}
          />
        </div>

        {/* Column 2: Live Order Book & Recent Trades Stream */}
        <div className="min-h-[380px] lg:min-h-[580px]">
          <OrderBook
            orderBook={orderBook}
            recentTrades={recentTrades}
            currentPrice={currentPrice}
            priceFlash={priceFlash}
            activeSymbol={activeSymbol}
            onSelectPrice={(p) => setSelectedBookPrice(p)}
          />
        </div>

        {/* Column 3: Order Entry Form */}
        <div className="min-h-[420px] lg:min-h-[580px] border-b border-white/10 lg:border-b-0">
          <OrderForm
            activeSymbol={activeSymbol}
            currentPrice={currentPrice}
            tradeMode={tradeMode}
            leverage={leverage}
            setLeverage={setLeverage}
            balances={balances}
            onPlaceOrder={placeOrder}
            selectedPrice={selectedBookPrice}
          />
        </div>
      </div>

      {/* Bottom Panel: Positions, Open Orders, Trade History & Wallet Balances */}
      <TradingBottomTabs
        positions={positions}
        openOrders={openOrders}
        tradeHistory={tradeHistory}
        balances={balances}
        onCancelOrder={cancelOrder}
        onClosePosition={closePosition}
      />

      {/* Pair Switcher Modal */}
      <PairSelectorModal
        isOpen={isPairModalOpen}
        onClose={() => setIsPairModalOpen(false)}
        coinsList={coinsList}
        activeSymbol={activeSymbol}
        onSelectPair={handleSelectPair}
      />

      {/* Real-time Order Action Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border px-5 py-3.5 shadow-[0_16px_36px_rgba(0,0,0,0.8)] backdrop-blur-xl ${
              toastMessage.type === 'error'
                ? 'border-[#ff6b6b]/40 bg-[#250d0d]/95 text-[#ff6b6b]'
                : toastMessage.type === 'warning'
                ? 'border-yellow-500/40 bg-[#251f0d]/95 text-yellow-400'
                : 'border-[#58e65b]/40 bg-[#0d2512]/95 text-[#58e65b]'
            }`}
          >
            {toastMessage.type === 'error' ? (
              <AlertCircle size={18} />
            ) : (
              <CheckCircle2 size={18} />
            )}
            <div className="text-xs font-bold tracking-wide text-white">
              {toastMessage.msg}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default Trade
