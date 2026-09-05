import { motion } from 'framer-motion'
import {
  Users,
  TrendingUp,
  Award,
  Shield,
  Copy,
  ArrowRight,
  CheckCircle2
} from 'lucide-react'
import { Link } from 'react-router-dom'
import RealisticChart from '../RealisticChart'

const topTraders = [
  {
    id: 1,
    name: 'Apex Quant Labs',
    badge: 'Elite Master',
    strategy: 'BTC/ETH Momentum Arbitrage',
    roi30d: '+342.8%',
    winRate: '91.4%',
    aum: '$3.82M',
    copiers: '2,480 Traders',
    riskScore: 'Low (2/10)',
    chart: [100, 115, 125, 140, 190, 240, 342],
    avatar: 'A',
  },
  {
    id: 2,
    name: 'Solana Alpha Fund',
    badge: 'Pro Verified',
    strategy: 'SOL Ecosystem & L1 Breakouts',
    roi30d: '+284.1%',
    winRate: '88.6%',
    aum: '$2.15M',
    copiers: '1,940 Traders',
    riskScore: 'Medium (4/10)',
    chart: [100, 110, 130, 160, 210, 250, 284],
    avatar: 'S',
  },
  {
    id: 3,
    name: 'Hyperion Delta Neutral',
    badge: 'Institutional',
    strategy: 'Perpetuals Funding Arbitrage',
    roi30d: '+192.5%',
    winRate: '96.2%',
    aum: '$5.40M',
    copiers: '3,810 Traders',
    riskScore: 'Ultra-Low (1/10)',
    chart: [100, 118, 132, 145, 160, 178, 192],
    avatar: 'H',
  },
]

export default function CopyTradingLeaderboard() {
  return (
    <section className="relative mx-auto max-w-[1440px] px-3.5 py-4 sm:px-6 lg:px-10">
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#ff7a00]/30 bg-[#ff7a00]/10 px-3 py-0.5 text-xs font-semibold text-[#ff7a00]">
            <Users size={12} />
            <span>ALGORITHMIC SOCIAL COPY TRADING</span>
          </div>
          <h2 className="mt-1.5 text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white">
            Mirror Top 0.1% Quant Strategies in 1 Click
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl">
            Automatically duplicate orders of audited hedge fund managers and algorithmic quants. Zero management fees on profits.
          </p>
        </div>

        <Link
          to="/signup"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ff7a00] hover:text-amber-300 transition-colors"
        >
          <span>Explore All 80+ Master Traders</span>
          <ArrowRight size={13} />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
        {topTraders.map((trader) => (
          <motion.div
            key={trader.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-[#15193b]/90 p-4 backdrop-blur-xl shadow-xl hover:border-[#ff7a00]/50 hover:shadow-[0_0_20px_rgba(255,122,0,0.2)] transition-all group flex flex-col justify-between"
          >
            <div>
              {/* Header: Avatar, Name, Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1e2454] border border-[#ff7a00]/30 font-mono text-sm font-black text-[#ff7a00] shadow">
                    {trader.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs sm:text-sm group-hover:text-[#ff7a00] transition-colors">
                      {trader.name}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">{trader.strategy}</div>
                  </div>
                </div>

                <span className="rounded-full bg-[#1e2454] border border-white/10 px-2.5 py-0.5 text-[9px] font-bold text-[#ff7a00]">
                  {trader.badge}
                </span>
              </div>

              {/* Main ROI Ticker */}
              <div className="mt-3.5 rounded-xl border border-white/10 bg-[#0f1228] p-2.5 flex items-center justify-between">
                <div>
                  <div className="text-[9px] uppercase font-bold text-slate-400">30-Day Verified ROI</div>
                  <div className="font-mono text-xl sm:text-2xl font-black text-[#ff7a00]">
                    {trader.roi30d}
                  </div>
                </div>

                <div className="w-20">
                  <RealisticChart values={trader.chart} positive={true} height={28} />
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="mt-3 grid grid-cols-3 gap-1.5 text-center font-mono text-xs">
                <div className="rounded-lg bg-[#0f1228] p-1.5 border border-white/[0.06]">
                  <div className="text-[9px] text-slate-400 font-sans">Win Rate</div>
                  <div className="font-bold text-white mt-0.5 text-[11px]">{trader.winRate}</div>
                </div>

                <div className="rounded-lg bg-[#0f1228] p-1.5 border border-white/[0.06]">
                  <div className="text-[9px] text-slate-400 font-sans">Copied AUM</div>
                  <div className="font-bold text-white mt-0.5 text-[11px]">{trader.aum}</div>
                </div>

                <div className="rounded-lg bg-[#0f1228] p-1.5 border border-white/[0.06]">
                  <div className="text-[9px] text-slate-400 font-sans">Risk Level</div>
                  <div className="font-bold text-[#ff7a00] mt-0.5 text-[11px]">{trader.riskScore.split(' ')[0]}</div>
                </div>
              </div>
            </div>

            {/* Bottom Copy Trigger */}
            <div className="mt-3.5 border-t border-white/10 pt-3 flex items-center justify-between">
              <span className="text-[11px] text-slate-300 font-mono">{trader.copiers}</span>
              <Link
                to="/signup"
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#ff7a00] to-[#ff9500] px-4 py-1.5 text-xs font-black text-white shadow hover:scale-105 transition-all cursor-pointer uppercase tracking-wider"
              >
                <Copy size={12} />
                <span>Auto Copy</span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
