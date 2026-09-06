import { Zap, ShieldCheck, TrendingUp, ArrowUpRight, ArrowDownLeft, RefreshCw } from 'lucide-react'
import CoinBadge from './CoinBadge'

export default function CryptoPhoneMockup() {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '340px', margin: '0 auto' }}>
      {/* Floating BTC Coin Badge on top right */}
      <div style={{ position: 'absolute', top: '-15px', right: '-25px', zIndex: 10 }}>
        <CoinBadge coin="BTC" price="$89,450" change="+4.82%" floating={true} />
      </div>

      {/* Floating SOL Coin Badge on bottom left */}
      <div style={{ position: 'absolute', bottom: '40px', left: '-30px', zIndex: 10 }}>
        <CoinBadge coin="SOL" price="$194.20" change="+11.4%" floating={true} />
      </div>

      {/* Phone Outer Frame */}
      <div style={{
        backgroundColor: '#0a0a0a',
        border: '3px solid #282828',
        borderRadius: '36px',
        padding: '12px',
        boxShadow: '0 24px 60px rgba(0,0,0,0.9)'
      }}>
        {/* Phone Screen */}
        <div style={{
          backgroundColor: '#111111',
          borderRadius: '28px',
          padding: '1.25rem 1rem',
          border: '1px solid #1a1a1a',
          overflow: 'hidden'
        }}>
          {/* Phone Top Notch / Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.25rem',
            paddingBottom: '0.75rem',
            borderBottom: '1px solid #1c1c1c'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#B0F127' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fff' }}>PUREX APP</span>
            </div>
            <span style={{ fontSize: '0.65rem', color: '#B0F127', fontWeight: 700, backgroundColor: '#181818', padding: '0.2rem 0.5rem', borderRadius: '999px' }}>
              PRO QUANT
            </span>
          </div>

          {/* Portfolio Balance Card */}
          <div style={{
            backgroundColor: '#161616',
            borderRadius: '16px',
            padding: '1.1rem',
            marginBottom: '1rem',
            border: '1px solid #232323'
          }}>
            <div style={{ fontSize: '0.7rem', color: '#717172', fontWeight: 600 }}>TOTAL INVESTED CAPITAL</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-mono)', marginTop: '0.15rem' }}>
              $24,850.00
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#B0F127', fontWeight: 700 }}>
                +$596.40 (Today's Profit)
              </span>
              <span style={{ fontSize: '0.65rem', color: '#939393' }}>2.4% / day</span>
            </div>
          </div>

          {/* Quick Action Pills */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
            <button style={{
              backgroundColor: '#B0F127',
              color: '#060606',
              border: 'none',
              borderRadius: '10px',
              padding: '0.5rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.3rem'
            }}>
              <ArrowUpRight size={14} /> Deposit
            </button>
            <button style={{
              backgroundColor: '#1f1f1f',
              color: '#ffffff',
              border: '1px solid #282828',
              borderRadius: '10px',
              padding: '0.5rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.3rem'
            }}>
              <ArrowDownLeft size={14} /> Withdraw
            </button>
          </div>

          {/* Active Crypto Holdings / Arbitrage stream */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ fontSize: '0.7rem', color: '#717172', fontWeight: 700, textTransform: 'uppercase' }}>
              Active Arbitrage Pools
            </div>

            <div style={{
              backgroundColor: '#141414',
              padding: '0.65rem 0.75rem',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid #1e1e1e'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'rgba(247, 147, 26, 0.2)', color: '#F7931A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800 }}>
                  ₿
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fff' }}>BTC / USDT</div>
                  <div style={{ fontSize: '0.65rem', color: '#717172' }}>Binance ↔ OKX</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#B0F127' }}>+0.52%</div>
                <div style={{ fontSize: '0.65rem', color: '#939393' }}>14ms</div>
              </div>
            </div>

            <div style={{
              backgroundColor: '#141414',
              padding: '0.65rem 0.75rem',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid #1e1e1e'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'rgba(98, 126, 234, 0.2)', color: '#627EEA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800 }}>
                  Ξ
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fff' }}>ETH / USDT</div>
                  <div style={{ fontSize: '0.65rem', color: '#717172' }}>Kraken ↔ Coinbase</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#B0F127' }}>+0.74%</div>
                <div style={{ fontSize: '0.65rem', color: '#939393' }}>18ms</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
