import ScrollReveal from '../common/ScrollReveal'

export default function PartnersStrip() {
  const exchanges = [
    { name: 'Binance', sub: 'Spot & Futures API' },
    { name: 'Coinbase Pro', sub: 'Institutional Prime' },
    { name: 'Kraken', sub: 'High Liquidity Book' },
    { name: 'OKX', sub: 'Ultra-Fast FIX' },
    { name: 'Bybit', sub: 'Derivatives Arbitrage' },
    { name: 'KuCoin', sub: 'Cross-Spread Router' }
  ]

  return (
    <section style={{
      padding: '4rem 0',
      borderTop: '1px solid #141414',
      borderBottom: '1px solid #141414',
      backgroundColor: '#060606'
    }}>
      <div className="container-max">
        <ScrollReveal delay={0.1}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 className="display-3" style={{ fontSize: '1.4rem' }}>
              Supported by top liquidity partners <span className="color-accent-1">around the globe</span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1.25rem',
            alignItems: 'center'
          }}>
            {exchanges.map((ex, idx) => (
              <div 
                key={ex.name}
                style={{
                  backgroundColor: '#111111',
                  border: '1px solid #232323',
                  borderRadius: '14px',
                  padding: '1.25rem 1rem',
                  textAlign: 'center',
                  transition: 'transform 0.2s ease, border-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#383838'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#232323'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.01em' }}>
                  {ex.name}
                </div>
                <div style={{ fontSize: '0.725rem', color: '#B0F127', fontWeight: 600, marginTop: '4px' }}>
                  {ex.sub}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
