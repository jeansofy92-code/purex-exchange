import { Check, ArrowRight, ShieldCheck, Zap, Lock } from 'lucide-react'
import CryptoPhoneMockup from '../common/CryptoPhoneMockup'
import ScrollReveal from '../common/ScrollReveal'

export default function PhoneAppSection() {
  return (
    <section className="section-spacing" style={{ backgroundColor: '#060606', borderTop: '1px solid #141414', borderBottom: '1px solid #141414' }}>
      <div className="container-max">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          alignItems: 'center',
          gap: '4rem'
        }}>
          {/* Left Column: Text Content */}
          <ScrollReveal delay={0.1}>
            <div style={{ maxWidth: '540px' }}>
              <div className="pill-badge" style={{ marginBottom: '1.25rem' }}>
                <span className="pill-dot" />
                Mobile-First Arbitrage Dashboard
              </div>

              <h2 className="display-2" style={{ marginBottom: '1.25rem' }}>
                A crypto investment platform from <span className="color-accent-1">the future.</span>
              </h2>

              <p style={{ fontSize: '1.05rem', color: '#939393', lineHeight: 1.7, marginBottom: '2rem' }}>
                Monitor your daily arbitrage earnings on the go. Our mobile-ready web platform lets you track multi-exchange bot executions, check daily payouts, and withdraw directly to your personal Bitcoin or USDT wallet in real time.
              </p>

              {/* Bullet list items matching Finantech format */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#B0F127',
                    color: '#060606',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                    Guaranteed daily payouts with 100% capital insurance
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#B0F127',
                    color: '#060606',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                    Fast and secure automated withdrawals within 2 minutes
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#B0F127',
                    color: '#060606',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                    256-bit military encryption & MPC cold custody
                  </span>
                </div>
              </div>

              {/* Crisp White Stats Callout Card */}
              <div className="finantech-card-white" style={{
                padding: '1.25rem 1.5rem',
                borderRadius: '16px',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                border: '1px solid #e7e7e7',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#717172', textTransform: 'uppercase', fontWeight: 700 }}>LIVE 24H BOT ARBITRAGE STATS</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#060606', marginTop: '0.15rem' }}>
                    184,290+ Trades Executed Today
                  </div>
                </div>
                <div style={{
                  backgroundColor: '#060606',
                  color: '#B0F127',
                  padding: '0.4rem 0.75rem',
                  borderRadius: '8px',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-mono)'
                }}>
                  99.98% Win
                </div>
              </div>

              <a href="#packages" className="btn-primary">
                Get Started with Purex
                <ArrowRight size={18} strokeWidth={2.5} />
              </a>
            </div>
          </ScrollReveal>

          {/* Right Column: Phone Mockup with Crypto Badges */}
          <ScrollReveal delay={0.25}>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
              <CryptoPhoneMockup />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
