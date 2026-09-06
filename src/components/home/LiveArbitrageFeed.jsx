import { useState, useEffect } from 'react'
import { ArrowRight, RefreshCw, CheckCircle } from 'lucide-react'
import ScrollReveal from '../common/ScrollReveal'

const LIVE_ARBITRAGE_EVENTS = [
  { id: 1, time: 'Just now', pair: 'BTC / USDT', buyEx: 'Binance', sellEx: 'Coinbase', spread: '+0.54%', profitUsd: '+$482.10', latency: '12ms', status: 'SETTLED' },
  { id: 2, time: '3s ago', pair: 'ETH / USDT', buyEx: 'Kraken', sellEx: 'OKX', spread: '+0.68%', profitUsd: '+$214.50', latency: '18ms', status: 'SETTLED' },
  { id: 3, time: '7s ago', pair: 'SOL / USDT', buyEx: 'Bybit', sellEx: 'KuCoin', spread: '+1.12%', profitUsd: '+$390.80', latency: '9ms', status: 'SETTLED' },
  { id: 4, time: '11s ago', pair: 'BNB / USDT', buyEx: 'Binance', sellEx: 'Gate.io', spread: '+0.42%', profitUsd: '+$128.40', latency: '15ms', status: 'SETTLED' },
  { id: 5, time: '16s ago', pair: 'AVAX / USDT', buyEx: 'OKX', sellEx: 'Coinbase', spread: '+0.95%', profitUsd: '+$175.20', latency: '14ms', status: 'SETTLED' },
  { id: 6, time: '22s ago', pair: 'NEAR / USDT', buyEx: 'Bybit', sellEx: 'Binance', spread: '+0.78%', profitUsd: '+$94.60', latency: '11ms', status: 'SETTLED' },
]

export default function LiveArbitrageFeed() {
  const [trades, setTrades] = useState(LIVE_ARBITRAGE_EVENTS)

  useEffect(() => {
    const timer = setInterval(() => {
      setTrades((prev) => {
        const pairs = ['BTC / USDT', 'ETH / USDT', 'SOL / USDT', 'XRP / USDT', 'DOGE / USDT', 'SUI / USDT']
        const exchanges = ['Binance', 'Coinbase', 'Kraken', 'OKX', 'Bybit', 'KuCoin']
        
        const randomPair = pairs[Math.floor(Math.random() * pairs.length)]
        const buy = exchanges[Math.floor(Math.random() * exchanges.length)]
        let sell = exchanges[Math.floor(Math.random() * exchanges.length)]
        while (sell === buy) {
          sell = exchanges[Math.floor(Math.random() * exchanges.length)]
        }
        
        const spreadNum = (Math.random() * 0.9 + 0.3).toFixed(2)
        const profitNum = (Math.random() * 450 + 60).toFixed(2)
        const latencyNum = Math.floor(Math.random() * 15 + 8)

        const newTrade = {
          id: Date.now(),
          time: 'Just now',
          pair: randomPair,
          buyEx: buy,
          sellEx: sell,
          spread: `+${spreadNum}%`,
          profitUsd: `+$${profitNum}`,
          latency: `${latencyNum}ms`,
          status: 'SETTLED'
        }

        return [newTrade, ...prev.slice(0, 5)]
      })
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="section-spacing" style={{ backgroundColor: '#060606' }}>
      <div className="container-max">
        <ScrollReveal>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            <div>
              <div className="pill-badge" style={{ marginBottom: '1rem' }}>
                <span className="pill-dot" />
                Real-Time Execution Stream
              </div>
              <h2 className="display-2">
                Live arbitrage <span className="color-accent-1">profit executions.</span>
              </h2>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              backgroundColor: '#111111',
              border: '1px solid #232323',
              padding: '0.5rem 1rem',
              borderRadius: '999px',
              fontSize: '0.85rem',
              color: '#B0F127',
              fontWeight: 700
            }}>
              <RefreshCw size={14} className="animate-spin" />
              2,480 Arbitrage Trades / Minute
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="finantech-card" style={{ padding: '1.5rem', overflowX: 'auto', backgroundColor: '#111111' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #232323', color: '#717172', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>Asset / Market</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Arbitrage Route</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Discrepancy Spread</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Net Profit Realized</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Speed</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {trades.map((trade) => (
                  <tr 
                    key={trade.id}
                    style={{
                      borderBottom: '1px solid #181818',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#161616'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={{ padding: '1rem', fontWeight: 700, color: '#fff' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: '#B0F127'
                        }} />
                        {trade.pair}
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                        <span style={{ color: '#e7e7e7', backgroundColor: '#181818', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>{trade.buyEx}</span>
                        <ArrowRight size={14} color="#B0F127" />
                        <span style={{ color: '#B0F127', backgroundColor: '#181818', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>{trade.sellEx}</span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem', color: '#B0F127', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                      {trade.spread}
                    </td>
                    <td style={{ padding: '1rem', color: '#fff', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                      {trade.profitUsd}
                    </td>
                    <td style={{ padding: '1rem', color: '#939393', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
                      {trade.latency}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <span style={{
                        backgroundColor: '#16231a',
                        color: '#05C168',
                        border: '1px solid #1f3d29',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '999px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}>
                        <CheckCircle size={12} />
                        {trade.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
