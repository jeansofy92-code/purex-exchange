import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import {
  Users,
  Copy,
  Check,
  DollarSign,
  TrendingUp,
  Share2,
  Gift,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  QrCode
} from 'lucide-react'

export default function ReferralTab() {
  const { user, claimReferralCommission } = useAuth()
  const [copiedCode, setCopiedCode] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const [claiming, setClaiming] = useState(false)
  const [claimFeedback, setClaimFeedback] = useState(null)

  const refCode = user?.referralCode || 'PX-88492'
  const refLink = `${window.location.origin}/register?ref=${refCode}`
  const stats = user?.referralStats || {
    totalInvited: 14,
    activeInvestors: 9,
    totalEarned: 2450.00,
    tier1Count: 9,
    tier2Count: 5
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(refCode)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(refLink)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  const handleClaim = () => {
    setClaimFeedback(null)
    setClaiming(true)
    setTimeout(() => {
      const res = claimReferralCommission()
      setClaiming(false)
      if (res.success) {
        setClaimFeedback({
          type: 'success',
          message: `Successfully claimed $${res.amount.toLocaleString()} in referral bonuses to your Profit Balance!`
        })
      } else {
        setClaimFeedback({
          type: 'error',
          message: res.error || 'No claimable commission at this time.'
        })
      }
    }, 800)
  }

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#B0F127]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-2 max-w-xl z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B0F127]/10 border border-[#B0F127]/20 text-[#B0F127] text-xs font-medium">
            <Gift className="w-3.5 h-3.5" />
            2-Tier High Yield Affiliate Program
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
            Invite Traders & Earn Passive Crypto
          </h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Share your unique Purex referral code with other traders, communities, and investors. Earn up to 10% direct Tier 1 bonus and 5% Tier 2 override on all active deposits.
          </p>
        </div>

        {/* Unclaimed Box */}
        <div className="bg-black/50 border border-white/10 rounded-xl p-5 w-full md:w-auto min-w-[240px] space-y-3">
          <span className="text-[10px] text-white/40 uppercase tracking-wider font-mono block">
            Unclaimed Affiliate Rewards
          </span>
          <div className="text-2xl font-black text-[#B0F127] font-mono">
            ${(stats.totalEarned || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <button
            onClick={handleClaim}
            disabled={claiming || stats.totalEarned <= 0}
            className="w-full py-2 bg-[#B0F127] hover:bg-[#9ee016] text-black font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 disabled:opacity-40"
          >
            {claiming ? 'Transferring...' : 'Claim to Profit Balance'}
          </button>
        </div>
      </div>

      {claimFeedback && (
        <div
          className={`p-3.5 rounded-xl text-xs flex items-center gap-2 ${
            claimFeedback.type === 'success'
              ? 'bg-[#B0F127]/10 text-[#B0F127] border border-[#B0F127]/30'
              : 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
          }`}
        >
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>{claimFeedback.message}</span>
        </div>
      )}

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-5 space-y-1">
          <span className="text-xs text-white/50">Total Invited Traders</span>
          <div className="text-2xl font-bold text-white font-mono">{stats.totalInvited || 0}</div>
          <span className="text-[10px] text-white/40">Registered using your code</span>
        </div>

        <div className="bg-[#141414] border border-white/10 rounded-2xl p-5 space-y-1">
          <span className="text-xs text-white/50">Active Capital Investors</span>
          <div className="text-2xl font-bold text-[#B0F127] font-mono">{stats.activeInvestors || 0}</div>
          <span className="text-[10px] text-[#B0F127]/70">Currently earning arbitrage</span>
        </div>

        <div className="bg-[#141414] border border-white/10 rounded-2xl p-5 space-y-1">
          <span className="text-xs text-white/50">Tier 1 Network (10%)</span>
          <div className="text-2xl font-bold text-white font-mono">{stats.tier1Count || 0}</div>
          <span className="text-[10px] text-white/40">Direct partner signups</span>
        </div>

        <div className="bg-white text-black rounded-2xl p-5 space-y-1 shadow-md">
          <span className="text-xs text-black/60 font-medium">Tier 2 Network (5%)</span>
          <div className="text-2xl font-black text-black font-mono">{stats.tier2Count || 0}</div>
          <span className="text-[10px] text-black/50">Sub-affiliate network</span>
        </div>
      </div>

      {/* Share Links & Referral Codes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code & Link Box */}
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[#B0F127]" />
            Your Affiliate Links
          </h3>

          <div className="space-y-4">
            {/* Referral Code */}
            <div className="space-y-1.5">
              <label className="text-xs text-white/60">Your Exclusive Referral Code</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={refCode}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm font-bold text-[#B0F127] font-mono outline-none"
                />
                <button
                  onClick={handleCopyCode}
                  className="px-4 py-3 bg-[#B0F127] hover:bg-[#9ee016] text-black font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shrink-0"
                >
                  {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copiedCode ? 'Copied' : 'Copy Code'}
                </button>
              </div>
            </div>

            {/* Referral URL */}
            <div className="space-y-1.5">
              <label className="text-xs text-white/60">Your Direct Registration URL</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={refLink}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white/80 font-mono outline-none truncate"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/10 transition-all flex items-center gap-1.5 shrink-0"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-[#B0F127]" /> : <Copy className="w-4 h-4" />}
                  {copiedLink ? 'Copied' : 'Copy Link'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Tier Commission Breakdown */}
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#B0F127]" />
            2-Tier Tiered Payout Rules
          </h3>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-white text-black space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider">Tier 1: Direct Referrals</span>
                <span className="text-lg font-black font-mono">10% Payout</span>
              </div>
              <p className="text-xs text-black/70">
                Receive 10% instant commission on every initial and recurring capital deposit made by direct users who sign up with your code.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-white">Tier 2: Sub-Affiliates</span>
                <span className="text-lg font-black font-mono text-[#B0F127]">5% Payout</span>
              </div>
              <p className="text-xs text-white/50">
                Receive a 5% secondary yield override when your direct referrals invite new traders to the Purex platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
