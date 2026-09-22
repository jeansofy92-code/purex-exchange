import { useState } from 'react'
import { 
  ArrowDownLeft, 
  ArrowUpRight, 
  Percent, 
  Zap, 
  ShieldCheck, 
  Info, 
  CheckCircle2, 
  Sliders,
  DollarSign,
  Lock
} from 'lucide-react'
import { useAuth } from '../../../context/AuthContext'

export default function OrderDesk({ 
  currentPrice = 96420.50, 
  selectedPair = 'BTC/USDT',
  onOpenDeposit
}) {
  const { user, executeTrade } = useAuth()
  const [side, setSide] = useState('buy') // 'buy' | 'sell'
  const [orderType, setOrderType] = useState('market') // 'market' | 'limit' | 'arbitrage'
  const [limitPrice, setLimitPrice] = useState(currentPrice.toFixed(2))
  const [amount, setAmount] = useState('')
  const [leverage, setLeverage] = useState(1) // 1x, 5x, 10x, 20x
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState(null)

  const availableBalance = user?.availableBalance || 0
  const assetName = selectedPair.split('/')[0] || 'BTC'
  const quoteAsset = selectedPair.split('/')[1] || 'USDT'

  const effectivePrice = orderType === 'limit' ? (Number(limitPrice) || currentPrice) : currentPrice
  const totalUsdt = (Number(amount) || 0) * effectivePrice
  const estFee = totalUsdt * 0.00075 // 0.075% maker/taker fee

  const handlePercentageSelect = (pct) => {
    if (availableBalance <= 0) return
    const targetUsdt = (availableBalance * (pct / 100)) * leverage
    const calcUnits = targetUsdt / effectivePrice
    setAmount(calcUnits > 0 ? calcUnits.toFixed(4) : '')
  }

  const handleSubmitOrder = async (e) => {
    e.preventDefault()
    if (!amount || Number(amount) <= 0) {
      setFeedback({ type: 'error', text: 'Please enter a valid order amount.' })
      return
    }

    if (totalUsdt > availableBalance * leverage && side === 'buy') {
      setFeedback({ 
        type: 'error', 
        text: `Insufficient balance ($${availableBalance.toLocaleString()}). Please deposit funds or adjust allocation.` 
      })
      return
    }

    setIsSubmitting(true)
    setFeedback(null)

    setTimeout(() => {
      const res = executeTrade({
        pair: selectedPair,
        side: `${side.toUpperCase()} (${orderType.toUpperCase()})`,
        amount: Number(amount),
        price: effectivePrice,
        type: orderType.toUpperCase(),
        profit: orderType === 'arbitrage' ? totalUsdt * 0.014 : 0,
        status: 'Completed'
      })

      setIsSubmitting(false)
      if (res.success) {
        setFeedback({
          type: 'success',
          text: `Order filled: ${side.toUpperCase()} ${amount} ${assetName} @ $${effectivePrice.toLocaleString()}`
        })
        setAmount('')
      } else {
        setFeedback({
          type: 'error',
          text: res.error || 'Failed to submit order'
        })
      }
    }, 500)
  }

  return (
    <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-5 flex flex-col gap-4">
      {/* Top Tabs: Order Desk Type */}
      <div className="flex items-center justify-between">
        <div className="flex items-center bg-[#141414] p-1 rounded-xl border border-white/10 w-full">
          <button
            onClick={() => setSide('buy')}
            className={`flex-1 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 ${
              side === 'buy'
                ? 'bg-emerald-500 text-black shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <ArrowDownLeft size={14} />
            Buy / Long
          </button>
          <button
            onClick={() => setSide('sell')}
            className={`flex-1 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 ${
              side === 'sell'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <ArrowUpRight size={14} />
            Sell / Short
          </button>
        </div>
      </div>

      {/* Order Type Buttons & Leverage */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 bg-[#121212] p-0.5 rounded-lg border border-white/10 text-[11px] font-mono">
          <button
            onClick={() => setOrderType('market')}
            className={`px-2.5 py-1 rounded transition-all ${
              orderType === 'market' ? 'bg-[#B0F127] text-black font-bold' : 'text-white/60 hover:text-white'
            }`}
          >
            Market
          </button>
          <button
            onClick={() => setOrderType('limit')}
            className={`px-2.5 py-1 rounded transition-all ${
              orderType === 'limit' ? 'bg-[#B0F127] text-black font-bold' : 'text-white/60 hover:text-white'
            }`}
          >
            Limit
          </button>
          <button
            onClick={() => setOrderType('arbitrage')}
            className={`px-2.5 py-1 rounded transition-all flex items-center gap-1 ${
              orderType === 'arbitrage' ? 'bg-amber-400 text-black font-bold' : 'text-white/60 hover:text-white'
            }`}
          >
            <Zap size={10} />
            Arb Bot
          </button>
        </div>

        {/* Leverage selector */}
        <div className="flex items-center gap-1">
          {[1, 5, 10, 20].map((lev) => (
            <button
              key={lev}
              onClick={() => setLeverage(lev)}
              className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded border transition-all ${
                leverage === lev
                  ? 'bg-white/20 text-white border-white/40'
                  : 'text-white/40 border-white/5 hover:text-white'
              }`}
            >
              {lev}x
            </button>
          ))}
        </div>
      </div>

      {/* Available Balance Indicator */}
      <div className="flex items-center justify-between text-xs font-mono bg-[#141414] p-3 rounded-xl border border-white/5">
        <div>
          <span className="text-white/40 block text-[10px]">Available Margin</span>
          <span className="text-white font-bold">${availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        </div>
        <button
          onClick={onOpenDeposit}
          className="text-[11px] font-bold text-[#B0F127] hover:underline"
        >
          + Deposit
        </button>
      </div>

      {/* Inputs Form */}
      <form onSubmit={handleSubmitOrder} className="space-y-3 font-mono">
        {/* Limit Price Input if limit order */}
        {orderType === 'limit' && (
          <div>
            <label className="text-[10px] text-white/50 block mb-1 uppercase">Price ({quoteAsset})</label>
            <div className="relative">
              <input
                type="number"
                step="any"
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                className="w-full bg-[#141414] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#B0F127]"
              />
              <span className="absolute right-3.5 top-2.5 text-xs text-white/40">{quoteAsset}</span>
            </div>
          </div>
        )}

        {/* Amount Input */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-[10px] text-white/50 uppercase">Order Size ({assetName})</label>
            {totalUsdt > 0 && (
              <span className="text-[10px] text-[#B0F127]">≈ ${totalUsdt.toLocaleString(undefined, { minimumFractionDigits: 2 })} {quoteAsset}</span>
            )}
          </div>
          <div className="relative">
            <input
              type="number"
              step="any"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#141414] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#B0F127]"
            />
            <span className="absolute right-3.5 top-2.5 text-xs text-white/40">{assetName}</span>
          </div>
        </div>

        {/* Percentage Selector Buttons */}
        <div className="grid grid-cols-4 gap-1.5 pt-1">
          {[25, 50, 75, 100].map((pct) => (
            <button
              key={pct}
              type="button"
              onClick={() => handlePercentageSelect(pct)}
              className="py-1 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-lg text-[10px] font-bold border border-white/5 transition-all"
            >
              {pct}%
            </button>
          ))}
        </div>

        {/* Trade Summary breakdown */}
        <div className="space-y-1.5 pt-2 border-t border-white/5 text-[11px] text-white/60">
          <div className="flex justify-between">
            <span>Trading Fee (0.075%)</span>
            <span className="text-white">${estFee.toFixed(3)}</span>
          </div>
          <div className="flex justify-between">
            <span>Leverage Multiplier</span>
            <span className="text-[#B0F127] font-bold">{leverage}x PureX Engine</span>
          </div>
          <div className="flex justify-between font-bold text-white pt-1 border-t border-white/5">
            <span>Order Total</span>
            <span className="text-[#B0F127]">${totalUsdt.toFixed(2)} USDT</span>
          </div>
        </div>

        {/* Submit Execution Action Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 ${
            side === 'buy'
              ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/20'
              : 'bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/20'
          } disabled:opacity-50`}
        >
          {isSubmitting ? (
            'Transacting...'
          ) : (
            <>
              {side === 'buy' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
              {side === 'buy' ? 'Execute Buy' : 'Execute Sell'} {assetName}
            </>
          )}
        </button>
      </form>

      {/* Notification status */}
      {feedback && (
        <div className={`p-2.5 rounded-xl border text-[11px] font-mono ${
          feedback.type === 'success'
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
            : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
        }`}>
          {feedback.text}
        </div>
      )}
    </div>
  )
}
