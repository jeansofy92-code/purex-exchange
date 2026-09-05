import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, ArrowUpRight, ArrowDownLeft, ShieldCheck, CheckCircle2, Zap } from 'lucide-react'

const initialFeed = [
  { id: 1, type: 'yield', user: 'Trader *8421', desc: 'Received +$142.50 daily staking yield', asset: 'PUREX Vault', time: '12s ago', icon: Zap },
  { id: 2, type: 'trade', user: 'Trader *2091', desc: 'Executed 2.450 BTC Spot Limit Buy', asset: 'BTC/USDT', time: '28s ago', icon: ArrowDownLeft },
  { id: 3, type: 'withdrawal', user: 'Trader *5180', desc: 'Instant Withdrawal 4,500 USDT (TRC-20)', asset: 'Processed (1.1s)', time: '45s ago', icon: ArrowUpRight },
  { id: 4, type: 'reserve', user: 'Auditor Node', desc: 'Merkle Tree Solvency Snapshot verified', asset: '108.4% Ratio', time: '1m ago', icon: ShieldCheck },
  { id: 5, type: 'yield', user: 'Trader *9932', desc: 'Staked 15.0 ETH in Liquid Yield Vault', asset: 'ETH Liquid', time: '2m ago', icon: Zap },
]

export default function LiveActivityFeed() {
  return (
    <section className="mx-auto max-w-[1440px] px-3.5 py-4 sm:px-6 lg:px-10">
      <div className="rounded-2xl border border-slate-800 bg-[#090d14]/70 px-4 py-3 backdrop-blur-xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Ticker Label */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider shrink-0">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Live Payouts & Settlement Stream:</span>
        </div>

        {/* Scrolling or Grid Feed Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full font-mono text-xs">
          {initialFeed.slice(0, 4).map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.id}
                className="flex items-center gap-2.5 rounded-xl border border-slate-800/80 bg-slate-950/60 px-3 py-2 text-slate-300 overflow-hidden"
              >
                <div className="rounded-lg bg-emerald-950/40 p-1 text-emerald-400 shrink-0">
                  <Icon size={13} />
                </div>
                <div className="truncate">
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="font-bold text-white truncate">{item.user}</span>
                    <span className="text-[10px] text-slate-500 shrink-0">{item.time}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">{item.desc}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
