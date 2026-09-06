import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle } from 'lucide-react'

import { useTradingEngine } from '../hooks/useTradingEngine'
import UserDashboardHeader from '../components/dashboard/UserDashboardHeader'
import TradingHeader from '../components/trading/TradingHeader'
import TradingChart from '../components/trading/TradingChart'
import OrderBook from '../components/trading/OrderBook'
import OrderForm from '../components/trading/OrderForm'
import TradingBottomTabs from '../components/trading/TradingBottomTabs'
import PairSelectorModal from '../components/trading/PairSelectorModal'

// Dashboard action modals
import StakingModal from '../components/dashboard/StakingModal'
import DepositModal from '../components/dashboard/DepositModal'
import WithdrawModal from '../components/dashboard/WithdrawModal'
import ConvertModal from '../components/dashboard/ConvertModal'
import ReferralModal from '../components/dashboard/ReferralModal'
import TransactionHistoryModal from '../components/dashboard/TransactionHistoryModal'

function Trade() {
  const [searchParams, setSearchParams] = useSearchParams()
  const pairParam = searchParams.get('pair') || 'BTC_USDT'
  const initialSymbol = pairParam.split('_')[0] || 'BTC'

  // Modals state
  const [isPairModalOpen, setIsPairModalOpen] = useState(false)
  const [isStakingModalOpen, setIsStakingModalOpen] = useState(false)
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false)
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false)
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false)
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const [selectedBookPrice, setSelectedBookPrice] = useState(null)
  const [dashboardToast, setDashboardToast] = useState(null)

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

  const triggerToast = (msg, type = 'success') => {
    setDashboardToast({ msg, type })
    setTimeout(() => setDashboardToast(null), 4000)
  }

  return (
    <main className="flex flex-col min-h-screen bg-[#0c0e22] text-white">
      {/* 1. TOP SECTION: User Portfolio Overview, Balance, History, Action Buttons & Active Staking Plans */}
      <UserDashboardHeader
        key={refreshKey}
        balances={balances}
        onOpenDeposit={() => setIsDepositModalOpen(true)}
        onOpenWithdraw={() => setIsWithdrawModalOpen(true)}
        onOpenConvert={() => setIsConvertModalOpen(true)}
        onOpenStaking={() => setIsStakingModalOpen(true)}
        onOpenReferral={() => setIsReferralModalOpen(true)}
        onOpenHistory={() => setIsHistoryModalOpen(true)}
      />

      {/* 2. SECTION DIVIDER / LIVE TRADING TERMINAL HEADER */}
      <div className="bg-[#0b0e26] px-4 py-2 sm:px-6 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Live Market Terminal & Candlestick Analysis
          </h2>
        </div>
        <div className="text-[11px] text-slate-400 font-semibold hidden sm:block">
          Sub-millisecond institutional pricing & execution
        </div>
      </div>

      {/* Top Trading Pair Bar */}
      <TradingHeader
        activeCoin={activeCoin}
        activeSymbol={activeSymbol}
        currentPrice={currentPrice}
        priceFlash={priceFlash}
        tradeMode={tradeMode}
        setTradeMode={setTradeMode}
        balances={balances}
        onOpenPairSelector={() => setIsPairModalOpen(true)}
        onOpenStaking={() => setIsStakingModalOpen(true)}
        onOpenDeposit={() => setIsDepositModalOpen(true)}
        onOpenWithdraw={() => setIsWithdrawModalOpen(true)}
        onOpenConvert={() => setIsConvertModalOpen(true)}
        onOpenReferral={() => setIsReferralModalOpen(true)}
      />

      {/* Main Terminal Grid (Chart & Order Book moved below user balance & active plans) */}
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

      {/* Bottom Panel: Positions, Open Orders, Trade History, Assets, Staking & Referrals */}
      <TradingBottomTabs
        positions={positions}
        openOrders={openOrders}
        tradeHistory={tradeHistory}
        balances={balances}
        onCancelOrder={cancelOrder}
        onClosePosition={closePosition}
        onOpenStaking={() => setIsStakingModalOpen(true)}
        onOpenDeposit={() => setIsDepositModalOpen(true)}
        onOpenWithdraw={() => setIsWithdrawModalOpen(true)}
        onOpenConvert={() => setIsConvertModalOpen(true)}
        onOpenReferral={() => setIsReferralModalOpen(true)}
      />

      {/* Pair Switcher Modal */}
      <PairSelectorModal
        isOpen={isPairModalOpen}
        onClose={() => setIsPairModalOpen(false)}
        coinsList={coinsList}
        activeSymbol={activeSymbol}
        onSelectPair={handleSelectPair}
      />

      {/* 1. Staking & Investment Plans Modal */}
      <StakingModal
        isOpen={isStakingModalOpen}
        onClose={() => setIsStakingModalOpen(false)}
        availableBalance={balances.USDT ?? 10000}
        onStakeSuccess={(inv) => {
          setRefreshKey((k) => k + 1)
          triggerToast(`Staking plan '${inv.planName}' activated! Daily yield will accrue automatically.`, 'success')
        }}
      />

      {/* 2. Deposit Modal */}
      <DepositModal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        onDepositSubmitted={(dep) => {
          triggerToast(`Deposit of $${dep.amount.toLocaleString()} submitted for automated clearance!`, 'success')
        }}
      />

      {/* 3. Withdraw Modal */}
      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        availableBalance={balances.USDT ?? 10000}
        onWithdrawSubmitted={(wth) => {
          triggerToast(`Withdrawal of ${wth.amount} ${wth.asset} submitted! Instant broadcast pending.`, 'success')
        }}
      />

      {/* 4. Convert Modal */}
      <ConvertModal
        isOpen={isConvertModalOpen}
        onClose={() => setIsConvertModalOpen(false)}
        balances={balances}
        onConvertSuccess={(swap) => {
          triggerToast(`Converted ${swap.fromAmount} ${swap.fromCoin} to ${swap.toCoin}!`, 'success')
        }}
      />

      {/* 5. Referral Partner Modal */}
      <ReferralModal
        isOpen={isReferralModalOpen}
        onClose={() => setIsReferralModalOpen(false)}
      />

      {/* 6. Transaction & Settlement History Modal */}
      <TransactionHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        tradeHistory={tradeHistory}
      />

      {/* Action Toast Notifications */}
      <AnimatePresence>
        {(dashboardToast || toastMessage) && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border px-5 py-3.5 shadow-[0_16px_36px_rgba(0,0,0,0.8)] backdrop-blur-xl ${
              (dashboardToast?.type === 'error' || toastMessage?.type === 'error')
                ? 'border-rose-500/40 bg-[#2b1016]/95 text-rose-400'
                : (dashboardToast?.type === 'warning' || toastMessage?.type === 'warning')
                ? 'border-amber-500/40 bg-[#2b2010]/95 text-amber-400'
                : 'border-[#ff7a00]/40 bg-[#221738]/95 text-[#ff7a00]'
            }`}
          >
            {(dashboardToast?.type === 'error' || toastMessage?.type === 'error') ? (
              <AlertCircle size={18} />
            ) : (
              <CheckCircle2 size={18} />
            )}
            <div className="text-xs font-bold tracking-wide text-white">
              {dashboardToast?.msg || toastMessage?.msg}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default Trade
