import { useState } from 'react'
import { 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  Activity, 
  ArrowRight, 
  Lock, 
  Cpu, 
  BarChart3, 
  ChevronRight, 
  Globe, 
  CheckCircle2 
} from 'lucide-react'

const INITIAL_MARKETS = [
  { symbol: 'BTC/USDT', name: 'Bitcoin', price: '$89,420.50', change: '+4.82%', isUp: true, volume: '$1.42B' },
  { symbol: 'ETH/USDT', name: 'Ethereum', price: '$3,480.12', change: '+6.15%', isUp: true, volume: '$890M' },
  { symbol: 'SOL/USDT', name: 'Solana', price: '$194.30', change: '+11.40%', isUp: true, volume: '$620M' },
  { symbol: 'AVAX/USDT', name: 'Avalanche', price: '$42.15', change: '-1.20%', isUp: false, volume: '$145M' },
  { symbol: 'BNB/USDT', name: 'BNB', price: '$612.80', change: '+2.45%', isUp: true, volume: '$280M' },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState('hot')

  return (
    <div className="main-content" style={{ paddingBottom: '5rem' }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        padding: '5rem 1.5rem 4rem',
        maxWidth: '1280px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        {/* Release Pill */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem 1rem',
          borderRadius: '999px',
          background: 'rgba(0, 242, 254, 0.08)',
          border: '1px solid rgba(0, 242, 254, 0.25)',
          color: '#00f2fe',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '2rem'
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#00f2fe',
            boxShadow: '0 0 10px #00f2fe'
          }} />
          Purex MatchEngine 3.0 Live — 2.5M TPS
          <ChevronRight size={16} />
        </div>

        {/* Hero Title */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          marginBottom: '1.5rem',
          color: '#ffffff'
        }}>
          Next-Gen Precision <br />
          <span className="text-gradient">Crypto Exchange</span>
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          color: '#94a3b8',
          maxWidth: '680px',
          margin: '0 auto 2.5rem',
          lineHeight: 1.6
        }}>
          Trade digital assets with institutional-grade liquidity, sub-millisecond execution, and 100% verified proof of reserves.
        </p>

        {/* Hero CTAs */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '4rem'
        }}>
          <button className="glow-btn" style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}>
            Start Trading Instantly
            <ArrowRight size={18} />
          </button>
          <a href="#markets" className="glow-btn-secondary" style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}>
            Explore Markets
          </a>
        </div>

        {/* Quick Performance Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.25rem',
          maxWidth: '1020px',
          margin: '0 auto'
        }}>
          <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'left' }}>
            <div style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              24h Global Volume
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff' }}>
              $4.85 Billion
            </div>
            <div style={{ fontSize: '0.8rem', color: '#00e676', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <TrendingUp size={14} /> +18.4% this week
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'left' }}>
            <div style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Execution Speed
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#00f2fe' }}>
              &lt; 25 Microseconds
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Cpu size={14} /> Ultra-low tick-to-trade
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'left' }}>
            <div style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Verified Custody
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff' }}>
              1:1 Backed
            </div>
            <div style={{ fontSize: '0.8rem', color: '#00e676', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <ShieldCheck size={14} /> Merkle-tree PoR live
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'left' }}>
            <div style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Maker / Taker Fees
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff' }}>
              0.00% / 0.02%
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Zap size={14} /> Tiered VIP rebates
            </div>
          </div>
        </div>
      </section>

      {/* Live Market Section */}
      <section id="markets" style={{
        maxWidth: '1280px',
        margin: '2rem auto 5rem',
        padding: '0 1.5rem'
      }}>
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '0.25rem' }}>
                Real-Time Spot Markets
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                Live aggregated order books from top liquidity pools.
              </p>
            </div>

            {/* Market Tabs */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              background: 'rgba(255, 255, 255, 0.04)',
              padding: '0.3rem',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              {['hot', 'gainers', 'defi', 'layer-1'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    background: activeTab === tab ? 'var(--primary-gradient)' : 'transparent',
                    color: activeTab === tab ? '#050811' : '#94a3b8',
                    border: 'none',
                    borderRadius: '7px',
                    padding: '0.4rem 1rem',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Markets Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', color: '#64748b', fontSize: '0.8rem' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>Asset</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Last Price</th>
                  <th style={{ padding: '0.75rem 1rem' }}>24h Change</th>
                  <th style={{ padding: '0.75rem 1rem' }}>24h Volume</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {INITIAL_MARKETS.map((item) => (
                  <tr 
                    key={item.symbol}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: 'rgba(255, 255, 255, 0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          color: '#00f2fe'
                        }}>
                          {item.symbol.slice(0, 3)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>{item.symbol}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.name}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 600, color: '#fff', fontFamily: 'var(--font-mono)' }}>
                      {item.price}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span className={item.isUp ? 'badge-green' : 'badge-red'}>
                        {item.change}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.875rem', fontFamily: 'var(--font-mono)' }}>
                      {item.volume}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <button 
                        className="glow-btn"
                        style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', borderRadius: '8px' }}
                      >
                        Trade
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Features & Security Pillars */}
      <section id="features" style={{
        maxWidth: '1280px',
        margin: '0 auto 5rem',
        padding: '0 1.5rem'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>
            Engineered for <span className="text-gradient">Performance & Security</span>
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
            Built from scratch to overcome latency bottlenecks, security vulnerabilities, and front-running in traditional crypto platforms.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.75rem'
        }}>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(0, 242, 254, 0.1)',
              border: '1px solid rgba(0, 242, 254, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <Cpu size={24} color="#00f2fe" />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>
              Microsecond Matching
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Our core in-memory order book engine processes up to 2,500,000 orders per second with deterministic sub-millisecond execution.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(0, 230, 118, 0.1)',
              border: '1px solid rgba(0, 230, 118, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <ShieldCheck size={24} color="#00e676" />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>
              MPC Multi-Sig Cold Custody
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6' }}>
              98% of all digital assets remain in distributed MPC cold vaults with hardware security modules (HSM) and multi-party quorum authorization.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(121, 40, 202, 0.1)',
              border: '1px solid rgba(121, 40, 202, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <BarChart3 size={24} color="#7928ca" />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>
              Institutional Liquidity
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Smart order routing pools liquidity across global tier-1 market makers, guaranteeing the tightest spreads and zero slippage on size.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1.5rem'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.1) 0%, rgba(121, 40, 202, 0.1) 100%)',
          border: '1px solid rgba(0, 242, 254, 0.2)',
          borderRadius: '24px',
          padding: '3.5rem 2rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>
            Ready to experience the new standard in crypto trading?
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: '540px', margin: '0 auto 2rem' }}>
            Create an account in less than 30 seconds or connect your Web3 wallet to begin trading.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="glow-btn" style={{ padding: '0.85rem 2.25rem', fontSize: '1rem' }}>
              Get Started Now
            </button>
            <button className="glow-btn-secondary" style={{ padding: '0.85rem 2.25rem', fontSize: '1rem' }}>
              View Documentation
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
