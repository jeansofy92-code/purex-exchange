import { useState, useEffect, useRef, useMemo } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart2, 
  Maximize2, 
  Minimize2, 
  RefreshCw, 
  Layers, 
  Sliders, 
  Zap,
  Activity,
  Crosshair
} from 'lucide-react'

// Realistic initial candle historical data generator
function generateHistoricalCandles(basePrice, count = 50, volatility = 0.003) {
  const candles = []
  let currentClose = basePrice
  const now = Date.now()
  const intervalMs = 60 * 1000 // 1 minute intervals default

  for (let i = count; i >= 0; i--) {
    const time = new Date(now - i * intervalMs)
    const delta = (Math.random() - 0.48) * currentClose * volatility
    const open = currentClose
    const close = Math.max(open + delta, basePrice * 0.5)
    const high = Math.max(open, close) + Math.random() * currentClose * (volatility * 0.7)
    const low = Math.min(open, close) - Math.random() * currentClose * (volatility * 0.7)
    const volume = Math.floor(Math.random() * 45 + 5) * (basePrice > 1000 ? 0.8 : 80)

    candles.push({
      time,
      open,
      high,
      low,
      close,
      volume,
      isGreen: close >= open
    })
    currentClose = close
  }
  return candles
}

export default function TradingChart({ 
  pair = 'BTC/USDT', 
  currentPrice = 96420.50, 
  priceChange24h = +2.84,
  onPriceTick 
}) {
  const [timeframe, setTimeframe] = useState('1m')
  const [candles, setCandles] = useState(() => generateHistoricalCandles(currentPrice, 55, 0.0025))
  const [hoveredCandle, setHoveredCandle] = useState(null)
  const [showIndicators, setShowIndicators] = useState({ ema: true, volume: true, bollinger: false })
  const [isFullScreen, setIsFullScreen] = useState(false)
  const chartContainerRef = useRef(null)

  // Sync historical generator when pair changes
  useEffect(() => {
    setCandles(generateHistoricalCandles(currentPrice, 55, pair.includes('BTC') ? 0.002 : 0.004))
  }, [pair])

  // Live WebSocket Tick Simulation Engine
  useEffect(() => {
    const interval = setInterval(() => {
      setCandles((prevCandles) => {
        if (!prevCandles || prevCandles.length === 0) return prevCandles

        const last = { ...prevCandles[prevCandles.length - 1] }
        // Micro fluctuation
        const jitter = (Math.random() - 0.49) * last.close * 0.0006
        const newClose = Number((last.close + jitter).toFixed(2))
        const newHigh = Math.max(last.high, newClose)
        const newLow = Math.min(last.low, newClose)
        const newVol = last.volume + Math.random() * 0.4

        last.close = newClose
        last.high = newHigh
        last.low = newLow
        last.volume = newVol
        last.isGreen = newClose >= last.open

        if (onPriceTick) {
          onPriceTick(newClose)
        }

        return [...prevCandles.slice(0, -1), last]
      })
    }, 900)

    return () => clearInterval(interval)
  }, [onPriceTick])

  // Add new candle periodically depending on timeframe
  useEffect(() => {
    const intervalSecs = timeframe === '1s' ? 4 : timeframe === '1m' ? 45 : 120
    const candleTimer = setInterval(() => {
      setCandles((prev) => {
        if (!prev || prev.length === 0) return prev
        const last = prev[prev.length - 1]
        const nextOpen = last.close
        const nextCandle = {
          time: new Date(),
          open: nextOpen,
          high: nextOpen * 1.0002,
          low: nextOpen * 0.9998,
          close: nextOpen,
          volume: Math.random() * 10 + 2,
          isGreen: true
        }
        return [...prev.slice(1), nextCandle]
      })
    }, intervalSecs * 1000)

    return () => clearInterval(candleTimer)
  }, [timeframe])

  // Calculate EMA 20
  const ema20 = useMemo(() => {
    if (!candles || candles.length < 20) return []
    const k = 2 / (20 + 1)
    let prevEma = candles[0].close
    return candles.map((c, i) => {
      if (i === 0) return c.close
      const val = c.close * k + prevEma * (1 - k)
      prevEma = val
      return val
    })
  }, [candles])

  // Min / Max for scaling
  const { minPrice, maxPrice, maxVol } = useMemo(() => {
    if (!candles.length) return { minPrice: 1, maxPrice: 100, maxVol: 10 }
    let min = Infinity
    let max = -Infinity
    let maxV = 0
    candles.forEach((c) => {
      if (c.low < min) min = c.low
      if (c.high > max) max = c.high
      if (c.volume > maxV) maxV = c.volume
    })
    const padding = (max - min) * 0.08 || 1
    return { minPrice: min - padding, maxPrice: max + padding, maxVol: maxV || 1 }
  }, [candles])

  // Chart coordinates mapping
  const chartHeight = 340
  const volumeHeight = 60
  const totalSvgHeight = 420
  const candleWidth = 9
  const candleGap = 5
  const totalSvgWidth = Math.max(650, candles.length * (candleWidth + candleGap) + 80)

  const getY = (price) => {
    return chartHeight - ((price - minPrice) / (maxPrice - minPrice)) * (chartHeight - 40) - 20
  }

  const latestCandle = candles[candles.length - 1] || {}
  const activeCandle = hoveredCandle || latestCandle
  const currentSpread = (maxPrice - minPrice) > 0 ? (maxPrice - minPrice).toFixed(2) : '0.00'

  return (
    <div 
      ref={chartContainerRef}
      className={`bg-[#0d0d0d] border border-white/10 rounded-2xl flex flex-col overflow-hidden transition-all duration-300 ${
        isFullScreen ? 'fixed inset-4 z-50 shadow-2xl' : 'w-full'
      }`}
    >
      {/* Chart Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-white/10 bg-[#121212]">
        {/* Pair & Live Stats */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono font-black text-white text-base tracking-tight">{pair}</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#B0F127]/10 text-[#B0F127] border border-[#B0F127]/20 font-mono">
              PERP
            </span>
          </div>

          <div className="h-4 w-px bg-white/10 hidden sm:block" />

          {/* Real-time OHLC info */}
          <div className="hidden md:flex items-center gap-3 text-[11px] font-mono">
            <span className="text-white/40">O: <span className="text-white">${activeCandle.open?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></span>
            <span className="text-white/40">H: <span className="text-emerald-400">${activeCandle.high?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></span>
            <span className="text-white/40">L: <span className="text-rose-400">${activeCandle.low?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></span>
            <span className="text-white/40">C: <span className={activeCandle.isGreen ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>${activeCandle.close?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></span>
            <span className="text-white/40">Vol: <span className="text-white">{activeCandle.volume?.toFixed(2)}</span></span>
          </div>
        </div>

        {/* Timeframe & Indicators Switchers */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Timeframes */}
          <div className="flex items-center bg-[#181818] p-0.5 rounded-lg border border-white/10">
            {['1s', '1m', '5m', '15m', '1H', '4H', '1D'].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2 py-1 text-[11px] font-mono font-bold rounded transition-all ${
                  timeframe === tf
                    ? 'bg-[#B0F127] text-black shadow-sm'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Indicator toggles */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowIndicators(p => ({ ...p, ema: !p.ema }))}
              className={`px-2 py-1 text-[10px] font-mono rounded border transition-all ${
                showIndicators.ema
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/30'
                  : 'bg-white/5 text-white/40 border-white/10 hover:text-white'
              }`}
              title="Toggle EMA-20"
            >
              EMA 20
            </button>

            <button
              onClick={() => setShowIndicators(p => ({ ...p, volume: !p.volume }))}
              className={`px-2 py-1 text-[10px] font-mono rounded border transition-all ${
                showIndicators.volume
                  ? 'bg-cyan-400/20 text-cyan-300 border-cyan-400/30'
                  : 'bg-white/5 text-white/40 border-white/10 hover:text-white'
              }`}
              title="Toggle Volume Profile"
            >
              VOL
            </button>

            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-1.5 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all"
              title="Toggle Fullscreen"
            >
              {isFullScreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
          </div>
        </div>
      </div>

      {/* SVG Canvas Interactive Chart Area */}
      <div className="relative flex-1 bg-[#090909] overflow-x-auto overflow-y-hidden cursor-crosshair select-none">
        {/* Subtle Gridlines Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20 flex flex-col justify-between p-4">
          <div className="w-full border-b border-dashed border-white/15" />
          <div className="w-full border-b border-dashed border-white/15" />
          <div className="w-full border-b border-dashed border-white/15" />
          <div className="w-full border-b border-dashed border-white/15" />
        </div>

        {/* Live Websocket Pulse Badge */}
        <div className="absolute top-3 left-4 z-10 flex items-center gap-2 pointer-events-none bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[10px] font-mono font-semibold text-emerald-400">PUREX DEX FEED • LIVE</span>
        </div>

        {/* SVG Drawing */}
        <svg
          viewBox={`0 0 ${totalSvgWidth} ${totalSvgHeight}`}
          className="w-full h-full min-h-[380px]"
          preserveAspectRatio="none"
          onMouseLeave={() => setHoveredCandle(null)}
        >
          <defs>
            <linearGradient id="greenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#05C168" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#05C168" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="redGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF5A65" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FF5A65" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="emaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B0F127" />
            </linearGradient>
          </defs>

          {/* EMA 20 Line Overlay */}
          {showIndicators.ema && ema20.length > 1 && (
            <polyline
              fill="none"
              stroke="url(#emaGrad)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={candles
                .map((_, i) => {
                  const x = i * (candleWidth + candleGap) + candleWidth / 2 + 20
                  const y = getY(ema20[i])
                  return `${x},${y}`
                })
                .join(' ')}
            />
          )}

          {/* Current Live Price Horizontal Guideline */}
          {latestCandle.close && (
            <g>
              <line
                x1="0"
                y1={getY(latestCandle.close)}
                x2={totalSvgWidth}
                y2={getY(latestCandle.close)}
                stroke={latestCandle.isGreen ? '#05C168' : '#FF5A65'}
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.75"
              />
              {/* Right scale tag */}
              <rect
                x={totalSvgWidth - 75}
                y={getY(latestCandle.close) - 10}
                width="70"
                height="20"
                rx="4"
                fill={latestCandle.isGreen ? '#05C168' : '#FF5A65'}
              />
              <text
                x={totalSvgWidth - 40}
                y={getY(latestCandle.close) + 4}
                fill="#000"
                fontSize="10"
                fontFamily="var(--font-mono)"
                fontWeight="bold"
                textAnchor="middle"
              >
                ${latestCandle.close?.toFixed(1)}
              </text>
            </g>
          )}

          {/* Candlestick Glyphs & Volume Bars */}
          {candles.map((candle, idx) => {
            const x = idx * (candleWidth + candleGap) + 20
            const yOpen = getY(candle.open)
            const yClose = getY(candle.close)
            const yHigh = getY(candle.high)
            const yLow = getY(candle.low)

            const bodyY = Math.min(yOpen, yClose)
            const bodyHeight = Math.max(Math.abs(yClose - yOpen), 1.5)
            const fillColor = candle.isGreen ? 'url(#greenGrad)' : 'url(#redGrad)'
            const strokeColor = candle.isGreen ? '#05C168' : '#FF5A65'

            // Volume bar
            const volY = totalSvgHeight - (candle.volume / maxVol) * volumeHeight - 15
            const volH = (candle.volume / maxVol) * volumeHeight

            return (
              <g
                key={idx}
                onMouseEnter={() => setHoveredCandle(candle)}
                className="cursor-pointer group"
              >
                {/* Wick */}
                <line
                  x1={x + candleWidth / 2}
                  y1={yHigh}
                  x2={x + candleWidth / 2}
                  y2={yLow}
                  stroke={strokeColor}
                  strokeWidth="1.2"
                  opacity="0.85"
                />

                {/* Candle Body */}
                <rect
                  x={x}
                  y={bodyY}
                  width={candleWidth}
                  height={bodyHeight}
                  rx="1.5"
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth="0.8"
                />

                {/* Volume Bar Bottom */}
                {showIndicators.volume && (
                  <rect
                    x={x}
                    y={volY}
                    width={candleWidth}
                    height={Math.max(volH, 2)}
                    rx="1"
                    fill={candle.isGreen ? '#05C168' : '#FF5A65'}
                    opacity="0.35"
                  />
                )}
              </g>
            )
          })}
        </svg>

        {/* Floating Price Crosshair HUD */}
        {hoveredCandle && (
          <div className="absolute bottom-4 left-4 bg-[#141414]/90 backdrop-blur-md border border-white/10 px-3 py-2 rounded-xl text-xs font-mono text-white/90 shadow-xl pointer-events-none flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-white/40">Timestamp:</span>
              <span className="text-white font-bold">{hoveredCandle.time?.toLocaleTimeString()}</span>
            </div>
            <div className="h-3 w-px bg-white/10" />
            <div>
              <span className="text-white/40">Price: </span>
              <span className={hoveredCandle.isGreen ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                ${hoveredCandle.close?.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Chart Footer Stats Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#121212] border-t border-white/10 text-[11px] font-mono text-white/50">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            EMA (20): ${(ema20[ema20.length - 1] || currentPrice).toFixed(2)}
          </span>
          <span className="hidden sm:inline">Range Spread: ${currentSpread}</span>
        </div>

        <div className="flex items-center gap-2">
          <span>Match Engine: <span className="text-white font-bold">PureX L2 High-Speed</span></span>
          <span className="text-emerald-400">99.99% Uptime</span>
        </div>
      </div>
    </div>
  )
}
