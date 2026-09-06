import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Users,
  Copy,
  Check,
  Gift,
  TrendingUp,
  Share2,
  DollarSign,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function ReferralModal({ isOpen, onClose }) {
  const { user } = useAuth()
  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)

  if (!isOpen) return null

  const userCode = user?.referralCode || (user?.id ? `PUREX-${user.id.slice(-4).toUpperCase()}` : 'PUREX-VIP88')
  const referralLink = `${window.location.origin}/signup?ref=${userCode}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(userCode)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const handleShare = (platform) => {
    const text = `Trade crypto with institutional liquidity and earn daily staking yields on PUREX Exchange! Join using my exclusive VIP invite: ${referralLink}`
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank')
    } else if (platform === 'telegram') {
      window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(text)}`, '_blank')
    } else if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank')
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl rounded-3xl border border-white/15 bg-[#141838] p-5 sm:p-7 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden text-white my-auto flex flex-col max-h-[92vh]"
        >
          {/* Top orange glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-28 bg-[#ff7a00]/15 blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff7a00] to-amber-500 shadow-[0_0_15px_rgba(255,122,0,0.4)]">
                <Gift size={18} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                  <span>Affiliate & Referral Partner Hub</span>
                  <span className="text-[10px] font-mono text-[#ff7a00] bg-[#ff7a00]/15 px-2 py-0.5 rounded-full border border-[#ff7a00]/30">
                    Up to 10% Commission
                  </span>
                </h2>
                <p className="text-[11px] text-slate-400">
                  Invite institutional traders and earn recurring commissions on all trading and staking volume
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

          <div className="overflow-y-auto flex-1 pr-1 space-y-4 py-3">
            {/* Referral Link & Code Box */}
            <div className="rounded-2xl border border-white/15 bg-[#0f1228] p-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Code */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Your Referral Code
                  </label>
                  <div className="flex items-center justify-between rounded-xl border border-white/15 bg-[#15193b] p-2 font-mono text-xs">
                    <span className="font-bold text-[#ff7a00]">{userCode}</span>
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="flex items-center gap-1 rounded-lg bg-[#ff7a00]/20 px-2 py-1 text-[10px] font-bold text-[#ff7a00] hover:bg-[#ff7a00] hover:text-white transition-all cursor-pointer"
                    >
                      {copiedCode ? <Check size={12} /> : <Copy size={12} />}
                      <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Direct Link */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Your Exclusive Referral Link
                  </label>
                  <div className="flex items-center justify-between rounded-xl border border-white/15 bg-[#15193b] p-2 font-mono text-xs">
                    <span className="truncate max-w-[180px] sm:max-w-[200px] text-white select-all">
                      {referralLink}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="flex items-center gap-1 rounded-lg bg-[#ff7a00] px-2.5 py-1 text-[10px] font-bold text-white shadow hover:brightness-110 cursor-pointer"
                    >
                      {copiedLink ? <Check size={12} /> : <Copy size={12} />}
                      <span>{copiedLink ? 'Copied' : 'Copy Link'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Social Share Buttons */}
              <div className="flex items-center gap-2 border-t border-white/10 pt-3">
                <span className="text-[11px] text-slate-400 flex items-center gap-1 font-semibold">
                  <Share2 size={12} className="text-[#ff7a00]" />
                  <span>1-Click Share:</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleShare('telegram')}
                  className="rounded-lg border border-sky-500/30 bg-sky-500/15 px-2.5 py-1 text-[10px] font-bold text-sky-400 hover:bg-sky-500 hover:text-white transition-colors cursor-pointer"
                >
                  Telegram
                </button>
                <button
                  type="button"
                  onClick={() => handleShare('twitter')}
                  className="rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-bold text-slate-200 hover:bg-white hover:text-black transition-colors cursor-pointer"
                >
                  X (Twitter)
                </button>
                <button
                  type="button"
                  onClick={() => handleShare('whatsapp')}
                  className="rounded-lg border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-1 text-[10px] font-bold text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer"
                >
                  WhatsApp
                </button>
              </div>
            </div>

            {/* Live Performance Stats Grid */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="rounded-2xl border border-white/10 bg-[#0f1228] p-3.5 text-center">
                <div className="text-[10px] font-bold uppercase text-slate-400">Total Referrals</div>
                <div className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5">3</div>
                <div className="text-[9px] text-emerald-400 font-semibold mt-0.5">Active Network</div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0f1228] p-3.5 text-center">
                <div className="text-[10px] font-bold uppercase text-slate-400">Trading Volume</div>
                <div className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5">$48,250</div>
                <div className="text-[9px] text-slate-400 mt-0.5">30-Day Cumulative</div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0f1228] p-3.5 text-center">
                <div className="text-[10px] font-bold uppercase text-slate-400">Earned Rewards</div>
                <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-0.5">$1,420.50</div>
                <div className="text-[9px] text-emerald-400 font-semibold mt-0.5">Paid Instantly</div>
              </div>
            </div>

            {/* 3-Tier Commission Structure */}
            <div className="rounded-2xl border border-white/15 bg-[#0f1228] p-4 space-y-2.5">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles size={14} className="text-[#ff7a00]" />
                <span>Multi-Tier Partner Commission Structure</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="rounded-xl border border-[#ff7a00]/30 bg-[#ff7a00]/10 p-3">
                  <div className="font-bold text-[#ff7a00] text-sm">Tier 1 • 10%</div>
                  <div className="text-[10px] font-bold text-white mt-0.5">Direct Referrals</div>
                  <div className="text-[9px] text-slate-400 mt-1">Earn 10% of fees and staking margins from traders you invite directly.</div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="font-bold text-white text-sm">Tier 2 • 3%</div>
                  <div className="text-[10px] font-bold text-white mt-0.5">Sub-Affiliates</div>
                  <div className="text-[9px] text-slate-400 mt-1">Earn 3% override commission when your referrals invite other traders.</div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="font-bold text-white text-sm">Tier 3 • 1%</div>
                  <div className="text-[10px] font-bold text-white mt-0.5">Ecosystem Pool</div>
                  <div className="text-[9px] text-slate-400 mt-1">Earn 1% residual volume bonus across 3rd-generation platform liquidity.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-[#ff7a00]" />
              <span>Commission payouts are credited directly to your available balance in real time.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
