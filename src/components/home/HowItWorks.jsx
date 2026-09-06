import { ShieldCheck, Cpu, TrendingUp, Check, ArrowRight, Zap, RefreshCw, BarChart2 } from 'lucide-react'

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-spacing" style={{ backgroundColor: '#060606' }}>
      <div className="container-max">
        {/* Section Header */}
        <div id="about" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          alignItems: 'flex-end',
          gap: '2.5rem',
          marginBottom: '4.5rem'
        }}>
          <div>
            <div className="pill-badge" style={{ marginBottom: '1.25rem' }}>
              <span className="pill-dot" />
              About Purex Arbitrage
            </div>
            <h2 className="display-2">
              Crypto investing made easy for <span className="color-accent-1">everyone.</span>
            </h2>
          </div>
          <div>
            <p style={{ fontSize: '1.05rem', color: '#c5c5c5', lineHeight: 1.7 }}>
              Purex is an automated wealth management platform that eliminates traditional trading risk. By capitalizing on mathematical price variations between major cryptocurrency exchanges, our automated algorithmic bots and experienced quant traders deliver reliable daily returns on your capital.
            </p>
          </div>
        </div>

        {/* 3-Step Grid Cards matching Finantech style */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {/* Step 1 */}
          <div className="finantech-card">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.75rem'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'rgba(176, 241, 39, 0.1)',
                border: '1px solid rgba(176, 241, 39, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Zap size={24} color="#B0F127" strokeWidth={2.5} />
              </div>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: '#282828' }}>01</span>
            </div>
            <h3 className="display-4" style={{ marginBottom: '0.85rem' }}>
              Choose a Trading Package
            </h3>
            <p style={{ color: '#939393', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Select from beginner to VIP institutional packages based on your capital. Each package unlocks higher daily returns and dedicated bot algorithms.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#e7e7e7' }}>
                <Check size={16} color="#B0F127" strokeWidth={3} /> Low minimum entry from $100
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#e7e7e7' }}>
                <Check size={16} color="#B0F127" strokeWidth={3} /> Transparent limits & fixed daily rates
              </li>
            </ul>
          </div>

          {/* Step 2 */}
          <div className="finantech-card">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.75rem'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'rgba(176, 241, 39, 0.1)',
                border: '1px solid rgba(176, 241, 39, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Cpu size={24} color="#B0F127" strokeWidth={2.5} />
              </div>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: '#282828' }}>02</span>
            </div>
            <h3 className="display-4" style={{ marginBottom: '0.85rem' }}>
              AI Bots & Quants Trade Daily
            </h3>
            <p style={{ color: '#939393', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Our high-frequency execution infrastructure scans exchange price spreads 24/7, executing thousands of automated riskless arbitrage trades per day.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#e7e7e7' }}>
                <Check size={16} color="#B0F127" strokeWidth={3} /> Sub-20ms multi-exchange routing
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#e7e7e7' }}>
                <Check size={16} color="#B0F127" strokeWidth={3} /> Zero market speculation exposure
              </li>
            </ul>
          </div>

          {/* Step 3 */}
          <div className="finantech-card">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.75rem'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'rgba(176, 241, 39, 0.1)',
                border: '1px solid rgba(176, 241, 39, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <TrendingUp size={24} color="#B0F127" strokeWidth={2.5} />
              </div>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: '#282828' }}>03</span>
            </div>
            <h3 className="display-4" style={{ marginBottom: '0.85rem' }}>
              Daily Payouts & 100% Guarantee
            </h3>
            <p style={{ color: '#939393', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Profits are credited directly to your balance every 24 hours. Enjoy instant withdrawals or compound yields with full capital insurance protection.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#e7e7e7' }}>
                <Check size={16} color="#B0F127" strokeWidth={3} /> 100% Principal protection reserve
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#e7e7e7' }}>
                <Check size={16} color="#B0F127" strokeWidth={3} /> Fast automated withdrawals
              </li>
            </ul>
          </div>
        </div>

        {/* Feature Split Banner matching Finantech "Bulletproof security by design" */}
        <div className="finantech-card" style={{
          backgroundColor: '#111111',
          padding: '3rem 2.5rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            alignItems: 'center',
            gap: '3rem'
          }}>
            <div>
              <div className="pill-badge" style={{ marginBottom: '1rem' }}>
                <span className="pill-dot" />
                Capital Safety First
              </div>
              <h3 className="display-3" style={{ marginBottom: '1rem' }}>
                Why pure arbitrage is <span className="color-accent-1">mathematically riskless.</span>
              </h3>
              <p style={{ color: '#939393', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Unlike regular trading where you bet on whether Bitcoin goes up or down, arbitrage captures the simultaneous price difference across exchanges. We buy low on Exchange A and sell instantly on Exchange B within milliseconds, locking in guaranteed profit regardless of market direction.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#packages" className="btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}>
                  View All Packages
                </a>
              </div>
            </div>

            {/* Metric Comparison Counters */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1.5rem'
            }}>
              <div style={{ backgroundColor: '#181818', padding: '1.5rem', borderRadius: '16px', border: '1px solid #282828' }}>
                <div className="display-3" style={{ color: '#B0F127' }}>100%</div>
                <div style={{ fontSize: '0.85rem', color: '#e7e7e7', fontWeight: 700, marginTop: '0.25rem' }}>Capital Guarantee</div>
                <div style={{ fontSize: '0.75rem', color: '#717172', marginTop: '0.25rem' }}>Insured SAFU cold reserve</div>
              </div>

              <div style={{ backgroundColor: '#181818', padding: '1.5rem', borderRadius: '16px', border: '1px solid #282828' }}>
                <div className="display-3" style={{ color: '#fff' }}>24/7</div>
                <div style={{ fontSize: '0.85rem', color: '#e7e7e7', fontWeight: 700, marginTop: '0.25rem' }}>Automated Trading</div>
                <div style={{ fontSize: '0.75rem', color: '#717172', marginTop: '0.25rem' }}>Zero manual effort needed</div>
              </div>

              <div style={{ backgroundColor: '#181818', padding: '1.5rem', borderRadius: '16px', border: '1px solid #282828' }}>
                <div className="display-3" style={{ color: '#fff' }}>&lt; 20ms</div>
                <div style={{ fontSize: '0.85rem', color: '#e7e7e7', fontWeight: 700, marginTop: '0.25rem' }}>Order Execution</div>
                <div style={{ fontSize: '0.75rem', color: '#717172', marginTop: '0.25rem' }}>Flash arbitrage routing</div>
              </div>

              <div style={{ backgroundColor: '#181818', padding: '1.5rem', borderRadius: '16px', border: '1px solid #B0F127' }}>
                <div className="display-3" style={{ color: '#B0F127' }}>0.00%</div>
                <div style={{ fontSize: '0.85rem', color: '#e7e7e7', fontWeight: 700, marginTop: '0.25rem' }}>Market Direction Risk</div>
                <div style={{ fontSize: '0.75rem', color: '#717172', marginTop: '0.25rem' }}>Bull or bear profitability</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
