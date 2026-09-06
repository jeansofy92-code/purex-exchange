import { ArrowRight, ShieldCheck } from 'lucide-react'
import ScrollReveal from '../common/ScrollReveal'

export default function CtaBanner() {
  return (
    <section style={{
      padding: '4rem 1.5rem 6rem',
      backgroundColor: '#060606'
    }}>
      <div className="container-max">
        <ScrollReveal>
          <div style={{
            backgroundColor: '#111111',
            border: '1px solid #282828',
            borderRadius: '24px',
            padding: '4.5rem 2.5rem',
            textAlign: 'center'
          }}>
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
              <div className="pill-badge" style={{ marginBottom: '1.5rem' }}>
                <span className="pill-dot" />
                100% Capital Guaranteed Investment
              </div>

              <h2 className="display-2" style={{ marginBottom: '1.25rem' }}>
                Start generating daily crypto profits <span className="color-accent-1">today.</span>
              </h2>

              <p style={{ color: '#939393', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
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
                color: '#717172'
              }}>
                <ShieldCheck size={16} color="#B0F127" />
                Backed by 100% SAFU Cold Reserve Guarantee & Instant Daily Withdrawals
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
