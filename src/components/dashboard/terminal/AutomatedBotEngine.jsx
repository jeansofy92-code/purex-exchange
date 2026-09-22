import { useState, useEffect, useRef } from 'react'
import { 
  Bot, 
  Play, 
  Pause, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  Cpu, 
  Terminal, 
  RefreshCw,
  Sparkles,
  CheckCircle2,
  Clock
} from 'lucide-react'
import { useAuth } from '../../../context/AuthContext'

const STRATEGIES = [
  {
    id: 'triangular',
    name: 'Triangular Multi-DEX Flash Bot',
    desc: 'Exploits 3-way currency cycles across Binance, Uniswap v3, and PureX Pools',
    estApy: '84.2%',
    risk: 'Low (SAFU Insured)',
    speed: '4.8ms'
  },
  {
    id: 'cross_cex',
    name: 'Cross-CEX High Frequency Scalper',
    desc: 'Rapidly captures micro-spread discrepancies between Kraken, Coinbase, and OKX',
    estApy: '112.5%',
    risk: 'Ultra-Low',
    speed: '3.2ms'
  },
  {
    id: 'grid_yield',
    name: 'PureX Liquidity Grid Rebalancer',
    desc: 'Dynamic market-making grid that captures trading fees and MEV protection rebate',
    estApy: '68.0%',
    risk: 'SAFU Protected',
    speed: '8.1ms'
  }
]

export default function AutomatedBotEngine({ selectedPair = 'BTC/USDT' }) {
  const { user, executeTrade } = useAuth()
  const [isRunning, setIsRunning] = useState(true)
  const [activeStrategy, setActiveStrategy] = useState('triangular')
  const [totalBotProfit, setTotalBotProfit] = useState(1842.60)
  const [cyclesCompleted, setCyclesCompleted] = useState(142)
  const [logs, setLogs] = useState([
    { id: 1, time: '16:02:10', type: 'SYS', text: 'PureX Algorithmic Engine initialized. Connected to 6 DEX liquidity nodes.' },
    { id: 2, time: '16:02:14', type: 'SCAN', text: `Scanning ${selectedPair} liquidity across Binance, Kraken, and PureX Internal Pool...` },
    { id: 3, time: '16:02:18', type: 'EXEC', text: 'Arbitrage opportunity detected (+0.48%). Routed 0.50 BTC @ $96,380.00 -> Sold @ $96,842.00. Net Profit: +$231.00' }
  ])
  const logEndRef = useRef(null)

  // Auto-scroll logs
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  // Live algorithmic trading loop
  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      const profitIncrement = Number((Math.random() * 12 + 2.5).toFixed(2))
      const timeStr = new Date().toLocaleTimeString()
      const buyPrice = 96400 + Math.random() * 40
      const sellPrice = buyPrice + (profitIncrement * 2.1)
      const dexes = ['Binance ➔ PureX Pool', 'Kraken ➔ Coinbase', 'Uniswap v3 ➔ PureX Pool', 'OKX ➔ Bybit']
      const chosenDex = dexes[Math.floor(Math.random() * dexes.length)]

      setTotalBotProfit(prev => Number((prev + profitIncrement).toFixed(2)))
      setCyclesCompleted(prev => prev + 1)

      const newLog = {
        id: Date.now(),
        time: timeStr,
        type: 'EXEC',
        text: `[${chosenDex}] Arbitrage cycle completed. Spread delta +${((sellPrice - buyPrice) / buyPrice * 100).toFixed(2)}%. Net Yield: +$${profitIncrement.toFixed(2)} USD`
      }

      setLogs(prev => [...prev.slice(-30), newLog])

      // Periodic actual balance credit to user
      if (Math.random() > 0.65) {
        executeTrade({
          pair: selectedPair,
          side: 'BOT ARBITRAGE',
          amount: 500,
          price: sellPrice,
          type: 'ARBITRAGE',
          profit: profitIncrement,
          status: 'Completed'
        })
      }
    }, 4500)

    return () => clearInterval(interval)
  }, [isRunning, selectedPair, executeTrade])

  return (
    <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#B0F127]/10 border border-[#B0F127]/30 flex items-center justify-center text-[#B0F127]">
            <Cpu size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black text-white tracking-tight">
                PureX Autonomous AI Arbitrage Bot
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-[#B0F127]/10 text-[#B0F127] border border-[#B0F127]/20 flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${isRunning ? 'bg-[#B0F127] animate-ping' : 'bg-white/30'}`} />
                {isRunning ? 'ACTIVE HARVESTING' : 'PAUSED'}
              </span>
            </div>
            <p className="text-[11px] text-white/50 font-mono">
              Continuous 24/7 cross-DEX spread execution with MEV front-run shielding
            </p>
          </div>
        </div>

        {/* Start / Pause Controller */}
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-black transition-all flex items-center gap-2 shadow-md ${
            isRunning
              ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30 hover:bg-amber-400/30'
              : 'bg-[#B0F127] text-black hover:bg-[#9fe01c]'
          }`}
        >
          {isRunning ? (
            <>
              <Pause size={14} />
              Pause Bot Engine
            </>
          ) : (
            <>
              <Play size={14} />
              Resume Bot Engine
            </>
          )}
        </button>
      </div>

      {/* Bot Key Performance Indicators (Bento Grid) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-[#141414] rounded-xl border border-white/5">
          <span className="text-[10px] font-mono text-white/40 block">Cumulative Profit</span>
          <span className="text-base sm:text-lg font-black font-mono text-[#B0F127]">
            +${totalBotProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>

        <div className="p-3.5 bg-[#141414] rounded-xl border border-white/5">
          <span className="text-[10px] font-mono text-white/40 block">Win Rate</span>
          <span className="text-base sm:text-lg font-black font-mono text-emerald-400">
            99.7%
          </span>
        </div>

        <div className="p-3.5 bg-[#141414] rounded-xl border border-white/5">
          <span className="text-[10px] font-mono text-white/40 block">Cycles Executed</span>
          <span className="text-base sm:text-lg font-black font-mono text-white">
            {cyclesCompleted} Trades
          </span>
        </div>

        <div className="p-3.5 bg-[#141414] rounded-xl border border-white/5">
          <span className="text-[10px] font-mono text-white/40 block">Execution Speed</span>
          <span className="text-base sm:text-lg font-black font-mono text-cyan-400">
            3.8ms Flash
          </span>
        </div>
      </div>

      {/* Strategy Selection Chips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {STRATEGIES.map((strat) => {
          const isSelected = activeStrategy === strat.id
          return (
            <div
              key={strat.id}
              onClick={() => setActiveStrategy(strat.id)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-[#181f14] border-[#B0F127] shadow-[0_0_15px_rgba(176,241,39,0.15)]'
                  : 'bg-[#141414] border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white truncate">{strat.name}</span>
                <span className="text-[10px] font-mono font-bold text-[#B0F127]">{strat.estApy} APY</span>
              </div>
              <p className="text-[11px] text-white/60 line-clamp-2 leading-relaxed">{strat.desc}</p>
              <div className="flex items-center justify-between text-[10px] font-mono text-white/40 mt-2 pt-2 border-t border-white/5">
                <span>Speed: {strat.speed}</span>
                <span className="text-emerald-400">{strat.risk}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Real-time Streaming Algorithmic Console Log */}
      <div className="bg-[#070707] rounded-xl border border-white/10 p-4 font-mono text-xs flex flex-col gap-2">
        <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[10px] text-white/40">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-[#B0F127]" />
            <span className="text-white font-bold">PUREX MEV EXECUTION STREAM (STDOUT)</span>
          </div>
          <span>Buffer: 30 cycles</span>
        </div>

        <div className="max-h-44 overflow-y-auto space-y-1.5 text-[11px] select-text">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start gap-2 leading-tight">
              <span className="text-white/30 shrink-0">[{log.time}]</span>
              <span className={`px-1 rounded text-[9px] font-bold shrink-0 ${
                log.type === 'EXEC'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : log.type === 'SCAN'
                  ? 'bg-cyan-500/20 text-cyan-300'
                  : 'bg-white/10 text-white/60'
              }`}>
                {log.type}
              </span>
              <span className={log.type === 'EXEC' ? 'text-[#B0F127]' : 'text-white/80'}>
                {log.text}
              </span>
            </div>
          ))}
          <div ref={logEndRef} />
        </div>
      </div>
    </div>
  )
}
