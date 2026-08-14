import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'

function OrderForm({
  activeSymbol,
  currentPrice,
  tradeMode,
  leverage,
  setLeverage,
  balances,
  onPlaceOrder,
  selectedPrice,
}) {
  const [side, setSide] = useState('Buy') // 'Buy' | 'Sell'
  const [orderType, setOrderType] = useState('Limit') // 'Limit' | 'Market' | 'Stop-Limit'
  const [price, setPrice] = useState(() => currentPrice.toFixed(currentPrice < 1 ? 4 : 2))
  const [amount, setAmount] = useState('')
  const [useTPSL, setUseTPSL] = useState(false)
  const [tpPrice, setTpPrice] = useState('')
  const [slPrice, setSlPrice] = useState('')

  // Sync selected price from orderbook click
  useEffect(() => {
    if (selectedPrice) {
      setPrice(selectedPrice)
    }
  }, [selectedPrice])

  // Sync current price default if in market mode
  useEffect(() => {
    if (orderType === 'Market') {
      setPrice(currentPrice.toFixed(currentPrice < 1 ? 4 : 2))
    }
  }, [currentPrice, orderType])


  const numPrice = parseFloat(price) || currentPrice
  const numAmount = parseFloat(amount) || 0
  const total = (numPrice * numAmount).toFixed(2)

  const availableUSDT = balances.USDT || 0
  const availableCoin = balances[activeSymbol] || 0

  // Calculate percentage of available funds
  const handlePercentage = (pct) => {
    if (side === 'Buy') {
      const maxUSDT = tradeMode === 'futures' ? availableUSDT * leverage : availableUSDT
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
      price: orderType === 'Market' ? currentPrice : numPrice,
      amount: numAmount,
      total: parseFloat(total),
      leverage: tradeMode === 'futures' ? leverage : 1,
    })

    if (success) {
      setAmount('')
    }
  }

  const isBuy = side === 'Buy'
  const buttonColor = isBuy
    ? 'bg-[#58e65b] text-black hover:bg-[#48db50] shadow-[0_0_20px_rgba(88,230,91,0.35)]'
    : 'bg-[#ff6b6b] text-white hover:bg-[#f85252] shadow-[0_0_20px_rgba(255,107,107,0.35)]'

  return (
    <div className="flex flex-col h-full bg-[#060a0b] p-4 text-xs select-none">
      {/* Side Selector (Buy / Long vs Sell / Short) */}
      <div className="grid grid-cols-2 gap-2 mb-4 p-1 rounded-xl bg-[#080e0f] border border-white/10">
        <button
          type="button"
          onClick={() => setSide('Buy')}
          className={`py-2 rounded-lg font-extrabold text-sm transition-all ${
            isBuy
              ? 'bg-[#58e65b] text-black shadow-[0_0_12px_rgba(88,230,91,0.4)]'
              : 'text-[#8d9691] hover:text-white'
          }`}
        >
          {tradeMode === 'futures' ? 'Open Long' : 'Buy ' + activeSymbol}
        </button>
        <button
          type="button"
          onClick={() => setSide('Sell')}
          className={`py-2 rounded-lg font-extrabold text-sm transition-all ${
            !isBuy
              ? 'bg-[#ff6b6b] text-white shadow-[0_0_12px_rgba(255,107,107,0.4)]'
              : 'text-[#8d9691] hover:text-white'
          }`}
        >
          {tradeMode === 'futures' ? 'Open Short' : 'Sell ' + activeSymbol}
        </button>
      </div>

      {/* Order Type Tabs */}
      <div className="flex items-center gap-1.5 mb-4 border-b border-white/10 pb-2">
        {['Limit', 'Market', 'Stop-Limit'].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setOrderType(type)}
            className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
              orderType === type
                ? 'bg-white/15 text-white'
                : 'text-[#8d9691] hover:text-white'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Leverage Slider for Futures */}
      {tradeMode === 'futures' && (
        <div className="mb-4 rounded-xl border border-white/10 bg-[#080e0f] p-3">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-[#8d9691] font-semibold">Leverage</span>
            <span className="font-extrabold text-[#58e65b] bg-[#183a1d] px-2 py-0.5 rounded border border-[#58e65b]/30">
              {leverage}x
            </span>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {[1, 5, 10, 25, 50].map((lev) => (
              <button
                key={lev}
                type="button"
                onClick={() => setLeverage(lev)}
                className={`py-1 rounded text-[0.7rem] font-bold border transition-all ${
                  leverage === lev
                    ? 'bg-[#58e65b] text-black border-[#58e65b]'
                    : 'border-white/10 bg-white/5 text-[#8d9691] hover:text-white'
                }`}
              >
                {lev}x
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Form Inputs */}
      <form onSubmit={handleSubmit} className="space-y-3.5 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Price Input (if not Market) */}
          <div>
            <div className="flex justify-between text-[#8d9691] mb-1 font-semibold">
              <span>Price</span>
              <span>USDT</span>
            </div>
            <div className="relative">
              <input
                type="number"
                step="any"
                disabled={orderType === 'Market'}
                value={orderType === 'Market' ? '' : price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder={orderType === 'Market' ? 'Best Market Price' : '0.00'}
                className="w-full rounded-xl border border-white/10 bg-[#080d0e] px-3.5 py-2.5 text-sm font-mono font-bold text-white placeholder-[#8d9691] focus:border-[#58e65b] focus:outline-none disabled:opacity-60 disabled:bg-white/[0.02]"
              />
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <div className="flex justify-between text-[#8d9691] mb-1 font-semibold">
              <span>Amount</span>
              <span>{activeSymbol}</span>
            </div>
            <div className="relative">
              <input
                type="number"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0000"
                className="w-full rounded-xl border border-white/10 bg-[#080d0e] px-3.5 py-2.5 text-sm font-mono font-bold text-white placeholder-[#8d9691] focus:border-[#58e65b] focus:outline-none"
              />
            </div>
          </div>

          {/* Quick Percentage Buttons */}
          <div className="grid grid-cols-4 gap-1.5">
            {[25, 50, 75, 100].map((pct) => (
              <button
                key={pct}
                type="button"
                onClick={() => handlePercentage(pct)}
                className="rounded-lg border border-white/10 bg-white/[0.03] py-1 text-[0.7rem] font-bold text-[#8d9691] hover:border-[#58e65b]/40 hover:bg-[#183a1d]/40 hover:text-[#58e65b] transition-all"
              >
                {pct}%
              </button>
            ))}
          </div>

          {/* Order Total */}
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 space-y-1.5 text-[0.72rem]">
            <div className="flex justify-between text-[#8d9691]">
              <span>Order Value:</span>
              <span className="font-mono font-bold text-white">${total} USDT</span>
            </div>
            <div className="flex justify-between text-[#8d9691]">
              <span>Available:</span>
              <span className="font-mono font-semibold text-white">
                {isBuy
                  ? `${availableUSDT.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT`
                  : `${availableCoin.toFixed(4)} ${activeSymbol}`}
              </span>
            </div>
            <div className="flex justify-between text-[#8d9691]">
              <span>Est. Fee (0.1%):</span>
              <span className="font-mono text-[#8d9691]">
                ${(parseFloat(total) * 0.001).toFixed(2)} USDT
              </span>
            </div>
          </div>

          {/* TP / SL Toggle */}
          <div className="pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-[#8d9691] hover:text-white">
              <input
                type="checkbox"
                checked={useTPSL}
                onChange={(e) => setUseTPSL(e.target.checked)}
                className="rounded accent-[#58e65b]"
              />
              <span className="font-semibold text-xs">Take Profit / Stop Loss (TP/SL)</span>
            </label>

            {useTPSL && (
              <div className="grid grid-cols-2 gap-2 mt-2">
                <input
                  type="number"
                  value={tpPrice}
                  onChange={(e) => setTpPrice(e.target.value)}
                  placeholder="TP Price"
                  className="rounded-lg border border-white/10 bg-[#080d0e] px-2.5 py-1.5 text-xs text-white placeholder-[#8d9691] focus:border-[#58e65b] focus:outline-none font-mono"
                />
                <input
                  type="number"
                  value={slPrice}
                  onChange={(e) => setSlPrice(e.target.value)}
                  placeholder="SL Price"
                  className="rounded-lg border border-white/10 bg-[#080d0e] px-2.5 py-1.5 text-xs text-white placeholder-[#8d9691] focus:border-[#ff6b6b] focus:outline-none font-mono"
                />
              </div>
            )}
          </div>
        </div>

        {/* Submit Execution Button */}
        <div className="pt-4">
          <button
            type="submit"
            className={`w-full py-3.5 rounded-xl text-sm font-extrabold tracking-wide uppercase flex items-center justify-center gap-2 transition-all hover:scale-[1.01] ${buttonColor}`}
          >
            <span>
              {isBuy
                ? tradeMode === 'futures'
                  ? `Long ${activeSymbol} ${leverage}x`
                  : `Buy ${activeSymbol}`
                : tradeMode === 'futures'
                ? `Short ${activeSymbol} ${leverage}x`
                : `Sell ${activeSymbol}`}
            </span>
            <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </div>
  )
}

export default OrderForm
