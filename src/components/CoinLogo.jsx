import cryptoAssets from '../data/cryptoAssets'
import purexLogo from '../assets/brand/purex-logo.svg'

const COIN_COLORS = {
  ADA: { bg: '#0033ad', text: '#ffffff' },
  AVAX: { bg: '#e84142', text: '#ffffff' },
  DOGE: { bg: '#c2a633', text: '#050708' },
  LINK: { bg: '#375bd2', text: '#ffffff' },
  NEAR: { bg: '#000000', border: '#58E65B', text: '#58E65B' },
  SUI: { bg: '#4da2ff', text: '#ffffff' },
  DOT: { bg: '#e6007a', text: '#ffffff' },
  TON: { bg: '#0098ea', text: '#ffffff' },
  UNI: { bg: '#ff007a', text: '#ffffff' },
  ARB: { bg: '#28a0f0', text: '#ffffff' },
  OP: { bg: '#ff0420', text: '#ffffff' },
  RENDER: { bg: '#e51b24', text: '#ffffff' },
  FET: { bg: '#1d2a44', border: '#00d2ff', text: '#00d2ff' },
  PEPE: { bg: '#4cae4f', text: '#ffffff' },
  SHIB: { bg: '#f16522', text: '#ffffff' },
}

function CoinLogo({ symbol, size = 28, className = '' }) {
  const assetMap = {
    BTC: cryptoAssets.bitcoin?.logo,
    ETH: cryptoAssets.ethereum?.logo,
    USDT: cryptoAssets.tether?.logo,
    BNB: cryptoAssets.bnb?.logo,
    SOL: cryptoAssets.solana?.logo,
    XRP: cryptoAssets.xrp?.logo,
    PUREX: purexLogo,
  }

  const src = assetMap[symbol]

  if (src) {
    return (
      <img
        src={src}
        alt={`${symbol} logo`}
        width={size}
        height={size}
        className={className}
        style={{ display: 'block', width: size, height: size, objectFit: 'contain' }}
      />
    )
  }

  const colorConfig = COIN_COLORS[symbol] || { bg: '#183a1d', text: '#58e65b' }

  return (
    <div
      className={`flex items-center justify-center font-bold tracking-tight rounded-full select-none ${className}`}
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        backgroundColor: colorConfig.bg,
        color: colorConfig.text,
        border: colorConfig.border ? `1.5px solid ${colorConfig.border}` : '1px solid rgba(255,255,255,0.15)',
        fontSize: size <= 24 ? '9px' : size <= 32 ? '11px' : '13px',
      }}
    >
      {symbol.slice(0, 4)}
    </div>
  )
}

export default CoinLogo

