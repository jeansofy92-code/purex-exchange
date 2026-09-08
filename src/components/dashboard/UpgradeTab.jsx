import { useAuth } from '../../context/AuthContext'
import {
  Sparkles,
  Zap,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  Award
} from 'lucide-react'

const TIERS = [
  {
    name: 'Starter Trader',
    minDeposit: '$100',
    dailyRoi: '1.5% Daily',
    latency: '120ms standard',
    botEngine: 'Dual-DEX Arbitrage Bot',
    maxDeposit: '$4,999',
    safulimit: '100% Insured up to $5k',
    isCurrent: false,
    recommended: false,
    colorTheme: 'dark'
  },
  {
    name: 'Pro Quant Desk',
    minDeposit: '$5,000',
    dailyRoi: '2.4% Daily',
    latency: '18ms high-frequency',
    botEngine: 'Multi-CEX Latency Arbitrage Cluster',
    maxDeposit: '$24,999',
    safulimit: '100% Insured up to $25k',
    isCurrent: true,
    recommended: true,
    colorTheme: 'white' // Signature White Finantech Card
  },
  {
    name: 'Elite Institutional',
    minDeposit: '$25,000',
    dailyRoi: '3.5% Daily',
    latency: '4ms low-latency co-located',
    botEngine: 'Flash-Loan Triangular Algorithmic Engine',
    maxDeposit: '$99,999',
    safulimit: '100% Insured up to $100k',
    isCurrent: false,
    recommended: false,
    colorTheme: 'dark'
  },
  {
    name: 'VIP Syndicate Master',
    minDeposit: '$100,000',
    dailyRoi: '4.8% Daily',
    latency: '<1ms FPGA dark-pool router',
    botEngine: 'Institutional Cross-Exchange Liquidity Pool',
    maxDeposit: '$1,000,000+',
    safulimit: '100% Insured Unlimited',
    isCurrent: false,
    recommended: false,
    colorTheme: 'dark'
  }
]

export default function UpgradeTab({ onSelectInvestPlan }) {
  const { user } = useAuth()
  const currentTierName = user?.tier || 'Pro Quant Desk'

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#B0F127]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-2 max-w-xl z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B0F127]/10 border border-[#B0F127]/20 text-[#B0F127] text-xs font-medium">
            <Cpu className="w-3.5 h-3.5" />
            Quant Execution Tiers
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
            Upgrade Trading Tier
          </h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Boost your daily algorithmic return and reduce latency by scaling into higher liquidity pools and institutional private desks.
          </p>
        </div>

        <div className="bg-black/50 border border-white/10 rounded-xl p-4 flex items-center gap-3 min-w-[220px]">
          <div className="w-12 h-12 rounded-xl bg-[#B0F127]/10 border border-[#B0F127]/20 flex items-center justify-center text-[#B0F127]">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-white/40 uppercase tracking-wider font-mono block">Your Current Tier</span>
            <span className="text-sm font-bold text-white">
              {currentTierName}
            </span>
          </div>
        </div>
      </div>

      {/* Tiers Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TIERS.map((tier, idx) => {
          const isCurrent = currentTierName.toLowerCase().includes(tier.name.split(' ')[0].toLowerCase())
          const isWhiteCard = tier.colorTheme === 'white'

          return (
            <div
              key={idx}
              className={`rounded-2xl p-6 flex flex-col justify-between border transition-all duration-300 relative ${
                isCurrent
                  ? 'ring-2 ring-[#B0F127] shadow-[0_0_25px_rgba(176,241,39,0.15)]'
                  : 'hover:border-white/30'
              } ${
                isWhiteCard
                  ? 'bg-white text-black border-transparent shadow-lg'
                  : 'bg-[#141414] text-white border-white/10'
              }`}
            >
              {isCurrent && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#B0F127] text-black font-bold text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md">
                  Active Tier
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <span className={`text-[10px] uppercase tracking-wider font-semibold ${isWhiteCard ? 'text-black/60' : 'text-[#B0F127]'}`}>
                    LEVEL 0{idx + 1}
                  </span>
                  <h3 className="text-lg font-bold mt-0.5">{tier.name}</h3>
                </div>

                <div className={`p-4 rounded-xl ${isWhiteCard ? 'bg-black/5' : 'bg-black/40 border border-white/5'}`}>
                  <span className={`text-2xl font-black font-mono block ${isWhiteCard ? 'text-black' : 'text-[#B0F127]'}`}>
                    {tier.dailyRoi}
                  </span>
                  <span className={`text-xs ${isWhiteCard ? 'text-black/60' : 'text-white/50'}`}>
                    Starting from {tier.minDeposit}
                  </span>
                </div>

                <div className={`space-y-2.5 text-xs pt-2 border-t ${isWhiteCard ? 'border-black/10' : 'border-white/10'}`}>
                  <div className="flex justify-between">
                    <span className={isWhiteCard ? 'text-black/60' : 'text-white/50'}>Execution Speed:</span>
                    <span className="font-mono font-semibold">{tier.latency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isWhiteCard ? 'text-black/60' : 'text-white/50'}>Max Capital:</span>
                    <span className="font-mono font-semibold">{tier.maxDeposit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isWhiteCard ? 'text-black/60' : 'text-white/50'}>Bot Engine:</span>
                    <span className="font-semibold text-right max-w-[120px] truncate">{tier.botEngine}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isWhiteCard ? 'text-black/60' : 'text-white/50'}>SAFU Insurance:</span>
                    <span className={`font-semibold ${isWhiteCard ? 'text-emerald-700' : 'text-[#B0F127]'}`}>
                      100% Guaranteed
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => onSelectInvestPlan && onSelectInvestPlan()}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                    isCurrent
                      ? 'bg-white/10 text-white cursor-default'
                      : isWhiteCard
                      ? 'bg-black text-white hover:bg-black/80'
                      : 'bg-[#B0F127] text-black hover:bg-[#9ee016]'
                  }`}
                >
                  {isCurrent ? 'Current Tier Active' : 'Upgrade to this Tier'}
                  {!isCurrent && <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
