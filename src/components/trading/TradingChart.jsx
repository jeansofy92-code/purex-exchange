import { useState, useMemo } from 'react'
import {
  CandlestickChart,
  LineChart,
} from 'lucide-react'


function TradingChart({
  candles,
  currentPrice,
  activeSymbol,
  timeframe,
  setTimeframe,
  chartMode,
  setChartMode,
}) {
  const [hoveredCandle, setHoveredCandle] = useState(null)
  const [showEMA, setShowEMA] = useState(true)
  const [showVolume, setShowVolume] = useState(true)

  // Calculations for chart bounds
  const chartData = useMemo(() => {
    if (!candles || candles.length === 0) return null

    let minPrice = Infinity
    let maxPrice = -Infinity
    let maxVolume = 0

    candles.forEach((c) => {
      if (c.low < minPrice) minPrice = c.low
      if (c.high > maxPrice) maxPrice = c.high
      if (c.volume > maxVolume) maxVolume = c.volume
    })

    const padding = (maxPrice - minPrice) * 0.08 || maxPrice * 0.02
    minPrice = Math.max(0, minPrice - padding)
    maxPrice = maxPrice + padding
    const priceRange = maxPrice - minPrice || 1

    // Calculate EMA 20
    const k20 = 2 / (20 + 1)
    let prevEma20 = candles[0].close
    const ema20Points = candles.map((c, i) => {
      const ema = i === 0 ? c.close : c.close * k20 + prevEma20 * (1 - k20)
      prevEma20 = ema
      return ema
    })

    // Calculate EMA 50
    const k50 = 2 / (50 + 1)
    let prevEma50 = candles[0].close
    const ema50Points = candles.map((c, i) => {
      const ema = i === 0 ? c.close : c.close * k50 + prevEma50 * (1 - k50)
      prevEma50 = ema
      return ema
    })

    return {
      minPrice,
      maxPrice,
      priceRange,
      maxVolume: maxVolume || 100,
      ema20Points,
      ema50Points,
    }
  }, [candles])

  const timeframes = ['1m', '5m', '15m', '1H', '4H', '1D', '1W']

  // SVG Dimension constants
  const svgWidth = 800
  const svgHeight = 420
  const chartHeight = 330
  const volumeHeight = 70
  const rightAxisWidth = 70
  const plotWidth = svgWidth - rightAxisWidth

  const candleCount = candles.length || 1
  const candleWidth = (plotWidth / candleCount) * 0.68
  const candleStep = plotWidth / candleCount

  const getPriceY = (price) => {
    if (!chartData) return 0
    return chartHeight - ((price - chartData.minPrice) / chartData.priceRange) * chartHeight
  }

  const getVolumeY = (vol) => {
    if (!chartData) return svgHeight
    const barH = (vol / chartData.maxVolume) * volumeHeight
    return svgHeight - barH
  }

  // Active or hovered data
  const displayedCandle = hoveredCandle || (candles.length > 0 ? candles[candles.length - 1] : null)

  const currentPriceY = getPriceY(currentPrice)

  return (
    <div className="flex flex-col h-full bg-[#0b0e24] border-r border-b border-white/10 select-none">
      {/* Chart Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 border-b border-white/10 bg-[#0f132e]">
        {/* Timeframe Pills */}
        <div className="flex items-center gap-1">
          {timeframes.map((tf) => (
            <button
              key={tf}
              type="button"
              onClick={() => setTimeframe(tf)}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                timeframe === tf
                  ? 'bg-[#ff7a00] text-white shadow-[0_0_10px_rgba(255,122,0,0.35)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Indicators & Type Toggle */}
        <div className="flex items-center gap-2">
          {/* Chart Type (Candles vs Line) */}
          <div className="flex items-center rounded-lg bg-black/40 border border-white/10 p-0.5">
            <button
              type="button"
              onClick={() => setChartMode('candles')}
              className={`p-1.5 rounded-md transition-colors ${
                chartMode === 'candles' ? 'bg-white/15 text-[#ff7a00]' : 'text-slate-400 hover:text-white'
              }`}
              title="Candlestick Chart"
            >
              <CandlestickChart size={14} />
            </button>
            <button
              type="button"
              onClick={() => setChartMode('line')}
              className={`p-1.5 rounded-md transition-colors ${
                chartMode === 'line' ? 'bg-white/15 text-[#ff7a00]' : 'text-slate-400 hover:text-white'
              }`}
              title="Line Area Chart"
            >
              <LineChart size={14} />
            </button>
          </div>

          {/* Indicators Toggle */}
          <button
            type="button"
            onClick={() => setShowEMA(!showEMA)}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
              showEMA
                ? 'bg-[#ff7a00]/20 border-[#ff7a00]/40 text-[#ff7a00]'
                : 'bg-transparent border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            EMA (20/50)
          </button>

          <button
            type="button"
            onClick={() => setShowVolume(!showVolume)}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
              showVolume
                ? 'bg-[#ff7a00]/20 border-[#ff7a00]/40 text-[#ff7a00]'
                : 'bg-transparent border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            Vol
          </button>
        </div>
      </div>

      {/* OHLC Bar Top Info */}
      {displayedCandle && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-1.5 bg-[#0e122b]/90 text-[0.72rem] border-b border-white/5 text-slate-400">
          <div><span className="text-white font-semibold">{activeSymbol}/USDT</span></div>
          <div>O: <span className="text-white font-semibold">${displayedCandle.open?.toFixed(2)}</span></div>
          <div>H: <span className="text-white font-semibold">${displayedCandle.high?.toFixed(2)}</span></div>
          <div>L: <span className="text-white font-semibold">${displayedCandle.low?.toFixed(2)}</span></div>
          <div>C: <span className="text-white font-semibold">${displayedCandle.close?.toFixed(2)}</span></div>
          <div>
            Change:{' '}
            <span
              className={`font-bold ${
                displayedCandle.close >= displayedCandle.open ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {((displayedCandle.close - displayedCandle.open) / displayedCandle.open * 100).toFixed(2)}%
            </span>
          </div>
          <div>Vol: <span className="text-white font-semibold">{displayedCandle.volume} BTC</span></div>
          {showEMA && (
            <>
              <div className="text-sky-400 font-bold">EMA 20</div>
              <div className="text-amber-400 font-bold">EMA 50</div>
            </>
          )}
        </div>
      )}

      {/* SVG Canvas Area */}
      <div className="relative flex-1 min-h-[360px] w-full overflow-hidden">
        {chartData && (
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            preserveAspectRatio="none"
            className="w-full h-full"
            onMouseLeave={() => setHoveredCandle(null)}
          >
            <defs>
              {/* Line chart area gradient */}
              <linearGradient id="chartAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff7a00" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#ff7a00" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Gridlines */}
            {[0.2, 0.4, 0.6, 0.8].map((ratio) => {
              const y = chartHeight * ratio
              const priceVal = chartData.maxPrice - chartData.priceRange * ratio
              return (
                <g key={ratio}>
                  <line
                    x1="0"
                    y1={y}
                    x2={plotWidth}
                    y2={y}
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeDasharray="3 3"
                  />
                  <text
                    x={plotWidth + 8}
                    y={y + 3}
                    fill="#94a3b8"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    ${priceVal.toFixed(2)}
                  </text>
                </g>
              )
            })}

            {/* Vertical Time Gridlines */}
            {candles.map((c, i) => {
              if (i % 6 !== 0) return null
              const x = i * candleStep + candleStep / 2
              return (
                <g key={c.timestamp}>
                  <line
                    x1={x}
                    y1="0"
                    x2={x}
                    y2={chartHeight}
                    stroke="rgba(255, 255, 255, 0.04)"
                  />
                  <text
                    x={x - 12}
                    y={svgHeight - 6}
                    fill="#94a3b8"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    {c.time}
                  </text>
                </g>
              )
            })}

            {/* Volume Bars */}
            {showVolume &&
              candles.map((c, i) => {
                const x = i * candleStep + (candleStep - candleWidth) / 2
                const y = getVolumeY(c.volume)
                const h = svgHeight - y

                return (
                  <rect
                    key={`vol-${c.timestamp}`}
                    x={x}
                    y={y}
                    width={candleWidth}
                    height={h}
                    fill={c.isUp ? 'rgba(16, 185, 129, 0.35)' : 'rgba(244, 63, 94, 0.35)'}
                  />
                )
              })}

            {/* Candlesticks Mode */}
            {chartMode === 'candles' &&
              candles.map((c, i) => {
                const cx = i * candleStep + candleStep / 2
                const x = cx - candleWidth / 2
                const highY = getPriceY(c.high)
                const lowY = getPriceY(c.low)
                const openY = getPriceY(c.open)
                const closeY = getPriceY(c.close)

                const candleBodyY = Math.min(openY, closeY)
                const candleBodyH = Math.max(2, Math.abs(closeY - openY))
                const color = c.isUp ? '#10b981' : '#f43f5e'

                return (
                  <g
                    key={`candle-${c.timestamp}`}
                    onMouseEnter={() => setHoveredCandle(c)}
                    className="cursor-crosshair"
                  >
                    {/* Wick */}
                    <line
                      x1={cx}
                      y1={highY}
                      x2={cx}
                      y2={lowY}
                      stroke={color}
                      strokeWidth="1.2"
                    />
                    {/* Body */}
                    <rect
                      x={x}
                      y={candleBodyY}
                      width={candleWidth}
                      height={candleBodyH}
                      fill={color}
                      stroke={color}
                      strokeWidth="1"
                      rx="1"
                    />
                  </g>
                )
              })}

            {/* Line Mode */}
            {chartMode === 'line' && (
              <>
                {/* Area Fill */}
                <polygon
                  points={`0,${chartHeight} ${candles
                    .map((c, i) => `${i * candleStep + candleStep / 2},${getPriceY(c.close)}`)
                    .join(' ')} ${plotWidth},${chartHeight}`}
                  fill="url(#chartAreaGrad)"
                />
                {/* Polyline */}
                <polyline
                  points={candles
                    .map((c, i) => `${i * candleStep + candleStep / 2},${getPriceY(c.close)}`)
                    .join(' ')}
                  fill="none"
                  stroke="#ff7a00"
                  strokeWidth="2.5"
                />
              </>
            )}

            {/* Technical Indicators: EMA 20 (Cyan) & EMA 50 (Yellow) */}
            {showEMA && chartData && (
              <>
                <polyline
                  points={chartData.ema20Points
                    .map((ema, i) => `${i * candleStep + candleStep / 2},${getPriceY(ema)}`)
                    .join(' ')}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                  opacity="0.85"
                />
                <polyline
                  points={chartData.ema50Points
                    .map((ema, i) => `${i * candleStep + candleStep / 2},${getPriceY(ema)}`)
                    .join(' ')}
                  fill="none"
                  stroke="#facc15"
                  strokeWidth="1.5"
                  opacity="0.85"
                />
              </>
            )}

            {/* Current Price Pulsating Dashed Line */}
            <line
              x1="0"
              y1={currentPriceY}
              x2={plotWidth}
              y2={currentPriceY}
              stroke="#ff7a00"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            {/* Current Price Axis Badge */}
            <g transform={`translate(${plotWidth}, ${currentPriceY - 10})`}>
              <rect
                x="0"
                y="0"
                width={rightAxisWidth}
                height="20"
                fill="#271c42"
                stroke="#ff7a00"
                strokeWidth="1"
                rx="4"
              />
              <text
                x="6"
                y="14"
                fill="#ff7a00"
                fontSize="10"
                fontWeight="bold"
                fontFamily="monospace"
              >
                ${currentPrice.toFixed(2)}
              </text>
            </g>
          </svg>
        )}
      </div>
    </div>
  )
}

export default TradingChart
