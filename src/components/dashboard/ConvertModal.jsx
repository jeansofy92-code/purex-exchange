import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ArrowUpDown,
  Repeat,
  Zap,
  CheckCircle2,
  AlertCircle,
  ShieldCheck
} from 'lucide-react'
import CoinLogo from '../CoinLogo'

const CONVERT_RATES = {
  USDT: 1.0,
  BTC: 96850.0,
  ETH: 3480.0,
  SOL: 198.5,
  BNB: 645.0,
  XRP: 2.45
}

export default function ConvertModal({ isOpen, onClose, onConvertSuccess, balances = {} }) {
  const [fromCoin, setFromCoin] = useState('USDT')
  const [toCoin, setToCoin] = useState('BTC')
  const [fromAmount, setFromAmount] = useState('1000')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  if (!isOpen) return null

  const fromRate = CONVERT_RATES[fromCoin] || 1
  const toRate = CONVERT_RATES[toCoin] || 1

  const parsedFromAmount = parseFloat(fromAmount) || 0
  const usdValue = parsedFromAmount * fromRate
  const computedToAmount = usdValue / toRate

  const exchangeRate = fromRate / toRate
  const availableBal = balances[fromCoin] ?? (fromCoin === 'USDT' ? 10000 : 0.5)

  const handleSwapPairs = () => {
    const temp = fromCoin
    setFromCoin(toCoin)
    setToCoin(temp)
    setErrorMessage('')
    setSuccessMessage('')
  }

  const handleSetPercent = (pct) => {
    const amt = (availableBal * (pct / 100)).toFixed(fromCoin === 'USDT' ? 2 : 6)
    setFromAmount(amt)
  }

  const handleConvert = (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (!parsedFromAmount || parsedFromAmount <= 0) {
      setErrorMessage('Please enter a valid amount to convert.')
      return
    }

    if (parsedFromAmount > availableBal) {
      setErrorMessage(`Insufficient ${fromCoin} balance (${availableBal.toLocaleString()} available).`)
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      const msg = `Successfully swapped ${parsedFromAmount.toLocaleString()} ${fromCoin} for ${computedToAmount.toFixed(toCoin === 'USDT' ? 2 : 6)} ${toCoin} at 0% fees!`
      setSuccessMessage(msg)
      if (onConvertSuccess) {
        onConvertSuccess({
          fromCoin,
          toCoin,
          fromAmount: parsedFromAmount,
          toAmount: computedToAmount,
        })
      }
      setTimeout(() => {
        onClose()
      }, 1500)
    }, 800)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md rounded-3xl border border-white/15 bg-[#141838] p-5 sm:p-7 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden text-white my-auto flex flex-col"
        >
          {/* Top orange glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-24 bg-[#ff7a00]/15 blur-3xl pointer-events-none" />

          {/* Modal Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff7a00] to-amber-500 shadow-[0_0_15px_rgba(255,122,0,0.4)]">
                <Repeat size={18} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight text-white">
                  Instant Crypto Swap & Convert
                </h2>
                <p className="text-[11px] text-slate-400">
                  Zero slippage execution with 0% platform fees
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Feedback */}
          {errorMessage && (
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-2.5 text-xs text-rose-400">
              <AlertCircle size={14} className="shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
          {successMessage && (
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2.5 text-xs text-emerald-400">
              <CheckCircle2 size={14} className="shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Convert Form */}
          <form onSubmit={handleConvert} className="mt-4 space-y-3">
            {/* "From" Box */}
            <div className="rounded-2xl border border-white/15 bg-[#0f1228] p-3.5 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>From</span>
                <span>Avail: <strong className="text-white">{availableBal.toLocaleString()} {fromCoin}</strong></span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  placeholder="0.00"
                  step="any"
                  className="w-full bg-transparent font-mono text-xl font-bold text-white focus:outline-none"
                />

                <select
                  value={fromCoin}
                  onChange={(e) => setFromCoin(e.target.value)}
                  className="rounded-xl border border-white/15 bg-[#171b3c] px-3 py-1.5 text-xs font-bold text-white focus:outline-none cursor-pointer"
                >
                  {Object.keys(CONVERT_RATES).map((coin) => (
                    <option key={coin} value={coin} className="bg-[#171b3c] text-white">
                      {coin}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quick % buttons */}
              <div className="flex gap-1.5 pt-1">
                {[25, 50, 75, 100].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => handleSetPercent(pct)}
                    className="flex-1 rounded-lg border border-white/10 bg-white/5 py-1 text-[10px] font-bold text-slate-300 hover:bg-[#ff7a00] hover:text-white hover:border-[#ff7a00] transition-colors"
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>

            {/* Swap Direction Button */}
            <div className="flex justify-center -my-1">
              <button
                type="button"
                onClick={handleSwapPairs}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-[#171b3c] text-[#ff7a00] shadow-[0_0_12px_rgba(0,0,0,0.5)] hover:scale-110 hover:border-[#ff7a00] transition-all cursor-pointer z-10"
              >
                <ArrowUpDown size={14} />
              </button>
            </div>

            {/* "To" Box */}
            <div className="rounded-2xl border border-white/15 bg-[#0f1228] p-3.5 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>To (Estimated Output)</span>
                <span className="text-emerald-400 font-bold">0% Slippage</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-full font-mono text-xl font-bold text-emerald-400">
                  {computedToAmount > 0 ? computedToAmount.toFixed(toCoin === 'USDT' ? 2 : 6) : '0.00'}
                </div>

                <select
                  value={toCoin}
                  onChange={(e) => setToCoin(e.target.value)}
                  className="rounded-xl border border-white/15 bg-[#171b3c] px-3 py-1.5 text-xs font-bold text-white focus:outline-none cursor-pointer"
                >
                  {Object.keys(CONVERT_RATES).map((coin) => (
                    <option key={coin} value={coin} className="bg-[#171b3c] text-white">
                      {coin}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Rate Strip */}
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0f1228] p-2.5 text-[11px] text-slate-300">
              <span className="text-slate-400">Execution Rate:</span>
              <span className="font-mono font-bold text-white">
                1 {fromCoin} ≈ {exchangeRate.toFixed(toCoin === 'USDT' ? 2 : 6)} {toCoin}
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || parsedFromAmount <= 0}
              className="w-full rounded-xl bg-gradient-to-r from-[#ff7a00] to-[#ff9500] py-2.5 text-xs font-black text-white uppercase tracking-wider shadow-[0_0_20px_rgba(255,122,0,0.4)] hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? 'Converting...' : `Convert ${fromCoin} to ${toCoin}`}
            </button>
          </form>

          {/* Guarantee */}
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2 text-[10px] text-slate-400">
            <Zap size={14} className="text-[#ff7a00] shrink-0" />
            <span>Instant orderbook execution directly matched with institutional liquidity providers.</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
