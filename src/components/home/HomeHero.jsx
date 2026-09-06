import { useState, useEffect } from 'react'
import { ArrowRight, ShieldCheck, Zap, Cpu, CheckCircle2, RefreshCw, Coins, ArrowUpRight } from 'lucide-react'
import ScrollReveal from '../common/ScrollReveal'
import CoinBadge from '../common/CoinBadge'

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
      paddingTop: '5rem',
      paddingBottom: '5rem',
      backgroundColor: '#060606'
    }}>
      <div className="container-max">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          alignItems: 'center',
          gap: '4rem'
        }}>
          {/* Left Column: Hero Text */}
          <ScrollReveal delay={0.1}>
            <div style={{ maxWidth: '580px' }}>
              <div className="pill-badge" style={{ marginBottom: '1.75rem' }}>
                <span className="pill-dot" />
                Daily Automated Crypto Arbitrage
              </div>

              <h1 className="display-1" style={{ marginBottom: '1.5rem' }}>
                Buy and trade cryptos like never <span className="color-accent-1">before.</span>
              </h1>

              <p style={{
                fontSize: '1.1rem',
                color: '#939393',
                lineHeight: 1.65,
                marginBottom: '2.5rem'
              }}>
                Purex is an automated crypto investment platform powered by multi-exchange AI arbitrage bots and expert quant trading desks. Get guaranteed daily profit payouts and 100% principal insurance protection on all investment packages.
              </p>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '3rem'
              }}>
                <a href="#packages" className="btn-primary">
                  Explore Packages
                  <ArrowRight size={18} strokeWidth={2.5} />
                </a>
                <a href="#calculator" className="btn-secondary">
                  Calculate Daily ROI
                </a>
              </div>

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
                  <span style={{ fontSize: '0.875rem', color: '#e7e7e7', fontWeight: 600 }}>Daily Compounded Payouts</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle2 size={18} color="#B0F127" />
                  <span style={{ fontSize: '0.875rem', color: '#e7e7e7', fontWeight: 600 }}>Pro Quant Trading Teams</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle2 size={18} color="#B0F127" />
                  <span style={{ fontSize: '0.875rem', color: '#e7e7e7', fontWeight: 600 }}>Instant Withdrawals</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Hero Visual with Floating Crypto Badges */}
          <ScrollReveal delay={0.25}>
            <div style={{ position: 'relative' }}>
              {/* Floating Bitcoin Coin Badge */}
              <div style={{ position: 'absolute', top: '-20px', right: '-15px', zIndex: 10 }}>
                <CoinBadge coin="BTC" price="$89,450" change="+4.82%" floating={true} />
              </div>

              {/* Floating Ethereum Coin Badge */}
              <div style={{ position: 'absolute', top: '-25px', left: '-10px', zIndex: 10 }}>
                <CoinBadge coin="ETH" price="$3,480" change="+6.15%" floating={true} />
              </div>

              <div className="finantech-card" style={{ padding: '2rem', backgroundColor: '#141414' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #232323',
                  paddingBottom: '1.25rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '34px',
                      height: '34px',
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
                      <div style={{ fontSize: '0.75rem', color: '#717172' }}>Real-time Arbitrage Execution Stream</div>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.75rem',
                    color: '#B0F127',
                    backgroundColor: '#1f1f1f',
                    border: '1px solid #282828',
                    padding: '0.3rem 0.65rem',
                    borderRadius: '999px',
                    fontWeight: 700
                  }}>
                    <RefreshCw size={12} className="animate-spin" /> LIVE
                  </div>
                </div>

                {/* Simulated Trade Execution Block */}
                <div style={{
                  backgroundColor: '#0c0c0c',
                  border: '1px solid #1f1f1f',
                  borderRadius: '14px',
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
                    <span style={{ fontSize: '0.75rem', color: '#939393', fontFamily: 'var(--font-mono)' }}>
                      Latency: <strong style={{ color: '#B0F127' }}>{currentTrade.ms}</strong>
                    </span>
                  </div>

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

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid #1a1a1a'
                  }}>
                    <span style={{ fontSize: '0.8rem', color: '#939393' }}>Realized Net Spread:</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#B0F127', fontFamily: 'var(--font-mono)' }}>
                      {currentTrade.profit}
                    </span>
                  </div>
                </div>

                {/* 2 Stats Cards */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1rem'
                }}>
                  <div style={{ backgroundColor: '#181818', padding: '1rem', borderRadius: '12px', border: '1px solid #232323' }}>
                    <div style={{ fontSize: '0.75rem', color: '#717172', fontWeight: 600 }}>TODAY'S ARBITRAGE VOLUME</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginTop: '0.25rem' }}>$48,920,400</div>
                    <div style={{ fontSize: '0.75rem', color: '#B0F127', marginTop: '0.2rem' }}>+12.4% vs yesterday</div>
                  </div>

                  <div style={{ backgroundColor: '#181818', padding: '1rem', borderRadius: '12px', border: '1px solid #232323' }}>
                    <div style={{ fontSize: '0.75rem', color: '#717172', fontWeight: 600 }}>CAPITAL PROTECTION</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#B0F127', marginTop: '0.25rem' }}>100% INSURED</div>
                    <div style={{ fontSize: '0.75rem', color: '#939393', marginTop: '0.2rem' }}>SAFU Cold Vault</div>
                  </div>
                </div>
              </div>

              {/* Floating Bottom Left Badge */}
              <div className="animate-float-card" style={{
                position: 'absolute',
                bottom: '-20px',
                left: '-15px',
                backgroundColor: '#111111',
                border: '1px solid #2f2f2f',
                borderRadius: '14px',
                padding: '0.85rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                boxShadow: '0 12px 28px rgba(0,0,0,0.8)'
              }}>
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: '#1c1c1c',
                  border: '1px solid rgba(176, 241, 39, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <ShieldCheck size={18} color="#B0F127" />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fff' }}>Principal 100% Insured</div>
                  <div style={{ fontSize: '0.7rem', color: '#939393' }}>Zero Capital Risk Guarantee</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
