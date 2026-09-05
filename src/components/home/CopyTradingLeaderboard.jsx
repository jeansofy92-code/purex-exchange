import { motion } from 'framer-motion'
import {
  Users,
  TrendingUp,
  Award,
  Shield,
  Copy,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  BarChart3
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
    riskColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
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
    riskColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
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
    riskColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    chart: [100, 118, 132, 145, 160, 178, 192],
    avatar: 'H',
  },
]

export default function CopyTradingLeaderboard() {
  return (
    <section className="relative mx-auto max-w-[1440px] px-3.5 py-12 sm:px-6 lg:px-10">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-xs font-semibold text-emerald-400">
            <Users size={13} />
            <span>ALGORITHMIC SOCIAL COPY TRADING</span>
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            Mirror Top 0.1% Quant Strategies in 1 Click
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-2xl">
            Automatically duplicate orders of audited hedge fund managers and algorithmic quants. Zero management fees on profits.
          </p>
        </div>

        <Link
          to="/signup"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <span>Explore All 80+ Master Traders</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {topTraders.map((trader) => (
          <motion.div
            key={trader.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-slate-800 bg-[#090d14]/90 p-5 backdrop-blur-xl shadow-xl hover:border-emerald-500/40 hover:shadow-[0_0_25px_rgba(52,211,153,0.12)] transition-all group flex flex-col justify-between"
          >
            <div>
              {/* Header: Avatar, Name, Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 font-mono text-base font-black text-emerald-400 shadow">
                    {trader.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm group-hover:text-emerald-400 transition-colors">
                      {trader.name}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">{trader.strategy}</div>
                  </div>
                </div>

                <span className="rounded-full bg-slate-900 border border-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                  {trader.badge}
                </span>
              </div>

              {/* Main ROI Ticker */}
              <div className="mt-5 rounded-xl border border-slate-800/80 bg-slate-950/80 p-3 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">30-Day Verified ROI</div>
                  <div className="font-mono text-2xl font-black text-emerald-400">
                    {trader.roi30d}
                  </div>
                </div>

                <div className="w-24">
                  <RealisticChart values={trader.chart} positive={true} height={32} />
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center font-mono text-xs">
                <div className="rounded-lg bg-slate-950/60 p-2 border border-slate-800/60">
                  <div className="text-[10px] text-slate-500 font-sans">Win Rate</div>
                  <div className="font-bold text-white mt-0.5">{trader.winRate}</div>
                </div>

                <div className="rounded-lg bg-slate-950/60 p-2 border border-slate-800/60">
                  <div className="text-[10px] text-slate-500 font-sans">Copied AUM</div>
                  <div className="font-bold text-white mt-0.5">{trader.aum}</div>
                </div>

                <div className="rounded-lg bg-slate-950/60 p-2 border border-slate-800/60">
                  <div className="text-[10px] text-slate-500 font-sans">Risk Level</div>
                  <div className="font-bold text-emerald-400 mt-0.5">{trader.riskScore.split(' ')[0]}</div>
                </div>
              </div>
            </div>

            {/* Bottom Copy Trigger */}
            <div className="mt-5 border-t border-slate-800/80 pt-4 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">{trader.copiers}</span>
              <Link
                to="/signup"
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-400 px-4 py-2 text-xs font-bold text-slate-950 shadow hover:bg-emerald-300 transition-all cursor-pointer"
              >
                <Copy size={13} />
                <span>Auto Copy</span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
