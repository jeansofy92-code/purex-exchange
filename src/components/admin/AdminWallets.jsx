import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import {
  Wallet,
  CheckCircle2,
  Save,
  ShieldCheck,
  Coins,
  Copy,
  Check,
  AlertCircle
} from 'lucide-react'

export default function AdminWallets() {
  const { platformSettings, adminUpdateWallets } = useAuth()
  const currentWallets = platformSettings?.wallets || {}

  const [usdtTrc20, setUsdtTrc20] = useState(currentWallets.usdtTrc20 || '')
  const [usdtErc20, setUsdtErc20] = useState(currentWallets.usdtErc20 || '')
  const [btc, setBtc] = useState(currentWallets.btc || '')
  const [eth, setEth] = useState(currentWallets.eth || '')
  const [sol, setSol] = useState(currentWallets.sol || '')
  const [conversionFeeWallet, setConversionFeeWallet] = useState(currentWallets.conversionFeeWallet || '')
  const [gasClearingWallet, setGasClearingWallet] = useState(currentWallets.gasClearingWallet || '')
  const [taxClearanceWallet, setTaxClearanceWallet] = useState(currentWallets.taxClearanceWallet || '')

  const [saved, setSaved] = useState(false)
  const [copiedKey, setCopiedKey] = useState(null)

  const handleCopy = (key, val) => {
    navigator.clipboard.writeText(val)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const handleSave = (e) => {
    e.preventDefault()
    const res = adminUpdateWallets({
      usdtTrc20: usdtTrc20.trim(),
      usdtErc20: usdtErc20.trim(),
      btc: btc.trim(),
      eth: eth.trim(),
      sol: sol.trim(),
      conversionFeeWallet: conversionFeeWallet.trim(),
      gasClearingWallet: gasClearingWallet.trim(),
      taxClearanceWallet: taxClearanceWallet.trim()
    })

    if (res.success) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header Bar */}
      <div>
        <h2 className="text-2xl font-black text-white tracking-tight">Deposit & Fee Wallet Settings</h2>
        <p className="text-xs text-white/50">
          Manage the multi-sig treasury wallets and external fee collection addresses displayed across the platform.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Capital Inflow Wallets */}
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <Coins className="w-5 h-5 text-[#B0F127]" />
            <h3 className="text-base font-bold text-white">Capital Deposit Treasury Wallets</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* USDT TRC20 */}
            <div className="space-y-1.5">
              <label className="text-xs text-white/70 font-semibold flex justify-between">
                <span>USDT Deposit Address (TRC20)</span>
                <button
                  type="button"
                  onClick={() => handleCopy('trc20', usdtTrc20)}
                  className="text-[10px] text-[#B0F127] hover:underline"
                >
                  {copiedKey === 'trc20' ? 'Copied' : 'Copy'}
                </button>
              </label>
              <input
                type="text"
                required
                value={usdtTrc20}
                onChange={(e) => setUsdtTrc20(e.target.value)}
                className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none"
              />
            </div>

            {/* USDT ERC20 */}
            <div className="space-y-1.5">
              <label className="text-xs text-white/70 font-semibold flex justify-between">
                <span>USDT Deposit Address (ERC20)</span>
                <button
                  type="button"
                  onClick={() => handleCopy('erc20', usdtErc20)}
                  className="text-[10px] text-[#B0F127] hover:underline"
                >
                  {copiedKey === 'erc20' ? 'Copied' : 'Copy'}
                </button>
              </label>
              <input
                type="text"
                required
                value={usdtErc20}
                onChange={(e) => setUsdtErc20(e.target.value)}
                className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none"
              />
            </div>

            {/* Bitcoin BTC */}
            <div className="space-y-1.5">
              <label className="text-xs text-white/70 font-semibold flex justify-between">
                <span>Bitcoin (BTC) Native Address</span>
                <button
                  type="button"
                  onClick={() => handleCopy('btc', btc)}
                  className="text-[10px] text-[#B0F127] hover:underline"
                >
                  {copiedKey === 'btc' ? 'Copied' : 'Copy'}
                </button>
              </label>
              <input
                type="text"
                required
                value={btc}
                onChange={(e) => setBtc(e.target.value)}
                className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none"
              />
            </div>

            {/* Ethereum ETH */}
            <div className="space-y-1.5">
              <label className="text-xs text-white/70 font-semibold flex justify-between">
                <span>Ethereum (ETH) Address</span>
                <button
                  type="button"
                  onClick={() => handleCopy('eth', eth)}
                  className="text-[10px] text-[#B0F127] hover:underline"
                >
                  {copiedKey === 'eth' ? 'Copied' : 'Copy'}
                </button>
              </label>
              <input
                type="text"
                required
                value={eth}
                onChange={(e) => setEth(e.target.value)}
                className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: External Fee Collection Wallets */}
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">External Fee Collection Wallets</h3>
          </div>

          <div className="space-y-4">
            {/* 20% Conversion Fee Wallet */}
            <div className="space-y-1.5">
              <label className="text-xs text-white/70 font-semibold flex justify-between">
                <span>20% Conversion Fee Collection Wallet (USDT TRC20)</span>
                <span className="text-[10px] text-[#B0F127] font-mono">Used for Swap Conversions</span>
              </label>
              <input
                type="text"
                required
                value={conversionFeeWallet}
                onChange={(e) => setConversionFeeWallet(e.target.value)}
                className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none"
              />
            </div>

            {/* Network Gas Clearing Fee Wallet */}
            <div className="space-y-1.5">
              <label className="text-xs text-white/70 font-semibold flex justify-between">
                <span>Crypto Network Gas & Multi-Sig Clearing Wallet (USDT TRC20)</span>
                <span className="text-[10px] text-amber-400 font-mono">Used for Crypto Withdrawals</span>
              </label>
              <input
                type="text"
                required
                value={gasClearingWallet}
                onChange={(e) => setGasClearingWallet(e.target.value)}
                className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none"
              />
            </div>

            {/* Bank Tax Clearance Fee Wallet */}
            <div className="space-y-1.5">
              <label className="text-xs text-white/70 font-semibold flex justify-between">
                <span>Bank Tax Clearance & Capital Gains Fee Wallet (USDT TRC20)</span>
                <span className="text-[10px] text-cyan-400 font-mono">Used for Local Bank Withdrawals</span>
              </label>
              <input
                type="text"
                required
                value={taxClearanceWallet}
                onChange={(e) => setTaxClearanceWallet(e.target.value)}
                className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none"
              />
            </div>
          </div>
        </div>

        {saved && (
          <div className="p-3.5 bg-[#B0F127]/10 border border-[#B0F127]/30 rounded-2xl text-xs text-[#B0F127] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Platform treasury & fee collection wallets saved successfully!</span>
          </div>
        )}

        <button
          type="submit"
          className="px-6 py-3.5 bg-[#B0F127] hover:bg-[#9ee016] text-black font-bold text-xs rounded-xl transition-all shadow-lg flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Platform Wallet Settings
        </button>
      </form>
    </div>
  )
}
