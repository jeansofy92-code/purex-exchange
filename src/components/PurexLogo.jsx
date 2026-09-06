export default function PurexLogo({ size = 'md', showBadge = true }) {
  const isLarge = size === 'lg'
  const isSmall = size === 'sm'

  const iconDim = isLarge ? 42 : isSmall ? 28 : 34
  const fontSize = isLarge ? '1.5rem' : isSmall ? '1.1rem' : '1.3rem'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
      {/* Dynamic Geometric Arbitrage Icon */}
      <div style={{
        width: `${iconDim}px`,
        height: `${iconDim}px`,
        borderRadius: isSmall ? '8px' : '10px',
        backgroundColor: '#141414',
        border: '1px solid rgba(176, 241, 39, 0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        boxShadow: '0 0 16px rgba(176, 241, 39, 0.2)',
        flexShrink: 0
      }}>
        <svg 
          width={iconDim * 0.65} 
          height={iconDim * 0.65} 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Dual Intersecting Arbitrage Arrows */}
          <path 
            d="M3 8L15 8M15 8L11 4M15 8L11 12" 
            stroke="#B0F127" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <path 
            d="M21 16L9 16M9 16L13 20M9 16L13 12" 
            stroke="#FFFFFF" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <circle cx="18" cy="6" r="2" fill="#B0F127" />
        </svg>
      </div>

      {/* Brand Name */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <div style={{
          fontSize: fontSize,
          fontWeight: 800,
          letterSpacing: '-0.03em',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'baseline',
          gap: '2px'
        }}>
          PUREX<span style={{ color: '#B0F127', fontSize: '1.2em' }}>.</span>
        </div>
        <span style={{
          fontSize: '0.65rem',
          fontWeight: 700,
          color: '#939393',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginTop: '2px'
        }}>
          Arbitrage Platform
        </span>
      </div>

      {showBadge && (
        <span style={{
          fontSize: '0.65rem',
          backgroundColor: 'rgba(176, 241, 39, 0.1)',
          color: '#B0F127',
          border: '1px solid rgba(176, 241, 39, 0.3)',
          padding: '0.2rem 0.5rem',
          borderRadius: '999px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          marginLeft: '0.25rem'
        }}>
          AI Quant v2.4
        </span>
      )}
    </div>
  )
}
