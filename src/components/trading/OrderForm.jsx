import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'

function OrderForm({
  activeSymbol = 'BTC',
  currentPrice = 96000,
  tradeMode = 'spot',
  leverage = 10,
  setLeverage = () => {},
  balances = { USDT: 10000 },
  onPlaceOrder = () => {},
  selectedPrice,
}) {
  const [side, setSide] = useState('Buy') // 'Buy' | 'Sell'
  const [orderType, setOrderType] = useState('Limit') // 'Limit' | 'Market' | 'Stop-Limit'
  
  const numCurrentPrice = typeof currentPrice === 'number' ? currentPrice : parseFloat(currentPrice) || 0
  const [price, setPrice] = useState(() => numCurrentPrice.toFixed(numCurrentPrice < 1 ? 4 : 2))
  const [amount, setAmount] = useState('')
  const [useTPSL, setUseTPSL] = useState(false)
  const [tpPrice, setTpPrice] = useState('')
  const [slPrice, setSlPrice] = useState('')

  // Sync selected price from orderbook click
  useEffect(() => {
    if (selectedPrice !== null && selectedPrice !== undefined) {
      setPrice(typeof selectedPrice === 'number' ? selectedPrice.toFixed(selectedPrice < 1 ? 4 : 2) : selectedPrice.toString())
    }
  }, [selectedPrice])

  // Sync current price default if in market mode
  useEffect(() => {
    if (orderType === 'Market') {
      setPrice(numCurrentPrice.toFixed(numCurrentPrice < 1 ? 4 : 2))
    }
  }, [numCurrentPrice, orderType])

  const numPrice = parseFloat(price) || numCurrentPrice || 1
  const numAmount = parseFloat(amount) || 0
  const total = (numPrice * numAmount).toFixed(2)

  const availableUSDT = balances?.USDT || 0
  const availableCoin = balances?.[activeSymbol] || 0

  // Calculate percentage of available funds
  const handlePercentage = (pct) => {
    if (side === 'Buy') {
      const maxUSDT = tradeMode === 'futures' ? availableUSDT * (leverage || 1) : availableUSDT
      const targetUSDT = maxUSDT * (pct / 100)
      const calculatedAmount = targetUSDT / numPrice
      setAmount(calculatedAmount.toFixed(4))
    } else {
      const targetCoin = availableCoin * (pct / 100)
      setAmount(targetCoin.toFixed(4))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const success = onPlaceOrder({
      orderType,
      side,
      price: orderType === 'Market' ? numCurrentPrice : numPrice,
      amount: numAmount,
      tpPrice: useTPSL ? parseFloat(tpPrice) : null,
      slPrice: useTPSL ? parseFloat(slPrice) : null,
    })

    if (success) {
      setAmount('')
      setTpPrice('')
      setSlPrice('')
    }
  }

  return (
    <div className="flex flex-col h-full bg-[#0e122b] select-none text-xs p-3.5 space-y-3.5">
      {/* Side Selector (Buy / Sell Buttons) */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setSide('Buy')}
          className={`py-2 rounded-xl font-bold uppercase tracking-wider transition-all cursor-pointer ${
            side === 'Buy'
              ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]'
              : 'bg-white/5 text-slate-400 hover:text-white'
          }`}
        >
          Buy / Long
        </button>
        <button
          type="button"
          onClick={() => setSide('Sell')}
          className={`py-2 rounded-xl font-bold uppercase tracking-wider transition-all cursor-pointer ${
            side === 'Sell'
              ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]'
              : 'bg-white/5 text-slate-400 hover:text-white'
          }`}
        >
          Sell / Short
        </button>
      </div>

      {/* Order Type Tabs */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[0.72rem] font-bold text-slate-400">
        <div className="flex gap-4">
          {['Limit', 'Market', 'Stop-Limit'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setOrderType(t)}
              className={`transition-colors cursor-pointer ${
                orderType === t ? 'text-[#ff7a00]' : 'hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tradeMode === 'futures' && (
          <div className="flex items-center gap-1">
            <span className="text-slate-400">Lev:</span>
            <select
              value={leverage}
              onChange={(e) => setLeverage(Number(e.target.value))}
              className="bg-[#181d45] border border-white/10 rounded px-1 py-0.5 text-white font-mono font-bold"
            >
              {[2, 5, 10, 20, 50].map((l) => (
                <option key={l} value={l}>
                  {l}x
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Price Input (hidden or disabled if Market) */}
        {orderType !== 'Market' && (
          <div>
            <div className="flex justify-between text-[0.68rem] text-slate-400 mb-1">
              <span>Order Price</span>
              <span>USDT</span>
            </div>
            <div className="relative">
              <input
                type="number"
                step="any"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full rounded-xl border border-white/15 bg-[#141838] px-3.5 py-2 text-white font-mono text-xs font-bold focus:border-[#ff7a00] focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Amount Input */}
        <div>
          <div className="flex justify-between text-[0.68rem] text-slate-400 mb-1">
            <span>Amount</span>
            <span>{activeSymbol}</span>
          </div>
          <div className="relative">
            <input
              type="number"
              step="any"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              required
              className="w-full rounded-xl border border-white/15 bg-[#141838] px-3.5 py-2 text-white font-mono text-xs font-bold focus:border-[#ff7a00] focus:outline-none"
            />
          </div>
        </div>

        {/* Percentage Quick Slider/Pills */}
        <div className="grid grid-cols-4 gap-1.5 pt-0.5">
          {[25, 50, 75, 100].map((pct) => (
            <button
              key={pct}
              type="button"
              onClick={() => handlePercentage(pct)}
              className="rounded-lg border border-white/10 bg-white/5 py-1 text-[0.65rem] font-bold text-slate-300 hover:bg-[#ff7a00] hover:text-white hover:border-[#ff7a00] transition-colors"
            >
              {pct}%
            </button>
          ))}
        </div>

        {/* TP / SL Accordion Toggle */}
        {tradeMode === 'futures' && (
          <div className="pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-[0.72rem] text-slate-400 hover:text-white">
              <input
                type="checkbox"
                checked={useTPSL}
                onChange={(e) => setUseTPSL(e.target.checked)}
                className="rounded border-white/20 bg-black text-[#ff7a00] accent-[#ff7a00]"
              />
              <span>Take Profit / Stop Loss (TP/SL)</span>
            </label>

            {useTPSL && (
              <div className="grid grid-cols-2 gap-2 mt-2">
                <input
                  type="number"
                  step="any"
                  placeholder="TP Price"
                  value={tpPrice}
                  onChange={(e) => setTpPrice(e.target.value)}
                  className="rounded-lg border border-emerald-500/30 bg-[#121635] px-2.5 py-1.5 text-xs text-white font-mono"
                />
                <input
                  type="number"
                  step="any"
                  placeholder="SL Price"
                  value={slPrice}
                  onChange={(e) => setSlPrice(e.target.value)}
                  className="rounded-lg border border-rose-500/30 bg-[#121635] px-2.5 py-1.5 text-xs text-white font-mono"
                />
              </div>
            )}
          </div>
        )}

        {/* Order Summary Strip */}
        <div className="rounded-xl border border-white/10 bg-[#141838] p-2.5 space-y-1 text-[0.68rem] font-medium text-slate-400">
          <div className="flex justify-between">
            <span>Available:</span>
            <span className="font-mono text-white">
              {side === 'Buy'
                ? `$${availableUSDT.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT`
                : `${availableCoin} ${activeSymbol}`}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Order Value:</span>
            <span className="font-mono text-white font-bold">${total} USDT</span>
          </div>
          {tradeMode === 'futures' && (
            <div className="flex justify-between">
              <span>Required Margin:</span>
              <span className="font-mono text-amber-400">
                ${(parseFloat(total) / (leverage || 1)).toFixed(2)} USDT
              </span>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={numAmount <= 0}
          className={`w-full py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
            side === 'Buy'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:brightness-110'
              : 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)] hover:brightness-110'
          }`}
        >
          <span>
            {side} {activeSymbol}
          </span>
          <ArrowRight size={13} />
        </button>
      </form>
    </div>
  )
}

export default OrderForm
