import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import {
  Wallet,
  CheckCircle2,
  Save,
  ShieldCheck,
  Coins,
  Copy,
  Check,
  Percent,
  Sliders
} from 'lucide-react'

export default function AdminWallets() {
  const { platformSettings, adminUpdateWallets } = useAuth()
  const currentWallets = platformSettings?.wallets || {}

  const [usdtTrc20, setUsdtTrc20] = useState(currentWallets.usdtTrc20 || 'TJY8B9Wz6E7kRzQx18eNx7yP3gQzLmK29a')
  const [usdtErc20, setUsdtErc20] = useState(currentWallets.usdtErc20 || '0x71C2d3E4F5a6B7c8D9e0F1A2b3C4D5e6F7a8B9c0')
  const [usdtBep20, setUsdtBep20] = useState(currentWallets.usdtBep20 || '0x71C2d3E4F5a6B7c8D9e0F1A2b3C4D5e6F7a8B9c0')
  const [btc, setBtc] = useState(currentWallets.btc || 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh')
  const [eth, setEth] = useState(currentWallets.eth || '0x89205A3E3b291a5a458d988563d9491DE514757c')
  const [sol, setSol] = useState(currentWallets.sol || '7EYnhQoR9YM3N7UoaKRoA44BX8WBPrURdFCvWaxHdGL')
  const [conversionFeeWallet, setConversionFeeWallet] = useState(currentWallets.conversionFeeWallet || 'TJY8B9Wz6E7kRzQx18eNx7yP3gQzLmK29a')
  const [gasClearingWallet, setGasClearingWallet] = useState(currentWallets.gasClearingWallet || 'TJY8B9Wz6E7kRzQx18eNx7yP3gQzLmK29a')
  const [taxClearanceWallet, setTaxClearanceWallet] = useState(currentWallets.taxClearanceWallet || 'TJY8B9Wz6E7kRzQx18eNx7yP3gQzLmK29a')

  const [conversionFeePercent, setConversionFeePercent] = useState(platformSettings?.conversionFeePercent ?? 20)
  const [cryptoGasFeePercent, setCryptoGasFeePercent] = useState(platformSettings?.cryptoGasFeePercent ?? 10)
  const [cryptoGasFeeMinUsd, setCryptoGasFeeMinUsd] = useState(platformSettings?.cryptoGasFeeMinUsd ?? 25)
  const [fiatTaxFeePercent, setFiatTaxFeePercent] = useState(platformSettings?.fiatTaxFeePercent ?? 15)
  const [fiatTaxFeeMinUsd, setFiatTaxFeeMinUsd] = useState(platformSettings?.fiatTaxFeeMinUsd ?? 50)

  useEffect(() => {
    if (platformSettings) {
      const w = platformSettings.wallets || {}
      if (w.usdtTrc20) setUsdtTrc20(w.usdtTrc20)
      if (w.usdtErc20) setUsdtErc20(w.usdtErc20)
      if (w.usdtBep20) setUsdtBep20(w.usdtBep20)
      if (w.btc) setBtc(w.btc)
      if (w.eth) setEth(w.eth)
      if (w.sol) setSol(w.sol)
      if (w.conversionFeeWallet) setConversionFeeWallet(w.conversionFeeWallet)
      if (w.gasClearingWallet) setGasClearingWallet(w.gasClearingWallet)
      if (w.taxClearanceWallet) setTaxClearanceWallet(w.taxClearanceWallet)
      if (platformSettings.conversionFeePercent !== undefined) setConversionFeePercent(platformSettings.conversionFeePercent)
      if (platformSettings.cryptoGasFeePercent !== undefined) setCryptoGasFeePercent(platformSettings.cryptoGasFeePercent)
      if (platformSettings.cryptoGasFeeMinUsd !== undefined) setCryptoGasFeeMinUsd(platformSettings.cryptoGasFeeMinUsd)
      if (platformSettings.fiatTaxFeePercent !== undefined) setFiatTaxFeePercent(platformSettings.fiatTaxFeePercent)
      if (platformSettings.fiatTaxFeeMinUsd !== undefined) setFiatTaxFeeMinUsd(platformSettings.fiatTaxFeeMinUsd)
    }
  }, [platformSettings])

  const [saved, setSaved] = useState(false)
  const [copiedKey, setCopiedKey] = useState(null)

  const handleCopy = (key, val) => {
    navigator.clipboard.writeText(val)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const handleSave = (e) => {
    e.preventDefault()
    const res = adminUpdateWallets(
      {
        usdtTrc20: usdtTrc20.trim(),
        usdtErc20: usdtErc20.trim(),
        usdtBep20: usdtBep20.trim(),
        btc: btc.trim(),
        eth: eth.trim(),
        sol: sol.trim(),
        conversionFeeWallet: conversionFeeWallet.trim(),
        gasClearingWallet: gasClearingWallet.trim(),
        taxClearanceWallet: taxClearanceWallet.trim()
      },
      {
        conversionFeePercent: Number(conversionFeePercent),
        cryptoGasFeePercent: Number(cryptoGasFeePercent),
        cryptoGasFeeMinUsd: Number(cryptoGasFeeMinUsd),
        fiatTaxFeePercent: Number(fiatTaxFeePercent),
        fiatTaxFeeMinUsd: Number(fiatTaxFeeMinUsd)
      }
    )

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
          Configure the multi-sig treasury wallets, fee percentages, and external clearance addresses displayed across the platform.
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
                  className="text-[10px] text-[#B0F127] hover:underline cursor-pointer"
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
                  className="text-[10px] text-[#B0F127] hover:underline cursor-pointer"
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

            {/* USDT BEP20 */}
            <div className="space-y-1.5">
              <label className="text-xs text-white/70 font-semibold flex justify-between">
                <span>USDT Deposit Address (BEP20 Binance Smart Chain)</span>
                <button
                  type="button"
                  onClick={() => handleCopy('bep20', usdtBep20)}
                  className="text-[10px] text-[#B0F127] hover:underline cursor-pointer"
                >
                  {copiedKey === 'bep20' ? 'Copied' : 'Copy'}
                </button>
              </label>
              <input
                type="text"
                required
                value={usdtBep20}
                onChange={(e) => setUsdtBep20(e.target.value)}
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
                  className="text-[10px] text-[#B0F127] hover:underline cursor-pointer"
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
                  className="text-[10px] text-[#B0F127] hover:underline cursor-pointer"
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

            {/* Solana SOL */}
            <div className="space-y-1.5">
              <label className="text-xs text-white/70 font-semibold flex justify-between">
                <span>Solana (SOL) Address</span>
                <button
                  type="button"
                  onClick={() => handleCopy('sol', sol)}
                  className="text-[10px] text-[#B0F127] hover:underline cursor-pointer"
                >
                  {copiedKey === 'sol' ? 'Copied' : 'Copy'}
                </button>
              </label>
              <input
                type="text"
                required
                value={sol}
                onChange={(e) => setSol(e.target.value)}
                className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Platform Fee Percentages & Thresholds */}
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <Percent className="w-5 h-5 text-[#B0F127]" />
            <h3 className="text-base font-bold text-white">Platform Fee Rates & Minimum Thresholds</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Conversion Swap Fee Rate */}
            <div className="space-y-1.5">
              <label className="text-xs text-white/70 font-semibold">Conversion Swap Fee Rate (%)</label>
              <input
                type="number"
                step="any"
                min="0"
                required
                value={conversionFeePercent}
                onChange={(e) => setConversionFeePercent(e.target.value)}
                className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-4 py-2.5 text-xs text-[#B0F127] font-mono font-bold outline-none"
              />
              <p className="text-[10px] text-white/40">Percentage charged for crypto-to-fiat conversion (e.g. 20%)</p>
            </div>

            {/* Crypto Gas Fee Rate & Min */}
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs text-white/70 font-semibold">Crypto Gas Clearance Rate (%)</label>
                <input
                  type="number"
                  step="any"
                  min="0"
                  required
                  value={cryptoGasFeePercent}
                  onChange={(e) => setCryptoGasFeePercent(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-4 py-2.5 text-xs text-amber-400 font-mono font-bold outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-white/70 font-semibold">Min Crypto Gas Fee ($ USD)</label>
                <input
                  type="number"
                  step="any"
                  min="0"
                  required
                  value={cryptoGasFeeMinUsd}
                  onChange={(e) => setCryptoGasFeeMinUsd(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-4 py-2.5 text-xs text-amber-400 font-mono font-bold outline-none"
                />
                <p className="text-[10px] text-white/40">Minimum floor for crypto gas fee (e.g. $25)</p>
              </div>
            </div>

            {/* Bank Tax Fee Rate & Min */}
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs text-white/70 font-semibold">Bank Tax Clearance Rate (%)</label>
                <input
                  type="number"
                  step="any"
                  min="0"
                  required
                  value={fiatTaxFeePercent}
                  onChange={(e) => setFiatTaxFeePercent(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-4 py-2.5 text-xs text-cyan-400 font-mono font-bold outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-white/70 font-semibold">Min Bank Tax Fee ($ USD)</label>
                <input
                  type="number"
                  step="any"
                  min="0"
                  required
                  value={fiatTaxFeeMinUsd}
                  onChange={(e) => setFiatTaxFeeMinUsd(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 focus:border-[#B0F127] rounded-xl px-4 py-2.5 text-xs text-cyan-400 font-mono font-bold outline-none"
                />
                <p className="text-[10px] text-white/40">Minimum floor for bank tax clearance (e.g. $50)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: External Fee Collection Wallets */}
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">External Fee Collection Wallets</h3>
          </div>

          <div className="space-y-4">
            {/* Conversion Fee Wallet */}
            <div className="space-y-1.5">
              <label className="text-xs text-white/70 font-semibold flex justify-between">
                <span>Conversion Fee Collection Wallet (USDT TRC20)</span>
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
            <span>Platform treasury & fee collection settings saved successfully!</span>
          </div>
        )}

        <button
          type="submit"
          className="px-6 py-3.5 bg-[#B0F127] hover:bg-[#9ee016] text-black font-bold text-xs rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          Save Platform Wallet Settings
        </button>
      </form>
    </div>
  )
}
