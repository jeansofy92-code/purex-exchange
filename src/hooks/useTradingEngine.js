import { useState, useEffect, useMemo, useCallback } from 'react'
import { initialCoinsList } from '../data/marketsData'

// Generate initial candlestick history for a given base price
function generateInitialCandles(basePrice, count = 40) {
  const candles = []
  let currentClose = basePrice * 0.96
  const now = Date.now()
  const intervalMs = 60 * 1000 * 15 // 15m intervals

  for (let i = count; i >= 0; i--) {
    const time = new Date(now - i * intervalMs)
    const volatility = currentClose * 0.008
    const open = currentClose
    const change = (Math.random() - 0.48) * volatility
    const close = Math.max(open * 0.5, open + change)
    const high = Math.max(open, close) + Math.random() * volatility * 0.6
    const low = Math.min(open, close) - Math.random() * volatility * 0.6
    const volume = Math.round(10 + Math.random() * 85)

    candles.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: time.getTime(),
      open,
      high,
      low,
      close,
      volume,
      isUp: close >= open,
    })
    currentClose = close
  }

  return candles
}

// Generate order book bids and asks
function generateOrderBook(midPrice) {
  const step = midPrice < 1 ? 0.0001 : midPrice < 10 ? 0.01 : midPrice < 100 ? 0.1 : 1
  const asks = []
  const bids = []

  let askCum = 0
  for (let i = 1; i <= 8; i++) {
    const price = midPrice + i * step * (1 + Math.random() * 0.5)
    const size = +(Math.random() * (midPrice < 10 ? 2000 : midPrice < 1000 ? 15 : 1.2) + 0.1).toFixed(4)
    askCum += size
    asks.push({ price, size, total: +askCum.toFixed(4) })
  }

  let bidCum = 0
  for (let i = 1; i <= 8; i++) {
    const price = Math.max(0.0001, midPrice - i * step * (1 + Math.random() * 0.5))
    const size = +(Math.random() * (midPrice < 10 ? 2000 : midPrice < 1000 ? 15 : 1.2) + 0.1).toFixed(4)
    bidCum += size
    bids.push({ price, size, total: +bidCum.toFixed(4) })
  }

  return {
    asks: asks.reverse(),
    bids,
    spread: +(asks[asks.length - 1]?.price - bids[0]?.price || step).toFixed(4),
  }
}

// Generate initial recent trades
function generateRecentTrades(midPrice) {
  const trades = []
  const now = Date.now()
  for (let i = 0; i < 15; i++) {
    const isBuy = Math.random() > 0.48
    const price = midPrice + (Math.random() - 0.5) * (midPrice * 0.002)
    const amount = +(Math.random() * (midPrice < 10 ? 1500 : midPrice < 1000 ? 8 : 0.8) + 0.05).toFixed(4)
    trades.push({
      id: `trade-${now - i * 3000}`,
      price: price.toFixed(midPrice < 1 ? 4 : 2),
      rawPrice: price,
      amount,
      time: new Date(now - i * 4000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      isBuy,
    })
  }
  return trades
}

export function useTradingEngine(initialPairSymbol = 'BTC') {
  // Find current active pair from data
  const [activeSymbol, setActiveSymbol] = useState(initialPairSymbol)
  const [timeframe, setTimeframe] = useState('15m')
  const [chartMode, setChartMode] = useState('candles') // 'candles' | 'line'
  const [tradeMode, setTradeMode] = useState('spot') // 'spot' | 'futures'
  const [leverage, setLeverage] = useState(10) // 1x to 50x

  // Active Coin Info
  const activeCoin = useMemo(() => {
    return initialCoinsList.find((c) => c.symbol === activeSymbol) || initialCoinsList[0]
  }, [activeSymbol])

  // Live Price & Tick State
  const [currentPrice, setCurrentPrice] = useState(activeCoin.rawPrice)
  const [priceFlash, setPriceFlash] = useState(null) // 'up' | 'down' | null
  const [candles, setCandles] = useState(() => generateInitialCandles(activeCoin.rawPrice, 36))
  const [orderBook, setOrderBook] = useState(() => generateOrderBook(activeCoin.rawPrice))
  const [recentTrades, setRecentTrades] = useState(() => generateRecentTrades(activeCoin.rawPrice))

  // User Wallet & Order Book State
  const [balances, setBalances] = useState({
    USDT: 28450.00,
    BTC: 0.4850,
    ETH: 4.2500,
    SOL: 32.40,
    PUREX: 2500.00,
  })

  const [openOrders, setOpenOrders] = useState([
    {
      id: 'ord-101',
      pair: 'BTC/USDT',
      type: 'Limit',
      side: 'Buy',
      price: '64,200.00',
      rawPrice: 64200.00,
      amount: '0.1500',
      filled: '0.0000',
      total: '$9,630.00',
      time: '11:24:10',
      status: 'Open',
    },
    {
      id: 'ord-102',
      pair: 'SOL/USDT',
      type: 'Limit',
      side: 'Sell',
      price: '165.00',
      rawPrice: 165.00,
      amount: '5.0000',
      filled: '0.0000',
      total: '$825.00',
      time: '11:42:05',
      status: 'Open',
    },
  ])

  const [positions, setPositions] = useState([
    {
      id: 'pos-1',
      pair: 'BTC/USDT',
      side: 'Long',
      leverage: 10,
      size: '0.2500 BTC',
      entryPrice: '65,800.00',
      rawEntryPrice: 65800.00,
      markPrice: '66,542.20',
      liqPrice: '59,850.00',
      margin: '$1,645.00',
      pnl: '+$185.55',
      rawPnl: 185.55,
      pnlPercent: '+11.28%',
      positive: true,
    },
    {
      id: 'pos-2',
      pair: 'ETH/USDT',
      side: 'Short',
      leverage: 5,
      size: '2.0000 ETH',
      entryPrice: '3,250.00',
      rawEntryPrice: 3250.00,
      markPrice: '3,215.67',
      liqPrice: '3,840.00',
      margin: '$1,300.00',
      pnl: '+$68.66',
      rawPnl: 68.66,
      pnlPercent: '+5.28%',
      positive: true,
    },
  ])

  const [tradeHistory, setTradeHistory] = useState([
    {
      id: 'th-1',
      pair: 'PUREX/USDT',
      side: 'Buy',
      type: 'Market',
      price: '4.20',
      amount: '500.00',
      fee: '$2.10',
      total: '$2,100.00',
      time: '10:15:32',
    },
    {
      id: 'th-2',
      pair: 'SOL/USDT',
      side: 'Buy',
      type: 'Limit',
      price: '144.50',
      amount: '10.00',
      fee: '$1.44',
      total: '$1,445.00',
      time: '09:40:18',
    },
  ])

  // Notification Toast state
  const [toastMessage, setToastMessage] = useState(null)

  const showToast = useCallback((msg, type = 'success') => {
    setToastMessage({ msg, type, id: Date.now() })
    setTimeout(() => setToastMessage(null), 4000)
  }, [])

  // Sync state when active coin changes
  useEffect(() => {
    setCurrentPrice(activeCoin.rawPrice)
    setCandles(generateInitialCandles(activeCoin.rawPrice, 36))
    setOrderBook(generateOrderBook(activeCoin.rawPrice))
    setRecentTrades(generateRecentTrades(activeCoin.rawPrice))
  }, [activeCoin])

  // Real-time micro-fluctuations engine
  useEffect(() => {
    const interval = setInterval(() => {
      const deltaPercent = (Math.random() - 0.49) * 0.003
      const nextPrice = Math.max(0.0001, currentPrice * (1 + deltaPercent))
      const isUp = nextPrice >= currentPrice

      setCurrentPrice(nextPrice)
      setPriceFlash(isUp ? 'up' : 'down')
      setTimeout(() => setPriceFlash(null), 800)

      // Update recent trades
      const newTrade = {
        id: `trade-${Date.now()}`,
        price: nextPrice.toFixed(nextPrice < 1 ? 4 : 2),
        rawPrice: nextPrice,
        amount: +(Math.random() * (nextPrice < 10 ? 800 : nextPrice < 1000 ? 5 : 0.4) + 0.02).toFixed(4),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        isBuy: isUp,
      }
      setRecentTrades((prev) => [newTrade, ...prev.slice(0, 19)])

      // Update Order Book
      setOrderBook(generateOrderBook(nextPrice))

      // Update Latest Candle
      setCandles((prev) => {
        if (!prev.length) return prev
        const last = { ...prev[prev.length - 1] }
        last.close = nextPrice
        last.high = Math.max(last.high, nextPrice)
        last.low = Math.min(last.low, nextPrice)
        last.volume += 1
        last.isUp = last.close >= last.open
        return [...prev.slice(0, prev.length - 1), last]
      })

      // Update Positions PnL
      setPositions((prev) =>
        prev.map((pos) => {
          if (pos.pair.startsWith(activeSymbol)) {
            const entry = pos.rawEntryPrice
            const diff = pos.side === 'Long' ? nextPrice - entry : entry - nextPrice
            const pnlValue = (diff / entry) * parseFloat(pos.margin.replace(/[$,]/g, '')) * pos.leverage
            const pnlPct = ((diff / entry) * pos.leverage * 100).toFixed(2)

            return {
              ...pos,
              markPrice: nextPrice.toLocaleString('en-US', {
                minimumFractionDigits: nextPrice < 1 ? 4 : 2,
                maximumFractionDigits: nextPrice < 1 ? 4 : 2,
              }),
              rawPnl: pnlValue,
              pnl: `${pnlValue >= 0 ? '+' : ''}$${pnlValue.toFixed(2)}`,
              pnlPercent: `${pnlPct >= 0 ? '+' : ''}${pnlPct}%`,
              positive: pnlValue >= 0,
            }
          }
          return pos
        })
      )
    }, 2500)

    return () => clearInterval(interval)
  }, [currentPrice, activeSymbol])

  // Place Order Action
  const placeOrder = useCallback(
    ({ orderType, side, price, amount, total }) => {
      const numPrice = parseFloat(price) || currentPrice
      const numAmount = parseFloat(amount) || 0
      const numTotal = parseFloat(total) || numPrice * numAmount

      if (numAmount <= 0) {
        showToast('Please enter a valid order amount', 'error')
        return false
      }

      if (side === 'Buy' && balances.USDT < numTotal) {
        showToast('Insufficient USDT balance for this trade', 'error')
        return false
      }

      if (side === 'Sell') {
        const coinBal = balances[activeSymbol] || 0
        if (coinBal < numAmount) {
          showToast(`Insufficient ${activeSymbol} balance to sell`, 'error')
          return false
        }
      }

      // If Market order, execute immediately
      if (orderType === 'Market') {
        if (side === 'Buy') {
          setBalances((prev) => ({
            ...prev,
            USDT: prev.USDT - numTotal,
            [activeSymbol]: (prev[activeSymbol] || 0) + numAmount,
          }))
        } else {
          setBalances((prev) => ({
            ...prev,
            USDT: prev.USDT + numTotal,
            [activeSymbol]: (prev[activeSymbol] || 0) - numAmount,
          }))
        }

        const newTrade = {
          id: `th-${Date.now()}`,
          pair: `${activeSymbol}/USDT`,
          side,
          type: orderType,
          price: numPrice.toFixed(numPrice < 1 ? 4 : 2),
          amount: numAmount.toFixed(4),
          fee: `$${(numTotal * 0.001).toFixed(2)}`,
          total: `$${numTotal.toFixed(2)}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        }
        setTradeHistory((prev) => [newTrade, ...prev])

        showToast(`Market ${side} order executed for ${numAmount} ${activeSymbol}!`, 'success')
      } else {
        // Limit order -> add to open orders
        const newOrder = {
          id: `ord-${Date.now()}`,
          pair: `${activeSymbol}/USDT`,
          type: orderType,
          side,
          price: numPrice.toLocaleString('en-US', { minimumFractionDigits: 2 }),
          rawPrice: numPrice,
          amount: numAmount.toFixed(4),
          filled: '0.0000',
          total: `$${numTotal.toFixed(2)}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          status: 'Open',
        }
        setOpenOrders((prev) => [newOrder, ...prev])

        if (side === 'Buy') {
          setBalances((prev) => ({ ...prev, USDT: prev.USDT - numTotal }))
        } else {
          setBalances((prev) => ({ ...prev, [activeSymbol]: (prev[activeSymbol] || 0) - numAmount }))
        }

        showToast(`Limit ${side} order placed at $${numPrice.toLocaleString()}`, 'success')
      }

      return true
    },
    [activeSymbol, balances, currentPrice, showToast]
  )

  // Cancel Open Order
  const cancelOrder = useCallback(
    (orderId) => {
      const ord = openOrders.find((o) => o.id === orderId)
      if (!ord) return

      // Refund balance
      const [baseCoin] = ord.pair.split('/')
      const totalNum = parseFloat(ord.total.replace(/[$,]/g, '')) || 0
      const amtNum = parseFloat(ord.amount) || 0

      if (ord.side === 'Buy') {
        setBalances((prev) => ({ ...prev, USDT: prev.USDT + totalNum }))
      } else {
        setBalances((prev) => ({ ...prev, [baseCoin]: (prev[baseCoin] || 0) + amtNum }))
      }

      setOpenOrders((prev) => prev.filter((o) => o.id !== orderId))
      showToast(`Order ${ord.id} cancelled successfully`, 'info')
    },
    [openOrders, showToast]
  )

  // Close Position
  const closePosition = useCallback(
    (posId) => {
      const pos = positions.find((p) => p.id === posId)
      if (!pos) return

      const marginNum = parseFloat(pos.margin.replace(/[$,]/g, '')) || 0
      const pnlNum = pos.rawPnl || 0
      const netReturn = marginNum + pnlNum

      setBalances((prev) => ({ ...prev, USDT: Math.max(0, prev.USDT + netReturn) }))
      setPositions((prev) => prev.filter((p) => p.id !== posId))
      showToast(`Closed ${pos.pair} position with PnL: ${pos.pnl}`, pos.positive ? 'success' : 'warning')
    },
    [positions, showToast]
  )

  // Add Demo Funds shortcut
  const addDemoFunds = useCallback(() => {
    setBalances((prev) => ({
      ...prev,
      USDT: prev.USDT + 10000,
    }))
    showToast('+$10,000 USDT Demo Capital credited to your wallet!', 'success')
  }, [showToast])

  return {
    activeSymbol,
    setActiveSymbol,
    activeCoin,
    currentPrice,
    priceFlash,
    timeframe,
    setTimeframe,
    chartMode,
    setChartMode,
    tradeMode,
    setTradeMode,
    leverage,
    setLeverage,
    candles,
    orderBook,
    recentTrades,
    balances,
    openOrders,
    positions,
    tradeHistory,
    placeOrder,
    cancelOrder,
    closePosition,
    addDemoFunds,
    toastMessage,
    coinsList: initialCoinsList,
  }
}
