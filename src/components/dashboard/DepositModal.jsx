import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ArrowDownLeft,
  Copy,
  Check,
  QrCode,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronDown
} from 'lucide-react'
import CoinLogo from '../CoinLogo'
import { useAuth } from '../../context/AuthContext'

const DEPOSIT_ASSETS = [
  {
    symbol: 'USDT',
    name: 'Tether USD (TRC20)',
    network: 'Tron (TRC20)',
    address: 'TQn9Y28sMKhB81jPzQe1nK98LQvA7P34KL',
    minDeposit: '10 USDT',
    confirmations: '1 Network Confirmation (~1 min)',
  },
  {
    symbol: 'USDT',
    name: 'Tether USD (ERC20)',
    network: 'Ethereum (ERC20)',
    address: '0x71C837f4876b22569e9c3984E34a1795E2B9611B',
    minDeposit: '20 USDT',
    confirmations: '12 Network Confirmations (~3 mins)',
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin (BTC Native)',
    network: 'Bitcoin',
    address: 'bc1q99z1k3x5d7f8m2p4t6w0y8e1r3u5a7c9v0b2d4',
    minDeposit: '0.0005 BTC',
    confirmations: '2 Block Confirmations (~15 mins)',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum (ETH)',
    network: 'Ethereum (ERC20)',
    address: '0x71C837f4876b22569e9c3984E34a1795E2B9611B',
    minDeposit: '0.01 ETH',
    confirmations: '12 Network Confirmations (~3 mins)',
  },
  {
    symbol: 'SOL',
    name: 'Solana (SOL)',
    network: 'Solana Network',
    address: '7xKXtg2CW87d97TXJSDpHd5vBkTXjN8fC9eH1g5K98L2',
    minDeposit: '0.1 SOL',
    confirmations: '1 Confirmation (~10 secs)',
  },
  {
    symbol: 'BNB',
    name: 'BNB (BEP20)',
    network: 'BNB Smart Chain',
    address: '0x71C837f4876b22569e9c3984E34a1795E2B9611B',
    minDeposit: '0.05 BNB',
    confirmations: '15 Network Confirmations (~45 secs)',
  },
]

export default function DepositModal({ isOpen, onClose, onDepositSubmitted }) {
  const { user } = useAuth()
  const [selectedAssetIdx, setSelectedAssetIdx] = useState(0)
  const [copied, setCopied] = useState(false)
  
  // Confirmation form state
  const [showConfirmForm, setShowConfirmForm] = useState(false)
  const [depositAmount, setDepositAmount] = useState('')
  const [txHash, setTxHash] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  if (!isOpen) return null

  const selectedAsset = DEPOSIT_ASSETS[selectedAssetIdx]

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedAsset.address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmitTx = (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    const numAmount = parseFloat(depositAmount)
    if (!numAmount || numAmount <= 0) {
      setErrorMessage('Please enter a valid deposit amount.')
      return
    }

    if (!txHash.trim() || txHash.trim().length < 8) {
      setErrorMessage('Please enter a valid transaction hash or proof ID.')
      return
    }

    setIsSubmitting(true)

    try {
      const storageKey = 'purex_admin_deposits'
      const existingRaw = localStorage.getItem(storageKey)
      const deposits = existingRaw ? JSON.parse(existingRaw) : []

      const newDeposit = {
        id: `dep-${Date.now().toString().slice(-6)}`,
        userId: user?.id || 'usr-active-01',
        userName: user?.fullName || 'Active Trader',
        userEmail: user?.email || 'trader@purex.exchange',
        amount: numAmount,
        coin: `${selectedAsset.symbol} (${selectedAsset.network})`,
        txHash: txHash.trim(),
        walletAddress: selectedAsset.address,
        status: 'pending_approval',
        createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
      }

      deposits.unshift(newDeposit)
      localStorage.setItem(storageKey, JSON.stringify(deposits))

      setSuccessMessage(`Deposit proof of $${numAmount.toLocaleString()} submitted! Our automated verification engine is clearing your funds.`)
      if (onDepositSubmitted) {
        onDepositSubmitted(newDeposit)
      }

      setTimeout(() => {
        setIsSubmitting(false)
        onClose()
      }, 1600)
    } catch {
      setIsSubmitting(false)
      setErrorMessage('Failed to register deposit receipt. Please try again.')
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg rounded-3xl border border-white/15 bg-[#141838] p-5 sm:p-7 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden text-white my-auto flex flex-col"
        >
          {/* Top orange ambient light */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-24 bg-[#ff7a00]/15 blur-3xl pointer-events-none" />

          {/* Modal Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff7a00] to-amber-500 shadow-[0_0_15px_rgba(255,122,0,0.4)]">
                <ArrowDownLeft size={18} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight text-white">
                  Deposit Crypto Assets
                </h2>
                <p className="text-[11px] text-slate-400">
                  Instant on-chain credit with zero deposit fees
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

          {/* Feedback messages */}
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

          {/* Asset Picker */}
          <div className="mt-4 space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Select Deposit Asset & Network
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {DEPOSIT_ASSETS.map((asset, idx) => {
                  const isSelected = selectedAssetIdx === idx
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedAssetIdx(idx)
                        setCopied(false)
                      }}
                      className={`flex items-center gap-2 rounded-xl border p-2 text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#ff7a00] bg-[#222858] shadow-[0_0_15px_rgba(255,122,0,0.3)]'
                          : 'border-white/10 bg-[#0f1228] hover:border-white/20'
                      }`}
                    >
                      <CoinLogo symbol={asset.symbol} size={20} />
                      <div className="overflow-hidden">
                        <div className="text-xs font-bold text-white leading-tight">{asset.symbol}</div>
                        <div className="text-[9px] text-slate-400 truncate">{asset.network.split(' ')[0]}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Deposit Address Box with QR Code */}
            <div className="rounded-2xl border border-white/15 bg-[#0f1228] p-4 text-center space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">{selectedAsset.name}</span>
                <span className="text-[10px] font-mono text-[#ff7a00] bg-[#ff7a00]/15 px-2 py-0.5 rounded-full border border-[#ff7a00]/30">
                  {selectedAsset.network}
                </span>
              </div>

              {/* QR Mockup Canvas */}
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-2xl border border-[#ff7a00]/40 bg-white p-2 shadow-[0_0_20px_rgba(255,122,0,0.2)]">
                <QrCode size={84} className="text-slate-950" />
              </div>

              {/* Address Strip */}
              <div>
                <div className="text-[10px] text-slate-400 mb-1">Your Official Dedicated Deposit Address:</div>
                <div className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-[#15193b] p-2 font-mono text-xs text-slate-200">
                  <span className="truncate max-w-[280px] sm:max-w-[340px] select-all font-bold text-white">
                    {selectedAsset.address}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-1 rounded-lg bg-[#ff7a00] px-2.5 py-1 text-[10px] font-bold text-white shadow hover:brightness-110 cursor-pointer shrink-0"
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Asset Deposit Constraints */}
              <div className="grid grid-cols-2 gap-2 text-left border-t border-white/10 pt-2 text-[10px] text-slate-400">
                <div>
                  <span>Min Deposit:</span> <strong className="text-white">{selectedAsset.minDeposit}</strong>
                </div>
                <div>
                  <span>Network:</span> <strong className="text-white">{selectedAsset.network}</strong>
                </div>
              </div>
            </div>

            {/* Toggle / Submit TXID section */}
            {!showConfirmForm ? (
              <button
                type="button"
                onClick={() => setShowConfirmForm(true)}
                className="w-full rounded-xl border border-[#ff7a00]/40 bg-[#ff7a00]/10 py-2 text-xs font-bold text-[#ff7a00] hover:bg-[#ff7a00]/20 transition-colors cursor-pointer"
              >
                Already Sent? Submit Transaction Hash (TXID)
              </button>
            ) : (
              <form onSubmit={handleSubmitTx} className="rounded-2xl border border-[#ff7a00]/30 bg-[#0f1228] p-3.5 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span>Confirm Deposit Transaction</span>
                  <button
                    type="button"
                    onClick={() => setShowConfirmForm(false)}
                    className="text-[10px] text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Amount Deposited (USD Value)</label>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="e.g. 1000"
                    required
                    className="w-full rounded-lg border border-white/15 bg-[#15193b] px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-[#ff7a00] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Transaction Hash / TXID</label>
                  <input
                    type="text"
                    value={txHash}
                    onChange={(e) => setTxHash(e.target.value)}
                    placeholder="e.g. 0x8f93e18a4c..."
                    required
                    className="w-full rounded-lg border border-white/15 bg-[#15193b] px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-[#ff7a00] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-gradient-to-r from-[#ff7a00] to-[#ff9500] py-2 text-xs font-bold text-white uppercase tracking-wider shadow hover:brightness-110 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Confirming Deposit...' : 'Submit Deposit for Verification'}
                </button>
              </form>
            )}
          </div>

          {/* Security Note */}
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2 text-[10px] text-slate-400">
            <ShieldCheck size={14} className="text-[#ff7a00] shrink-0" />
            <span>Send only {selectedAsset.symbol} on {selectedAsset.network} to this address. Credits automatically within minutes.</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
