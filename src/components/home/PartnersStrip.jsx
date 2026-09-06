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
      padding: '3rem 0',
      borderTop: '1px solid #141414',
      borderBottom: '1px solid #141414',
      backgroundColor: '#080808'
    }}>
      <div className="container-max">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{
            fontSize: '0.85rem',
            color: '#717172',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            Multi-Exchange Direct API Liquidity & Arbitrage Routing
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '1.5rem',
          alignItems: 'center'
        }}>
          {exchanges.map((ex) => (
            <div 
              key={ex.name}
              style={{
                backgroundColor: '#111111',
                border: '1px solid #1f1f1f',
                borderRadius: '12px',
                padding: '1rem 1.25rem',
                textAlign: 'center',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(176, 241, 39, 0.4)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1f1f1f'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.01em' }}>
                {ex.name}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#B0F127', fontWeight: 600, marginTop: '2px' }}>
                {ex.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
