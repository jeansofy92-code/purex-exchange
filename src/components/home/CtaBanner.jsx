import { ArrowRight, ShieldCheck, Zap } from 'lucide-react'

export default function CtaBanner() {
  return (
    <section style={{
      padding: '4rem 1.5rem 6rem',
      backgroundColor: '#060606'
    }}>
      <div className="container-max">
        <div style={{
          backgroundColor: '#111111',
          border: '1px solid rgba(176, 241, 39, 0.35)',
          borderRadius: '28px',
          padding: '4.5rem 2.5rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 0 50px rgba(176, 241, 39, 0.08)'
        }}>
          {/* Subtle Background Glow */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '500px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(176, 241, 39, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
            pointerEvents: 'none'
          }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '720px', margin: '0 auto' }}>
            <div className="pill-badge" style={{ marginBottom: '1.5rem' }}>
              <span className="pill-dot" />
              100% Capital Guaranteed Investment
            </div>

            <h2 className="display-2" style={{ marginBottom: '1.25rem' }}>
              Start generating daily crypto profits <span className="color-accent-1">today.</span>
            </h2>

            <p style={{ color: '#c5c5c5', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
              Join thousands of global investors who trust Purex Arbitrage. Choose a package, fund your account in seconds, and watch your daily profits compound automatically.
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '2rem'
            }}>
              <a href="#packages" className="btn-primary" style={{ padding: '1rem 2.25rem', fontSize: '1rem' }}>
                Select Your Package Now
                <ArrowRight size={20} strokeWidth={2.5} />
              </a>
              <a href="#calculator" className="btn-secondary" style={{ padding: '1rem 2.25rem', fontSize: '1rem' }}>
                Estimate Returns
              </a>
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontSize: '0.85rem',
              color: '#939393'
            }}>
              <ShieldCheck size={16} color="#B0F127" />
              Backed by 100% SAFU Cold Reserve Guarantee & Instant Daily Withdrawals
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
