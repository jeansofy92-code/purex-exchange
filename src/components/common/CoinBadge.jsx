export default function CoinBadge({ 
  coin = 'BTC', 
  price = '$89,450', 
  change = '+4.8%', 
  floating = false, 
  style = {} 
}) {
  const coinConfig = {
    BTC: {
      name: 'Bitcoin',
      color: '#F7931A',
      symbol: '₿',
      bg: 'rgba(247, 147, 26, 0.15)',
      border: 'rgba(247, 147, 26, 0.3)'
    },
    ETH: {
      name: 'Ethereum',
      color: '#627EEA',
      symbol: 'Ξ',
      bg: 'rgba(98, 126, 234, 0.15)',
      border: 'rgba(98, 126, 234, 0.3)'
    },
    SOL: {
      name: 'Solana',
      color: '#14F195',
      symbol: '◎',
      bg: 'rgba(20, 241, 149, 0.15)',
      border: 'rgba(20, 241, 149, 0.3)'
    },
    USDT: {
      name: 'Tether',
      color: '#26A17B',
      symbol: '₮',
      bg: 'rgba(38, 161, 123, 0.15)',
      border: 'rgba(38, 161, 123, 0.3)'
    }
  }

  const cfg = coinConfig[coin] || coinConfig.BTC

  return (
    <div 
      className={floating ? 'animate-float-card' : ''}
      style={{
        backgroundColor: '#111111',
        border: '1px solid #232323',
        borderRadius: '14px',
        padding: '0.65rem 1rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
        ...style
      }}
    >
      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: cfg.bg,
        border: `1px solid ${cfg.border}`,
        color: cfg.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 800,
        fontSize: '1rem'
      }}>
        {cfg.symbol}
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fff' }}>{coin}</span>
          <span style={{ fontSize: '0.7rem', color: '#B0F127', fontWeight: 700 }}>{change}</span>
        </div>
        <div style={{ fontSize: '0.75rem', color: '#939393', fontFamily: 'var(--font-mono)' }}>{price}</div>
      </div>
    </div>
  )
}
