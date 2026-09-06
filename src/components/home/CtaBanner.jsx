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
          <div className="finantech-card-white" style={{
            border: '1px solid #e7e7e7',
            borderRadius: '24px',
            padding: '4.5rem 2.5rem',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
          }}>
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 0.95rem',
                borderRadius: '999px',
                backgroundColor: '#060606',
                color: '#B0F127',
                fontSize: '0.85rem',
                fontWeight: 700,
                marginBottom: '1.5rem'
              }}>
                <span className="pill-dot" />
                100% Capital Guaranteed Investment
              </div>

              <h2 className="display-2" style={{ marginBottom: '1.25rem', color: '#060606' }}>
                Start generating daily crypto profits <span style={{ color: '#060606', borderBottom: '3px solid #B0F127' }}>today.</span>
              </h2>

              <p style={{ color: '#555555', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
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
                <a href="#packages" className="btn-black" style={{ padding: '1rem 2.25rem', fontSize: '1rem' }}>
                  Select Your Package Now
                  <ArrowRight size={20} strokeWidth={2.5} />
                </a>
                <a href="#calculator" style={{
                  backgroundColor: '#f0f0f0',
                  color: '#060606',
                  fontWeight: 700,
                  fontSize: '1rem',
                  padding: '1rem 2.25rem',
                  borderRadius: '12px',
                  border: '1px solid #e0e0e0',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.2s ease'
                }}>
                  Estimate Returns
                </a>
              </div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontSize: '0.85rem',
                color: '#666666'
              }}>
                <ShieldCheck size={16} color="#05C168" />
                Backed by 100% SAFU Cold Reserve Guarantee & Instant Daily Withdrawals
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
