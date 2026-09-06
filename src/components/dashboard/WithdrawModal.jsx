import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ArrowUpRight,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Wallet,
  Lock
} from 'lucide-react'
import CoinLogo from '../CoinLogo'
import { useAuth } from '../../context/AuthContext'

const WITHDRAW_ASSETS = [
  { symbol: 'USDT', name: 'Tether USD', network: 'Tron (TRC20)', fee: 1.0, minWithdraw: 20 },
  { symbol: 'USDT', name: 'Tether USD', network: 'Ethereum (ERC20)', fee: 8.0, minWithdraw: 50 },
  { symbol: 'BTC', name: 'Bitcoin', network: 'Bitcoin Native', fee: 0.0002, minWithdraw: 0.001 },
  { symbol: 'ETH', name: 'Ethereum', network: 'Ethereum (ERC20)', fee: 0.002, minWithdraw: 0.01 },
  { symbol: 'SOL', name: 'Solana', network: 'Solana Network', fee: 0.01, minWithdraw: 0.1 },
]

export default function WithdrawModal({ isOpen, onClose, onWithdrawSubmitted, availableBalance = 10000 }) {
  const { user } = useAuth()
  const [selectedAssetIdx, setSelectedAssetIdx] = useState(0)
  const [destinationAddress, setDestinationAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  if (!isOpen) return null

  const selectedAsset = WITHDRAW_ASSETS[selectedAssetIdx]
  const parsedAmount = parseFloat(amount) || 0
  const netReceive = Math.max(0, parsedAmount - selectedAsset.fee)

  const handleSetMax = () => {
    setAmount(availableBalance.toString())
  }

  const handleWithdraw = (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (!destinationAddress.trim() || destinationAddress.trim().length < 16) {
      setErrorMessage('Please enter a valid destination wallet address.')
      return
    }

    if (!parsedAmount || parsedAmount < selectedAsset.minWithdraw) {
      setErrorMessage(`Minimum withdrawal is ${selectedAsset.minWithdraw} ${selectedAsset.symbol}.`)
      return
    }

    if (parsedAmount > availableBalance) {
      setErrorMessage(`Insufficient available balance ($${availableBalance.toLocaleString()} USDT).`)
      return
    }

    setIsSubmitting(true)

    try {
      const storageKey = 'purex_admin_withdrawals'
      const existingRaw = localStorage.getItem(storageKey)
      const withdrawals = existingRaw ? JSON.parse(existingRaw) : []

      const newWithdrawal = {
        id: `wth-${Date.now().toString().slice(-6)}`,
        userId: user?.id || 'usr-active-01',
        userName: user?.fullName || 'Active Trader',
        userEmail: user?.email || 'trader@purex.exchange',
        amount: parsedAmount,
        asset: `${selectedAsset.symbol} (${selectedAsset.network})`,
        walletAddress: destinationAddress.trim(),
        status: 'pending',
        createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
      }

      withdrawals.unshift(newWithdrawal)
      localStorage.setItem(storageKey, JSON.stringify(withdrawals))

      setSuccessMessage(`Withdrawal request of ${parsedAmount} ${selectedAsset.symbol} submitted for instant blockchain broadcast!`)
      if (onWithdrawSubmitted) {
        onWithdrawSubmitted(newWithdrawal)
      }

      setTimeout(() => {
        setIsSubmitting(false)
        onClose()
      }, 1600)
    } catch {
      setIsSubmitting(false)
      setErrorMessage('Failed to submit withdrawal request. Please try again.')
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
                <ArrowUpRight size={18} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight text-white">
                  Withdraw Funds
                </h2>
                <p className="text-[11px] text-slate-400">
                  Instant automated clearing to external private wallets
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

          {/* Withdraw Form */}
          <form onSubmit={handleWithdraw} className="mt-4 space-y-3.5">
            {/* Asset Picker */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Select Withdrawal Asset
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {WITHDRAW_ASSETS.map((asset, idx) => {
                  const isSelected = selectedAssetIdx === idx
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedAssetIdx(idx)}
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

            {/* Destination Address */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Destination {selectedAsset.symbol} Address ({selectedAsset.network})
              </label>
              <input
                type="text"
                value={destinationAddress}
                onChange={(e) => setDestinationAddress(e.target.value)}
                placeholder={`Paste recipient ${selectedAsset.network} address`}
                required
                className="w-full rounded-xl border border-white/15 bg-[#0f1228] px-3.5 py-2 text-xs font-mono text-white placeholder-slate-500 focus:border-[#ff7a00] focus:outline-none"
              />
            </div>

            {/* Amount */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-300 mb-1">
                <span>Withdrawal Amount</span>
                <span className="text-slate-400 text-[10px]">
                  Avail: <strong className="text-white">${availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT</strong>
                </span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={`Min. ${selectedAsset.minWithdraw} ${selectedAsset.symbol}`}
                  step="any"
                  required
                  className="w-full rounded-xl border border-white/15 bg-[#0f1228] px-3.5 py-2 pr-16 text-xs font-mono font-bold text-white placeholder-slate-500 focus:border-[#ff7a00] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleSetMax}
                  className="absolute right-2 top-1.5 rounded-lg bg-[#ff7a00]/20 px-2 py-1 text-[10px] font-bold text-[#ff7a00] hover:bg-[#ff7a00] hover:text-white transition-all cursor-pointer"
                >
                  MAX
                </button>
              </div>
            </div>

            {/* Fee & Receive Breakdown Card */}
            <div className="rounded-xl border border-white/10 bg-[#0f1228] p-3 space-y-1.5 text-[11px]">
              <div className="flex justify-between text-slate-400">
                <span>Network Execution Fee:</span>
                <span className="font-mono text-white">{selectedAsset.fee} {selectedAsset.symbol}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Processing Latency:</span>
                <span className="text-emerald-400 font-bold">&lt; 60 Seconds</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-1.5 font-bold text-white">
                <span>Net Amount to Receive:</span>
                <span className="font-mono text-emerald-400 text-xs">
                  {netReceive > 0 ? netReceive.toLocaleString() : '0.00'} {selectedAsset.symbol}
                </span>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isSubmitting || parsedAmount <= 0}
              className="w-full rounded-xl bg-gradient-to-r from-[#ff7a00] to-[#ff9500] py-2.5 text-xs font-black text-white uppercase tracking-wider shadow-[0_0_20px_rgba(255,122,0,0.4)] hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? 'Authorizing Payout...' : `Confirm Withdrawal of ${parsedAmount || 0} ${selectedAsset.symbol}`}
            </button>
          </form>

          {/* Security Guarantee */}
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2 text-[10px] text-slate-400">
            <ShieldCheck size={14} className="text-[#ff7a00] shrink-0" />
            <span>Withdrawals are monitored by MPC multi-sig cold vault security. 99% broadcasted under 1 minute.</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
