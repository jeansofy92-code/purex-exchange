import { useState, useEffect } from 'react'
import { 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Zap, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  Lock,
  ArrowUpRight,
  RefreshCw,
  Coins
} from 'lucide-react'

export default function HomeHero() {
  const [activeSpread, setActiveSpread] = useState(0)

  const simulatedTrades = [
    { pair: 'BTC / USDT', buyEx: 'Binance', buyPrice: '$89,320', sellEx: 'Coinbase', sellPrice: '$89,510', profit: '+$190.00 (+0.46%)', ms: '12ms' },
    { pair: 'ETH / USDT', buyEx: 'Kraken', buyPrice: '$3,440.10', sellEx: 'OKX', sellPrice: '$3,458.80', profit: '+$18.70 (+0.54%)', ms: '16ms' },
    { pair: 'SOL / USDT', buyEx: 'Bybit', buyPrice: '$193.40', sellEx: 'KuCoin', sellPrice: '$195.10', profit: '+$1.70 (+0.88%)', ms: '9ms' },
    { pair: 'AVAX / USDT', buyEx: 'Binance', buyPrice: '$41.80', sellEx: 'Gate.io', sellPrice: '$42.35', profit: '+$0.55 (+1.31%)', ms: '14ms' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSpread((prev) => (prev + 1) % simulatedTrades.length)
    }, 3200)
    return () => clearInterval(interval)
  }, [])

  const currentTrade = simulatedTrades[activeSpread]

  return (
    <section style={{
      position: 'relative',
      paddingTop: '4.5rem',
      paddingBottom: '5rem',
      overflow: 'hidden'
    }}>
      {/* Background Subtle Accent Glow */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(176, 241, 39, 0.07) 0%, rgba(6, 6, 6, 0) 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container-max" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          alignItems: 'center',
          gap: '4rem'
        }}>
          {/* Left Column: Hero Text */}
          <div style={{ maxWidth: '580px' }}>
            {/* Pill Badge */}
            <div className="pill-badge" style={{ marginBottom: '1.75rem' }}>
              <span className="pill-dot" />
              Automated Crypto Arbitrage & Daily Yields
            </div>

            {/* Display 1 Title */}
            <h1 className="display-1" style={{ marginBottom: '1.5rem' }}>
              Daily crypto returns powered by <span className="color-accent-1">quant arbitrage.</span>
            </h1>

            {/* Explanatory Paragraph */}
            <p style={{
              fontSize: '1.125rem',
              color: '#c5c5c5',
              lineHeight: 1.65,
              marginBottom: '2.5rem'
            }}>
              Purex makes high-yield crypto investing effortless. Our high-frequency trading bots and expert quant teams trade market price discrepancies 24/7 across global exchanges to deliver consistent daily profits with a <strong style={{ color: '#fff', borderBottom: '1px solid #B0F127' }}>100% Capital Insurance Guarantee</strong>.
            </p>

            {/* Buttons Row */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '3rem'
            }}>
              <a href="#packages" className="btn-primary">
                Explore Investment Packages
                <ArrowRight size={18} strokeWidth={2.5} />
              </a>
              <a href="#calculator" className="btn-secondary">
                Calculate Daily ROI
              </a>
            </div>

            {/* Key Trust Checkmarks */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
              borderTop: '1px solid #1f1f1f',
              paddingTop: '1.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle2 size={18} color="#B0F127" />
                <span style={{ fontSize: '0.875rem', color: '#e7e7e7', fontWeight: 600 }}>100% Capital Insurance</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle2 size={18} color="#B0F127" />
                <span style={{ fontSize: '0.875rem', color: '#e7e7e7', fontWeight: 600 }}>Automated Daily Payouts</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle2 size={18} color="#B0F127" />
                <span style={{ fontSize: '0.875rem', color: '#e7e7e7', fontWeight: 600 }}>Institutional Quant Desks</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle2 size={18} color="#B0F127" />
                <span style={{ fontSize: '0.875rem', color: '#e7e7e7', fontWeight: 600 }}>Instant Withdrawals</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Arbitrage Engine Mockup */}
          <div style={{ position: 'relative' }}>
            {/* Main Interactive Terminal Card */}
            <div className="finantech-card finantech-card-highlight" style={{ padding: '2rem' }}>
              {/* Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #282828',
                paddingBottom: '1.25rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: '#B0F127',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Zap size={18} color="#060606" strokeWidth={2.5} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>Purex Multi-Exchange Engine</div>
                    <div style={{ fontSize: '0.75rem', color: '#717172' }}>Real-time Arbitrage Discrepancy Stream</div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.75rem',
                  color: '#B0F127',
                  backgroundColor: 'rgba(176, 241, 39, 0.1)',
                  padding: '0.3rem 0.65rem',
                  borderRadius: '999px',
                  fontWeight: 700
                }}>
                  <RefreshCw size={12} className="animate-spin" /> LIVE SPREAD
                </div>
              </div>

              {/* Active Arbitrage Execution Block */}
              <div style={{
                backgroundColor: '#0a0a0a',
                border: '1px solid #232323',
                borderRadius: '16px',
                padding: '1.25rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#e7e7e7', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Coins size={16} color="#B0F127" /> {currentTrade.pair}
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    color: '#939393',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    Latency: <strong style={{ color: '#B0F127' }}>{currentTrade.ms}</strong>
                  </span>
                </div>

                {/* Triangular route */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto 1fr',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{ backgroundColor: '#141414', padding: '0.75rem', borderRadius: '10px', border: '1px solid #232323' }}>
                    <div style={{ fontSize: '0.7rem', color: '#717172', textTransform: 'uppercase' }}>BUY ON {currentTrade.buyEx}</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)' }}>{currentTrade.buyPrice}</div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <ArrowRight size={20} color="#B0F127" />
                  </div>

                  <div style={{ backgroundColor: '#141414', padding: '0.75rem', borderRadius: '10px', border: '1px solid #232323' }}>
                    <div style={{ fontSize: '0.7rem', color: '#717172', textTransform: 'uppercase' }}>SELL ON {currentTrade.sellEx}</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#B0F127', fontFamily: 'var(--font-mono)' }}>{currentTrade.sellPrice}</div>
                  </div>
                </div>

                {/* Realized Profit */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid #1a1a1a'
                }}>
                  <span style={{ fontSize: '0.8rem', color: '#939393' }}>Realized Net Arbitrage Profit:</span>
                  <span style={{
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    color: '#B0F127',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    {currentTrade.profit}
                  </span>
                </div>
              </div>

              {/* Today's Platform Statistics */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem'
              }}>
                <div style={{ backgroundColor: '#181818', padding: '1rem', borderRadius: '14px', border: '1px solid #282828' }}>
                  <div style={{ fontSize: '0.75rem', color: '#717172', fontWeight: 600 }}>TODAY'S ARBITRAGE VOLUME</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginTop: '0.25rem' }}>$48,920,400</div>
                  <div style={{ fontSize: '0.75rem', color: '#B0F127', marginTop: '0.2rem' }}>+12.4% vs yesterday</div>
                </div>

                <div style={{ backgroundColor: '#181818', padding: '1rem', borderRadius: '14px', border: '1px solid #282828' }}>
                  <div style={{ fontSize: '0.75rem', color: '#717172', fontWeight: 600 }}>INVESTOR CAPITAL BACKING</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#B0F127', marginTop: '0.25rem' }}>100% INSURED</div>
                  <div style={{ fontSize: '0.75rem', color: '#939393', marginTop: '0.2rem' }}>SAFU Vault Protection</div>
                </div>
              </div>
            </div>

            {/* Floating Trust Card Overlay */}
            <div className="animate-float-card" style={{
              position: 'absolute',
              bottom: '-25px',
              left: '-20px',
              backgroundColor: '#0c0c0c',
              border: '1px solid rgba(176, 241, 39, 0.4)',
              borderRadius: '16px',
              padding: '0.85rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: '0 12px 32px rgba(0,0,0,0.6)'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(176, 241, 39, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ShieldCheck size={20} color="#B0F127" />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fff' }}>Principal 100% Insured</div>
                <div style={{ fontSize: '0.7rem', color: '#939393' }}>Zero Capital Risk Policy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
